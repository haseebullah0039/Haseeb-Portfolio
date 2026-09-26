import type { Metadata } from "next";
import { contact, site, socials } from "@/data/site";
import { studio } from "@/data/studio";

/** Page-level metadata with canonical URL and matching Open Graph / X tags. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = new URL(path, site.url).toString();
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      type: "website",
      locale: site.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
    },
  };
}

const sameAs = socials.filter((s) => s.url.startsWith("http")).map((s) => s.url);

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  url: site.url,
  jobTitle: "Software Developer",
  // Founder of the studio (Organization with this person as founder).
  worksFor: {
    "@type": "Organization",
    name: studio.name,
    founder: { "@id": `${site.url}/#person` },
    ...(studio.url ? { url: studio.url } : {}),
    ...(studio.logo ? { logo: new URL(studio.logo, site.url).toString() } : {}),
  },
  ...(site.profileImage ? { image: new URL(site.profileImage, site.url).toString() } : {}),
  description: site.seo.description,
  email: `mailto:${contact.email}`,
  knowsAbout: [
    "Software Development",
    "Web Development",
    "App Development",
    "Desktop Application Development",
    "Custom Software",
    "SaaS Applications",
    "Digital Marketing",
    "Search Engine Optimization",
    "Graphic Design",
    "Brand Identity",
  ],
  address: {
    "@type": "PostalAddress",
    addressRegion: "Khyber Pakhtunkhwa",
    addressCountry: "PK",
  },
  ...(sameAs.length ? { sameAs } : {}),
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: site.url,
  description: site.seo.description,
  publisher: { "@id": `${site.url}/#person` },
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, site.url).toString(),
    })),
  };
}
