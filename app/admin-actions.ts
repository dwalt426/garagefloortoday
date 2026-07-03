"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "../lib/supabase-server";
import { requireRole } from "../lib/auth/session";
import { withLogging } from "../lib/log";
import type { ActionResult } from "./actions";

/** Admin-only mutations. Every action re-checks the role server-side
 *  (middleware guards the route; this guards the mutation itself — defense in
 *  depth). RLS on the tables is the third layer.
 */

const LEAD_STAGES = [
  "new", "contacted", "estimate_scheduled", "estimate_sent",
  "won", "lost", "installed", "warranty", "maintenance",
] as const;
export type LeadStage = (typeof LEAD_STAGES)[number];

const stageSchema = z.object({
  leadId: z.string().uuid(),
  stage: z.enum(LEAD_STAGES),
  note: z.string().max(1000).optional(),
});

export async function updateLeadStage(input: unknown): Promise<ActionResult> {
  return withLogging("updateLeadStage", async () => {
    await requireRole("admin");
    const parsed = stageSchema.safeParse(input);
    if (!parsed.success) return { ok: false, error: "Invalid stage update." };

    const supabase = await createClient();
    const { error } = await supabase
      .from("leads")
      .update({ stage: parsed.data.stage, stage_note: parsed.data.note ?? null, stage_updated_at: new Date().toISOString() })
      .eq("id", parsed.data.leadId);
    if (error) return { ok: false, error: "Could not update lead." };

    revalidatePath("/admin/leads");
    return { ok: true };
  });
}

const reviewModerationSchema = z.object({
  reviewId: z.string().uuid(),
  action: z.enum(["publish", "unpublish", "respond"]),
  responseBody: z.string().max(2000).optional(),
});

export async function moderateReview(input: unknown): Promise<ActionResult> {
  return withLogging("moderateReview", async () => {
    await requireRole("admin");
    const parsed = reviewModerationSchema.safeParse(input);
    if (!parsed.success) return { ok: false, error: "Invalid moderation request." };

    const supabase = await createClient();
    const { reviewId, action, responseBody } = parsed.data;
    // Reviews are curated, never deleted (Brand Bible §14) — only publish state
    // and responses change. No delete path exists here by design.
    const patch =
      action === "publish" ? { published: true }
      : action === "unpublish" ? { published: false }
      : { response_body: responseBody ?? null, response_at: new Date().toISOString() };

    const { error } = await supabase.from("reviews").update(patch).eq("id", reviewId);
    if (error) return { ok: false, error: "Could not moderate review." };

    revalidatePath("/admin/reviews");
    return { ok: true };
  });
}

const pricingSchema = z.object({
  locationId: z.string().uuid().nullable(),
  finishTier: z.enum(["solid", "flake", "metallic"]),
  low: z.number().min(0).max(100),
  high: z.number().min(0).max(100),
});

export async function updatePricing(input: unknown): Promise<ActionResult> {
  return withLogging("updatePricing", async () => {
    await requireRole("admin");
    const parsed = pricingSchema.safeParse(input);
    if (!parsed.success || parsed.data.low > parsed.data.high) {
      return { ok: false, error: "Invalid pricing (low must be ≤ high)." };
    }
    const supabase = await createClient();
    const { error } = await supabase.from("pricing_rates").insert({
      location_id: parsed.data.locationId,
      finish_tier: parsed.data.finishTier,
      rate_low_per_sqft: parsed.data.low,
      rate_high_per_sqft: parsed.data.high,
    });
    if (error) return { ok: false, error: "Could not update pricing." };
    revalidatePath("/admin/pricing");
    return { ok: true };
  });
}
