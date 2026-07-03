/** Pricing engine — a pure, typed function so the same logic runs
 *  client-side (instant estimate) and server-side (quote generation),
 *  and later swaps to regional pricing from Supabase without UI changes.
 *
 *  ⚠️ All rates below are PLACEHOLDER values pending real regional pricing
 *  data (Brand Bible §8: no fabricated specs ship to production).
 */

export type GarageSize = "1-car" | "2-car" | "3-car" | "custom";
export type SlabCondition = "good" | "minor-cracks" | "major-repair";
export type FinishTier = "solid" | "flake" | "metallic";

export interface EstimateInput {
  size: GarageSize;
  customSqFt?: number;      // required when size === "custom"
  condition: SlabCondition;
  finish: FinishTier;
}

export interface EstimateResult {
  low: number;
  high: number;
  monthlyFrom: number;       // financing reframe
  sqFt: number;
  lineItems: { label: string; note: string }[];
}

const SQFT: Record<Exclude<GarageSize, "custom">, number> = {
  "1-car": 250,
  "2-car": 450,
  "3-car": 650,
};

/** $/sqft base by finish tier (placeholder) */
const FINISH_RATE: Record<FinishTier, [number, number]> = {
  solid: [5.5, 7.0],
  flake: [6.5, 8.5],
  metallic: [8.5, 11.0],
};

/** Condition multiplier — ArmorPrep scope grows with repair needs (placeholder) */
const CONDITION_MULT: Record<SlabCondition, number> = {
  good: 1.0,
  "minor-cracks": 1.12,
  "major-repair": 1.3,
};

const FINANCING_MONTHS = 36; // placeholder terms

export function estimate(input: EstimateInput): EstimateResult {
  const sqFt = input.size === "custom" ? Math.max(input.customSqFt ?? 0, 100) : SQFT[input.size];
  const [rLow, rHigh] = FINISH_RATE[input.finish];
  const mult = CONDITION_MULT[input.condition];

  const low = roundTo50(sqFt * rLow * mult);
  const high = roundTo50(sqFt * rHigh * mult);
  const monthlyFrom = Math.round(low / FINANCING_MONTHS);

  const lineItems = [
    { label: "ArmorPrep™ surface preparation", note: conditionNote(input.condition) },
    { label: "GFT Performance System coating", note: finishNote(input.finish) },
    { label: "FloorPassport™ documentation", note: "Included on every install" },
    { label: "Lifetime performance warranty", note: "Included, transferable" },
  ];

  return { low, high, monthlyFrom, sqFt, lineItems };
}

function roundTo50(n: number): number {
  return Math.round(n / 50) * 50;
}

function conditionNote(c: SlabCondition): string {
  return c === "good"
    ? "Diamond grinding + moisture testing"
    : c === "minor-cracks"
    ? "Grinding, moisture testing + crack repair"
    : "Grinding, moisture testing + structural repair scope";
}

function finishNote(f: FinishTier): string {
  return f === "solid" ? "Solid color system" : f === "flake" ? "Full-broadcast flake system" : "Metallic system";
}
