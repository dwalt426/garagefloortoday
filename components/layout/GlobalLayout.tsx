import React from "react";
import { color, font, radius } from "../../styles/tokens";
import { StickyHeader, Footer } from "../navigation/Navigation";
import { navColumns } from "../../data/homepage";

export interface GlobalLayoutProps {
  children: React.ReactNode;
  /** Hide the pre-footer CTA band on pages that end with their own conversion moment */
  showCtaBand?: boolean;
  ctaHeadline?: string;
}

/** Every page renders inside this shell. Header + footer + final CTA band
 *  exist exactly once in the codebase.
 */
export function GlobalLayout({
  children,
  showCtaBand = true,
  ctaHeadline = "Ready for a floor built to The Standard?",
}: GlobalLayoutProps) {
  return (
    <div style={{ backgroundColor: color.cream }}>
      <StickyHeader columns={navColumns} phone="(800) 555-0143" />
      <main>{children}</main>
      {showCtaBand && (
        <section className="px-6 py-20" style={{ backgroundColor: color.red }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: font.display, color: color.white }}>
              {ctaHeadline}
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
      )}
      <Footer columns={navColumns} />
    </div>
  );
}
