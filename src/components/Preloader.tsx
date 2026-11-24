"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, READY_EVENT } from "@/lib/motion";
import { isArPath } from "@/lib/i18n";

// The "M." mark in Syne 800, the site's display font (the same glyphs as the favicon), as SVG paths:
// the M from x 0 to 1440 with its baseline at y 640 (drawn from its bottom-left corner), then the square dot.
const M_PATH = "M0 640V0H250L719 486L1190 0H1440V640H1190V312L870 640H570L250 314V640Z";
const DOT = { x: 1560, y: 489, w: 254, h: 151 };
const VIEW = { x: -30, y: -30, w: 1874, h: 700 };
const SPIN = "⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏";

const T = {
  en: {
    status: "Loading",
    name: "Maher Almashharawi",
    role: "Senior Frontend Engineer",
    steps: ["compiling components", "hydrating interactions", "tuning core web vitals", "rendering the experience"],
  },
  ar: {
    status: "جارٍ التحميل",
    name: "ماهر المشهراوي",
    role: "مهندس برمجيات أول",
    steps: ["تجميع المكوّنات", "تفعيل التفاعل", "ضبط مؤشرات الأداء", "عرض التجربة"],
  },
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// The page loads like a build: a layout grid drops in and the "M." outline draws itself (CSS, from the first paint);
// then the mark fills with the progress while a build log ticks off, the dot lands, and the page opens through the dot.
export default function Preloader() {
  const isAr = isArPath(usePathname());
  const t = isAr ? T.ar : T.en;
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const fill = useRef<SVGRectElement>(null);
  const scan = useRef<SVGLineElement>(null);
  const dot = useRef<SVGRectElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const steps = useRef<(HTMLLIElement | null)[]>([]);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const el = root.current!;
    const rtl = isArPath(location.pathname);
    const quick = html.classList.contains("pl-quick");
    const calm = prefersReducedMotion();
    try {
      sessionStorage.setItem("pl-seen", "1");
    } catch {}
    const ready = () => {
      (window as Window & { __siteReady?: boolean }).__siteReady = true;
      window.dispatchEvent(new Event(READY_EVENT));
    };
    const done = () => {
      html.classList.remove("is-loading");
      ready();
    };
    html.classList.add("is-loading");
    window.scrollTo(0, 0);

    // Progress p from 0 to 1: the counter, the bar, the fill rising inside the M with a scan line on its edge, and the
    // build log (each step is pending, running with a spinner, or done with a check, by quarter).
    const status = [0, 0, 0, 0];
    const state = { p: 0 };
    const render = () => {
      const p = state.p;
      const y = String(640 - 640 * p);
      count.current!.textContent = String(Math.round(p * 100)).padStart(3, "0");
      bar.current!.style.transform = `scaleX(${p})`;
      fill.current!.setAttribute("y", y);
      fill.current!.setAttribute("height", String(640 * p + 40));
      scan.current!.setAttribute("y1", y);
      scan.current!.setAttribute("y2", y);
      scan.current!.style.opacity = p > 0.01 && p < 0.99 ? "1" : "0";
      steps.current.forEach((li, i) => {
        if (!li) return;
        const s = p >= (i + 1) / 4 ? 2 : p >= i / 4 ? 1 : 0;
        const icon = li.firstElementChild as HTMLElement;
        if (s === 1) icon.textContent = SPIN[Math.floor(performance.now() / 80) % SPIN.length];
        if (s === status[i]) return;
        // The line types itself in: its clip opens in steps, one per letter.
        if (status[i] === 0) gsap.to(li, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 0.3, ease: `steps(${li.textContent!.length})` });
        if (s === 2) icon.textContent = "✓";
        li.classList.add("text-ink");
        status[i] = s;
      });
    };

    // The page opens through the dot: a hole the size of the dot grows until it is the whole screen.
    const hole = { t: 0 };
    let from = { l: 0, t: 0, r: 0, b: 0 };
    const cut = () => {
      const x1 = lerp(from.l, -2, hole.t);
      const y1 = lerp(from.t, -2, hole.t);
      const x2 = lerp(from.r, window.innerWidth + 2, hole.t);
      const y2 = lerp(from.b, window.innerHeight + 2, hole.t);
      el.style.clipPath = `polygon(evenodd, 0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${x1}px ${y1}px, ${x2}px ${y1}px, ${x2}px ${y2}px, ${x1}px ${y2}px, ${x1}px ${y1}px)`;
    };

    // With "reduce motion" the build still plays (a fill, a log, a counter: nothing travels across the screen), but
    // the page fades in instead of opening through the dot.
    const tl = gsap.timeline({ paused: true });
    const outs = el.querySelectorAll(".pl-out");
    const open = quick ? 0.85 : 1.05;
    gsap.set(steps.current, { clipPath: rtl ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)", opacity: 0 });
    tl.to(state, { p: 1, duration: quick ? 0.55 : 1.5, ease: "power2.inOut", onUpdate: render })
      .add(() => dot.current!.classList.add("is-in"), "-=0.12")
      .addLabel("exit", quick ? "+=0.3" : "+=0.45");
    if (calm) {
      tl.to(el, { opacity: 0, duration: 0.6, ease: "power1.inOut" }, "exit").add(done, "exit+=0.2");
    } else {
      tl.to(outs, { yPercent: -110, opacity: 0, duration: 0.45, ease: "expo.in", stagger: 0.03 }, "exit")
        .add(() => {
          const r = dot.current!.getBoundingClientRect();
          from = { l: r.left, t: r.top, r: r.right, b: r.bottom };
          cut();
        }, "exit+=0.2")
        .to(hole, { t: 1, duration: open, ease: "expo.inOut", onUpdate: cut }, "exit+=0.2")
        .to(mark.current, { scale: 1.18, duration: open, ease: "expo.inOut" }, "<")
        .add(done, "<0.45");
    }
    tl.add(() => setGone(true));

    // Start once the fonts are in (2.5s at most), so the first frame of the site is its final look.
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      tl.play();
    };
    document.fonts.ready.then(start);
    const fallback = window.setTimeout(start, 2500);
    return () => {
      window.clearTimeout(fallback);
      tl.kill();
      html.classList.remove("is-loading");
    };
  }, []);

  if (gone) return null;
  const origin = `${((DOT.x + DOT.w / 2 - VIEW.x) / VIEW.w) * 100}% ${((DOT.y + DOT.h / 2 - VIEW.y) / VIEW.h) * 100}%`;
  return (
    <div ref={root} data-preloader role="status" aria-label={t.status} className="fixed inset-0 z-[70] overflow-hidden bg-bg-2 text-ink">
      {/* A layout grid, as in a design tool: 4 columns on phones, 12 from tablets up. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grid grid-cols-4 gap-x-4 px-5 sm:px-10 md:grid-cols-12 md:gap-x-6">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className={`pl-col h-full bg-ink/[.025] ${i >= 4 ? "hidden md:block" : ""}`} style={{ animationDelay: `${i * 0.045}s` }} />
        ))}
      </div>

      <div aria-hidden className="absolute inset-x-0 top-0 flex items-start justify-between gap-6 px-5 pt-6 sm:px-10 sm:pt-8">
        <span className="pl-out block overflow-hidden">
          <span className={`pl-rise block eyebrow ${isAr ? "font-ar" : ""}`}>{t.name}</span>
        </span>
        <span className="pl-out block overflow-hidden text-end">
          <span className={`pl-rise block eyebrow ${isAr ? "font-ar" : ""}`} style={{ animationDelay: "0.22s" }}>
            {t.role}
            {/* The Arabic title always sits next to the English one. */}
            {isAr && (
              <span lang="en" className="block font-mono">
                {T.en.role}
              </span>
            )}
          </span>
        </span>
      </div>

      <div aria-hidden className="absolute inset-0 grid place-items-center">
        <div ref={mark} style={{ transformOrigin: origin }}>
          <svg viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} className="block w-[clamp(170px,30vw,360px)] overflow-visible">
            <defs>
              <linearGradient id="pl-line" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1814" y2="0">
                <stop offset="0" style={{ stopColor: "var(--cyan)" }} />
                <stop offset="1" style={{ stopColor: "var(--violet)" }} />
              </linearGradient>
              <linearGradient id="pl-dot" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" style={{ stopColor: "var(--cyan)" }} />
                <stop offset="1" style={{ stopColor: "var(--violet)" }} />
              </linearGradient>
              <clipPath id="pl-fill">
                <rect ref={fill} x={VIEW.x} y="640" width={VIEW.w} height="0" />
              </clipPath>
            </defs>
            <path className="pl-outline" d={M_PATH} pathLength={1} fill="none" stroke="url(#pl-line)" strokeWidth={10} />
            <path d={M_PATH} fill="currentColor" clipPath="url(#pl-fill)" />
            <line ref={scan} x1="-60" x2="1500" y1="640" y2="640" stroke="url(#pl-line)" strokeWidth={10} style={{ opacity: 0 }} />
            <rect ref={dot} className="pl-dot" x={DOT.x} y={DOT.y} width={DOT.w} height={DOT.h} fill="url(#pl-dot)" />
          </svg>
        </div>
      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 px-5 pb-7 sm:px-10 sm:pb-9">
        <div className="pl-log pl-out font-mono text-[0.7rem] leading-6 text-muted sm:text-xs">
          <p lang="en" dir="ltr" className={`pl-rise ${isAr ? "text-end" : ""}`}>
            <span className="text-ink">▲ next build</span>
            <span className="pl-caret ms-1.5 inline-block h-3 w-1.5 translate-y-0.5 bg-cyan" />
          </p>
          <ol>
            {t.steps.map((s, i) => (
              <li
                key={s}
                ref={(n) => {
                  steps.current[i] = n;
                }}
                className={`flex gap-2.5 whitespace-nowrap transition-colors duration-300 ${isAr ? "font-ar" : ""}`}
                style={{ opacity: 0 }}
              >
                <span lang="en" className="inline-block w-3 text-cyan">
                  ○
                </span>
                {s}
              </li>
            ))}
          </ol>
        </div>
        <span className="pl-out block overflow-hidden">
          <span
            ref={count}
            dir="ltr"
            className="pl-rise block font-display text-[clamp(3.2rem,9vw,7.5rem)] font-extrabold leading-[0.85] tabular-nums tracking-tight"
            style={{ animationDelay: "0.3s" }}
          >
            000
          </span>
        </span>
      </div>

      <div aria-hidden className="pl-out absolute inset-x-0 bottom-0 h-px bg-line">
        <div ref={bar} className={`h-full w-full bg-gradient-to-r from-cyan to-violet ${isAr ? "origin-right" : "origin-left"}`} style={{ transform: "scaleX(0)" }} />
      </div>
    </div>
  );
}
