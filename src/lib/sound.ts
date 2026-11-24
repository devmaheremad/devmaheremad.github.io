"use client";

import { useSyncExternalStore } from "react";

// Sound design, synthesized with the Web Audio API: no audio files, nothing to download, nothing to license.
// On by default (owner, 2026-11-24); the switch in the bar turns it off, and that choice is saved. It tries to start by
// itself as the page opens, which works where the browser allows sound without a gesture (autoplay allowed for the
// site). Most browsers don't by default, and no page can get around that: there it starts with the visitor's first
// click, tap or key press.
//
// One palette for the whole site: A minor pentatonic, soft sines and glassy FM bells in a little reverb, under a quiet
// ambient pad (the site's own sound). Each homepage section has its own cue; scrolling adds a breath of air that
// follows the speed; the hero's press & hold rises with the glass.

const KEY = "sound";
const EVENT = "site:sound";
// Levels: cues peak near -18 dBFS. The ambient pad is barely there (owner, 2026-11-24: "very, very low, just
// audible"): a peak near 0.004, about -48 dBFS, some 30 dB under the cues.
const LOUD = 2.6;
const PAD = 0.0042;
const NOTES = [220, 261.63, 293.66, 329.63, 392, 440, 523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.51];

type Ctx = {
  ac: AudioContext;
  bus: GainNode;
  verb: GainNode;
  noise: AudioBuffer;
  air: GainNode;
  airFilter: BiquadFilterNode;
  pad: GainNode;
  padFilter: BiquadFilterNode;
  hold?: { gain: GainNode; filter: BiquadFilterNode; oscs: OscillatorNode[] };
};

let enabled = false;
let loaded = false;
let c: Ctx | null = null;
// A bare context made as the page opens, to see whether the browser lets sound start without a gesture.
let probe: AudioContext | null = null;

function read() {
  if (!loaded) {
    loaded = true;
    try {
      enabled = localStorage.getItem(KEY) !== "off";
    } catch {}
  }
  return enabled;
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

// "off", "armed" (on, waiting for the first gesture) or "playing".
export type SoundState = "off" | "armed" | "playing";
function state(): SoundState {
  if (!read()) return "off";
  return c && c.ac.state === "running" ? "playing" : "armed";
}

export function useSoundState() {
  return useSyncExternalStore(subscribe, state, () => "off" as SoundState);
}

export function useSoundOn() {
  return useSoundState() !== "off";
}

const isLight = () => document.documentElement.getAttribute("data-theme") === "light";

// ---------- graph ----------
function build(ac = new AudioContext({ latencyHint: "interactive" })): Ctx {
  ac.onstatechange = () => window.dispatchEvent(new Event(EVENT));
  const comp = ac.createDynamicsCompressor();
  comp.threshold.value = -18;
  comp.ratio.value = 3;
  const master = ac.createGain();
  master.gain.value = 0.8;
  comp.connect(master).connect(ac.destination);

  const bus = ac.createGain();
  bus.connect(comp);

  // Reverb: a short stereo tail of decaying noise.
  const len = Math.floor(ac.sampleRate * 2.4);
  const ir = ac.createBuffer(2, len, ac.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = ir.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2);
  }
  const conv = ac.createConvolver();
  conv.buffer = ir;
  const verb = ac.createGain();
  const ret = ac.createGain();
  ret.gain.value = 0.32;
  verb.connect(conv).connect(ret).connect(comp);

  const noise = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate);
  const nd = noise.getChannelData(0);
  for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;

  // Scroll air: looped noise, silent until the page moves. Kept light and soft (owner, 2026-11-24): a dark, rounded
  // band, a sweeping low-pass without resonance, then a fixed one so no hiss gets through even on a fast scroll.
  const airSrc = ac.createBufferSource();
  airSrc.buffer = noise;
  airSrc.loop = true;
  const hp = ac.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 140;
  const airFilter = ac.createBiquadFilter();
  airFilter.type = "lowpass";
  airFilter.frequency.value = 400;
  airFilter.Q.value = 0.5;
  const airSoft = ac.createBiquadFilter();
  airSoft.type = "lowpass";
  airSoft.frequency.value = 1400;
  airSoft.Q.value = 0.5;
  const air = ac.createGain();
  air.gain.value = 0;
  airSrc.connect(hp).connect(airFilter).connect(airSoft).connect(air).connect(bus);
  airSrc.start();

  // Ambient pad: a soft, barely-there bed. Pure sines, no bass: A3 and E4, each a pair detuned by a hair so it drifts
  // instead of beating, under a slowly breathing low-pass, with a little of it sent to the reverb.
  const pad = ac.createGain();
  pad.gain.value = 0;
  const padFilter = ac.createBiquadFilter();
  padFilter.type = "lowpass";
  padFilter.frequency.value = isLight() ? 560 : 400;
  padFilter.Q.value = 0.3;
  padFilter.connect(pad);
  pad.connect(bus);
  const padVerb = ac.createGain();
  padVerb.gain.value = 0.35;
  pad.connect(padVerb).connect(verb);
  for (const [f, level] of [[220, 0.32], [329.63, 0.2]]) {
    for (const cents of [-2.5, 2.5]) {
      const o = ac.createOscillator();
      o.type = "sine";
      o.frequency.value = f;
      o.detune.value = cents;
      const g = ac.createGain();
      g.gain.value = level;
      o.connect(g).connect(padFilter);
      o.start();
    }
  }
  const lfo = ac.createOscillator();
  lfo.frequency.value = 0.03;
  const depth = ac.createGain();
  depth.gain.value = 70;
  lfo.connect(depth).connect(padFilter.frequency);
  lfo.start();

  return { ac, bus, verb, noise, air, airFilter, pad, padFilter };
}

