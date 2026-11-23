import type { MetadataRoute } from "next";
import { getAuthors, getCategories, getPosts, updatedISO } from "./lib/blog";
import { absoluteUrl } from "./lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, cats, authors] = await Promise.all([getPosts(), getCategories(), getAuthors()]);
  const live = posts.filter((p) => !p.data.noindex);
  const latest = live[0] ? updatedISO(live[0]) : undefined;

  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    ...["/invoice-generator", "/receipt-maker", "/estimate-generator", "/proforma-invoice"].map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: absoluteUrl("/blog"), lastModified: latest, changeFrequency: "daily", priority: 0.9 },
    ...live.map((p) => ({
      url: absoluteUrl(`/blog/${p.uid}`),
      lastModified: updatedISO(p),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...cats.map((c) => ({
      url: absoluteUrl(`/blog/category/${c.uid}`),
      lastModified: c.last_publication_date,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...authors.map((a) => ({
      url: absoluteUrl(`/blog/author/${a.uid}`),
      lastModified: a.last_publication_date,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
    { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/terms"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
