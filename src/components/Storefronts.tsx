"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion";
import { sfx } from "@/lib/sound";
import { storefronts } from "@/content/site";
import type { Lang } from "@/lib/i18n";

const T = {
  en: {
    label: "Work · KoninPay SaaS stores",
    h2: ["Seven storefronts.", "One SaaS platform."],
    body: "A multi-store SaaS platform with merchant and store creation, payment workflows and a digital wallet. I advocated Next.js as its foundation. Every store below is live.",
    alt: (name: string) => `${name} storefront`,
    cursor: "Visit",
  },
  ar: {
    label: "الأعمال · متاجر منصة KoninPay SaaS",
    h2: ["سبعة متاجر.", "منصة SaaS واحدة."],
    body: "منصة SaaS متعددة المتاجر فيها إنشاء التجار والمتاجر ومسارات الدفع ومحفظة رقمية. دافعت عن اعتماد Next.js أساسًا لها. كل متجر أدناه يعمل الآن.",
    alt: (name: string) => `متجر ${name}`,
    cursor: "زيارة",
  },
};

// Pinned horizontal gallery: vertical scroll moves the KoninPay storefronts sideways (first work group, as on the Linktree).
// Right to left (Arabic), the stores run leftward from the right edge, so the track moves the other way.
export default function Storefronts({ lang = "en" }: { lang?: Lang }) {
  const t = T[lang];
  const rtl = lang === "ar";
  const root = useRef<HTMLElement>(null);
  const pinned = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const distance = () => track.current!.scrollWidth - window.innerWidth + 80;
      const tween = gsap.to(track.current, {
        x: () => (rtl ? distance() : -distance()),
        ease: "none",
        scrollTrigger: {
          trigger: pinned.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
      gsap.utils.toArray<HTMLElement>(".sf-img").forEach((img) => {
        gsap.fromTo(img, { scale: 1.18 }, {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            containerAnimation: tween,
            start: rtl ? "right left" : "left right",
            end: rtl ? "left right" : "right left",
            scrub: true,
          },
        });
      });
      // A pluck as each store reaches the middle of the screen, a note higher per store.
      gsap.utils.toArray<HTMLElement>(".sf-card").forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          containerAnimation: tween,
          start: rtl ? "right 55%" : "left 55%",
          onEnter: () => sfx("card", i),
          onEnterBack: () => sfx("card", i),
        });
      });
    });
    return () => mm.revert();
  }, [rtl]);

  return (
    // GSAP wraps the pinned element in a spacer; pinning an inner div keeps React's own section untouched.
    <section ref={root} id="work" data-sound="work" className="relative">
      <div ref={pinned} className="relative overflow-hidden py-24 md:flex md:h-[100svh] md:items-center md:py-0">
      <div ref={track} className="flex flex-col gap-10 px-5 md:flex-row md:items-center md:gap-14 md:px-10">
        <div className="shrink-0 md:w-[34vw]">
          <p className="eyebrow mb-6">( 02 ) — {t.label}</p>
          <h2 className="font-display text-[clamp(2.6rem,5vw,5rem)] font-extrabold leading-[0.95] tracking-tight">
            {t.h2[0]}
            <br />
            <span className="text-gradient">{t.h2[1]}</span>
          </h2>
          <p className="mt-6 max-w-[38ch] text-muted">{t.body}</p>
        </div>
        {storefronts.map((s, i) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor={t.cursor}
            className="sf-card group block shrink-0 md:w-[46vw] lg:w-[40vw]"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-bg-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.image}
                alt={t.alt(s.name)}
                loading="lazy"
                className="sf-img h-full w-full object-cover object-top transition-[filter] duration-700 group-hover:brightness-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span lang="en" className="font-display text-xl font-bold">
                {s.name}
              </span>
              <span dir="ltr" className="eyebrow">
                0{i + 1} / 0{storefronts.length} ↗
              </span>
            </div>
          </a>
        ))}
      </div>
      </div>
    </section>
  );
}
