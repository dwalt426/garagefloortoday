import React from "react";
import { getSessionUser } from "../../lib/auth/session";
import { getCustomerProjects } from "../../lib/queries-portal";
import { FloorPassportCard } from "../../components/floorpassport/FloorPassportCard";

export const metadata = { title: "My Floors", robots: { index: false } };

export default async function PortalHome() {
  const user = await getSessionUser();
  const projects = user ? await getCustomerProjects(user) : [];

  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-gft-black mb-1">My Floors</h1>
      <p className="text-sm text-gft-gray500 font-body mb-8">
        Every floor on your account, with its full FloorPassport™ record.
      </p>

      {projects.length === 0 ? (
        <div className="bg-white rounded-lg border border-gft-gray100 p-8 text-center">
          <p className="text-sm text-gft-gray700 font-body mb-4">
            No floors linked to your account yet. If you've had a floor installed, contact your
            local GFT team with your GFT Project ID™ to link it.
          </p>
          <a href="/lookup" className="text-sm font-semibold text-gft-red no-underline hover:underline underline-offset-4 font-body">
            Look up a floor by Project ID →
          </a>
        </div>
      ) : (
        <div className="space-y-8">
          {projects.map((p) => (
            <div key={p.gftProjectId}>
              <div className="mb-4 max-w-md">
                <FloorPassportCard project={{
                  gftProjectId: p.gftProjectId, city: p.city, state: p.stateAbbr,
                  finishName: p.finishName, installDate: p.installDate ?? "",
                  system: /hybrid|polyurea/i.test(p.systemName) ? "polyurea-hybrid" : /epoxy/i.test(p.systemName) ? "epoxy" : "polyaspartic",
                  crewLeadName: p.crewLead, warrantyStatus: p.warrantyStatus as any,
                }} />
              </div>

              {/* Moisture readings + photos — the documented record */}
              {p.moistureReadings.length > 0 && (
                <div className="bg-white rounded-lg border border-gft-gray100 p-5 mb-3 max-w-md">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gft-gray500 mb-2 font-body">Moisture readings</p>
                  {p.moistureReadings.map((r, i) => (
                    <div key={i} className="flex justify-between text-sm font-body py-1">
                      <span className="text-gft-gray500 capitalize">{r.stage}</span>
                      <span className="text-gft-black tabular-nums">{r.value} {r.unit}</span>
                    </div>
                  ))}
                </div>
              )}
              {(p.prepPhotos.length > 0 || p.finishedPhotos.length > 0) && (
                <p className="text-xs text-gft-gray500 font-body max-w-md">
                  {p.prepPhotos.length + p.finishedPhotos.length} photos on record — prep through finish.
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
