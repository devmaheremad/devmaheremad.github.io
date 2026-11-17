// Next.js 16 static export writes per-segment prefetch files as folders (work/__next.work/__PAGE__.txt),
// but the client router requests them with dots (work/__next.work.__PAGE__.txt). On a static host the
// requests 404 and Next falls back to the full payload. Copy each file to the dotted name the client asks for.
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
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
