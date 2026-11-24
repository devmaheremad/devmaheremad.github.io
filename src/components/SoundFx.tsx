"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { onVisibility, scrollAir, sfx, soundTheme, unlockSound, useSoundOn } from "@/lib/sound";

// Links and buttons only: the hero carries data-cursor too, and pressing it is the hold gesture, which has its own sound.
const INTERACTIVE = "a[href], button, [role='button'], summary";

// The site-wide sound layer: a tick on hover, a tap on click, air while scrolling, and a cue as each section with
// data-sound="<cue>" comes into view. Silent while the visitor has sound turned off (lib/sound.ts).
export default function SoundFx() {
  const on = useSoundOn();
  const pathname = usePathname();

  useEffect(() => {
    if (!on) return;
    // Audio may only start inside a gesture: the first click, tap or key press starts it. Touch screens count the end
    // of a tap (pointerup, touchend), not its start, so all of them are listened to.
    const unlock = () => unlockSound();
    let lastHover: Element | null = null;
    let lastHoverAt = 0;
    const over = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as Element).closest(INTERACTIVE);
      if (el === lastHover) return;
      lastHover = el;
      const now = performance.now();
      if (!el || el.closest("[data-sfx='none']") || now - lastHoverAt < 60) return;
      lastHoverAt = now;
      sfx("hover");
    };
    const down = (e: PointerEvent) => {
      unlock();
      const el = (e.target as Element).closest(INTERACTIVE);
      if (el && !el.closest("[data-sfx='none']")) sfx("tap");
    };
    let lastY = window.scrollY;
    let lastT = performance.now();
    const scroll = () => {
      const now = performance.now();
      const speed = Math.abs(window.scrollY - lastY) / Math.max(8, now - lastT);
      lastY = window.scrollY;
      lastT = now;
      scrollAir(speed);
    };
    const vis = () => onVisibility(document.visibilityState === "visible");
    const theme = new MutationObserver(() => soundTheme(document.documentElement.getAttribute("data-theme") === "light"));
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    document.addEventListener("pointerdown", down, true);
    document.addEventListener("pointerup", unlock, true);
    document.addEventListener("touchend", unlock, true);
    document.addEventListener("click", unlock, true);
    document.addEventListener("keydown", unlock, true);
    document.addEventListener("pointerover", over, true);
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("visibilitychange", vis);
    return () => {
      document.removeEventListener("pointerdown", down, true);
      document.removeEventListener("pointerup", unlock, true);
      document.removeEventListener("touchend", unlock, true);
      document.removeEventListener("click", unlock, true);
      document.removeEventListener("keydown", unlock, true);
      document.removeEventListener("pointerover", over, true);
      window.removeEventListener("scroll", scroll);
      document.removeEventListener("visibilitychange", vis);
      theme.disconnect();
    };
  }, [on]);

  // Section cues, per page. Sections already on screen when the page opens stay quiet; a cue can play again once its
  // section has left the screen, and two cues never land on top of each other.
  useEffect(() => {
    if (!on) return;
    let io: IntersectionObserver | undefined;
    let last = 0;
    const id = window.setTimeout(() => {
      const armed = new WeakSet<Element>();
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) {
              armed.add(e.target);
              continue;
            }
            if (!armed.has(e.target)) continue;
            armed.delete(e.target);
            const now = performance.now();
            if (now - last < 450) continue;
            last = now;
            const el = e.target as HTMLElement;
            sfx(el.dataset.sound!, Number(el.dataset.soundIndex ?? 0));
          }
        },
        { rootMargin: "0px 0px -25% 0px", threshold: 0 },
      );
      document.querySelectorAll("[data-sound]").forEach((el) => io!.observe(el));
    }, 700);
    return () => {
      window.clearTimeout(id);
      io?.disconnect();
    };
  }, [on, pathname]);

  return null;
}
