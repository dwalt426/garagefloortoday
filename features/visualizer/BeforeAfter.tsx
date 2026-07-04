"use client";

import React, { useRef, useState, useCallback } from "react";
import { color, font, radius, elevation } from "../../styles/tokens";

/** Before/after reveal slider. Drag the handle (or use arrow keys) to wipe
 *  between the bare slab and the finished floor. Pure transform/clip — no
 *  library, keyboard-accessible, reduced-motion neutral (it's user-driven).
 *
 *  Images are passed in so this works with real photography when it lands;
 *  defaults point at the hero comp so it renders meaningfully today.
 */
export function BeforeAfter({
  beforeSrc = "/hero/hero-social-comp.png",
  afterSrc = "/hero/hero-mustang-wide.png",
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  beforeSrc?: string; afterSrc?: string; beforeLabel?: string; afterLabel?: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative select-none overflow-hidden"
      style={{ borderRadius: radius.lg, boxShadow: elevation.float, aspectRatio: "16 / 10", cursor: "ew-resize" }}
      onMouseDown={(e) => { dragging.current = true; setFromClientX(e.clientX); }}
      onMouseMove={(e) => { if (dragging.current) setFromClientX(e.clientX); }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchStart={(e) => setFromClientX(e.touches[0].clientX)}
      onTouchMove={(e) => setFromClientX(e.touches[0].clientX)}
    >
      {/* after (full background) */}
      <img src={afterSrc} alt="Finished GarageFloorToday floor" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <span className="absolute bottom-3 right-3 z-10 px-3 py-1 text-xs font-semibold rounded" style={{ fontFamily: font.body, color: color.black, background: "rgba(246,241,231,0.9)" }}>
        {afterLabel}
      </span>

      {/* before (clipped overlay) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={beforeSrc}
          alt="Bare concrete garage floor before coating"
          className="absolute inset-0 h-full object-cover"
          style={{ width: ref.current ? ref.current.getBoundingClientRect().width : "100%", maxWidth: "none", filter: "grayscale(0.35) brightness(0.82)" }}
          draggable={false}
        />
        <span className="absolute bottom-3 left-3 px-3 py-1 text-xs font-semibold rounded" style={{ fontFamily: font.body, color: color.cream, background: "rgba(20,18,15,0.72)" }}>
          {beforeLabel}
        </span>
      </div>

      {/* handle */}
      <div className="absolute top-0 bottom-0 z-20" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
        <div style={{ width: 2, height: "100%", background: color.cream, boxShadow: "0 0 0 1px rgba(20,18,15,0.15)" }} />
        <button
          aria-label="Drag to compare before and after"
          role="slider"
          aria-valuenow={Math.round(pos)}
          aria-valuemin={0}
          aria-valuemax={100}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
            if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
          }}
          className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-none focus-visible:[box-shadow:0_0_0_3px_#B08D4F]"
          style={{ background: color.cream, boxShadow: elevation.lift, cursor: "ew-resize", border: "none" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color.black} strokeWidth="2">
            <path d="m9 18-6-6 6-6M15 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
