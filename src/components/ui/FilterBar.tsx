"use client";

import * as m from "motion/react-m";
import styles from "./FilterBar.module.css";

type FilterBarProps<T extends string> = {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  layoutId: string;
  counts?: Partial<Record<T, number>>;
};

/** Accessible toggle-button filter group with an animated active pill. */
export function FilterBar<T extends string>({ options, value, onChange, label, layoutId, counts }: FilterBarProps<T>) {
  return (
    <div className={styles.bar} role="group" aria-label={label}>
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            type="button"
            className={`${styles.btn} ${active ? styles.active : ""}`}
            aria-pressed={active}
            onClick={() => onChange(option)}
          >
            {active && (
              <m.span
                layoutId={layoutId}
                className={styles.pill}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className={styles.label}>
              {option}
              {counts?.[option] !== undefined && <span className={styles.count}>{counts[option]}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}
