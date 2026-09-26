/**
 * Portfolio projects.
 *
 * HOW TO ADD A PROJECT
 * 1. Put a screenshot in /public/images/projects/ (webp/avif/jpg, ~1600×1000).
 * 2. Add an entry below. Set `image` to "/images/projects/your-file.webp".
 *    Without an image, a styled cover is generated from `cover`.
 * 3. For private/client work set `privateProject: true` and leave `githubUrl` empty.
 * 4. Set `featured: true` to show it on the homepage (6–8 recommended).
 *
 * Entries with `placeholder: true` are SAMPLE SLOTS — replace them with real
 * projects (or delete them). They show a "Sample" badge on the site.
 */

import { product } from "./product";

export type ProjectCategory =
  | "Software Development"
  | "Web Development"
  | "Apps"
  | "Desktop"
  | "Business Software"
  | "E-Commerce"
  | "Digital Marketing"
  | "Graphic Design";

export const projectFilters: ("All" | ProjectCategory)[] = [
  "All",
  "Software Development",
  "Web Development",
  "Apps",
  "Desktop",
  "Business Software",
  "E-Commerce",
  "Digital Marketing",
  "Graphic Design",
];

export type CoverStyle =
  | "dashboard"
  | "web"
  | "mobile"
  | "desktop"
  | "store"
  | "marketing"
  | "brand"
  | "social";

export type Project = {
  id: string;
  title: string;
  /** Primary category shown on the card. */
  category: ProjectCategory;
  /** All categories the project should appear under when filtering. */
  categories: ProjectCategory[];
  description: string;
  image?: string;
  cover: CoverStyle;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  /** Internal page for the project (e.g. a case study). */
  caseStudyUrl?: string;
  privateProject: boolean;
  featured: boolean;
  year?: number;
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    id: "businexa-khata",
    title: "Businexa Khata",
    category: "Business Software",
    categories: ["Software Development", "Business Software"],
    description:
      "Universal business management software — a ready-made system designed to support different types of businesses, from retail and shops to schools, clinics, hospitals and gyms.",
    cover: "dashboard",
    technologies: [], // [ADD TECH STACK] e.g. "Electron.js", "React", "MySQL"
    caseStudyUrl: "/product",
    liveUrl: product.appUrl,
    privateProject: true, // Source code is private; the live app is linked via liveUrl.
    featured: true,
  },
  {
    id: "sample-web-application",
    title: "Web Application",
    category: "Software Development",
    categories: ["Software Development", "Web Development"],
    description:
      "Sample slot for a web application project. Replace with the real project name, description, screenshot and links.",
    cover: "web",
    technologies: ["React", "Node.js", "MongoDB"],
    privateProject: false,
    featured: true,
    placeholder: true,
  },
  {
    id: "sample-admin-dashboard",
    title: "Admin Dashboard",
    category: "Business Software",
    categories: ["Software Development", "Business Software"],
    description:
      "Sample slot for a dashboard or admin panel. Replace with the real project details.",
    cover: "dashboard",
    technologies: ["Next.js", "Express.js", "MySQL"],
    privateProject: false,
    featured: true,
    placeholder: true,
  },
  {
    id: "sample-desktop-application",
    title: "Desktop Application",
    category: "Desktop",
    categories: ["Software Development", "Desktop", "Business Software"],
    description:
      "Sample slot for a desktop software project. Replace with the real project details.",
    cover: "desktop",
    technologies: ["Electron.js", "JavaScript", "MySQL"],
    privateProject: false,
    featured: true,
    placeholder: true,
  },
  {
    id: "sample-mobile-app",
    title: "Mobile App",
    category: "Apps",
    categories: ["Software Development", "Apps"],
    description:
      "Sample slot for a mobile application project. Replace with the real project details.",
    cover: "mobile",
    technologies: ["React", "Node.js"],
    privateProject: false,
    featured: true,
    placeholder: true,
  },
  {
    id: "sample-ecommerce-store",
    title: "E-Commerce Store",
    category: "E-Commerce",
    categories: ["Software Development", "Web Development", "E-Commerce"],
    description:
      "Sample slot for an online store project. Replace with the real project details.",
    cover: "store",
    technologies: ["Next.js", "Node.js", "MongoDB"],
    privateProject: false,
    featured: true,
    placeholder: true,
  },
  {
    id: "sample-seo-campaign",
    title: "SEO & Social Media Campaign",
    category: "Digital Marketing",
    categories: ["Digital Marketing"],
    description:
      "Sample slot for a digital marketing project. Replace with the real scope and work delivered.",
    cover: "marketing",
    technologies: ["SEO", "Content Strategy", "Social Media"],
    privateProject: false,
    featured: true,
    placeholder: true,
  },
  {
    id: "sample-brand-identity",
    title: "Brand Identity Kit",
    category: "Graphic Design",
    categories: ["Graphic Design"],
    description:
      "Sample slot for a branding project. Replace with the real logo, identity and visuals.",
    cover: "brand",
    technologies: ["Illustrator", "Photoshop"],
    privateProject: false,
    featured: true,
    placeholder: true,
  },
  {
    id: "sample-business-website",
    title: "Business Website",
    category: "Web Development",
    categories: ["Web Development"],
    description:
      "Sample slot for a business website. Replace with the real project details.",
    cover: "web",
    technologies: ["HTML", "CSS", "JavaScript"],
    privateProject: false,
    featured: false,
    placeholder: true,
  },
  {
    id: "sample-social-media-designs",
    title: "Social Media Design Series",
    category: "Graphic Design",
    categories: ["Graphic Design", "Digital Marketing"],
    description:
      "Sample slot for a social media design set. Replace with the real visuals.",
    cover: "social",
    technologies: ["Photoshop", "Canva"],
    privateProject: false,
    featured: false,
    placeholder: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
