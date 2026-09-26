import Image from "next/image";
import type { CSSProperties } from "react";
import { site } from "@/data/site";
import { softwareServices } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { TypewriterTitle } from "./TypewriterTitle";
import styles from "./Hero.module.css";

/** Every figure is factual and derived from site data. */
const stats = [
  { value: site.experienceYears, suffix: "+", label: ["Years", "Experience"] },
  { value: softwareServices.length, suffix: "", label: ["Software", "Services"] },
  { value: site.roles.length, suffix: "", label: ["Professional", "Disciplines"] },
];

/** Labels floating on the edges of the photo panel. */
const pills = [
  { label: "Software Developer", className: styles.pillA },
  { label: site.experienceLabel, className: styles.pillB },
  { label: "Digital Marketer", className: styles.pillC },
  { label: "Graphic Designer", className: styles.pillD },
];

/** Staggered CSS entrance (no JS needed); disabled for reduced-motion users globally. */
const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export function Hero() {
  const split = 6; // "Haseeb" | "ullah" — one word, two colours
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-name">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={`${styles.hi} ${styles.fade}`} style={delay(0.05)}>
            <span aria-hidden="true">👋</span> Hi, I&apos;m
          </p>

          <h1 id="hero-name" className={`${styles.name} ${styles.fade}`} style={delay(0.12)}>
            {site.name.slice(0, split)}
            <span className={styles.nameAccent}>{site.name.slice(split)}</span>
          </h1>

          <div className={styles.fade} style={delay(0.22)}>
            <TypewriterTitle titles={site.rotatingTitles} />
          </div>

          <p className={`${styles.description} ${styles.fade}`} style={delay(0.3)}>
            {site.heroDescription}
          </p>

          <div className={styles.fade} style={delay(0.38)}>
            <SocialLinks size="sm" square />
          </div>

          <div className={`${styles.actions} ${styles.fade}`} style={delay(0.46)}>
            <Button href="/#portfolio" arrow>
              View My Work
            </Button>
            <Button href="/contact" variant="outline">
              Start a Project
            </Button>
          </div>

          <ul className={`${styles.stats} ${styles.fade}`} style={delay(0.56)} aria-label="Highlights">
            {stats.map((s) => (
              <li key={s.label.join(" ")} className={styles.stat}>
                <span className={styles.statValue}>
                  <Counter to={s.value} suffix={s.suffix} />
                </span>
                <span className={styles.statLabel}>
                  {s.label[0]}
                  <br />
                  {s.label[1]}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.visual} ${styles.fadeScale}`} style={delay(0.15)}>
          <div className={styles.panel}>
            {site.profileImage && (
              <Image
                src={site.profileImage}
                alt={`${site.name} — Software Developer`}
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 440px"
                className={styles.photo}
              />
            )}
          </div>
          {pills.map((p) => (
            <span key={p.label} className={`${styles.pill} ${p.className}`}>
              <span className={styles.pillDot} aria-hidden="true" />
              {p.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
