"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import { caseStudiesLong, companies, stories, strengths } from "@/content/stories";

const ROWS = [
  { href: "/work/", title: "Chapters", note: `${companies.length} companies, told one by one`, count: companies.length },
  { href: "/case-studies/", title: "Case studies", note: "The long versions, step by step", count: caseStudiesLong.length },
  { href: "/strengths/", title: "Strengths", note: "Each one backed by stories", count: strengths.length },
  { href: "/decisions/", title: "Decisions", note: "Calls I'd make again, and the hard ones", count: stories.filter((s) => s.decision).length },
  { href: "/stories/", title: "Stories", note: "Every story, filterable", count: stories.length },
];

export default function GoDeeper() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gd-row").forEach((row) =>
        gsap.from(row.querySelectorAll(".gd-in"), {
          yPercent: 100,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.05,
          scrollTrigger: { trigger: row, start: "top 92%", once: true },
        }),
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="go-deeper" className="px-5 py-[16vh] sm:px-10">
      <p className="eyebrow mb-6">( 06 ) — Go deeper</p>
      <h2 className="mb-16 font-display text-[clamp(3rem,9vw,9rem)] font-extrabold leading-[0.85] tracking-tighter">
        The long <span className="text-gradient">version.</span>
      </h2>
      <ul className="border-t border-line">
        {ROWS.map((r, i) => (
          <li key={r.href} className="gd-row overflow-hidden border-b border-line">
            <Link href={r.href} data-transition={r.title} data-cursor="Open" className="sweep group flex items-center gap-4 px-2 py-7 sm:gap-8 sm:px-4 sm:py-9">
              <span className="gd-in eyebrow w-8 shrink-0 transition-colors duration-500 group-hover:text-bg/70">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0 flex-1 font-display text-[clamp(1.9rem,5vw,4.6rem)] font-extrabold leading-none tracking-tight transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-3">
                <span className="gd-in block">{r.title}</span>
              </span>
              <span className="gd-in hidden text-right text-sm opacity-70 md:block md:w-72">{r.note}</span>
              <span className="gd-in w-12 text-right font-display text-2xl font-bold tabular-nums">{String(r.count).padStart(2, "0")}</span>
              <span className="text-2xl transition-transform duration-500 group-hover:-rotate-45">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
