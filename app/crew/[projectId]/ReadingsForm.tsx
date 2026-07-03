"use client";

import React, { useState, useTransition } from "react";
import { addMoistureReading } from "../../crew-actions";

export function ReadingsForm({ projectId }: { projectId: string }) {
  const [stage, setStage] = useState<"pre-grind" | "post-grind">("pre-grind");
  const [value, setValue] = useState("");
  const [pending, start] = useTransition();
  const [err, setErr] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(null);
    start(async () => {
      const res = await addMoistureReading({ projectId, stage, value: parseFloat(value) });
      if (!res.ok) setErr(res.error); else setValue("");
    });
  }

  return (
    <form onSubmit={submit} className="flex flex-wrap items-end gap-2">
      <div>
        <label htmlFor="rf-stage" className="text-xs font-semibold text-gft-black font-body block mb-1">Stage</label>
        <select id="rf-stage" value={stage} onChange={(e) => setStage(e.target.value as any)}
          className="px-3 py-2 text-sm rounded-sm border border-gft-gray300 outline-none focus:border-gft-black font-body">
          <option value="pre-grind">Pre-grind</option>
          <option value="post-grind">Post-grind</option>
        </select>
      </div>
      <div>
        <label htmlFor="rf-value" className="text-xs font-semibold text-gft-black font-body block mb-1">Reading (lbs/1000sqft/24h)</label>
        <input id="rf-value" inputMode="decimal" required value={value} onChange={(e) => setValue(e.target.value)}
          className="w-40 px-3 py-2 text-sm rounded-sm border border-gft-gray300 outline-none focus:border-gft-black tabular-nums font-body" />
      </div>
      <button type="submit" disabled={pending || !value}
        className="px-4 py-2 text-xs font-semibold rounded-sm bg-gft-red text-white disabled:opacity-60 font-body">
        {pending ? "Saving…" : "Add reading"}
      </button>
      {err && <p role="alert" className="text-[11px] text-gft-error font-body w-full">{err}</p>}
    </form>
  );
}
