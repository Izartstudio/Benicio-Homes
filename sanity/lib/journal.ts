import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./client";
import { getJournalDetailImageUrl, getJournalImageUrl } from "./image";
import {
  HOMEPAGE_JOURNAL_POSTS_QUERY,
  JOURNAL_POST_QUERY,
  JOURNAL_POSTS_QUERY,
} from "./queries";
import { fallbackJournalArticles } from "../journal/fallback";
import type {
  JournalArticle,
  JournalBodyBlock,
  JournalBodyImage,
  JournalPost,
} from "../journal/types";

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
  body?: RawBodyItem[];
};

type RawBodyItem =
  | JournalBodyBlock
  | {
      _key: string;
      _type: "image";
      alt?: string;
      caption?: string;
      asset?: SanityImageSource;
      crop?: unknown;
      hotspot?: unknown;
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

export async function getJournalArticles(): Promise<JournalArticle[]> {
  if (!sanityClient) return [...fallbackJournalArticles];

  try {
    const posts = await sanityClient.fetch<RawJournalPost[]>(
      JOURNAL_POSTS_QUERY,
      {},
      { next: { revalidate: 300 } },
    );

    return posts.map((post, index) => ({
      ...normalizePost(post, index),
      number: `Journal ${String(posts.length - index).padStart(3, "0")}`,
    }));
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Unable to load Journal posts from Sanity.", error);
    }
    return [...fallbackJournalArticles];
  }
}

function fallbackBody(article: JournalArticle): JournalBodyBlock[] {
  return [
    {
      _key: "introduction",
      _type: "block",
      style: "h2",
      children: [{ _key: "s1", _type: "span", text: article.title }],
    },
    {
      _key: "summary",
      _type: "block",
      style: "normal",
      children: [{ _key: "s2", _type: "span", text: article.excerpt }],
    },
    {
      _key: "approach-heading",
      _type: "block",
      style: "h2",
      children: [{ _key: "s3", _type: "span", text: "Built With Place In Mind" }],
    },
    {
      _key: "approach-copy",
      _type: "block",
      style: "normal",
      children: [{
        _key: "s4",
        _type: "span",
        text: "At Benicio, architecture begins with climate, material, and the rhythms of life in Goa. Each decision is made to feel natural to its setting and enduring over time.",
      }],
    },
  ];
}

export async function getJournalPost(slug: string): Promise<JournalPost | null> {
  const fallback = fallbackJournalArticles.find((post) => post.slug === slug);

  if (!sanityClient) {
    return fallback ? { ...fallback, body: fallbackBody(fallback) } : null;
  }

  try {
    const raw = await sanityClient.fetch<RawJournalPost | null>(
      JOURNAL_POST_QUERY,
      { slug },
      { next: { revalidate: 300 } },
    );
    if (!raw) return fallback ? { ...fallback, body: fallbackBody(fallback) } : null;

    const article = normalizePost(raw, 0);
    const detailCover = getJournalDetailImageUrl(raw.coverImage);
    const body = (raw.body ?? []).reduce<Array<JournalBodyBlock | JournalBodyImage>>((result, item) => {
      if (item._type === "block") {
        result.push(item);
        return result;
      }
      const imageUrl = getJournalDetailImageUrl(item);
      if (imageUrl) {
        result.push({
          _key: item._key,
          _type: "image",
          alt: item.alt,
          caption: item.caption,
          imageUrl,
        });
      }
      return result;
    }, []);

    return {
      ...article,
      image: detailCover ? { ...article.image, src: detailCover } : article.image,
      body: body.length ? body : fallbackBody(article),
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Unable to load Journal post: ${slug}.`, error);
    }
    return fallback ? { ...fallback, body: fallbackBody(fallback) } : null;
  }
}
