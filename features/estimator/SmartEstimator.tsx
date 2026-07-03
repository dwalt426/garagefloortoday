"use client";

import React, { useMemo, useState } from "react";
import { submitEstimate } from "../../app/actions";
import { estimate, type GarageSize, type SlabCondition, type FinishTier } from "./pricing";
import { useActionSubmit, Chip, Field, SubmitButton, ResultBanner, Honeypot } from "../shared/form";

/** /estimate — the primary lead generator. Instant client-side range from the
 *  pricing engine; contact capture submits through the validated, rate-limited
 *  Server Action. Same pricing function will run server-side for formal quotes.
 */
export function SmartEstimator() {
  const [size, setSize] = useState<GarageSize | null>(null);
  const [condition, setCondition] = useState<SlabCondition | null>(null);
  const [usage, setUsage] = useState<"parking" | "workshop" | null>(null);
  const [finish, setFinish] = useState<FinishTier | null>(null);
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { pending, result, submit } = useActionSubmit("estimate_submitted");

  const quote = useMemo(() => {
    if (!size || !condition || !finish || size === "custom") return null;
    return estimate({ size, condition, finish });
  }, [size, condition, finish]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    submit(() =>
      submitEstimate({
        zip, email, phone,
        size: size ?? "", condition: condition ?? "", usage: usage ?? "", finish: finish ?? "",
        sourceTool: "smart_estimator",
        company: (form.get("company") as string) ?? "",
      })
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      {/* Questions */}
      <div className="bg-white rounded-lg border border-gft-gray100 p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gft-red mb-5 font-body">
          Smart Estimate Builder
        </p>
        <div className="mb-5">
          <label className="text-sm font-semibold text-gft-black font-body block mb-2" htmlFor="zip">ZIP code</label>
          <input
            id="zip" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="75201" inputMode="numeric"
            className="w-32 px-4 py-2.5 text-sm rounded-sm border border-gft-gray300 outline-none focus:border-gft-black tabular-nums font-body"
          />
        </div>
        <Field label="Garage size">
          {(["1-car", "2-car", "3-car"] as const).map((v) => (
            <Chip key={v} selected={size === v} onClick={() => setSize(v)}>{v}</Chip>
          ))}
        </Field>
        <Field label="Slab condition">
          {([["good", "Good shape"], ["minor-cracks", "Minor cracks"], ["major-repair", "Needs repair"]] as const).map(([v, l]) => (
            <Chip key={v} selected={condition === v} onClick={() => setCondition(v)}>{l}</Chip>
          ))}
        </Field>
        <Field label="How it's used">
          {([["parking", "Daily parking"], ["workshop", "Workshop / heavy use"]] as const).map(([v, l]) => (
            <Chip key={v} selected={usage === v} onClick={() => setUsage(v)}>{l}</Chip>
          ))}
        </Field>
        <Field label="Finish tier">
          {([["solid", "Solid"], ["flake", "Flake"], ["metallic", "Metallic"]] as const).map(([v, l]) => (
            <Chip key={v} selected={finish === v} onClick={() => setFinish(v)}>{l}</Chip>
          ))}
        </Field>
      </div>

      {/* Result + capture */}
      <div className="space-y-4">
        {quote ? (
          <form onSubmit={onSubmit} className="bg-white rounded-lg border border-gft-gray100 p-6 md:p-8 relative">
            <Honeypot />
            <p className="text-xs text-gft-gray500 font-body">Your estimate · {quote.sqFt} sq ft</p>
            <p className="text-4xl font-extrabold tabular-nums my-1 font-display text-gft-black">
              ${quote.low.toLocaleString()}–${quote.high.toLocaleString()}
            </p>
            <p className="text-sm text-gft-gray700 font-body mb-5">
              or from <strong className="tabular-nums">${quote.monthlyFrom}/mo</strong> financing
            </p>
            <ul className="space-y-1.5 mb-6 list-none p-0">
              {quote.lineItems.map((li) => (
                <li key={li.label} className="text-xs text-gft-gray700 font-body">
                  <span className="font-semibold text-gft-black">{li.label}</span> — {li.note}
                </li>
              ))}
            </ul>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
                aria-label="Email" className="px-4 py-2.5 text-sm rounded-sm border border-gft-gray300 outline-none focus:border-gft-black font-body"
              />
              <input
                type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)"
                aria-label="Phone" className="px-4 py-2.5 text-sm rounded-sm border border-gft-gray300 outline-none focus:border-gft-black font-body"
              />
            </div>
            <SubmitButton pending={pending}>Get My Exact Quote</SubmitButton>
            <ResultBanner result={result} />
            <p className="text-[11px] text-gft-gray500 font-body mt-4">
              Range uses national placeholder rates pending regional pricing data. Final quote follows an on-site ArmorPrep™ inspection.
            </p>
          </form>
        ) : (
          <div className="bg-white rounded-lg border border-gft-gray100 p-6 md:p-8">
            <p className="text-sm text-gft-gray500 font-body">
              Answer the questions to see your price range instantly — before anyone calls you.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
