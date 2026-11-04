"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/motion";
import { workGroups, type Project } from "@/content/site";

const projects = workGroups.flatMap((g) => g.items);

function Visual({ p, className = "", eager = false }: { p: Project; className?: string; eager?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={p.image}
      alt={eager ? "" : `${p.title} screenshot`}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={`h-full w-full object-cover object-top ${className}`}
    />
  );
}

// Business websites and side projects, grouped and ordered like the Linktree. On desktop a preview card follows the cursor.
export default function Work() {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState<number | null>(null);
  const [nearWork, setNearWork] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNearWork(true), { rootMargin: "600px 0px" });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      {
        gsap.utils.toArray<HTMLElement>(".wk-row").forEach((row) => {
          gsap.from(row.querySelectorAll(".wk-in"), {
            yPercent: 100,
            opacity: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.05,
            scrollTrigger: { trigger: row, start: "top 88%" },
          });
        });
      }
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const el = preview.current!;
      gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0.6, opacity: 0 });
      const x = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3" });
      const y = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3" });
      const rot = gsap.quickTo(el, "rotation", { duration: 0.9, ease: "power3" });
      let lastX = 0;
      const move = (e: PointerEvent) => {
        x(e.clientX);
        y(e.clientY);
        rot(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6));
        lastX = e.clientX;
      };
      window.addEventListener("pointermove", move);
      return () => window.removeEventListener("pointermove", move);
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!preview.current) return;
    gsap.to(preview.current, {
      scale: current === null ? 0.6 : 1,
      opacity: current === null ? 0 : 1,
      duration: 0.6,
      ease: "expo.out",
    });
  }, [current]);

  return (
    <section ref={root} id="projects" className="relative px-5 py-[16vh] sm:px-10">
      <div className="mb-14 flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-6">( 03 ) — More work</p>
          <h2 className="font-display text-[clamp(3rem,9vw,9rem)] font-extrabold leading-[0.85] tracking-tighter">
            Projects<span className="text-gradient">.</span>
          </h2>
        </div>
        <p className="eyebrow hidden max-w-[28ch] text-right md:block">Business websites and side projects. Every one is live.</p>
      </div>

      <div onPointerLeave={() => setCurrent(null)} className="space-y-20">
        {workGroups.map((group) => (
          <div key={group.title}>
            <div className="mb-2 flex items-baseline justify-between">
              <h3 className="font-display text-2xl font-bold">{group.title}</h3>
              <span className="eyebrow">{String(group.items.length).padStart(2, "0")} projects</span>
            </div>
            <ul className="border-t border-line">
              {group.items.map((p) => {
                const i = projects.indexOf(p);
                return (
                  <li key={p.slug} onPointerEnter={() => setCurrent(i)} className="wk-row group border-b border-line">
                    <a href={p.href} target="_blank" rel="noopener noreferrer" data-cursor="Open" className="block py-8 sm:py-10">
                      <div className="flex items-baseline gap-4 sm:gap-8">
                        <span className="wk-in eyebrow w-8 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                        <div className="min-w-0 flex-1 overflow-hidden">
                          <h4 className="font-display text-[clamp(1.8rem,4.2vw,4.2rem)] font-extrabold leading-[1] tracking-tight transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-4">
                            <span className="wk-in block">{p.title}</span>
                          </h4>
                        </div>
                        <span className="wk-in hidden text-right text-sm text-muted md:block md:w-56">{p.kind}</span>
                        <span className="hidden w-10 text-right text-2xl transition-transform duration-500 group-hover:-rotate-45 sm:block">
                          <span className="wk-in inline-block">→</span>
                        </span>
                      </div>
                      <div className="mt-4 grid gap-4 pl-12 sm:pl-16 md:hidden">
                        <div className="aspect-[16/10] overflow-hidden rounded-xl border border-line">
                          <Visual p={p} />
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2 pl-12 sm:pl-16">
                        {p.stack.map((s) => (
                          <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-muted">
                            {s}
                          </span>
                        ))}
                      </div>
                      <p className="mt-3 max-w-[70ch] pl-12 text-[0.95rem] leading-relaxed text-ink/70 sm:pl-16">{p.summary}</p>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden aspect-[16/10] w-[min(34vw,520px)] overflow-hidden rounded-2xl border border-line bg-bg-2 opacity-0 shadow-2xl md:block"
      >
        {projects.map((p, i) => (
          <div
            key={p.slug}
            className="absolute inset-0 transition-[clip-path] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
            style={{ clipPath: current === i ? "inset(0 0 0 0)" : "inset(100% 0 0 0)" }}
          >
            {nearWork && <Visual p={p} eager />}
          </div>
        ))}
      </div>
    </section>
  );
}
