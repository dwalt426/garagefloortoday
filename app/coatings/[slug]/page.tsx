import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allSystemPages } from "../../../data/system-pages";
import { BrandPage } from "../../templates/BrandPage";
import { serviceLd, faqLd, breadcrumbLd } from "../../../lib/schema-org";

export function generateStaticParams() {
  return allSystemPages.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = allSystemPages.find((p) => p.slug === slug);
  if (!page) return {};
  return { title: page.meta.title, description: page.meta.description, alternates: { canonical: page.meta.canonical } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = allSystemPages.find((p) => p.slug === slug);
  if (!page) return notFound();
  const jsonLd = [
    serviceLd(page.h1, page.meta.description, page.slug),
    ...(page.faqs?.length ? [faqLd(page.faqs)] : []),
    breadcrumbLd([{ name: "Home", path: "/" }, { name: "Coatings", path: "/coatings/compare" }, { name: page.eyebrow, path: `/coatings/${page.slug}` }]),
  ];
  return (<>
    {jsonLd.map((ld, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />)}
    <BrandPage content={page} />
  </>);
}
