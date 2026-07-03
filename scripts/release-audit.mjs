/** Release audit — verifies the repo against the launch requirements by
 *  inspecting the actual filesystem and route tree. Prints a table and exits
 *  non-zero if any REQUIRED artifact is missing. This is evidence, not a claim.
 */
import { readdirSync, statSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ok = (b) => (b ? "PASS" : "FAIL");
let failures = 0;
const check = (label, cond) => { if (!cond) failures++; return `  [${ok(cond)}] ${label}`; };

// --- Routes: every page.tsx under app/ ---
function routes(dir = "app", base = "") {
  const out = [];
  for (const e of readdirSync(dir)) {
    if (["node_modules", ".next"].includes(e)) continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out.push(...routes(p, `${base}/${e}`));
    else if (e === "page.tsx") {
      let r = base || "/";
      r = r.replace(/\/\([^)]+\)/g, "").replace(/\/\[\.\.\.(\w+)\]/g, "/*").replace(/\/\[(\w+)\]/g, "/:$1");
      out.push(r || "/");
    }
  }
  return out;
}
const allRoutes = routes().sort();

console.log("=== ROUTES ===");
const requiredRoutes = [
  "/", "/estimate", "/lookup", "/learn", "/coatings/compare", "/design-system",
  "/login", "/admin", "/portal", "/crew",
  "/tools/visualizer", "/tools/cost-calculator", "/tools/financing", "/tools/engineer-my-floor",
];
requiredRoutes.forEach((r) => console.log(check(`route ${r}`, allRoutes.includes(r))));
console.log(check("dynamic brand route /:slug", allRoutes.includes("/:slug")));
console.log(check("dynamic service route /services/:slug", allRoutes.includes("/services/:slug")));
console.log(check("dynamic coatings route /coatings/:slug", allRoutes.includes("/coatings/:slug")));
console.log(check("dynamic learn route /learn/:slug", allRoutes.includes("/learn/:slug")));
console.log(check("location catch-all /locations/*", allRoutes.includes("/locations/*")));
console.log(`  (${allRoutes.length} total page routes)`);

// --- Production files ---
console.log("\n=== PRODUCTION FILES ===");
[
  "package.json", "next.config.js", "tailwind.config.ts", "tsconfig.json",
  "postcss.config.js", "middleware.ts", ".env.example", ".github/workflows/ci.yml",
  "app/layout.tsx", "app/globals.css", "app/sitemap.ts", "app/robots.ts",
  "app/not-found.tsx", "app/error.tsx", "app/loading.tsx", "app/manifest.ts",
].forEach((f) => console.log(check(f, existsSync(f))));

// --- Server Actions / forms ---
console.log("\n=== FORMS / SERVER ACTIONS ===");
[
  ["actions.ts (estimate/contact/design)", "app/actions.ts"],
  ["admin-actions.ts (leads/reviews/pricing)", "app/admin-actions.ts"],
  ["portal-actions.ts (transfer/referral)", "app/portal-actions.ts"],
  ["crew-actions.ts (checklist/close)", "app/crew-actions.ts"],
].forEach(([l, f]) => console.log(check(l, existsSync(f))));
// honeypot + rate-limit present
console.log(check("rate limiting present", existsSync("lib/rate-limit.ts")));
console.log(check("honeypot in shared form", readFileSync("features/shared/form.tsx", "utf8").includes("Honeypot")));

// --- SQL schema ---
console.log("\n=== DATABASE ===");
["lib/schema.sql", "lib/seed.sql", "lib/schema-locations.sql", "lib/schema-pricing.sql",
 "lib/schema-crm.sql", "lib/schema-crew.sql", "lib/seed-locations.sql"].forEach((f) =>
  console.log(check(f, existsSync(f))));

// --- SEO ---
console.log("\n=== SEO ===");
console.log(check("schema-org JSON-LD builders", existsSync("lib/schema-org.ts")));
console.log(check("root metadata + OG", readFileSync("app/layout.tsx", "utf8").includes("openGraph")));

// --- Brand assets ---
console.log("\n=== ASSETS ===");
["public/logos/gft-seal-badge.png", "public/logos/gft-seal-circle.png",
 "public/hero/hero-mustang-wide.png"].forEach((f) => console.log(check(f, existsSync(f))));

// --- Docs ---
console.log("\n=== RELEASE DOCS ===");
["README.md", "DEPLOYMENT.md", "HARDENING.md", "EXPERIENCE_SPEC.md",
 "V1_LAUNCH_CHECKLIST.md", "e2e/README.md"].forEach((f) => console.log(check(f, existsSync(f))));

// --- Design/motion system ---
console.log("\n=== DESIGN SYSTEM ===");
console.log(check("design tokens", existsSync("styles/tokens.ts")));
console.log(check("motion primitives", existsSync("components/motion/Motion.tsx")));
console.log(check("cinematic hero", existsSync("components/hero/CinematicHero.tsx")));

console.log(`\n${failures === 0 ? "✓ RELEASE AUDIT PASSED" : `✗ ${failures} REQUIRED ARTIFACT(S) MISSING`}`);
process.exit(failures === 0 ? 0 : 1);
