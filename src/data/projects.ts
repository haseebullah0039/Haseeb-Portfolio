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

/** One image in a case study gallery. */
export type CaseStudyImage = { src: string; title: string; caption: string; width: number; height: number };

/**
 * A full case study, rendered at /portfolio/<id>.
 * Write only what is true about the project — describe the work shown.
 */
export type CaseStudy = {
  /** Short line under the title. */
  summary: string;
  facts: { label: string; value: string }[];
  overview: string[];
  /** What was designed/built. */
  deliverables: string[];
  palette?: { name: string; hex: string }[];
  typography?: { role: string; font: string }[];
  /** Brand lines that appear in the work. */
  taglines?: string[];
  /** Key features shown as cards (useful for apps and software). */
  features?: { title: string; description: string; icon: string }[];
  gallery: CaseStudyImage[];
  /** Ids of related projects, linked at the end of the case study. */
  related?: string[];
};

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
  caseStudy?: CaseStudy;
};

const CF = "/images/projects/classy-fitters";

/** Classy Fitters — fashion e-commerce store (software case study). */
const classyFitters: Project = {
  id: "classy-fitters",
  title: "Classy Fitters — E-Commerce Store",
  category: "E-Commerce",
  categories: ["Software Development", "Web Development", "E-Commerce"],
  description:
    "A responsive fashion e-commerce store for Pakistan — product catalogue, categories, customer accounts, contact page and an admin panel for managing products and orders.",
  image: `${CF}/main-preview.webp`,
  cover: "store",
  // [ADD TECH STACK] — e.g. "Next.js", "Node.js", "MongoDB". Feature tags until then.
  technologies: ["E-Commerce", "Admin Panel", "Responsive", "Customer Accounts"],
  caseStudyUrl: "/portfolio/classy-fitters",
  liveUrl: "https://classyfitters.shop",
  privateProject: false,
  featured: true,
  caseStudy: {
    summary: "Style that speaks for itself — a fashion store built for Pakistan, from storefront to admin panel.",
    facts: [
      { label: "Project", value: "Classy Fitters" },
      { label: "Type", value: "E-commerce website" },
      { label: "Market", value: "Pakistan (KPK)" },
      { label: "Live site", value: "classyfitters.shop" },
    ],
    overview: [
      "Classy Fitters is an online fashion store for Pakistan, selling perfumes, smart watches, bags and women’s accessories, fashion clothing and jewellery. The brand promise is “authentic KPK style with premium quality fashion,” so the store needed to feel premium while staying easy to shop.",
      "The storefront uses a bold pink-and-white design with a clear hero, category browsing, product grids with sale prices and add-to-cart buttons, and a friendly Roman-Urdu voice (“Sabse Zyada Bikne Wale”). Behind it, customers can sign in or register, reach the team through a contact page with WhatsApp, map and business hours, and the owner manages products and orders from a dedicated admin panel. Every page is fully responsive across desktop, tablet and mobile.",
    ],
    deliverables: [
      "Storefront & homepage",
      "Product catalogue & grids",
      "Category browsing",
      "Sale pricing & add to cart",
      "Customer sign in / register",
      "Contact page with WhatsApp & map",
      "Admin panel (products & orders)",
      "Fully responsive design",
    ],
    gallery: [
      { src: `${CF}/main-preview.webp`, title: "Main Preview", caption: "The store across desktop, laptop, tablet and phone.", width: 1536, height: 1024 },
      { src: `${CF}/hero-section.webp`, title: "Hero Section", caption: "“Experience authentic KPK style with premium quality fashion” with Shop Now and New Arrivals.", width: 1448, height: 1086 },
      { src: `${CF}/products.webp`, title: "Products", caption: "Best-seller grid with sale badges, prices and add-to-cart buttons.", width: 1448, height: 1086 },
      { src: `${CF}/category.webp`, title: "Categories", caption: "Smart watches, perfumes, women’s accessories, fashion and jewellery.", width: 1448, height: 1086 },
      { src: `${CF}/login-page.webp`, title: "Sign In & Register", caption: "Customer accounts with a branded split-screen login.", width: 1448, height: 1086 },
      { src: `${CF}/contact-page.webp`, title: "Contact Page", caption: "Call, email, store location, business hours, map and WhatsApp chat.", width: 1448, height: 1086 },
      { src: `${CF}/admin-panel.webp`, title: "Admin Panel", caption: "Store management: revenue, orders, products, search, filters and Add Product.", width: 1448, height: 1086 },
    ],
  },
};

const BC = "/images/projects/bayans-cafe";

