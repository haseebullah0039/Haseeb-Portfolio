"use client";

import { animate, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";

import * as m from "motion/react-m";
import { useEffect, useRef } from "react";
import { expertise } from "@/data/technologies";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import styles from "./Expertise.module.css";

const R = 52;
const C = 2 * Math.PI * R;

/** Progress ring driven by a motion value — animates without React re-renders. */
function Ring({ value, primary }: { value: number; primary?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const progress = useMotionValue(0);
  const dashOffset = useTransform(progress, (v) => C - (C * v) / 100);
  const label = useTransform(progress, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      progress.set(value);
      return;
    }
    const c = animate(progress, value, { duration: 1.8, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
  }, [inView, value, reduce, progress]);

  return (
    <div className={styles.ring}>
      <svg ref={ref} viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <linearGradient id={`ring-${value}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={primary ? "#FFB27A" : "#FFA45C"} />
            <stop offset="1" stopColor="#F97316" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r={R} className={styles.track} />
        <m.circle
          cx="60"
          cy="60"
          r={R}
          className={styles.progress}
          stroke={`url(#ring-${value})`}
          strokeDasharray={C}
          style={{ strokeDashoffset: dashOffset }}
        />
      </svg>
      <span className={styles.ringValue} aria-hidden="true">
        <m.span>{label}</m.span>
        <small>%</small>
      </span>
    </div>
  );
}

export function Expertise() {
  return (
    <section id="expertise" className="section" aria-labelledby="expertise-title">
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow="Core Expertise"
          id="expertise-title"
          align="center"
          title={
            <>
              Where my <span className="gradient-text">strengths</span> are
            </>
          }
          description="A personal view of my proficiency across my three disciplines — software development leads, supported by marketing and design."
        />

        <ul className={styles.grid}>
          {expertise.map((e, i) => {
            const primary = i === 0;
            return (
              <Reveal as="li" key={e.label} delay={i * 0.1}>
                <TiltCard className={`i-card ${styles.card} ${primary ? styles.primary : ""}`}>
                  {primary && <span className={`chip chip--accent ${styles.tag}`}>Primary focus</span>}
                  <Ring value={e.value} primary={primary} />
                  <div className={styles.body}>
                    <h3 className={styles.label}>
                      <Icon name={e.icon} size={18} />
                      {e.label}
                    </h3>
                    <p className={styles.desc}>{e.description}</p>
                    <div
                      className={styles.bar}
                      role="meter"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={e.value}
                      aria-label={`${e.label} self-assessed proficiency`}
                    >
                      <m.span
                        className={styles.fill}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: e.value / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                      />
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </ul>

        <p className={styles.note}>
          <Icon name="sparkles" size={14} /> Self-assessed proficiency indicators — not certifications or
          external rankings.
        </p>
      </div>
    </section>
  );
}
