"use client";

import React, { useState, useTransition } from "react";
import { addBatch } from "../../crew-actions";

export function BatchForm({ projectId }: { projectId: string }) {
  const [coat, setCoat] = useState("");
  const [batch, setBatch] = useState("");
  const [pending, start] = useTransition();
  const [err, setErr] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(null);
    start(async () => {
      const res = await addBatch({ projectId, coat, batch });
      if (!res.ok) setErr(res.error); else { setCoat(""); setBatch(""); }
    });
  }

  return (
    <form onSubmit={submit} className="flex flex-wrap items-end gap-2">
      <div>
        <label htmlFor="bf-coat" className="text-xs font-semibold text-gft-black font-body block mb-1">Coat</label>
        <input id="bf-coat" required value={coat} onChange={(e) => setCoat(e.target.value)} placeholder="Base / Topcoat"
          className="w-32 px-3 py-2 text-sm rounded-sm border border-gft-gray300 outline-none focus:border-gft-black font-body" />
      </div>
      <div>
        <label htmlFor="bf-batch" className="text-xs font-semibold text-gft-black font-body block mb-1">Batch number</label>
        <input id="bf-batch" required value={batch} onChange={(e) => setBatch(e.target.value)} placeholder="PA-26-0447"
          className="w-32 px-3 py-2 text-sm rounded-sm border border-gft-gray300 outline-none focus:border-gft-black tabular-nums font-body" />
      </div>
      <button type="submit" disabled={pending || !coat || !batch}
        className="px-4 py-2 text-xs font-semibold rounded-sm bg-gft-red text-white disabled:opacity-60 font-body">
        {pending ? "Saving…" : "Add batch"}
      </button>
      {err && <p role="alert" className="text-[11px] text-gft-error font-body w-full">{err}</p>}
    </form>
  );
}
