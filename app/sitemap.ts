import type { MetadataRoute } from "next";
import { projectList } from "@/app/projects/data";
import { getJournalArticles } from "@/sanity/lib/journal";

const siteUrl = "https://benicio.co.in";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const journalArticles = await getJournalArticles();

  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/projects`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/the-practice`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/journal`, changeFrequency: "weekly", priority: 0.8 },
    ...projectList.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...journalArticles.map((article) => ({
      url: `${siteUrl}/journal/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
