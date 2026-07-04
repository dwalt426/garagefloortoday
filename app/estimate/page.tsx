import type { Metadata } from "next";
import { SmartEstimator } from "../../features/estimator/SmartEstimator";
import { ToolShell } from "../tools/tool-shell";

export const metadata: Metadata = {
  title: "Free Garage Floor Estimate | Instant Price Range",
  description: "See your garage floor coating price range instantly — size, condition, and finish in, honest range out. No callback required to see numbers.",
  alternates: { canonical: "/estimate" },
};

export default function Page() {
  return (
    <ToolShell
      eyebrow="Smart Estimator"
      h1="See your price range before anyone calls you."
      intro="Answer a few questions about your garage and get an instant, honest range — with the recommended system and financing math shown openly."
    >
      <SmartEstimator />
    </ToolShell>
  );
}
