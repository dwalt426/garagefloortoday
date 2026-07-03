"use client";

import React, { useTransition } from "react";
import { updateChecklist } from "../../crew-actions";

const STEPS: [string, string][] = [
  ["armorprep_grind", "ArmorPrep™ diamond grinding complete"],
  ["moisture_pre", "Pre-grind moisture reading recorded"],
  ["moisture_post", "Post-grind moisture reading recorded"],
  ["crack_repair", "Structural crack repair complete"],
  ["system_applied", "GFT Performance System applied"],
  ["finished_photos", "Finished photos captured"],
  ["customer_walkthrough", "Customer walkthrough complete"],
];

export function JobChecklist({ projectId, checklist }: { projectId: string; checklist: Record<string, boolean> }) {
  const [pending, start] = useTransition();

  function toggle(key: string, value: boolean) {
    start(() => updateChecklist({ projectId, key, value }));
  }

  return (
    <div className="space-y-2">
      {STEPS.map(([key, label]) => (
        <label key={key} htmlFor={`chk-${key}`} className="flex items-center gap-3 bg-white rounded-lg border border-gft-gray100 p-3 cursor-pointer">
          <input
            id={`chk-${key}`}
            type="checkbox"
            checked={!!checklist[key]}
            disabled={pending}
            onChange={(e) => toggle(key, e.target.checked)}
            aria-label={label}
          />
          <span className="text-sm text-gft-black font-body">{label}</span>
        </label>
      ))}
    </div>
  );
}
