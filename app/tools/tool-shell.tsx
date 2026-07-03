import React from "react";
import { GlobalLayout } from "../../components/layout/GlobalLayout";

export function ToolShell({ eyebrow, h1, intro, children }: {
  eyebrow: string; h1: string; intro: string; children: React.ReactNode;
}) {
  return (
    <GlobalLayout>
      <section className="px-6 pt-40 pb-10 bg-gradient-to-b from-gft-gray100 to-gft-cream">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gft-red mb-3 font-body">{eyebrow}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 font-display text-gft-black">{h1}</h1>
          <p className="text-lg text-gft-gray700 font-body max-w-2xl">{intro}</p>
        </div>
      </section>
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">{children}</div>
      </section>
    </GlobalLayout>
  );
}
