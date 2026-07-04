import type { Metadata } from "next";
import { color } from "../../styles/tokens";
import { Button } from "../../components/buttons/Button";
import { ServiceCard, CrewCard, ReviewCard, Pill } from "../../components/cards/Cards";
import { FloorPassportCard } from "../../components/floorpassport/FloorPassportCard";
import { InstallationTimeline } from "../../components/timeline/InstallationTimeline";
import { services, featuredCrew, reviews, timelineSteps, recentProjects } from "../../data/homepage";

export const metadata: Metadata = {
  title: "Design System",
  description: "Internal component and token reference for GarageFloorToday.",
  robots: { index: false, follow: false }, // internal reference — not indexed
  alternates: { canonical: "/design-system" },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-gft-red mb-4 font-body">{title}</h2>
      {children}
    </section>
  );
}

/** /design-system — the single visual source of truth. No developer should
 *  guess how a component looks; every primitive is rendered here with its
 *  usage rules. Not indexed (robots noindex).
 */
export default function Page() {
  const swatches: [string, string][] = [
    ["Black", color.black], ["Charcoal", color.charcoal], ["Cream", color.cream],
    ["Heritage Red™", color.red], ["Gold (FloorPassport only)", color.gold],
    ["Gray 300", color.gray300], ["Gray 500", color.gray500], ["Success", color.success],
  ];
  return (
    <div className="min-h-screen bg-gft-cream">
      <div className="px-8 py-10 border-b border-gft-gray300">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gft-red mb-2 font-body">Internal reference</p>
        <h1 className="text-4xl font-extrabold font-display text-gft-black">GarageFloorToday Design System</h1>
        <p className="text-base text-gft-gray700 font-body mt-2 max-w-2xl">
          Every token and component, rendered live. This is the visual contract — the homepage, service pages, and tools all assemble from exactly these pieces.
        </p>
      </div>

      <div className="px-8 py-12 max-w-5xl mx-auto">
        <Section title="Color tokens">
          <div className="grid grid-cols-4 gap-4">
            {swatches.map(([name, hex]) => (
              <div key={name}>
                <div className="h-20 rounded-lg border border-gft-gray300" style={{ backgroundColor: hex }} />
                <p className="text-sm font-semibold mt-2 font-body text-gft-black">{name}</p>
                <p className="text-xs font-body text-gft-gray500">{hex}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Typography">
          <p className="text-5xl font-extrabold font-display text-gft-black mb-2">Display / Archivo</p>
          <p className="text-lg font-body text-gft-gray700 mb-1">Body / Inter — the workhorse for all running text.</p>
          <p className="text-3xl font-bold tabular-nums font-display text-gft-black">$2,850 <span className="text-sm font-body text-gft-gray500">tabular numerals</span></p>
        </Section>

        <Section title="Buttons">
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary">Get My Free Estimate</Button>
            <Button variant="secondary">See the Standard</Button>
            <Button variant="text">Compare systems →</Button>
          </div>
          <p className="text-xs text-gft-gray500 font-body mt-3">Rule: one primary CTA per section; copy is always a specific verb phrase.</p>
        </Section>

        <Section title="Pills / tags">
          <div className="flex gap-2"><Pill>Durability</Pill><Pill>Certified 6 yrs</Pill><Pill>412 floors</Pill></div>
        </Section>

        <Section title="Cards">
          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard service={services[0]} />
            <CrewCard member={featuredCrew[0]} />
            <ReviewCard review={reviews[0]} />
          </div>
        </Section>

        <Section title="FloorPassport card (the only gold component)">
          <div className="max-w-md"><FloorPassportCard project={recentProjects[0]} /></div>
        </Section>

        <Section title="Installation Timeline">
          <InstallationTimeline steps={timelineSteps} activeThrough={5} />
        </Section>

        <Section title="Form primitives">
          <div className="grid sm:grid-cols-2 gap-6 max-w-xl">
            <div>
              <label htmlFor="ds-zip" className="text-xs font-semibold text-gft-black font-body block mb-1">ZIP code</label>
              <input id="ds-zip" placeholder="75201" className="w-full px-4 py-3 text-sm rounded-sm border border-gft-gray300 outline-none focus:border-gft-black font-body" />
            </div>
            <div>
              <label htmlFor="ds-email" className="text-xs font-semibold text-gft-black font-body block mb-1">Email</label>
              <input id="ds-email" placeholder="you@example.com" className="w-full px-4 py-3 text-sm rounded-sm border border-gft-gray300 outline-none focus:border-gft-black font-body" />
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
