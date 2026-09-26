import { socials } from "@/data/site";
import { Icon } from "./Icon";
import styles from "./SocialLinks.module.css";

/** Social icons. Profiles without a URL render as non-interactive "coming soon" icons. */
export function SocialLinks({
  className = "",
  size = "md",
  square = false,
}: {
  className?: string;
  size?: "md" | "sm";
  /** Rounded-square buttons instead of circles. */
  square?: boolean;
}) {
  return (
    <ul
      className={`${styles.list} ${size === "sm" ? styles.sm : ""} ${square ? styles.square : ""} ${className}`}
      aria-label="Social links"
    >
      {socials.map((s) => (
        <li key={s.id}>
          {s.url ? (
            <a
              href={s.url}
              className={styles.link}
              aria-label={s.label}
              title={s.label}
              {...(s.url.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <Icon name={s.id} size={size === "sm" ? 16 : 18} />
            </a>
          ) : (
            <span
              className={`${styles.link} ${styles.disabled}`}
              title={`${s.label} — coming soon`}
              aria-label={`${s.label} (coming soon)`}
              role="img"
            >
              <Icon name={s.id} size={size === "sm" ? 16 : 18} />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
