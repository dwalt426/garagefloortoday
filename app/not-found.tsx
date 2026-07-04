export default function NotFound() {
  return (
    <div style={{ minHeight: "70vh", display: "grid", placeItems: "center", backgroundColor: "#F6F1E7", fontFamily: "Inter, sans-serif" }}>
      <div style={{ textAlign: "center", padding: 24 }}>
        <p style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: "#9E1B1B" }}>404</p>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#14120F", margin: "8px 0 16px" }}>This floor doesn't exist.</h1>
        <p style={{ color: "#4A463F", marginBottom: 24 }}>The page you're looking for moved or was never poured.</p>
        <a href="/" style={{ backgroundColor: "#9E1B1B", color: "#fff", padding: "12px 24px", borderRadius: 4, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>Back home</a>
      </div>
    </div>
  );
}
