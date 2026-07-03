-- ============================================================
-- Sprint 5 seed — demo Missouri + Texas location tree so the
-- generator renders end-to-end. Replace with real data before launch.
-- ============================================================

-- States
insert into locations (id, tier, state, state_abbr, city, slug, climate_narrative)
values
 ('00000000-0000-0000-0000-000000000300','state','Missouri','MO','', 'missouri',
  'Missouri garages face humid summers, hard freezes, and heavy winter road salt across the St. Louis and Kansas City metros. Every install is moisture-tested and specified for freeze-thaw and chloride exposure.'),
 ('00000000-0000-0000-0000-000000000301','state','Texas','TX','', 'texas',
  'Texas slabs contend with expansive clay soils and extreme summer surface heat. Statewide, GFT specifies UV-stable, hot-tire-rated systems over documented ArmorPrep™.')
on conflict (slug) do nothing;

-- Cities under Missouri (lat/long for nearby calc)
insert into locations (id, tier, state, state_abbr, city, slug, parent_id, latitude, longitude,
  climate_narrative, neighborhoods_served, permit_note)
values
 ('00000000-0000-0000-0000-000000000310','city','Missouri','MO','St. Louis','missouri/st-louis',
  '00000000-0000-0000-0000-000000000300', 38.6270, -90.1994,
  'St. Louis garages battle humidity, hard winter freezes, and salt tracked in off I-64 and I-44. Slab moisture and freeze-thaw crack repair lead every ArmorPrep™ scope here.',
  ARRAY['Central West End','Tower Grove','Clayton','Kirkwood','Webster Groves'],
  'Interior garage floor coatings do not typically require a permit in the City of St. Louis; some municipalities regulate exterior work. Your consultant confirms local rules.'),
 ('00000000-0000-0000-0000-000000000311','city','Missouri','MO','St. Charles','missouri/st-charles',
  '00000000-0000-0000-0000-000000000300', 38.7881, -90.4974,
  'St. Charles County''s newer subdivisions sit on variable fill; moisture testing and joint detailing are emphasized on these slabs, alongside the region''s freeze-thaw and salt exposure.',
  ARRAY['Old Town','New Town','Cottleville','Weldon Spring'], NULL),
 ('00000000-0000-0000-0000-000000000312','city','Missouri','MO',E'O\'Fallon','missouri/ofallon',
  '00000000-0000-0000-0000-000000000300', 38.8106, -90.6998,
  E'O\'Fallon''s rapid residential growth means many newer slabs still curing to stable moisture; testing timing matters as much as the reading here, on top of standard Missouri freeze-thaw considerations.',
  ARRAY['WingHaven','Dardenne Prairie'], NULL)
on conflict (slug) do nothing;

-- Installers per city
insert into installers (name, role, location_id, certified_date, floors_completed) values
 ('Ray Mueller','Lead Installer','00000000-0000-0000-0000-000000000310','2019-04-01',388),
 ('Tanya Brooks','Crew Chief','00000000-0000-0000-0000-000000000310','2017-09-01',602),
 ('Cole Jensen','Lead Installer','00000000-0000-0000-0000-000000000311','2021-05-01',231)
on conflict do nothing;

-- Local FAQs (gate requirement)
insert into local_faqs (location_id, question, answer, sort) values
 ('00000000-0000-0000-0000-000000000310','Does St. Louis road salt damage coated floors?',
  'Salt tracked in over winter attacks bare concrete far more than a properly coated floor. We specify chloride-resistant systems and note a winter rinse cadence on your FloorPassport™.',0),
 ('00000000-0000-0000-0000-000000000310','Do freeze-thaw cycles crack garage coatings here?',
  'Only when slab cracks were ignored. ArmorPrep™ includes structural crack repair before coating, which is why St. Louis installs hold up through the freeze-thaw season.',1),
 ('00000000-0000-0000-0000-000000000311','Are St. Charles new-build slabs ready to coat?',
  'Sometimes not immediately — newer slabs need to cure to stable moisture. We test and, if needed, schedule around the reading rather than coating a slab that isn''t ready.',0);

-- City × service combos (only where local substance authored)
insert into location_services (location_id, service_slug, local_intro, local_considerations) values
 ('00000000-0000-0000-0000-000000000310','residential-garage-floors',
  'Residential garage floor coatings in St. Louis, engineered for humid summers, hard winter freezes, and the road salt that comes with both. Every install is moisture-tested and documented on a FloorPassport™.',
  'St. Louis winters mean chloride exposure and freeze-thaw movement — the two things that end cheap coatings early. Local installs lead with crack repair and salt-resistant chemistry.'),
 ('00000000-0000-0000-0000-000000000310','basements',
  'Basement floor coatings in St. Louis, where below-grade moisture and older housing stock make vapor testing non-negotiable before any finish goes down.',
  'Many St. Louis homes predate modern vapor barriers. We measure moisture first and mitigate where the readings require it — never coat over a damp slab and hope.')
on conflict (location_id, service_slug) do nothing;
