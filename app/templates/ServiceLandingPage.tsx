import React from "react";
import { color, font, radius } from "../../styles/tokens";
import { GlobalLayout } from "../../components/layout/GlobalLayout";
import { Button } from "../../components/buttons/Button";

/** Phase 4 — Service landing pages. Each page is a standalone SEO/CRO asset.
 *  Every section is typed and required unless marked optional, so no service
 *  page can ship as a thin copy of another (same governance philosophy as
 *  the LocationPage publishing gate).
 */
export interface ServiceLandingContent {
  slug: string;
  meta: { title: string; description: string; canonical: string };
  eyebrow: string;
  h1: string;
  valueProp: string;
  heroPhotoNote: string; // The Lens direction for the photographer

  /** Why this surface is different — environmental engineering factors */
  surfaceFactors: { factor: string; explanation: string }[];

  /** Recommended system with the reasoning, not just the name */
  recommendation: {
    headline: string;   // "For residential garages in freeze-thaw climates…"
    body: string;
    typicalSystem: string;
  };

  /** What ArmorPrep™ means for THIS application */
  armorPrepScope: string;

  /** The Application Standard — this service's own checklist */
  applicationStandard: { requirement: string; note: string }[];

  commonProblems: { problem: string; cause: string; howGftAddresses: string }[];

  /** Educational comparison — this surface's alternative */
  comparison: { title: string; body: string };

  maintenance: string;

  faqs: { question: string; answer: string }[];

  relatedArticles: { label: string; href: string }[];
  relatedServices: { label: string; href: string }[];
}

export function ServiceLandingPage({ content }: { content: ServiceLandingContent }) {
  return (
    <GlobalLayout ctaHeadline="Find a certified GarageFloorToday installer near you.">
      {/* Hero */}
      <section className="px-6 pt-40 pb-16" style={{ background: `linear-gradient(180deg, ${color.gray100}, ${color.cream})` }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase mb-3" style={{ fontFamily: font.body, color: color.red, letterSpacing: "0.14em" }}>
            {content.eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5" style={{ fontFamily: font.display, color: color.black }}>
            {content.h1}
          </h1>
          <p className="text-lg mb-8" style={{ fontFamily: font.body, color: color.gray700 }}>{content.valueProp}</p>
          <Button variant="primary" href="/locations">Find My Certified Installer</Button>
          {/* Photography placeholder per The Lens */}
          <p className="text-[11px] mt-4" style={{ fontFamily: font.body, color: color.gray500 }}>
            [PHOTO — The Lens: {content.heroPhotoNote}]
          </p>
        </div>
      </section>

      {/* Why this surface is different */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: font.display, color: color.black }}>
            Why this surface is different
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {content.surfaceFactors.map((f) => (
              <div key={f.factor} className="p-5" style={{ backgroundColor: color.white, borderRadius: radius.lg }}>
                <p className="text-sm font-semibold mb-1" style={{ fontFamily: font.body, color: color.black }}>{f.factor}</p>
                <p className="text-xs" style={{ fontFamily: font.body, color: color.gray500 }}>{f.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended system */}
      <section className="px-6 py-16" style={{ backgroundColor: color.black }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase mb-3" style={{ fontFamily: font.body, color: color.gray500, letterSpacing: "0.14em" }}>
            GFT Performance System™ recommendation
          </p>
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: font.display, color: color.cream }}>
            {content.recommendation.headline}
          </h2>
          <p className="text-base mb-4" style={{ fontFamily: font.body, color: color.gray500 }}>
            {content.recommendation.body}
          </p>
          <p className="text-sm font-semibold" style={{ fontFamily: font.body, color: color.cream }}>
            Typical system: {content.recommendation.typicalSystem}
          </p>
        </div>
      </section>

      {/* ArmorPrep scope + Application Standard */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: font.display, color: color.black }}>
            ArmorPrep™ for this application
          </h2>
          <p className="text-base mb-10" style={{ fontFamily: font.body, color: color.gray700 }}>{content.armorPrepScope}</p>

          <h3 className="text-xl font-bold mb-4" style={{ fontFamily: font.display, color: color.black }}>
            The {content.eyebrow} Standard
          </h3>
          <div className="grid gap-3">
            {content.applicationStandard.map((s, i) => (
              <div key={s.requirement} className="flex gap-4 p-5" style={{ backgroundColor: color.white, borderRadius: radius.lg }}>
                <span className="text-sm font-bold tabular-nums" style={{ fontFamily: font.display, color: color.red }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div style={{ fontFamily: font.body }}>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: color.black }}>{s.requirement}</p>
                  <p className="text-xs" style={{ color: color.gray500 }}>{s.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common problems */}
      <section className="px-6 py-16" style={{ backgroundColor: color.white }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: font.display, color: color.black }}>
            Problems we're asked to solve
          </h2>
          <div className="space-y-4">
            {content.commonProblems.map((p) => (
              <div key={p.problem} className="p-5" style={{ backgroundColor: color.cream, borderRadius: radius.lg }}>
                <p className="text-sm font-semibold mb-1" style={{ fontFamily: font.body, color: color.black }}>{p.problem}</p>
                <p className="text-xs mb-2" style={{ fontFamily: font.body, color: color.gray500 }}>Cause: {p.cause}</p>
                <p className="text-xs" style={{ fontFamily: font.body, color: color.gray700 }}>{p.howGftAddresses}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: font.display, color: color.black }}>
            {content.comparison.title}
          </h2>
          <p className="text-base" style={{ fontFamily: font.body, color: color.gray700 }}>{content.comparison.body}</p>
        </div>
      </section>

      {/* Maintenance */}
      <section className="px-6 py-16" style={{ backgroundColor: color.white }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: font.display, color: color.black }}>
            Maintaining this surface
          </h2>
          <p className="text-base" style={{ fontFamily: font.body, color: color.gray700 }}>{content.maintenance}</p>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: font.display, color: color.black }}>
            {content.eyebrow} questions
          </h2>
          <div className="space-y-4">
            {content.faqs.map((f) => (
              <details key={f.question} className="p-4" style={{ backgroundColor: color.white, borderRadius: radius.sm }}>
                <summary className="text-sm font-semibold cursor-pointer" style={{ fontFamily: font.body, color: color.black }}>{f.question}</summary>
                <p className="text-sm mt-2" style={{ fontFamily: font.body, color: color.gray700 }}>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related content */}
      <section className="px-6 py-16" style={{ backgroundColor: color.white }}>
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-10">
          <div>
            <p className="text-xs font-semibold uppercase mb-4" style={{ fontFamily: font.body, color: color.gray500, letterSpacing: "0.12em" }}>From the Learning Center</p>
            <ul className="space-y-2 list-none m-0 p-0">
              {content.relatedArticles.map((l) => (
                <li key={l.href}><a href={l.href} className="text-sm font-semibold no-underline hover:underline underline-offset-4" style={{ fontFamily: font.body, color: color.red }}>{l.label} →</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase mb-4" style={{ fontFamily: font.body, color: color.gray500, letterSpacing: "0.12em" }}>Related services</p>
            <ul className="space-y-2 list-none m-0 p-0">
              {content.relatedServices.map((l) => (
                <li key={l.href}><a href={l.href} className="text-sm font-semibold no-underline hover:underline underline-offset-4" style={{ fontFamily: font.body, color: color.red }}>{l.label} →</a></li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </GlobalLayout>
  );
}
