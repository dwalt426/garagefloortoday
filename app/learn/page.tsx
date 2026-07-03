import type { Metadata } from "next";
import { GlobalLayout } from "../../components/layout/GlobalLayout";
import { allLearnArticles } from "../../data/learn-articles-2";

export const metadata: Metadata = {
  title: "Learning Center | The Garage Floor Coating Reference",
  description:
    "The industry's honest reference on garage floor coatings — chemistry, preparation, moisture, failures, cost, warranties, and maintenance. No sales pitch, just how floors actually work.",
  alternates: { canonical: "/learn" },
};

/** Grouped index. Groups are editorial; every article appears once. */
const GROUPS: { title: string; slugs: string[] }[] = [
  { title: "Start here", slugs: ["garage-floor-coatings", "buyers-guide", "cost-guide"] },
  { title: "How floors are built", slugs: ["concrete-preparation", "armorprep-guide", "moisture-testing", "concrete-repair"] },
  { title: "Choosing a system", slugs: ["polyaspartic-vs-epoxy", "polyurea-guide", "color-selection"] },
  { title: "Trust & ownership", slugs: ["floorpassport-guide", "warranty-guide", "garage-floor-maintenance"] },
  { title: "When things go wrong", slugs: ["failure-guide", "hot-tire-pickup"] },
  { title: "For businesses", slugs: ["commercial-flooring"] },
];

export default function Page() {
  const bySlug = Object.fromEntries(allLearnArticles.map((a) => [a.slug, a]));
  return (
    <GlobalLayout ctaHeadline="Read enough? Get your honest estimate.">
      <section className="px-6 pt-40 pb-12 bg-gradient-to-b from-gft-gray100 to-gft-cream">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gft-red mb-3 font-body">Learning Center</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 font-display text-gft-black">
            The garage floor coating reference.
          </h1>
          <p className="text-lg text-gft-gray700 font-body max-w-2xl">
            Written to be the most useful, most honest source in the category — including where a cheaper option or a competitor's approach is genuinely the right call.
          </p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <h2 className="text-xl font-bold mb-5 font-display text-gft-black">{g.title}</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {g.slugs.map((slug) => {
                  const a = bySlug[slug];
                  if (!a) return null;
                  return (
                    <a
                      key={slug}
                      href={`/learn/${slug}`}
                      className="block p-5 bg-white rounded-lg border border-gft-gray100 no-underline hover:border-gft-gray300 transition-colors"
                    >
                      <p className="text-sm font-semibold mb-1 font-body text-gft-black">{a.title}</p>
                      <p className="text-xs mb-2 font-body text-gft-gray500">{a.readingMinutes} min read</p>
                      <p className="text-xs font-body text-gft-gray700">{a.meta.description}</p>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </GlobalLayout>
  );
}
