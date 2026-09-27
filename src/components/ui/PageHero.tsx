import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import styles from "./PageHero.module.css";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  crumbs: { label: string; href?: string }[];
  children?: ReactNode;
  /** Top-left back button. Defaults to the homepage. */
  back?: { href: string; label: string };
};

/** Heading block for inner pages (breadcrumb, h1, intro, optional actions). */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  children,
  back = { href: "/", label: "Back to Home" },
}: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className="container">
        <Link href={back.href} className={styles.back}>
          <Icon name="arrowRight" size={18} className={styles.backIcon} />
          {back.label}
        </Link>
        <Reveal>
          <nav aria-label="Breadcrumb">
            <ol className={styles.crumbs}>
              {crumbs.map((c, i) => (
                <li key={c.label}>
                  {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                  {i < crumbs.length - 1 && <span aria-hidden="true">/</span>}
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>
        <Reveal delay={0.05}>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className={styles.title}>{title}</h1>
        </Reveal>
        {description && (
          <Reveal delay={0.15}>
            <p className={`lead ${styles.desc}`}>{description}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.2} className={styles.actions}>
            {children}
          </Reveal>
        )}
      </div>
    </section>
  );
}
