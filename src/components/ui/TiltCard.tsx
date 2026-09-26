"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  max?: number;
  as?: "div" | "article" | "li";
};

/**
 * Subtle 3D tilt + pointer spotlight. Writes CSS variables only (no re-renders):
 * --rx / --ry for rotation, --mx / --my for the spotlight position.
 */
export function TiltCard({ children, className = "", max = 6, as = "div" }: TiltCardProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const Tag = as as "div";

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (!reduce) {
      el.style.setProperty("--rx", `${(0.5 - py) * max}deg`);
      el.style.setProperty("--ry", `${(px - 0.5) * max}deg`);
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={`tilt ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </Tag>
  );
}
