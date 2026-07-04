"use client";

import React, { useState, useTransition } from "react";
import { updatePricing } from "../../admin-actions";

export function PricingEditor() {
  const [tier, setTier] = useState<"solid" | "flake" | "metallic">("flake");
  const [low, setLow] = useState("");
  const [high, setHigh] = useState("");
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  function save() {
    setMsg(null);
    start(async () => {
      const res = await updatePricing({ locationId: null, finishTier: tier, low: +low, high: +high });
      setMsg(res.ok ? "Saved. New national rate is live." : res.error);
      if (res.ok) { setLow(""); setHigh(""); }
    });
  }

  return (
    <div className="bg-white rounded-lg border border-gft-gray100 p-5 max-w-md">
      <p className="text-sm font-semibold text-gft-black font-body mb-4">Update national rate</p>
      <div className="flex gap-3 mb-3">
        <div>
          <label htmlFor="pe-tier" className="text-xs font-semibold text-gft-black font-body block mb-1">Tier</label>
          <select id="pe-tier" value={tier} onChange={(e) => setTier(e.target.value as any)}
            className="px-3 py-2 text-sm rounded-sm border border-gft-gray300 outline-none focus:border-gft-black font-body">
            <option value="solid">Solid</option><option value="flake">Flake</option><option value="metallic">Metallic</option>
          </select>
        </div>
        <div>
          <label htmlFor="pe-low" className="text-xs font-semibold text-gft-black font-body block mb-1">Low $/sqft</label>
          <input id="pe-low" inputMode="decimal" value={low} onChange={(e) => setLow(e.target.value)}
            className="w-24 px-3 py-2 text-sm rounded-sm border border-gft-gray300 outline-none focus:border-gft-black tabular-nums font-body" />
        </div>
        <div>
          <label htmlFor="pe-high" className="text-xs font-semibold text-gft-black font-body block mb-1">High $/sqft</label>
          <input id="pe-high" inputMode="decimal" value={high} onChange={(e) => setHigh(e.target.value)}
            className="w-24 px-3 py-2 text-sm rounded-sm border border-gft-gray300 outline-none focus:border-gft-black tabular-nums font-body" />
        </div>
      </div>
      <button onClick={save} disabled={pending || !low || !high}
        className="px-4 py-2 text-xs font-semibold rounded-sm bg-gft-red text-white disabled:opacity-60 font-body">
        {pending ? "Saving…" : "Save rate"}
      </button>
      {msg && <p className="text-[11px] text-gft-gray700 font-body mt-2">{msg}</p>}
    </div>
  );
}
