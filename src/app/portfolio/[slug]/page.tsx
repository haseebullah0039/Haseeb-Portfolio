import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { CaseStudyGallery } from "@/components/portfolio/CaseStudyGallery";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { CONTACT_HREF } from "@/lib/contact";
import styles from "@/components/portfolio/CaseStudy.module.css";

type Params = { slug: string };

const withCaseStudy = () => projects.filter((p) => p.caseStudy);

/** Only projects with a case study get a page; any other slug is a 404. */
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return withCaseStudy().map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = withCaseStudy().find((p) => p.id === slug);
  if (!project) return {};
  const meta = pageMetadata({
    title: project.title,
    description: project.description,
    path: `/portfolio/${project.id}`,
  });
  // Use the project's thumbnail as the share image.
  const share = project.caseStudy?.gallery[0]?.src ?? project.image;
  if (share) {
    meta.openGraph = { ...meta.openGraph, images: [{ url: share }] };
    meta.twitter = { ...meta.twitter, images: [share] };
  }
  return meta;
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = withCaseStudy().find((p) => p.id === slug);
  if (!project?.caseStudy) notFound();
  const cs = project.caseStudy;
  const path = `/portfolio/${project.id}`;
  // The first gallery image is shown large as the cover; the grid shows the rest.
  const cover = cs.gallery[0];
  const rest = cs.gallery.slice(1);
  const isDesign = project.category === "Graphic Design";
  const related = (cs.related ?? [])
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is (typeof projects)[number] => Boolean(p));
  const liveHost = project.liveUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.description,
            url: new URL(path, site.url).toString(),
            ...(project.image ? { image: new URL(project.image, site.url).toString() } : {}),
            creator: { "@id": `${site.url}/#person` },
            genre: project.category,
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Portfolio", path: "/portfolio" },
            { name: project.title, path },
          ]),
        ]}
      />

      <PageHero
        back={{ href: "/#portfolio", label: "Back to Portfolio" }}
        eyebrow={`Case Study · ${project.category}`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Portfolio", href: "/portfolio" }, { label: project.title }]}
        title={project.title}
        description={cs.summary}
      >
        {project.liveUrl && (
          <Button href={project.liveUrl} external arrow magnetic>
            Visit Live Site
          </Button>
        )}
      </PageHero>

      <section className="section" style={{ paddingTop: 0 }} aria-label="Project overview">
        <div className="container">
          {cover && (
            <Reveal className={styles.cover}>
              <Image
                src={cover.src}
                alt={`${project.title} — ${cover.title}`}
                width={cover.width}
                height={cover.height}
                sizes="(max-width: 1240px) 100vw, 1240px"
                priority
                className={styles.coverImg}
              />
            </Reveal>
          )}

          <dl className={styles.facts}>
            {cs.facts.map((f) => (
              <div key={f.label} className={styles.fact}>
                <dt>{f.label}</dt>
                <dd>
                  {project.liveUrl && f.value === liveHost ? (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.factLink}>
                      {f.value}
                      <Icon name="arrowUpRight" size={14} />
                    </a>
                  ) : (
                    f.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className={styles.columns}>
            <Reveal className={styles.overview}>
              <h2 className={styles.h2}>Overview</h2>
              {cs.overview.map((para, i) => (
                <p key={i} className="lead">
                  {para}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.1} className={styles.deliverables}>
              <h2 className={styles.h2}>Deliverables</h2>
              <ul>
                {cs.deliverables.map((d) => (
                  <li key={d}>
                    <Icon name="check" size={16} />
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {cs.features && (
            <section className={styles.part} aria-labelledby="features-title">
              <Reveal>
                <h2 id="features-title" className={styles.h2}>
                  Key features
                </h2>
              </Reveal>
              <ul className={styles.features}>
                {cs.features.map((f, i) => (
                  <Reveal as="li" key={f.title} delay={(i % 4) * 0.05} className={styles.feature}>
                    <span className="icon-box">
                      <Icon name={f.icon} />
                    </span>
                    <h3>{f.title}</h3>
                    <p>{f.description}</p>
                  </Reveal>
                ))}
              </ul>
            </section>
          )}

          {(cs.palette || cs.typography || cs.taglines) && (
            <div className={styles.system}>
              {cs.palette && (
                <Reveal className={styles.block}>
                  <h2 className={styles.h3}>Colour palette</h2>
                  <ul className={styles.swatches}>
                    {cs.palette.map((c) => (
                      <li key={c.hex}>
                        <span className={styles.swatch} style={{ background: c.hex }} aria-hidden="true" />
                        <strong>{c.name}</strong>
                        <code>{c.hex}</code>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
              {cs.typography && (
                <Reveal delay={0.06} className={styles.block}>
                  <h2 className={styles.h3}>Typography</h2>
                  <ul className={styles.type}>
                    {cs.typography.map((t) => (
                      <li key={t.role}>
                        <span>{t.role}</span>
                        <strong>{t.font}</strong>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
              {cs.taglines && (
                <Reveal delay={0.12} className={styles.block}>
                  <h2 className={styles.h3}>Brand lines</h2>
                  <ul className={styles.taglines}>
                    {cs.taglines.map((t) => (
                      <li key={t}>&ldquo;{t}&rdquo;</li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </div>
          )}

          <Reveal>
            <h2 className={`${styles.h2} ${styles.galleryTitle}`}>
              The work{" "}
              <span className={styles.count}>
                {rest.length} more {project.category === "Apps" ? "screens" : isDesign ? "designs" : "pages"}
              </span>
            </h2>
          </Reveal>
          <CaseStudyGallery images={rest} projectTitle={project.title} />

          {related.length > 0 && (
            <section className={styles.related} aria-labelledby="related-title">
              <h2 id="related-title" className={styles.h3}>
                Related project
              </h2>
              <ul>
                {related.map((r) => (
                  <li key={r.id}>
                    <Link href={r.caseStudyUrl ?? "/portfolio"} className={styles.relatedCard}>
                      {r.image && (
                        <span className={styles.relatedThumb}>
                          <Image src={r.image} alt="" fill sizes="120px" />
                        </span>
                      )}
                      <span>
                        <span className={styles.relatedCat}>{r.category}</span>
                        <strong>{r.title}</strong>
                      </span>
                      <Icon name="arrowRight" size={20} className={styles.relatedArrow} />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className={styles.actions}>
            <Button href="/portfolio" variant="secondary">
              ← All Projects
            </Button>
            <Button href={CONTACT_HREF} service={isDesign ? "design" : "software"} arrow>
              {isDesign ? "Start a Branding Project" : "Start a Similar Project"}
            </Button>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
