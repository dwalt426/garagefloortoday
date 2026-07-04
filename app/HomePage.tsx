import React from "react";
import { color, font, radius, gradient } from "../styles/tokens";
import { StickyHeader, Footer } from "../components/navigation/Navigation";
import { Button } from "../components/buttons/Button";
import { CinematicHero } from "../components/hero/CinematicHero";
import { Reveal, Stagger, CountUp } from "../components/motion/Motion";
import { ServiceCard, CrewCard, ReviewCard } from "../components/cards/Cards";
import { FloorPassportCard } from "../components/floorpassport/FloorPassportCard";
import { InstallationTimeline } from "../components/timeline/InstallationTimeline";
import {
  hero, trustSignals, standardItems, timelineSteps, services,
  performanceFactors, recentProjects, featuredCrew, reviews, navColumns,
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
            {[
              { n: 4200, suffix: "+", label: "Floors installed" },
              { n: 38, suffix: "", label: "Certified crews" },
              { n: 12, suffix: "", label: "Markets served" },
              { n: 100, suffix: "%", label: "Documented on FloorPassport™" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="text-center md:border-r md:last:border-r-0" style={{ borderColor: "rgba(176,141,79,0.22)" }}>
                  <p className="text-3xl md:text-4xl font-extrabold mb-1" style={{ fontFamily: font.display, color: color.cream }}>
                    <CountUp to={s.n} suffix={s.suffix} />
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

      {/* 6 · Services */}
      <Section label="Where we work" title="One standard, every surface.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
        </div>
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

      {/* 9 · Final CTA — shimmer band, red sheen */}
      <section className="px-6 py-24 relative gft-shimmer" style={{ background: gradient.redSheen }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: font.display, color: color.white }}>
            Ready for a floor built to The Standard?
          </h2>
          <a
            href="/estimate"
            className="px-8 py-4 text-sm font-semibold no-underline"
            style={{ fontFamily: font.body, backgroundColor: color.white, color: color.red, borderRadius: radius.sm }}
          >
            Get My Free Estimate
          </a>
        </div>
      </section>

      <Footer columns={navColumns} />
    </div>
  );
}
