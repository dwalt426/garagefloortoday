/** Data-access layer — every page/tool calls these functions, never raw queries.
 *  Uses @supabase/supabase-js. Return types match the frontend types so pages
 *  that currently import from data/homepage.ts swap to these with zero UI changes.
 *
 *  Setup:
 *    npm i @supabase/supabase-js
 *    NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
 */
import { createClient } from "@supabase/supabase-js";
import type { Project, CrewMember, Review } from "../types";
import type { LocationPageData, LocalFaq } from "../app/templates/LocationPage";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* ---------- FloorPassport lookup (public) ---------- */

export async function lookupFloorPassport(gftProjectId: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from("floorpassports")
    .select("*")
    .eq("gft_project_id", gftProjectId.trim().toUpperCase())
    .maybeSingle();
  if (error || !data) return null;
  return {
    gftProjectId: data.gft_project_id,
    city: data.city,
    state: data.state_abbr,
    finishName: data.blend_name ?? "—",
    installDate: data.install_date,
    system: chemistryFromName(data.system_name),
    crewLeadName: data.crew_lead ?? "—",
    warrantyStatus: data.warranty_status ?? "active",
  };
}

/* ---------- Lead capture (every Revenue Engine tool) ---------- */

export type LeadSource =
  | "smart_estimator" | "engineer_my_floor" | "visualizer"
  | "cost_calculator" | "financing_calculator" | "floor_finder"
  | "contact_form" | "phone";

export async function captureLead(input: {
  sourceTool: LeadSource;
  payload: Record<string, unknown>;   // estimate inputs / saved design / spec
  email?: string;
  phone?: string;
  zip?: string;
}): Promise<{ ok: boolean }> {
  const { error } = await supabase.from("leads").insert({
    source_tool: input.sourceTool,
    payload: input.payload,
    email: input.email,
    phone: input.phone,
    zip: input.zip,
  });
  return { ok: !error };
}

/* ---------- Regional pricing (Smart Estimator / Cost Calculator) ---------- */

export async function getPricingRates(locationSlug?: string) {
  // location-specific rates if present, else national defaults (location_id null)
  const { data } = await supabase
    .from("pricing_rates")
    .select("finish_tier, rate_low_per_sqft, rate_high_per_sqft, location_id, locations(slug)")
    .order("effective_from", { ascending: false });
  if (!data) return null;
  const local = locationSlug
    ? data.filter((r: any) => r.locations?.slug === locationSlug)
    : [];
  const national = data.filter((r: any) => r.location_id === null);
  const pick = (tier: string) =>
    local.find((r: any) => r.finish_tier === tier) ??
    national.find((r: any) => r.finish_tier === tier);
  return {
    solid: pick("solid"),
    flake: pick("flake"),
    metallic: pick("metallic"),
  };
}

/* ---------- Location page data (city page template) ---------- */

export async function getLocationPageData(slug: string): Promise<LocationPageData | null> {
  const { data: loc } = await supabase
    .from("locations")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (!loc) return null;

  const [{ data: crew }, { data: installs }, { data: revs }] = await Promise.all([
    supabase.from("installers").select("*").eq("location_id", loc.id).eq("active", true),
    supabase.from("floorpassports").select("*").eq("city", loc.city).order("install_date", { ascending: false }).limit(3),
    supabase.from("reviews").select("*").eq("published", true).limit(6),
  ]);

  // Publishing gate (Brand Bible §6): refuse to return renderable data
  // if the required local elements don't exist. The page 404s instead of
  // rendering thin. This is the runtime half of the type-level gate.
  if (!crew?.length || !installs?.length || !loc.climate_narrative) return null;

  return {
    city: loc.city,
    state: loc.state,
    stateAbbr: loc.state_abbr,
    climateNarrative: loc.climate_narrative,
    crew: crew.map(toCrewMember) as LocationPageData["crew"],
    localFaqs: [{ question: "", answer: "" }] as [LocalFaq, ...LocalFaq[]], // TODO: local_faqs table, next migration
    recentInstalls: installs.map(toProject) as LocationPageData["recentInstalls"],
    localReviews: (revs ?? []).map(toReview),
    floorsInstalledCount: crew.reduce((n: number, m: any) => n + m.floors_completed, 0),
  };
}

/* ---------- mappers ---------- */

function toCrewMember(r: any): CrewMember {
  return {
    id: r.id, name: r.name, role: r.role, market: "",
    yearsCertified: Math.floor((Date.now() - new Date(r.certified_date).getTime()) / 3.15e10),
    floorsCompleted: r.floors_completed, photoUrl: r.photo_url ?? undefined,
  };
}

function toProject(r: any): Project {
  return {
    gftProjectId: r.gft_project_id, city: r.city, state: r.state_abbr,
    finishName: r.blend_name ?? "—", installDate: r.install_date,
    system: chemistryFromName(r.system_name), crewLeadName: r.crew_lead ?? "—",
    warrantyStatus: r.warranty_status ?? "active",
  };
}

function toReview(r: any): Review {
  return {
    id: r.id, rating: r.rating, body: r.body, themes: r.theme_tags ?? [],
    customerFirstName: "", city: "", projectId: r.project_id ?? undefined,
  };
}

function chemistryFromName(name?: string): Project["system"] {
  if (!name) return "polyaspartic";
  if (name.toLowerCase().includes("hybrid") || name.toLowerCase().includes("polyurea")) return "polyurea-hybrid";
  if (name.toLowerCase().includes("epoxy")) return "epoxy";
  return "polyaspartic";
}
