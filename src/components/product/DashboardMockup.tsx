"use client";

import { AnimatePresence, useInView } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useRef, useState } from "react";
import { product } from "@/data/product";
import { Icon } from "@/components/ui/Icon";
import styles from "./DashboardMockup.module.css";

const navIcons = ["dashboard", "users", "database", "fileText", "chart", "lock"];
const bars = [38, 56, 44, 72, 60, 84, 68, 92, 76, 88, 70, 96];

/** Cycles through business types. Isolated so only this pill re-renders, and paused off-screen. */
function BusinessTypeTicker() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [index, setIndex] = useState(0);
  const types = product.businessTypes;

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % types.length), 2200);
    return () => window.clearInterval(id);
  }, [inView, types.length]);

  const current = types[index];
  return (
    <div ref={ref} className={styles.typePill}>
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={current.label}
          className={styles.typeInner}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <Icon name={current.icon} size={12} />
          {current.label}
        </m.span>
      </AnimatePresence>
    </div>
  );
}

/**
 * Illustrative product UI. It deliberately shows no real figures or feature
 * names — it is a visual mockup, not a screenshot. Replace with real
 * screenshots via product.screenshots when available.
 */
export function DashboardMockup({ tilt = true }: { tilt?: boolean }) {
  return (
    <div className={`${styles.scene} ${tilt ? styles.tilted : ""}`} role="img" aria-label={`Illustrative interface mockup of ${product.name}`}>
      <div className={styles.window}>
        <div className={styles.chrome}>
          <span />
          <span />
          <span />
          <div className={styles.url}>{product.shortName}</div>
        </div>

        <div className={styles.body}>
          <aside className={styles.sidebar}>
            <div className={styles.brand}>
              <span className={styles.brandMark} />
              <span className={styles.line} style={{ width: "60%" }} />
            </div>
            {navIcons.map((icon, i) => (
              <div key={icon} className={`${styles.navItem} ${i === 0 ? styles.navActive : ""}`}>
                <Icon name={icon} size={14} />
                <span className={styles.line} style={{ width: `${50 + ((i * 17) % 35)}%` }} />
              </div>
            ))}
          </aside>

          <div className={styles.main}>
            <div className={styles.topbar}>
              <div className={styles.search}>
                <Icon name="search" size={12} />
                <span className={styles.line} style={{ width: 90 }} />
              </div>
              <BusinessTypeTicker />
              <span className={styles.avatar} />
            </div>

            <div className={styles.kpis}>
              {[0, 1, 2, 3].map((k) => (
                <div key={k} className={`${styles.kpi} ${k === 0 ? styles.kpiAccent : ""}`}>
                  <span className={styles.line} style={{ width: "45%" }} />
                  <span className={styles.kpiBlock} />
                  <span className={styles.spark}>
                    <svg viewBox="0 0 60 16" preserveAspectRatio="none">
                      <path d={["M0 12 L12 9 L24 11 L36 6 L48 7 L60 2", "M0 10 L12 12 L24 7 L36 8 L48 4 L60 5", "M0 13 L12 10 L24 10 L36 5 L48 6 L60 3", "M0 8 L12 9 L24 6 L36 7 L48 3 L60 4"][k]} />
                    </svg>
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.panels}>
              <div className={styles.chart}>
                <span className={styles.line} style={{ width: "30%" }} />
                <div className={styles.bars}>
                  {bars.map((h, i) => (
                    <span key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.05}s` }} />
                  ))}
                </div>
              </div>
              <div className={styles.table}>
                <span className={styles.line} style={{ width: "40%" }} />
                {[0, 1, 2, 3, 4].map((r) => (
                  <div key={r} className={styles.row}>
                    <span className={styles.rowDot} />
                    <span className={styles.line} style={{ width: `${40 + ((r * 13) % 30)}%` }} />
                    <span className={styles.status} data-s={r % 3} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.floating} ${styles.floatA} card-glass`} aria-hidden="true">
        <span className="icon-box">
          <Icon name="layers" size={18} />
        </span>
        <div>
          <strong>Multi-Industry</strong>
          <small>One adaptable foundation</small>
        </div>
      </div>
      <div className={`${styles.floating} ${styles.floatB} card-glass`} aria-hidden="true">
        <span className="icon-box">
          <Icon name="boxes" size={18} />
        </span>
        <div>
          <strong>Ready-Made</strong>
          <small>Designed for business use</small>
        </div>
      </div>
    </div>
  );
}
