"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import { caseStudies } from "@/content/site";

const LABELS = [
  ["context", "Context"],
  ["challenge", "Challenge"],
] as const;

export default function CaseStudies() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".cs-item").forEach((item) => {
        gsap.from(item.querySelectorAll(".cs-in"), {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.05,
          scrollTrigger: { trigger: item, start: "top 85%" },
        });
        gsap.fromTo(
          item.querySelector(".cs-line"),
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { trigger: item, start: "top 90%", end: "top 40%", scrub: true } },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="case-studies" className="px-5 py-[16vh] sm:px-10">
      <p className="eyebrow mb-6">( 04 ) — Case studies</p>
      <h2 className="mb-16 font-display text-[clamp(3rem,9vw,9rem)] font-extrabold leading-[0.85] tracking-tighter">
        How I <span className="text-gradient">solved it.</span>
      </h2>
      <ol>
        {caseStudies.map((c, i) => (
          <li key={c.slug} id={`case-${c.slug}`} className="cs-item relative grid gap-8 py-12 md:grid-cols-12">
            <span className="cs-line absolute left-0 right-0 top-0 h-px origin-left bg-line" />
            <div className="md:col-span-5">
              <p className="cs-in eyebrow">Case {String(i + 1).padStart(2, "0")}</p>
              <h3 className="cs-in mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">{c.title}</h3>
              <p className="cs-in mt-5 text-lg leading-relaxed text-ink/90">
                <span className="text-gradient font-semibold">Outcome. </span>
                {c.outcome}
              </p>
              <div className="cs-in mt-6 flex flex-wrap gap-2">
                {c.stack.map((s) => (
                  <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-muted">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-6 md:col-span-6 md:col-start-7">
              {LABELS.map(([key, label]) => (
                <div key={key} className="cs-in">
                  <p className="eyebrow mb-2">{label}</p>
                  <p className="leading-relaxed text-ink/80">{c[key]}</p>
                </div>
              ))}
              <div className="cs-in">
                <p className="eyebrow mb-2">What I did</p>
                <ul className="space-y-3">
                  {c.did.map((d) => (
                    <li key={d} className="flex gap-4 leading-relaxed text-ink/80">
                      <span className="mt-[0.7em] h-px w-5 shrink-0 bg-gradient-to-r from-cyan to-violet" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="cs-in">
                <p className="eyebrow mb-2">Result</p>
                <p className="leading-relaxed text-ink/80">{c.result}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
