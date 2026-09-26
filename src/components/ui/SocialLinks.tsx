import { socials, type SocialLink } from "@/data/site";
import { Icon } from "./Icon";
import styles from "./SocialLinks.module.css";

type SocialLinksProps = {
  className?: string;
  size?: "md" | "sm";
  /** Rounded-square buttons instead of circles. */
  square?: boolean;
  /** Profiles to leave out in this spot, e.g. ["email"]. */
  exclude?: SocialLink["id"][];
};

/**
 * Social icons with a hover/focus label showing the platform name.
 * Profiles without a URL render as non-interactive "coming soon" icons.
 */
export function SocialLinks({ className = "", size = "md", square = false, exclude = [] }: SocialLinksProps) {
  const iconSize = size === "sm" ? 16 : 18;
  return (
    <ul
      className={`${styles.list} ${size === "sm" ? styles.sm : ""} ${square ? styles.square : ""} ${className}`}
      aria-label="Social links"
    >
      {socials
        .filter((s) => !exclude.includes(s.id))
        .map((s) => (
          <li key={s.id}>
            {s.url ? (
              <a
                href={s.url}
                className={styles.link}
                aria-label={s.label}
                data-label={s.label}
                {...(s.url.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <Icon name={s.id} size={iconSize} />
              </a>
            ) : (
              <span
                className={`${styles.link} ${styles.disabled}`}
                aria-label={`${s.label} (coming soon)`}
                data-label={`${s.label} — soon`}
                role="img"
              >
                <Icon name={s.id} size={iconSize} />
              </span>
            )}
          </li>
        ))}
    </ul>
  );
}
