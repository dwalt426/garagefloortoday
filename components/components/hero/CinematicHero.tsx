import React from "react";
import Image from "next/image";
import { color, font, gradient } from "../../styles/tokens";
import { Button } from "../buttons/Button";
import { Reveal } from "../motion/Motion";

/** Sprint 11 cinematic hero.
 *
 *  Composition (back to front):
 *    1. Full-bleed photography — the real coated-floor garage (The Lens:
 *       a lived-in space that happens to be cinematic). Slow Ken-Burns drift.
 *    2. Vignette + left-anchored depth gradient so type sits in studio darkness
 *       while the floor and car stay lit.
 *    3. Film grain at 5% — kills the "digital flatness" of pure gradients.
 *    4. Content: eyebrow → massive display type (clamp 44px→96px) → one primary
 *       CTA + one ghost. Micro-trust line. Gold hairline. Scroll cue.
 *
 *  Rules preserved: one image, one message, one primary CTA. No slider. The
 *  Seal appears IN the photography (brand art), never as header chrome.
 */
export function CinematicHero({ h1, subhead, primaryCta, secondaryCta, microTrust }: {
  h1: string; subhead: string; primaryCta: string; secondaryCta: string; microTrust: string;
}) {
  return (
    <section className="relative min-h-[92svh] flex items-end overflow-hidden gft-grain" style={{ backgroundColor: "#0C0B09" }}>
      {/* 1 — photography, drifting */}
      <div className="absolute inset-0 gft-drift">
        <Image
          src="/hero/hero-mustang-wide.png"
          alt="A classic red Mustang parked on a freshly coated flake garage floor, light reflecting off the finish"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
      </div>

      {/* 2 — lighting rig */}
      <div aria-hidden className="absolute inset-0" style={{ background: gradient.heroVignette }} />
      <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,9,7,0.88) 0%, rgba(10,9,7,0.55) 38%, transparent 68%)" }} />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40" style={{ background: gradient.floorReflection }} />

      {/* 4 — content */}
      <div className="relative z-10 w-full px-6 pb-20 pt-40">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <Image
              src="/logos/gft-logo-horizontal-transparent.png"
              alt="Garage Floor Today"
              width={280}
              height={187}
              priority
              className="mb-6 h-auto w-[200px] md:w-[260px] drop-shadow-2xl"
            />
          </Reveal>
          <Reveal>
            <p className="text-xs font-semibold uppercase mb-5" style={{ fontFamily: font.body, color: color.gold, letterSpacing: "0.22em" }}>
              America's Premium Concrete Coating Company
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1
              className="font-extrabold leading-[0.98] mb-6 max-w-4xl"
              style={{ fontFamily: font.display, color: color.cream, fontSize: "clamp(44px, 7.5vw, 96px)", letterSpacing: "-0.02em" }}
            >
              {h1}
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="text-lg md:text-xl max-w-xl mb-10" style={{ fontFamily: font.body, color: "rgba(246,241,231,0.78)", lineHeight: 1.6 }}>
              {subhead}
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Button variant="primary" size="lg" href="/estimate">{primaryCta}</Button>
              <Button variant="ghost-light" size="lg" href="#standard">{secondaryCta}</Button>
            </div>
          </Reveal>
          <Reveal delay={420}>
            <p className="text-xs mb-10" style={{ fontFamily: font.body, color: "rgba(246,241,231,0.5)" }}>{microTrust}</p>
          </Reveal>
          <div className="gft-gold-rule max-w-6xl" />
        </div>
      </div>

      {/* scroll cue */}
      <div aria-hidden className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 gft-cue">
        <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
          <rect x="1" y="1" width="18" height="26" rx="9" stroke="rgba(246,241,231,0.4)" strokeWidth="1.5" />
          <circle cx="10" cy="9" r="2.5" fill={color.gold} />
        </svg>
      </div>
    </section>
  );
}
