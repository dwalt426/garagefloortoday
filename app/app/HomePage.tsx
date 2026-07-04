import React from "react";
import { color, font, radius, gradient } from "../styles/tokens";
import { StickyHeader, Footer } from "../components/navigation/Navigation";
import { Button } from "../components/buttons/Button";
import { CinematicHero } from "../components/hero/CinematicHero";
import { Reveal, Stagger, CountUp } from "../components/motion/Motion";
import { ServiceCard, CrewCard, ReviewCard } from "../components/cards/Cards";
import { FloorPassportCard } from "../components/floorpassport/FloorPassportCard";
import { InstallationTimeline } from "../components/timeline/InstallationTimeline";
import { BeforeAfter } from "../features/visualizer/BeforeAfter";
import { QuickEstimateForm } from "../features/estimator/QuickEstimateForm";
import {
  hero, trustSignals, standardItems, timelineSteps, services,
  performanceFactors, recentProjects, featuredCrew, reviews, navColumns,
  nationalStats, statesServed,
} from "../data/homepage";

/** Section wrapper enforcing Phase 5 spacing rhythm */
function Section({ children, dark = false, label, title }: {
  children: React.ReactNode; dark?: boolean; label?: string; title?: string;
}) {
  return (
    <section
      className={`px-6 py-28 relative ${dark ? "gft-grain" : ""}`}
      style={dark ? { background: gradient.blackDepth } : { background: gradient.creamLight }}
    >
      <div className="max-w-6xl mx-auto relative">
        {label && (
          <Reveal>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8" style={{ background: dark ? color.gold : color.red }} />
              <p className="text-xs font-semibold uppercase" style={{ fontFamily: font.body, color: dark ? color.gold : color.red, letterSpacing: "0.16em" }}>
                {label}
              </p>
            </div>
          </Reveal>
        )}
        {title && (
          <Reveal delay={80}>
            <h2 className="text-3xl md:text-5xl font-bold mb-12 max-w-2xl" style={{ fontFamily: font.display, color: dark ? color.cream : color.black, letterSpacing: "-0.015em", lineHeight: 1.05 }}>
              {title}
            </h2>
          </Reveal>
        )}
        <Reveal delay={160}>{children}</Reveal>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div style={{ backgroundColor: color.cream }}>
      <StickyHeader columns={navColumns} phone="(800) 555-0143" />

      {/* 1 · Hero — cinematic, full-bleed photography (Sprint 11) */}
      <CinematicHero
        h1={hero.h1}
        subhead={hero.subhead}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
        microTrust={hero.microTrust}
      />

      {/* 2 · Trust / stat bar — count-up on scroll, gold-ruled */}
      <div className="px-6 py-10 relative gft-grain" style={{ background: gradient.blackDepth }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
            {nationalStats.map((s, i) => (
              <Reveal key={s.id} delay={i * 80}>
                <div className="text-center md:border-r md:last:border-r-0" style={{ borderColor: "rgba(176,141,79,0.22)" }}>
                  <p className="text-3xl md:text-4xl font-extrabold mb-1" style={{ fontFamily: font.display, color: color.cream }}>
                    <CountUp to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-[11px] uppercase" style={{ fontFamily: font.body, color: color.gold, letterSpacing: "0.12em" }}>{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="gft-gold-rule mt-10" />
          <div className="flex flex-wrap gap-x-8 gap-y-2 justify-center mt-6">
            {trustSignals.map(({ id, icon: Icon, label }) => (
              <div key={id} className="flex items-center gap-2">
                <Icon size={16} strokeWidth={1.5} color={color.gold} aria-hidden />
                <span className="text-xs font-semibold" style={{ fontFamily: font.body, color: "rgba(246,241,231,0.7)" }}>{label}</span>
              </div>
            ))}
          </div>
          <div className="gft-gold-rule mt-8 mb-6" />
          <Reveal>
            <p className="text-center text-[11px] uppercase mb-3" style={{ fontFamily: font.body, color: color.gray500, letterSpacing: "0.14em" }}>
              Now serving
            </p>
            <p className="text-center text-sm leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: font.body, color: "rgba(246,241,231,0.65)" }}>
              {statesServed.join(" · ")}
            </p>
          </Reveal>
        </div>
      </div>

      {/* 3 · The Standard + Timeline (one chapter) */}
      <div id="standard">
        <Section label="The GarageFloorToday Standard™" title="Every project. Every market. The same standard.">
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {standardItems.map((item, i) => (
              <div key={item.id} className="flex gap-4 p-5" style={{ backgroundColor: color.white, borderRadius: radius.lg }}>
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
          <InstallationTimeline steps={timelineSteps} />
        </Section>
      </div>

      {/* 4 · Performance System */}
      <Section dark label="GFT Performance System" title="Not every garage needs the same floor.">
        <p className="text-base max-w-xl mb-10 -mt-6" style={{ fontFamily: font.body, color: color.gray500 }}>
          We match your coating to six engineering factors — never a one-product answer.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {performanceFactors.map(({ id, icon: Icon, label, description }) => (
            <div key={id} className="flex flex-col items-center text-center gap-2 p-5" style={{ backgroundColor: color.charcoal, borderRadius: radius.lg }}>
              <Icon size={24} strokeWidth={1.5} color={color.cream} aria-hidden />
              <p className="text-xs font-semibold" style={{ fontFamily: font.body, color: color.cream }}>{label}</p>
              <p className="text-[11px]" style={{ fontFamily: font.body, color: color.gray500 }}>{description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button variant="primary" href="/coatings/compare">Compare Coating Systems</Button>
        </div>
      </Section>

      {/* 5 · FloorPassport + recent installs */}
      <Section label="FloorPassport™" title="Every floor, documented forever.">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div style={{ fontFamily: font.body }}>
            <p className="text-base mb-6" style={{ color: color.gray700 }}>
              Moisture readings, prep photos, materials, batch numbers, crew, warranty — permanently
              recorded under one GFT Project ID™. It travels with your home, like a CarFax for your floor.
            </p>
            <div className="space-y-3 mb-8">
              {recentProjects.map((p) => (
                <div key={p.gftProjectId} className="flex items-center justify-between p-4" style={{ backgroundColor: color.white, borderRadius: radius.lg }}>
                  <div>
                    <p className="text-sm font-semibold tabular-nums" style={{ color: color.black }}>{p.gftProjectId}</p>
                    <p className="text-xs" style={{ color: color.gray500 }}>{p.city}, {p.state} · {p.finishName}</p>
                  </div>
                  <span className="text-xs font-semibold" style={{ color: color.success }}>Installed</span>
                </div>
              ))}
            </div>
            <Button variant="text" href="/lookup">Look up a FloorPassport →</Button>
          </div>
          <FloorPassportCard project={recentProjects[0]} />
        </div>
      </Section>

      {/* 5b · Before / After — interactive reveal slider */}
      <Section label="See the difference" title="From bare slab to showpiece.">
        <div className="grid lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-3">
            <BeforeAfter />
          </div>
          <div className="lg:col-span-2" style={{ fontFamily: font.body }}>
            <p className="text-base mb-4" style={{ color: color.gray700 }}>
              Drag to compare. What you're seeing isn't just a color change — it's a fully
              engineered system: the slab diamond-ground with ArmorPrep™, cracks structurally
              repaired, moisture tested and documented, then coated in the chemistry matched to
              your garage.
            </p>
            <p className="text-base mb-6" style={{ color: color.gray700 }}>
              The result is a floor that reflects light, resists hot tires and chemicals, and
              stays beautiful for decades — not one that peels in two years.
            </p>
            <Button variant="secondary" href="/tools/visualizer">Try the Floor Visualizer</Button>
          </div>
        </div>
      </Section>

      {/* 5c · Why GFT — comparison table vs. the category */}
      <Section dark label="Why GarageFloorToday" title="What a premium standard actually looks like.">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse" style={{ fontFamily: font.body }}>
            <thead>
              <tr>
                <th className="text-left p-4 text-sm font-semibold" style={{ color: color.gray500 }}></th>
                <th className="p-4 text-sm font-bold" style={{ color: color.cream }}>GarageFloorToday</th>
                <th className="p-4 text-sm font-semibold" style={{ color: color.gray500 }}>Typical coating company</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Moisture testing, documented", true, "Rarely, if ever"],
                ["Structural crack repair (not cosmetic)", true, "Often skipped"],
                ["Chemistry matched to your garage", true, "One system for everyone"],
                ["Permanent digital record (FloorPassport™)", true, "A paper receipt"],
                ["Warranty you can actually verify", true, "\u201cLifetime\u201d — unverifiable"],
                ["Certified crew, named on your record", true, "Rotating subcontractors"],
              ].map(([label, , other], i) => (
                <tr key={i} style={{ borderTop: "1px solid rgba(176,141,79,0.18)" }}>
                  <td className="p-4 text-sm font-semibold" style={{ color: color.cream }}>{label as string}</td>
                  <td className="p-4 text-center">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full" style={{ background: color.success }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
                    </span>
                  </td>
                  <td className="p-4 text-center text-sm" style={{ color: color.gray500 }}>{other as string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-6" style={{ fontFamily: font.body, color: color.gray500 }}>
          Comparison reflects common industry practices; individual contractors vary. GarageFloorToday commitments are backed by The GarageFloorToday Standard™.
        </p>
      </Section>


      {/* 7 · Crew */}
      <Section label="Meet your crew" title="Real people. On your FloorPassport by name.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCrew.map((m) => <CrewCard key={m.id} member={m} />)}
        </div>
      </Section>

      {/* 8 · Reviews */}
      <Section label="Reviews" title="What documented craftsmanship sounds like.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
        </div>
      </Section>

      {/* 9 · Final conversion — working inline lead form + closing copy */}
      <section className="px-6 py-24 relative gft-grain" style={{ background: gradient.blackDepth }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase mb-3" style={{ fontFamily: font.body, color: color.gold, letterSpacing: "0.16em" }}>
                Start your project
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-3xl md:text-5xl font-bold mb-5" style={{ fontFamily: font.display, color: color.cream, letterSpacing: "-0.015em", lineHeight: 1.05 }}>
                Your floor deserves more than paint in a bucket.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-lg mb-8 max-w-md" style={{ fontFamily: font.body, color: "rgba(246,241,231,0.72)" }}>
                Tell us about your garage and a certified local crew will build you a detailed,
                no-obligation estimate — engineered to The GarageFloorToday Standard™, documented on
                FloorPassport™, and backed for the long haul.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {trustSignals.map(({ id, icon: Icon, label }) => (
                  <div key={id} className="flex items-center gap-2">
                    <Icon size={16} strokeWidth={1.5} color={color.gold} aria-hidden />
                    <span className="text-xs font-semibold" style={{ fontFamily: font.body, color: "rgba(246,241,231,0.7)" }}>{label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <QuickEstimateForm />
          </Reveal>
        </div>
      </section>

      <Footer columns={navColumns} />
    </div>
  );
}
