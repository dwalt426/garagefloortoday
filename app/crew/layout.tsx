import React from "react";
import { redirect } from "next/navigation";
import { getSessionUser } from "../../lib/auth/session";

export default async function CrewLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user || user.role !== "installer") redirect("/login?next=/crew");
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F6F1E7" }}>
      <header className="border-b border-gft-gray300 bg-white px-6 py-4 flex items-center justify-between">
        <a href="/crew" className="flex items-baseline gap-1 no-underline">
          <span className="text-lg font-extrabold font-display text-gft-black">GFT</span>
          <span className="text-xs font-semibold text-gft-gray500 font-body">Crew</span>
        </a>
        <p className="text-xs text-gft-gray500 font-body truncate max-w-[50%]">{user.email}</p>
      </header>
      <main className="px-6 py-8 max-w-2xl mx-auto">{children}</main>
    </div>
  );
}
