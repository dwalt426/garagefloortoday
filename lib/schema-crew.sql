-- ============================================================
-- Sprint 9 — Installer portal: link installers to auth users,
-- job assignment, and completion checklist. Extends prior schema.
-- ============================================================

-- Link an installer record to a login
alter table installers add column if not exists auth_user_id uuid references auth.users(id);

-- Completion checklist state per project (The GarageFloorToday Standard™ steps)
alter table projects add column if not exists checklist jsonb default '{
  "armorprep_grind": false, "moisture_pre": false, "moisture_post": false,
  "crack_repair": false, "system_applied": false, "finished_photos": false,
  "customer_walkthrough": false
}';
alter table projects add column if not exists customer_signature_at timestamptz;
alter table projects add column if not exists closed_at timestamptz;

-- RLS: an installer sees/updates only projects they're assigned to
create policy "installer read assigned projects" on projects
  for select using (
    exists (
      select 1 from project_installers pi
      join installers i on i.id = pi.installer_id
      where pi.project_id = projects.id and i.auth_user_id = auth.uid()
    )
  );
create policy "installer update assigned projects" on projects
  for update using (
    exists (
      select 1 from project_installers pi
      join installers i on i.id = pi.installer_id
      where pi.project_id = projects.id and i.auth_user_id = auth.uid()
    )
  );

-- Storage buckets (create in Supabase dashboard or via API):
--   prep-photos, finished-photos  → installer-write, public-read-finished
-- Photo URLs are appended to projects.prep_photo_urls / finished_photo_urls.
