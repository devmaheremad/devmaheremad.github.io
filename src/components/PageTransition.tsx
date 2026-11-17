"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

type LenisLike = { scrollTo: (t: number | string | HTMLElement, o?: object) => void; resize?: () => void };
const lenis = () => (window as Window & { __lenis?: LenisLike }).__lenis;

function scrollToHash(hash: string, immediate = false) {
  const el = hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
  if (!el) return;
  const l = lenis();
  if (l) l.scrollTo(el, { offset: -90, duration: 1.4, immediate });
  else el.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
}

// Internal links: a curtain covers the page, the route changes underneath, then the curtain lifts.
// Same-page #links scroll smoothly through Lenis instead of jumping.
export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const covering = useRef(false);
  const first = useRef(true);

  useEffect(() => {
    // Replace the server-rendered inline transform with GSAP's own, or the two would add up.
    gsap.set(curtain.current, { clearProps: "transform" });
    gsap.set(curtain.current, { yPercent: 100 });
    const click = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      // Next.js <Link> skips its own navigation when the event is already default-prevented.
      if (url.pathname === location.pathname) {
        if (url.hash) {
          e.preventDefault();
          history.pushState(null, "", url.hash);
          scrollToHash(url.hash);
        }
        return;
      }
      e.preventDefault();
      const to = url.pathname + url.search + url.hash;
      if (prefersReducedMotion() || covering.current) {
        router.push(to, { scroll: false });
        return;
      }
      covering.current = true;
      if (label.current) label.current.textContent = a.dataset.transition ?? (a.children.length ? "" : a.textContent?.trim().slice(0, 40) ?? "");
      // Navigate when the curtain is closed, or after 1.2s at the latest (animation frames can stall in background tabs).
      let gone = false;
      const go = () => {
        if (gone) return;
        gone = true;
        router.push(to, { scroll: false });
      };
      gsap.timeline()
        .set(curtain.current, { yPercent: 100 })
        .to(curtain.current, { yPercent: 0, duration: 0.7, ease: "expo.inOut" })
        .fromTo(label.current, { yPercent: 110 }, { yPercent: 0, duration: 0.6, ease: "expo.out" }, "-=0.35")
        .add(go);
      setTimeout(go, 1200);
    };
    document.addEventListener("click", click, true);
    return () => document.removeEventListener("click", click, true);
  }, [router]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      if (location.hash) setTimeout(() => scrollToHash(location.hash, true), 1800);
      return;
    }
    window.scrollTo(0, 0);
    lenis()?.scrollTo(0, { immediate: true, force: true });
    // Let the new page mount and register its ScrollTriggers before measuring.
    const id = requestAnimationFrame(() => {
      lenis()?.resize?.();
      ScrollTrigger.refresh();
      if (location.hash) setTimeout(() => scrollToHash(location.hash), 500);
    });
    if (covering.current) {
      gsap.timeline({ delay: 0.15, onComplete: () => void (covering.current = false) })
        .to(label.current, { yPercent: -110, duration: 0.4, ease: "expo.in" })
        .to(curtain.current, { yPercent: -100, duration: 0.85, ease: "expo.inOut" }, "-=0.1")
        .set(curtain.current, { yPercent: 100 });
    }
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <div ref={curtain} aria-hidden className="pointer-events-none fixed inset-0 z-[65] flex items-center justify-center bg-bg-2" style={{ transform: "translateY(100%)" }}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan to-violet" />
      <span className="overflow-hidden">
        <span ref={label} className="block font-display text-[clamp(2rem,6vw,5rem)] font-extrabold tracking-tight" />
      </span>
    </div>
  );
}
