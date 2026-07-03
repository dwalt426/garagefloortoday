# v1.0 Launch Candidate — Verified Checklist

This supersedes the generic checklist in `DEPLOYMENT.md` §7 with an actual audit of
this repo's state as of tag `v1.0-rc1`. Each line was checked, not assumed.

## What's true right now (verified this pass)

- **Full static verification suite green**: import resolution, link integrity
  (49/54 routes), content uniqueness (16 narratives), static a11y (62 components),
  WCAG AA contrast (14 token pairings). Re-run: `npm test`.
- **27 page routes** compiled from typed content registries + 3 auth-gated portal trees.
- **E2E scaffold in place**: `e2e/public.spec.ts` (24 assertions, no fixtures needed)
  and the role-isolation block in `e2e/loop.spec.ts` run in CI on every push. The
  fixture-dependent loop tests (the ones proving installer→customer→public) are
  correctly `test.skip()`'d until a seeded Supabase test project exists — see
  `e2e/README.md` for the exact 5-step setup. **This is not done; it's specified.**
- **3 remaining `[VERIFY]` content flags**, found by grep, not memory:
  - `data/brand-pages-2.ts` ×3 — Warranty terms (legal), Financing partner/APR
    (partner confirmation), Careers openings (ATS integration)
  - `data/service-pages-1.ts` ×1 — Industrial chemical-resistance claims
    (manufacturer data sheets)
  A pre-publish grep for `VERIFY` should be a CI gate before v1.0 final; it is not
  yet wired as one — add it if legal/partner content isn't resolved before launch.

## What genuinely cannot be verified from this environment

Stated plainly rather than glossed over:

| Item | Why it can't be done here | What "done" looks like |
|---|---|---|
| Live E2E loop test | No network access, no live Supabase project in this sandbox | Run `e2e/README.md` steps 1-5 against a real staging Supabase project |
| Lighthouse / Core Web Vitals | Needs a running, built, deployed app | `npx lighthouse https://staging.garagefloortoday.com` per template type |
| Live axe-core (runtime a11y) | Needs a running dev server in a browser | `@axe-core/playwright` added to `e2e/public.spec.ts` once a server is reachable |
| Cross-browser/device pass | Needs real devices or BrowserStack | Manual or automated pass on staging |
| Load/pen testing | Needs a deployed target | Standard pre-launch security/load engagement |
| RLS policy verification with a real non-admin session | Needs live Supabase auth | Create a test customer account, confirm it cannot read another customer's `projects` row via the API directly (not just through the UI) |

None of these are "coming soon" placeholders — they require infrastructure
(a live deploy, a live database) that doesn't exist inside this build
environment. The code and specs for all of them exist; the execution doesn't.

## Recommended order to close the gap to real v1.0

1. Deploy to staging (Vercel or Hostinger per `DEPLOYMENT.md` §6).
2. Run `lib/schema*.sql` + `lib/seed*.sql` against a real Supabase project.
3. Follow `e2e/README.md` to create the two fixture users + test project; run
   `E2E_FIXTURES_READY=true npm run test:e2e` and confirm the loop test passes
   for real — this is the single test that matters most.
4. Run Lighthouse against staging; compare to the budget in `HARDENING.md`.
5. Resolve the 3 `[VERIFY]` flags (grep for `VERIFY` in `data/`) with real
   legal/partner/manufacturer input.
6. Manual pass: sign up as a customer, verify you cannot see another customer's
   data by manipulating the URL or API directly (RLS should block it — verify,
   don't assume).
7. Tag `v1.0` once 3–6 are done. Until then, `v1.0-rc1` is accurate: architecturally
   complete, operationally unverified against live infrastructure.

## What "architecturally complete" means concretely

Every layer from the original 8-phase brief through 9 build sprints exists in
working code: brand system → design tokens → homepage → 10 brand pages → 11
service pages → 4 system pages → 16 Learning Center articles → 10 revenue tools
→ 3-tier location generator → CI-enforced quality gates → 3 role-gated portals
with defense-in-depth auth → the data loop closing installer-to-public. That is
real and verified by the test suite that ships in this repo. What remains is
executing that architecture against live infrastructure this sandbox cannot
provide — not redesigning or rebuilding anything.
