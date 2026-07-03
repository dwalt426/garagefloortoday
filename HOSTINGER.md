# HOSTINGER.md — Deploying GarageFloorToday to Hostinger

Concrete, Hostinger-specific steps. General deployment concepts are in `DEPLOYMENT.md`; this file is the Hostinger runbook.

## 0. Plan requirement (read first)

This is a **Next.js 15 app with Server Actions, middleware, ISR, and route handlers** — it requires a **Node.js runtime**. It cannot run on static/shared PHP hosting.

- **Hostinger VPS** or a plan with **Node.js application support** → deploy directly (Section 2A).
- **Hostinger shared hosting without Node** → you cannot run this app there. Either upgrade to a VPS, or deploy the app on Vercel and point your Hostinger-registered domain at it (Section 2B). The app code is identical either way.

## 1. Prerequisites

- Node.js 20 LTS (matches `.github/workflows/ci.yml` and `package.json` engines)
- A Supabase project (schema + seed loaded — Section 4)
- Environment variables ready (Section 3)

## 2A. Deploy on Hostinger VPS / Node hosting

```bash
# On the server (SSH)
git clone <your-repo> garagefloortoday && cd garagefloortoday
npm ci
cp .env.example .env.local     # then edit with real values (Section 3)
npm run build
npm run start                   # serves on PORT (default 3000)
```

Keep it alive with PM2 (recommended on VPS):

```bash
npm i -g pm2
pm2 start npm --name gft -- start
pm2 save && pm2 startup         # restart on reboot
```

Put Hostinger's nginx (or the hPanel Node app proxy) in front, forwarding 80/443 → the Node port. In hPanel's Node.js app manager: set **app root**, **startup file** (`node_modules/next/dist/bin/next` with arg `start`, or a small `server.js` if the panel needs one), **Node version 20**, and the environment variables.

## 2B. Deploy on Vercel, domain on Hostinger

1. Import the repo at vercel.com → it auto-detects Next.js, zero config.
2. Add the Section 3 env vars in Vercel project settings.
3. Deploy.
4. In **Hostinger hPanel → DNS**, point the domain to Vercel:
   - `A` record `@` → Vercel's IP (from Vercel's domain panel), **or**
   - `CNAME` `www` → `cname.vercel-dns.com`
5. Add the domain in Vercel; SSL is automatic.

## 3. Environment variables

Copy from `.env.example`. Required for a functioning production site:

```
NEXT_PUBLIC_SUPABASE_URL=          # Supabase → Settings → API
NEXT_PUBLIC_SUPABASE_ANON_KEY=     # same
SUPABASE_SERVICE_ROLE_KEY=         # same — SERVER ONLY, never NEXT_PUBLIC
NEXT_PUBLIC_SITE_URL=https://garagefloortoday.com
```

Recommended for full functionality:

```
RESEND_API_KEY=                    # transactional email (Section 5). Without it,
EMAIL_FROM="GarageFloorToday <hello@garagefloortoday.com>"   # leads still SAVE,
LEAD_NOTIFY_TO=ops@garagefloortoday.com                      # but no email fires
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX     # Google Analytics 4
NEXT_PUBLIC_CLARITY_ID=            # Microsoft Clarity
NEXT_PUBLIC_META_PIXEL_ID=         # Meta Pixel
```

## 4. Supabase setup

In the Supabase SQL editor, run in this order:

```
lib/schema.sql            # core: projects, leads, reviews, installers, customers,
                          #   warranties, the floorpassports VIEW, RLS, Project ID
lib/schema-locations.sql  # location tiers, local_faqs, location_services, nearby RPC
lib/schema-pricing.sql    # market_pricing, repair_rates
lib/schema-crm.sql        # lead stages + admin RLS policies
lib/schema-crew.sql       # installer auth link, checklist, installer RLS
lib/seed.sql              # DEMO data — delete before real launch
lib/seed-locations.sql    # DEMO MO/TX tree — delete before real launch
```

Then: **Auth → providers** (enable Email or OAuth). On user creation set
`app_metadata.role` to `customer`, `installer`, or `admin` — middleware reads it.
**Storage → buckets**: create `prep-photos`, `finished-photos`, `crew`
(installer-write; public-read on finished/crew).

## 5. Email (SMTP / transactional)

The app uses **Resend** (HTTP API, no SMTP port needed — ideal for Node hosts that
block outbound 25/587). Set `RESEND_API_KEY`. To use a different provider, edit the
single `sendEmails()` function in `app/actions.ts` — every form routes through it.

## 6. SSL

- **VPS**: Let's Encrypt via hPanel or `certbot`. Force HTTPS (the app already sends
  HSTS via `next.config.js`).
- **Vercel**: automatic.

## 7. Headers, caching, compression, ISR — already configured

- **Security headers** (CSP, HSTS, X-Frame-Options DENY, X-Content-Type-Options,
  Referrer-Policy, Permissions-Policy): set in `next.config.js` `headers()`. No
  server config needed; Next emits them.
- **Caching**: static assets and statically-generated pages are immutable-cached by
  Next automatically. Location pages use **ISR** (`revalidate = 3600`) — they
  re-render hourly so new franchise markets and installs appear without a rebuild.
- **Compression**: enable gzip/brotli at the nginx layer (VPS) — Vercel does this
  automatically. Add to nginx: `gzip on; gzip_types text/css application/javascript image/svg+xml;`
- **Images**: `next/image` serves AVIF/WebP at responsive sizes (configured in
  `next.config.js`). Ensure the Node process can write `.next/cache/images`.

## 8. Analytics & Search Console

- GA4 loads automatically when `NEXT_PUBLIC_GA_ID` is set (see `app/layout.tsx`).
- Submit `https://garagefloortoday.com/sitemap.xml` in Google Search Console.
- `robots.txt` already disallows `/admin`, `/portal`, `/crew`, `/api`.

## 9. Post-deploy smoke test

```
□ Homepage loads, hero image renders, no console errors
□ /estimate produces a range and a submission saves a row in Supabase `leads`
□ /lookup?id=<a real completed project> resolves; shows NO homeowner PII
□ /login → correct portal by role; wrong-role users are redirected
□ sitemap.xml and robots.txt serve
□ Lighthouse ≥ 90 (compress the hero PNGs first — see LaunchChecklist.md perf note)
```

## 10. The one thing to compress before launch

`public/hero/hero-mustang-wide.png` is ~2.7MB source. `next/image` will serve an
optimized derivative, but pre-compressing the source (to WebP/AVIF, ~200–400KB)
improves the first optimization pass and LCP. Do this before the Lighthouse run.
