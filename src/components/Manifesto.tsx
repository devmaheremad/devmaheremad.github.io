"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import type { Lang } from "@/lib/i18n";

// Words light up one by one as the paragraph scrolls through the viewport (whole words, so Arabic stays joined).
export default function Manifesto({ text, lang = "en" }: { text: string; lang?: Lang }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Each word mixes from --dim to --ink (globals.css, .mf-word), so the effect works in both themes.
      gsap.fromTo(
        ".mf-word",
        { "--lit": 0 },
        {
          "--lit": 1,
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
      <p className="eyebrow mb-10">( 01 ) — {lang === "ar" ? "باختصار" : "In short"}</p>
      <p className="mf-text max-w-[22ch] font-display text-[clamp(2rem,5.4vw,5.6rem)] font-bold leading-[1.02] tracking-tight sm:max-w-[26ch]">
        {text.split(" ").map((w, i) => (
          <span key={i} className="mf-word reveal-word">
            {w}&nbsp;
          </span>
        ))}
      </p>
    </section>
  );
}
