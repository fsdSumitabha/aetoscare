import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/** Add routes here as their pages are built. */
const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route.path, siteConfig.url).toString(),
    lastModified: siteConfig.lastUpdated,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
