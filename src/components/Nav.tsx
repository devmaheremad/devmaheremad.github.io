"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, onReady } from "@/lib/motion";
import { profile } from "@/content/site";
import { companies } from "@/content/stories";

const INLINE = [
  { href: "/work/", label: "Chapters" },
  { href: "/stories/", label: "Stories" },
  { href: "/decisions/", label: "Decisions" },
];

const MENU = [
  { href: "/", label: "Home" },
  { href: "/work/", label: "Chapters" },
  { href: "/case-studies/", label: "Case studies" },
  { href: "/strengths/", label: "Strengths" },
  { href: "/decisions/", label: "Decisions" },
  { href: "/stories/", label: "Stories" },
  { href: "/#contact", label: "Contact" },
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
  const panel = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const time = useClock(profile.timezone);
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState(pathname);

  // A new page closes the menu (adjusting state during render, not in an effect).
  if (pathname !== menuPath) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    gsap.set(bar.current, { yPercent: -120, opacity: 0 });
    return onReady(() => gsap.to(bar.current, { yPercent: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.3 }));
  }, []);

  // Fullscreen menu: the panel wipes down, then the links rise out of their masks.
  useEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({ paused: true })
        .set(panel.current, { visibility: "visible" })
        .fromTo(panel.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "expo.inOut" })
        .fromTo(".mn-link", { yPercent: 110 }, { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.045 }, "-=0.35")
        .fromTo(".mn-fade", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.05 }, "<0.2");
    }, panel);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!tl.current) return;
    const lenis = (window as Window & { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (open) {
      lenis?.stop();
      tl.current.timeScale(1).play();
      panel.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    } else {
      lenis?.start();
      tl.current.timeScale(1.6).reverse();
    }
  }, [open]);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 160);
        last = y;
      }
    };
    const onScroll = () => void (raf ||= requestAnimationFrame(update));
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <>
      <header ref={bar} className="fixed inset-x-0 top-0 z-[55]">
        <div
          className={`transition-[translate,background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(.22,1,.36,1)] border-b ${
            hidden && !open ? "-translate-y-full" : "translate-y-0"
          } ${scrolled && !open ? "border-line bg-bg/75 backdrop-blur-xl backdrop-saturate-150" : "border-transparent bg-transparent"}`}
        >
        <nav className={`flex items-center justify-between px-5 sm:px-10 transition-[padding] duration-500 ${scrolled && !open ? "py-3.5" : "py-5"}`} aria-label="Main">
          <Link href="/" data-magnetic className="font-display text-xl font-extrabold tracking-tight" aria-label="Maher Almashharawi, home">
            MA<span className="text-cyan">.</span>
          </Link>
          <div className="hidden items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink/70 lg:flex">
            <span className="relative mr-1 inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available now · Palestine {time}
          </div>
          <ul className="flex items-center gap-4 sm:gap-8">
            {INLINE.map((l) => (
              <li key={l.href} className="hidden md:block">
                <Link
                  href={l.href}
                  aria-current={pathname === l.href ? "page" : undefined}
                  className="group relative font-mono text-[0.72rem] uppercase tracking-[0.18em]"
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px w-full bg-ink transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100 ${
                      pathname === l.href ? "scale-x-100" : "origin-right scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="site-menu"
                data-magnetic
                className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.18em]"
              >
                {open ? "Close" : "Menu"}
                <span className="relative block h-3 w-6" aria-hidden>
                  <span className={`absolute left-0 h-px w-full bg-ink transition-transform duration-500 ${open ? "top-1.5 rotate-45" : "top-0.5"}`} />
                  <span className={`absolute left-0 h-px w-full bg-ink transition-transform duration-500 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
                </span>
              </button>
            </li>
          </ul>
        </nav>
        </div>
      </header>

      <div
        id="site-menu"
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        className="invisible fixed inset-0 z-[54] overflow-y-auto bg-bg-2"
        data-lenis-prevent
      >
        <div className="pointer-events-none absolute -right-[20vw] -top-[20vh] h-[80vh] w-[80vh] rounded-full bg-[radial-gradient(circle,rgba(76,195,255,.18),rgba(182,156,255,.1)_45%,transparent_70%)] blur-2xl" />
        <div className="relative grid min-h-full gap-12 px-5 pb-10 pt-28 sm:px-10 lg:grid-cols-12">
          <ol className="lg:col-span-8">
            {MENU.map((l, i) => (
              <li key={l.href} className="overflow-hidden border-b border-line">
                <Link
                  href={l.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  data-transition={l.label}
                  className="mn-link group flex items-baseline gap-5 py-2 sm:py-3"
                >
                  <span className="eyebrow w-8 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-[clamp(2.4rem,7vw,6.2rem)] font-extrabold leading-[1] tracking-tight transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-5">
                    <span className="transition-colors duration-500 group-hover:text-cyan">{l.label}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <div className="space-y-10 lg:col-span-3 lg:col-start-10 lg:pt-4">
            <div className="mn-fade">
              <p className="eyebrow mb-4">Chapters</p>
              <ul className="space-y-2">
                {companies.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/work/${c.slug}/`} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} data-transition={c.name} className="group flex items-baseline gap-3 text-lg">
                      <span className="eyebrow">{c.index}</span>
                      <span className="transition-colors group-hover:text-cyan">{c.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mn-fade">
              <p className="eyebrow mb-4">Say hello</p>
              <a href={`mailto:${profile.email}`} tabIndex={open ? 0 : -1} className="text-lg hover:text-cyan">
                {profile.email}
              </a>
            </div>
            <ul className="mn-fade flex flex-wrap gap-x-6 gap-y-2">
              {profile.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="font-mono text-xs uppercase tracking-[0.16em] text-muted hover:text-ink">
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
