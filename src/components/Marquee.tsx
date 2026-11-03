"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";
import { stack } from "@/content/site";

// Two endless rows of the stack. Scroll speed pushes them faster and skews them.
export default function Marquee() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const calm = prefersReducedMotion();
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".mq-track");
      const loops = rows.map((row, i) =>
        gsap.to(row, { xPercent: i % 2 ? 0 : -50, startAt: { xPercent: i % 2 ? -50 : 0 }, duration: calm ? 90 : 38, ease: "none", repeat: -1 }),
      );
      const skew = gsap.quickTo(rows, "skewX", { duration: 0.5, ease: "power3" });
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          if (calm) return;
          const v = self.getVelocity();
          loops.forEach((l) => l.timeScale(1 + Math.min(Math.abs(v) / 250, 6)));
          skew(gsap.utils.clamp(-10, 10, v / -120));
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const row = (key: string, outlined: boolean) => (
    <div key={key} className="mq-track marquee-track">
      {[...stack, ...stack].map((s, i) => (
        <span
          key={i}
          className={`whitespace-nowrap px-6 font-display text-[clamp(2.4rem,6vw,5.6rem)] font-extrabold uppercase leading-[1.1] tracking-tight ${
            outlined ? "text-transparent [-webkit-text-stroke:1px_rgba(236,235,230,.45)]" : ""
          }`}
        >
          {s}
          <span className="px-6 text-gradient">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <section ref={root} aria-label="Tech stack" className="overflow-hidden py-16">
      {row("a", false)}
      {row("b", true)}
    </section>
  );
}
