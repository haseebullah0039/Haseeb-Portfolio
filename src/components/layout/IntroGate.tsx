"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { Icon } from "@/components/ui/Icon";
import { INTRO_SEEN_KEY, VOICE_SKIP_EVENT, VOICE_START_EVENT } from "@/lib/intro";
import styles from "./IntroGate.module.css";

/**
 * Full-screen welcome shown once per visit. Browsers only allow sound after a
 * click, so the "Enter Portfolio" button doubles as the click that starts the
 * voice guide. "Enter without sound" skips the voice for this visit.
 */
export function IntroGate() {
  const [closing, setClosing] = useState(false);
  const enterRef = useRef<HTMLButtonElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);

  const isOpen = () => document.documentElement.classList.contains("intro-open");

  const close = (withSound: boolean) => {
    if (!isOpen() || closing) return;
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "true");
    } catch {
      /* ignore */
    }
    // Dispatched inside the click handler, so the browser allows the audio to start.
    window.dispatchEvent(new Event(withSound ? VOICE_START_EVENT : VOICE_SKIP_EVENT));
    setClosing(true);
    window.setTimeout(() => {
      document.documentElement.classList.remove("intro-open");
      setClosing(false);
      // Hand keyboard focus to the page content now that the dialog is gone.
      document.getElementById("main")?.focus({ preventScroll: true });
    }, 650);
  };

  useEffect(() => {
    if (!isOpen()) return;
    enterRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (!isOpen()) return;
      if (e.key === "Escape") close(false);
      // Keep keyboard focus inside the dialog.
      if (e.key === "Tab") {
        const first = enterRef.current;
        const last = skipRef.current;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // Set up once on first load.
  }, []);

  const split = 6; // "Haseeb" | "ullah" — one word, two colours

  return (
    <div
      className={`${styles.intro} ${closing ? styles.closing : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
      data-voice-ignore
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.logo}>
          <Image src={site.logo} alt="" width={200} height={200} sizes="112px" priority />
        </div>

        <p className={styles.welcome}>Welcome to the portfolio of</p>
        <h2 id="intro-title" className={styles.name}>
          {site.name.slice(0, split)}
          <span className={styles.accent}>{site.name.slice(split)}</span>
        </h2>
        <p className={styles.roles}>{site.tagline}</p>

        <button ref={enterRef} type="button" className={`btn btn-primary ${styles.enter}`} onClick={() => close(true)}>
          <Icon name="volume" size={20} />
          Enter Portfolio
          <Icon name="arrowRight" size={18} className="btn-arrow" />
        </button>
        <p className={styles.note}>Includes a short voice guide</p>

        <button ref={skipRef} type="button" className={styles.skip} onClick={() => close(false)}>
          <Icon name="volumeOff" size={15} />
          Enter without sound
        </button>
      </div>
    </div>
  );
}
