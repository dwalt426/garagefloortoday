"use client";

import React, { useState, useTransition } from "react";
import { closeProject } from "../../crew-actions";
import { ShieldCheck } from "lucide-react";

export function CloseProjectControl({ projectId, checklistDone, checklistTotal }: {
  projectId: string; checklistDone: number; checklistTotal: number;
}) {
  const [signed, setSigned] = useState(false);
  const [pending, start] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null);
  const ready = checklistDone === checklistTotal;

  function submit() {
    setResult(null);
    start(async () => {
      const res = await closeProject({ projectId, customerSigned: true });
      setResult(
        res.ok
          ? { ok: true, text: `Closed. FloorPassport™ ${res.gftProjectId} is now live for the customer and public lookup.` }
          : { ok: false, text: res.error }
      );
    });
  }

  if (result?.ok) {
    return (
      <div className="flex items-center gap-2 bg-[#e8f2ea] rounded-lg p-4">
        <ShieldCheck size={18} className="text-gft-success shrink-0" />
        <p role="status" className="text-sm text-gft-success font-body">{result.text}</p>
      </div>
    );
  }

  return (
    <div>
      <label htmlFor="close-signed" className="flex items-start gap-2 mb-3 cursor-pointer">
        <input
          id="close-signed"
          type="checkbox"
          aria-label="Customer has signed off on completed work"
          checked={signed}
          disabled={!ready}
          onChange={(e) => setSigned(e.target.checked)}
          className="mt-0.5"
        />
        <span className="text-xs text-gft-gray700 font-body">
          Customer has reviewed the finished floor and signed off in person.
        </span>
      </label>
      <button
        onClick={submit}
        disabled={pending || !signed || !ready}
        className="px-5 py-2.5 text-sm font-semibold rounded-sm bg-gft-red text-white disabled:opacity-60 font-body"
      >
        {pending ? "Closing…" : ready ? "Close Project & Issue FloorPassport™" : `Complete checklist first (${checklistDone}/${checklistTotal})`}
      </button>
      {result && !result.ok && <p role="alert" className="text-xs text-gft-error font-body mt-3">{result.text}</p>}
    </div>
  );
}
