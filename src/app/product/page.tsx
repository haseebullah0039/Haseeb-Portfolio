import Image from "next/image";
import { product } from "@/data/product";
import { site } from "@/data/site";
import { DashboardMockup } from "@/components/product/DashboardMockup";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import styles from "./product.module.css";
import { CONTACT_HREF } from "@/lib/contact";

export const metadata = pageMetadata({
  title: "Businexa Khata — Universal Business Management Software",
  description:
    "Businexa Khata by Haseebullah — a ready-made universal business management software designed to support retail, shops, schools, clinics, hospitals, gyms and other businesses.",
  path: "/product",
});

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: product.name,
  alternateName: product.category,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  installUrl: product.appUrl,
  description: product.description,
  url: `${site.url}/product`,
  author: { "@id": `${site.url}/#person` },
};

export default function ProductPage() {
  const hasModules = product.modules.length > 0;
  return (
    <>
      <JsonLd
        data={[
          productJsonLd,
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Product", path: "/product" },
          ]),
        ]}
      />
      <PageHero
        eyebrow={product.category}
        crumbs={[{ label: "Home", href: "/" }, { label: "Product" }]}
        title={
          <>
            {product.nameParts[0]} <span className="gradient-text">{product.nameParts[1]}</span>
          </>
        }
        description={product.description}
      >
        <Button href={product.appUrl} external arrow magnetic>
          Open {product.name}
        </Button>
        <Button href={CONTACT_HREF} service="software" variant="outline">
          Discuss This Product
        </Button>
      </PageHero>

      <section className={styles.mockSection} aria-label="Product preview">
        <div className="container">
          <Reveal y={50} className={styles.mockWrap}>
            <div className={styles.mockGlow} aria-hidden="true" />
            <DashboardMockup />
          </Reveal>
          <p className={styles.mockNote}>Illustrative interface preview</p>
        </div>
      </section>

      <section className="section" aria-labelledby="types-title">
        <div className="container">
          <SectionHeading
            index="01"
            eyebrow="Built for many businesses"
            id="types-title"
            title={
              <>
                One system, <span className="gradient-text">many industries</span>
              </>
            }
            description={product.tagline}
          />
          <ul className={styles.types}>
            {product.businessTypes.map((t, i) => (
              <Reveal as="li" key={t.label} delay={i * 0.05}>
                <TiltCard className={`i-card ${styles.type}`} max={10}>
                  <span className="icon-box">
                    <Icon name={t.icon} size={22} />
                  </span>
                  <span className={styles.typeLabel}>{t.label}</span>
                </TiltCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="highlights-title">
        <div className="container">
          <SectionHeading
            index="02"
            eyebrow="Why it matters"
            id="highlights-title"
            title={
              <>
                Designed to be <span className="gradient-text">ready</span> for business
              </>
            }
          />
          <ul className={styles.highlights}>
            {product.highlights.map((h, i) => (
              <Reveal as="li" key={h.title} delay={i * 0.08}>
                <TiltCard className={`i-card ${styles.highlight}`}>
                  <span className={styles.hNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="icon-box">
                    <Icon name={h.icon} />
                  </span>
                  <h3>{h.title}</h3>
                  <p>{h.description}</p>
                </TiltCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {hasModules && (
        <section className="section" style={{ paddingTop: 0 }} aria-labelledby="modules-title">
          <div className="container">
            <SectionHeading
              index="03"
              eyebrow="Modules"
              id="modules-title"
              title={
                <>
                  Core <span className="gradient-text">modules</span>
                </>
              }
            />
            <ul className={styles.modules}>
              {product.modules.map((m, i) => {
                const placeholder = m.title.startsWith("[");
                return (
                  <Reveal as="li" key={`${m.title}-${i}`} delay={(i % 3) * 0.06}>
                    <div className={`i-card ${styles.module} ${placeholder ? styles.modulePlaceholder : ""}`}>
                      <span className="icon-box">
                        <Icon name={m.icon} />
                      </span>
                      <div>
                        <h3>{m.title}</h3>
                        <p>{m.description}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {product.technologies.length > 0 && (
        <section className="section section--tight" aria-labelledby="product-tech-title">
          <div className="container">
            <h2 id="product-tech-title" className={styles.smallTitle}>
              Built with
            </h2>
            <ul className={styles.tech}>
              {product.technologies.map((t) => (
                <li key={t} className="chip chip--accent">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {product.screenshots.length > 0 && (
        <section className="section" aria-labelledby="screens-title">
          <div className="container">
            <SectionHeading
              eyebrow="Screenshots"
              id="screens-title"
              title={
                <>
                  Inside the <span className="gradient-text">software</span>
                </>
              }
            />
            <ul className={styles.screens}>
              {product.screenshots.map((s) => (
                <li key={s.src} className={styles.screen}>
                  <Image src={s.src} alt={s.alt} fill sizes="(max-width: 768px) 100vw, 50vw" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
