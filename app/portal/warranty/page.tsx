import React from "react";
import { getSessionUser } from "../../../lib/auth/session";
import { getCustomerProjects } from "../../../lib/queries-portal";

export const metadata = { title: "Warranty", robots: { index: false } };

export default async function WarrantyPage() {
  const user = await getSessionUser();
  const projects = user ? await getCustomerProjects(user) : [];

  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-gft-black mb-1">Warranty</h1>
      <p className="text-sm text-gft-gray500 font-body mb-8">
        Coverage for each of your floors — verifiable, and transferable if you sell your home.
      </p>
      {projects.length === 0 ? (
        <p className="text-sm text-gft-gray700 font-body">No floors linked yet.</p>
      ) : (
        <div className="space-y-4">
          {projects.map((p) => (
            <div key={p.gftProjectId} className="bg-white rounded-lg border border-gft-gray100 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold tabular-nums text-gft-black font-body">{p.gftProjectId}</span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full font-body ${p.warrantyStatus === "active" ? "bg-[#e8f2ea] text-gft-success" : "bg-gft-gray100 text-gft-gray500"}`}>
                  {p.warrantyStatus}
                </span>
              </div>
              <p className="text-xs text-gft-gray500 font-body mb-2">{p.city}, {p.stateAbbr} · {p.systemName}</p>
              <p className="text-sm text-gft-gray700 font-body">
                {p.warrantyTerms ?? "Warranty terms are recorded on your FloorPassport™."}
              </p>
              <a href="/warranty" className="text-xs font-semibold text-gft-red no-underline hover:underline underline-offset-4 font-body mt-3 inline-block">
                How claims work →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
