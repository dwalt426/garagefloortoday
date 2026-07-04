# E2E Test Suite

## What runs where

| File | Needs auth fixtures? | Runs against |
|---|---|---|
| `public.spec.ts` | No | Any deploy — marketing pages, Revenue Engine, lookup, SEO surface |
| `loop.spec.ts` — role isolation block | No | Any deploy — proves unauthenticated users are redirected from all 3 portals |
| `loop.spec.ts` — the loop tests | **Yes** | Staging with seeded Supabase test project |

## Running locally against your own Supabase project

```bash
npm run dev                 # separate terminal, real .env.local
npx playwright install      # first time only
npm run test:e2e            # public.spec.ts + role-isolation run immediately
```

## Enabling the loop tests

The loop tests are the ones that actually prove the installer→customer→public
architecture works end-to-end. They're skipped by default because they need
real authenticated fixtures this build environment cannot create (no live
Supabase project, no network access in the sandbox that built this repo).

To enable them:

1. Create a Supabase **test** project (never point E2E at production).
2. Run `lib/schema.sql`, `lib/schema-locations.sql`, `lib/schema-pricing.sql`,
   `lib/schema-crm.sql`, `lib/schema-crew.sql` against it.
3. Create two auth users via the Supabase dashboard or Admin API:
   - `e2e-installer@test.garagefloortoday.com` — `app_metadata.role = "installer"`
   - `e2e-customer@test.garagefloortoday.com` — `app_metadata.role = "customer"`
4. Insert one `projects` row with `gft_project_id = 'GFT-2099-99999'`, status
   `'scheduled'`, linked to a `customers` row with that customer's `auth_user_id`,
   and a `project_installers` row linking that installer.
5. Set env vars and run:

```bash
E2E_FIXTURES_READY=true \
E2E_INSTALLER_PW=<password> \
E2E_CUSTOMER_PW=<password> \
E2E_TEST_PROJECT_ID=GFT-2099-99999 \
E2E_BASE_URL=https://staging.garagefloortoday.com \
npm run test:e2e
```

## Why this matters more than it looks like

`loop.spec.ts` is the only test in the entire suite that verifies the central
architectural claim of the whole project: that FloorPassport isn't a separate
artifact someone generates, it's the completed project record itself, and
closing a job on the installer portal is sufficient to make it appear correctly
— and only correctly — to the customer and the public. Everything else (link
integrity, uniqueness, a11y, contrast, RLS policies) can be green while this
one claim is subtly false. Treat a red loop test as a stop-ship signal, not a
flaky test to retry.
