import { requireRole } from "../../../lib/auth/session";
export const metadata = { title: "Content", robots: { index: false } };

export default async function ContentPage() {
  await requireRole("admin");
  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-gft-black mb-2">Content</h1>
      <p className="text-sm text-gft-gray700 font-body max-w-xl mb-4">
        Page, location, and FAQ editing UI. The content model is already typed and DB-backed
        (locations, local_faqs, location_services, reviews); this surface exposes it for
        no-code editing.
      </p>
      <p className="text-xs text-gft-gray500 font-body max-w-xl">
        Build note: CRUD forms over the existing tables, franchise-scoped by assigned_franchisee_id,
        with the draft→review→approved→published workflow. Wired to the same requireRole('admin')
        guard and revalidatePath pattern as Leads/Reviews/Pricing.
      </p>
    </div>
  );
}
