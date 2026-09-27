import { site } from "@/data/site";
import { studio } from "@/data/studio";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Portrait } from "@/components/ui/Portrait";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import styles from "./About.module.css";

const workAreas = [
  { label: "Web Development", primary: true },
  { label: "App Development", primary: true },
  { label: "Desktop Development", primary: true },
  { label: "Custom Software", primary: true },
  { label: "SaaS Applications", primary: true },
  { label: "Business Software", primary: true },
  { label: "Digital Marketing", primary: false },
  { label: "Graphic Design", primary: false },
];

const infoCards = [
  { icon: "badge", title: site.experienceLabel, text: "Across development, marketing and design." },
  { icon: "code", title: "Software Development", text: "My primary focus and core profession.", primary: true },
  { icon: "trendingUp", title: "Digital Marketing", text: "SEO, content and social media growth." },
  { icon: "palette", title: "Graphic Design", text: "Brand identity and marketing visuals." },
];

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.visualCol}>
          <TiltCard className={styles.portraitCard} max={5}>
            <div className={styles.portrait}>
              <Portrait src={site.aboutImage} sizes="(max-width: 1024px) 80vw, 420px" />
            </div>
            <div className={styles.portraitMeta}>
              <div>
                <p className={styles.metaName}>{site.name}</p>
                <p className={styles.metaRole}>Software Developer</p>
              </div>
              <span className="chip chip--accent">
                {studio.founderRole} · {studio.name}
              </span>
            </div>
          </TiltCard>
        </Reveal>

        <div className={styles.content}>
          <SectionHeading
            index="01"
            eyebrow="About"
            id="about-title"
            className={styles.heading}
            title={
              <>
                About <span className="gradient-text">Me</span>
              </>
            }
          />
          <Reveal className={styles.text}>
            <p className="lead">
              I&apos;m <strong>{site.name}</strong>, a <strong>Software Developer</strong> with{" "}
              {site.experienceLabel.toLowerCase()} building websites, web applications, mobile apps,
              desktop software and custom business systems. I focus on turning real business
              requirements into software that is clean, reliable and easy to use.
            </p>
            <p className="lead">
              Alongside development, I work in digital marketing and graphic design. That
              combination is my advantage: I can plan, build, brand and promote a product — creating
              complete digital solutions rather than isolated pieces.
            </p>
          </Reveal>

          <Reveal as="div" delay={0.1}>
            <ul className={styles.areas} aria-label="Areas of work">
              {workAreas.map((a) => (
                <li key={a.label} className={`chip ${a.primary ? "chip--accent" : ""}`}>
                  {a.label}
                </li>
              ))}
            </ul>
          </Reveal>

          <ul className={styles.cards}>
            {infoCards.map((c, i) => (
              <Reveal as="li" key={c.title} delay={0.1 + i * 0.07}>
                <div className={`i-card ${styles.card} ${c.primary ? styles.cardPrimary : ""}`}>
                  <span className="icon-box">
                    <Icon name={c.icon} />
                  </span>
                  <div>
                    <h3 className={styles.cardTitle}>{c.title}</h3>
                    <p className={styles.cardText}>{c.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2} className={styles.actions}>
            <Button href="/about" variant="secondary" arrow>
              More About Me
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
