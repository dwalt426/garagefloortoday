-- ============================================================
-- GarageFloorToday — Supabase schema v1
-- Everything keys off gft_project_id (Brand Bible §4).
-- Run in Supabase SQL editor. RLS policies at the bottom.
-- ============================================================

-- ---------- Reference data ----------

create table locations (
  id uuid primary key default gen_random_uuid(),
  state text not null,
  state_abbr text not null,
  city text not null,
  neighborhood text,                      -- null except Tier 3 pages
  slug text not null unique,              -- "texas/dallas"
  climate_narrative text not null,        -- unique per metro, publishing gate
  franchisee_id uuid references franchisees(id),
  created_at timestamptz default now()
);

create table franchisees (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  contact_email text not null,
  onboarded_at timestamptz default now()
);

create table installers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null default 'Lead Installer',
  location_id uuid not null references locations(id),
  certified_date date not null,
  floors_completed integer not null default 0,  -- denormalized, bumped by trigger
  photo_url text,
  active boolean not null default true
);

create table materials (
  id uuid primary key default gen_random_uuid(),
  name text not null,                     -- "GFT Performance — Polyaspartic"
  chemistry text not null check (chemistry in ('epoxy','polyaspartic','polyurea','hybrid')),
  spec_sheet_url text,
  -- Compare Systems tool data — verified manufacturer values only (Brand Bible §8)
  uv_rating smallint check (uv_rating between 1 and 5),
  scratch_rating smallint check (scratch_rating between 1 and 5),
  impact_rating smallint check (impact_rating between 1 and 5),
  hot_tire_rating smallint check (hot_tire_rating between 1 and 5),
  chemical_rating smallint check (chemical_rating between 1 and 5),
  cure_time_hours integer,
  expected_life_years_min integer,
  expected_life_years_max integer
);

create table blends (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,              -- "Granite Ridge"
  family text not null,                   -- "Earth" | "Modern" | "Classic"
  swatch_photo_url text,                  -- real product photography per The Lens
  active boolean not null default true
);

-- Regional pricing — the Estimator's real data source
create table pricing_rates (
  id uuid primary key default gen_random_uuid(),
  location_id uuid references locations(id),  -- null = national default
  finish_tier text not null check (finish_tier in ('solid','flake','metallic')),
  rate_low_per_sqft numeric(6,2) not null,
  rate_high_per_sqft numeric(6,2) not null,
  effective_from date not null default current_date
);

-- ---------- Customers & the central Projects table ----------

create table customers (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid references auth.users(id),  -- links homeowner portal login
  name text not null,
  email text not null,
  phone text,
  address text,
  created_at timestamptz default now()
);

create sequence gft_project_seq start 10001;

create table projects (
  id uuid primary key default gen_random_uuid(),
  gft_project_id text not null unique,    -- "GFT-2026-10483", set by trigger
  customer_id uuid references customers(id),
  location_id uuid not null references locations(id),
  material_id uuid references materials(id),
  blend_id uuid references blends(id),
  status text not null default 'lead'
    check (status in ('lead','estimated','scheduled','in_progress','completed','serviced')),
  batch_numbers jsonb default '[]',       -- [{coat:"base", batch:"PA-26-0447"}]
  moisture_readings jsonb default '[]',   -- [{stage:"pre-grind", value:4.2, unit:"lbs/1000sqft/24h"}]
  prep_photo_urls text[] default '{}',
  finished_photo_urls text[] default '{}',
  install_date date,
  sq_ft integer,
  quoted_low numeric(10,2),
  quoted_high numeric(10,2),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-assign GFT Project ID at lead creation (assigned at scheduling per Bible §4;
-- v1 assigns at insert so estimator/visualizer saves get an ID immediately)
create or replace function assign_gft_project_id()
returns trigger language plpgsql as $$
begin
  if new.gft_project_id is null then
    new.gft_project_id :=
      'GFT-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('gft_project_seq')::text, 5, '0');
  end if;
  return new;
end $$;

create trigger trg_assign_project_id
  before insert on projects
  for each row execute function assign_gft_project_id();

create table project_installers (
  project_id uuid references projects(id) on delete cascade,
  installer_id uuid references installers(id),
  is_lead boolean not null default false,
  primary key (project_id, installer_id)
);

-- Bump denormalized floors_completed on completion
create or replace function bump_installer_counts()
returns trigger language plpgsql as $$
begin
  if new.status = 'completed' and old.status is distinct from 'completed' then
    update installers set floors_completed = floors_completed + 1
    where id in (select installer_id from project_installers where project_id = new.id);
  end if;
  return new;
end $$;

create trigger trg_bump_counts
  after update on projects
  for each row execute function bump_installer_counts();

-- ---------- FloorPassport, warranty, maintenance ----------

create table warranties (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null unique references projects(id),
  terms text not null,
  start_date date not null,
  status text not null default 'active' check (status in ('active','expired','transferred')),
  transferred_to_customer_id uuid references customers(id)
);

create table maintenance_events (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id),
  event_type text not null check (event_type in ('scheduled_reminder','service_visit','repair')),
  due_date date,
  completed_date date,
  notes text
);

