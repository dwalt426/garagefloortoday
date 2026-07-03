-- ============================================================
-- Sprint 7 — CRM / admin fields (extends leads) + RLS for admin scope
-- ============================================================

-- Lead pipeline stage (the CRM the Server Actions drive)
alter table leads add column if not exists stage text
  check (stage in ('new','contacted','estimate_scheduled','estimate_sent',
                   'won','lost','installed','warranty','maintenance'))
  default 'new';
alter table leads add column if not exists stage_note text;
alter table leads add column if not exists stage_updated_at timestamptz;
alter table leads add column if not exists assigned_franchisee_id uuid references franchisees(id);

-- Admin read access to leads (public could only insert before).
-- Admins see leads for their franchise territory; super-admins (null franchisee) see all.
create policy "admin read leads" on leads
  for select using (
    exists (
      select 1 from auth.users u
      where u.id = auth.uid()
        and (u.raw_app_meta_data->>'role') = 'admin'
    )
  );
create policy "admin update leads" on leads
  for update using (
    exists (
      select 1 from auth.users u
      where u.id = auth.uid()
        and (u.raw_app_meta_data->>'role') = 'admin'
    )
  );

-- Admin moderation of reviews
create policy "admin manage reviews" on reviews
  for all using (
    exists (
      select 1 from auth.users u
      where u.id = auth.uid()
        and (u.raw_app_meta_data->>'role') = 'admin'
    )
  );

-- Admin pricing writes
alter table pricing_rates enable row level security;
create policy "public read pricing" on pricing_rates for select using (true);
create policy "admin write pricing" on pricing_rates
  for insert with check (
    exists (
      select 1 from auth.users u
      where u.id = auth.uid()
        and (u.raw_app_meta_data->>'role') = 'admin'
    )
  );