function running() {
  return enabled && c && c.ac.state === "running" ? c : null;
}

// Try to start without a gesture, as the page opens. Where the browser allows it (autoplay allowed for the site) the
// sound simply plays. Most browsers hold it back by default, and no page can get around that: there the probe waits
// and the first click, tap or key press starts the sound (unlockSound). Firefox can say beforehand that it will
// refuse, which spares the console warning there.
export function autoStartSound() {
  if (!read() || c || probe) return;
  const nav = navigator as Navigator & { getAutoplayPolicy?: (type: "audiocontext") => string };
  try {
    if (nav.getAutoplayPolicy?.("audiocontext") === "disallowed") return;
  } catch {}
  const ac = new AudioContext({ latencyHint: "interactive" });
  probe = ac;
  const go = () => {
    if (probe !== ac || c) return;
    probe = null;
    if (!enabled) return void ac.close().catch(() => {});
    c = build(ac);
    fadeIn(c);
    window.dispatchEvent(new Event(EVENT));
  };
  if (ac.state === "running") go();
  else ac.resume().then(go, () => {});
}

function fadeIn(x: Ctx) {
  const t = x.ac.currentTime;
  x.pad.gain.cancelScheduledValues(t);
  x.pad.gain.setTargetAtTime(PAD, t, 4);
}

// Start (or resume) audio. Without autoplay it must run inside a click, tap or key press the first time. The pad
// creeps in.
export function unlockSound() {
  if (!read()) return;
  if (!c) {
    // A context made outside a gesture the browser counts is held back and can refuse to start later, even inside one
    // (Chromium's strict autoplay mode does). The start of a touch doesn't count, only its end, so wait for that.
    if (navigator.userActivation?.isActive === false) return;
    // The probe made as the page opened is one of those: drop it and build afresh inside the gesture.
    if (probe) {
      probe.close().catch(() => {});
      probe = null;
    }
    c = build();
  }
  if (c.ac.state !== "running") c.ac.resume().catch(() => {});
  fadeIn(c);
}

