import { marketingFocus, marketingGroups, marketingIntro } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import styles from "./DigitalMarketing.module.css";

export function DigitalMarketing() {
  return (
    <section id="marketing" className="section" aria-labelledby="marketing-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <SectionHeading
            index="05"
            eyebrow="Secondary Discipline"
            id="marketing-title"
            title={
              <>
                Digital <span className="gradient-text">Marketing</span>
              </>
            }
            description={marketingIntro}
            className={styles.heading}
          />

          <Reveal className={styles.chart} aria-hidden="true">
            <svg viewBox="0 0 320 140" preserveAspectRatio="none">
              <defs>
                <linearGradient id="mk-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="rgba(255,122,24,0.35)" />
                  <stop offset="1" stopColor="rgba(255,122,24,0)" />
                </linearGradient>
              </defs>
              {[28, 62, 96].map((y) => (
                <line key={y} x1="0" x2="320" y1={y} y2={y} className={styles.gridLine} />
              ))}
              <path
                d="M0 120 C 40 115, 60 100, 90 98 S 140 80, 170 70 S 230 52, 260 34 S 300 18, 320 12 L320 140 L0 140Z"
                fill="url(#mk-area)"
              />
              <path
                d="M0 120 C 40 115, 60 100, 90 98 S 140 80, 170 70 S 230 52, 260 34 S 300 18, 320 12"
                className={styles.line}
              />
              <circle cx="320" cy="12" r="4" className={styles.dot} />
            </svg>
            <span className={styles.chartLabel}>Visibility · Engagement · Growth</span>
          </Reveal>

          <Reveal delay={0.1}>
            <p className={styles.focusTitle}>What the work focuses on</p>
            <ul className={styles.focus}>
              {marketingFocus.map((f) => (
                <li key={f} className="chip">
                  <Icon name="check" size={14} className={styles.check} />
                  {f}
                </li>
              ))}
            </ul>
            <p className={styles.honest}>
              No guaranteed rankings or promised numbers — just sound strategy, consistent execution
              and transparent reporting.
            </p>
            <div className={styles.cta}>
              <Button href="/contact?service=marketing" variant="secondary" arrow>
                Discuss Marketing
              </Button>
            </div>
          </Reveal>
        </div>

        <ul className={styles.groups}>
          {marketingGroups.map((g, i) => (
            <Reveal as="li" key={g.title} delay={i * 0.08}>
              <TiltCard className={`i-card ${styles.group}`} max={4} as="article">
                <div className={styles.groupHead}>
                  <span className="icon-box">
                    <Icon name={g.icon} />
                  </span>
                  <h3 className={styles.groupTitle}>{g.title}</h3>
                </div>
                <ul className={styles.items}>
                  {g.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
