import Image from "next/image";
import { site } from "@/data/site";
import styles from "./Portrait.module.css";

/**
 * Profile image. Uses `src` or site.profileImage (never distorted — object-fit:
 * cover keeps proportions). Falls back to a monogram when no image is set.
 */
export function Portrait({
  priority = false,
  sizes = "(max-width: 768px) 80vw, 440px",
  src,
}: {
  priority?: boolean;
  sizes?: string;
  /** Specific photo to show instead of the default profile image. */
  src?: string | null;
}) {
  const image = src ?? site.profileImage;
  if (image) {
    return (
      <div className={styles.photo}>
        <Image
          src={image}
          alt={`${site.name} — Software Developer`}
          fill
          priority={priority}
          sizes={sizes}
          className={styles.img}
        />
      </div>
    );
  }

  return (
    <div className={styles.monogram} role="img" aria-label={`${site.name} monogram`}>
      <div className={styles.rings} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <span className={styles.letter} aria-hidden="true">
        H
      </span>
      <span className={styles.caption} aria-hidden="true">
        {"</>"} {site.domain}
      </span>
    </div>
  );
}
