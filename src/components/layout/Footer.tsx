import Link from "next/link";
import { contact, footerLinks, site } from "@/data/site";
import { serviceCategories } from "@/data/services";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";
import styles from "./Footer.module.css";
import { CONTACT_HREF } from "@/lib/contact";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.glowLine} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Logo />
          <p className={styles.roles}>{site.tagline}</p>
          <p className={styles.about}>
            Building modern web, mobile, desktop and custom business software — backed by digital
            marketing and graphic design expertise.
          </p>
          <SocialLinks size="sm" />
        </div>

        <nav className={styles.col} aria-label="Footer navigation">
          <h2 className={styles.heading}>Navigate</h2>
          <ul>
            {footerLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.heading}>Services</h2>
          <ul>
            {serviceCategories.map((c) => (
              <li key={c.id}>
                <Link href={`/services#service-${c.id}`} className={styles.link}>
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h2 className={styles.heading}>Get in touch</h2>
          <a href={contact.emailHref} className={styles.contactLink}>
            <Icon name="mail" size={16} />
            {contact.email}
          </a>
          <Link href={CONTACT_HREF} className={`btn btn-secondary btn-sm ${styles.footerCta}`}>
            Start a Project
            <Icon name="arrowUpRight" size={16} className="btn-arrow" />
          </Link>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© 2026 {site.name}. All rights reserved.</p>
        <p className={styles.domain}>
          <span className="accent">●</span> {site.domain}
        </p>
      </div>

      <div className={styles.wordmark} aria-hidden="true">
        {site.name}
      </div>
    </footer>
  );
}
