import type { Metadata } from "next";
import { FloorFinder } from "../../../features/floor-finder/FloorFinder";
import { ToolShell } from "../tool-shell";

export const metadata: Metadata = {
  title: "Engineer My Floor | Configure Your Coating System",
  description: "Configure your floor like a spec sheet: space, usage, and style in — recommended GFT Performance System™, blend, and price range out.",
  alternates: { canonical: "/tools/engineer-my-floor" },
};

export default function Page() {
  return (
    <ToolShell
      eyebrow="Engineer My Floor"
      h1="Configure your floor like a spec sheet."
      intro="Three engineering questions. One recommended system, with the reasoning."
    >
      <div className="flex justify-center"><FloorFinder /></div>
    </ToolShell>
  );
}
