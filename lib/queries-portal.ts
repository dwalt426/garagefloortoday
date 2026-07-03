import { createClient } from "./supabase-server";
import type { SessionUser } from "./auth/session";

/** Customer-portal data access. All queries run under the signed-in customer's
 *  session, so RLS ("own projects/warranty/maintenance" policies from
 *  lib/schema.sql) scopes every row to the authenticated homeowner. No
 *  franchise or admin data can leak through these.
 */

export interface PortalProject {
  gftProjectId: string;
  city: string;
  stateAbbr: string;
  finishName: string;
  systemName: string;
  installDate: string | null;
  crewLead: string;
  warrantyStatus: string;
  warrantyTerms: string | null;
  prepPhotos: string[];
  finishedPhotos: string[];
  moistureReadings: { stage: string; value: number; unit: string }[];
}

export interface MaintenanceItem {
  id: string;
  eventType: string;
  dueDate: string | null;
  completedDate: string | null;
  notes: string | null;
}

/** All floors owned by this customer (a homeowner may have several). */
export async function getCustomerProjects(user: SessionUser): Promise<PortalProject[]> {
  const supabase = await createClient();
  // customer row(s) linked to this auth user
  const { data: customers } = await supabase
    .from("customers").select("id").eq("auth_user_id", user.id);
  const ids = (customers ?? []).map((c: any) => c.id);
  if (!ids.length) return [];

  const { data: projects } = await supabase
    .from("projects")
    .select(`
      gft_project_id, install_date, moisture_readings, prep_photo_urls, finished_photo_urls,
      locations(city, state_abbr),
      materials(name),
      blends(name),
      warranties(terms, status)
    `)
    .in("customer_id", ids)
    .order("install_date", { ascending: false });

  return (projects ?? []).map((p: any) => ({
    gftProjectId: p.gft_project_id,
    city: p.locations?.city ?? "—",
    stateAbbr: p.locations?.state_abbr ?? "",
    finishName: p.blends?.name ?? "—",
    systemName: p.materials?.name ?? "—",
    installDate: p.install_date,
    crewLead: "—", // resolved via project_installers if needed on detail view
    warrantyStatus: p.warranties?.status ?? "active",
    warrantyTerms: p.warranties?.terms ?? null,
    prepPhotos: p.prep_photo_urls ?? [],
    finishedPhotos: p.finished_photo_urls ?? [],
    moistureReadings: p.moisture_readings ?? [],
  }));
}

export async function getMaintenanceForProject(gftProjectId: string): Promise<MaintenanceItem[]> {
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects").select("id").eq("gft_project_id", gftProjectId).maybeSingle();
  if (!project) return [];
  const { data } = await supabase
    .from("maintenance_events")
    .select("id, event_type, due_date, completed_date, notes")
    .eq("project_id", project.id)
    .order("due_date", { ascending: true });
  return (data ?? []).map((m: any) => ({
    id: m.id, eventType: m.event_type, dueDate: m.due_date,
    completedDate: m.completed_date, notes: m.notes,
  }));
}
