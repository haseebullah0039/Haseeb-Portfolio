import Image from "next/image";
import { site } from "@/data/site";
import { studio } from "@/data/studio";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import styles from "./Studio.module.css";

/** Hesodevix Studio — the software house Haseebullah founded (content from hesodevixstudio.com). */
export function Studio() {
  return (
    <section id="studio" className={`section ${styles.section}`} aria-labelledby="studio-title">
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.brandCol}>
          <TiltCard className={styles.logoCard} max={8}>
            <div className={styles.orbit} aria-hidden="true">
              <span />
              <span />
            </div>
            <div className={styles.plate}>
              <Image
                src={studio.logo}
                alt={`${studio.name} logo`}
                fill
                sizes="(max-width: 1024px) 60vw, 300px"
                className={styles.plateImg}
              />
            </div>
            <p className={styles.logoSub}>
              Founded in {studio.founded} by {site.name}
            </p>
            <span className={`chip chip--accent ${styles.role}`}>{studio.founderRole}</span>
            <p className={styles.location}>
              <Icon name="globe" size={13} /> {studio.location}
            </p>
            <a
              href={studio.url}
              className={styles.domain}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${studio.name} website (opens in a new tab)`}
            >
              {studio.domain}
              <Icon name="arrowUpRight" size={14} />
            </a>
          </TiltCard>
        </Reveal>

        <div className={styles.content}>
          <Reveal>
            <span className="eyebrow">
              <span className={styles.idx}>10 /</span> My Company
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="studio-title" className={styles.title}>
              <span className="gradient-text">{studio.name}</span>
            </h2>
            <p className={styles.tagline}>{studio.tagline}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">{studio.intro}</p>
          </Reveal>

          <Reveal delay={0.12}>
            <h3 className={styles.label}>Services</h3>
            <ul className={styles.services}>
              {studio.services.map((s) => (
                <li key={s.title}>
                  <span className={styles.serviceIcon}>
                    <Icon name={s.icon} size={16} />
                  </span>
                  {s.title}
                </li>
              ))}
            </ul>
          </Reveal>

          <ul className={styles.values} aria-label="Studio values">
            {studio.values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={0.14 + i * 0.06}>
                <div className={`i-card ${styles.value}`}>
                  <span className="icon-box">
                    <Icon name={v.icon} />
                  </span>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueText}>{v.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.16}>
            <h3 className={styles.label}>Industries served</h3>
            <ul className={styles.industries}>
              {studio.industries.map((ind) => (
                <li key={ind} className="chip">
                  {ind}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2} className={styles.actions}>
            <Button href={studio.url} external arrow magnetic>
              Explore {studio.name}
            </Button>
            <a href={studio.contact.emailHref} className={`btn btn-outline btn-sm ${styles.contactBtn}`}>
              <Icon name="mail" size={16} /> {studio.contact.email}
            </a>
            <a
              href={studio.contact.whatsappUrl}
              className={`btn btn-secondary btn-sm ${styles.contactBtn}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Message ${studio.name} on WhatsApp (opens in a new tab)`}
            >
              <Icon name="whatsapp" size={16} /> WhatsApp the studio
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
