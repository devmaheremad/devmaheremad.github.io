"use client";

import { useEffect, useState } from "react";
import { hasSoundChoice, setSound, useSoundOn } from "@/lib/sound";
import { onReady } from "@/lib/motion";
import type { Lang } from "@/lib/i18n";

const LABEL = {
  en: { on: "Turn sound off", off: "Turn sound on" },
  ar: { on: "إيقاف الصوت", off: "تشغيل الصوت" },
};

// Sound switch: four bars that dance while sound is on and lie flat when it is off. On a first visit (no choice saved
// yet) a ring pulses around it a few times after the intro, so visitors notice there is sound.
export default function SoundToggle({ lang }: { lang: Lang }) {
  const on = useSoundOn();
  const [hint, setHint] = useState(false);

  useEffect(() => {
    if (hasSoundChoice()) return;
    return onReady(() => window.setTimeout(() => setHint(true), 1400));
  }, []);

  const label = LABEL[lang][on ? "on" : "off"];
  return (
    <button
      type="button"
      data-magnetic
      data-sfx="none"
      aria-pressed={on}
      aria-label={label}
      title={label}
      onClick={() => {
        setHint(false);
        setSound(!on);
      }}
      className={`snd relative grid h-9 w-9 place-items-center rounded-full border border-line transition-colors duration-300 hover:border-ink/40 ${on ? "is-on" : ""} ${hint && !on ? "is-hint" : ""}`}
    >
      <span aria-hidden className="flex h-3.5 items-end gap-[2.5px]">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="snd-bar block w-[2px] rounded-full bg-current" style={{ animationDelay: `${i * -0.23}s` }} />
        ))}
      </span>
    </button>
  );
}
