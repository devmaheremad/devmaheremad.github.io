"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";
import { onReady } from "@/lib/motion";
import { setSound, type SoundState } from "@/lib/sound";
import type { Lang } from "@/lib/i18n";

const T = {
  en: {
    click: "Click anywhere to turn on the sound effects",
    tap: "Tap anywhere to turn on the sound effects",
    mute: "Mute",
    muteLabel: "Mute the sound effects",
  },
  ar: {
    click: "اضغط في أي مكان لتشغيل المؤثرات الصوتية",
    tap: "المس أي مكان لتشغيل المؤثرات الصوتية",
    mute: "كتم الصوت",
    muteLabel: "كتم المؤثرات الصوتية",
  },
};

const never = () => () => {};
const isTouch = () => window.matchMedia("(hover: none) and (pointer: coarse)").matches;

// A note under the Sound switch for visitors whose browser held the sound back (most browsers allow no sound before
// the first click, tap or key press): click anywhere to hear it, or mute it here. It drops in once the intro is done
// and leaves as soon as the sound plays or is muted; once the sound has played on this visit it stays away (a hidden
// tab pauses the audio, which would otherwise read as waiting again). It sits under the switch on every screen,
// nudged sideways to stay inside the viewport, with its arrow still on the switch.
export default function SoundHint({ lang, state, anchor }: { lang: Lang; state: SoundState; anchor: RefObject<HTMLElement | null> }) {
  const box = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [played, setPlayed] = useState(false);
  const touch = useSyncExternalStore(never, isTouch, () => false);
  const t = T[lang];

  if (state === "playing" && !played) setPlayed(true);
  const show = ready && !played && state === "armed";

  useEffect(() => {
    let id = 0;
    const off = onReady(() => {
      id = window.setTimeout(() => setReady(true), 1500);
    });
    return () => {
      off();
      window.clearTimeout(id);
    };
  }, []);

  useLayoutEffect(() => {
    if (!show) return;
    const place = () => {
      const a = anchor.current?.getBoundingClientRect();
      const b = box.current;
      if (!a || !b) return;
      const vw = document.documentElement.clientWidth;
      const center = a.left + a.width / 2;
      const left = Math.min(Math.max(12, center - b.offsetWidth / 2), vw - 12 - b.offsetWidth);
      b.style.left = `${Math.round(left - a.left)}px`;
      b.style.setProperty("--arrow-x", `${Math.round(center - left)}px`);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [show, anchor, lang, touch]);

  return (
    <div
      ref={box}
      role="status"
      aria-hidden={!show}
      inert={!show}
      lang={lang}
      className={`snd-hint ${show ? "is-shown" : ""} absolute left-0 top-[calc(100%+0.9rem)] z-10 w-max max-w-[min(22rem,calc(100vw-1.5rem))] rounded-2xl border border-line bg-bg-2 p-3.5 pe-4 text-start normal-case tracking-normal text-ink shadow-[0_24px_60px_-24px_rgb(0_0_0/0.55)]`}
    >
      <span
        aria-hidden
        className="absolute -top-[6.5px] left-[var(--arrow-x,50%)] h-3 w-3 -translate-x-1/2 rotate-45 rounded-tl-[3px] border-l border-t border-line bg-bg-2"
      />
      <div className="flex items-start gap-3">
        <span aria-hidden className="relative mt-[0.42rem] inline-flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full rounded-full bg-cyan opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
        </span>
        <div className="min-w-0">
          <p className={`text-pretty ${lang === "ar" ? "font-ar text-sm leading-relaxed" : "text-sm leading-snug"}`}>{touch ? t.tap : t.click}</p>
          <button
            type="button"
            data-sound-skip
            data-sfx="none"
            aria-label={t.muteLabel}
            onClick={() => setSound(false)}
            className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-muted transition-colors duration-300 hover:border-ink/40 hover:text-ink"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
              <path d="M3.5 9.2h3.2L11.6 5v14l-4.9-4.2H3.5z" fill="currentColor" />
              <path d="M15.6 9.6l5 4.8M20.6 9.6l-5 4.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className={lang === "ar" ? "font-ar text-xs" : "font-mono text-[0.65rem] uppercase tracking-[0.18em]"}>{t.mute}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
