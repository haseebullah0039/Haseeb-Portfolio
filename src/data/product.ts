/**
 * Businexa Khata — universal business management software (flagship product).
 *
 * Only the concept and business types are confirmed. Module and technology
 * entries marked [ADD ...] are placeholders: replace them with the real details.
 */

export const product = {
  name: "Businexa Khata",
  /** Name split for two-tone headings: "Businexa" + accent "Khata". */
  nameParts: ["Businexa", "Khata"] as const,
  shortName: "Businexa Khata",
  category: "Universal Business Management Software",
  eyebrow: "Flagship Product",
  tagline: "One ready-made system, adaptable to many kinds of business.",
  description:
    "Businexa Khata is a ready-made universal business management software designed to support different types of businesses. Instead of building a new system from scratch for every organisation, it provides a single, adaptable foundation for managing day-to-day business operations.",
  /** Live web app, hosted on the Hesodevix Studio domain. */
  appUrl: "https://businexakhata.hesodevixstudio.com",

  /** Business environments the software is designed for. */
  businessTypes: [
    { label: "Retail", icon: "store" },
    { label: "Shops", icon: "bag" },
    { label: "Schools", icon: "school" },
    { label: "Clinics", icon: "stethoscope" },
    { label: "Hospitals", icon: "hospital" },
    { label: "Gyms", icon: "dumbbell" },
    { label: "Other Businesses", icon: "building" },
  ],

  /** Concept-level highlights (derived from the product definition). */
  highlights: [
    {
      title: "Ready-Made",
      description: "Designed to be deployed for a business without building from zero.",
      icon: "boxes",
    },
    {
      title: "Multi-Industry",
      description: "One foundation designed to adapt to different business types.",
      icon: "layers",
    },
    {
      title: "Business-Focused",
      description: "Built around the practical needs of managing a business.",
      icon: "briefcase",
    },
  ],

  /** [ADD MODULES] Replace each entry with a real module of the software. */
  modules: [
    { title: "[ADD MODULE NAME]", description: "Replace with the exact module details.", icon: "dashboard" },
    { title: "[ADD MODULE NAME]", description: "Replace with the exact module details.", icon: "users" },
    { title: "[ADD MODULE NAME]", description: "Replace with the exact module details.", icon: "database" },
    { title: "[ADD MODULE NAME]", description: "Replace with the exact module details.", icon: "fileText" },
    { title: "[ADD MODULE NAME]", description: "Replace with the exact module details.", icon: "chart" },
    { title: "[ADD MODULE NAME]", description: "Replace with the exact module details.", icon: "lock" },
  ],

  /** [ADD TECH STACK] e.g. ["Electron.js", "React", "Node.js", "MySQL"] */
  technologies: [] as string[],

  /** [ADD SCREENSHOTS] Paths under /public, e.g. "/images/product/dashboard.webp" */
  screenshots: [] as { src: string; alt: string }[],
};
