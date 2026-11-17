"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, onReady, prefersReducedMotion, ScrollTrigger, SplitText } from "@/lib/motion";

// One client wrapper animates a whole server-rendered page through data attributes:
//   data-hero        headline characters rise and tilt in when the page opens
//   data-hero-fade   fades up after the headline
//   data-rv          fades up when scrolled into view
//   data-rv-lines    lines rise out of masks when scrolled into view
//   data-rv-words    words light up one by one while scrolling (scrubbed)
//   data-rv-line     a rule draws itself from left to right (scrubbed)
//   data-parallax=n  drifts vertically by n * 100px while scrolling
//   data-spot        a card whose glow and border follow the pointer
//   data-hscroll     on desktop, a pinned section whose [data-hscroll-track] scrolls sideways
export default function Motion({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const reduce = prefersReducedMotion();
    let heroChars: Element[] = [];
    const ctx = gsap.context(() => {
      // ---- hero ----
      const heroSplits = gsap.utils.toArray<HTMLElement>("[data-hero]").map(
        (h) => new SplitText(h, { type: "chars,lines", mask: "lines", aria: "auto" }),
      );
      heroSplits.forEach((s) => s.chars.forEach((c) => c.closest(".text-gradient") && c.classList.add("text-gradient-char")));
      heroChars = heroSplits.flatMap((s) => s.chars);
      if (!reduce) {
        gsap.set(heroChars, { yPercent: 115, rotate: 7 });
        gsap.set("[data-hero-fade]", { opacity: 0, y: 18 });
      }

      if (reduce) return;

      // ---- scroll reveals ----
      if (el.querySelector("[data-rv]")) gsap.set("[data-rv]", { opacity: 0, y: 40 });
      ScrollTrigger.batch(gsap.utils.toArray<HTMLElement>("[data-rv]"), {
        start: "top 90%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.06, overwrite: true }),
      });

      gsap.utils.toArray<HTMLElement>("[data-rv-lines]").forEach((t) => {
        const s = new SplitText(t, { type: "lines", mask: "lines", aria: "auto" });
        gsap.from(s.lines, { yPercent: 110, duration: 1.2, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: t, start: "top 88%" } });
      });

      gsap.utils.toArray<HTMLElement>("[data-rv-words]").forEach((t) => {
        // Words stay real text for screen readers (no aria-label on a <p>), and the dim start still passes 3:1 contrast for large text.
        const s = new SplitText(t, { type: "words", aria: "none" });
        gsap.fromTo(
          s.words,
          { opacity: 0.4 },
          { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: t, start: "top 80%", end: "bottom 50%", scrub: true } },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-rv-line]").forEach((l) =>
        gsap.fromTo(l, { scaleX: 0 }, { scaleX: 1, ease: "none", transformOrigin: "left", scrollTrigger: { trigger: l, start: "top 95%", end: "top 55%", scrub: true } }),
      );

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((p) =>
        gsap.to(p, {
          y: () => Number(p.dataset.parallax) * -100,
          ease: "none",
          scrollTrigger: { trigger: p, start: "top bottom", end: "bottom top", scrub: true },
        }),
      );

      // ---- horizontal chapters (desktop only) ----
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-hscroll]").forEach((sec) => {
          const track = sec.querySelector<HTMLElement>("[data-hscroll-track]");
          if (!track) return;
          const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
          gsap.to(track, {
            x: () => -dist(),
            ease: "none",
            scrollTrigger: { trigger: sec, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
          });
        });
      });
    }, el);

    // The hero plays once the preloader (first visit) or the page curtain (later visits) is out of the way.
    const stop = onReady(() => {
      if (reduce) return;
      gsap.to(heroChars, {
        yPercent: 0,
        rotate: 0,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.018,
        delay: 0.35,
      });
      gsap.to(el.querySelectorAll("[data-hero-fade]"), { opacity: 1, y: 0, duration: 1.2, ease: "expo.out", stagger: 0.07, delay: 0.75 });
    });

    // Spotlight cards: CSS reads --x / --y.
    const spot = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>("[data-spot]");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--x", `${e.clientX - r.left}px`);
      card.style.setProperty("--y", `${e.clientY - r.top}px`);
    };
    el.addEventListener("pointermove", spot);

    document.fonts.ready.then(() => ScrollTrigger.refresh());
    return () => {
      stop();
      el.removeEventListener("pointermove", spot);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
