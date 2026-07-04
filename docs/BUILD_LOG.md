# GarageFloorToday — Homepage Codebase (Build Steps 1–2)

Production-structured source following the Brand Bible and Technical Specs.

## Structure
```
app/          HomePage.tsx — page assembly only, no content, no styles logic
components/   Typed, reusable UI (buttons, cards, navigation, timeline, floorpassport)
data/         All content as typed exports — swap for CMS fetches later, same types
types/        Shared TypeScript interfaces (Project, CrewMember, Review, ...)
styles/       tokens.ts — Phase 5 design tokens, single source of truth
lib/          (reserved: analytics events, Project ID helpers)
```

## Rules encoded in the components themselves
- Gold appears ONLY in components/floorpassport/ (Brand Bible §3)
- One primary CTA per section (Phase 5 §5)
- Header uses the wordmark, never The Seal (Brand Bible §3)
- All content flows from data/ — components never hardcode copy
- Every list renders from typed arrays → CMS-ready

## Porting to Next.js (recommended stack)
1. `npx create-next-app@latest --typescript --tailwind --app`
2. Drop these folders in; convert inline token styles to Tailwind theme extensions
   using styles/tokens.ts values in tailwind.config.ts
3. Replace data/ exports with server-side fetches (Supabase) returning the same types
4. StickyHeader needs "use client"; everything else can be server components

## Templates (Build Steps 3–5)
- app/templates/LocationPage.tsx — the Brand Bible §6 publishing gate is enforced
  at the TYPE level: crew, localFaqs, and recentInstalls are non-empty tuple types.
  A CMS cannot render a city page without them. Thin templates are structurally impossible.
- app/templates/Templates.tsx — ServicePage, ArticlePage (block-based, CMS-friendly),
  FloorPassportPage (lookup + empty state)
- components/layout/GlobalLayout.tsx — header/footer/CTA band exist once
- features/floor-finder/FloorFinder.tsx — "Find Your Perfect Floor" above-the-fold
  widget; recommend() is a pure function that becomes an API call later, same types.

## Hosting note
Next.js recommended (Node hosting or Vercel). If limited to static hosting,
use Next.js static export (output: 'export' in next.config) — do NOT hand-write HTML.
FloorPassport lookup requires a server or Supabase client-side queries; on pure
static hosting, use Supabase's JS client with row-level security for the lookup.

## Revenue Engine (Phase 7)
features/estimator/pricing.ts — pure typed pricing engine; same function client-side
(instant estimate) and server-side (quote gen). Placeholder rates flagged; swap for
regional Supabase pricing without UI changes.

