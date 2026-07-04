import React from "react";
import { redirect } from "next/navigation";
import { getSessionUser } from "../../lib/auth/session";

const NAV = [
  { label: "My Floors", href: "/portal" },
  { label: "Warranty", href: "/portal/warranty" },
  { label: "Maintenance", href: "/portal/maintenance" },
  { label: "Transfer Ownership", href: "/portal/transfer" },
];

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  // admins may view the customer portal; installers/anon may not
  if (!user || (user.role !== "customer" && user.role !== "admin")) redirect("/login?next=/portal");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F6F1E7" }}>
      <header className="border-b border-gft-gray300 bg-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-extrabold font-display text-gft-black">GFT</span>
          <span className="text-xs font-semibold text-gft-gray500 font-body">Homeowner Portal</span>
        </div>
        <p className="text-xs text-gft-gray500 font-body truncate max-w-[50%]">{user.email}</p>
      </header>
      <nav className="border-b border-gft-gray100 bg-white px-6 flex gap-1 overflow-x-auto">
        {NAV.map((n) => (
          <a key={n.href} href={n.href} className="px-4 py-3 text-sm font-semibold no-underline text-gft-gray700 hover:text-gft-black font-body whitespace-nowrap">
            {n.label}
          </a>
        ))}
      </nav>
      <main className="px-6 py-8 max-w-4xl mx-auto">{children}</main>
    </div>
  );
}
