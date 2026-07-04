import { createClient } from "./supabase-server";
import type { SessionUser } from "./auth/session";
export interface CrewJob {
  gftProjectId: string;
  city: string;
  stateAbbr: string;
  status: string;
  installDate: string | null;
  checklistDone: number;
  checklistTotal: number;
}
export interface CrewJobDetail extends CrewJob {
  checklist: Record<string, boolean>;
  moistureReadings: { stage: string; value: number; unit: string }[];
  batches: { coat: string; batch: string }[];
  prepPhotos: string[];
  finishedPhotos: string[];
}
const CHECKLIST_KEYS = [
  "armorprep_grind", "moisture_pre", "moisture_post", "crack_repair",
  "system_applied", "finished_photos", "customer_walkthrough",
];
/** Jobs assigned to the signed-in installer (RLS-scoped). */
export async function getCrewJobs(user: SessionUser): Promise<CrewJob[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("gft_project_id, status, install_date, checklist, locations(city, state_abbr)")
    .neq("status", "completed")
    .order("install_date", { ascending: true });
  return (data ?? []).map((p: any) => ({
    gftProjectId: p.gft_project_id,
    city: p.locations?.city ?? "—",
    stateAbbr: p.locations?.state_abbr ?? "",
    status: p.status,
    installDate: p.install_date,
    checklistDone: CHECKLIST_KEYS.filter((k) => p.checklist?.[k]).length,
    checklistTotal: CHECKLIST_KEYS.length,
  }));
}
export async function getCrewJobDetail(gftProjectId: string): Promise<CrewJobDetail | null> {
  const supabase = await createClient();
  const { data: p } = await supabase
    .from("projects")
    .select("gft_project_id, status, install_date, checklist, moisture_readings, batch_numbers, prep_photo_urls, finished_photo_urls, locations(city, state_abbr)")
    .eq("gft_project_id", gftProjectId)
    .maybeSingle();
  if (!p) return null; // RLS: null if not assigned to this installer
  const pAny = p as any;
  return {
    gftProjectId: pAny.gft_project_id,
    city: pAny.locations?.city ?? "—",
    stateAbbr: pAny.locations?.state_abbr ?? "",
    status: pAny.status,
    installDate: pAny.install_date,
    checklistDone: CHECKLIST_KEYS.filter((k) => pAny.checklist?.[k]).length,
    checklistTotal: CHECKLIST_KEYS.length,
    checklist: pAny.checklist ?? {},
    moistureReadings: pAny.moisture_readings ?? [],
    batches: pAny.batch_numbers ?? [],
    prepPhotos: pAny.prep_photo_urls ?? [],
    finishedPhotos: pAny.finished_photo_urls ?? [],
  };
}
