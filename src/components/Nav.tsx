"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, onReady, scramble } from "@/lib/motion";
import { profile } from "@/content/site";
import { companies } from "@/content/stories";
import { counterpart, isArPath, localePath, UI, type Lang } from "@/lib/i18n";
import ThemeToggle from "@/components/ThemeToggle";
import SoundToggle from "@/components/SoundToggle";
import { sfx } from "@/lib/sound";

type NavLink = { href: string; label: string; lang?: Lang };

// Every page has a twin in the other language; the switch goes to the same page, not to the other homepage.
function inlineLinks(lang: Lang, pathname: string): NavLink[] {
  const t = UI[lang];
  const other = counterpart(pathname);
  return [
    { href: localePath("/work/", lang), label: t.chapters, lang },
    { href: localePath("/stories/", lang), label: t.stories, lang },
    { href: localePath("/decisions/", lang), label: t.decisions, lang },
    lang === "ar" ? { href: other, label: "English", lang: "en" } : { href: other, label: "العربية", lang: "ar" },
  ];
}

function menuLinks(lang: Lang, pathname: string): NavLink[] {
  const t = UI[lang];
  return [
    { href: localePath("/", lang), label: t.home },
    { href: localePath("/work/", lang), label: t.chapters },
    { href: localePath("/case-studies/", lang), label: t.caseStudies },
    { href: localePath("/strengths/", lang), label: t.strengths },
    { href: localePath("/decisions/", lang), label: t.decisions },
    { href: localePath("/stories/", lang), label: t.stories },
    { href: `${localePath("/", lang)}#contact`, label: t.contact },
    lang === "ar" ? { href: counterpart(pathname), label: "English", lang: "en" } : { href: counterpart(pathname), label: "العربية", lang: "ar" },
  ];
}

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
  const isAr = isArPath(pathname);
  const lang: Lang = isAr ? "ar" : "en";
  const inline = inlineLinks(lang, pathname);
  const menu = menuLinks(lang, pathname);
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
          <Link href={isAr ? "/ar/" : "/"} dir="ltr" data-magnetic className="font-display text-xl font-extrabold tracking-tight" aria-label="Maher Almashharawi, home">
            MA<span className="text-cyan">.</span>
          </Link>
          <div className="hidden items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink/70 lg:flex">
            <span className="relative mr-1 inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {isAr ? (
              <span lang="ar" className="font-ar text-xs">
                متاح الآن · فلسطين {time}
              </span>
            ) : (
              <>Available now · Palestine {time}</>
            )}
          </div>
          <ul className="flex items-center gap-4 sm:gap-8">
            {inline.map((l) => (
              <li key={l.href} className="hidden md:block">
                <Link
                  href={l.href}
                  lang={l.lang}
                  hrefLang={l.lang}
                  data-transition={l.label}
                  aria-current={pathname === l.href ? "page" : undefined}
                  className={`group relative ${l.lang === "ar" ? "font-ar text-sm" : "font-mono text-[0.72rem] uppercase tracking-[0.18em]"}`}
                  // The name stays readable while the letters decode.
                  aria-label={l.lang === "ar" ? undefined : l.label}
                  onPointerEnter={l.lang === "ar" ? undefined : (e) => scramble(e.currentTarget.firstElementChild as HTMLElement)}
                  onFocus={l.lang === "ar" ? undefined : (e) => scramble(e.currentTarget.firstElementChild as HTMLElement)}
                >
                  <span>{l.label}</span>
                  <span
                    className={`absolute -bottom-1 left-0 h-px w-full bg-ink transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100 ${
                      pathname === l.href ? "scale-x-100" : "origin-right scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            ))}
            <li>
              <SoundToggle lang={lang} />
            </li>
            <li>
              <ThemeToggle lang={lang} />
            </li>
            <li>
              <button
                onClick={() => {
                  sfx(open ? "menu-close" : "menu-open");
                  setOpen((o) => !o);
                }}
                data-sfx="none"
                aria-expanded={open}
                aria-controls="site-menu"
                data-magnetic
                className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.18em]"
              >
                {isAr ? (
                  <span lang="ar" className="font-ar text-sm">
                    {open ? "إغلاق" : "القائمة"}
                  </span>
                ) : open ? (
                  "Close"
                ) : (
                  "Menu"
                )}
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
        aria-label={isAr ? "قائمة الموقع" : "Site menu"}
        aria-hidden={!open}
        lang={lang}
        dir={isAr ? "rtl" : "ltr"}
        className={`invisible fixed inset-0 z-[54] overflow-y-auto bg-bg-2 ${isAr ? "ar-page ar-sub" : ""}`}
        data-lenis-prevent
      >
        <div className="pointer-events-none absolute -right-[20vw] -top-[20vh] h-[80vh] w-[80vh] rounded-full bg-[radial-gradient(circle,rgb(var(--glow-cyan)/.18),rgb(var(--glow-violet)/.1)_45%,transparent_70%)] blur-2xl" />
        <div className="relative grid min-h-full gap-12 px-5 pb-10 pt-28 sm:px-10 lg:grid-cols-12">
          <ol className="lg:col-span-8">
            {menu.map((l, i) => (
              <li key={l.href} className="overflow-hidden border-b border-line">
                <Link
                  href={l.href}
                  lang={l.lang}
                  hrefLang={l.lang}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  data-transition={l.label}
                  className="mn-link group flex items-baseline gap-5 py-2 sm:py-3"
                >
                  <span className="eyebrow w-8 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={`font-display text-[clamp(2.4rem,7vw,6.2rem)] font-extrabold leading-[1] tracking-tight transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
                      isAr ? "group-hover:-translate-x-5" : "group-hover:translate-x-5"
                    }`}
                  >
                    <span className="transition-colors duration-500 group-hover:text-cyan">{l.label}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <div className="space-y-10 lg:col-span-3 lg:col-start-10 lg:pt-4">
            <div className="mn-fade">
              <p className="eyebrow mb-4">{UI[lang].chapters}</p>
              <ul className="space-y-2">
                {companies.map((c) => (
                  <li key={c.slug}>
                    <Link href={localePath(`/work/${c.slug}/`, lang)} lang="en" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} data-transition={c.name} className="group flex items-baseline gap-3 text-lg">
                      <span className="eyebrow">{c.index}</span>
                      <span className="transition-colors group-hover:text-cyan">{c.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mn-fade">
              <p className="eyebrow mb-4">{isAr ? "راسلني" : "Say hello"}</p>
              <a href={`mailto:${profile.email}`} dir="ltr" tabIndex={open ? 0 : -1} className="text-lg hover:text-cyan">
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
