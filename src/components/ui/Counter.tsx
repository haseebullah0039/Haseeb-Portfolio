"use client";

import { animate, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useRef } from "react";

/**
 * Counts up to a (factual) value when scrolled into view.
 * Driven by a motion value, so the number updates without re-rendering React.
 */
export function Counter({ to, duration = 1.6, suffix = "" }: { to: number; duration?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      value.set(to);
      return;
    }
    const controls = animate(value, to, { duration, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, to, duration, reduce, value]);

  return (
    <span ref={ref}>
      <m.span aria-hidden="true">{text}</m.span>
      <span className="sr-only">
        {to}
        {suffix}
      </span>
    </span>
  );
}
