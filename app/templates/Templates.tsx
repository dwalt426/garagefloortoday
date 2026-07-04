import React from "react";
import { color, font, radius } from "../../styles/tokens";
import { GlobalLayout } from "../../components/layout/GlobalLayout";
import { Button } from "../../components/buttons/Button";
import { FloorPassportCard } from "../../components/floorpassport/FloorPassportCard";
import { InstallationTimeline } from "../../components/timeline/InstallationTimeline";
import { timelineSteps } from "../../data/homepage";
import type { Project, PerformanceFactor } from "../../types";

/* ================= Service Page ================= */

export interface ServicePageData {
  title: string;               // "Commercial Flooring"
  heroCopy: string;
  relevantFactors: PerformanceFactor[]; // which Performance System factors matter most here
  bodySections: { heading: string; body: string }[];
  exampleProjects: Project[];
}

export function ServicePage({ data }: { data: ServicePageData }) {
  return (
    <GlobalLayout>
      <section className="px-6 pt-40 pb-16" style={{ background: `linear-gradient(180deg, ${color.gray100}, ${color.cream})` }}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold max-w-3xl mb-4" style={{ fontFamily: font.display, color: color.black }}>
            {data.title}
          </h1>
          <p className="text-lg max-w-2xl mb-8" style={{ fontFamily: font.body, color: color.gray700 }}>{data.heroCopy}</p>
          <Button variant="primary" href="/estimate">Get My Free Estimate</Button>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto space-y-10">
          {data.bodySections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: font.display, color: color.black }}>{s.heading}</h2>
              <p className="text-base" style={{ fontFamily: font.body, color: color.gray700 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16" style={{ backgroundColor: color.white }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: font.display, color: color.black }}>How every project runs</h2>
          <InstallationTimeline steps={timelineSteps} />
        </div>
      </section>
    </GlobalLayout>
  );
}

/* ================= Learning Center Article ================= */

export interface ArticleData {
  title: string;
  updatedAt: string;
  readingMinutes: number;
  /** Ordered content blocks — CMS-friendly, no rich-text blob */
  blocks: ({ type: "paragraph"; text: string } | { type: "heading"; text: string } | { type: "callout"; text: string })[];
  relatedLinks: { label: string; href: string }[];
  relatedServices?: { label: string; href: string }[];
}

export function ArticlePage({ data }: { data: ArticleData }) {
  return (
    <GlobalLayout ctaHeadline="Questions about your own floor? Ask a certified installer.">
      <article className="px-6 pt-40 pb-16">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase mb-3" style={{ fontFamily: font.body, color: color.red, letterSpacing: "0.14em" }}>
            Learning Center
          </p>
          <h1 className="text-4xl font-extrabold mb-3" style={{ fontFamily: font.display, color: color.black }}>{data.title}</h1>
          <p className="text-xs mb-10" style={{ fontFamily: font.body, color: color.gray500 }}>
            Updated {data.updatedAt} · {data.readingMinutes} min read
          </p>
          <div className="space-y-6">
            {data.blocks.map((b, i) =>
              b.type === "heading" ? (
                <h2 key={i} className="text-2xl font-bold pt-4" style={{ fontFamily: font.display, color: color.black }}>{b.text}</h2>
              ) : b.type === "callout" ? (
                <div key={i} className="p-5 text-sm" style={{ fontFamily: font.body, backgroundColor: color.white, borderLeft: `3px solid ${color.red}`, borderRadius: radius.sm, color: color.gray700 }}>
                  {b.text}
                </div>
              ) : (
                <p key={i} className="text-base leading-relaxed" style={{ fontFamily: font.body, color: color.gray700 }}>{b.text}</p>
              )
            )}
          </div>
          <div className="mt-12 pt-8" style={{ borderTop: `1px solid ${color.gray300}` }}>
            <p className="text-xs font-semibold uppercase mb-4" style={{ fontFamily: font.body, color: color.gray500, letterSpacing: "0.12em" }}>
              Keep reading
            </p>
            <ul className="space-y-2 list-none m-0 p-0">
              {data.relatedLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm font-semibold no-underline hover:underline underline-offset-4" style={{ fontFamily: font.body, color: color.red }}>
                    {l.label} →
                  </a>
                </li>
              ))}
            </ul>
            {data.relatedServices && data.relatedServices.length > 0 && (
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase mb-4" style={{ fontFamily: font.body, color: color.gray500, letterSpacing: "0.12em" }}>Related services</p>
                <ul className="space-y-2 list-none m-0 p-0">
                  {data.relatedServices.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="text-sm font-semibold no-underline hover:underline underline-offset-4" style={{ fontFamily: font.body, color: color.red }}>{l.label} →</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </article>
    </GlobalLayout>
  );
}

/* ================= FloorPassport Lookup Page ================= */

export interface FloorPassportPageData {
  project: Project | null; // null = not found / empty state
  searchedId?: string;
}

export function FloorPassportPage({ data }: { data: FloorPassportPageData }) {
  return (
    <GlobalLayout showCtaBand={false}>
      <section className="px-6 pt-40 pb-24">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-3" style={{ fontFamily: font.display, color: color.black }}>
            FloorPassport™ Lookup
          </h1>
          <p className="text-base mb-10" style={{ fontFamily: font.body, color: color.gray700 }}>
            Enter a GFT Project ID™ to view a floor's complete installation record.
          </p>
          <form className="flex gap-3 max-w-md mx-auto mb-12" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              defaultValue={data.searchedId}
              placeholder="GFT-2026-08114"
              aria-label="GFT Project ID"
              className="flex-1 px-4 py-3 text-sm outline-none tabular-nums"
              style={{ fontFamily: font.body, border: `1px solid ${color.gray300}`, borderRadius: radius.sm }}
            />
            <Button variant="primary">Look Up Floor</Button>
          </form>

          {data.project ? (
            <div className="text-left">
              <FloorPassportCard project={data.project} />
            </div>
          ) : data.searchedId ? (
            <p className="text-sm" style={{ fontFamily: font.body, color: color.gray700 }}>
              No record found for <span className="tabular-nums font-semibold">{data.searchedId}</span>.
              Check the ID on your certificate or yard sign, or call your local GFT team.
            </p>
          ) : null}
        </div>
      </section>
    </GlobalLayout>
  );
}
