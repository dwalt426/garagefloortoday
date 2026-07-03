-- ============================================================
-- GFT seed data v1 — demo/staging only. Replace with real data
-- before launch (Brand Bible §8: no fabricated content ships).
-- ============================================================

insert into franchisees (id, business_name, contact_email) values
  ('00000000-0000-0000-0000-000000000001', 'GFT North Texas LLC', 'ops@gftnorthtexas.example');

insert into locations (id, state, state_abbr, city, slug, climate_narrative, franchisee_id) values
  ('00000000-0000-0000-0000-000000000010', 'Texas', 'TX', 'Dallas', 'texas/dallas',
   'North Texas slabs fight expansive clay soil movement and 100°F+ surface temps. Every Dallas install is moisture-tested for vapor transmission and coated with a UV-stable system rated for hot-tire pickup in Texas summers.',
   '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000011', 'Texas', 'TX', 'Fort Worth', 'texas/fort-worth',
   'Fort Worth garages see the same clay-soil slab movement as Dallas plus heavier workshop use across Tarrant County. ArmorPrep™ crack repair scope is assessed on every estimate.',
   '00000000-0000-0000-0000-000000000001');

insert into installers (name, role, location_id, certified_date, floors_completed) values
  ('Marcus Webb', 'Lead Installer', '00000000-0000-0000-0000-000000000010', '2020-03-01', 412),
  ('James Tran',  'Crew Chief',     '00000000-0000-0000-0000-000000000010', '2018-05-15', 559),
  ('Dana Ruiz',   'Lead Installer', '00000000-0000-0000-0000-000000000011', '2022-06-01', 287);

insert into materials (name, chemistry, cure_time_hours, expected_life_years_min, expected_life_years_max) values
  ('GFT Performance — Epoxy', 'epoxy', 96, 5, 10),
  ('GFT Performance — Polyaspartic', 'polyaspartic', 24, 15, 20),
  ('GFT Performance — Polyurea Hybrid', 'hybrid', 24, 20, 25);
-- NOTE: durability ratings (uv/scratch/impact/hot_tire/chemical) intentionally
-- left NULL — populate ONLY from verified manufacturer spec sheets.

insert into blends (name, family) values
  ('Granite Ridge', 'Earth'), ('Carbon Fleck', 'Modern'), ('Quarry Slate', 'Earth'),
  ('Nightfall', 'Modern'), ('Tuxedo', 'Classic'), ('Creekbed', 'Earth'),
  ('Orbit', 'Modern'), ('Foundry Gray', 'Classic');

-- National default pricing (location_id NULL). PLACEHOLDER RATES.
insert into pricing_rates (location_id, finish_tier, rate_low_per_sqft, rate_high_per_sqft) values
  (null, 'solid', 5.50, 7.00),
  (null, 'flake', 6.50, 8.50),
  (null, 'metallic', 8.50, 11.00);

-- One completed demo project so FloorPassport lookup works immediately
insert into customers (id, name, email) values
  ('00000000-0000-0000-0000-000000000100', 'Demo Homeowner', 'demo@example.com');

insert into projects (id, customer_id, location_id, material_id, blend_id, status,
  moisture_readings, batch_numbers, install_date, sq_ft)
select
  '00000000-0000-0000-0000-000000000200',
  '00000000-0000-0000-0000-000000000100',
  '00000000-0000-0000-0000-000000000010',
  m.id, b.id, 'completed',
  '[{"stage":"pre-grind","value":4.2,"unit":"lbs/1000sqft/24h"},{"stage":"post-grind","value":3.1,"unit":"lbs/1000sqft/24h"}]',
  '[{"coat":"base","batch":"PA-26-0447"},{"coat":"topcoat","batch":"TC-26-1120"}]',
  '2026-06-22', 450
from materials m, blends b
where m.name = 'GFT Performance — Polyaspartic' and b.name = 'Granite Ridge';

insert into project_installers (project_id, installer_id, is_lead)
select '00000000-0000-0000-0000-000000000200', id, (name = 'Marcus Webb')
from installers where name in ('Marcus Webb', 'James Tran');

insert into warranties (project_id, terms, start_date) values
  ('00000000-0000-0000-0000-000000000200', 'Lifetime performance warranty, transferable to subsequent homeowner.', '2026-06-22');

insert into maintenance_events (project_id, event_type, due_date) values
  ('00000000-0000-0000-0000-000000000200', 'scheduled_reminder', '2027-03-01');

insert into reviews (project_id, rating, body, theme_tags, published) values
  ('00000000-0000-0000-0000-000000000200', 5,
   'The prep work alone took longer than our old contractor''s entire install. Floor still looks brand new.',
   '{"Durability","Installation Experience"}', true);
