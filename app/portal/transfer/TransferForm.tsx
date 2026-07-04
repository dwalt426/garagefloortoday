"use client";

import React, { useState, useTransition } from "react";
import { initiateTransfer } from "../../portal-actions";

export function TransferForm({ projects }: { projects: { id: string; label: string }[] }) {
  const [projectId, setProjectId] = useState(projects[0]?.id ?? "");
  const [email, setEmail] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault(); setMsg(null);
    start(async () => {
      const res = await initiateTransfer({ gftProjectId: projectId, newOwnerEmail: email, confirm });
      setMsg(res.ok ? { ok: true, text: "Transfer initiated. The new owner can claim it when they create an account with that email." } : { ok: false, text: res.error });
      if (res.ok) { setEmail(""); setConfirm(false); }
    });
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-lg border border-gft-gray100 p-5">
      <label htmlFor="tf-project" className="text-xs font-semibold text-gft-black font-body block mb-1">Floor to transfer</label>
      <select id="tf-project" value={projectId} onChange={(e) => setProjectId(e.target.value)}
        className="w-full px-3 py-2.5 text-sm rounded-sm border border-gft-gray300 outline-none focus:border-gft-black font-body mb-4">
        {projects.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
      </select>
      <label htmlFor="tf-email" className="text-xs font-semibold text-gft-black font-body block mb-1">New owner's email</label>
      <input id="tf-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2.5 text-sm rounded-sm border border-gft-gray300 outline-none focus:border-gft-black font-body mb-4" />
      <label className="flex items-start gap-2 mb-4 cursor-pointer">
        <input id="tf-confirm" type="checkbox" aria-label="Confirm ownership transfer" checked={confirm} onChange={(e) => setConfirm(e.target.checked)} className="mt-0.5" />
        <span className="text-xs text-gft-gray700 font-body">
          I understand this transfers the warranty and record to the new owner.
        </span>
      </label>
      <button type="submit" disabled={pending || !confirm}
        className="px-4 py-2.5 text-sm font-semibold rounded-sm bg-gft-red text-white disabled:opacity-60 font-body">
        {pending ? "Processing…" : "Initiate Transfer"}
      </button>
      {msg && <p role={msg.ok ? "status" : "alert"} className={`text-xs font-body mt-3 ${msg.ok ? "text-gft-success" : "text-gft-error"}`}>{msg.text}</p>}
    </form>
  );
}
