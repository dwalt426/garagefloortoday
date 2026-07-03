"use client";

import React, { useState, useTransition } from "react";
import { moderateReview } from "../../admin-actions";

export function ReviewModerationControl({ reviewId, published, hasResponse }: {
  reviewId: string; published: boolean; hasResponse: boolean;
}) {
  const [pending, start] = useTransition();
  const [responding, setResponding] = useState(false);
  const [response, setResponse] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const run = (payload: any) => start(async () => {
    setErr(null);
    const res = await moderateReview(payload);
    if (!res.ok) setErr(res.error);
    else if (payload.action === "respond") setResponding(false);
  });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => run({ reviewId, action: published ? "unpublish" : "publish" })}
        disabled={pending}
        className="px-3 py-1.5 text-xs font-semibold rounded-sm border border-gft-gray300 bg-white text-gft-black hover:border-gft-black disabled:opacity-60 font-body"
      >
        {published ? "Unpublish" : "Publish"}
      </button>
      <button
        onClick={() => setResponding((v) => !v)}
        disabled={pending}
        className="px-3 py-1.5 text-xs font-semibold rounded-sm border border-gft-gray300 bg-white text-gft-black hover:border-gft-black disabled:opacity-60 font-body"
      >
        {hasResponse ? "Edit response" : "Respond"}
      </button>
      {responding && (
        <div className="w-full mt-2">
          <label className="sr-only" htmlFor={`resp-${reviewId}`}>Response</label>
          <textarea
            id={`resp-${reviewId}`}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            rows={2}
            placeholder="Acknowledge specifically; move detailed resolution off-platform."
            className="w-full px-3 py-2 text-xs rounded-sm border border-gft-gray300 outline-none focus:border-gft-black font-body"
          />
          <button
            onClick={() => run({ reviewId, action: "respond", responseBody: response })}
            disabled={pending || !response.trim()}
            className="mt-2 px-3 py-1.5 text-xs font-semibold rounded-sm bg-gft-red text-white disabled:opacity-60 font-body"
          >
            Save response
          </button>
        </div>
      )}
      {err && <p role="alert" className="text-[11px] text-gft-error font-body w-full">{err}</p>}
    </div>
  );
}
