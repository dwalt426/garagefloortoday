import React from "react";
import { MapPin } from "lucide-react";
import { color, font, radius } from "../../styles/tokens";
import { GlobalLayout } from "../../components/layout/GlobalLayout";
import { CrewCard, ReviewCard } from "../../components/cards/Cards";
import { Button } from "../../components/buttons/Button";
import type { CrewMember, Review, Project } from "../../types";

/** The publishing gate (Brand Bible §6) enforced by the type system:
 *  crew, localFaqs, and recentInstalls are REQUIRED, non-empty by contract.
 *  A CMS integration cannot render this template without supplying them —
 *  the thin-template failure mode is structurally impossible.
 */
export interface LocationPageData {
  city: string;
  state: string;
  stateAbbr: string;
  /** Written for THIS metro — climate, soil, freeze-thaw, humidity. Never boilerplate. */
  climateNarrative: string;
  crew: [CrewMember, ...CrewMember[]];            // at least one, enforced
  localFaqs: [LocalFaq, ...LocalFaq[]];           // at least one, enforced
  recentInstalls: [Project, ...Project[]];        // at least one, enforced
  localReviews: Review[];
  floorsInstalledCount: number;
  /** Sprint 5 additions — optional so the base template still type-checks */
  nearby?: { city: string; slug: string; km: number }[];
  neighborhoods?: string[];
  permitNote?: string | null;
}

export interface LocalFaq {
  question: string;
  answer: string;
}

export function LocationPage({ data }: { data: LocationPageData }) {
  return (
    <GlobalLayout ctaHeadline={`Ready for a ${data.city} floor built to The Standard?`}>
      {/* Local hero */}
      <section className="px-6 pt-40 pb-16" style={{ background: `linear-gradient(180deg, ${color.gray100}, ${color.cream})` }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase mb-3 flex items-center gap-2" style={{ fontFamily: font.body, color: color.red, letterSpacing: "0.14em" }}>
            <MapPin size={14} aria-hidden /> {data.city}, {data.stateAbbr}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl mb-4" style={{ fontFamily: font.display, color: color.black }}>
            Garage Floor Coatings in {data.city}
          </h1>
          <p className="text-lg max-w-2xl mb-8" style={{ fontFamily: font.body, color: color.gray700 }}>
            {data.climateNarrative}
          </p>
          <Button variant="primary" href="/estimate">Get My Free Estimate</Button>
        </div>
      </section>

      {/* Local stats + recent installs */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-5xl font-bold tabular-nums" style={{ fontFamily: font.display, color: color.black }}>
              {data.floorsInstalledCount.toLocaleString()}
            </p>
            <p className="text-sm mb-8" style={{ fontFamily: font.body, color: color.gray500 }}>
              floors installed in the {data.city} area
            </p>
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: font.display, color: color.black }}>
              Recent installs near you
            </h2>
            <div className="space-y-3">
              {data.recentInstalls.map((p) => (
                <div key={p.gftProjectId} className="flex items-center justify-between p-4" style={{ backgroundColor: color.white, borderRadius: radius.lg }}>
                  <div style={{ fontFamily: font.body }}>
                    <p className="text-sm font-semibold tabular-nums" style={{ color: color.black }}>{p.gftProjectId}</p>
                    <p className="text-xs" style={{ color: color.gray500 }}>{p.finishName} · {p.crewLeadName}</p>
                  </div>
                  <span className="text-xs font-semibold" style={{ fontFamily: font.body, color: color.success }}>Installed</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: font.display, color: color.black }}>
              Your {data.city} crew
            </h2>
            <div className="grid gap-6">
              {data.crew.map((m) => <CrewCard key={m.id} member={m} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Local FAQs */}
      <section className="px-6 py-16" style={{ backgroundColor: color.white }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: font.display, color: color.black }}>
            {data.city} homeowner questions
          </h2>
          <div className="space-y-6">
            {data.localFaqs.map((faq) => (
              <details key={faq.question} className="group">
                <summary className="text-sm font-semibold cursor-pointer list-none" style={{ fontFamily: font.body, color: color.black }}>
                  {faq.question}
                </summary>
                <p className="text-sm mt-2" style={{ fontFamily: font.body, color: color.gray700 }}>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Local reviews */}
      {data.localReviews.length > 0 && (
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: font.display, color: color.black }}>
              From {data.city} homeowners
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.localReviews.map((r) => <ReviewCard key={r.id} review={r} />)}
            </div>
          </div>
        </section>
      )}

      {/* Neighborhoods + permit note */}
      {(data.neighborhoods?.length || data.permitNote) && (
        <section className="px-6 py-16" style={{ backgroundColor: color.white }}>
          <div className="max-w-3xl mx-auto">
            {data.neighborhoods && data.neighborhoods.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: font.display, color: color.black }}>
                  {data.city} neighborhoods we serve
                </h2>
                <p className="text-sm" style={{ fontFamily: font.body, color: color.gray700 }}>
                  {data.neighborhoods.join(" · ")}
                </p>
              </div>
            )}
            {data.permitNote && (
              <div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: font.display, color: color.black }}>
                  Local permit note
                </h3>
                <p className="text-sm" style={{ fontFamily: font.body, color: color.gray700 }}>{data.permitNote}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Nearby cities — internal linking between markets */}
      {data.nearby && data.nearby.length > 0 && (
        <section className="px-6 py-16">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase mb-4" style={{ fontFamily: font.body, color: color.gray500, letterSpacing: "0.12em" }}>
              Nearby cities we serve
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none m-0 p-0">
              {data.nearby.map((n) => (
                <li key={n.slug}>
                  <a href={`/locations/${n.slug}`} className="text-sm font-semibold no-underline hover:underline underline-offset-4" style={{ fontFamily: font.body, color: color.red }}>
                    {n.city} <span style={{ color: color.gray500, fontWeight: 400 }}>({n.km} km)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </GlobalLayout>
  );
}
