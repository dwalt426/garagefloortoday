"use client";

import React, { useState, useTransition } from "react";
import { submitEstimate } from "../../app/actions";
import { color, font, radius, gradient, elevation } from "../../styles/tokens";

/** Homepage inline lead-capture — the "$70K" upgrade over a bare CTA link.
 *  A real, working form: ZIP + a couple of qualifying selects + contact,
 *  posting to the same submitEstimate() server action the full estimator uses.
 *  Honeypot ("company") + client validation + optimistic pending state + a
 *  genuine success confirmation. No new backend — reuses the proven action.
 */
const SIZES = [
  ["1-car", "1-car"],
  ["2-car", "2-car"],
  ["3-car", "3-car"],
  ["4-car+", "4+ car"],
] as const;

const CONDITIONS = [
  ["good", "Good shape"],
  ["minor-cracks", "Minor cracks"],
  ["major-repair", "Needs repair"],
] as const;

const FINISHES = [
  ["flake", "Flake"],
  ["metallic", "Metallic"],
  ["solid", "Solid"],
  ["quartz", "Quartz"],
] as const;

export function QuickEstimateForm() {
  const [pending, start] = useTransition();
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [zip, setZip] = useState("");
  const [size, setSize] = useState<string>("2-car");
  const [condition, setCondition] = useState<string>("good");
  const [finish, setFinish] = useState<string>("flake");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState(""); // honeypot

  function submit() {
    setError(null);
    if (zip.trim().length < 3) { setError("Please enter your ZIP code."); return; }
    if (!email.trim() && !phone.trim()) { setError("Add an email or phone so we can send your estimate."); return; }
    start(async () => {
      const res = await submitEstimate({
        zip: zip.trim(),
        email: email.trim(),
        phone: phone.trim(),
        size,
        condition,
        usage: "parking",
        finish,
        sourceTool: "smart_estimator",
        company,
      });
      if (res.ok) setDone(true);
      else setError(res.error ?? "Something went wrong. Please try again.");
    });
  }

  if (done) {
    return (
      <div className="p-8 text-center" style={{ background: color.white, borderRadius: radius.lg, boxShadow: elevation.float }}>
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full" style={{ background: color.success }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ fontFamily: font.display, color: color.black }}>Request received.</h3>
        <p className="text-sm" style={{ fontFamily: font.body, color: color.gray700 }}>
          Your certified local crew will reach out within one business day with a detailed estimate. Every quote is built to The GarageFloorToday Standard™.
        </p>
      </div>
    );
  }

  const label = { fontFamily: font.body, color: color.gray700 } as React.CSSProperties;
  const input: React.CSSProperties = {
    fontFamily: font.body, borderRadius: radius.sm, border: `1px solid ${color.gray300}`,
    padding: "12px 14px", fontSize: 15, width: "100%", color: color.black, background: color.white,
  };

  return (
    <div className="p-6 md:p-8" style={{ background: color.white, borderRadius: radius.lg, boxShadow: elevation.float }}>
      <p className="text-xs font-semibold uppercase mb-1" style={{ fontFamily: font.body, color: color.red, letterSpacing: "0.14em" }}>
        Free · No obligation
      </p>
      <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: font.display, color: color.black, letterSpacing: "-0.01em" }}>
        Get your estimate in 60 seconds
      </h3>

      <div className="grid gap-4">
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={label}>ZIP code</label>
          <input style={input} inputMode="numeric" placeholder="e.g. 63301" value={zip} onChange={(e) => setZip(e.target.value)} aria-label="ZIP code" />
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1.5" style={label}>Garage size</label>
          <div className="flex flex-wrap gap-2">
            {SIZES.map(([val, lbl]) => (
              <Chip key={val} selected={size === val} onClick={() => setSize(val)}>{lbl}</Chip>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1.5" style={label}>Floor condition</label>
          <div className="flex flex-wrap gap-2">
            {CONDITIONS.map(([val, lbl]) => (
              <Chip key={val} selected={condition === val} onClick={() => setCondition(val)}>{lbl}</Chip>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1.5" style={label}>Preferred finish</label>
          <div className="flex flex-wrap gap-2">
            {FINISHES.map(([val, lbl]) => (
              <Chip key={val} selected={finish === val} onClick={() => setFinish(val)}>{lbl}</Chip>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={label}>Email</label>
            <input style={input} type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={label}>Phone</label>
            <input style={input} type="tel" placeholder="(555) 555-0143" value={phone} onChange={(e) => setPhone(e.target.value)} aria-label="Phone" />
          </div>
        </div>

        {/* honeypot — visually hidden, off-screen; bots fill it, humans can't see it */}
        <input
          type="text" tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)}
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} aria-hidden
        />

        {error && (
          <p className="text-sm" style={{ fontFamily: font.body, color: color.error }} role="alert">{error}</p>
        )}

        <button
          onClick={submit}
          disabled={pending}
          className="gft-sheen mt-1 focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_#F6F1E7,0_0_0_4px_#B08D4F]"
          style={{
            fontFamily: font.body, background: gradient.redSheen, color: color.white, border: "none",
            borderRadius: radius.sm, fontWeight: 600, fontSize: 16, padding: "16px 24px", cursor: pending ? "wait" : "pointer",
            opacity: pending ? 0.75 : 1, boxShadow: elevation.rest, transition: "opacity 150ms",
          }}
        >
          {pending ? "Sending…" : "Get My Free Estimate"}
        </button>
        <p className="text-[11px] text-center" style={{ fontFamily: font.body, color: color.gray500 }}>
          Certified local crews · Premium materials · Documented on FloorPassport™
        </p>
      </div>
    </div>
  );
}

function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="transition-all focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_#B08D4F]"
      style={{
        fontFamily: font.body, fontSize: 14, fontWeight: 600, padding: "9px 16px", borderRadius: radius.sm, cursor: "pointer",
        background: selected ? color.black : color.gray100,
        color: selected ? color.cream : color.gray700,
        border: `1px solid ${selected ? color.black : color.gray300}`,
      }}
    >
      {children}
    </button>
  );
}
