# Maher Almashharawi — Portfolio

**Live:** https://devmaheremad.com

![devmaheremad.com](src/app/opengraph-image.png)

Personal site of a Senior Frontend Engineer (React, Next.js, TypeScript). A static Next.js export with a WebGL hero,
smooth scrolling and scroll-driven animation, kept fast: Lighthouse 90+ performance and 100 accessibility, best practices and SEO.

## What's inside
- **WebGL hero** (React Three Fiber + drei): a glass knot with `MeshTransmissionMaterial` refracting the name behind it.
  It follows the pointer; press and hold to "overdrive" it, then the page scrolls to the work.
  Browsers without a real GPU (SwiftShader or llvmpipe, as in Lighthouse or PageSpeed Insights) get a CSS version of the scene instead.
  The scene only renders while the hero is on screen.
- **Light and dark themes:** every colour is a CSS variable (`src/app/globals.css`), so one switch re-themes the page,
  the WebGL scene included. Dark is the site's look: every first visit is dark, and a visitor who switches to light
  keeps it (saved). A script in `<head>` sets the theme before the first paint (no flash), and the switch reveals the new theme in a circle that spreads from
  the button (View Transitions API; a cross-fade with "reduce motion").
- **Preloader as a build:** a layout grid drops in and the "M." mark (Syne's own glyph outlines) draws itself in CSS
  from the first paint; then the mark fills with the progress while a build log ticks off, and the page opens through
  the dot. Later visits in the same tab get a short version; "reduce motion" keeps the fill and fades the page in.
- **Sound design, made in code** (`src/lib/sound.ts`): every sound is synthesized with the Web Audio API, so there are
  no audio files to download or license. On by default: it starts by itself as the page opens where the browser allows
  sound without a gesture, otherwise with the visitor's first click, tap or key press (most browsers allow no sound
  before that; a note under the switch then says to click anywhere, or to mute it), and the "Sound" switch in the bar
  (a speaker that shows waves or a cross) mutes it (saved). One palette
  (A minor pentatonic, soft sines and glassy FM bells in a short reverb) over a barely audible ambient bed of pure sines
  that brightens a little in the light theme. Hover ticks and click taps, a soft breath of air that follows the scroll
  speed, a cue per homepage section
  (`data-sound`), a pluck per store in the gallery, a bell per section on inner pages, whooshes for the menu and the
  page curtain, a shimmer for the theme switch, and a rising tone for the hero's press & hold.
- **Motion:** GSAP (ScrollTrigger, SplitText) driven by Lenis smooth scroll on one ticker. Pinned horizontal gallery,
  scroll-scrubbed word reveal, velocity-skewed marquee, magnetic buttons, a custom blend-mode cursor, and bar links
  that decode like code on hover.
- **Content** lives in `src/content/site.ts` and comes from the CV only.
- **Two languages:** every page exists in English and in Arabic under `/ar/` (right-to-left, Arabic fonts). Pages are
  built once (`src/views/`, and the homepage sections in `src/components/`) and rendered per language, so both languages
  have the same sections and design; the Arabic text is in `src/content/stories.ar.ts` and `ar.ts`.
- **Static export** (`output: "export"`), deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Run locally
```bash
npm install
npm run dev
```

## Scripts
- `python scripts/capture.py [name ...]` refreshes the project screenshots in `public/work/` with headless Edge.
- `scripts/brand/` holds the HTML sources of the link previews (`og-en.html`, `og-ar.html`) and the "M." icon
  (`icon.html`, `icon-square.html` for Apple). Render them with headless Edge at 1200×630 or 512×512; the icon becomes
  `src/app/favicon.ico` (16, 32, 48), `src/app/icon.png` (192) and `src/app/apple-icon.png` (180, from the square one).

## Stack
Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Three.js · React Three Fiber · drei · GSAP · Lenis

---

**Maher Almashharawi** · Senior Frontend Engineer (React, Next.js, TypeScript)
[devmaheremad.com](https://devmaheremad.com) · [Case studies](https://devmaheremad.com/case-studies/) · [LinkedIn](https://www.linkedin.com/in/devmaheremad) · hello@devmaheremad.com
