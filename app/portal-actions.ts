"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "../lib/supabase-server";
import { requireRole } from "../lib/auth/session";
import { withLogging } from "../lib/log";
import type { ActionResult } from "./actions";

/** Customer-portal mutations. requireRole('customer') re-checks server-side;
 *  RLS ensures a customer can only touch their own project rows.
 */

const transferSchema = z.object({
  gftProjectId: z.string().max(20),
  newOwnerEmail: z.string().email(),
  confirm: z.literal(true), // explicit confirmation required — irreversible-ish
});

/** Ownership transfer at home sale. Marks the warranty transferred and records
 *  the recipient. The new owner claims it when they create an account with that
 *  email (handled at signup; here we stage the transfer intent).
 */
export async function initiateTransfer(input: unknown): Promise<ActionResult> {
  return withLogging("initiateTransfer", async () => {
    const user = await requireRole("customer");
    const parsed = transferSchema.safeParse(input);
    if (!parsed.success) return { ok: false, error: "Confirm the transfer and provide a valid email." };

    const supabase = await createClient();
    // Verify the project belongs to this customer (RLS also enforces, belt + suspenders)
    const { data: customers } = await supabase.from("customers").select("id").eq("auth_user_id", user.id);
    const ids = (customers ?? []).map((c: any) => c.id);
    const { data: project } = await supabase
      .from("projects").select("id").eq("gft_project_id", parsed.data.gftProjectId).in("customer_id", ids).maybeSingle();
    if (!project) return { ok: false, error: "Project not found on your account." };

    const { error } = await supabase
      .from("warranties")
      .update({ status: "transferred" })
      .eq("project_id", project.id);
    if (error) return { ok: false, error: "Could not initiate transfer." };

    // Record the pending recipient (a transfers table would hold this in full;
    // minimal version stamps intent for the ops team to complete on new-owner signup).
    await supabase.from("leads").insert({
      source_tool: "contact_form",
      payload: { type: "ownership_transfer", gftProjectId: parsed.data.gftProjectId, newOwnerEmail: parsed.data.newOwnerEmail },
      email: parsed.data.newOwnerEmail,
    });

    revalidatePath("/portal/transfer");
    return { ok: true };
  });
}

const referralSchema = z.object({
  friendEmail: z.string().email(),
  company: z.string().max(0).optional(), // honeypot
});

export async function submitReferral(input: unknown): Promise<ActionResult> {
  return withLogging("submitReferral", async () => {
    const user = await requireRole("customer");
    const parsed = referralSchema.safeParse(input);
    if (!parsed.success) return { ok: false, error: "Enter a valid email." };
    if (parsed.data.company) return { ok: false, error: "Rejected." };

    const supabase = await createClient();
    const { error } = await supabase.from("leads").insert({
      source_tool: "contact_form",
      payload: { type: "referral", referredBy: user.email },
      email: parsed.data.friendEmail,
    });
    if (error) return { ok: false, error: "Could not send referral." };
    return { ok: true };
  });
}
