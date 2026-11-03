"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import { manifesto } from "@/content/site";

// Words light up one by one as the paragraph scrolls through the viewport.
export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mf-word",
        { color: "#5f5f6b" },
        {
          color: "#ecebe6",
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: ".mf-text", start: "top 75%", end: "bottom 45%", scrub: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="px-5 py-[22vh] sm:px-10">
      <p className="eyebrow mb-10">( 01 ) — In short</p>
      <p className="mf-text max-w-[22ch] font-display text-[clamp(2rem,5.4vw,5.6rem)] font-bold leading-[1.02] tracking-tight sm:max-w-[26ch]">
        {manifesto.split(" ").map((w, i) => (
          <span key={i} className="mf-word reveal-word">
            {w}&nbsp;
          </span>
        ))}
      </p>
    </section>
  );
}