/** Bayan's Cafe — mobile ordering app (separate from the branding kit). */
const bayansCafeApp: Project = {
  id: "bayans-cafe-app",
  title: "Bayan’s Cafe — Mobile App",
  category: "Apps",
  categories: ["Apps"],
  description:
    "A mobile ordering app for a fast-food cafe — menu, deals, delivery or dine-in checkout, local payment options, live chat and a rewards programme.",
  image: `${BC}/app-cover.webp`,
  cover: "mobile",
  technologies: ["Mobile App", "UI/UX", "Ordering", "Rewards", "Live Chat"],
  caseStudyUrl: "/portfolio/bayans-cafe-app",
  privateProject: false,
  featured: true,
  caseStudy: {
    summary: "Order, save and earn — the Bayan’s Cafe experience in a mobile app.",
    facts: [
      { label: "Brand", value: "Bayan’s Cafe" },
      { label: "Type", value: "Mobile ordering app" },
      { label: "Region", value: "Khyber Pakhtunkhwa, Pakistan" },
      { label: "Screens", value: "7 app screens" },
    ],
    overview: [
      "A mobile ordering app that carries the Bayan’s Cafe brand into customers’ pockets. Customers can browse the menu, grab deals, order for delivery or dine-in, pay the way they prefer, chat with the cafe and earn rewards — all in the burgundy-and-cream Bayan’s look.",
      "The app is designed around local habits: pickup from Batkhela, KPK, prices in rupees, cash on delivery alongside Easypaisa / JazzCash and cards, and loyalty through reward points, membership tiers and a coffee stamp card.",
    ],
    deliverables: [
      "Login & sign up",
      "Menu with search & categories",
      "Deals & offers",
      "Order tracking & history",
      "Checkout & payments",
      "Live support chat",
      "Profile & rewards",
    ],
    features: [
      { title: "Login & Sign Up", description: "Email, Google or Apple sign-in, with a “Join & get a free coffee” welcome offer.", icon: "logIn" },
      { title: "Menu", description: "Searchable menu with categories — burgers, pizza, shawarma, fries — and featured combos.", icon: "utensils" },
      { title: "Deals & Offers", description: "Flash-deal countdown, family feasts, promo codes and a stamp card.", icon: "tag" },
      { title: "My Orders", description: "Active and past orders with receipts and one-tap reorder.", icon: "mapPin" },
      { title: "Checkout", description: "Delivery or dine-in, promo codes, cash on delivery, Easypaisa / JazzCash or card.", icon: "card" },
      { title: "Live Chat", description: "Built-in live support chat with the cafe.", icon: "messageCircle" },
      { title: "Profile & Rewards", description: "Reward points, membership tiers, coffee stamp card, saved addresses and payments.", icon: "gift" },
    ],
    gallery: [
      { src: `${BC}/app-cover.webp`, title: "App Overview", caption: "Deals, checkout, menu, orders and profile screens of the Bayan’s Cafe app.", width: 2000, height: 1479 },
      { src: `${BC}/app-menu.webp`, title: "Menu", caption: "Pickup location, search, categories, combo deal banner and menu items.", width: 1402, height: 1122 },
      { src: `${BC}/app-login-signup.webp`, title: "Login & Sign Up", caption: "Welcome back and create-account screens with social sign-in.", width: 1402, height: 1122 },
      { src: `${BC}/app-deals.webp`, title: "Deals & Offers", caption: "Today’s flash deal, family feast and more offers with promo codes.", width: 1402, height: 1122 },
      { src: `${BC}/app-orders.webp`, title: "My Orders", caption: "Active orders and past orders with receipts and reorder.", width: 1402, height: 1122 },
      { src: `${BC}/app-checkout.webp`, title: "Checkout", caption: "Delivery or dine-in, promo code, bill summary and payment method.", width: 1448, height: 1086 },
      { src: `${BC}/app-profile.webp`, title: "Profile & Rewards", caption: "Reward points, coffee stamp card, order history and settings.", width: 1448, height: 1086 },
      { src: `${BC}/app-chat.webp`, title: "Live Chat", caption: "Live support chat with the cafe.", width: 1024, height: 1536 },
    ],
    related: ["bayans-cafe"],
  },
};

