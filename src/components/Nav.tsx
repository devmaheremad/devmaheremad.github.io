"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, onReady, scrollToId } from "@/lib/motion";
import { profile } from "@/content/site";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

function useClock(tz: string) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const f = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz });
    const set = () => setTime(f.format(new Date()));
    set();
    const id = setInterval(set, 15_000);
    return () => clearInterval(id);
  }, [tz]);
  return time;
}

export default function Nav() {
  const bar = useRef<HTMLElement>(null);
  const time = useClock(profile.timezone);

  useEffect(() => {
    gsap.set(bar.current, { yPercent: -120, opacity: 0 });
    return onReady(() => gsap.to(bar.current, { yPercent: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.3 }));
  }, []);

  return (
    <header ref={bar} className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <nav className="flex items-center justify-between px-5 py-5 sm:px-10">
        <button onClick={() => scrollToId("top")} data-magnetic className="font-display text-xl font-extrabold tracking-tight" aria-label="MA. Back to top">
          MA<span className="text-cyan">.</span>
        </button>
        <div className="hidden items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink/70 md:flex">
          <span className="relative mr-1 inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available now · Gaza {time}
        </div>
        <ul className="flex items-center gap-5 sm:gap-8">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => scrollToId(l.id)}
                className="group relative font-mono text-[0.72rem] uppercase tracking-[0.18em]"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-ink transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
