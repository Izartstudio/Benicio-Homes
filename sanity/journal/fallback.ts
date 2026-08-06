import type { JournalArticle } from "./types";

export const fallbackJournalArticles: readonly JournalArticle[] = [
  {
    number: "Journal 003",
    slug: "preserving-goas-architectural-heritage",
    title: "Preserving Goa's Architectural Heritage",
    excerpt:
      "How thoughtful restoration protects the details, materials, and stories that give Goan architecture its enduring character.",
    publishedAt: "2026-03-03T00:00:00.000Z",
    category: "ARCHITECTURE",
    location: "Goa",
    author: "Author Name",
    image: {
      src: "/assets/legacy/legacy-1.svg",
      alt: "Concrete room opening into tropical landscape",
    },
  },
  {
    number: "Journal 002",
    slug: "why-climate-shapes-every-benicio-home",
    title: "How Heritage Homes Find New Life",
    excerpt:
      "A look at how monsoon, shade, airflow, and tropical planting shape homes made specifically for life in Goa.",
    publishedAt: "2026-02-02T00:00:00.000Z",
    category: "Architecture",
    location: "Goa",
    author: "Author Name",
    image: {
      src: "/assets/legacy/legacy-2.svg",
      alt: "Architectural stair and planted courtyard",
    },
  },
  {
    number: "Journal 001",
    slug: "the-enduring-beauty-of-laterite",
    title: "The Enduring Beauty of Laterite",
    excerpt:
      "Why Goa's distinctive local stone continues to bring warmth, texture, and a deep sense of place to contemporary homes.",
    publishedAt: "2026-01-01T00:00:00.000Z",
    category: "Materials",
    location: "Goa",
    author: "Author Name",
    image: {
      src: "/assets/legacy/legacy-3.svg",
      alt: "Laterite detail with an orange square insert",
    },
  },
] as const;
