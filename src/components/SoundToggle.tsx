"use client";

import { setSound, useSoundState } from "@/lib/sound";
import type { Lang } from "@/lib/i18n";

const LABEL = {
  en: { on: "Turn sound off", off: "Turn sound on" },
  ar: { on: "إيقاف الصوت", off: "تشغيل الصوت" },
};

// Sound switch: four bars. Flat when sound is off, standing still while it waits for the visitor's first click (sound
// is on by default, but browsers only start audio after a gesture), dancing once it plays.
export default function SoundToggle({ lang }: { lang: Lang }) {
  const state = useSoundState();
  const on = state !== "off";
  const label = LABEL[lang][on ? "on" : "off"];
  return (
    <button
      type="button"
      data-magnetic
      data-sfx="none"
      aria-pressed={on}
      aria-label={label}
      title={label}
      onClick={() => setSound(!on)}
      className={`snd relative grid h-9 w-9 place-items-center rounded-full border border-line transition-colors duration-300 hover:border-ink/40 ${on ? "is-on" : ""} ${state === "playing" ? "is-playing" : ""}`}
    >
      <span aria-hidden className="flex h-3.5 items-end gap-[2.5px]">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="snd-bar block w-[2px] rounded-full bg-current" style={{ animationDelay: `${i * -0.23}s` }} />
        ))}
      </span>
    </button>
  );
}
