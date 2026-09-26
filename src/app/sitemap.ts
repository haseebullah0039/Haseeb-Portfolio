import type { MetadataRoute } from "next";
import { site } from "@/data/site";

const routes = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/portfolio", priority: 0.9, changeFrequency: "monthly" },
  { path: "/product", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
