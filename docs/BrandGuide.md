# GarageFloorToday — Experience Design Spec (Sprint 11)

Modern Industrial Luxury. Benchmark class: Apple / Porsche / Stripe / Linear — but it converts like a home-service brand. Every rule here is implemented in code (tokens, `globals.css`, `components/motion`, `components/hero`), not aspirational.

## Design language, in one line

The website should feel like it fell off the Seal: deep blacks, warm cream light, heritage red used like a scalpel, brushed gold reserved for the crown moments. Restraint is the luxury. Nothing bounces. Nothing flashes. Things *reveal*.

## The lighting rig (gradients)

Derived from the badge, not invented. `gradient.blackDepth` for dark chapters (a lit black, never flat #000), `gradient.creamLight` for light chapters, `gradient.redSheen` for CTAs, `gradient.heroVignette` to sit type in studio darkness over photography. Gold appears only as hairline rules (`gft-gold-rule`) and stat accents — the edge of the Seal, echoed.

## Motion system (the one clock)

| Token | Duration | Used for |
|---|---|---|
| `instant` 100ms | hover feedback |
| `fast` 150ms | buttons, toggles |
| `base` 300ms | cards, dropdowns, header state |
| `slow` 600ms | section reveals |
| `cinematic` 900ms | hero, imagery, page transitions |
| `stagger` 80ms | interval between siblings |

Easing: `easeCinematic` (0.16,1,0.3,1) for reveals and imagery; `easeStandard` for UI feedback. **GPU properties only** — transform and opacity, never top/left/width. Every animation runs **once** on entry and never re-triggers on scroll-up. The entire layer collapses to static under `prefers-reduced-motion` (enforced in `globals.css`, verified: reveals, shimmer, sheen, drift, count-up all inert).

### Motion primitives (`components/motion/Motion.tsx`)
- `<Reveal delay>` — fade-up on IntersectionObserver entry
- `<Stagger>` — auto-delays children by 80ms
- `<CountUp to suffix>` — tabular-numeral counter, easeOutCubic, respects reduced-motion
- `<Parallax factor>` — transform-only drift, factor ≤ 0.15, rAF-throttled

### Signature textures (`globals.css`)
- `.gft-grain` — 5% fractal-noise overlay; kills digital flatness on dark fields
- `.gft-glass` / `.gft-glass-light` — frosted surfaces over imagery (header)
- `.gft-shimmer` — light band drifting across coated-floor CTAs (the floor's wet-look reflection, abstracted)
- `.gft-sheen` — brushed-metal pass across buttons on hover, once
- `.gft-drift` — 24s Ken-Burns on hero photography
- `.gft-cue` — scroll indicator pulse

## Hero (`components/hero/CinematicHero.tsx`)

Full-bleed real photography (the Mustang-on-flake shot — The Lens: lived-in, cinematic, never stock). Slow drift. Vignette + left-depth gradient seats the type. Grain. Content reveals in sequence: gold eyebrow → clamped display type (44→96px) → subhead → one primary CTA + one ghost → micro-trust → gold rule → scroll cue. One image, one message, one CTA. **The Seal lives inside the photography as brand art — never as header chrome** (Brand Bible §3 intact).

## Photography direction (The GarageFloorToday Lens)

Real garages that happen to be cinematic. Wet-look coated floors catching window light; a beloved car (classic, truck, or supercar) as the hero object; macro coating texture and flake detail; diamond-grinding sparks; crew craftsmanship in natural light. Never: empty staged showrooms, stock-photo families, blue-tinted "clean garage" clichés. The uploaded Mustang compositions are the reference frame for every future shoot.

## Component elevation (visual only — zero API/route/data changes)

Button (sheen + red-glow lift + gold focus ring, new `ghost-light` variant for dark contexts), Section (reveal-animated headers, gold eyebrow rules, depth gradients, grain on dark), trust bar → count-up stat bar, header (adaptive dark-glass → light-glass on scroll), final CTA (shimmer + red sheen). Cards, forms, timeline, and portal chrome inherit the token and elevation upgrades automatically.

## The Awwwards test

Before any page is "done": *if this were competing for Site of the Day, would I still be proud?* Applied first to the homepage this sprint; the same treatment rolls to service/system/location pages and the Revenue Engine tools in the passes that follow — reusing these exact primitives so the whole site moves as one system, not a pile of one-off effects.

## Non-negotiables held

Accessibility (64 components scan clean, WCAG AA contrast on every pairing, reduced-motion complete), performance (GPU-only animation, IntersectionObserver over scroll listeners, `next/image` on hero with priority + responsive sizing, no animation library in the critical path), and the entire production architecture (routes, SEO, Server Actions, Supabase, portals) — all untouched. This sprint changed how it looks and moves, nothing about how it works.
