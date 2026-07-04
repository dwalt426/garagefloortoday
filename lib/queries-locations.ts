import { createClient } from "./supabase-server";
import type { CrewMember, Project, Review } from "../types";
import type { LocationPageData, LocalFaq } from "../app/templates/LocationPage";

/** Sprint 5 location data access. Every fetcher enforces the publishing gate:
 *  returns null when required local substance is missing → route calls
 *  notFound(). Thin programmatic pages cannot exist.
 */

export interface StatePageData {
  state: string;
  stateAbbr: string;
  slug: string;
  climateNarrative: string;
  cities: { city: string; slug: string; floorsInstalled: number }[];
  totalFloors: number;
}

export interface CityServiceData {
  city: string;
  stateAbbr: string;
  citySlug: string;
  serviceSlug: string;
  serviceTitle: string;
  localIntro: string;
  localConsiderations: string | null;
  recentInstalls: Project[];
  crew: CrewMember[];
}

export interface NearbyCity { city: string; slug: string; km: number; }

/* ---------- State tier ---------- */

export async function getStatePageData(stateSlug: string): Promise<StatePageData | null> {
  const supabase = await createClient();
  const { data: state } = await supabase
    .from("locations").select("*").eq("tier", "state").eq("slug", stateSlug).maybeSingle();
  if (!state || !state.climate_narrative) return null;

  const { data: cities } = await supabase
    .from("locations").select("city, slug").eq("tier", "city").eq("parent_id", state.id);
  if (!cities?.length) return null; // a state with no live cities doesn't publish

  // floors installed per city via crew counts
  const withCounts = await Promise.all(cities.map(async (c: any) => {
    const { data: crew } = await supabase.from("installers").select("floors_completed")
      .eq("location_id", c.id).eq("active", true);
    const floors = (crew ?? []).reduce((n: number, m: any) => n + m.floors_completed, 0);
    return { city: c.city, slug: c.slug, floorsInstalled: floors };
  }));

  return {
    state: state.state, stateAbbr: state.state_abbr, slug: state.slug,
    climateNarrative: state.climate_narrative,
    cities: withCounts,
    totalFloors: withCounts.reduce((n, c) => n + c.floorsInstalled, 0),
  };
}

/* ---------- City tier (extends the base LocationPageData with FAQs + nearby) ---------- */

export async function getCityPageData(slug: string): Promise<
  (LocationPageData & { nearby: NearbyCity[]; neighborhoods: string[]; permitNote: string | null }) | null
> {
  const supabase = await createClient();
  const { data: loc } = await supabase
    .from("locations").select("*").eq("slug", slug).eq("tier", "city").maybeSingle();
  if (!loc || !loc.climate_narrative) return null;

  const [{ data: crew }, { data: installs }, { data: revs }, { data: faqs }, { data: nearby }] =
    await Promise.all([
      supabase.from("installers").select("*").eq("location_id", loc.id).eq("active", true),
      supabase.from("floorpassports").select("*").eq("city", loc.city).order("install_date", { ascending: false }).limit(3),
      supabase.from("reviews").select("*").eq("published", true).limit(6),
      supabase.from("local_faqs").select("*").eq("location_id", loc.id).order("sort"),
      supabase.rpc("nearby_cities", { city_id: loc.id }),
    ]);

  // GATE: crew, installs, climate, AND at least one local FAQ all required
  if (!crew?.length || !installs?.length || !faqs?.length) return null;

  return {
    city: loc.city, state: loc.state, stateAbbr: loc.state_abbr,
    climateNarrative: loc.climate_narrative,
    crew: crew.map(toCrew) as LocationPageData["crew"],
    localFaqs: faqs.map((f: any) => ({ question: f.question, answer: f.answer })) as [LocalFaq, ...LocalFaq[]],
    recentInstalls: installs.map(toProject) as LocationPageData["recentInstalls"],
    localReviews: (revs ?? []).map(toReview),
    floorsInstalledCount: crew.reduce((n: number, m: any) => n + m.floors_completed, 0),
    neighborhoods: loc.neighborhoods_served ?? [],
    permitNote: loc.permit_note ?? null,
    nearby: (nearby ?? []).map((n: any) => ({ city: n.city, slug: n.slug, km: Math.round(n.km) })),
  };
}

/* ---------- City × Service tier ---------- */

export async function getCityServiceData(citySlug: string, serviceSlug: string): Promise<CityServiceData | null> {
  const supabase = await createClient();
  const { data: loc } = await supabase
    .from("locations").select("*").eq("slug", citySlug).eq("tier", "city").maybeSingle();
  if (!loc) return null;

  const { data: ls } = await supabase
    .from("location_services").select("*")
    .eq("location_id", loc.id).eq("service_slug", serviceSlug).maybeSingle();
  // GATE: the combo only exists if a real local_intro was authored for it
  if (!ls || !ls.local_intro) return null;

  const [{ data: installs }, { data: crew }] = await Promise.all([
    supabase.from("floorpassports").select("*").eq("city", loc.city).order("install_date", { ascending: false }).limit(3),
    supabase.from("installers").select("*").eq("location_id", loc.id).eq("active", true),
  ]);
  if (!crew?.length) return null;

  return {
    city: loc.city, stateAbbr: loc.state_abbr, citySlug: loc.slug,
    serviceSlug, serviceTitle: titleForService(serviceSlug),
    localIntro: ls.local_intro,
    localConsiderations: ls.local_considerations ?? null,
    recentInstalls: (installs ?? []).map(toProject),
    crew: crew.map(toCrew),
  };
}

/* ---------- static params generators (build-time) ---------- */

export async function allStateSlugs(): Promise<string[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("locations").select("slug").eq("tier", "state");
    return (data ?? []).map((l: any) => l.slug);
  } catch { return []; }
}

export async function allCityServiceParams(): Promise<{ slug: string[] }[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("location_services")
      .select("service_slug, locations(slug)");
    return (data ?? []).map((r: any) => ({ slug: [...r.locations.slug.split("/"), r.service_slug] }));
  } catch { return []; }
}

/* ---------- mappers ---------- */

function toCrew(r: any): CrewMember {
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
    system: /hybrid|polyurea/i.test(r.system_name ?? "") ? "polyurea-hybrid" : /epoxy/i.test(r.system_name ?? "") ? "epoxy" : "polyaspartic",
    crewLeadName: r.crew_lead ?? "—", warrantyStatus: r.warranty_status ?? "active",
  };
}
function toReview(r: any): Review {
  return { id: r.id, rating: r.rating, body: r.body, themes: r.theme_tags ?? [], customerFirstName: "", city: "", projectId: r.project_id ?? undefined };
}
function titleForService(slug: string): string {
  return slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
}
