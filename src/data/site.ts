/**
 * Personal information, contact details, social links and navigation.
 * Edit this file to update core site content — components read from here.
 *
 * Brand spelling rule: the name is always "Haseebullah".
 */

export const site = {
  name: "Haseebullah",
  domain: "haseebullah.pro",
  url: "https://haseebullah.pro",
  previousSite: "https://haseebullahdesigns.com",
  locale: "en_US",

  /** Professional hierarchy — order matters (software first). */
  roles: ["Software Developer", "Digital Marketer", "Graphic Designer"],
  tagline: "Software Developer • Digital Marketer • Graphic Designer",

  /** Titles rotated under the name in the hero. The first is the primary. */
  rotatingTitles: ["Software Developer", "Digital Marketer", "Graphic Designer"],

  /** Primary software specialties highlighted in the hero. */
  specialties: [
    { label: "Web Development", icon: "globe" },
    { label: "App Development", icon: "smartphone" },
    { label: "Desktop Development", icon: "monitor" },
    { label: "Custom Software", icon: "code" },
  ],

  experienceYears: 3,
  experienceLabel: "3+ Years Experience",

  heroDescription:
    "Software Developer specializing in modern web applications, desktop applications, mobile solutions and custom business software — with additional expertise in digital marketing and graphic design.",

  /**
   * Profile photo shown in the hero and About section.
   * Add your photo to /public/images/ and set the path, e.g. "/images/profile.jpg".
   * While null, an elegant monogram is displayed instead.
   */
  profileImage: "/images/profile.webp" as string | null,

  /** Brand logo (circular badge) used in the navbar, footer and app icon. */
  logo: "/images/brand/logo.webp",

  seo: {
    title: "Haseebullah | Software Developer, Digital Marketer & Graphic Designer",
    description:
      "Haseebullah is a Software Developer with 3+ years of experience building web applications, desktop applications, mobile apps, SaaS and custom business software — with additional expertise in digital marketing, SEO and graphic design.",
    keywords: [
      "Haseebullah",
      "Software Developer",
      "Web Developer",
      "App Developer",
      "Desktop Application Developer",
      "Custom Software Developer",
      "Web Applications",
      "SaaS Applications",
      "Digital Marketer",
      "SEO",
      "Graphic Designer",
      "Brand Identity",
    ],
  },
} as const;

export const contact = {
  phone: "0346 1365547",
  phoneHref: "tel:+923461365547",
  email: "Hasibullah0039@gmail.com",
  emailHref: "mailto:Hasibullah0039@gmail.com",
  /** Floating WhatsApp chat button (bottom-right on every page). */
  whatsappUrl: "https://wa.me/923461365547",
  address: {
    lines: ["Tahana Batela", "District Malakand", "Khyber Pakhtunkhwa", "Pakistan"],
    postalCode: "23000",
  },
} as const;

export type SocialLink = {
  id: "linkedin" | "github" | "behance" | "email";
  label: string;
  /** Leave empty until the real profile URL is available — the icon renders as "coming soon". */
  url: string;
};

export const socials: SocialLink[] = [
  { id: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/haseebullahpro/" },
  { id: "github", label: "GitHub", url: "https://github.com/haseebullah0039" },
  { id: "behance", label: "Behance", url: "https://www.behance.net/haseebullahdesigns/" },
  { id: "email", label: "Email", url: contact.emailHref },
];

export type NavLink = { label: string; href: string; section?: string };

export const navLinks: NavLink[] = [
  { label: "About", href: "/#about", section: "about" },
  { label: "Services", href: "/#services", section: "services" },
  { label: "Product", href: "/#product", section: "product" },
  { label: "Portfolio", href: "/#portfolio", section: "portfolio" },
];

export const footerLinks: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Product", href: "/product" },
  { label: "Hesodevix Studio", href: "/#studio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];
