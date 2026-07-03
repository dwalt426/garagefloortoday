import React from "react";
import { createClient } from "../../../lib/supabase-server";
import { requireRole } from "../../../lib/auth/session";
import { LeadStageControl } from "./LeadStageControl";

export const metadata = { title: "Leads", robots: { index: false } };

const STAGES = [
  ["new", "New"], ["contacted", "Contacted"], ["estimate_scheduled", "Estimate Scheduled"],
  ["estimate_sent", "Estimate Sent"], ["won", "Won"], ["installed", "Installed"],
  ["warranty", "Warranty"], ["maintenance", "Maintenance"], ["lost", "Lost"],
] as const;

/** CRM pipeline. Server component fetches (RLS-scoped to admin), grouped by
 *  stage. Stage changes go through the admin Server Action via a client control.
 */
export default async function LeadsPage() {
  await requireRole("admin");
  const supabase = await createClient();
  const { data: leads } = await supabase
    .from("leads")
    .select("id, source_tool, email, phone, zip, payload, stage, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  const byStage = Object.fromEntries(STAGES.map(([k]) => [k, [] as any[]]));
  (leads ?? []).forEach((l: any) => (byStage[l.stage ?? "new"] ??= []).push(l));

  const total = leads?.length ?? 0;

  return (
    <div>
      <div className="flex items-baseline justify-between mb-6">
        <h1 className="text-2xl font-bold font-display text-gft-black">Leads</h1>
        <p className="text-sm text-gft-gray500 font-body tabular-nums">{total} in pipeline</p>
      </div>

      {total === 0 ? (
        <p className="text-sm text-gft-gray500 font-body">
          No leads yet. Submissions from the estimator, visualizer, and contact form appear here.
        </p>
      ) : (
        <div className="space-y-8">
          {STAGES.map(([key, label]) => {
            const items = byStage[key] ?? [];
            if (!items.length) return null;
            return (
              <section key={key}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-gft-gray500 mb-3 font-body">
                  {label} <span className="tabular-nums">({items.length})</span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {items.map((l) => (
                    <div key={l.id} className="bg-white rounded-lg border border-gft-gray100 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gft-black font-body capitalize">
                          {l.source_tool.replace(/_/g, " ")}
                        </span>
                        <span className="text-[11px] text-gft-gray500 font-body tabular-nums">{l.zip ?? "—"}</span>
                      </div>
                      {l.email && <p className="text-xs text-gft-gray700 font-body truncate">{l.email}</p>}
                      {l.phone && <p className="text-xs text-gft-gray500 font-body">{l.phone}</p>}
                      <p className="text-[11px] text-gft-gray500 font-body mt-2 mb-3">
                        {new Date(l.created_at).toLocaleDateString()}
                      </p>
                      <LeadStageControl leadId={l.id} current={l.stage ?? "new"} />
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
