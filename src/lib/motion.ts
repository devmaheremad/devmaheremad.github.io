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

// Code-style text decode: the letters run through symbols and settle left to right. Edits the element's own text
// node, so React keeps owning it. Latin mono labels only (Arabic letters join, and scrambling would break them).
const GLYPHS = "<>/{}[]=+*_#01";
export function scramble(el: HTMLElement, duration = 420) {
  const node = el.firstChild;
  if (!node || node.nodeType !== Node.TEXT_NODE || prefersReducedMotion()) return;
  const text = (el.dataset.text ??= node.nodeValue ?? "");
  const start = performance.now();
  cancelAnimationFrame(Number(el.dataset.raf));
  const frame = (now: number) => {
    const k = Math.min(1, (now - start) / duration);
    const fixed = Math.floor(k * text.length);
    let out = text.slice(0, fixed);
    for (let i = fixed; i < text.length; i++) out += text[i] === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    node.nodeValue = out;
    if (k < 1) el.dataset.raf = String(requestAnimationFrame(frame));
  };
  el.dataset.raf = String(requestAnimationFrame(frame));
}
