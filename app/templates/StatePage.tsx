import React from "react";
import { GlobalLayout } from "../../components/layout/GlobalLayout";
import { Button } from "../../components/buttons/Button";
import type { StatePageData } from "../../lib/queries-locations";

export function StatePage({ data }: { data: StatePageData }) {
  return (
    <GlobalLayout ctaHeadline={`Serving ${data.state}. Get your local estimate.`}>
      <section className="px-6 pt-40 pb-14 bg-gradient-to-b from-gft-gray100 to-gft-cream">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gft-red mb-3 font-body">
            {data.state}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl mb-4 font-display text-gft-black">
            Garage Floor Coatings Across {data.state}
          </h1>
          <p className="text-lg max-w-2xl mb-6 font-body text-gft-gray700">{data.climateNarrative}</p>
          <p className="text-sm font-body text-gft-gray500">
            <span className="tabular-nums font-semibold text-gft-black">{data.totalFloors.toLocaleString()}</span> floors installed statewide
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 font-display text-gft-black">Cities we serve</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.cities.map((c) => (
              <a
                key={c.slug}
                href={`/locations/${c.slug}`}
                className="flex items-center justify-between p-5 bg-white rounded-lg border border-gft-gray100 no-underline hover:border-gft-gray300 transition-colors"
              >
                <div>
                  <p className="text-sm font-semibold font-body text-gft-black">{c.city}</p>
                  <p className="text-xs font-body text-gft-gray500 tabular-nums">{c.floorsInstalled.toLocaleString()} floors</p>
                </div>
                <span className="text-gft-red font-body text-sm">→</span>
              </a>
            ))}
          </div>
          <div className="mt-10">
            <Button variant="primary" href="/estimate">Get My Free Estimate</Button>
          </div>
        </div>
      </section>
    </GlobalLayout>
  );
}
