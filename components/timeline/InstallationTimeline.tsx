import React from "react";
import { color, radius, font } from "../../styles/tokens";
import type { TimelineStep } from "../../types";

export interface InstallationTimelineProps {
  steps: TimelineStep[];
  /** index of furthest completed step for progress-line animation; -1 = static */
  activeThrough?: number;
}

export function InstallationTimeline({ steps, activeThrough = steps.length - 1 }: InstallationTimelineProps) {
  return (
    <div className="p-6" style={{ backgroundColor: color.white, borderRadius: radius.lg }}>
      <ol className="flex items-start justify-between overflow-x-auto gap-2 list-none m-0 p-0">
        {steps.map((step, i) => (
          <li key={step.id} className="flex flex-col items-center text-center flex-1 min-w-[96px]">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold mb-2"
              style={{
                backgroundColor: i <= activeThrough ? color.red : color.gray100,
                color: i <= activeThrough ? color.white : color.gray500,
                fontFamily: font.body,
              }}
              aria-hidden
            >
              {i + 1}
            </div>
            <p className="text-xs font-semibold mb-1" style={{ fontFamily: font.body, color: color.black }}>
              {step.label}
            </p>
            <p className="text-[11px] leading-snug hidden md:block" style={{ fontFamily: font.body, color: color.gray500 }}>
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
