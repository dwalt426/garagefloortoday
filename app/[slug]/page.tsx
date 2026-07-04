import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allBrandPages } from "../../data/brand-pages-2";
import { BrandPage } from "../templates/BrandPage";
import { faqLd, breadcrumbLd } from "../../lib/schema-org";

/** /about, /why-gft, /standard, /armorprep, /performance-system,
 *  /floorpassport, /warranty, /financing, /contact, /careers
 *  — ten static pages from one route, statically generated at build.
 */

export function generateStaticParams() {
  return allBrandPages.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const page = allBrandPages.find((p) => p.slug === slug);
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
  const page = allBrandPages.find((p) => p.slug === slug);
  if (!page) notFound();

  const jsonLd = [
    breadcrumbLd([{ name: "Home", path: "/" }, { name: page.h1, path: `/${page.slug}` }]),
    ...(page.faqs?.length ? [faqLd(page.faqs)] : []),
  ];

  return (
    <>
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <BrandPage content={page} />
    </>
  );
}
