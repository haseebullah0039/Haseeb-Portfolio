import { site } from "@/data/site";
import { studio } from "@/data/studio";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import styles from "./Studio.module.css";

export function Studio() {
  const hasUrl = Boolean(studio.url);
  return (
    <section id="studio" className={`section ${styles.section}`} aria-labelledby="studio-title">
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.brandCol}>
          <TiltCard className={styles.logoCard} max={8}>
            <div className={styles.orbit} aria-hidden="true">
              <span />
              <span />
            </div>
            <div className={styles.logo} aria-hidden="true">
              {studio.monogram}
            </div>
            <p className={styles.logoName}>{studio.name}</p>
            <p className={styles.logoSub}>Founded by {site.name}</p>
          </TiltCard>
        </Reveal>

        <div className={styles.content}>
          <Reveal>
            <span className="eyebrow">
              <span className={styles.idx}>10 /</span> My Studio
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="studio-title" className={styles.title}>
              <span className="gradient-text">{studio.name}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">{studio.intro}</p>
          </Reveal>

          <ul className={styles.areas}>
            {studio.areas.map((a, i) => (
              <Reveal as="li" key={a.title} delay={0.1 + i * 0.06}>
                <div className={`i-card ${styles.area}`}>
                  <span className="icon-box">
                    <Icon name={a.icon} />
                  </span>
                  <div>
                    <h3 className={styles.areaTitle}>{a.title}</h3>
                    <p className={styles.areaText}>{a.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.15}>
            <ul className={styles.caps} aria-label="Studio capabilities">
              {studio.capabilities.map((c) => (
                <li key={c}>
                  <Icon name="check" size={15} />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2} className={styles.actions}>
            <Button href={hasUrl ? studio.url : "/contact"} external={hasUrl} arrow magnetic>
              Explore {studio.name}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
