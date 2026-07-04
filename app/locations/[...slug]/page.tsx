import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStatePageData, getCityServiceData } from "../../../lib/queries-locations";
import { getCityPageData } from "../../../lib/queries-locations";
import { StatePage } from "../../templates/StatePage";
import { CityServicePage } from "../../templates/CityServicePage";
import { LocationPage } from "../../templates/LocationPage";
import { localBusinessLd, breadcrumbLd } from "../../../lib/schema-org";

/** Unified location router, dispatched by segment depth:
 *   1 seg  → /locations/[state]              → StatePage
 *   2 segs → /locations/[state]/[city]       → LocationPage (+ nearby, neighborhoods)
 *   3 segs → /locations/[state]/[city]/[svc] → CityServicePage
 *  Every tier is DB-gated: missing local substance → notFound(). ISR keeps fresh.
 */
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug.length === 1) {
    const s = await getStatePageData(slug[0]);
    if (!s) return {};
    return { title: `Garage Floor Coatings in ${s.state} | GarageFloorToday`,
      description: `Premium concrete coatings across ${s.state} — local certified crews, documented ArmorPrep™, and FloorPassport™ records.`,
      alternates: { canonical: `/locations/${s.slug}` } };
  }
  if (slug.length === 2) {
    const c = await getCityPageData(slug.join("/"));
    if (!c) return {};
    return { title: `Garage Floor Coatings in ${c.city}, ${c.stateAbbr} | GarageFloorToday`,
      description: `Premium coatings in ${c.city} — documented prep, local crews, FloorPassport™ records on every install.`,
      alternates: { canonical: `/locations/${slug.join("/")}` } };
  }
  if (slug.length === 3) {
    const cs = await getCityServiceData(slug.slice(0, 2).join("/"), slug[2]);
    if (!cs) return {};
    return { title: `${cs.serviceTitle} in ${cs.city}, ${cs.stateAbbr} | GarageFloorToday`,
      description: cs.localIntro.slice(0, 155),
      alternates: { canonical: `/locations/${slug.join("/")}` } };
  }
  return {};
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;

  if (slug.length === 1) {
    const data = await getStatePageData(slug[0]);
    if (!data) return notFound();
    return (<>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
        breadcrumbLd([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }, { name: data.state, path: `/locations/${data.slug}` }])) }} />
      <StatePage data={data} />
    </>);
  }

  if (slug.length === 2) {
    const data = await getCityPageData(slug.join("/"));
    if (!data) return notFound();
    const jsonLd = [
      localBusinessLd(data.city, data.stateAbbr),
      breadcrumbLd([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }, { name: `${data.city}, ${data.stateAbbr}`, path: `/locations/${slug.join("/")}` }]),
    ];
    return (<>
      {jsonLd.map((ld, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />)}
      <LocationPage data={data} />
    </>);
  }

  if (slug.length === 3) {
    const data = await getCityServiceData(slug.slice(0, 2).join("/"), slug[2]);
    if (!data) return notFound();
    const jsonLd = [
      localBusinessLd(data.city, data.stateAbbr),
      breadcrumbLd([
        { name: "Home", path: "/" }, { name: "Locations", path: "/locations" },
        { name: `${data.city}, ${data.stateAbbr}`, path: `/locations/${slug.slice(0,2).join("/")}` },
        { name: data.serviceTitle, path: `/locations/${slug.join("/")}` },
      ]),
    ];
    return (<>
      {jsonLd.map((ld, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />)}
      <CityServicePage data={data} />
    </>);
  }

  notFound();
}
