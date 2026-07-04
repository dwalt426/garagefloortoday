import type { Metadata } from "next";
import { GlobalLayout } from "../../../components/layout/GlobalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for GarageFloorToday.",
  alternates: { canonical: "/legal/privacy" },
  robots: { index: false }, // draft until legal review — see notice on page
};

export default function Page() {
  return (
    <GlobalLayout showCtaBand={false}>
      <section className="px-6 pt-40 pb-24">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 font-display text-gft-black">Privacy Policy</h1>
          <div className="p-5 rounded-lg mb-8" style={{ backgroundColor: "#fdf3e3", border: "1px solid rgba(176,141,79,0.4)" }}>
            <p className="text-sm font-body text-gft-gray700">
              <strong>Awaiting legal review.</strong> This page is intentionally noindexed and must be
              replaced with counsel-approved language before public launch. Publishing templated legal
              text as if it were reviewed would expose the business to real risk — so it is flagged,
              not faked. See docs/LaunchChecklist.md.
            </p>
          </div>
          <p className="text-sm font-body text-gft-gray500">
            Content pending. The route, metadata, and noindex are production-ready; the copy requires
            a licensed attorney familiar with the jurisdictions GarageFloorToday operates in.
          </p>
        </div>
      </section>
    </GlobalLayout>
  );
}
