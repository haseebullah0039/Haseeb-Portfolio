/**
 * Technology stack and self-reported expertise levels.
 * `icon` values are keys from src/components/ui/Icon.tsx.
 * Items without a brand icon use a text `mark` instead of an invented logo.
 */

export type TechCategory = "Frontend" | "Backend" | "Database" | "Desktop";

export type Technology = {
  name: string;
  category: TechCategory;
  icon?: string;
  mark?: string;
  /** Brand colour used for the hover glow. */
  color: string;
  note: string;
};

export const techCategories: TechCategory[] = ["Frontend", "Backend", "Database", "Desktop"];

export const technologies: Technology[] = [
  { name: "HTML", category: "Frontend", icon: "html", color: "#E34F26", note: "Semantic markup" },
  { name: "CSS", category: "Frontend", icon: "css", color: "#663399", note: "Responsive layouts" },
  { name: "JavaScript", category: "Frontend", icon: "javascript", color: "#F7DF1E", note: "Core language" },
  { name: "React", category: "Frontend", icon: "react", color: "#61DAFB", note: "UI components" },
  { name: "Next.js", category: "Frontend", icon: "nextjs", color: "#FFFFFF", note: "Full-stack framework" },
  { name: "Node.js", category: "Backend", icon: "nodejs", color: "#5FA04E", note: "Server runtime" },
  { name: "Express.js", category: "Backend", icon: "express", color: "#FFFFFF", note: "APIs & routing" },
  { name: "Electron.js", category: "Desktop", icon: "electron", color: "#9FEAF9", note: "Desktop apps" },
  { name: "MongoDB", category: "Database", icon: "mongodb", color: "#47A248", note: "Document database" },
  { name: "MySQL", category: "Database", icon: "mysql", color: "#4479A1", note: "Relational database" },
];

/**
 * Self-reported expertise indicators (not certifications or measured rankings).
 * Order follows the professional hierarchy.
 */
export const expertise = [
  {
    label: "Software Development",
    value: 95,
    icon: "code",
    description: "Web, mobile, desktop and custom business software.",
  },
  {
    label: "Digital Marketing",
    value: 90,
    icon: "trendingUp",
    description: "SEO, content strategy, social media and ads.",
  },
  {
    label: "Graphic Design",
    value: 98,
    icon: "palette",
    description: "Logos, brand identity, print and social visuals.",
  },
];
