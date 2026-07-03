-- ============================================================
-- Sprint 5 — Local SEO generator schema (extends lib/schema.sql)
-- Three tiers + service×city combos, all gate-enforced.
-- ============================================================

-- Extend locations with tier + geo + relations
alter table locations add column if not exists tier text
  check (tier in ('state','city','neighborhood')) default 'city';
alter table locations add column if not exists latitude numeric(9,6);
alter table locations add column if not exists longitude numeric(9,6);
alter table locations add column if not exists parent_id uuid references locations(id);
alter table locations add column if not exists neighborhoods_served text[];   -- city tier: list of served neighborhoods
alter table locations add column if not exists permit_note text;               -- local permit guidance, nullable

-- Local FAQs — closes the LocationPage type's required localFaqs gate
create table if not exists local_faqs (
  id uuid primary key default gen_random_uuid(),
  location_id uuid not null references locations(id) on delete cascade,
  question text not null,
  answer text not null,
  sort int default 0
);

-- Service × City landing rows. A row exists ONLY when the combo has real local
-- substance — this is the gate for /locations/[state]/[city]/[service].
create table if not exists location_services (
  id uuid primary key default gen_random_uuid(),
  location_id uuid not null references locations(id) on delete cascade,
  service_slug text not null,            -- matches allServicePages slug
  local_intro text not null,             -- unique per city+service, NOT boilerplate
  local_considerations text,             -- climate/soil specifics for this service here
  unique (location_id, service_slug)
);

-- Nearby-cities helper (for internal linking between markets)
create or replace function nearby_cities(city_id uuid, max_km numeric default 60)
returns table(id uuid, city text, slug text, km numeric)
language sql stable as $$
  select l.id, l.city, l.slug,
    (6371 * acos(least(1,
      cos(radians(o.latitude)) * cos(radians(l.latitude)) *
      cos(radians(l.longitude) - radians(o.longitude)) +
      sin(radians(o.latitude)) * sin(radians(l.latitude))
    ))) as km
  from locations o
  join locations l on l.tier = 'city' and l.id <> o.id
    and l.latitude is not null and l.longitude is not null
  where o.id = city_id and o.latitude is not null
  having (6371 * acos(least(1,
      cos(radians(o.latitude)) * cos(radians(l.latitude)) *
      cos(radians(l.longitude) - radians(o.longitude)) +
      sin(radians(o.latitude)) * sin(radians(l.latitude))))) <= max_km
  order by km asc
  limit 6;
$$;
