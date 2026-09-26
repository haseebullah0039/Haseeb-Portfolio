import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { Icon } from "@/components/ui/Icon";
import { ProjectCover } from "./ProjectCover";
import styles from "./ProjectCard.module.css";

/** Resolves where "View Project" should go: case study → live site → repository. */
function projectLink(p: Project): { href: string; external: boolean } | null {
  if (p.caseStudyUrl) return { href: p.caseStudyUrl, external: false };
  if (p.liveUrl) return { href: p.liveUrl, external: true };
  if (p.githubUrl && !p.privateProject) return { href: p.githubUrl, external: true };
  return null;
}

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const link = projectLink(project);
  const titleId = `project-${project.id}`;

  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <div className={styles.media}>
        <div className={styles.mediaInner}>
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} — project preview`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              className={styles.img}
            />
          ) : (
            <ProjectCover cover={project.cover} title={project.title} uid={project.id} />
          )}
        </div>
        <div className={styles.overlay} aria-hidden="true">
          <span className={styles.overlayBtn}>
            {link ? "View Project" : project.privateProject ? "Private Project" : "Details Coming Soon"}
            <Icon name={link ? "arrowUpRight" : project.privateProject ? "lock" : "sparkles"} size={16} />
          </span>
        </div>
        <div className={styles.badges}>
          <span className={styles.category}>{project.category}</span>
          {project.placeholder && <span className="chip chip--sample">Sample</span>}
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 id={titleId} className={styles.title}>
            {link ? (
              <Link
                href={link.href}
                className={styles.stretched}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {project.title}
              </Link>
            ) : (
              project.title
            )}
          </h3>
          {project.year && <span className={styles.year}>{project.year}</span>}
        </div>
        <p className={styles.desc}>{project.description}</p>

        {project.technologies.length > 0 && (
          <ul className={styles.tags} aria-label="Technologies">
            {project.technologies.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}

        <div className={styles.footer}>
          {link ? (
            <span className={styles.view} aria-hidden="true">
              View Project
              <Icon name="arrowRight" size={16} className={styles.arrow} />
            </span>
          ) : (
            <span className={styles.muted}>
              {project.privateProject ? (
                <>
                  <Icon name="lock" size={14} /> Private Project
                </>
              ) : (
                "Details coming soon"
              )}
            </span>
          )}
          {project.privateProject && link && (
            <span className={styles.private}>
              <Icon name="lock" size={13} /> Private Project
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
