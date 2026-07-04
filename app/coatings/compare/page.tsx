import type { Metadata } from "next";
import { GlobalLayout } from "../../../components/layout/GlobalLayout";
import { faqLd } from "../../../lib/schema-org";

export const metadata: Metadata = {
  title: "Compare Coating Systems | Epoxy vs Polyaspartic vs Polyurea vs Hybrid",
  description:
    "An honest side-by-side of epoxy, polyaspartic, polyurea, and GFT hybrid systems — UV, cure, toughness, cost, and the surfaces each genuinely suits best.",
  alternates: { canonical: "/coatings/compare" },
};

/** Qualitative comparison only. Numeric durability ratings intentionally omitted
 *  until verified manufacturer spec sheets populate the materials table
 *  (Master Prompt content rules — no fabricated numbers).
 */
const ROWS: { attr: string; epoxy: string; poly: string; urea: string; hybrid: string }[] = [
  { attr: "UV stability", epoxy: "Poor (yellows)", poly: "Excellent", urea: "Good", hybrid: "Excellent" },
  { attr: "Cure / return to service", epoxy: "Slow (days)", poly: "Fast (about a day)", urea: "Fast", hybrid: "Fast" },
  { attr: "Impact & abrasion", epoxy: "Good", poly: "Very good", urea: "Excellent", hybrid: "Excellent" },
  { attr: "Flexibility (slab movement)", epoxy: "Rigid", poly: "Flexible", urea: "Very flexible", hybrid: "Very flexible" },
  { attr: "Build thickness per coat", epoxy: "High", poly: "Lower", urea: "Varies", hybrid: "High (layered)" },
  { attr: "Relative material cost", epoxy: "Lowest", poly: "Higher", urea: "Higher", hybrid: "Highest" },
  { attr: "Best suited to", epoxy: "Interior, budget, base coat", poly: "Residential, outdoor", urea: "Shops, industrial", hybrid: "Demanding, long-term" },
];

const FAQS = [
  { question: "Which system is best?", answer: "There isn't one universal best — that's the honest answer this whole table exists to give. The best system depends on your surface, climate, use, and budget. Match rows to your priorities, then read the system page for your leading candidate." },
  { question: "Why don't you show durability scores out of 10?", answer: "Because we won't publish numbers we can't source to verified manufacturer testing. Qualitative comparisons here are defensible; invented precision isn't. Scored comparisons will appear once verified spec data is in place." },
  { question: "What do most residential customers choose?", answer: "Polyaspartic or a hybrid, for UV stability and fast return to service — but a mild-climate interior project is sometimes well served by epoxy at lower cost, and we'll say so." },
];

export default function Page() {
  const systems = [
    { key: "epoxy", label: "Epoxy", href: "/coatings/epoxy" },
    { key: "poly", label: "Polyaspartic", href: "/coatings/polyaspartic" },
    { key: "urea", label: "Polyurea", href: "/coatings/polyurea" },
    { key: "hybrid", label: "GFT Hybrid", href: "/coatings/hybrid" },
  ] as const;

  return (
    <GlobalLayout ctaHeadline="Not sure which fits? Engineer your floor in 3 questions.">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(FAQS)) }} />

      <section className="px-6 pt-40 pb-12 bg-gradient-to-b from-gft-gray100 to-gft-cream">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gft-red mb-3 font-body">Compare Systems</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 font-display text-gft-black">
            Epoxy vs polyaspartic vs polyurea vs hybrid.
          </h1>
          <p className="text-lg text-gft-gray700 font-body max-w-2xl">
            The comparison written by a company that installs all four — so it can tell you when the cheaper one is the right one.
          </p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse min-w-[640px]">
            <thead>
              <tr>
                <th className="text-left p-4 text-xs font-semibold uppercase tracking-wide text-gft-gray500 font-body">Attribute</th>
                {systems.map((s) => (
                  <th key={s.key} className="text-left p-4 font-display text-gft-black">
                    <a href={s.href} className="no-underline hover:underline underline-offset-4 text-gft-black">{s.label}</a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.attr} className="border-t border-gft-gray100">
                  <td className="p-4 text-sm font-semibold font-body text-gft-black">{r.attr}</td>
                  <td className="p-4 text-sm font-body text-gft-gray700">{r.epoxy}</td>
                  <td className="p-4 text-sm font-body text-gft-gray700">{r.poly}</td>
                  <td className="p-4 text-sm font-body text-gft-gray700">{r.urea}</td>
                  <td className="p-4 text-sm font-body text-gft-gray700">{r.hybrid}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[11px] text-gft-gray500 font-body mt-4">
            Qualitative comparison. Numeric spec ratings pending verified manufacturer data.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 font-display text-gft-black">Comparison questions</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <details key={f.question} className="p-4 bg-gft-cream rounded-sm">
                <summary className="text-sm font-semibold cursor-pointer font-body text-gft-black">{f.question}</summary>
                <p className="text-sm mt-2 font-body text-gft-gray700">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </GlobalLayout>
  );
}
