# Maher Almashharawi — Portfolio

**Live:** https://devmaheremad.github.io

Personal site of a Senior Frontend Engineer (React, Next.js, TypeScript). A static Next.js export with a WebGL hero,
smooth scrolling and scroll-driven animation, kept fast: Lighthouse 90+ performance and 100 accessibility, best practices and SEO.

## What's inside
- **WebGL hero** (React Three Fiber + drei): a glass knot with `MeshTransmissionMaterial` refracting the name behind it.
  It follows the pointer; press and hold to "overdrive" it, then the page scrolls to the work.
  Browsers without a real GPU (SwiftShader or llvmpipe, as in Lighthouse or PageSpeed Insights) get a CSS version of the scene instead.
  The scene only renders while the hero is on screen.
- **Motion:** GSAP (ScrollTrigger, SplitText) driven by Lenis smooth scroll on one ticker. Pinned horizontal gallery,
  scroll-scrubbed word reveal, velocity-skewed marquee, magnetic buttons and a custom blend-mode cursor.
- **Content** lives in `src/content/site.ts` and comes from the CV only.
- **Static export** (`output: "export"`), deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Run locally
```bash
npm install
npm run dev
```

## Scripts
- `python scripts/capture.py [name ...]` refreshes the project screenshots in `public/work/` with headless Edge.

## Stack
Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Three.js · React Three Fiber · drei · GSAP · Lenis
