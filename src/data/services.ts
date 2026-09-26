/**
 * Service content for Software Development, Digital Marketing and Graphic Design.
 * `icon` values are keys from src/components/ui/Icon.tsx.
 */

export type ServiceItem = {
  title: string;
  description: string;
  icon: string;
};

export const softwareIntro =
  "I build modern, scalable and business-focused digital solutions across web, desktop, mobile and custom software environments.";

export const softwareServices: ServiceItem[] = [
  {
    title: "Web Development",
    description: "Fast, responsive and SEO-ready websites built with modern frameworks.",
    icon: "globe",
  },
  {
    title: "Web Applications",
    description: "Interactive, data-driven applications that run smoothly in the browser.",
    icon: "appWindow",
  },
  {
    title: "Mobile Applications",
    description: "App experiences designed for phones and tablets, focused on usability.",
    icon: "smartphone",
  },
  {
    title: "Desktop Applications",
    description: "Cross-platform desktop software for day-to-day business operations.",
    icon: "monitor",
  },
  {
    title: "SaaS Applications",
    description: "Subscription-ready platforms structured for multiple users and growth.",
    icon: "cloud",
  },
  {
    title: "Custom Software",
    description: "Tailored software shaped around the way a specific business works.",
    icon: "code",
  },
  {
    title: "E-Commerce Solutions",
    description: "Online stores with product catalogs, carts and clean checkout flows.",
    icon: "cart",
  },
  {
    title: "Business Management Systems",
    description: "Systems that organise records, operations and everyday workflows.",
    icon: "briefcase",
  },
  {
    title: "Dashboards & Admin Panels",
    description: "Clear admin interfaces for managing data, users and content.",
    icon: "dashboard",
  },
  {
    title: "API & Backend Development",
    description: "Reliable server logic, REST APIs and database integration.",
    icon: "server",
  },
];

export type ServiceGroup = { title: string; icon: string; items: string[] };

export const marketingIntro =
  "Strategy-led digital marketing that helps brands become easier to find, more consistent online and more engaging for the right audience.";

export const marketingFocus = [
  "Visibility",
  "Brand Presence",
  "Traffic",
  "Engagement",
  "Discoverability",
  "Lead Generation",
  "Online Growth",
];

export const marketingGroups: ServiceGroup[] = [
  {
    title: "Search Engine Optimization",
    icon: "search",
    items: [
      "SEO",
      "On-Page SEO",
      "Off-Page SEO",
      "Technical SEO",
      "Keyword Research",
      "Website SEO",
    ],
  },
  {
    title: "Content Marketing",
    icon: "fileText",
    items: ["Content Strategy", "Blogging", "Article Writing", "Content Promotion"],
  },
  {
    title: "Social Media Marketing",
    icon: "share",
    items: [
      "Social Media Management",
      "Social Media Profile Optimization",
      "Facebook Marketing",
      "Instagram Marketing",
      "TikTok Marketing",
      "YouTube Marketing",
    ],
  },
  {
    title: "Ads, Local & Strategy",
    icon: "target",
    items: [
      "Google Ads",
      "Google Business Profile Optimization",
      "Digital Marketing Strategy",
    ],
  },
];

export const designIntro =
  "Brand-focused graphic design with a strong eye for typography, colour and composition — visuals that make businesses look credible and memorable.";

export const designServices: ServiceItem[] = [
  { title: "Logo Design", description: "Distinctive marks built to scale from favicon to billboard.", icon: "penTool" },
  { title: "Brand Identity", description: "Cohesive visual systems: colour, type and usage rules.", icon: "palette" },
  { title: "Branding Kits", description: "Ready-to-use brand assets for consistent communication.", icon: "layers" },
  { title: "Business Cards", description: "Clean, professional cards that leave a strong first impression.", icon: "idCard" },
  { title: "Brochures", description: "Well-structured layouts that present information clearly.", icon: "bookOpen" },
  { title: "Posters", description: "Bold, eye-catching poster compositions.", icon: "image" },
  { title: "Social Media Designs", description: "Scroll-stopping posts, stories and cover visuals.", icon: "share" },
  { title: "Marketing Materials", description: "Flyers, banners and campaign visuals.", icon: "megaphone" },
  { title: "Print Design", description: "Print-ready artwork prepared with correct specs.", icon: "printer" },
  { title: "Promotional Graphics", description: "Visuals for offers, launches and events.", icon: "sparkles" },
  { title: "Creative Design", description: "Custom creative work beyond the usual formats.", icon: "wand" },
];

export const designTools = [
  { name: "Adobe Photoshop", mark: "Ps" },
  { name: "Adobe Illustrator", mark: "Ai" },
  { name: "Canva", mark: "Cv" },
];

/** Categories shown in the Services section. Software is first and featured. */
export type ServiceCategory = {
  id: "software" | "marketing" | "design";
  index: string;
  title: string;
  icon: string;
  description: string;
  items: string[];
  cta: string;
  featured?: boolean;
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "software",
    index: "01",
    title: "Software Development",
    icon: "code",
    description:
      "End-to-end development of websites, web apps, mobile apps, desktop software and custom business systems.",
    items: softwareServices.map((s) => s.title),
    cta: "Start a software project",
    featured: true,
  },
  {
    id: "marketing",
    index: "02",
    title: "Digital Marketing",
    icon: "trendingUp",
    description:
      "SEO, content and social media marketing to strengthen visibility and brand presence online.",
    items: [
      "SEO (On-Page, Off-Page, Technical)",
      "Keyword Research",
      "Content Strategy & Blogging",
      "Social Media Management",
      "Google Ads",
      "Google Business Profile",
    ],
    cta: "Discuss marketing",
  },
  {
    id: "design",
    index: "03",
    title: "Graphic Design",
    icon: "palette",
    description:
      "Logos, brand identities and marketing visuals crafted with Photoshop, Illustrator and Canva.",
    items: [
      "Logo Design",
      "Brand Identity & Kits",
      "Business Cards & Brochures",
      "Posters & Print Design",
      "Social Media Designs",
      "Marketing Materials",
    ],
    cta: "Discuss design",
  },
];

/** Options for the contact form "Service" select. */
export const contactServiceOptions = [
  { value: "software", label: "Software Development" },
  { value: "marketing", label: "Digital Marketing" },
  { value: "design", label: "Graphic Design" },
  { value: "other", label: "Other" },
];
