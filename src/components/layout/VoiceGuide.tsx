"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  narrationAudio,
  sectionNarration,
  voiceGuideOnNarration,
  welcomeNarration,
} from "@/data/narration";
import { Icon } from "@/components/ui/Icon";
import { VOICE_SKIP_EVENT, VOICE_START_EVENT } from "@/lib/intro";
import styles from "./VoiceGuide.module.css";

/** True while the welcome screen (IntroGate) is covering the page. */
const introOpen = () => document.documentElement.classList.contains("intro-open");

const MUTED_KEY = "voice-guide-muted"; // localStorage — visitor's on/off choice
const DWELL_MS = 800; // a section must stay in view this long before it is described

function readMuted(): boolean {
  try {
    return localStorage.getItem(MUTED_KEY) === "true";
  } catch {
    return false;
  }
}

function saveMuted(value: boolean) {
  try {
    localStorage.setItem(MUTED_KEY, String(value));
  } catch {
    /* storage unavailable (private mode) — the choice lasts for this page view */
  }
}

/* ---------- browser-voice fallback: most realistic MALE English voice available ---------- */

/** Male voices, most natural first (a small bonus by position). */
const MALE_NAMES = [
  "andrew", "brian", "guy", "christopher", "eric", "roger", "steffan", "ryan", "thomas",
  "davis", "tony", "jason", "william", "liam", "nathan", "evan", "tom", "aaron", "alex",
  "daniel", "oliver", "arthur", "gordon", "lee", "rishi", "fred", "james", "george",
  "david", "mark", "male",
];

const FEMALE_NAMES = [
  "aria", "jenny", "sonia", "libby", "natasha", "emma", "ava", "michelle", "samantha",
  "zoe", "karen", "moira", "tessa", "serena", "susan", "hazel", "zira", "allison", "female",
];

function scoreVoice(v: SpeechSynthesisVoice): number {
  const name = v.name.toLowerCase();
  if (!v.lang.toLowerCase().startsWith("en")) return -1;
  let score = 0;
  if (/natural|neural/.test(name)) score += 100; // Edge's Microsoft neural voices
  if (/premium|enhanced/.test(name)) score += 70; // Apple high-quality voices
  if (name.includes("online")) score += 40;
  if (name.includes("google")) score += 30;

  // "Google US English" is a female voice even though its name doesn't say so.
  const female = FEMALE_NAMES.some((f) => name.includes(f)) || name === "google us english";
  const maleIndex = female ? -1 : MALE_NAMES.findIndex((m) => name.includes(m));
  if (female) score -= 80;
  else if (maleIndex >= 0) score += 30 + Math.max(0, 12 - maleIndex);

  if (/^en[-_](us|gb)/i.test(v.lang)) score += 5;
  return score;
}

function pickVoice(): SpeechSynthesisVoice | undefined {
  let best: SpeechSynthesisVoice | undefined;
  let bestScore = -1;
  for (const v of window.speechSynthesis.getVoices()) {
    const score = scoreVoice(v);
    if (score > bestScore) {
      bestScore = score;
      best = v;
    }
  }
  return best;
}

function whenVoicesReady(cb: () => void) {
  const synth = window.speechSynthesis;
  if (synth.getVoices().length) return cb();
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    synth.removeEventListener("voiceschanged", finish);
    cb();
  };
  synth.addEventListener("voiceschanged", finish);
  window.setTimeout(finish, 1200);
}

/** Chrome cuts off long utterances, so the browser voice speaks sentence by sentence. */
function sentences(text: string): string[] {
  return (text.match(/[^.!?]+[.!?]*/g) ?? [text]).map((s) => s.trim()).filter(Boolean);
}

type Line = [key: string, text: string];
type Hooks = { onStart?: () => void; onBlocked?: () => void };

/**
 * Voice guide (male voice).
 * - Plays pre-recorded narration (public/audio/narration), falling back to the
 *   browser's best male voice for any line without an up-to-date recording.
 * - Hero: welcome + introduction. Other sections: a short description once the
 *   section has stayed in view for a moment. Coming back to a section after
 *   visiting another one describes it again; opening it from a link always does.
 * - Browsers only allow sound after the first click / tap / key press, so a small
 *   hint invites the visitor to click when automatic playback is blocked.
 * - The speaker button (bottom-left) turns the guide on or off (remembered).
 */
