import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const IGNORE = new Set(["node_modules", ".git", ".next", "playwright-report", "test-results"]);
const lines = [];
let fileCount = 0, dirCount = 0;

function walk(dir, depth = 0) {
  const entries = readdirSync(dir).sort((a, b) => {
    const ad = statSync(join(dir, a)).isDirectory(), bd = statSync(join(dir, b)).isDirectory();
    if (ad !== bd) return ad ? -1 : 1;
    return a.localeCompare(b);
  });
  for (const e of entries) {
    if (IGNORE.has(e)) continue;
    const p = join(dir, e);
    const isDir = statSync(p).isDirectory();
    lines.push("  ".repeat(depth) + (isDir ? `${e}/` : e));
    if (isDir) { dirCount++; walk(p, depth + 1); } else fileCount++;
  }
}
walk(".");
const header = `# GarageFloorToday v1.1 — Release Manifest
# Generated ${new Date().toISOString()} from the actual repository tree.
# ${fileCount} files across ${dirCount} directories (excludes node_modules, .next, .git).
# Compare your unzipped release against this list to confirm nothing is missing.

`;
writeFileSync("MANIFEST.txt", header + lines.join("\n") + "\n");
console.log(`Manifest: ${fileCount} files, ${dirCount} directories`);
