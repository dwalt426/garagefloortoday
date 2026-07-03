"use client";

import React, { useMemo, useState } from "react";
import { color, font, radius } from "../../styles/tokens";
import { Button } from "../../components/buttons/Button";
import type { CoatingSystem } from "../../types";

export interface FloorFinderAnswers {
  space: "residential" | "commercial" | null;
  usage: "parking" | "workshop" | null;
  style: "flake" | "metallic" | "solid" | null;
}

export interface FloorRecommendation {
  system: CoatingSystem;
  systemLabel: string;
  blendName: string;
  priceRange: string;
  reason: string;
}

/** Deterministic recommendation logic — v1 is a simple decision table.
 *  When the GFT Performance System backend exists, this becomes an API call
 *  returning the same FloorRecommendation type; the UI doesn't change.
 *  Price ranges are placeholders until real regional pricing data is connected.
 */
export function recommend(a: FloorFinderAnswers): FloorRecommendation | null {
  if (!a.space || !a.usage || !a.style) return null;
  const commercial = a.space === "commercial";
  const workshop = a.usage === "workshop";

  const system: CoatingSystem = commercial || workshop ? "polyurea-hybrid" : "polyaspartic";
  const systemLabel =
    system === "polyurea-hybrid" ? "GFT Performance — Polyurea Hybrid" : "GFT Performance — Polyaspartic";

  const blends: Record<NonNullable<FloorFinderAnswers["style"]>, string> = {
    flake: commercial ? "Quarry Slate" : "Granite Ridge",
    metallic: "Carbon Fleck Metallic",
    solid: "Foundry Gray Solid",
  };

  const priceRange = commercial
    ? "$6–$9 / sq ft"
    : workshop
    ? "$3,400–$4,600 (2-car)"
    : "$2,850–$3,900 (2-car)";

  const reason = commercial
    ? "High-traffic durability and chemical resistance for commercial loads."
    : workshop
    ? "Impact and chemical resistance rated for tools, jacks, and spills."
    : "UV-stable, hot-tire-safe, and fast return to parking.";

  return { system, systemLabel, blendName: blends[a.style], priceRange, reason };
}

const questions = [
  {
    key: "space" as const,
    prompt: "What kind of space?",
    options: [
      { value: "residential", label: "Residential" },
      { value: "commercial", label: "Commercial" },
    ],
  },
  {
    key: "usage" as const,
    prompt: "How is it used?",
    options: [
      { value: "parking", label: "Daily parking" },
      { value: "workshop", label: "Workshop / heavy use" },
    ],
  },
  {
    key: "style" as const,
    prompt: "Preferred style?",
    options: [
      { value: "flake", label: "Flake" },
      { value: "metallic", label: "Metallic" },
      { value: "solid", label: "Solid color" },
    ],
  },
];

export function FloorFinder() {
  const [answers, setAnswers] = useState<FloorFinderAnswers>({ space: null, usage: null, style: null });
  const rec = useMemo(() => recommend(answers), [answers]);
  const step = answers.space === null ? 0 : answers.usage === null ? 1 : answers.style === null ? 2 : 3;

  return (
    <div
      className="p-6 md:p-8 w-full max-w-md"
      style={{ backgroundColor: color.white, borderRadius: radius.lg, boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}
    >
      <p className="text-xs font-semibold uppercase mb-1" style={{ fontFamily: font.body, color: color.red, letterSpacing: "0.12em" }}>
        Find Your Perfect Floor
      </p>
      <p className="text-xs mb-5" style={{ fontFamily: font.body, color: color.gray500 }}>
        Three questions · engineered by the GFT Performance System
      </p>

      {questions.map((q, i) => (
        <div key={q.key} className="mb-4" style={{ opacity: i <= step ? 1 : 0.35, transition: "opacity 300ms" }}>
          <p className="text-sm font-semibold mb-2" style={{ fontFamily: font.body, color: color.black }}>
            {q.prompt}
          </p>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={q.prompt}>
            {q.options.map((opt) => {
              const selected = answers[q.key] === opt.value;
              return (
                <button
                  key={opt.value}
                  role="radio"
                  aria-checked={selected}
                  disabled={i > step}
                  onClick={() => setAnswers((prev) => ({ ...prev, [q.key]: opt.value }))}
                  className="px-4 py-2 text-xs font-semibold transition-colors duration-150"
                  style={{
                    fontFamily: font.body,
                    borderRadius: radius.sm,
                    border: `1px solid ${selected ? color.red : color.gray300}`,
                    backgroundColor: selected ? color.red : "transparent",
                    color: selected ? color.white : color.black,
                    cursor: i > step ? "default" : "pointer",
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {rec && (
        <div className="mt-6 pt-5" style={{ borderTop: `1px solid ${color.gray100}` }}>
          <p className="text-xs" style={{ fontFamily: font.body, color: color.gray500 }}>Recommended system</p>
          <p className="text-base font-bold mb-1" style={{ fontFamily: font.display, color: color.black }}>
            {rec.systemLabel}
          </p>
          <p className="text-sm mb-1" style={{ fontFamily: font.body, color: color.gray700 }}>
            Blend: <strong>{rec.blendName}</strong> · <span className="tabular-nums">{rec.priceRange}</span>
          </p>
          <p className="text-xs mb-4" style={{ fontFamily: font.body, color: color.gray500 }}>{rec.reason}</p>
          <Button variant="primary" href="/estimate">Get My Exact Quote</Button>
        </div>
      )}
    </div>
  );
}
