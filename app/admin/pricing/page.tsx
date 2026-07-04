import React from "react";
import { createClient } from "../../../lib/supabase-server";
import { requireRole } from "../../../lib/auth/session";
import { PricingEditor } from "./PricingEditor";

export const metadata = { title: "Pricing", robots: { index: false } };

export default async function PricingPage() {
  await requireRole("admin");
  const supabase = await createClient();
  const { data: rates } = await supabase
    .from("pricing_rates")
    .select("finish_tier, rate_low_per_sqft, rate_high_per_sqft, location_id, effective_from")
    .order("effective_from", { ascending: false });

  const national = (rates ?? []).filter((r: any) => r.location_id === null);

  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-gft-black mb-2">Pricing</h1>
      <p className="text-sm text-gft-gray500 font-body mb-6">
        National default $/sq ft by finish tier. New entries supersede old ones (effective-dated).
        Market overrides live in market_pricing.
      </p>
      <div className="mb-8 space-y-2">
        {["solid", "flake", "metallic"].map((tier) => {
          const r = national.find((x: any) => x.finish_tier === tier);
          return (
            <div key={tier} className="flex items-center justify-between bg-white rounded-lg border border-gft-gray100 p-4 max-w-md">
              <span className="text-sm font-semibold text-gft-black font-body capitalize">{tier}</span>
              <span className="text-sm text-gft-gray700 font-body tabular-nums">
                {r ? `$${r.rate_low_per_sqft}–$${r.rate_high_per_sqft}/sq ft` : "not set"}
              </span>
            </div>
          );
        })}
      </div>
      <PricingEditor />
    </div>
  );
}
