import type { Metadata } from "next";
import { CostCalculator } from "../../../features/visualizer/tools";
import { ToolShell } from "../tool-shell";

export const metadata: Metadata = {
  title: "Garage Floor Coating Cost Calculator | Honest Ranges",
  description: "How much does a garage floor coating cost? Slide your square footage and see an installed price range including preparation, documentation, and warranty.",
  alternates: { canonical: "/tools/cost-calculator" },
};

export default function Page() {
  return (
    <ToolShell
      eyebrow="Cost Calculator"
      h1="What a garage floor coating actually costs."
      intro="One slider, an honest installed range — including ArmorPrep™ preparation, FloorPassport™ documentation, and warranty. No 'call for pricing.'"
    >
      <CostCalculator />
    </ToolShell>
  );
}
