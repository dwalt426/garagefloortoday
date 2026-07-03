# GarageFloorToday — v1.1 Production Release

America's premium concrete coating platform. Next.js 15 · React 19 · TypeScript · Tailwind · Supabase.

This is a **release candidate handoff**. Everything below is verified against the actual repository by `scripts/release-audit.mjs`, not asserted. Read `docs/LaunchChecklist.md` before going live — it distinguishes, honestly, what is done from what requires live infrastructure this build could not touch. The full sprint-by-sprint build history is in `docs/BUILD_LOG.md`.

## Quick start

```bash
npm ci
cp .env.example .env.local     # fill in real values — see HOSTINGER.md §3
npm run dev                    # http://localhost:3000
```

## Verify the release yourself

```bash
npm test                       # typecheck + links + uniqueness + a11y + contrast + build
node scripts/release-audit.mjs # routes, files, actions, schema, docs — filesystem-checked
node scripts/generate-manifest.mjs   # regenerates MANIFEST.txt from the tree
```

## What's in the box

**27 page routes** + 3 role-gated portal trees, all filesystem-verified:
- Marketing: homepage, 10 brand pages, 11 service pages, 4 coating-system pages, 16 Learning Center articles, compare page, design system
- Revenue Engine: estimator, visualizer, cost calculator, financing, engineer-my-floor, FloorPassport lookup
- Local SEO: 3-tier location generator (state / city / city×service), all DB-gated
- Portals: customer (FloorPassport, warranty, maintenance, transfer), installer (jobs, Standard checklist, readings, batches, close→issue), admin (leads CRM, review moderation, pricing)
- System: 404, 500, loading, manifest, legal (privacy/terms/cookies — noindexed pending counsel)

**Backend**: 4 Server Action modules (estimate/contact/design, admin, portal, crew), all zod-validated, rate-limited, honeypot-protected, structured-logged. 6 SQL schema files + 2 seed files. RLS + `requireRole` + middleware defense-in-depth on every portal.

**SEO**: per-page metadata, canonical, OpenGraph, JSON-LD (Organization/Service/FAQ/LocalBusiness/Breadcrumb/Article), dynamic sitemap (static + DB-driven location routes), robots.

**Experience**: Seal-derived design tokens, motion system (Reveal/Stagger/CountUp/Parallax), cinematic hero, grain/glass/shimmer layer — all GPU-only and reduced-motion safe.

**Quality gates in CI**: link integrity, content uniqueness, static a11y (64 components), WCAG AA contrast (14 pairings), build, and Playwright E2E (public surface + role isolation). Loop test scaffolded and fixture-gated (`docs/TestingGuide.md`).

## Documentation

| Doc | Purpose |
|---|---|
| `HOSTINGER.md` | Hostinger deployment runbook (VPS or Vercel+Hostinger-DNS) |
| `DEPLOYMENT.md` | General deployment concepts |
| `docs/LaunchChecklist.md` | **Read before launch** — verified state vs. what needs live infra |
| `docs/Hardening.md` | CI gates, perf budget, security posture |
| `docs/BrandGuide.md` | Motion, photography, design-language spec |
| `docs/TestingGuide.md` | E2E fixtures + how to run the loop test |
| `docs/BUILD_LOG.md` | Full sprint-by-sprint history (v0.1 → v1.1) |
| `MANIFEST.txt` | Every file/folder in the release (auto-generated from the tree) |

## Honest launch blockers (from `docs/LaunchChecklist.md`)

Cannot be resolved from a build environment — they need a live deploy + database:
1. Run the E2E **loop test** against a seeded Supabase (the one test proving installer→customer→public).
2. Lighthouse pass (compress `public/hero/*.png` first).
3. Resolve 3 `[VERIFY]` content flags (warranty terms, financing APR, industrial chemical claims).
4. Replace legal page placeholders with counsel-approved copy.
5. Verify RLS blocks cross-customer access via direct API (not just UI).
6. Delete demo seed data.

Nothing above is a stub in the code — each is an operational task the code is ready to receive.

**Version:** v1.1 Production Release Candidate · **Tag:** `v1.1-production`
