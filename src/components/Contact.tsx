"use client";

import { useEffect, useRef } from "react";
import { gsap, scrollToId, SplitText } from "@/lib/motion";
import { profile } from "@/content/site";

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = new SplitText(".ct-title", { type: "chars,lines", mask: "lines", aria: "auto" });
      // background-clip text doesn't reach split characters, so each gradient character gets its own gradient
      split.chars.forEach((c) => c.closest(".text-gradient") && c.classList.add("text-gradient-char"));
      gsap.from(split.chars, {
        yPercent: 120,
        rotate: 8,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.02,
        scrollTrigger: { trigger: ".ct-title", start: "top 80%" },
      });
      gsap.from(".ct-in", {
        y: 30,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.07,
        scrollTrigger: { trigger: ".ct-title", start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} id="contact" className="relative overflow-hidden px-5 pb-10 pt-[18vh] sm:px-10">
      <div className="pointer-events-none absolute -bottom-1/2 left-1/2 h-[90vh] w-[90vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(76,195,255,.22),rgba(182,156,255,.12)_40%,transparent_70%)] blur-2xl" />
      <p className="ct-in eyebrow mb-8">( 06 ) — Contact</p>
      <h2 className="ct-title font-display text-[clamp(3.2rem,11vw,11.5rem)] font-extrabold leading-[0.88] tracking-tighter">
        Let&apos;s make it
        <br />
        <span className="text-gradient">fast.</span>
      </h2>
      <div className="mt-14 grid gap-10 md:grid-cols-2 md:items-end">
        <div>
          <p className="ct-in max-w-[44ch] text-lg leading-relaxed text-ink/80">
            {profile.role} · {profile.stackLine}. {profile.availability}.
          </p>
          <div className="ct-in mt-8 flex flex-wrap gap-4">
            <a
              href={`mailto:${profile.email}`}
              data-magnetic
              data-cursor="Write"
              className="rounded-full bg-ink px-7 py-4 font-medium text-bg transition-colors hover:bg-cyan"
            >
              {profile.email}
            </a>
            <a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              data-cursor="CV"
              className="rounded-full border border-line px-7 py-4 font-medium transition-colors hover:border-ink"
            >
              View CV ↗
            </a>
          </div>
        </div>
        <ul className="ct-in flex flex-wrap gap-x-8 gap-y-3 md:justify-end">
          {profile.links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="group relative font-display text-2xl font-bold">
                {l.label} ↗
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-ink transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-24 flex flex-col gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="eyebrow">Built with Next.js · React Three Fiber · GSAP</span>
        <button onClick={() => scrollToId("top")} className="eyebrow text-left sm:text-right">
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
