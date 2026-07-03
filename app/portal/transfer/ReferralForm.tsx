"use client";

import React, { useState, useTransition } from "react";
import { submitReferral } from "../../portal-actions";

export function ReferralForm() {
  const [email, setEmail] = useState("");
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault(); setMsg(null);
    const form = new FormData(e.currentTarget as HTMLFormElement);
    start(async () => {
      const res = await submitReferral({ friendEmail: email, company: (form.get("company") as string) ?? "" });
      setMsg(res.ok ? { ok: true, text: "Sent — thanks for the referral." } : { ok: false, text: res.error });
      if (res.ok) setEmail("");
    });
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-lg border border-gft-gray100 p-5">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <label htmlFor="ref-email" className="text-xs font-semibold text-gft-black font-body block mb-1">Friend's email</label>
      <div className="flex gap-2">
        <input id="ref-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-3 py-2.5 text-sm rounded-sm border border-gft-gray300 outline-none focus:border-gft-black font-body" />
        <button type="submit" disabled={pending}
          className="px-4 py-2.5 text-sm font-semibold rounded-sm bg-gft-red text-white disabled:opacity-60 font-body whitespace-nowrap">
          {pending ? "Sending…" : "Send"}
        </button>
      </div>
      {msg && <p role={msg.ok ? "status" : "alert"} className={`text-xs font-body mt-2 ${msg.ok ? "text-gft-success" : "text-gft-error"}`}>{msg.text}</p>}
    </form>
  );
}
