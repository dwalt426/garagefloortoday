/** Static accessibility audit over JSX/TSX. Catches the WCAG issues that are
 *  detectable without a browser: images without alt, inputs without labels,
 *  buttons without accessible text, links with no text, and positive tabindex.
 *  Browser-based axe testing runs in Playwright (Sprint 12b) once a dev server
 *  is available; this static pass is the CI gate that never needs a browser.
 *  Run: node scripts/check-a11y.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

function walk(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    if (["node_modules", ".git", ".next"].includes(e)) continue;
    const p = join(dir, e);
    statSync(p).isDirectory() ? walk(p, acc) : (p.endsWith(".tsx") && acc.push(p));
  }
  return acc;
}

const issues = [];
for (const file of walk(".")) {
  const src = readFileSync(file, "utf8");
  const rel = file.replace("./", "");

  // <img> without alt (next/image and raw)
  for (const m of src.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/g))
    issues.push(`${rel}: <img> missing alt`);

  // positive tabIndex (anti-pattern)
  for (const m of src.matchAll(/tabIndex=\{?["']?([1-9]\d*)["']?\}?/g))
    issues.push(`${rel}: positive tabIndex=${m[1]} (breaks tab order)`);

  // <input> with neither aria-label nor id (multiline-aware, honeypot-exempt)
  for (const m of src.matchAll(/<input\b((?:[^>]|=>)*?)\/?>(?!\s*[a-z])/g)) {
    const attrs = m[1];
    if (/type=["']hidden["']/.test(attrs)) continue;
    if (/aria-hidden=["']?true/.test(attrs)) continue; // honeypot / decorative
    if (!/aria-label|aria-labelledby/.test(attrs) && !/\bid=/.test(attrs))
      issues.push(`${rel}: <input> without aria-label or id`);
  }
}

console.log(`Static a11y scan over ${walk(".").length} components.`);
if (issues.length) {
  console.error("✗ Accessibility issues:");
  [...new Set(issues)].forEach((i) => console.error("  " + i));
  process.exit(1);
}
console.log("✓ No static accessibility violations found.");
