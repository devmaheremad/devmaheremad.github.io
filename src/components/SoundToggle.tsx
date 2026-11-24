"use client";

import { useRef } from "react";
import { setSound, useSoundState } from "@/lib/sound";
import type { Lang } from "@/lib/i18n";
import SoundHint from "@/components/SoundHint";

const T = {
  en: { name: "Sound", on: "On", off: "Off", tip: { on: "Mute the sound", off: "Turn the sound on" } },
  ar: { name: "الصوت", on: "يعمل", off: "مكتوم", tip: { on: "كتم الصوت", off: "تشغيل الصوت" } },
};

// Sound switch, a labelled pill so nobody has to guess: a speaker (waves when on, a cross when muted), the word
// "Sound" and its state. The waves stand still while sound waits for the visitor's first click (browsers only start
// audio after a gesture) and pulse once it plays. The state word shows from 1280px up (the icon carries it below).
// Its accessible name is "Sound"; aria-pressed carries the state. While the browser holds the sound back, a note under
// it says to click anywhere (SoundHint). Pressing the switch never starts the sound first (data-sound-skip): while it
// waits, a press mutes it straight away.
export default function SoundToggle({ lang }: { lang: Lang }) {
  const state = useSoundState();
  const wrap = useRef<HTMLDivElement>(null);
  const on = state !== "off";
  const t = T[lang];
  return (
    <div ref={wrap} className="relative">
      <button
        type="button"
        data-magnetic
        data-sfx="none"
        data-sound-skip
        aria-pressed={on}
        title={t.tip[on ? "on" : "off"]}
        onClick={() => setSound(!on)}
        className={`snd flex h-9 items-center gap-2 rounded-full border px-3 transition-colors duration-300 ${
          on ? "is-on border-ink/30" : "border-line text-muted hover:text-ink"
        } ${state === "playing" ? "is-playing" : ""} hover:border-ink/50`}
      >
        <svg className="snd-icon shrink-0" width="18" height="18" viewBox="0 0 24 24" aria-hidden>
          <path d="M3.5 9.2h3.2L11.6 5v14l-4.9-4.2H3.5z" fill="currentColor" />
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path className="snd-wave snd-wave-1" d="M15.2 9.2a4 4 0 0 1 0 5.6" />
            <path className="snd-wave snd-wave-2" d="M18 6.6a7.6 7.6 0 0 1 0 10.8" />
            <path className="snd-x" d="M15.6 9.6l5 4.8M20.6 9.6l-5 4.8" />
          </g>
        </svg>
        {lang === "ar" ? (
          <span lang="ar" className="font-ar text-sm leading-none">
            {t.name}
            <span aria-hidden className={`hidden ps-1.5 xl:inline ${on ? "text-cyan" : ""}`}>
              {on ? t.on : t.off}
            </span>
          </span>
        ) : (
          <span className="font-mono text-[0.7rem] uppercase leading-none tracking-[0.18em]">
            {t.name}
            <span aria-hidden className={`hidden ps-1.5 xl:inline ${on ? "text-cyan" : ""}`}>
              {on ? t.on : t.off}
            </span>
          </span>
        )}
      </button>
      <SoundHint lang={lang} state={state} anchor={wrap} />
    </div>
  );
}
