import { designIntro, designServices, designTools } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import styles from "./GraphicDesign.module.css";

/** Decorative specimens for the larger bento tiles. */
function LogoSpecimen() {
  return (
    <svg viewBox="0 0 200 200" className={styles.specimen} aria-hidden="true">
      <circle cx="100" cy="100" r="78" className={styles.guide} />
      <circle cx="100" cy="100" r="48" className={styles.guide} />
      <circle cx="72" cy="100" r="48" className={styles.guide} />
      <circle cx="128" cy="100" r="48" className={styles.guide} />
      <line x1="0" y1="100" x2="200" y2="100" className={styles.guide} />
      <line x1="100" y1="0" x2="100" y2="200" className={styles.guide} />
      <line x1="30" y1="30" x2="170" y2="170" className={styles.guide} />
      <line x1="170" y1="30" x2="30" y2="170" className={styles.guide} />
      <path d="M74 64v72M126 64v72M74 100h52" className={styles.markPath} />
      {[
        [74, 64],
        [74, 136],
        [126, 64],
        [126, 136],
        [100, 100],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x - 3} y={y - 3} width="6" height="6" className={styles.anchor} />
      ))}
    </svg>
  );
}

const swatches = ["#FF7A18", "#FFA45C", "#5B2A86", "#9B6BFF", "#F8F3FA"];

function BrandSpecimen() {
  return (
    <div className={styles.brandSpec} aria-hidden="true">
      <span className={styles.typeSpec}>Aa</span>
      <div className={styles.swatches}>
        {swatches.map((c) => (
          <span key={c} style={{ background: c }} />
        ))}
      </div>
    </div>
  );
}

function SocialSpecimen() {
  return (
    <div className={styles.socialSpec} aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span key={i} className={styles.post}>
          <i />
          <b />
        </span>
      ))}
    </div>
  );
}

const featured: Record<string, { span: string; visual: () => React.ReactElement }> = {
  "Logo Design": { span: styles.big, visual: LogoSpecimen },
  "Brand Identity": { span: styles.wide, visual: BrandSpecimen },
  "Social Media Designs": { span: styles.wide, visual: SocialSpecimen },
};

export function GraphicDesign() {
  return (
    <section id="design" className={`section ${styles.section}`} aria-labelledby="design-title">
      <div className="container">
        <div className={styles.head}>
          <SectionHeading
            index="06"
            eyebrow="Creative Background"
            id="design-title"
            title={
              <>
                Graphic <span className="gradient-text">Design</span>
              </>
            }
            description={designIntro}
            className={styles.heading}
          />
          <Reveal className={styles.tools} delay={0.1}>
            <p className={styles.toolsLabel}>Main tools</p>
            <ul>
              {designTools.map((t) => (
                <li key={t.name} className={styles.tool} title={t.name}>
                  <span className={styles.toolMark} data-mark={t.mark}>
                    {t.mark}
                  </span>
                  <span className={styles.toolName}>{t.name}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <ul className={styles.bento}>
          {designServices.map((s, i) => {
            const f = featured[s.title];
            const Visual = f?.visual;
            return (
              <Reveal as="li" key={s.title} delay={(i % 4) * 0.06} className={f?.span}>
                <TiltCard className={`i-card ${styles.tile} ${f ? styles.tileFeatured : ""}`} max={f ? 3 : 7} as="article">
                  {Visual && <Visual />}
                  <div className={styles.tileBody}>
                    <span className="icon-box">
                      <Icon name={s.icon} />
                    </span>
                    <div>
                      <h3 className={styles.tileTitle}>{s.title}</h3>
                      <p className={styles.tileDesc}>{s.description}</p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className={styles.cta}>
          <Button href="/contact?service=design" variant="secondary" arrow>
            Discuss a Design Project
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
