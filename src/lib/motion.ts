"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

export const EASE = "expo.out";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// The preloader fires this once the intro can play.
export const READY_EVENT = "site:ready";

export function onReady(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  if ((window as Window & { __siteReady?: boolean }).__siteReady) {
    cb();
    return () => {};
  }
  window.addEventListener(READY_EVENT, cb, { once: true });
  return () => window.removeEventListener(READY_EVENT, cb);
}

export function scrollToId(id: string) {
  const lenis = (window as Window & { __lenis?: { scrollTo: (t: string, o?: object) => void } }).__lenis;
  if (lenis) lenis.scrollTo(`#${id}`, { duration: 1.6 });
  else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
