import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./CtaBanner.module.css";
import { CONTACT_HREF } from "@/lib/contact";

export function CtaBanner() {
  return (
    <section className="section section--tight" aria-labelledby="cta-title">
      <div className="container">
        <Reveal className={styles.banner}>
          <div className={styles.grid} aria-hidden="true" />
          <div className={styles.orb} aria-hidden="true" />
          <span className="eyebrow">Have a project in mind?</span>
          <h2 id="cta-title" className={styles.title}>
            Let&apos;s build something <span className="gradient-text">that works</span> for your
            business.
          </h2>
          <p className={styles.text}>
            From a website or web app to desktop software, custom systems, marketing or brand
            design — tell me what you need and I&apos;ll help you plan the right solution.
          </p>
          <div className={styles.actions}>
            <Button href={CONTACT_HREF} arrow magnetic>
              Start a Project
            </Button>
            <Button href="/#portfolio" variant="secondary">
              View My Work
            </Button>
          </div>
          <p className={styles.sign}>— {site.name}</p>
        </Reveal>
      </div>
    </section>
  );
}