export function setSound(on: boolean) {
  read();
  enabled = on;
  try {
    localStorage.setItem(KEY, on ? "on" : "off");
  } catch {}
  window.dispatchEvent(new Event(EVENT));
  if (on) {
    unlockSound();
    window.setTimeout(() => sfx("on"), 60);
    return;
  }
  if (probe) {
    probe.close().catch(() => {});
    probe = null;
  }
  if (c) {
    const t = c.ac.currentTime;
    c.pad.gain.setTargetAtTime(0, t, 0.25);
    c.air.gain.setTargetAtTime(0, t, 0.1);
    stopHold();
    const ac = c.ac;
    window.setTimeout(() => !enabled && ac.suspend().catch(() => {}), 1200);
  }
}

// Pause with the tab, resume when it is back.
export function onVisibility(visible: boolean) {
  if (!c || !enabled) return;
  if (visible) c.ac.resume().catch(() => {});
  else c.ac.suspend().catch(() => {});
}

// The pad brightens on paper and darkens at night.
export function soundTheme(light: boolean) {
  if (!c) return;
  c.padFilter.frequency.setTargetAtTime(light ? 560 : 400, c.ac.currentTime, 0.8);
}

// ---------- voices ----------
type ToneOpts = { f: number; type?: OscillatorType; at?: number; a?: number; d?: number; g?: number; verb?: number; to?: number; pan?: number };

function tone(x: Ctx, { f, type = "sine", at = 0, a = 0.004, d = 0.3, g = 0.08, verb = 0.2, to, pan = 0 }: ToneOpts) {
  const t = x.ac.currentTime + at;
  const o = x.ac.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(f, t);
  if (to) o.frequency.exponentialRampToValueAtTime(to, t + d);
  const e = x.ac.createGain();
  e.gain.setValueAtTime(0, t);
  e.gain.linearRampToValueAtTime(g * LOUD, t + a);
  e.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  const p = x.ac.createStereoPanner();
  p.pan.value = pan;
  o.connect(e).connect(p);
  p.connect(x.bus);
  if (verb) {
    const s = x.ac.createGain();
    s.gain.value = verb;
    p.connect(s).connect(x.verb);
  }
  o.start(t);
  o.stop(t + a + d + 0.05);
}

// Glassy FM bell: a sine carrier, a sine modulator at 3.5x whose depth dies away faster than the note.
function bell(x: Ctx, f: number, { at = 0, d = 1.4, g = 0.05, verb = 0.45, pan = 0 } = {}) {
  const t = x.ac.currentTime + at;
  const car = x.ac.createOscillator();
  car.frequency.value = f;
  const mod = x.ac.createOscillator();
  mod.frequency.value = f * 3.5;
  const idx = x.ac.createGain();
  idx.gain.setValueAtTime(f * 1.6, t);
  idx.gain.exponentialRampToValueAtTime(1, t + d * 0.6);
  mod.connect(idx).connect(car.frequency);
  const e = x.ac.createGain();
  e.gain.setValueAtTime(0, t);
  e.gain.linearRampToValueAtTime(g * LOUD, t + 0.005);
  e.gain.exponentialRampToValueAtTime(0.0001, t + d);
  const p = x.ac.createStereoPanner();
  p.pan.value = pan;
  car.connect(e).connect(p);
  p.connect(x.bus);
  const s = x.ac.createGain();
  s.gain.value = verb;
  p.connect(s).connect(x.verb);
  car.start(t);
  mod.start(t);
  car.stop(t + d + 0.05);
  mod.stop(t + d + 0.05);
}

// Marimba-like pluck: fundamental plus a quick 4th partial.
function pluck(x: Ctx, f: number, at = 0, g = 0.07, pan = 0) {
  tone(x, { f, at, d: 0.55, g, verb: 0.25, pan });
  tone(x, { f: f * 4, at, d: 0.09, g: g * 0.35, verb: 0.1, pan });
}

