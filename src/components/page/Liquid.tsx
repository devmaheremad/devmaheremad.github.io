"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

// Soft light pools that drift on their own and lean toward the pointer, each with its own lag,
// so together they move like liquid. Pure CSS gradients on transformed layers: no WebGL, no filters per frame.
export default function Liquid({ tone = "mix" }: { tone?: "mix" | "cyan" | "violet" }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blobs = gsap.utils.toArray<HTMLElement>(".lq-blob", root.current);
    if (prefersReducedMotion()) return;
    const drift = blobs.map((b, i) =>
      gsap.to(b, {
        xPercent: gsap.utils.random(-18, 18),
        yPercent: gsap.utils.random(-14, 14),
        scale: gsap.utils.random(0.9, 1.15),
        duration: 6 + i * 1.7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      }),
    );
    const movers = blobs.map((b, i) => ({
      x: gsap.quickTo(b, "x", { duration: 1.2 + i * 0.6, ease: "power3" }),
      y: gsap.quickTo(b, "y", { duration: 1.2 + i * 0.6, ease: "power3" }),
      k: 0.12 + i * 0.05,
    }));
    const move = (e: PointerEvent) => {
      const dx = e.clientX - window.innerWidth / 2;
      const dy = e.clientY - window.innerHeight / 2;
      movers.forEach((m) => {
        m.x(dx * m.k);
        m.y(dy * m.k);
      });
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      drift.forEach((t) => t.kill());
    };
  }, []);

  // Theme colours as "r g b" (globals.css), so the pools tint the paper in the light theme.
  const c1 = tone === "violet" ? "var(--glow-violet)" : "var(--glow-cyan)";
  const c2 = tone === "cyan" ? "var(--glow-cyan)" : "var(--glow-violet)";
  return (
    <div ref={root} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="lq-blob absolute right-[-8vw] top-[-12vh] h-[70vh] w-[70vh] rounded-full blend-glow"
        style={{ background: `radial-gradient(circle at 50% 50%, rgb(${c1} / .34), rgb(${c1} / .08) 45%, transparent 68%)` }}
      />
      <div
        className="lq-blob absolute bottom-[-18vh] right-[18vw] h-[60vh] w-[60vh] rounded-full blend-glow"
        style={{ background: `radial-gradient(circle at 50% 50%, rgb(${c2} / .3), rgb(${c2} / .07) 45%, transparent 68%)` }}
      />
      <div
        className="lq-blob absolute left-[-14vw] top-[30vh] h-[46vh] w-[46vh] rounded-full blend-glow"
        style={{ background: `radial-gradient(circle at 50% 50%, rgb(${c1} / .16), transparent 65%)` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,var(--bg))]" />
    </div>
  );
}
