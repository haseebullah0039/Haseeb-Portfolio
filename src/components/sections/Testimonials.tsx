"use client";

import Image from "next/image";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useState } from "react";
import { testimonials } from "@/data/testimonials";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./Testimonials.module.css";

function initials(name: string) {
  const clean = name.replace(/[[\]]/g, "").trim();
  return clean
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const total = testimonials.length;
  const t = testimonials[index];
  const hasPlaceholders = testimonials.some((x) => x.placeholder);

  const go = (d: number) => setState(([i]) => [(i + d + total) % total, d]);

  return (
    <section id="testimonials" className="section" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHeading
          index="11"
          eyebrow="Testimonials"
          id="testimonials-title"
          align="center"
          title={
            <>
              Client <span className="gradient-text">Feedback</span>
            </>
          }
          description={
            hasPlaceholders
              ? "Real client feedback will appear here. Entries below are clearly marked placeholders."
              : "What clients say about working together."
          }
        />

        <div
          className={styles.slider}
          role="region"
          aria-roledescription="carousel"
          aria-label="Testimonials"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
        >
          <div className={styles.glow} aria-hidden="true" />
          <Icon name="quote" size={56} className={styles.quoteIcon} />

          <div className={styles.viewport} aria-live="polite">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <m.figure
                key={t.id}
                className={styles.slide}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${total}`}
              >
                {t.placeholder && <span className="chip chip--sample">Placeholder — replace with a real testimonial</span>}
                <blockquote className={styles.quote}>
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption className={styles.author}>
                  <span className={styles.avatar} aria-hidden="true">
                    {t.avatar ? (
                      <Image src={t.avatar} alt="" width={52} height={52} />
                    ) : (
                      initials(t.name) || "?"
                    )}
                  </span>
                  <span>
                    <span className={styles.name}>{t.name}</span>
                    <span className={styles.role}>{t.role}</span>
                  </span>
                  {t.projectType && <span className={`chip ${styles.type}`}>{t.projectType}</span>}
                </figcaption>
              </m.figure>
            </AnimatePresence>
          </div>

          <div className={styles.controls}>
            <button type="button" className={styles.arrowBtn} onClick={() => go(-1)} aria-label="Previous testimonial">
              <Icon name="chevronLeft" size={20} />
            </button>
            <div className={styles.dots}>
              {testimonials.map((x, i) => (
                <button
                  key={x.id}
                  type="button"
                  className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                />
              ))}
            </div>
            <button type="button" className={styles.arrowBtn} onClick={() => go(1)} aria-label="Next testimonial">
              <Icon name="chevronRight" size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