/** Bayan's Cafe — full branding kit (graphic design case study). */
const bayansCafe: Project = {
  id: "bayans-cafe",
  title: "Bayan’s Cafe — Full Branding Kit",
  category: "Graphic Design",
  categories: ["Graphic Design"],
  description:
    "Complete brand identity for a fast-food cafe from Khyber Pakhtunkhwa: logo, colour and type system, packaging, cups, menu, stationery, uniforms, store branding and social media.",
  /** Card thumbnail. The full-kit collage leads the case study itself. */
  image: `${BC}/logo.webp`,
  cover: "brand",
  technologies: ["Logo", "Brand Identity", "Packaging", "Print", "Social Media"],
  caseStudyUrl: "/portfolio/bayans-cafe",
  privateProject: false,
  featured: true,
  caseStudy: {
    summary: "A warm, bold brand for a fast-food cafe — good food, great mood.",
    facts: [
      { label: "Brand", value: "Bayan’s Cafe" },
      { label: "Industry", value: "Fast food & coffee" },
      { label: "Region", value: "Khyber Pakhtunkhwa, Pakistan" },
      { label: "Scope", value: "Full branding kit" },
    ],
    overview: [
      "Bayan’s Cafe is a fast-food brand serving burgers, fries, wraps and coffee. The goal was a complete, consistent identity that feels warm and welcoming, looks appetising, and works everywhere the brand appears — from a coffee cup to the storefront.",
      "The logo pairs a burger and a steaming coffee cup inside a bold circular badge, with a strong “BAYAN’S” wordmark on a banner. Mountain motifs and a local pattern connect the brand to its Khyber Pakhtunkhwa roots, and a burgundy, brown, golden and cream palette ties every touchpoint together.",
    ],
    deliverables: [
      "Logo & logo variations",
      "Colour palette & typography",
      "Brand pattern & iconography",
      "Packaging system",
      "Coffee cups (3 sizes)",
      "Menu board",
      "Business cards",
      "Invoice design",
      "Table tent offers",
      "Staff uniform system",
      "Store & signage branding",
      "Social media branding",
    ],
    palette: [
      { name: "Burgundy", hex: "#7A1E1E" },
      { name: "Brown", hex: "#4A2C16" },
      { name: "Golden", hex: "#F4A300" },
      { name: "Cream", hex: "#FFF4E6" },
    ],
    typography: [
      { role: "Headings", font: "Bebas Neue / Oswald Bold" },
      { role: "Body", font: "Montserrat" },
    ],
    taglines: [
      "Good Food. Great Mood.",
      "Taste That Feels Like Home",
      "Local Flavor. Premium Experience.",
      "Great Food. Better Together.",
    ],
    gallery: [
      { src: `${BC}/full-branding-kit.webp`, title: "Full Branding Kit", caption: "The complete identity across every touchpoint.", width: 1536, height: 1022 },
      { src: `${BC}/logo.webp`, title: "Logo", caption: "Burger and coffee in a bold circular badge with a banner wordmark.", width: 1536, height: 1022 },
      { src: `${BC}/brand-identity-system.webp`, title: "Brand Identity System", caption: "Logo variations, colour palette, typography, pattern, iconography and brand elements.", width: 1536, height: 1022 },
      { src: `${BC}/packaging-system.webp`, title: "Packaging System", caption: "Burger and fries boxes, wrapping paper, sauce containers, stickers, bags and delivery packaging.", width: 1531, height: 1024 },
      { src: `${BC}/coffee-cups.webp`, title: "Coffee Cups", caption: "Small, medium and large cups with branded sleeves.", width: 1536, height: 1019 },
      { src: `${BC}/menu-board.webp`, title: "Menu Board", caption: "Burgers, wraps, sides, drinks, coffee, combos and a family deal.", width: 1536, height: 1022 },
      { src: `${BC}/store-branding.webp`, title: "Store Branding", caption: "Storefront, wall graphics, counter, menu boards and wayfinding signage.", width: 1536, height: 1021 },
      { src: `${BC}/uniform-system.webp`, title: "Uniform System", caption: "Polo shirts, t-shirts, aprons, caps, name badges and staff accessories.", width: 1531, height: 1024 },
      { src: `${BC}/social-media-branding.webp`, title: "Social Media Branding", caption: "A consistent set of promotional posts and an Instagram profile.", width: 1533, height: 1024 },
      { src: `${BC}/business-card.webp`, title: "Business Cards", caption: "Front and back in cream and burgundy.", width: 1536, height: 1017 },
      { src: `${BC}/invoice.webp`, title: "Invoice", caption: "A branded invoice with itemised billing and payment details.", width: 1536, height: 1021 },
      { src: `${BC}/table-tent-offer.webp`, title: "Table Tent Offer", caption: "In-store promotion for a family deal and a burger combo.", width: 1536, height: 1019 },
    ],
    related: ["bayans-cafe-app"],
  },
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
  classyFitters,
  bayansCafe,
  bayansCafeApp,
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
