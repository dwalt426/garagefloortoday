import React from "react";
import { color, font, radius } from "../../styles/tokens";
import { GlobalLayout } from "../../components/layout/GlobalLayout";
import { Button } from "../../components/buttons/Button";

/** Every core brand page is data + this template. One layout, zero duplication.
 *  In the Next.js port, `meta` maps to generateMetadata() and `structuredData`
 *  renders as a JSON-LD <script> in the page head.
 */
export interface BrandPageContent {
  slug: string;
  meta: {
    title: string;          // unique SEO title
    description: string;    // meta description
    canonical: string;
  };
  eyebrow: string;
  h1: string;
  intro: string;
  sections: BrandSection[];
  faqs?: { question: string; answer: string }[];
  relatedLinks: { label: string; href: string }[];
  primaryCta: { label: string; href: string };
  structuredDataType: "AboutPage" | "WebPage" | "Service" | "FAQPage";
  /** Claims requiring verification before publish (Master Prompt content rules) */
  verificationFlags?: string[];
}

export interface BrandSection {
  heading: string;
  body: string;
  /** optional checklist rendered as the Standard-style numbered list */
  checklist?: { label: string; detail: string }[];
}

export function BrandPage({ content }: { content: BrandPageContent }) {
  return (
    <GlobalLayout>
      {/* Hero */}
      <section className="px-6 pt-40 pb-16" style={{ background: `linear-gradient(180deg, ${color.gray100}, ${color.cream})` }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase mb-3" style={{ fontFamily: font.body, color: color.red, letterSpacing: "0.14em" }}>
            {content.eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5" style={{ fontFamily: font.display, color: color.black }}>
            {content.h1}
          </h1>
          <p className="text-lg mb-8" style={{ fontFamily: font.body, color: color.gray700 }}>
            {content.intro}
          </p>
          <Button variant="primary" href={content.primaryCta.href}>{content.primaryCta.label}</Button>
        </div>
      </section>

      {/* Sections */}
      <div className="px-6 py-16">
        <div className="max-w-3xl mx-auto space-y-14">
          {content.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: font.display, color: color.black }}>
                {s.heading}
              </h2>
              <p className="text-base leading-relaxed" style={{ fontFamily: font.body, color: color.gray700 }}>
                {s.body}
              </p>
              {s.checklist && (
                <div className="grid gap-3 mt-6">
                  {s.checklist.map((item, i) => (
                    <div key={item.label} className="flex gap-4 p-5" style={{ backgroundColor: color.white, borderRadius: radius.lg }}>
                      <span className="text-sm font-bold tabular-nums" style={{ fontFamily: font.display, color: color.red }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div style={{ fontFamily: font.body }}>
                        <p className="text-sm font-semibold mb-1" style={{ color: color.black }}>{item.label}</p>
                        <p className="text-xs" style={{ color: color.gray500 }}>{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>

      {/* FAQs */}
      {content.faqs && content.faqs.length > 0 && (
        <section className="px-6 py-16" style={{ backgroundColor: color.white }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: font.display, color: color.black }}>
              Common questions
            </h2>
            <div className="space-y-4">
              {content.faqs.map((f) => (
                <details key={f.question} className="p-4" style={{ backgroundColor: color.cream, borderRadius: radius.sm }}>
                  <summary className="text-sm font-semibold cursor-pointer" style={{ fontFamily: font.body, color: color.black }}>
                    {f.question}
                  </summary>
                  <p className="text-sm mt-2" style={{ fontFamily: font.body, color: color.gray700 }}>{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related links */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase mb-4" style={{ fontFamily: font.body, color: color.gray500, letterSpacing: "0.12em" }}>
            Keep exploring
          </p>
          <ul className="space-y-2 list-none m-0 p-0">
            {content.relatedLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm font-semibold no-underline hover:underline underline-offset-4" style={{ fontFamily: font.body, color: color.red }}>
                  {l.label} →
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </GlobalLayout>
  );
}
