"use client";

import React, { useEffect, useRef, useState } from "react";

/** Sprint 11 motion primitives. Design rules:
 *  - GPU properties only (opacity/transform), driven by CSS classes
 *  - Animate ONCE on entry; never re-trigger on scroll-up (confidence, not noise)
 *  - Every primitive is inert under prefers-reduced-motion (CSS handles it)
 *  - No animation library in the critical path — IntersectionObserver + CSS
 */

function useInView<T extends HTMLElement>(margin = "-10% 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { rootMargin: margin, threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return { ref, inView };
}

/** Fade-up reveal on entering the viewport. Optional delay for stagger. */
export function Reveal({ children, delay = 0, as: Tag = "div", className = "" }: {
  children: React.ReactNode; delay?: number; as?: any; className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      className={`gft-reveal ${inView ? "is-inview" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

/** Staggers direct children by the system stagger interval (80ms). */
export function Stagger({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, i) => (
        <Reveal delay={i * 80}>{child}</Reveal>
      ))}
    </div>
  );
}

/** Tabular-numeral counter that counts up once when visible. */
export function CountUp({ to, suffix = "", duration = 1400, className = "" }: {
  to: number; suffix?: string; duration?: number; className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [value, setValue] = useState(0);
  const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!inView) return;
    if (reduced) { setValue(to); return; }
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setValue(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced]);

  return <span ref={ref} className={`tabular-nums ${className}`}>{value.toLocaleString()}{suffix}</span>;
}

/** Subtle parallax: child drifts at a fraction of scroll speed. Transform-only,
 *  rAF-throttled, disabled under reduced motion. Keep factor ≤ 0.15. */
export function Parallax({ children, factor = 0.1, className = "" }: {
  children: React.ReactNode; factor?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -factor;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [factor]);
  return <div ref={ref} className={className} style={{ willChange: "transform" }}>{children}</div>;
}
