"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CaseStudyImage } from "@/data/projects";
import { Icon } from "@/components/ui/Icon";
import styles from "./CaseStudy.module.css";

/** Case-study image grid with a full-screen viewer (click, arrows, Esc). */
export function CaseStudyGallery({ images, projectTitle }: { images: CaseStudyImage[]; projectTitle: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const current = open === null ? null : images[open];

  return (
    <>
      <ul className={styles.gallery}>
        {images.map((img, i) => (
          <li key={img.src}>
            <figure className={styles.shot}>
              <button
                type="button"
                className={styles.shotButton}
                onClick={(e) => {
                  lastTrigger.current = e.currentTarget;
                  setOpen(i);
                }}
                aria-label={`View larger: ${img.title}`}
              >
                <Image
                  src={img.src}
                  alt={`${projectTitle} — ${img.title}`}
                  width={img.width}
                  height={img.height}
                  sizes="(max-width: 640px) 100vw, 620px"
                  className={styles.shotImg}
                />
                <span className={styles.zoom} aria-hidden="true">
                  <Icon name="search" size={18} />
                </span>
              </button>
              <figcaption className={styles.caption}>
                <strong>{img.title}</strong>
                <span>{img.caption}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {current &&
        open !== null &&
        // Portal to <body>: sections use content-visibility, which would clip a fixed overlay.
        createPortal(
        <div
          className={styles.viewer}
          role="dialog"
          aria-modal="true"
          aria-label={`${current.title} (${open + 1} of ${images.length})`}
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <button ref={closeRef} type="button" className={styles.viewerClose} onClick={close} aria-label="Close">
            <Icon name="x" size={22} />
          </button>
          <button type="button" className={`${styles.viewerNav} ${styles.viewerPrev}`} onClick={() => step(-1)} aria-label="Previous image">
            <Icon name="chevronLeft" size={26} />
          </button>
          <figure className={styles.viewerFigure}>
            <Image
              key={current.src}
              src={current.src}
              alt={`${projectTitle} — ${current.title}`}
              width={current.width}
              height={current.height}
              sizes="100vw"
              className={styles.viewerImg}
              quality={90}
            />
            <figcaption className={styles.viewerCaption}>
              <span className={styles.viewerCount}>
                {open + 1} / {images.length}
              </span>
              <strong>{current.title}</strong> — {current.caption}
            </figcaption>
          </figure>
          <button type="button" className={`${styles.viewerNav} ${styles.viewerNext}`} onClick={() => step(1)} aria-label="Next image">
            <Icon name="chevronRight" size={26} />
          </button>
        </div>,
        document.body,
      )}
    </>
  );
}
