/** Link-integrity test: every internal href referenced in content data must
 *  resolve to a real route. Fails CI if any dead internal link exists.
 *  Run: node scripts/check-links.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

// 1. Collect every href referenced in data/*.ts content files
const dataDir = "data";
const hrefs = new Set();
for (const f of readdirSync(dataDir).filter((f) => f.endsWith(".ts"))) {
  const src = readFileSync(join(dataDir, f), "utf8");
  for (const m of src.matchAll(/href:\s*["'`](\/[^"'`]*)["'`]/g)) hrefs.add(m[1]);
  for (const m of src.matchAll(/canonical:\s*["'`]https:\/\/garagefloortoday\.com(\/[^"'`]*)["'`]/g)) hrefs.add(m[1]);
}

// 2. Known concrete + dynamic routes the app serves
const staticRoutes = new Set([
  "/", "/about", "/why-gft", "/standard", "/armorprep", "/performance-system",
  "/floorpassport", "/warranty", "/financing", "/contact", "/careers",
  "/estimate", "/lookup", "/learn", "/coatings/compare", "/design-system",
  "/gallery", "/locations",
  "/tools/visualizer", "/tools/cost-calculator", "/tools/financing", "/tools/engineer-my-floor",
  "/careers/openings",
]);

// dynamic slug sets
const load = (file, arr) => {
  const src = readFileSync(file, "utf8");
  return [...src.matchAll(/slug:\s*["'`]([a-z0-9-]+)["'`]/g)].map((m) => m[1]);
};
const brand = load("data/brand-pages-1.ts").concat(load("data/brand-pages-2.ts"));
const services = load("data/service-pages-1.ts").concat(load("data/service-pages-2.ts"));
const systems = load("data/system-pages.ts");
const learn = load("data/learn-articles-1.ts").concat(load("data/learn-articles-2.ts"));

brand.forEach((s) => staticRoutes.add(`/${s}`));
services.forEach((s) => staticRoutes.add(`/services/${s}`));
systems.forEach((s) => staticRoutes.add(`/coatings/${s}`));
learn.forEach((s) => staticRoutes.add(`/learn/${s}`));

// 3. Check. /locations/* are DB-driven (gate-enforced) — allow the prefix.
const dead = [];
for (const h of hrefs) {
  const clean = h.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
  if (staticRoutes.has(clean)) continue;
  if (clean.startsWith("/locations/")) continue; // dynamic, DB-gated
  dead.push(h);
}

if (dead.length) {
  console.error("✗ Dead internal links:\n" + dead.map((d) => "  " + d).join("\n"));
  process.exit(1);
}
console.log(`✓ All ${hrefs.size} internal links resolve across ${staticRoutes.size} routes.`);
