import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allLearnArticles } from "../../../data/learn-articles-2";
import { ArticlePage } from "../../templates/Templates";
import { faqLd, breadcrumbLd } from "../../../lib/schema-org";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://garagefloortoday.com";

export function generateStaticParams() {
  return allLearnArticles.map((a) => ({ slug: a.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = allLearnArticles.find((x) => x.slug === slug);
  if (!a) return {};
  return { title: a.meta.title, description: a.meta.description, alternates: { canonical: `/learn/${a.slug}` } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = allLearnArticles.find((x) => x.slug === slug);
  if (!a) return notFound();
  const articleLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: a.title, datePublished: a.updatedAt, dateModified: a.updatedAt,
    author: { "@type": "Organization", name: "GarageFloorToday" },
    publisher: { "@type": "Organization", name: "GarageFloorToday" },
    mainEntityOfPage: `${BASE}/learn/${a.slug}`,
  };
  const jsonLd = [articleLd, faqLd(a.faqs), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Learning Center", path: "/learn" }, { name: a.title, path: `/learn/${a.slug}` }])];
  return (<>
    {jsonLd.map((ld, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />)}
    <ArticlePage data={a} />
  </>);
}
