/** Content-uniqueness test for programmatic location pages.
 *  Parses seeded local narratives + intros and fails if any two are too
 *  similar (trigram Jaccard). This is the automated enforcement of the
 *  Master Prompt / Brand Bible rule: every local page must say something a
 *  competitor's (and our own other) local page doesn't.
 *  Run: node scripts/check-uniqueness.mjs
 */
import { readFileSync } from "node:fs";

const sql = readFileSync("lib/seed-locations.sql", "utf8");

// Extract the human-written narrative strings (climate_narrative, local_intro,
// local_considerations, FAQ answers) — the fields that must be unique per place.
const texts = [];
for (const m of sql.matchAll(/'([^']{80,})'/g)) {
  const t = m[1].replace(/E'|\\'/g, "").trim();
  if (/[a-z]{4,}\s+[a-z]{4,}/i.test(t)) texts.push(t);
}

const trigrams = (s) => {
  const w = s.toLowerCase().replace(/[^a-z ]/g, "").split(/\s+/);
  const g = new Set();
  for (let i = 0; i < w.length - 2; i++) g.add(w[i] + " " + w[i + 1] + " " + w[i + 2]);
  return g;
};
const jaccard = (a, b) => {
  const A = trigrams(a), B = trigrams(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  return inter / (A.size + B.size - inter);
};

const THRESHOLD = 0.5;
const collisions = [];
for (let i = 0; i < texts.length; i++)
  for (let j = i + 1; j < texts.length; j++) {
    const sim = jaccard(texts[i], texts[j]);
    if (sim >= THRESHOLD) collisions.push({ sim: sim.toFixed(2), a: texts[i].slice(0, 60), b: texts[j].slice(0, 60) });
  }

console.log(`Checked ${texts.length} local narratives for near-duplication.`);
if (collisions.length) {
  console.error("✗ Near-duplicate local content (thin-page risk):");
  collisions.forEach((c) => console.error(`  ${c.sim}  "${c.a}…"  ~  "${c.b}…"`));
  process.exit(1);
}
console.log("✓ All local narratives are sufficiently unique.");
