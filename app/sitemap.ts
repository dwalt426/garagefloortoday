import type { MetadataRoute } from "next";
import { allBrandPages } from "../data/brand-pages-2";
import { allServicePages } from "../data/service-pages-2";
import { allSystemPages } from "../data/system-pages";
import { allLearnArticles } from "../data/learn-articles-2";
import { createClient } from "../lib/supabase-server";
import { allStateSlugs, allCityServiceParams } from "../lib/queries-locations";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://garagefloortoday.com";

/** Auto-generated sitemap. Static routes from content registries; location
 *  routes pulled live from Supabase so new franchise markets self-index.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "", "/about", "/why-gft", "/standard", "/armorprep", "/performance-system",
    "/floorpassport", "/warranty", "/financing", "/contact", "/careers",
    "/estimate", "/lookup", "/gallery", "/learn", "/coatings/compare", "/design-system",
    "/tools/cost-calculator", "/tools/financing", "/tools/engineer-my-floor",
    "/tools/visualizer",
  ].map((path) => ({ url: `${BASE}${path}`, lastModified: new Date(), priority: path === "" ? 1 : 0.7 }));

  const brand = allBrandPages.map((p) => ({ url: `${BASE}/${p.slug}`, lastModified: new Date(), priority: 0.7 }));
  const services = allServicePages.map((p) => ({ url: `${BASE}/services/${p.slug}`, lastModified: new Date(), priority: 0.8 }));
  const systems = allSystemPages.map((p) => ({ url: `${BASE}/coatings/${p.slug}`, lastModified: new Date(), priority: 0.8 }));
  const learn = allLearnArticles.map((a) => ({ url: `${BASE}/learn/${a.slug}`, lastModified: new Date(), priority: 0.6 }));

  // Live location pages — only those that pass the publishing gate exist as rows
  let locations: MetadataRoute.Sitemap = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("locations").select("slug");
    locations = (data ?? []).map((l) => ({ url: `${BASE}/locations/${l.slug}`, lastModified: new Date(), priority: 0.6 }));
    const states = await allStateSlugs();
    locations.push(...states.map((sl) => ({ url: `${BASE}/locations/${sl}`, lastModified: new Date(), priority: 0.6 })));
    const combos = await allCityServiceParams();
    locations.push(...combos.map((c) => ({ url: `${BASE}/locations/${c.slug.join("/")}`, lastModified: new Date(), priority: 0.5 })));
  } catch { /* build-time without DB: skip location routes */ }

  return [...staticRoutes, ...brand, ...services, ...systems, ...learn, ...locations];
}
