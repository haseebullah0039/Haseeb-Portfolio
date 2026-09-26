"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

const TYPE_MS = 75;
const DELETE_MS = 40;
const HOLD_MS = 1600;

/**
 * Types each title, holds it, deletes it, then moves to the next.
 * Only this small element re-renders. Screen readers get the full list once;
 * users who prefer reduced motion see the primary title without typing.
 */
export function TypewriterTitle({ titles }: { titles: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(titles[0]);
  const [deleting, setDeleting] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const full = titles[index];
    let delay = deleting ? DELETE_MS : TYPE_MS;
    if (!deleting && text === full) delay = HOLD_MS;

    // Browsers throttle timers in background tabs, so this stays cheap when hidden.
    const id = window.setTimeout(() => {
      if (!deleting && text === full) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % titles.length);
      } else {
        setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
      }
    }, delay);
    return () => window.clearTimeout(id);
  }, [text, deleting, index, titles, reduce]);

  return (
    <p className={styles.title}>
      <span className="sr-only">{titles.join(", ")}</span>
      <span aria-hidden="true" className={styles.titleText}>
        {reduce ? titles[0] : text}
        <span className={styles.caret} />
      </span>
    </p>
  );
}
