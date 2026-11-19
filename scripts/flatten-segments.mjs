// Next.js 16 static export writes per-segment prefetch files as folders (work/__next.work/__PAGE__.txt),
// but the client router requests them with dots (work/__next.work.__PAGE__.txt). On a static host the
// requests 404 and Next falls back to the full payload. Copy each file to the dotted name the client asks for.
import { copyFileSync, existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = "out";
let copied = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory()) continue;
    if (name.startsWith("__next.")) flatten(dir, p);
    else walk(p);
  }
}

function flatten(pageDir, segDir) {
  for (const name of readdirSync(segDir)) {
    const p = join(segDir, name);
    if (statSync(p).isDirectory()) {
      flatten(pageDir, p);
      continue;
    }
    const flat = join(pageDir, relative(pageDir, p).split(sep).join("."));
    if (!existsSync(flat)) {
      copyFileSync(p, flat);
      copied++;
    }
  }
}

walk(OUT);
console.log(`flatten-segments: ${copied} prefetch files copied to their dotted names`);

// One root layout renders <html lang="en">. Every Arabic page's static HTML (out/ar/**/index.html) must say
// lang="ar" dir="rtl" for search engines and screen readers; the root layout has suppressHydrationWarning, and
// LangSync handles client navigation.
function arabicPages(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return name.startsWith("__next.") ? [] : arabicPages(p);
    return name === "index.html" ? [p] : [];
  });
}

const AR = join(OUT, "ar");
if (existsSync(AR)) {
  const files = arabicPages(AR);
  for (const file of files) {
    const html = readFileSync(file, "utf8");
    const fixed = html.replace(/<html lang="en"/, '<html lang="ar" dir="rtl"');
    if (fixed === html) throw new Error(`flatten-segments: <html lang="en" not found in ${file}`);
    writeFileSync(file, fixed);
  }
  console.log(`flatten-segments: ${files.length} Arabic pages set to lang=ar dir=rtl`);
}
