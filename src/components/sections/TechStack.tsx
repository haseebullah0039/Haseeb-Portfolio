"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useState, type CSSProperties } from "react";
import { techCategories, technologies, type TechCategory } from "@/data/technologies";
import { FilterBar } from "@/components/ui/FilterBar";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import styles from "./TechStack.module.css";

type Filter = "All" | TechCategory;
const filters: Filter[] = ["All", ...techCategories];

function TechGlyph({ icon, mark, size = 28 }: { icon?: string; mark?: string; size?: number }) {
  if (icon) return <Icon name={icon} size={size} />;
  return <span className={styles.mark}>{mark}</span>;
}

export function TechStack() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = filter === "All" ? technologies : technologies.filter((t) => t.category === filter);
  const counts = Object.fromEntries(
    filters.map((f) => [f, f === "All" ? technologies.length : technologies.filter((t) => t.category === f).length])
  ) as Record<Filter, number>;

  return (
    <section id="stack" className="section" aria-labelledby="stack-title">
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="Technology Stack"
          id="stack-title"
          title={
            <>
              The tools I <span className="gradient-text">build with</span>
            </>
          }
          description="A focused JavaScript-based stack for building interfaces, servers, databases and desktop software."
        />
      </div>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.track}>
          {[...technologies, ...technologies].map((t, i) => (
            <span key={`${t.name}-${i}`} className={styles.marqueeItem}>
              <TechGlyph icon={t.icon} mark={t.mark} size={22} />
              {t.name}
            </span>
          ))}
        </div>
      </div>

      <div className="container">
        <div className={styles.filters}>
          <FilterBar
            options={filters}
            value={filter}
            onChange={setFilter}
            label="Filter technologies by category"
            layoutId="tech-filter"
            counts={counts}
          />
        </div>

        <m.ul layout className={styles.grid} aria-live="polite">
          <AnimatePresence mode="popLayout">
            {visible.map((t) => (
              <m.li
                key={t.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard className={`i-card ${styles.card}`} max={10}>
                  <span className={styles.glyph} style={{ "--brand": t.color } as CSSProperties}>
                    <TechGlyph icon={t.icon} mark={t.mark} />
                  </span>
                  <span className={styles.name}>{t.name}</span>
                  <span className={styles.meta}>
                    <span>{t.note}</span>
                    <span className={styles.cat}>{t.category}</span>
                  </span>
                </TiltCard>
              </m.li>
            ))}
          </AnimatePresence>
        </m.ul>
      </div>
    </section>
  );
}
