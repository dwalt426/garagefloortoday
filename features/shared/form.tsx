"use client";

import React, { useState, useTransition } from "react";
import type { ActionResult } from "../../app/actions";

/** Shared submit-state machine for every Revenue Engine form.
 *  Handles pending / success / error consistently, fires the GA4 conversion
 *  event on success, and keeps all tools' UX identical.
 */
export function useActionSubmit(eventName: string) {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);

  function submit(action: () => Promise<ActionResult>) {
    setResult(null);
    startTransition(async () => {
      const res = await action();
      setResult(res);
      if (res.ok && typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", eventName);
      }
    });
  }

  return { pending, result, submit };
}

/* ---------- shared UI ---------- */

export function Chip({ selected, onClick, children, disabled }: {
  selected: boolean; onClick: () => void; children: React.ReactNode; disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 text-xs font-semibold rounded-sm border transition-colors duration-150 disabled:opacity-40
        ${selected ? "bg-gft-red border-gft-red text-white" : "bg-white border-gft-gray300 text-gft-black hover:border-gft-black"}`}
    >
      {children}
    </button>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <p className="text-sm font-semibold mb-2 text-gft-black font-body">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export function SubmitButton({ pending, children }: { pending: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-3 text-sm font-semibold rounded-sm bg-gft-red text-white transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60 disabled:translate-y-0"
    >
      {pending ? "Sending…" : children}
    </button>
  );
}

export function ResultBanner({ result }: { result: ActionResult | null }) {
  if (!result) return null;
  return result.ok ? (
    <p role="status" className="mt-4 text-sm font-semibold text-gft-success font-body">
      Got it — a certified local team will follow up shortly. Check your email for confirmation.
    </p>
  ) : (
    <p role="alert" className="mt-4 text-sm font-semibold text-gft-error font-body">
      {result.error}
    </p>
  );
}

/** Honeypot — visually hidden, screen-reader hidden; bots fill it, action rejects it. */
export function Honeypot() {
  return (
    <input
      type="text"
      name="company"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute -left-[9999px] h-0 w-0 opacity-0"
    />
  );
}
