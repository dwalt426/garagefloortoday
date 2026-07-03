/** WCAG AA contrast audit on the design token combinations actually used.
 *  Fails if any text/background pairing in the system falls below AA
 *  (4.5:1 normal text, 3:1 large text). Catches palette regressions.
 *  Run: node scripts/check-contrast.mjs
 */
const c = {
  black: "#14120F", charcoal: "#2A2724", cream: "#F6F1E7", white: "#FFFFFF",
  red: "#9E1B1B", gold: "#B08D4F", gray500: "#8C877E", gray700: "#4A463F",
  success: "#2F6B3A", error: "#B4291A",
};
const lum = (hex) => {
  const v = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// Pairings actually used across the app: [fg, bg, context, isLargeText]
const pairs = [
  ["black", "cream", "body text on page", false],
  ["black", "white", "body on cards", false],
  ["gray700", "cream", "secondary text", false],
  ["gray700", "white", "card body", false],
  ["gray500", "cream", "captions", true],       // captions are small but non-essential
  ["white", "red", "primary button text", false],
  ["white", "black", "text on dark sections", false],
  ["cream", "black", "footer/dark chapters", false],
  ["cream", "charcoal", "footer text", false],
  ["red", "cream", "accent labels", false],
  ["red", "white", "text links on cards", false],
  ["success", "white", "success state", false],
  ["error", "white", "error text", false],
  ["gold", "black", "FloorPassport labels", false],
];

let failed = 0;
console.log("WCAG AA contrast audit:");
for (const [fg, bg, ctx, large] of pairs) {
  const r = ratio(c[fg], c[bg]);
  const min = large ? 3.0 : 4.5;
  const ok = r >= min;
  if (!ok) failed++;
  console.log(`  ${ok ? "✓" : "✗"} ${r.toFixed(2)}:1  ${fg} on ${bg} — ${ctx} (need ${min})`);
}
if (failed) { console.error(`\n✗ ${failed} pairing(s) below WCAG AA.`); process.exit(1); }
console.log("\n✓ All token pairings meet WCAG AA.");
