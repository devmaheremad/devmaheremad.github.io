"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import { stats } from "@/content/site";

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".st-num").forEach((el) => {
        const target = Number(el.dataset.value);
        const obj = { n: 0 };
        gsap.to(obj, {
          n: target,
          duration: 2.2,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => void (el.textContent = String(Math.round(obj.n))),
        });
      });
      gsap.from(".st-item", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="border-y border-line px-5 py-16 sm:px-10">
      <ul className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 xl:grid-cols-5">
        {stats.map((s) => (
          <li key={s.label} className="st-item">
            <p className="font-display text-[clamp(2.6rem,5vw,4.8rem)] font-extrabold leading-none tracking-tight">
              <span className="text-gradient">{s.prefix}</span>
              <span className="st-num tabular-nums" data-value={s.value}>
                {s.value}
              </span>
              <span className="text-gradient">{s.suffix}</span>
            </p>
            <p className="mt-3 max-w-[20ch] text-sm leading-snug text-muted">{s.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
