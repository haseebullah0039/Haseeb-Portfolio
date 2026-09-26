import { product } from "@/data/product";
import { DashboardMockup } from "@/components/product/DashboardMockup";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./ProductShowcase.module.css";

export function ProductShowcase() {
  return (
    <section id="product" className={`section ${styles.section}`} aria-labelledby="product-title">
      <div className="container">
        <div className={styles.panel}>
          <div className={styles.panelGlow} aria-hidden="true" />
          <div className={styles.copy}>
            <Reveal>
              <span className="eyebrow">
                <span className={styles.idx}>08 /</span> {product.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="product-title" className={styles.title}>
                Universal Business <span className="gradient-text">Management</span> Software
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className={styles.tagline}>{product.tagline}</p>
              <p className={styles.desc}>{product.description}</p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className={styles.label}>Designed for</p>
              <ul className={styles.types}>
                {product.businessTypes.map((t) => (
                  <li key={t.label}>
                    <Icon name={t.icon} size={16} />
                    {t.label}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2} className={styles.actions}>
              <Button href="/product" arrow magnetic>
                Explore Product
              </Button>
              <Button href="/contact?service=software" variant="secondary">
                Discuss Your Business
              </Button>
            </Reveal>
          </div>

          <Reveal className={styles.visual} delay={0.15} y={40}>
            <DashboardMockup />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
