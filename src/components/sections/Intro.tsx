import { Reveal } from "@/components/ui/Reveal";
import styles from "./Intro.module.css";

/** Quick introduction statement (the key figures live in the hero). */
export function Intro() {
  return (
    <section id="intro" className={styles.intro} aria-label="Quick introduction">
      <div className="container">
        <Reveal className={styles.statement}>
          <p>
            I build <span className="gradient-text">software</span> — websites, web applications,
            mobile apps, desktop applications and custom business systems.{" "}
            <span className={styles.soft}>
              Supported by digital marketing and graphic design, so every product is also easy to
              find and good to look at.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
