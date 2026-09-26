import { softwareIntro, softwareServices } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import styles from "./SoftwareDevelopment.module.css";

export function SoftwareDevelopment() {
  return (
    <section id="software" className={`section ${styles.section}`} aria-labelledby="software-title">
      <div className={styles.beam} aria-hidden="true" />
      <div className="container">
        <div className={styles.head}>
          <SectionHeading
            index="02"
            eyebrow="Primary Discipline"
            id="software-title"
            size="xl"
            title={
              <>
                Software <span className="gradient-text">Development</span>
              </>
            }
            description={softwareIntro}
          />
          <Reveal className={styles.headAside} delay={0.15}>
            <div className={styles.terminal} aria-hidden="true">
              <p>
                <span className={styles.prompt}>~/haseebullah</span> $ build --for business
              </p>
              <p className={styles.ok}>✓ web · apps · desktop · custom software</p>
            </div>
            <Button href="/contact?service=software" arrow>
              Start a Software Project
            </Button>
          </Reveal>
        </div>

        <ul className={styles.grid}>
          {softwareServices.map((service, i) => (
            <Reveal as="li" key={service.title} delay={(i % 5) * 0.06}>
              <TiltCard className={`i-card ${styles.card}`} as="article">
                <div className={styles.cardTop}>
                  <span className="icon-box">
                    <Icon name={service.icon} />
                  </span>
                  <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className={styles.title}>{service.title}</h3>
                <p className={styles.desc}>{service.description}</p>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
