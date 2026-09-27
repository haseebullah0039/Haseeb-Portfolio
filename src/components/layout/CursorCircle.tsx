"use client";

import { useEffect, useRef } from "react";
import styles from "./CursorCircle.module.css";

const INTERACTIVE = "a, button, [role='button'], input, select, textarea, label, summary";

/**
 * Orange circle that follows the mouse pointer exactly (no lag), around the
 * native cursor. Grows over clickable elements, shrinks while pressed.
 * Mouse / fine-pointer devices only; writes styles directly (no React re-renders).
 */
export function CursorCircle() {
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let x = -100;
    let y = -100;
    let frame = 0;

    const render = () => {
      frame = 0;
      outer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      outer.dataset.visible = "true";
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      outer.dataset.hover = target?.closest(INTERACTIVE) ? "true" : "false";
    };

    const onDown = () => (outer.dataset.pressed = "true");
    const onUp = () => (outer.dataset.pressed = "false");
    const onLeave = () => (outer.dataset.visible = "false");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={outerRef} className={styles.outer} aria-hidden="true" data-visible="false">
      <div className={styles.ring} />
    </div>
  );
}
