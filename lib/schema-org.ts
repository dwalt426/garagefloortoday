/** JSON-LD builders. Rendered as <script type="application/ld+json"> in page
 *  <head> via a <Script> tag or dangerouslySetInnerHTML in a Server Component.
 */
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://garagefloortoday.com";

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GarageFloorToday",
  url: BASE,
  logo: `${BASE}/logos/gft-seal.png`,
  slogan: "Beautiful Garage Floors. Built to Perform for Decades.",
});

export const serviceLd = (name: string, description: string, slug: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name, description,
  provider: { "@type": "Organization", name: "GarageFloorToday" },
  url: `${BASE}/services/${slug}`,
});

export const faqLd = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question", name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});

export const localBusinessLd = (city: string, state: string, rating?: { value: number; count: number }) => ({
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: `GarageFloorToday of ${city}`,
  areaServed: `${city}, ${state}`,
  ...(rating && { aggregateRating: { "@type": "AggregateRating", ratingValue: rating.value, reviewCount: rating.count } }),
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem", position: i + 1, name: it.name, item: `${BASE}${it.path}`,
  })),
});
