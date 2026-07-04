import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allServicePages } from "../../../data/service-pages-2";
import { ServiceLandingPage } from "../../templates/ServiceLandingPage";
import { serviceLd, faqLd, breadcrumbLd } from "../../../lib/schema-org";

/** /services/[slug] — 11 statically generated service landing pages. */

export function generateStaticParams() {
  return allServicePages.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const page = allServicePages.find((p) => p.slug === slug);
  if (!page) return {};
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: page.meta.canonical },
    openGraph: { title: page.meta.title, description: page.meta.description },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = allServicePages.find((p) => p.slug === slug);
  if (!page) notFound();

  const jsonLd = [
    serviceLd(page.h1, page.meta.description, page.slug),
    faqLd(page.faqs),
    breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services/garage-floor-coatings" },
      { name: page.eyebrow, path: `/services/${page.slug}` },
    ]),
  ];

  return (
    <>
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <ServiceLandingPage content={page} />
    </>
  );
}
