import type { Metadata } from "next";
import { FinancingCalculator } from "../../../features/visualizer/tools";
import { ToolShell } from "../tool-shell";

export const metadata: Metadata = {
  title: "Garage Floor Financing Calculator | No Hidden Math",
  description: "Calculate your monthly payment with standard amortization shown openly — amount, term, APR, payment. No games.",
  alternates: { canonical: "/tools/financing" },
};

export default function Page() {
  return (
    <ToolShell
      eyebrow="Financing"
      h1="The payment math, shown openly."
      intro="Standard amortization with the APR stated. Slide the numbers and see the payment."
    >
      <FinancingCalculator />
    </ToolShell>
  );
}
