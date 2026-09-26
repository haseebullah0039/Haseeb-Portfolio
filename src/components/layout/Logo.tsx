"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { site } from "@/data/site";
import styles from "./Logo.module.css";

type LogoProps = {
  onClick?: () => void;
  /** Large navbar version: bigger badge and two-tone name. */
  large?: boolean;
};

/**
 * Brand lockup. The name is always the single word "Haseebullah";
 * the two-tone colouring is visual only (screen readers get the full name).
 *
 * On the homepage, clicking it scrolls back up to the hero section
 * (a normal link to "/" would do nothing there).
 */
export function Logo({ onClick, large = false }: LogoProps) {
  const pathname = usePathname();
  const split = 6; // "Haseeb" | "ullah"

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    if (pathname !== "/") return; // other pages: navigate home as usual
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    // Drop any "#section" from the URL so it reflects the top of the page.
    if (window.location.hash) window.history.replaceState(null, "", "/");
  };

  return (
    <Link
      href="/"
      className={`${styles.logo} ${large ? styles.large : ""}`}
      aria-label={`${site.name} — home`}
      onClick={handleClick}
    >
      <span className={styles.mark} aria-hidden="true">
        <Image src={site.logo} alt="" width={128} height={128} sizes="72px" priority={large} />
      </span>
      <span className={styles.text} aria-hidden="true">
        <span className={styles.word}>
          {site.name.slice(0, split)}
          <span className={styles.accentPart}>{site.name.slice(split)}</span>
        </span>
      </span>
    </Link>
  );
}
