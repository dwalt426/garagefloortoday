import React from "react";
import { redirect } from "next/navigation";
import { getSessionUser } from "../../lib/auth/session";

const NAV = [
  { label: "Leads", href: "/admin/leads" },
  { label: "Pricing", href: "/admin/pricing" },
  { label: "Reviews", href: "/admin/reviews" },
  { label: "Content", href: "/admin/content" },
];

/** Admin shell. Middleware already gated /admin/*; this adds the in-page
 *  session check + chrome. Server component — no client JS for the frame.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user || user.role !== "admin") redirect("/login?next=/admin/leads");

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F6F1E7" }}>
      <aside className="w-56 shrink-0 border-r border-gft-gray300 bg-white px-4 py-6">
        <div className="flex items-baseline gap-1 mb-8 px-2">
          <span className="text-lg font-extrabold font-display text-gft-black">GFT</span>
          <span className="text-xs font-semibold text-gft-gray500 font-body">Admin</span>
        </div>
        <nav className="space-y-1">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="block px-3 py-2 text-sm font-semibold rounded-sm no-underline text-gft-gray700 hover:bg-gft-gray100 font-body">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="mt-8 pt-6 border-t border-gft-gray100 px-2">
          <p className="text-xs text-gft-gray500 font-body truncate">{user.email}</p>
          <p className="text-[11px] text-gft-gray500 font-body">
            {user.franchiseeId ? "Franchise admin" : "National admin"}
          </p>
        </div>
      </aside>
      <main className="flex-1 px-8 py-8 overflow-x-auto">{children}</main>
    </div>
  );
}
