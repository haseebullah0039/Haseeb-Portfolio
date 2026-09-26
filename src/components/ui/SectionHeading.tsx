import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  id?: string;
  size?: "lg" | "xl";
  className?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  id,
  size = "lg",
  className = "",
}: SectionHeadingProps) {
  return (
    <Reveal className={`${styles.heading} ${align === "center" ? styles.center : ""} ${className}`}>
      <span className="eyebrow">
        {index && <span className={styles.index}>{index}</span>}
        {eyebrow}
      </span>
      <h2 id={id} className={`${styles.title} ${size === "xl" ? styles.xl : ""}`}>
        {title}
      </h2>
      {description && <p className={`lead ${styles.description}`}>{description}</p>}
    </Reveal>
  );
}
