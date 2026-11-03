"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

// Lenis drives the scroll; GSAP's ticker drives Lenis, so ScrollTrigger and the smooth scroll stay in sync.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // With reduced motion the scroll stays smooth but snappier (less glide).
    const lenis = new Lenis({ lerp: prefersReducedMotion() ? 0.2 : 0.085, wheelMultiplier: 1, touchMultiplier: 1.2 });
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
