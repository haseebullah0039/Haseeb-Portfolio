import styles from "./Background.module.css";

/**
 * Fixed, decorative page background: plum gradient, light sources, grid and grain.
 * Deliberately static (no filters, blend modes or animation) so it is painted once
 * and never repainted while scrolling.
 */
export function Background() {
  return (
    <div className={styles.bg} aria-hidden="true">
      <div className={styles.grid} />
    </div>
  );
}
