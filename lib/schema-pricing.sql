-- ============================================================
-- Sprint 5 (partial) — dynamic pricing inputs feeding the live estimator.
-- Replaces the static placeholder rates with market-aware factors.
-- ============================================================

-- Per-market cost factors (multiplies the base finish rate)
create table if not exists market_pricing (
  id uuid primary key default gen_random_uuid(),
  location_id uuid references locations(id),   -- null = national default
  cost_index numeric(4,2) not null default 1.00,   -- regional labor/material index
  travel_surcharge numeric(6,2) default 0,          -- flat, for outlying areas
  crew_availability text default 'normal'
    check (crew_availability in ('high','normal','constrained')),
  seasonal_multiplier numeric(4,2) default 1.00,    -- updated by ops per season
  effective_from date default current_date
);

-- Repair scope adders (condition -> extra $/sqft), replaces hardcoded CONDITION_MULT
create table if not exists repair_rates (
  id uuid primary key default gen_random_uuid(),
  condition text not null unique
    check (condition in ('good','minor-cracks','major-repair')),
  add_per_sqft_low numeric(5,2) not null,
  add_per_sqft_high numeric(5,2) not null
);
