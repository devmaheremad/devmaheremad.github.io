"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import { caseStudiesLong, companies, stories, strengths } from "@/content/stories";
import { localePath, type Lang } from "@/lib/i18n";

const COUNTS = {
  work: companies.length,
  cases: caseStudiesLong.length,
  strengths: strengths.length,
  decisions: stories.filter((s) => s.decision).length,
  stories: stories.length,
};

const T = {
  en: {
    label: "Go deeper",
    h2: ["The long ", "version."],
    cursor: "Open",
    arrow: "→",
    rows: [
      { href: "/work/", title: "Chapters", note: `${COUNTS.work} companies, told one by one`, count: COUNTS.work },
      { href: "/case-studies/", title: "Case studies", note: "The long versions, step by step", count: COUNTS.cases },
      { href: "/strengths/", title: "Strengths", note: "Each one backed by stories", count: COUNTS.strengths },
      { href: "/decisions/", title: "Decisions", note: "Calls I'd make again, and the hard ones", count: COUNTS.decisions },
      { href: "/stories/", title: "Stories", note: "Every story, filterable", count: COUNTS.stories },
    ],
  },
  ar: {
    label: "للتعمّق أكثر",
    h2: ["النسخة ", "الكاملة."],
    cursor: "افتح",
    arrow: "←",
    rows: [
      { href: "/work/", title: "الفصول", note: `${COUNTS.work} شركات، كل واحدة على حدة`, count: COUNTS.work },
      { href: "/case-studies/", title: "دراسات الحالة", note: "النسخ الكاملة، خطوة بخطوة", count: COUNTS.cases },
      { href: "/strengths/", title: "نقاط القوة", note: "لكل واحدة قصص تدعمها", count: COUNTS.strengths },
      { href: "/decisions/", title: "القرارات", note: "قرارات سأتخذها مجددًا، والصعبة منها", count: COUNTS.decisions },
      { href: "/stories/", title: "القصص", note: "كل القصص، مع التصفية", count: COUNTS.stories },
    ],
  },
};

export default function GoDeeper({ lang = "en" }: { lang?: Lang }) {
  const t = T[lang];
  const rtl = lang === "ar";
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
    <section ref={root} id="go-deeper" data-sound="go-deeper" className="px-5 py-[16vh] sm:px-10">
      <p className="eyebrow mb-6">( 06 ) — {t.label}</p>
      <h2 className="mb-16 font-display text-[clamp(3rem,9vw,9rem)] font-extrabold leading-[0.85] tracking-tighter">
        {t.h2[0]}
        <span className="text-gradient">{t.h2[1]}</span>
      </h2>
      <ul className="border-t border-line">
        {t.rows.map((r, i) => (
          <li key={r.href} className="gd-row overflow-hidden border-b border-line">
            <Link href={localePath(r.href, lang)} data-transition={r.title} data-cursor={t.cursor} className="sweep group flex items-center gap-4 px-2 py-7 sm:gap-8 sm:px-4 sm:py-9">
              <span className="gd-in eyebrow w-8 shrink-0 transition-colors duration-500 group-hover:text-bg/70">{String(i + 1).padStart(2, "0")}</span>
              <span
                className={`min-w-0 flex-1 font-display text-[clamp(1.9rem,5vw,4.6rem)] font-extrabold leading-none tracking-tight transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
                  rtl ? "group-hover:-translate-x-3" : "group-hover:translate-x-3"
                }`}
              >
                <span className="gd-in block">{r.title}</span>
              </span>
              <span className="gd-in hidden text-end text-sm opacity-70 md:block md:w-72">{r.note}</span>
              <span className="gd-in w-12 text-end font-display text-2xl font-bold tabular-nums">{String(r.count).padStart(2, "0")}</span>
              <span className={`text-2xl transition-transform duration-500 ${rtl ? "group-hover:rotate-45" : "group-hover:-rotate-45"}`}>{t.arrow}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
