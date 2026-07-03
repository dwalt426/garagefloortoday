import type { Metadata } from "next";
import { lookupFloorPassport } from "../../lib/queries";
import { GlobalLayout } from "../../components/layout/GlobalLayout";
import { FloorPassportCard } from "../../components/floorpassport/FloorPassportCard";

export const metadata: Metadata = {
  title: "FloorPassport™ Lookup | Verify Any GFT Floor",
  description: "Enter a GFT Project ID™ to view a floor's complete installation record — system, readings, crew, and warranty status. Public, verifiable, permanent.",
  alternates: { canonical: "/lookup" },
};

/** Server component: the lookup happens server-side via RLS-protected view.
 *  GET-based (?id=GFT-2026-08114) so results are shareable/linkable — a yard
 *  sign QR code resolves straight to a verified record.
 */
export default async function Page({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const project = id ? await lookupFloorPassport(id) : null;

  return (
    <GlobalLayout showCtaBand={false}>
      <section className="px-6 pt-40 pb-24">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-3 font-display text-gft-black">FloorPassport™ Lookup</h1>
          <p className="text-base text-gft-gray700 font-body mb-10">
            Enter a GFT Project ID™ to view a floor's complete installation record.
          </p>
          <form method="GET" className="flex gap-3 max-w-md mx-auto mb-12">
            <input
              type="text"
              name="id"
              defaultValue={id ?? ""}
              placeholder="GFT-2026-08114"
              aria-label="GFT Project ID"
              className="flex-1 px-4 py-3 text-sm rounded-sm border border-gft-gray300 outline-none focus:border-gft-black tabular-nums font-body"
            />
            <button type="submit" className="px-6 py-3 text-sm font-semibold rounded-sm bg-gft-red text-white hover:-translate-y-0.5 hover:shadow-md transition-all duration-150">
              Look Up Floor
            </button>
          </form>

          {project ? (
            <div className="text-left">
              <FloorPassportCard project={project} />
              <p className="text-[11px] text-gft-gray500 font-body mt-3">
                Public records show the floor's technical history — never the homeowner's identity.
              </p>
            </div>
          ) : id ? (
            <p className="text-sm text-gft-gray700 font-body">
              No record found for <span className="tabular-nums font-semibold">{id}</span>. Check the ID on your
              certificate or yard sign, or contact your local GFT team.
            </p>
          ) : null}
        </div>
      </section>
    </GlobalLayout>
  );
}
