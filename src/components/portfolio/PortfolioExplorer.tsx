"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useState } from "react";
import { projectFilters, projects, type ProjectCategory } from "@/data/projects";
import { FilterBar } from "@/components/ui/FilterBar";
import { ProjectCard } from "./ProjectCard";
import styles from "./PortfolioGrid.module.css";

type Filter = "All" | ProjectCategory;

export function PortfolioExplorer() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));
  const counts = Object.fromEntries(
    projectFilters.map((f) => [f, f === "All" ? projects.length : projects.filter((p) => p.categories.includes(f)).length])
  ) as Record<Filter, number>;

  return (
    <div>
      <div className={styles.toolbar}>
        <FilterBar
          options={projectFilters}
          value={filter}
          onChange={setFilter}
          label="Filter projects by category"
          layoutId="portfolio-filter"
          counts={counts}
        />
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        {filter !== "All" ? ` in ${filter}` : ""}
      </p>

      <m.ul layout className={styles.grid}>
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <m.li
              key={p.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={p} priority={i < 3} />
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>

      {visible.length === 0 && (
        <p className={styles.empty}>No projects in this category yet — check back soon.</p>
      )}
    </div>
  );
}
