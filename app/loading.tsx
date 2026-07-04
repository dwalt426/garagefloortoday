export default function Loading() {
  return (
    <div style={{ minHeight: "70vh", display: "grid", placeItems: "center", backgroundColor: "#F6F1E7" }}>
      <div style={{ width: 32, height: 32, border: "3px solid #D6D3CF", borderTopColor: "#9E1B1B", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}
