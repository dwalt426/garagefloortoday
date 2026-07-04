# GarageFloorToday — Production Deployment Guide

Next.js 15 · React 19 · TypeScript · Tailwind · Supabase. App Router, Server Actions, dynamic SEO.

> **Honest status.** This repository is a production-*shaped* scaffold: real configs, real Server Actions, real auth middleware, real SEO generation, and the full content/component system from Phases 1–4. It is not a click-to-launch binary — the steps below are the genuine remaining work (env setup, DB migration, wiring the last UI states, real assets). No step is a placeholder for something impossible; each is a normal pre-launch task.

---

## 1. Install

```bash
npm install
cp .env.example .env.local   # then fill in real values (Section 3)
npm run dev                  # http://localhost:3000
```

Requires Node 18.18+ (Node 20 LTS recommended).

## 2. Project structure

```
app/            Routes, layouts, Server Actions (actions.ts), sitemap/robots
  templates/    BrandPage, ServiceLandingPage, LocationPage, Templates
components/     Reusable UI (buttons, cards, nav, timeline, floorpassport, layout)
features/       Revenue Engine tools (estimator, visualizer, floor-finder, ...)
data/           Typed content registries (brand + service pages, homepage)
lib/            supabase-server, queries, schema.sql, seed.sql, schema-org, rate-limit
types/          Shared interfaces
styles/         tokens.ts (mirrors tailwind.config theme)
supabase/       (migrations live here once you split schema.sql)
public/         hero/ services/ crews/ projects/ logos/ blends/ icons/
middleware.ts   Portal auth gate (/portal, /crew, /admin)
```

## 3. Environment variables (.env.local)

| Var | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Same page. **Server-only** — never prefix NEXT_PUBLIC |
| `RESEND_API_KEY` / `EMAIL_FROM` / `LEAD_NOTIFY_TO` | resend.com (transactional email). Optional in dev; leads still save |
| `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_CLARITY_ID` / `NEXT_PUBLIC_META_PIXEL_ID` | GA4 / Microsoft Clarity / Meta Events Manager |
| `NEXT_PUBLIC_SITE_URL` | `https://garagefloortoday.com` |

## 4. Supabase setup

1. Create a project at supabase.com.
2. SQL Editor → run `lib/schema.sql` (tables, triggers, RLS, the FloorPassport view).
3. Run `lib/seed.sql` for demo data so lookup/city pages work immediately. **Delete/replace before real launch.**
4. Auth → set up Email (or OAuth) providers. On user creation, set `app_metadata.role` to `customer`, `installer`, or `admin` — the middleware reads this.
5. Storage → create buckets for `prep-photos`, `finished-photos`, `crew` with appropriate policies (installer-write, public-read for finished/crew).

## 5. Analytics

Add GA4, Clarity, and Meta Pixel via a single `app/analytics.tsx` client component loaded in the root layout with `next/script` (strategy `afterInteractive`). IDs come from env. Conversion events fire from the Server Action success paths (estimate/contact/design) — call the pixel/GA event in the client on `{ ok: true }`.

## 6. Deployment

### Option A — Hostinger (Node.js hosting)
1. Confirm your plan includes Node.js (not static-only). If static-only, either upgrade or use Option B.
2. Push repo; set env vars in the Hostinger Node panel.
3. Build command `npm run build`, start command `npm run start`, port per Hostinger's Node config.
4. Point the domain's A/CNAME records per Hostinger; enable SSL (Let's Encrypt, usually one click).

### Option B — Vercel (recommended for Next.js), domain on Hostinger
1. Import repo to Vercel; add env vars.
2. Deploy (zero-config for Next.js).
3. In Hostinger DNS, point the domain to Vercel (A record to Vercel's IP or CNAME to `cname.vercel-dns.com`). SSL is automatic on Vercel.

Either way the app code is identical — only hosting/DNS differs.

## 7. Pre-launch checklist

- [ ] Replace all seed data with real records; delete demo project
- [ ] Fill `[VERIFY]`-flagged content: warranty terms (legal), financing APR (partner), industrial chemical-resistance claims (manufacturer sheets), material durability ratings (spec sheets)
- [ ] Add real photography per The GarageFloorToday Lens into `public/` (hero, services, crews, projects, blends)
- [ ] Trademark screening on proprietary names (Standard™, ArmorPrep™, Performance System™, FloorPassport™, Project ID™, Heritage Red™)
- [ ] Legal pages: privacy, terms, cookies (templates in `content/legal/`)
- [ ] favicon, manifest, OG images in `public/`
- [ ] Wire real financing partner + email provider
- [ ] Run Lighthouse; confirm Core Web Vitals targets (Technical Specs perf budget)
- [ ] Verify RLS policies with a non-admin test user before go-live
- [ ] Submit sitemap to Google Search Console

## 8. What's built vs. what remains

**Built:** design system, homepage, 10 core brand pages, 11 service pages, location/service/brand/article templates, 10 Revenue Engine tools (UI), Supabase schema + RLS + seed, typed query layer, Server Actions (estimate/contact/design) with validation + rate-limit + email, portal auth middleware, dynamic sitemap/robots, JSON-LD builders, all build configs, security headers.

**Remains (normal pre-launch engineering):** wire each tool's submit to its Server Action and success/error UI states; build the three portal dashboards on top of the auth gate; CMS-migrate long-form Learning Center content; real assets; the `[VERIFY]` content; analytics component; legal copy. None of this is blocked — it's the finishing work the scaffold is designed to receive.
```
```
