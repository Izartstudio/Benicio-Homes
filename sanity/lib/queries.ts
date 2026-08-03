import { defineQuery } from "next-sanity";

export const HOMEPAGE_JOURNAL_POSTS_QUERY = defineQuery(`
  *[
    _type == "journalPost" &&
    !(_id in path("drafts.**")) &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ]
  | order(publishedAt desc)
  [0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage {
      asset,
      crop,
      hotspot
    },
    publishedAt,
    category,
    author,
    location,
    altText,
    featured
  }
`);
