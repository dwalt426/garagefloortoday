"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "../lib/supabase-server";
import { requireRole } from "../lib/auth/session";
import { withLogging } from "../lib/log";
import type { ActionResult } from "./actions";

/** Installer-portal mutations. requireRole('installer') + RLS (installer can
 *  only touch assigned projects) are the two guards. Closing a project is the
 *  act that generates the FloorPassport — so it's gated on the full checklist.
 */

async function assertAssigned(projectId: string, userId: string): Promise<string | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("id, project_installers!inner(installer_id, installers!inner(auth_user_id))")
    .eq("gft_project_id", projectId)
    .maybeSingle();
  // RLS already restricts, but resolve the internal uuid for updates
  return data?.id ?? null;
}

const CHECKLIST_KEYS = [
  "armorprep_grind", "moisture_pre", "moisture_post", "crack_repair",
  "system_applied", "finished_photos", "customer_walkthrough",
] as const;

const checklistSchema = z.object({
  projectId: z.string().max(20),
  key: z.enum(CHECKLIST_KEYS),
  value: z.boolean(),
});

export async function updateChecklist(input: unknown): Promise<ActionResult> {
  return withLogging("updateChecklist", async () => {
    const user = await requireRole("installer");
    const parsed = checklistSchema.safeParse(input);
    if (!parsed.success) return { ok: false, error: "Invalid checklist update." };

    const supabase = await createClient();
    const id = await assertAssigned(parsed.data.projectId, user.id);
    if (!id) return { ok: false, error: "Not assigned to this project." };

    const { data: proj } = await supabase.from("projects").select("checklist").eq("id", id).single();
    const checklist = { ...(proj?.checklist ?? {}), [parsed.data.key]: parsed.data.value };
    const { error } = await supabase.from("projects").update({ checklist }).eq("id", id);
    if (error) return { ok: false, error: "Could not save." };
    revalidatePath(`/crew/${parsed.data.projectId}`);
    return { ok: true };
  });
}

const readingSchema = z.object({
  projectId: z.string().max(20),
  stage: z.enum(["pre-grind", "post-grind"]),
  value: z.number().min(0).max(50),
});

export async function addMoistureReading(input: unknown): Promise<ActionResult> {
  return withLogging("addMoistureReading", async () => {
    const user = await requireRole("installer");
    const parsed = readingSchema.safeParse(input);
    if (!parsed.success) return { ok: false, error: "Invalid reading." };

    const supabase = await createClient();
    const id = await assertAssigned(parsed.data.projectId, user.id);
    if (!id) return { ok: false, error: "Not assigned to this project." };

    const { data: proj } = await supabase.from("projects").select("moisture_readings").eq("id", id).single();
    const readings = [...(proj?.moisture_readings ?? []), {
      stage: parsed.data.stage, value: parsed.data.value, unit: "lbs/1000sqft/24h",
    }];
    const { error } = await supabase.from("projects").update({ moisture_readings: readings }).eq("id", id);
    if (error) return { ok: false, error: "Could not save reading." };
    revalidatePath(`/crew/${parsed.data.projectId}`);
    return { ok: true };
  });
}

const batchSchema = z.object({
  projectId: z.string().max(20),
  coat: z.string().min(1).max(40),
  batch: z.string().min(1).max(40),
});

export async function addBatch(input: unknown): Promise<ActionResult> {
  return withLogging("addBatch", async () => {
    const user = await requireRole("installer");
    const parsed = batchSchema.safeParse(input);
    if (!parsed.success) return { ok: false, error: "Invalid batch entry." };

    const supabase = await createClient();
    const id = await assertAssigned(parsed.data.projectId, user.id);
    if (!id) return { ok: false, error: "Not assigned to this project." };

    const { data: proj } = await supabase.from("projects").select("batch_numbers").eq("id", id).single();
    const batches = [...(proj?.batch_numbers ?? []), { coat: parsed.data.coat, batch: parsed.data.batch }];
    const { error } = await supabase.from("projects").update({ batch_numbers: batches }).eq("id", id);
    if (error) return { ok: false, error: "Could not save batch." };
    revalidatePath(`/crew/${parsed.data.projectId}`);
    return { ok: true };
  });
}

const closeSchema = z.object({
  projectId: z.string().max(20),
  customerSigned: z.literal(true),
});

/** Close project → sets status 'completed', which (a) triggers the installer
 *  floors_completed counter, and (b) makes the floor appear in the public
 *  floorpassports VIEW and the customer portal. The FloorPassport is not a
 *  separate object to "generate" — it IS this completed record, surfaced.
 *  Gated on the full Standard checklist so no floor closes half-documented.
 */
export async function closeProject(input: unknown): Promise<ActionResult & { gftProjectId?: string }> {
  return withLogging("closeProject", async () => {
    const user = await requireRole("installer");
    const parsed = closeSchema.safeParse(input);
    if (!parsed.success) return { ok: false, error: "Customer sign-off is required to close." };

    const supabase = await createClient();
    const { data: proj } = await supabase
      .from("projects").select("id, gft_project_id, checklist, status")
      .eq("gft_project_id", parsed.data.projectId).maybeSingle();
    if (!proj) return { ok: false, error: "Not assigned to this project." };
    if (proj.status === "completed") return { ok: false, error: "Already closed." };

    // GATE: every Standard step must be checked before close
    const incomplete = CHECKLIST_KEYS.filter((k) => !proj.checklist?.[k]);
    if (incomplete.length) {
      return { ok: false, error: `Cannot close — incomplete: ${incomplete.map((k) => k.replace(/_/g, " ")).join(", ")}.` };
    }

    const { error } = await supabase.from("projects").update({
      status: "completed",
      customer_signature_at: new Date().toISOString(),
      closed_at: new Date().toISOString(),
    }).eq("id", proj.id);
    if (error) return { ok: false, error: "Could not close project." };

    revalidatePath("/crew");
    return { ok: true, gftProjectId: proj.gft_project_id };
  });
}
