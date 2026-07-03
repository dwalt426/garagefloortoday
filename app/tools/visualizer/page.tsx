import type { Metadata } from "next";
import { Visualizer } from "../../../features/visualizer/tools";
import { ToolShell } from "../tool-shell";

export const metadata: Metadata = {
  title: "Garage Floor Color Visualizer | See Your Blend",
  description: "Preview flake blends on a garage floor in real time and save your design — it attaches to your GFT Project ID™ so your installer sees exactly what you chose.",
  alternates: { canonical: "/tools/visualizer" },
};

export default function Page() {
  return (
    <ToolShell
      eyebrow="Visualizer"
      h1="See your floor before it's poured."
      intro="Swap blends in real time, save the one you love, and it travels with your project."
    >
      <Visualizer />
    </ToolShell>
  );
}
