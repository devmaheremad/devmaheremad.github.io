"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import { localePath, type Lang } from "@/lib/i18n";

type CaseStudy = {
  slug: string;
  title: string;
  outcome: string;
  context: string;
  challenge: string;
  did: string[];
  result: string;
  stack: string[];
};

const T = {
  en: {
    label: "Case studies",
    h2: ["How I ", "solved it."],
    case: "Case",
    outcome: "Outcome. ",
    context: "Context",
    challenge: "Challenge",
    did: "What I did",
    result: "Result",
    read: "Read the full case study",
    arrow: "→",
  },
  ar: {
    label: "دراسات الحالة",
    h2: ["كيف ", "حللتها."],
    case: "حالة",
    outcome: "الحصيلة. ",
    context: "السياق",
    challenge: "التحدي",
    did: "ما فعلته",
    result: "النتيجة",
    read: "اقرأ دراسة الحالة كاملة",
    arrow: "←",
  },
};

export default function CaseStudies({ items, lang = "en" }: { items: CaseStudy[]; lang?: Lang }) {
  const t = T[lang];
  const LABELS = [
    ["context", t.context],
    ["challenge", t.challenge],
  ] as const;
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
      <p className="eyebrow mb-6">( 04 ) — {t.label}</p>
      <h2 className="mb-16 font-display text-[clamp(3rem,9vw,9rem)] font-extrabold leading-[0.85] tracking-tighter">
        {t.h2[0]}
        <span className="text-gradient">{t.h2[1]}</span>
      </h2>
      <ol>
        {items.map((c, i) => (
          <li key={c.slug} id={`case-${c.slug}`} className="cs-item relative grid gap-8 py-12 md:grid-cols-12">
            <span className="cs-line absolute left-0 right-0 top-0 h-px origin-left bg-line rtl:origin-right" />
            <div className="md:col-span-5">
              <p className="cs-in eyebrow">
                {t.case} {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="cs-in mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">{c.title}</h3>
              <p className="cs-in mt-5 text-lg leading-relaxed text-ink/90">
                <span className="text-gradient font-semibold">{t.outcome}</span>
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
                <p className="eyebrow mb-2">{t.did}</p>
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
                <p className="eyebrow mb-2">{t.result}</p>
                <p className="leading-relaxed text-ink/80">{c.result}</p>
              </div>
              <Link
                href={localePath(`/case-studies/${c.slug}/`, lang)}
                data-transition={c.title}
                className="cs-in group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-cyan"
              >
                {t.read}
                <span className={`transition-transform duration-500 ${lang === "ar" ? "group-hover:-translate-x-2" : "group-hover:translate-x-2"}`}>
                  {t.arrow}
                </span>
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