// Filtered noise sweeping up or down, panned across.
function whoosh(x: Ctx, up: boolean, { dur = 0.6, g = 0.11, at = 0 } = {}) {
  const t = x.ac.currentTime + at;
  const src = x.ac.createBufferSource();
  src.buffer = x.noise;
  const bp = x.ac.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = 1.1;
  bp.frequency.setValueAtTime(up ? 280 : 3200, t);
  bp.frequency.exponentialRampToValueAtTime(up ? 3200 : 260, t + dur);
  const e = x.ac.createGain();
  e.gain.setValueAtTime(0, t);
  e.gain.linearRampToValueAtTime(g * LOUD, t + dur * 0.38);
  e.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  const p = x.ac.createStereoPanner();
  p.pan.setValueAtTime(up ? -0.5 : 0.5, t);
  p.pan.linearRampToValueAtTime(up ? 0.5 : -0.5, t + dur);
  src.connect(bp).connect(e).connect(p).connect(x.bus);
  const s = x.ac.createGain();
  s.gain.value = 0.3;
  p.connect(s).connect(x.verb);
  src.start(t, Math.random());
  src.stop(t + dur + 0.05);
}

const N = (i: number) => NOTES[Math.max(0, Math.min(NOTES.length - 1, i))];

const RECIPES: Record<string, (x: Ctx, arg?: number) => void> = {
  hover: (x) => tone(x, { f: 2300 + Math.random() * 160, d: 0.04, g: 0.03, verb: 0.08 }),
  tap: (x) => {
    tone(x, { f: 880, to: 440, d: 0.08, g: 0.09, verb: 0.12 });
    tone(x, { f: 4200, d: 0.012, g: 0.02, verb: 0 });
  },
  on: (x) => {
    pluck(x, N(10), 0, 0.07);
    pluck(x, N(13), 0.09, 0.06);
  },
  off: (x) => {
    pluck(x, N(13), 0, 0.05);
    pluck(x, N(10), 0.09, 0.04);
  },
  "menu-open": (x) => whoosh(x, true, { dur: 0.7 }),
  "menu-close": (x) => whoosh(x, false, { dur: 0.55, g: 0.08 }),
  // Page curtain: air rising over the page, then a soft landing on the new one.
  leave: (x) => whoosh(x, true, { dur: 0.75, g: 0.1 }),
  land: (x) => {
    tone(x, { f: 140, to: 60, d: 0.35, g: 0.12, verb: 0.1 });
    bell(x, N(5), { d: 1.1, g: 0.025 });
  },
  "theme-light": (x) => {
    [7, 9, 10, 12, 13].forEach((n, i) => bell(x, N(n), { at: i * 0.045, d: 0.9, g: 0.022, pan: -0.4 + i * 0.2 }));
    whoosh(x, true, { dur: 0.8, g: 0.05 });
  },
  "theme-dark": (x) => {
    [8, 6, 4, 2, 0].forEach((n, i) => tone(x, { f: N(n), type: "triangle", at: i * 0.05, d: 0.6, g: 0.035, verb: 0.4, pan: 0.4 - i * 0.2 }));
    whoosh(x, false, { dur: 0.8, g: 0.05 });
  },
  dive: (x) => {
    whoosh(x, false, { dur: 1, g: 0.14 });
    tone(x, { f: 220, to: 50, d: 0.9, g: 0.13, verb: 0.2 });
  },
  card: (x, i = 0) => pluck(x, N(5 + (i % 5)), 0, 0.05, (i % 2 ? 1 : -1) * 0.3),
  // Sections of the homepage, one cue each.
  manifesto: (x) => [0, 2, 4].forEach((n) => tone(x, { f: N(n), type: "triangle", a: 0.5, d: 1.8, g: 0.03, verb: 0.6 })),
  stats: (x) => {
    // Ticks that slow down like the counters (they ease out over two seconds), then a bell when they settle.
    for (let k = 1; k <= 16; k++) tone(x, { f: 1300 + k * 70, at: 1.9 * (k / 16) ** 2, d: 0.03, g: 0.022, verb: 0.05 });
    bell(x, N(12), { at: 1.95, d: 1.2, g: 0.03 });
  },
  work: (x) => [5, 7, 9].forEach((n, i) => pluck(x, N(n), i * 0.075, 0.055, -0.3 + i * 0.3)),
  projects: (x) => [7, 10].forEach((n, i) => pluck(x, N(n), i * 0.09, 0.05)),
  "case-studies": (x) => {
    bell(x, N(8), { d: 1.6, g: 0.04 });
    bell(x, N(11), { at: 0.12, d: 1.4, g: 0.022, pan: 0.3 });
  },
  experience: (x) => {
    bell(x, N(0), { d: 2.2, g: 0.05, verb: 0.6 });
    tone(x, { f: 1760, at: 0.02, d: 0.05, g: 0.02, verb: 0.1 });
  },
  "go-deeper": (x) => [9, 7, 5].forEach((n, i) => pluck(x, N(n), i * 0.08, 0.05, 0.3 - i * 0.3)),
  marquee: (x) => whoosh(x, true, { dur: 1.3, g: 0.06 }),
  contact: (x) => [5, 8, 10].forEach((n, i) => bell(x, N(n), { at: i * 0.07, d: 2.2, g: 0.035, verb: 0.65, pan: -0.3 + i * 0.3 })),
  // Inner pages: a bell per section, its pitch from the section number.
  section: (x, i = 0) => bell(x, N(4 + (i % 7)), { d: 1.3, g: 0.035 }),
};

