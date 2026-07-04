import React from "react";
import { ShieldCheck } from "lucide-react";
import { color, radius, font } from "../../styles/tokens";
import type { Project } from "../../types";

export interface FloorPassportCardProps { project: Project; }

/** The ONLY component permitted to use --gft-gold (Brand Bible §3).
 *  Gold = certification. Nowhere else.
 */
export function FloorPassportCard({ project }: FloorPassportCardProps) {
  const fields: [string, string][] = [
    ["Install Date", new Date(project.installDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })],
    ["System", labelForSystem(project.system)],
    ["Crew Lead", project.crewLeadName],
    ["Warranty", project.warrantyStatus === "active" ? "Active · Transferable" : project.warrantyStatus],
  ];

  return (
    <div style={{ border: `2px solid ${color.gold}`, borderRadius: radius.lg, backgroundColor: color.black, overflow: "hidden" }}>
      <div className="p-6 flex items-center justify-between" style={{ borderBottom: `1px solid ${color.gray700}` }}>
        <div style={{ fontFamily: font.body }}>
          <p className="text-xs uppercase" style={{ color: color.gold, letterSpacing: "0.1em" }}>FloorPassport™</p>
          <p className="text-xl font-bold tabular-nums" style={{ fontFamily: font.display, color: color.white }}>
            {project.gftProjectId}
          </p>
        </div>
        <ShieldCheck size={28} color={color.gold} aria-hidden />
      </div>
      <div className="p-6 grid grid-cols-2 gap-4" style={{ fontFamily: font.body }}>
        {fields.map(([label, val]) => (
          <div key={label}>
            <p className="text-xs" style={{ color: color.gray500 }}>{label}</p>
            <p className="text-sm font-semibold" style={{ color: color.cream }}>{val}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function labelForSystem(system: Project["system"]): string {
  const map: Record<Project["system"], string> = {
    epoxy: "GFT Performance — Epoxy",
    polyaspartic: "GFT Performance — Polyaspartic",
    "polyurea-hybrid": "GFT Performance — Polyurea Hybrid",
  };
  return map[system];
}
