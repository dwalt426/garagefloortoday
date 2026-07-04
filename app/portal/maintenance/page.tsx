import React from "react";
import { getSessionUser } from "../../../lib/auth/session";
import { getCustomerProjects, getMaintenanceForProject } from "../../../lib/queries-portal";

export const metadata = { title: "Maintenance", robots: { index: false } };

export default async function MaintenancePage() {
  const user = await getSessionUser();
  const projects = user ? await getCustomerProjects(user) : [];
  const schedules = await Promise.all(
    projects.map(async (p) => ({ project: p, items: await getMaintenanceForProject(p.gftProjectId) }))
  );

  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-gft-black mb-1">Maintenance</h1>
      <p className="text-sm text-gft-gray500 font-body mb-8">
        Care schedule for each floor. Completed service visits stay on your record.
      </p>
      {schedules.length === 0 ? (
        <p className="text-sm text-gft-gray700 font-body">No floors linked yet.</p>
      ) : (
        <div className="space-y-8">
          {schedules.map(({ project, items }) => (
            <section key={project.gftProjectId}>
              <h2 className="text-sm font-semibold text-gft-black font-body mb-3">
                {project.gftProjectId} · {project.city}, {project.stateAbbr}
              </h2>
              {items.length === 0 ? (
                <p className="text-xs text-gft-gray500 font-body">No scheduled maintenance recorded.</p>
              ) : (
                <div className="space-y-2">
                  {items.map((m) => {
                    const done = !!m.completedDate;
                    return (
                      <div key={m.id} className="flex items-center justify-between bg-white rounded-lg border border-gft-gray100 p-4">
                        <div className="font-body">
                          <p className="text-sm font-semibold text-gft-black capitalize">{m.eventType.replace(/_/g, " ")}</p>
                          <p className="text-xs text-gft-gray500">
                            {done ? `Completed ${new Date(m.completedDate!).toLocaleDateString()}`
                                  : m.dueDate ? `Due ${new Date(m.dueDate).toLocaleDateString()}` : "—"}
                          </p>
                        </div>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full font-body ${done ? "bg-[#e8f2ea] text-gft-success" : "bg-[#fdf3e3] text-[#8a5f14]"}`}>
                          {done ? "Complete" : "Upcoming"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
