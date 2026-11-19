"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import type { Lang } from "@/lib/i18n";

type Job = { company: string; role: string; period: string; place: string; points: string[]; href?: string };

const T = {
  en: { label: "Experience", h2: ["Where I've ", "shipped."], read: "Read the chapter", arrow: "→" },
  ar: { label: "الخبرة", h2: ["أين عملت ", "وأطلقت."], read: "اقرأ الفصل", arrow: "←" },
};

export default function Experience({ items, lang = "en" }: { items: Job[]; lang?: Lang }) {
  const t = T[lang];
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".xp-item").forEach((item) => {
        gsap.from(item.querySelectorAll(".xp-in"), {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.06,
          scrollTrigger: { trigger: item, start: "top 85%" },
        });
        gsap.fromTo(
          item.querySelector(".xp-line"),
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { trigger: item, start: "top 90%", end: "top 40%", scrub: true } },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="experience" className="px-5 py-[16vh] sm:px-10">
      <p className="eyebrow mb-6">( 05 ) — {t.label}</p>
      <h2 className="mb-16 font-display text-[clamp(3rem,9vw,9rem)] font-extrabold leading-[0.85] tracking-tighter">
        {t.h2[0]}
        <span className="text-gradient">{t.h2[1]}</span>
      </h2>
      <ol>
        {items.map((x) => (
          <li key={x.company} className="xp-item relative grid gap-6 py-10 md:grid-cols-12">
            <span className="xp-line absolute left-0 right-0 top-0 h-px origin-left bg-line rtl:origin-right" />
            <div className="md:col-span-4">
              <p className="xp-in eyebrow">{x.period}</p>
              <h3 lang="en" className="xp-in mt-3 font-display text-3xl font-bold sm:text-4xl">
                {x.company}
              </h3>
              <p className="xp-in mt-2 text-muted">
                {x.role} · {x.place}
              </p>
              {x.href && (
                <Link
                  href={x.href}
                  data-transition={x.company}
                  className="xp-in group mt-5 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-cyan"
                >
                  {t.read}
                  <span className={`transition-transform duration-500 ${lang === "ar" ? "group-hover:-translate-x-2" : "group-hover:translate-x-2"}`}>
                    {t.arrow}
                  </span>
                </Link>
              )}
            </div>
            <ul className="space-y-3 md:col-span-7 md:col-start-6">
              {x.points.map((pt) => (
                <li key={pt} className="xp-in flex gap-4 leading-relaxed text-ink/80">
                  <span className="mt-[0.7em] h-px w-5 shrink-0 bg-gradient-to-r from-cyan to-violet" />
                  {pt}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
