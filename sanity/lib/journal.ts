import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./client";
import { getJournalImageUrl } from "./image";
import { HOMEPAGE_JOURNAL_POSTS_QUERY } from "./queries";
import { fallbackJournalArticles } from "../journal/fallback";
import type { JournalArticle } from "../journal/types";

const HOMEPAGE_JOURNAL_CARD_COUNT = fallbackJournalArticles.length;

type RawJournalPost = {
  _id?: string;
  altText?: string;
  author?: string;
  category?: string;
  coverImage?: SanityImageSource;
  excerpt?: string;
  featured?: boolean;
  location?: string;
  publishedAt?: string;
  slug?: string;
  title?: string;
};

function cleanText(value: string | null | undefined) {
  return value?.trim() ?? "";
}

function normalizePost(
  post: RawJournalPost,
  index: number,
): JournalArticle {
  const fallback =
    fallbackJournalArticles[index] ?? fallbackJournalArticles[0];
  const title = cleanText(post.title) || fallback.title;
  const imageUrl = getJournalImageUrl(post.coverImage);

  return {
    number: `Journal ${String(HOMEPAGE_JOURNAL_CARD_COUNT - index).padStart(3, "0")}`,
    slug: cleanText(post.slug) || fallback.slug,
    title,
    excerpt: cleanText(post.excerpt) || fallback.excerpt,
    publishedAt: cleanText(post.publishedAt) || fallback.publishedAt,
    category: cleanText(post.category) || fallback.category,
    location: cleanText(post.location) || fallback.location,
    author:
      cleanText(post.author) ||
      cleanText(post.location) ||
      fallback.author,
    image: {
      src: imageUrl || fallback.image.src,
      alt:
        cleanText(post.altText) ||
        (title ? `Cover image for ${title}` : fallback.image.alt),
    },
  };
}

function fillJournalSlots(posts: readonly JournalArticle[]) {
  const result: JournalArticle[] = [];
  const usedSlugs = new Set<string>();

  for (const post of posts) {
    if (usedSlugs.has(post.slug) || result.length >= HOMEPAGE_JOURNAL_CARD_COUNT) {
      continue;
    }

    result.push(post);
    usedSlugs.add(post.slug);
  }

  for (const fallback of fallbackJournalArticles) {
    if (
      result.length >= HOMEPAGE_JOURNAL_CARD_COUNT ||
      usedSlugs.has(fallback.slug)
    ) {
      continue;
    }

    result.push(fallback);
    usedSlugs.add(fallback.slug);
  }

  return result;
}

export async function getHomepageJournalArticles(): Promise<JournalArticle[]> {
  if (!sanityClient) {
    return [...fallbackJournalArticles];
  }

  try {
    const posts = await sanityClient.fetch<RawJournalPost[]>(
      HOMEPAGE_JOURNAL_POSTS_QUERY,
      {},
      {
        next: {
          revalidate: 300,
        },
      },
    );

    return fillJournalSlots(posts.map(normalizePost));
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Unable to load Journal posts from Sanity.", error);
    }

    return [...fallbackJournalArticles];
  }
}
