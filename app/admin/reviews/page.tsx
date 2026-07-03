import React from "react";
import { createClient } from "../../../lib/supabase-server";
import { requireRole } from "../../../lib/auth/session";
import { ReviewModerationControl } from "./ReviewModerationControl";

export const metadata = { title: "Reviews", robots: { index: false } };

/** Curated review moderation. No delete path — reviews are published/unpublished
 *  and responded to, never deleted (Brand Bible §14). */
export default async function ReviewsPage() {
  await requireRole("admin");
  const supabase = await createClient();
  const { data: reviews } = await supabase
    .from("reviews")
    .select("id, rating, body, theme_tags, published, response_body, source, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-gft-black mb-2">Reviews</h1>
      <p className="text-sm text-gft-gray500 font-body mb-6">
        Curate and respond. Reviews are never deleted — only published, unpublished, or answered.
      </p>
      {!reviews?.length ? (
        <p className="text-sm text-gft-gray500 font-body">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r: any) => (
            <div key={r.id} className="bg-white rounded-lg border border-gft-gray100 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gft-black font-body">{"★".repeat(r.rating)}</span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full font-body ${r.published ? "bg-[#e8f2ea] text-gft-success" : "bg-gft-gray100 text-gft-gray500"}`}>
                  {r.published ? "Published" : "Unpublished"}
                </span>
              </div>
              <p className="text-sm text-gft-gray700 font-body mb-2">"{r.body}"</p>
              {(r.theme_tags ?? []).length > 0 && (
                <p className="text-[11px] text-gft-gray500 font-body mb-3">{(r.theme_tags ?? []).join(" · ")}</p>
              )}
              {r.response_body && (
                <p className="text-xs text-gft-gray700 font-body mb-3 pl-3 border-l-2 border-gft-red">
                  <span className="font-semibold">GFT response:</span> {r.response_body}
                </p>
              )}
              <ReviewModerationControl reviewId={r.id} published={r.published} hasResponse={!!r.response_body} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