The 10 Revenue Engine tools ship as one preview (GFT_Revenue_Engine.jsx) and split
into features/* modules during Next.js port. Shared contract: every tool that captures
intent (saved design, estimate, spec) writes to the same lead record keyed by an
eventual GFT Project ID — one funnel, ten entry points.

Data integrity notes (Brand Bible §8):
- Estimator/cost/financing rates: PLACEHOLDER pending real regional pricing + partner APR
- Compare Systems ratings: ILLUSTRATIVE pending verified manufacturer spec sheets
- Blend names/gradients: sample set pending real product photography per The Lens

## Backend (lib/)
- lib/schema.sql — full Supabase schema. Projects is the central table;
  gft_project_id auto-assigned by trigger (GFT-YYYY-#####). FloorPassport is a
  VIEW over completed projects, not a data copy. Installer floors_completed
  bumped by trigger on completion. RLS: public passport lookup + published
  reviews; homeowners see only their own records; leads insert-only.
- lib/seed.sql — demo data (one completed Dallas project) so FloorPassport
  lookup, city page, and pricing work end-to-end immediately. Replace before launch.
- lib/queries.ts — typed data-access layer. Pages swap data/homepage.ts imports
  for these functions with zero UI changes. getLocationPageData() enforces the
  publishing gate at RUNTIME too: missing crew/installs/climate → null → 404,
  never a thin page.

Deploy order: schema.sql → seed.sql → set env vars → swap imports page by page.
Known TODO: local_faqs table (next migration) — LocationPage type demands FAQs,
so the gate holds even before the table exists.

## Phase 3 — Core brand pages (Master Build)
- app/templates/BrandPage.tsx — one template, all 10 core pages. meta maps to
  Next.js generateMetadata(); structuredDataType renders JSON-LD in head.
- data/brand-pages-1.ts / brand-pages-2.ts — full copy for About, Why GFT,
  The Standard™, ArmorPrep™, Performance System™, FloorPassport™, Warranty,
  Financing, Contact, Careers. allBrandPages registry drives dynamic routes:
  app/[slug]/page.tsx reads the registry → 10 pages from one file.
- verificationFlags on Warranty/Financing/Careers mark claims requiring legal,
  partner, or ATS confirmation before publish (Master Prompt content rules).
  Build a pre-publish check that blocks deploy while flags are non-empty.

## Phase 4 — Service landing pages (Master Build)
- app/templates/ServiceLandingPage.tsx — rich standalone landing template:
  hero + why-this-surface + GFT Performance System recommendation + ArmorPrep
  scope + Application Standard + common problems + educational comparison +
  maintenance + FAQs + related content. Local CTA ("Find a certified installer").
- data/service-pages-1.ts + service-pages-2.ts — 11 fully differentiated pages:
  garage-floor-coatings (pillar), residential, commercial, industrial, warehouse,
  automotive-shops, patios, pool-decks, basements, workshops, showrooms.
  allServicePages registry → app/services/[slug]/page.tsx (11 pages, one route).
- Every page has its OWN surface factors, Application Standard, common problems,
  comparison, and FAQs. No shared copy — warehouse FAQs never appear on patio pages
  (Master Prompt rule). Each page is a standalone SEO/CRO asset.
- Spec/durability claims kept qualitative or [VERIFY]-flagged (industrial chemical
  resistance) — no fabricated numbers (Master Prompt content rules).

## Phase 5 — Production scaffold
Full Next.js 15 project config + backend wiring. See DEPLOYMENT.md for the
complete guide. Added: package.json, next.config.js (security headers), tsconfig,
tailwind.config.ts, postcss, .env.example, lib/supabase-server, lib/rate-limit,
lib/schema-org (JSON-LD), app/actions.ts (validated+rate-limited Server Actions
for estimate/contact/design with email), middleware.ts (3-portal auth gate),
app/sitemap.ts + robots.ts (dynamic), error/loading/not-found/manifest, legal
placeholders. See DEPLOYMENT.md §8 for built-vs-remaining.

## Sprint 3 — Revenue Engine production routes (v0.3)
- features/shared/form.tsx — useActionSubmit hook (pending/success/error + GA4
  conversion event), Chip/Field/SubmitButton/ResultBanner/Honeypot primitives.
  Every tool shares identical submit UX.
- features/estimator/SmartEstimator.tsx — /estimate. Instant client-side range
  from pricing.ts; capture via submitEstimate Server Action (validated, rate-
  limited, honeypot, email).
- features/visualizer/tools.tsx — Visualizer (saveDesign action), CostCalculator,
  FinancingCalculator. app/tools/* routes each with unique metadata + canonical.
- app/lookup/page.tsx — server-side FloorPassport lookup via GET (?id=...) so
  yard-sign QR codes deep-link to verified records; privacy note included.
- app/tools/tool-shell.tsx — shared tool page layout.
Remaining engine items → Sprint 4+: Compare Systems (needs verified material
ratings in DB), Color Explorer + Before/After (need real photography), Maintenance
Portal (customer-portal sprint).

## Sprint 4 — SEO Authority (v0.4)
- 4 system pages: /coatings/{epoxy,polyaspartic,polyurea,hybrid} — honest about
  each chemistry's weaknesses incl. our own hybrid's cost trade-off. The
  "20x stronger" claim is examined and explicitly NOT repeated as blanket fact.
- 16 Learning Center pillar guides (/learn/[slug]) — every article slug
  referenced anywhere on the site now resolves (closed all dead internal links).
  Block-based, Article + FAQ + Breadcrumb schema, interlinked to services/systems.
- /learn index (grouped), /coatings/compare (qualitative — numeric ratings held
  until verified spec data), /design-system (internal, noindex component reference).
- scripts/check-links.mjs — link-integrity CI test. Caught 7 dead links + 1 real
  import-depth bug this sprint; now green (49 links / 54 routes). Run in CI.
- sitemap now includes systems + learn routes.
Content pipeline note: 50-100 articles is a content operation, not one sprint —
16 verified pillars ship now; the ArticleData model + /learn/[slug] route scale
to 100 as verified content lands. No thin filler shipped (Master Prompt rule).

## Sprint 5 — Local SEO Generator (v0.5)
The franchise multiplier. Three location tiers from one route, all DB-gated.
- lib/schema-locations.sql — location tiers (state/city/neighborhood), local_faqs,
  location_services (city×service combos), nearby_cities() haversine RPC.
- lib/schema-pricing.sql — market_pricing + repair_rates: dynamic inputs that
  replace the estimator's static placeholder rates (cost index, travel, seasonality).
- lib/queries-locations.ts — getStatePageData / getCityPageData / getCityServiceData.
  Each ENFORCES THE GATE: null when local substance missing → notFound().
  City gate now requires crew + installs + climate + ≥1 local FAQ.
- app/locations/[...slug]/page.tsx — unified router dispatched by depth
  (1=state, 2=city, 3=city×service), each tier with metadata + LocalBusiness/
  Breadcrumb JSON-LD, ISR hourly.
- Templates: StatePage (city directory), CityServicePage (long-tail combo).
  LocationPage extended: neighborhoods, permit note, nearby-cities interlinks.
- lib/seed-locations.sql — demo MO/TX tree (St. Louis, St. Charles, O'Fallon).
- scripts/check-uniqueness.mjs — trigram near-duplicate test on local narratives.
  Structural enforcement of the no-thin-content rule. CI-ready alongside check-links.

Verification suite (run in CI): check-links (49/54 ✓), check-uniqueness (16 ✓),
import resolution (✓).

Remaining Sprint 5 roadmap items as their own sprints (each real backend work):
  Sprint 6 — Franchise CMS (upload projects/reviews/photos, edit crew/area/FAQs)
  Sprint 7 — Photography Engine (tagged image pipeline → auto-galleries)
  Sprint 8 — CRM (lead stage pipeline on the leads table + Server Actions)
  Sprint 9 — Dynamic Pricing Engine (wire market_pricing/repair_rates into estimator)
  Then: hardening sprint (E2E, a11y audit, Lighthouse, image optimization).

## Sprint 6 — Production Hardening (v0.6) [taken out of listed order, before portals]
Locked a regression-catching CI baseline before the auth-heavy feature sprints.
- .github/workflows/ci.yml — typecheck + links + uniqueness + a11y + contrast + build,
  on every push/PR. `npm test` runs the suite locally.
- scripts/check-a11y.mjs — static WCAG scan (37 components). Caught + fixed real
  design-system label-association issues; multiline/honeypot-aware after 2 test-bug fixes.
- scripts/check-contrast.mjs — WCAG AA on all 14 token pairings. All pass (body 16:1).
- lib/log.ts — structured logging + withLogging() Server Action wrapper (Sentry-swappable).
- HARDENING.md — what's automated vs. what remains a human/ops task (Playwright E2E,
  live axe, Lighthouse, load/pen test, backups/DR, monitoring — all need a live
  deploy/Supabase this environment can't host).
Full suite green: imports ✓ · links 49/54 ✓ · uniqueness 16 ✓ · a11y 37 ✓ · contrast 14 ✓

## Sprint 7 — Franchise CMS / Admin OS (v0.7)
First authenticated, data-mutating surface — built on the Sprint-1 middleware.
- lib/auth/session.ts — getSessionUser() + requireRole() typed guard (franchise-scoped).
- app/login — Supabase email/password sign-in; middleware routes by role claim.
- app/admin/* — role-gated shell (layout re-checks session), sidebar nav.
  - /admin/leads — CRM pipeline grouped by 9 stages; LeadStageControl moves leads
    via updateLeadStage action (optimistic + rollback on failure).
  - /admin/reviews — curated moderation: publish/unpublish/respond. NO delete path
    (Brand Bible §14). moderateReview action.
  - /admin/pricing — view + set national $/sqft rates; updatePricing action.
  - /admin/content — CRUD surface over existing typed tables (build note documented).
- app/admin-actions.ts — updateLeadStage / moderateReview / updatePricing.
  DEFENSE IN DEPTH: middleware gates route → requireRole() re-checks in the action
  → RLS gates the table. Every action zod-validated, withLogging-wrapped.
- lib/schema-crm.sql — lead stage fields + admin RLS policies (read/update leads,
  manage reviews, write pricing — all role='admin' checked in-policy).

a11y note: all admin form inputs labeled from the start (sr-only / htmlFor+id) —
48 components scanned clean. The test in place since Sprint 6 kept the new surface honest.
Full suite green: imports ✓ · a11y 48 ✓ · links 49/54 ✓ · contrast 14 ✓

Remaining portals: Sprint 8 customer portal (FloorPassport/warranty/maintenance on
the same auth), Sprint 9 installer portal (job uploads → FloorPassport generation).

## Sprint 8 — Customer Portal (v0.8)
Closes the GFT Project ID loop: the Brand Bible's identifier now resolves into a
real homeowner dashboard. Built on the same auth as admin; RLS scopes every row.
- lib/queries-portal.ts — getCustomerProjects / getMaintenanceForProject. All run
  under the customer's session → RLS "own projects/warranty/maintenance" policies
  guarantee no cross-customer or franchise data leaks.
- app/portal/layout.tsx — customer-gated shell (admins may view; installers/anon can't).
- app/portal — My Floors (FloorPassport card + moisture readings + photo counts per
  owned floor), Warranty (per-floor status + terms), Maintenance (aggregate schedule,
  completed visits retained), Transfer Ownership + Refer a friend.
- app/portal-actions.ts — initiateTransfer (explicit confirmation required; marks
  warranty transferred, stages recipient) + submitReferral (honeypot-protected).
  requireRole('customer') + RLS defense in depth.
a11y: 55 components clean. Test caught the transfer checkbox (label-wrapped but
scanner-ambiguous) → made association explicit rather than weakening the test.
Full suite green: imports ✓ · a11y 55 ✓ · links 49/54 ✓ · contrast 14 ✓

## Sprint 9 — Installer Portal (v0.9) — THE KEYSTONE
Closes the full data loop: installer creates the record → FloorPassport IS that
record surfaced → customer portal displays it → public lookup verifies it →
owner transfers it. No separate "generate FloorPassport" step exists by design —
closing a project with a complete Standard checklist simply flips status to
'completed', which the floorpassports VIEW (Sprint-1 schema) already exposes.
- lib/schema-crew.sql — installers.auth_user_id (portal login link), projects
  .checklist (7-step Standard) + customer_signature_at + closed_at. RLS: installer
  sees/updates ONLY projects they're assigned to (project_installers join).
- lib/queries-crew.ts / app/crew — My Jobs (open installs, checklist progress bar)
  → job detail (checklist, moisture readings, material batches, close control).
- app/crew-actions.ts — updateChecklist / addMoistureReading / addBatch /
  closeProject. closeProject is HARD-GATED: all 7 checklist items + explicit
  customer sign-off required, or it returns the specific incomplete steps —
  a floor cannot close half-documented. requireRole('installer') + RLS assigned-
  only, defense in depth matching admin/customer portals.
- CloseProjectControl shows the exact live consequence on success: "FloorPassport™
  {id} is now live for the customer and public lookup" — making the architecture
  visible to the person using it, not just to us.
Full suite green: imports ✓ · a11y 62 ✓ (zero regressions — labeling discipline
held) · links 49/54 ✓ · contrast 14 ✓

## v0.9 — all three portals complete
Admin (leads CRM, review moderation, pricing) · Customer (FloorPassport, warranty,
maintenance, transfer) · Installer (jobs, Standard checklist, readings, batches,
close→issue). One auth system, three roles, RLS + requireRole defense in depth
throughout. Next: v1.0 candidate — E2E test scaffolding for the full loop
(installer closes → customer sees → public verifies) + launch checklist review.

## v1.0-rc1 — E2E scaffold + honest launch checklist
- e2e/public.spec.ts — 24 assertions over the public surface (homepage, Revenue
  Engine incl. live estimator submission, FloorPassport lookup + PII check, sitemap/
  robots content, unique metadata across system pages, mobile viewport). Runs in
  CI on every push — no fixtures needed.
- e2e/loop.spec.ts — THE test that matters most: proves installer-close makes the
  identical record appear in customer portal + public lookup + reflects transfer.
  Correctly test.skip()'d until seeded fixtures exist (documented, 5-step, in
  e2e/README.md) — a false-green loop test would be worse than an honest skip.
  Role-isolation block (unauthenticated → all 3 portals redirect to /login) runs
  unconditionally.
- playwright.config.ts — chromium + mobile-safari projects, trace/screenshot on
  failure, wired into .github/workflows/ci.yml as a build-then-test step.
- V1_LAUNCH_CHECKLIST.md — audited against the actual repo (grep, not memory):
  3 remaining [VERIFY] content flags identified by file; a table of what
  genuinely cannot be verified from this sandbox (needs live deploy/DB) vs.
  what's done; a 7-step path to real v1.0.

Full static suite green: imports ✓ · a11y 62 ✓ · links 49/54 ✓ · uniqueness 16 ✓ · contrast 14 ✓

## Sprint 11 — World-Class Experience & Premium UI (v1.1)
Creative-direction pass. Visual + motion elevation ONLY — zero changes to routes,
SEO, Server Actions, Supabase, portals, or data models. Modern Industrial Luxury,
benchmarked to Apple/Porsche/Stripe/Linear, derived from the Seal.
- Brand assets imported: public/logos/gft-seal-{badge,circle}.png (The Seal, for
  certification/physical use), public/hero/hero-mustang-wide.png (The Lens hero).
- styles/tokens.ts — full motion timing scale (instant→cinematic + stagger),
  elevation shadow system (warm-tinted), cinematic gradient rig (all Seal-derived).
- app/globals.css — cinematic layer: grain, glass, gold-rule, reveal, shimmer,
  sheen, drift, scroll-cue. ALL collapse under prefers-reduced-motion.
- components/motion/Motion.tsx — Reveal / Stagger / CountUp / Parallax.
  IntersectionObserver + CSS, GPU-only, no animation lib in critical path,
  reduced-motion safe. Animate once on entry, never re-trigger.
- components/hero/CinematicHero.tsx — full-bleed drifting photography, layered
  vignette, clamp(44→96px) type, sequenced reveals, scroll cue. Seal stays IN
  the photo as brand art, never header chrome (Brand Bible §3).
- Elevated in place (same APIs): Button (sheen/glow/gold-focus + ghost-light
  variant), Section (reveal headers, gold rules, depth gradients, grain),
  trust bar → CountUp stat bar, StickyHeader (adaptive dark→light glass),
  final CTA (shimmer). Fixed stale /coatings → /coatings/compare link.
- EXPERIENCE_SPEC.md — motion/photography/design-language reference.
Full suite green: imports ✓ · a11y 64 ✓ · links 49/54 ✓ · contrast 14 ✓.
Architecture untouched — changed how it looks and moves, not how it works.
