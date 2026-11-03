"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";

// A dot + ring cursor (difference blend). Elements opt in with data-cursor="label" (big ring with a label)
// or data-cursor="link" (medium ring). data-magnetic pulls an element toward the pointer.
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    const d = dot.current!;
    const r = ring.current!;
    const dx = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(r, "x", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.5, ease: "power3" });
    let shown = false;
    let magnet: HTMLElement | null = null;

    const move = (e: PointerEvent) => {
      if (!shown) {
        gsap.to([d, r], { opacity: 1, duration: 0.3 });
        shown = true;
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      if (magnet) {
        const b = magnet.getBoundingClientRect();
        gsap.to(magnet, {
          x: (e.clientX - (b.left + b.width / 2)) * 0.3,
          y: (e.clientY - (b.top + b.height / 2)) * 0.3,
          duration: 0.6,
          ease: "power3",
        });
      }
    };

    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button");
      r.classList.remove("is-active", "is-link");
      label.current!.textContent = "";
      if (t) {
        const kind = t.dataset.cursor;
        if (kind && kind !== "link") {
          r.classList.add("is-active");
          label.current!.textContent = kind;
        } else {
          r.classList.add("is-link");
        }
      }
      const m = (e.target as HTMLElement).closest<HTMLElement>("[data-magnetic]");
      if (magnet && magnet !== m) gsap.to(magnet, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
      magnet = m;
    };

    const down = () => gsap.to(r, { scale: 0.8, duration: 0.2 });
    const up = () => gsap.to(r, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
    const leave = () => gsap.to([d, r], { opacity: 0, duration: 0.3, onComplete: () => void (shown = false) });

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("pointerleave", leave);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden>
        <span ref={label} />
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
