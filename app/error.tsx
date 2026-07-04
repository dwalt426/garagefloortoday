"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ minHeight: "70vh", display: "grid", placeItems: "center", backgroundColor: "#F6F1E7", fontFamily: "Inter, sans-serif" }}>
      <div style={{ textAlign: "center", padding: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#14120F", marginBottom: 12 }}>Something went wrong.</h1>
        <p style={{ color: "#4A463F", marginBottom: 24 }}>Please try again — if it persists, contact your local GFT team.</p>
        <button onClick={reset} style={{ backgroundColor: "#9E1B1B", color: "#fff", padding: "12px 24px", borderRadius: 4, border: "none", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Try again</button>
      </div>
    </div>
  );
}
