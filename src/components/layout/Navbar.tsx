"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useRef, useState } from "react";
import { contact, navLinks, site } from "@/data/site";
import { Icon } from "@/components/ui/Icon";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Logo } from "./Logo";
import styles from "./Navbar.module.css";
import { CONTACT_HREF } from "@/lib/contact";

/** Homepage sections without their own nav link, mapped to the closest nav item. */
const sectionAlias: Record<string, string> = {
  intro: "home",
  software: "services",
  stack: "services",
  expertise: "services",
  marketing: "services",
  design: "services",
  // Sections intentionally not in the nav: clear the highlight while they're in view.
  home: "",
  studio: "",
  testimonials: "",
  contact: "",
};

const routeSection: Record<string, string> = {
  "/portfolio": "portfolio",
  "/product": "product",
  "/contact": "contact",
  "/services": "services",
  "/about": "about",
};

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  // Compact state after scrolling + orange scroll-progress fill on the bottom line.
  // The fill is written straight to the element's transform (once per frame),
  // so scrolling never re-renders the navbar.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Active link: route-based on inner pages, scroll-spy on the homepage
  useEffect(() => {
    if (pathname !== "/") {
      // Case study pages (/portfolio/<id>) keep "Portfolio" highlighted.
      const base = "/" + (pathname.split("/")[1] ?? "");
      setActive(routeSection[pathname] ?? routeSection[base] ?? "");
      return;
    }
    const ids = [...(navLinks.map((l) => l.section).filter(Boolean) as string[]), ...Object.keys(sectionAlias)];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(sectionAlias[entry.target.id] ?? entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // Close the menu on route change
  useEffect(() => setOpen(false), [pathname]);

  // Mobile menu: lock scroll, close on Escape, move focus, trap Tab
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []
      );
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab") {
        const items = [toggleRef.current!, ...focusables()];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.scrolled : ""}`}>
      <nav className={`container ${styles.nav}`} aria-label="Primary">
        <Logo large onClick={() => setOpen(false)} />

        <ul className={styles.links}>
          {navLinks.map((link) => {
            const isActive = active === link.section;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.link} ${isActive ? styles.active : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <m.span
                      layoutId="nav-indicator"
                      className={styles.indicator}
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className={styles.linkText}>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className={styles.actions}>
          <Link href={CONTACT_HREF} className={styles.cta}>
            Start a Project
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`${styles.bars} ${open ? styles.barsOpen : ""}`} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </nav>

      {/* Bottom line: white track that fills with orange as the page scrolls */}
      <span ref={progressRef} className={styles.progress} aria-hidden="true" />

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            ref={menuRef}
            className={styles.mobile}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`container ${styles.mobileInner}`}>
              <ul className={styles.mobileLinks}>
                {navLinks.map((link, i) => (
                  <m.li
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.045, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      className={`${styles.mobileLink} ${active === link.section ? styles.mobileActive : ""}`}
                      onClick={() => setOpen(false)}
                    >
                      <span className={styles.mobileIndex}>{String(i + 1).padStart(2, "0")}</span>
                      {link.label}
                    </Link>
                  </m.li>
                ))}
              </ul>
              <m.div
                className={styles.mobileFooter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                <Link href={CONTACT_HREF} className="btn btn-primary" onClick={() => setOpen(false)}>
                  Start a Project
                  <Icon name="arrowUpRight" size={18} className="btn-arrow" />
                </Link>
                <a href={contact.emailHref} className={styles.mobileEmail}>
                  {contact.email}
                </a>
                <SocialLinks size="sm" />
                <p className={styles.mobileTag}>{site.tagline}</p>
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