export function VoiceGuide() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(false);
  const [hint, setHint] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Shared mutable state (changes here never need a re-render)
  const s = useRef({
    muted: false,
    unlocked: false,
    welcomed: false,
    currentId: "",
    lastSpokenId: "",
    pendingId: "",
    forced: new Set<string>(),
    /** One reusable player: iOS only lets an element that a tap started keep playing. */
    player: null as HTMLAudioElement | null,
    queue: [] as (() => void)[],
    busy: false,
    /** Bumped on every interruption; anything scheduled before it is dropped. */
    seq: 0,
  }).current;

  /* ---------- playback engine ---------- */

  const stopAll = () => {
    s.seq++;
    s.queue = [];
    s.busy = false;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    s.player?.pause();
  };

  const playNext = () => {
    const next = s.queue.shift();
    s.busy = Boolean(next);
    next?.();
  };

  const speakWithBrowserVoice = (text: string, token: number, hooks: Hooks, done: () => void) => {
    if (!("speechSynthesis" in window)) return done();
    whenVoicesReady(() => {
      if (token !== s.seq) return;
      const voice = pickVoice();
      const parts = sentences(text);
      parts.forEach((part, i) => {
        const u = new SpeechSynthesisUtterance(part);
        if (voice) u.voice = voice;
        u.lang = voice?.lang ?? "en-US";
        u.rate = 0.95; // calm pace for clear words
        u.pitch = 1; // natural pitch — shifting it makes voices sound robotic
        if (i === 0) {
          u.onstart = () => hooks.onStart?.();
          u.onerror = (e) => {
            if (e.error === "not-allowed") hooks.onBlocked?.();
          };
        }
        if (i === parts.length - 1) u.onend = () => token === s.seq && done();
        window.speechSynthesis.speak(u);
      });
    });
  };

  /** Plays one line: its recording if available, otherwise the browser voice. */
  const playLine = ([key, text]: Line, token: number, hooks: Hooks, done: () => void) => {
    if (token !== s.seq) return;
    const file = narrationAudio[key];
    if (!file) return speakWithBrowserVoice(text, token, hooks, done);

    const audio = (s.player ??= new Audio());
    audio.onplay = () => token === s.seq && hooks.onStart?.();
    audio.onended = () => token === s.seq && done();
    // Missing/broken file → fall back to the browser voice for this line.
    audio.onerror = () => token === s.seq && speakWithBrowserVoice(text, token, hooks, done);
    audio.src = file;
    audio.play().catch((err: DOMException) => {
      if (token === s.seq && err?.name === "NotAllowedError") hooks.onBlocked?.();
    });
  };

  /** Speaks lines in order, replacing whatever is currently playing. */
  const speak = (lines: Line[], hooks: Hooks = {}) => {
    stopAll();
    const token = s.seq;
    lines.forEach((line, i) => {
      s.queue.push(() => playLine(line, token, i === 0 ? hooks : {}, playNext));
    });
    playNext();
  };

  /** What to say for a section. The hero (and the first line of each visit) includes the welcome. */
  const linesFor = (id: string): Line[] => {
    const lines: Line[] = [];
    if (id === "home" || !s.welcomed) {
      lines.push(["welcome", welcomeNarration]);
      s.welcomed = true;
    }
    if (sectionNarration[id]) lines.push([id, sectionNarration[id]]);
    return lines;
  };

  const narrate = (id: string, force: boolean) => {
    if (!sectionNarration[id] || s.muted) return;
    if (!s.unlocked) {
      s.pendingId = id; // describe it as soon as the visitor interacts
      return;
    }
    if (!force && id === s.lastSpokenId) return; // still the same section
    s.lastSpokenId = id;
    speak(linesFor(id));
  };

  /* ---------- setup: preferences, unlock on first interaction, try autoplay ---------- */

  useEffect(() => {
    setReady(true);
    s.muted = readMuted();
    setMuted(s.muted);

    // Warm up the first recordings so the hero plays without delay.
    for (const key of ["welcome", "home"]) {
      const file = narrationAudio[key];
      if (file) {
        const a = new Audio();
        a.preload = "auto";
        a.src = file;
      }
    }

    // Completed clicks/taps and key presses are what browsers accept as permission for sound.
    const onGesture = (e: Event) => {
      const target = e.target as Element | null;
      if (s.unlocked || buttonRef.current?.contains(target) || target?.closest?.("[data-voice-ignore]")) return;
      s.unlocked = true;
      setHint(false);
      if (s.muted) return;
      const id = s.pendingId || s.currentId || "home";
      s.pendingId = "";
      s.lastSpokenId = id;
      s.welcomed = false;
      speak(linesFor(id), {
        // Still blocked (rare): wait for the next interaction and show the hint again.
        onBlocked: () => {
          stopAll();
          s.unlocked = false;
          s.lastSpokenId = "";
          s.pendingId = id;
          setHint(true);
        },
      });
    };
    const gestureEvents = ["click", "touchend", "keydown"] as const;
    gestureEvents.forEach((type) => window.addEventListener(type, onGesture, true));

    // Try right away (some browsers allow it); otherwise wait for the first interaction.
    // Welcome screen: "Enter Portfolio" starts the guide (that click permits sound)…
    const onIntroStart = () => {
      s.unlocked = true;
      setHint(false);
      if (s.muted) return;
      const id = s.currentId || "home";
      s.lastSpokenId = id;
      s.welcomed = false;
      speak(linesFor(id));
    };
    // …"Enter without sound" turns the guide off for this visit only (not remembered).
    const onIntroSkip = () => {
      s.unlocked = true;
      s.muted = true;
      setMuted(true);
      setHint(false);
      stopAll();
    };
    window.addEventListener(VOICE_START_EVENT, onIntroStart);
    window.addEventListener(VOICE_SKIP_EVENT, onIntroSkip);

    const autoplayTimer = window.setTimeout(() => {
      if (s.muted || s.unlocked || introOpen()) return;
      const id = s.currentId || "home";
      s.lastSpokenId = id;
      speak(linesFor(id), {
        onStart: () => {
          s.unlocked = true;
          setHint(false);
        },
        onBlocked: () => {
          stopAll();
          s.lastSpokenId = "";
          s.welcomed = false;
          s.pendingId = s.currentId || "home";
        },
      });
    }, 300);

    const hintTimer = window.setTimeout(() => {
      if (!s.unlocked && !s.muted && !introOpen()) setHint(true);
    }, 1500);

    return () => {
      window.clearTimeout(autoplayTimer);
      window.clearTimeout(hintTimer);
      gestureEvents.forEach((type) => window.removeEventListener(type, onGesture, true));
      window.removeEventListener(VOICE_START_EVENT, onIntroStart);
      window.removeEventListener(VOICE_SKIP_EVENT, onIntroSkip);
      stopAll();
    };
    // Runs once for the lifetime of the layout.
  }, []);

  /* ---------- section tracking (re-run on each page) ---------- */

  useEffect(() => {
    let timer = 0;
    s.lastSpokenId = ""; // a new page: its sections are all "new"

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          s.currentId = id;
          window.clearTimeout(timer);
          if (!sectionNarration[id]) {
            // Passing through a silent section counts as leaving the previous one.
            s.lastSpokenId = "";
            continue;
          }
          timer = window.setTimeout(() => {
            if (s.currentId !== id) return;
            narrate(id, s.forced.delete(id));
          }, DWELL_MS);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll<HTMLElement>("main section[id]").forEach((el) => observer.observe(el));

    // Opening a section from a link always describes it, even if it was just described.
    const onLinkClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href*='#']");
      const id = link?.getAttribute("href")?.split("#")[1];
      if (!id || !sectionNarration[id]) return;
      if (s.currentId === id) window.setTimeout(() => narrate(id, true), 300);
      else s.forced.add(id);
    };
    document.addEventListener("click", onLinkClick, true);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener("click", onLinkClick, true);
      s.currentId = "";
    };
    // Re-observe the new page's sections after each navigation.
  }, [pathname]);

  /* ---------- on/off button ---------- */

  const toggle = () => {
    const next = !muted;
    setMuted(next);
    setHint(false);
    s.muted = next;
    saveMuted(next);
    if (next) {
      stopAll();
      return;
    }
    // Turning on (this click also unlocks sound): confirm, then describe where they are.
    s.unlocked = true;
    const id = s.currentId;
    s.lastSpokenId = id;
    const lines: Line[] = [["on", voiceGuideOnNarration]];
    if (sectionNarration[id]) lines.push([id, sectionNarration[id]]);
    speak(lines);
  };

  if (!ready) return null;

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={styles.button}
        onClick={toggle}
        aria-pressed={!muted}
        aria-label={muted ? "Voice guide off — turn on" : "Voice guide on — turn off"}
        data-label={muted ? "Voice guide off" : "Voice guide on"}
      >
        <Icon name={muted ? "volumeOff" : "volume"} size={20} />
      </button>
      {hint && (
        <p className={styles.hint} role="status">
          <Icon name="volume" size={15} />
          <span>
            <span className={styles.hintLong}>Click anywhere to start the voice guide</span>
            <span className={styles.hintShort}>Tap to start the voice guide</span>
          </span>
        </p>
      )}
    </>
  );
}
