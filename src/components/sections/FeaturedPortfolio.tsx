import { featuredProjects } from "@/data/projects";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import grid from "@/components/portfolio/PortfolioGrid.module.css";
import styles from "./FeaturedPortfolio.module.css";

export function FeaturedPortfolio() {
  const items = featuredProjects.slice(0, 8);
  return (
    <section id="portfolio" className="section" aria-labelledby="portfolio-title">
      <div className="container">
        <div className={styles.head}>
          <SectionHeading
            index="09"
            eyebrow="Featured Work"
            id="portfolio-title"
            title={
              <>
                Selected <span className="gradient-text">Projects</span>
              </>
            }
            description="A selection of software, marketing and design work, with software projects first. Projects that can't be shared publicly are marked as private."
            className={styles.heading}
          />
          <Reveal delay={0.1} className={styles.headCta}>
            <Button href="/portfolio" variant="secondary" arrow>
              All Projects
            </Button>
          </Reveal>
        </div>

        <ul className={`${grid.grid} ${grid.grid4}`}>
          {items.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 4) * 0.07}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </ul>

        <Reveal className={styles.more}>
          <Button href="/portfolio" arrow magnetic>
            View More Portfolio
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
