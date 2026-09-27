"use client";

import { usePathname } from "next/navigation";
import { LazyMotion, MotionConfig } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { rememberContactService } from "@/lib/contact";
import { scrollToSection } from "@/lib/scroll";

const loadFeatures = () => import("@/lib/motionFeatures").then((mod) => mod.default);

/**
 * Global client behaviour:
 * - LazyMotion + `m` components keep the animation engine out of the initial JS bundle.
 * - `strict` flags any accidental use of the heavier `motion.*` components.
 * - Honours the user's reduced-motion preference everywhere.
 * - Contact buttons carrying `data-service` pre-select that service in the form.
 * - Homepage section links scroll smoothly and precisely to their section.
 */
export function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Arriving on the homepage with "#section" (e.g. a Back button on another page):
  // land exactly on that section. Off-screen sections only have estimated heights
  // until rendered, so the browser's own jump can miss.
  useEffect(() => {
    if (pathname !== "/" || !window.location.hash) return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    const frame = requestAnimationFrame(() => scrollToSection(id, { instant: true }));
    // On a fresh page load the browser jumps to the hash again once loading finishes.
    const settle = () => scrollToSection(id, { instant: true });
    if (document.readyState !== "complete") window.addEventListener("load", settle, { once: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", settle);
    };
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const service = link.dataset.service;
      if (service) rememberContactService(service);

      // Homepage section links ("/#contact", "/#portfolio", …) while already on the
      // homepage: scroll there ourselves. This works even when the URL already has
      // that #hash, and lands precisely (see scrollToSection).
      const href = link.getAttribute("href") ?? "";
      const plainClick = e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
      if (plainClick && href.startsWith("/#") && window.location.pathname === "/" && link.target !== "_blank") {
        const id = href.slice(2);
        if (scrollToSection(id)) {
          e.preventDefault(); // Next.js <Link> skips its own navigation when default is prevented
          if (window.location.hash !== `#${id}`) window.history.pushState(null, "", href);
        }
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