-- FloorPassport is a VIEW — it's a presentation of the project record, not a copy
create view floorpassports as
select
  p.gft_project_id,
  p.install_date,
  p.moisture_readings,
  p.batch_numbers,
  p.prep_photo_urls,
  p.finished_photo_urls,
  p.sq_ft,
  m.name as system_name,
  b.name as blend_name,
  l.city, l.state_abbr,
  w.terms as warranty_terms, w.status as warranty_status,
  (select i.name from project_installers pi join installers i on i.id = pi.installer_id
   where pi.project_id = p.id and pi.is_lead limit 1) as crew_lead
from projects p
join locations l on l.id = p.location_id
left join materials m on m.id = p.material_id
left join blends b on b.id = p.blend_id
left join warranties w on w.project_id = p.id
where p.status in ('completed','serviced');

-- ---------- Leads (the Revenue Engine funnel) ----------
-- Every tool writes here; one funnel, ten entry points.

create table leads (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id),   -- linked when a Project ID is assigned
  source_tool text not null check (source_tool in
    ('smart_estimator','engineer_my_floor','visualizer','cost_calculator',
     'financing_calculator','floor_finder','contact_form','phone')),
  payload jsonb not null default '{}',        -- the saved design / estimate inputs
  email text,
  phone text,
  zip text,
  created_at timestamptz default now()
);

create table reviews (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id),
  customer_id uuid references customers(id),
  rating smallint not null check (rating between 1 and 5),
  body text not null,
  theme_tags text[] default '{}',
  response_body text,
  response_at timestamptz,
  source text not null default 'site' check (source in ('site','google')),
  published boolean not null default false,   -- curated, never deleted (Bible §14)
  created_at timestamptz default now()
);

-- ---------- Row Level Security ----------

alter table projects enable row level security;
alter table customers enable row level security;
alter table leads enable row level security;
alter table warranties enable row level security;
alter table maintenance_events enable row level security;
alter table reviews enable row level security;

-- Public: anyone can look up a completed floor's passport by Project ID
-- (the floorpassports view only exposes completed projects; grant select)
grant select on floorpassports to anon;

-- Public: published reviews, active blends, materials, locations are readable
create policy "public read published reviews" on reviews
  for select using (published = true);

-- Homeowners: see own projects/warranties/maintenance via portal login
create policy "own projects" on projects
  for select using (
    customer_id in (select id from customers where auth_user_id = auth.uid())
  );
create policy "own warranty" on warranties
  for select using (
    project_id in (select p.id from projects p
      join customers cu on cu.id = p.customer_id where cu.auth_user_id = auth.uid())
  );
create policy "own maintenance" on maintenance_events
  for select using (
    project_id in (select p.id from projects p
      join customers cu on cu.id = p.customer_id where cu.auth_user_id = auth.uid())
  );

-- Anyone can create a lead (the tools write anonymously)
create policy "insert leads" on leads for insert with check (true);
-- Nobody reads leads publicly
create policy "no public lead reads" on leads for select using (false);
