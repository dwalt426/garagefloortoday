import React from "react";
import { GlobalLayout } from "../../components/layout/GlobalLayout";
import { Button } from "../../components/buttons/Button";
import { CrewCard } from "../../components/cards/Cards";
import type { CityServiceData } from "../../lib/queries-locations";

/** /locations/[state]/[city]/[service] — the long-tail combo page.
 *  Only renders when a real local_intro exists for the city+service (gate).
 */
export function CityServicePage({ data }: { data: CityServiceData }) {
  return (
    <GlobalLayout ctaHeadline={`${data.serviceTitle} in ${data.city}. Get a local estimate.`}>
      <section className="px-6 pt-40 pb-14 bg-gradient-to-b from-gft-gray100 to-gft-cream">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gft-red mb-3 font-body">
            {data.city}, {data.stateAbbr}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 font-display text-gft-black">
            {data.serviceTitle} in {data.city}
          </h1>
          <p className="text-lg font-body text-gft-gray700 max-w-2xl">{data.localIntro}</p>
        </div>
      </section>

      {data.localConsiderations && (
        <section className="px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-3 font-display text-gft-black">
              What matters for {data.city} {data.serviceTitle.toLowerCase()}
            </h2>
            <p className="text-base font-body text-gft-gray700">{data.localConsiderations}</p>
          </div>
        </section>
      )}

      {data.recentInstalls.length > 0 && (
        <section className="px-6 py-12 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 font-display text-gft-black">Recent {data.city} installs</h2>
            <div className="space-y-3">
              {data.recentInstalls.map((p) => (
                <div key={p.gftProjectId} className="flex items-center justify-between p-4 bg-gft-cream rounded-lg">
                  <div className="font-body">
                    <p className="text-sm font-semibold tabular-nums text-gft-black">{p.gftProjectId}</p>
                    <p className="text-xs text-gft-gray500">{p.finishName} · {p.crewLeadName}</p>
                  </div>
                  <span className="text-xs font-semibold text-gft-success font-body">Installed</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 font-display text-gft-black">Your {data.city} crew</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {data.crew.map((m) => <CrewCard key={m.id} member={m} />)}
          </div>
          <div className="flex gap-4">
            <Button variant="primary" href="/estimate">Get My Free Estimate</Button>
            <Button variant="secondary" href={`/services/${data.serviceSlug}`}>Learn about {data.serviceTitle}</Button>
          </div>
        </div>
      </section>
    </GlobalLayout>
  );
}