export function sfx(name: string, arg?: number) {
  const x = running();
  const r = RECIPES[name];
  if (x && r) r(x, arg);
}

// Scroll: a soft breath of air that follows the speed (pixels per millisecond), eases in and fades when the page stops.
// About a third of its first level, and darker: the low-pass opens from 300 Hz to 1.1 kHz at most.
export function scrollAir(speed: number) {
  const x = running();
  if (!x) return;
  const t = x.ac.currentTime;
  const v = Math.min(1, speed / 4);
  // Drop the fade-out planned by the previous scroll event, keeping the level where it is now.
  const g = x.air.gain as AudioParam & { cancelAndHoldAtTime?: (t: number) => AudioParam };
  if (g.cancelAndHoldAtTime) g.cancelAndHoldAtTime(t);
  else g.cancelScheduledValues(t);
  g.setTargetAtTime(Math.pow(v, 1.2) * 0.085, t, 0.1);
  x.airFilter.frequency.setTargetAtTime(300 + v * 800, t, 0.2);
  g.setTargetAtTime(0, t + 0.14, 0.25);
}

// Hero press & hold: a detuned fifth that climbs and opens up with the power (0 to 1).
export function holdSound(power: number) {
  const x = running();
  if (!x) return;
  if (power <= 0.005) return stopHold();
  if (!x.hold) {
    const gain = x.ac.createGain();
    gain.gain.value = 0;
    const filter = x.ac.createBiquadFilter();
    filter.type = "lowpass";
    filter.Q.value = 5;
    filter.connect(gain).connect(x.bus);
    const s = x.ac.createGain();
    s.gain.value = 0.35;
    gain.connect(s).connect(x.verb);
    const oscs = [1, 1.5, 2.003].map((m) => {
      const o = x.ac.createOscillator();
      o.type = "sawtooth";
      o.frequency.value = 110 * m;
      o.connect(filter);
      o.start();
      return o;
    });
    x.hold = { gain, filter, oscs };
  }
  const t = x.ac.currentTime;
  const h = x.hold;
  h.oscs.forEach((o, i) => o.frequency.setTargetAtTime(110 * [1, 1.5, 2.003][i] * (1 + power * 1.5), t, 0.05));
  h.filter.frequency.setTargetAtTime(260 + power * 3200, t, 0.05);
  h.gain.gain.setTargetAtTime(power * 0.11, t, 0.05);
}

function stopHold() {
  const x = c;
  if (!x?.hold) return;
  const h = x.hold;
  x.hold = undefined;
  const t = x.ac.currentTime;
  h.gain.gain.setTargetAtTime(0, t, 0.08);
  h.oscs.forEach((o) => o.stop(t + 0.6));
}
