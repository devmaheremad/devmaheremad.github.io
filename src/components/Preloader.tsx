"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, READY_EVENT } from "@/lib/motion";

// Counter 000 → 100 while fonts load, then two panels split away and the intro plays.
export default function Preloader() {

  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const ready = () => {
      (window as Window & { __siteReady?: boolean }).__siteReady = true;
      window.dispatchEvent(new Event(READY_EVENT));
    };
    const html = document.documentElement;
    html.classList.add("is-loading");
    window.scrollTo(0, 0);
    const state = { n: 0 };
    const tl = gsap.timeline({ paused: true });
    tl.to(state, {
      n: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        count.current!.textContent = String(Math.round(state.n)).padStart(3, "0");
        bar.current!.style.transform = `scaleX(${state.n / 100})`;
      },
    })
      .to(".pl-meta", { opacity: 0, y: -12, duration: 0.4, stagger: 0.05 }, "+=0.15")
      .to(".pl-top", { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "<0.1")
      .to(".pl-bottom", { yPercent: 100, duration: 1.1, ease: "expo.inOut" }, "<")
      .add(() => {
        html.classList.remove("is-loading");
        ready();
      }, "<0.45")
      .add(() => setGone(true));
    document.fonts.ready.then(() => tl.play());
    return () => {
      tl.kill();
      html.classList.remove("is-loading");
    };
  }, []);

  if (gone) return null;
  return (
    <div ref={root} role="status" aria-label="Loading" className="fixed inset-0 z-[70] pointer-events-auto">
      <div className="pl-top absolute inset-x-0 top-0 h-1/2 bg-bg-2" />
      <div className="pl-bottom absolute inset-x-0 bottom-0 h-1/2 bg-bg-2" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        <span ref={count} className="pl-meta font-display text-[clamp(4rem,14vw,11rem)] font-extrabold leading-none tabular-nums">
          000
        </span>
        <div className="pl-meta h-px w-[min(60vw,420px)] bg-line overflow-hidden">
          <div ref={bar} className="h-full w-full origin-left bg-gradient-to-r from-cyan to-violet" style={{ transform: "scaleX(0)" }} />
        </div>
        <span className="pl-meta eyebrow">Compiling the experience</span>
      </div>
    </div>
  );
}
