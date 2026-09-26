import { serviceCategories } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import styles from "./Services.module.css";
import { CONTACT_HREF } from "@/lib/contact";

export function Services({ index = "07" }: { index?: string }) {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading
          index={index}
          eyebrow="Services"
          id="services-title"
          align="center"
          title={
            <>
              How I can <span className="gradient-text">help</span>
            </>
          }
          description="Three disciplines, one clear priority: software development first, with digital marketing and graphic design to complete the picture."
        />

        <ul className={styles.grid}>
          {serviceCategories.map((c, i) => (
            <Reveal
              as="li"
              key={c.id}
              id={`service-${c.id}`}
              delay={i * 0.1}
              className={c.featured ? styles.featuredItem : undefined}
            >
              <TiltCard
                className={`i-card ${styles.card} ${c.featured ? styles.featured : ""}`}
                max={c.featured ? 3 : 5}
                as="article"
              >
                <div className={styles.top}>
                  <span className={`icon-box ${styles.icon}`}>
                    <Icon name={c.icon} size={24} />
                  </span>
                  <span className={styles.index}>{c.index}</span>
                </div>
                {c.featured && <span className={`chip chip--accent ${styles.primaryTag}`}>Primary Service</span>}
                <h3 className={styles.title}>{c.title}</h3>
                <p className={styles.desc}>{c.description}</p>
                <ul className={styles.list}>
                  {c.items.map((item) => (
                    <li key={item}>
                      <Icon name="check" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className={styles.cta}>
                  <Button
                    href={CONTACT_HREF}
                    service={c.id}
                    variant={c.featured ? "primary" : "secondary"}
                    size="sm"
                    arrow
                  >
                    {c.cta}
                  </Button>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
