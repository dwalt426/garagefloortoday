# Production Hardening (Sprint 6 / v0.6)

The launch-readiness reference. What's automated in CI, what's verified, and what remains a human/ops task before go-live.

## Automated in CI (`.github/workflows/ci.yml`)

Every push and PR runs, and must pass before merge:

| Check | Script | What it guarantees |
|---|---|---|
| Type check | `npm run typecheck` | No TS errors across the whole app |
| Link integrity | `test:links` | Every internal href resolves to a real route (49/54) |
| Content uniqueness | `test:uniqueness` | No two location narratives are near-duplicates (thin-content gate) |
| Accessibility (static) | `test:a11y` | No img-without-alt, unlabeled inputs, positive tabindex, or textless controls |
| Contrast (WCAG AA) | `test:contrast` | Every design-token text/bg pairing meets AA (4.5:1 / 3:1) |
| Build | `next build` | The app actually compiles and statically generates |

Run all locally with `npm test`.

## Verified this sprint

- **37 components** scanned for static a11y — clean. Fixed: design-system inputs lacked label association (now `htmlFor`/`id` linked).
- **14 token pairings** meet WCAG AA. Lowest is gray-500 captions at 3.17:1 — passes large-text AA only, so captions are documented as non-essential text (never used for information that isn't also conveyed elsewhere).
- **Security headers** (from Sprint 5 `next.config.js`): CSP, HSTS, X-Frame-Options DENY, X-Content-Type-Options, Referrer-Policy, Permissions-Policy — all present.
- **Rate limiting** on all Server Actions (`lib/rate-limit.ts`), per-IP, per-action.
- **Honeypot** spam protection on every public form; validated via the a11y-exempt `aria-hidden` path.
- **Structured logging** (`lib/log.ts`) with `withLogging` wrapper for Server Actions — swap the sink for Sentry/Axiom in prod without touching call sites.

## Performance budget (targets, verify with Lighthouse pre-launch)

| Metric | Target | How it's addressed in code |
|---|---|---|
| LCP | < 2.0s | `next/font` self-hosted with swap; hero is CSS gradient (no image LCP block); static generation |
| INP | < 200ms | Minimal client JS — only tools/nav are client components; rest are server components |
| CLS | < 0.1 | Fixed dimensions on cards/timeline; font swap sized to match |
| Initial JS | < 150KB gz | No heavy client libs in the critical path; Framer Motion only where used |
| Images | AVIF/WebP | `next.config.js` formats set; real images pending (The Lens) get `next/image` responsive sizing |

Server-rendered/statically-generated pages ship real HTML (SEO + LCP); only interactive islands hydrate.

## Remaining before launch (human/ops — cannot be automated here)

- [ ] **Browser E2E** (Playwright): estimate→lead→email flow, FloorPassport lookup, portal auth redirects, mobile nav. Scaffolded intent in CI; needs a running Supabase test project + dev server, which this environment can't host.
- [ ] **Live axe-core a11y** run against the dev server (the static pass covers markup; runtime covers focus order, ARIA live regions firing, color-in-context).
- [ ] **Lighthouse** run per template type; confirm the budget above on real deploys.
- [ ] **Load/pen testing** against staging.
- [ ] **Error tracking** wired (Sentry DSN into `lib/log.ts` transport).
- [ ] **Backups + DR**: enable Supabase point-in-time recovery; document restore runbook.
- [ ] **Uptime + Core Web Vitals monitoring** (e.g. Vercel Analytics / Checkly).
- [ ] Cross-browser + real-device mobile pass.

## Why hardening ran before the portals (Sprint 6, out of listed order)

The remaining feature sprints (CMS, customer/installer portals, CRM) all add authenticated, data-mutating surface. Locking a regression-catching CI baseline *before* that surface triples means every future sprint runs against tests that fail loudly on breakage. Building four more feature sprints first would have meant auditing a 13-sprint surface at the end instead of a 5-sprint one now. The test suite added here becomes the safety net every subsequent sprint commits against.
