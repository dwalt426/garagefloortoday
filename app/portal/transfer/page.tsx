import React from "react";
import { getSessionUser } from "../../../lib/auth/session";
import { getCustomerProjects } from "../../../lib/queries-portal";
import { TransferForm } from "./TransferForm";
import { ReferralForm } from "./ReferralForm";

export const metadata = { title: "Transfer Ownership", robots: { index: false } };

export default async function TransferPage() {
  const user = await getSessionUser();
  const projects = user ? await getCustomerProjects(user) : [];

  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-gft-black mb-1">Transfer Ownership</h1>
      <p className="text-sm text-gft-gray500 font-body mb-8">
        Selling your home? Transfer a floor's FloorPassport™ and warranty to the new owner.
      </p>

      {projects.length === 0 ? (
        <p className="text-sm text-gft-gray700 font-body mb-10">No floors linked to transfer.</p>
      ) : (
        <div className="max-w-md mb-12">
          <TransferForm projects={projects.map((p) => ({ id: p.gftProjectId, label: `${p.gftProjectId} — ${p.city}, ${p.stateAbbr}` }))} />
        </div>
      )}

      <div className="max-w-md pt-8 border-t border-gft-gray100">
        <h2 className="text-lg font-bold font-display text-gft-black mb-1">Refer a friend</h2>
        <p className="text-sm text-gft-gray500 font-body mb-4">
          Know someone who needs a floor done right? Send them our way.
        </p>
        <ReferralForm />
      </div>
    </div>
  );
}
