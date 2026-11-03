"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import { storefronts } from "@/content/site";

// Pinned horizontal gallery: vertical scroll moves the six KoninPay storefronts sideways.
export default function Storefronts() {
  const root = useRef<HTMLElement>(null);
  const pinned = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const distance = () => track.current!.scrollWidth - window.innerWidth + 80;
      const tween = gsap.to(track.current, {
        x: () => -distance(),
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
          scrollTrigger: { trigger: img, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    // GSAP wraps the pinned element in a spacer; pinning an inner div keeps React's own section untouched.
    <section ref={root} className="relative">
      <div ref={pinned} className="relative overflow-hidden py-24 md:flex md:h-[100svh] md:items-center md:py-0">
      <div ref={track} className="flex flex-col gap-10 px-5 md:flex-row md:items-center md:gap-14 md:px-10">
        <div className="shrink-0 md:w-[34vw]">
          <p className="eyebrow mb-6">( 03 ) — KoninPay · Konin Cloud</p>
          <h2 className="font-display text-[clamp(2.6rem,5vw,5rem)] font-extrabold leading-[0.95] tracking-tight">
            Six storefronts.
            <br />
            <span className="text-gradient">One SaaS platform.</span>
          </h2>
          <p className="mt-6 max-w-[38ch] text-muted">
            A multi-store SaaS platform with merchant and store creation, payment workflows and a digital wallet. I advocated Next.js
            as its foundation. Every store below is live.
          </p>
        </div>
        {storefronts.map((s, i) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Visit"
            className="group block shrink-0 md:w-[46vw] lg:w-[40vw]"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-bg-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.image}
                alt={`${s.name} storefront`}
                loading="lazy"
                className="sf-img h-full w-full object-cover object-top transition-[filter] duration-700 group-hover:brightness-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="font-display text-xl font-bold">{s.name}</span>
              <span className="eyebrow">0{i + 1} / 06 ↗</span>
            </div>
          </a>
        ))}
      </div>
      </div>
    </section>
  );
}
