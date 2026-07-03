"use client";

import React, { useState } from "react";
import { saveDesign } from "../../app/actions";
import { blends } from "../../data/blends";
import { useActionSubmit, Chip, SubmitButton, ResultBanner, Honeypot } from "../shared/form";

/* ================= Visualizer (/tools/visualizer) ================= */

export function Visualizer() {
  const [blend, setBlend] = useState(blends[0]);
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const { pending, result, submit } = useActionSubmit("design_saved");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    submit(() => saveDesign({ blendId: blend.id, email, zip, company: (form.get("company") as string) ?? "" }));
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <div>
        <div className="relative overflow-hidden rounded-lg border border-gft-gray300">
          <div className="h-32 bg-gradient-to-b from-gft-gray100 to-gft-gray300 flex items-end justify-center">
            <div className="w-3/4 h-20 rounded-t bg-gft-charcoal/85" />
          </div>
          <div
            className="h-44 transition-all duration-300"
            style={{ background: blend.css, backgroundSize: "14px 14px" }}
            role="img"
            aria-label={`Garage floor rendered in ${blend.name}`}
          />
          <div className="absolute bottom-3 left-3 px-3 py-1.5 text-xs font-semibold rounded-sm bg-gft-black/80 text-gft-cream font-body">
            {blend.name}
          </div>
        </div>
        <p className="text-[11px] mt-2 text-gft-gray500 font-body">
          Template garage shown; photo-upload rendering ships with real product photography.
        </p>
      </div>

      <form onSubmit={onSubmit} className="relative">
        <Honeypot />
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gft-red mb-4 font-body">Choose your blend</p>
        <div className="grid grid-cols-4 gap-3 mb-6" role="radiogroup" aria-label="Flake blends">
          {blends.map((b) => (
            <button
              key={b.id}
              type="button"
              role="radio"
              aria-checked={blend.id === b.id}
              onClick={() => setBlend(b)}
              className="flex flex-col items-center gap-1.5 bg-transparent border-0 cursor-pointer"
            >
              <span
                className={`w-14 h-14 rounded-lg block ${blend.id === b.id ? "outline outline-2 outline-offset-2 outline-gft-red" : "outline outline-1 outline-gft-gray300"}`}
                style={{ background: b.css, backgroundSize: "10px 10px" }}
              />
              <span className={`text-[10px] font-semibold font-body ${blend.id === b.id ? "text-gft-black" : "text-gft-gray500"}`}>
                {b.name}
              </span>
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
            aria-label="Email" className="px-4 py-2.5 text-sm rounded-sm border border-gft-gray300 outline-none focus:border-gft-black font-body"
          />
          <input
            value={zip} onChange={(e) => setZip(e.target.value)} placeholder="ZIP (optional)" inputMode="numeric"
            aria-label="ZIP code" className="px-4 py-2.5 text-sm rounded-sm border border-gft-gray300 outline-none focus:border-gft-black tabular-nums font-body"
          />
        </div>
        <SubmitButton pending={pending}>Save My Design & Get a Quote</SubmitButton>
        <ResultBanner result={result} />
        <p className="text-[11px] mt-3 text-gft-gray500 font-body">
          Saved designs attach to your GFT Project ID™ so your installer sees exactly what you chose.
        </p>
      </form>
    </div>
  );
}

/* ================= Cost Calculator (/tools/cost-calculator) ================= */

export function CostCalculator() {
  const [sqft, setSqft] = useState(450);
  const low = Math.round((sqft * 6.5) / 50) * 50;
  const high = Math.round((sqft * 8.5) / 50) * 50;
  return (
    <div className="bg-white rounded-lg border border-gft-gray100 p-6 md:p-8">
      <label htmlFor="sqft" className="text-sm font-semibold text-gft-black font-body block mb-2">
        Floor area: <span className="tabular-nums">{sqft} sq ft</span>
      </label>
      <input
        id="sqft" type="range" min={150} max={1200} step={10} value={sqft}
        onChange={(e) => setSqft(+e.target.value)} className="w-full mb-2 accent-gft-red"
      />
      <div className="flex justify-between text-[11px] text-gft-gray500 font-body mb-8">
        <span>1-car ≈ 250</span><span>2-car ≈ 450</span><span>3-car ≈ 650</span><span>Shop ≈ 1200</span>
      </div>
      <p className="text-xs text-gft-gray500 font-body">Full-broadcast flake system, installed</p>
      <p className="text-4xl font-extrabold tabular-nums mb-1 font-display text-gft-black">
        ${low.toLocaleString()}–${high.toLocaleString()}
      </p>
      <p className="text-sm text-gft-gray700 font-body mb-6">
        from <strong className="tabular-nums">${Math.round(low / 36)}/mo</strong> · includes ArmorPrep™, FloorPassport™, lifetime warranty
      </p>
      <a href="/estimate" className="inline-block px-6 py-3 text-sm font-semibold rounded-sm bg-gft-red text-white no-underline hover:-translate-y-0.5 hover:shadow-md transition-all duration-150">
        Get My Exact Quote
      </a>
      <p className="text-[11px] text-gft-gray500 font-body mt-4">
        National placeholder rates pending regional pricing data.
      </p>
    </div>
  );
}

/* ================= Financing (/tools/financing) ================= */

export function FinancingCalculator() {
  const [amount, setAmount] = useState(3400);
  const [months, setMonths] = useState(36);
  const apr = 0.0799; // [VERIFY] partner APR before publish
  const r = apr / 12;
  const payment = Math.round((amount * r) / (1 - Math.pow(1 + r, -months)));
  return (
    <div className="bg-white rounded-lg border border-gft-gray100 p-6 md:p-8">
      <label htmlFor="amt" className="text-sm font-semibold text-gft-black font-body block mb-2">
        Project amount: <span className="tabular-nums">${amount.toLocaleString()}</span>
      </label>
      <input
        id="amt" type="range" min={1500} max={12000} step={100} value={amount}
        onChange={(e) => setAmount(+e.target.value)} className="w-full mb-6 accent-gft-red"
      />
      <p className="text-sm font-semibold text-gft-black font-body mb-2">Term</p>
      <div className="flex gap-2 mb-8">
        {[12, 24, 36, 60].map((m) => (
          <Chip key={m} selected={months === m} onClick={() => setMonths(m)}>{m} mo</Chip>
        ))}
      </div>
      <p className="text-xs text-gft-gray500 font-body">Estimated monthly payment</p>
      <p className="text-4xl font-extrabold tabular-nums mb-1 font-display text-gft-black">
        ${payment}<span className="text-base font-medium text-gft-gray500 font-body">/mo</span>
      </p>
      <p className="text-[11px] text-gft-gray500 font-body mb-6">
        Illustrative at {(apr * 100).toFixed(2)}% APR — standard amortization, shown openly. Actual terms set by financing partner on approval.
      </p>
      <a href="/estimate" className="inline-block px-6 py-3 text-sm font-semibold rounded-sm bg-gft-red text-white no-underline hover:-translate-y-0.5 hover:shadow-md transition-all duration-150">
        Get My Free Estimate
      </a>
    </div>
  );
}
