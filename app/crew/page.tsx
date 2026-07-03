import React from "react";
import { getSessionUser } from "../../lib/auth/session";
import { getCrewJobs } from "../../lib/queries-crew";

export const metadata = { title: "My Jobs", robots: { index: false } };

export default async function CrewHome() {
  const user = await getSessionUser();
  const jobs = user ? await getCrewJobs(user) : [];

  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-gft-black mb-1">My Jobs</h1>
      <p className="text-sm text-gft-gray500 font-body mb-8">Open installs assigned to you.</p>
      {jobs.length === 0 ? (
        <p className="text-sm text-gft-gray700 font-body">No open jobs assigned.</p>
      ) : (
        <div className="space-y-3">
          {jobs.map((j) => (
            <a key={j.gftProjectId} href={`/crew/${j.gftProjectId}`}
              className="block bg-white rounded-lg border border-gft-gray100 p-5 no-underline hover:border-gft-gray300 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold tabular-nums text-gft-black font-body">{j.gftProjectId}</span>
                <span className="text-xs text-gft-gray500 font-body capitalize">{j.status.replace(/_/g, " ")}</span>
              </div>
              <p className="text-xs text-gft-gray500 font-body mb-3">{j.city}, {j.stateAbbr}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-gft-gray100">
                  <div className="h-1.5 rounded-full bg-gft-red" style={{ width: `${(j.checklistDone / j.checklistTotal) * 100}%` }} />
                </div>
                <span className="text-[11px] text-gft-gray500 font-body tabular-nums">{j.checklistDone}/{j.checklistTotal}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
