"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap, onReady, scrollToId, SplitText } from "@/lib/motion";
import { profile } from "@/content/site";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const HOLD_SECONDS = 1.6;

// Live WebGL only with a real GPU. Software renderers (SwiftShader, llvmpipe: headless browsers, Lighthouse,
// PageSpeed Insights, very old machines) get a CSS version of the scene instead, which costs almost nothing.
let webglSupport: boolean | undefined;
function hasWebGL() {
  if (webglSupport === undefined) {
    try {
      const c = document.createElement("canvas");
      const gl = (c.getContext("webgl2") || c.getContext("webgl")) as WebGLRenderingContext | null;
      const ext = gl?.getExtension("WEBGL_debug_renderer_info");
      const renderer = gl && ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : "";
      // WARP ("Microsoft Basic Render Driver") is a CPU renderer too, but fast enough on real machines: keep it.
      webglSupport = !!gl && !/swiftshader|llvmpipe/i.test(renderer);
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}
const noSubscribe = () => () => {};

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const power = useRef(0);
  const ring = useRef<SVGCircleElement>(null);
  const [active, setActive] = useState(true);
  const webgl = useSyncExternalStore(noSubscribe, hasWebGL, () => false);

  // Only render the WebGL scene while the hero is on screen.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0 });
    if (section.current) io.observe(section.current);
    return () => io.disconnect();
  }, []);

  // Intro: lines rise out of their masks once the preloader is gone.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = new SplitText(".hero-line", { type: "lines", mask: "lines", linesClass: "line", aria: "none" });
      gsap.set(split.lines, { yPercent: 110 });
      gsap.set(".hero-fade", { opacity: 0, y: 16 });
      return onReady(() => {
        gsap.to(split.lines, { yPercent: 0, duration: 1.4, ease: "expo.out", stagger: 0.08 });
        gsap.to(".hero-fade", { opacity: 1, y: 0, duration: 1.2, ease: "expo.out", stagger: 0.06, delay: 0.4 });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  // Press & hold: power rises to 1, the glass overdrives, then the page dives into the work.
  useEffect(() => {
    const el = section.current!;
    let holding = false;
    let fired = false;
    const tick = (_t: number, dtMs: number) => {
      const dt = dtMs / 1000;
      power.current = holding
        ? Math.min(1, power.current + dt / HOLD_SECONDS)
        : Math.max(0, power.current - dt * 1.8);
      if (ring.current) ring.current.style.strokeDashoffset = String(126 * (1 - power.current));
      if (holding && power.current >= 1 && !fired) {
        fired = true;
        holding = false;
        scrollToId("work");
      }
    };
    const down = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a,button")) return;
      holding = true;
      fired = false;
    };
    const up = () => void (holding = false);
    gsap.ticker.add(tick);
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      gsap.ticker.remove(tick);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <section
      ref={section}
      id="top"
      data-cursor="Hold"
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden select-none"
    >
      <div className="absolute inset-0">
        {webgl ? (
          <HeroScene power={power} active={active} />
        ) : (
          <div className="absolute inset-0 grid place-items-center overflow-hidden" aria-hidden>
            <div className="text-center font-display font-extrabold leading-[0.82] tracking-tight">
              <span className="block text-[clamp(3.4rem,19vw,22rem)] text-ink">MAHER</span>
              <span className="block text-[clamp(1.5rem,8vw,9rem)] text-cyan">FRONTEND</span>
            </div>
            <div className="hero-orb absolute h-[min(46vmin,520px)] w-[min(46vmin,520px)]" />
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between px-5 pb-8 pt-28 sm:px-10 sm:pb-10">
        <div className="flex items-start justify-between gap-6">
          <p className="hero-line max-w-[22ch] font-display text-[clamp(1.4rem,2.6vw,2.3rem)] font-bold leading-[1.05]">
            {profile.role}
          </p>
          <p className="hero-fade eyebrow hidden text-right sm:block">
            {profile.location}
            <br />
            Remote · Open to relocation
          </p>
        </div>

        <div className="flex items-end justify-between gap-6">
          <p className="hero-fade max-w-[34ch] text-[0.95rem] leading-relaxed text-ink/75 sm:text-base">{profile.intro}</p>
          <div className="hero-fade flex items-center gap-4">
            <svg width="46" height="46" viewBox="0 0 46 46" className="-rotate-90" aria-hidden>
              <circle cx="23" cy="23" r="20" fill="none" stroke="rgba(236,235,230,.18)" strokeWidth="1.5" />
              <circle
                ref={ring}
                cx="23"
                cy="23"
                r="20"
                fill="none"
                stroke="url(#hold)"
                strokeWidth="2"
                strokeDasharray="126"
                strokeDashoffset="126"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="hold" x1="0" x2="1">
                  <stop offset="0" stopColor="#4cc3ff" />
                  <stop offset="1" stopColor="#b69cff" />
                </linearGradient>
              </defs>
            </svg>
            <span className="eyebrow leading-tight">
              Press &amp; hold
              <br />
              to dive in
            </span>
          </div>
        </div>
      </div>
      <h1 className="sr-only">
        {profile.name}, {profile.role}
      </h1>
    </section>
  );
}
