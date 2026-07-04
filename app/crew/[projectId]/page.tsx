import React from "react";
import { notFound } from "next/navigation";
import { getCrewJobDetail } from "../../../lib/queries-crew";
import { JobChecklist } from "./JobChecklist";
import { ReadingsForm } from "./ReadingsForm";
import { BatchForm } from "./BatchForm";
import { CloseProjectControl } from "./CloseProjectControl";

export const metadata = { title: "Job Detail", robots: { index: false } };

export default async function JobDetailPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const job = await getCrewJobDetail(projectId);
  if (!job) return notFound(); // RLS returns null if not assigned — same result as "doesn't exist"

  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gft-red mb-1 font-body">
          {job.city}, {job.stateAbbr}
        </p>
        <h1 className="text-2xl font-bold tabular-nums font-display text-gft-black">{job.gftProjectId}</h1>
      </div>

      <section className="mb-8">
        <h2 className="text-sm font-semibold text-gft-black font-body mb-3">The GarageFloorToday Standard™</h2>
        <JobChecklist projectId={job.gftProjectId} checklist={job.checklist} />
      </section>

      <section className="mb-8">
        <h2 className="text-sm font-semibold text-gft-black font-body mb-3">Moisture readings</h2>
        {job.moistureReadings.length > 0 && (
          <div className="bg-white rounded-lg border border-gft-gray100 p-4 mb-3">
            {job.moistureReadings.map((r, i) => (
              <div key={i} className="flex justify-between text-sm font-body py-1">
                <span className="text-gft-gray500 capitalize">{r.stage}</span>
                <span className="text-gft-black tabular-nums">{r.value} {r.unit}</span>
              </div>
            ))}
          </div>
        )}
        <ReadingsForm projectId={job.gftProjectId} />
      </section>

      <section className="mb-8">
        <h2 className="text-sm font-semibold text-gft-black font-body mb-3">Material batches</h2>
        {job.batches.length > 0 && (
          <div className="bg-white rounded-lg border border-gft-gray100 p-4 mb-3">
            {job.batches.map((b, i) => (
              <div key={i} className="flex justify-between text-sm font-body py-1">
                <span className="text-gft-gray500 capitalize">{b.coat}</span>
                <span className="text-gft-black tabular-nums">{b.batch}</span>
              </div>
            ))}
          </div>
        )}
        <BatchForm projectId={job.gftProjectId} />
      </section>

      <section className="pt-6 border-t border-gft-gray300">
        <h2 className="text-sm font-semibold text-gft-black font-body mb-3">Close project</h2>
        <p className="text-xs text-gft-gray500 font-body mb-4">
          Closing generates this floor's public FloorPassport™ and appears in the customer's portal.
          All seven Standard steps must be checked, with customer sign-off, before you can close.
        </p>
        <CloseProjectControl projectId={job.gftProjectId} checklistDone={job.checklistDone} checklistTotal={job.checklistTotal} />
      </section>
    </div>
  );
}
