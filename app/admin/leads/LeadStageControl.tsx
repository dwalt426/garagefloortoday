"use client";

import React, { useState, useTransition } from "react";
import { updateLeadStage, type LeadStage } from "../../admin-actions";

const STAGES: [LeadStage, string][] = [
  ["new", "New"], ["contacted", "Contacted"], ["estimate_scheduled", "Estimate Scheduled"],
  ["estimate_sent", "Estimate Sent"], ["won", "Won"], ["installed", "Installed"],
  ["warranty", "Warranty"], ["maintenance", "Maintenance"], ["lost", "Lost"],
];

/** Client control that moves a lead through the pipeline via the admin action. */
export function LeadStageControl({ leadId, current }: { leadId: string; current: LeadStage }) {
  const [stage, setStage] = useState<LeadStage>(current);
  const [pending, start] = useTransition();
  const [err, setErr] = useState<string | null>(null);

  function change(next: LeadStage) {
    const prev = stage;
    setStage(next); setErr(null);
    start(async () => {
      const res = await updateLeadStage({ leadId, stage: next });
      if (!res.ok) { setStage(prev); setErr(res.error); }
    });
  }

  return (
    <div>
      <label className="sr-only" htmlFor={`stage-${leadId}`}>Lead stage</label>
      <select
        id={`stage-${leadId}`}
        value={stage}
        disabled={pending}
        onChange={(e) => change(e.target.value as LeadStage)}
        className="w-full px-2 py-1.5 text-xs rounded-sm border border-gft-gray300 outline-none focus:border-gft-black font-body disabled:opacity-60"
      >
        {STAGES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
      {err && <p role="alert" className="text-[11px] text-gft-error font-body mt-1">{err}</p>}
    </div>
  );
}
