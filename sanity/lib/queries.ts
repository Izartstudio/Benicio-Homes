import { defineQuery } from "next-sanity";

export const ABOUT_TEAM_SECTION_QUERY = defineQuery(`
  *[
    _type == "aboutTeamSection" &&
    !(_id in path("drafts.**"))
  ] | order(_updatedAt desc)[0] {
    isVisible,
    heading,
    members[] {
      _key,
      name,
      role,
      altText,
      image { asset, crop, hotspot }
    }
  }
`);

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

export const JOURNAL_POSTS_QUERY = defineQuery(`
  *[
    _type == "journalPost" &&
    !(_id in path("drafts.**")) &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ] | order(publishedAt desc) {
    _id, title, "slug": slug.current, excerpt,
    coverImage { asset, crop, hotspot }, publishedAt,
    category, author, location, altText, featured
  }
`);

export const JOURNAL_POST_QUERY = defineQuery(`
  *[
    _type == "journalPost" &&
    !(_id in path("drafts.**")) &&
    slug.current == $slug
  ][0] {
    _id, title, "slug": slug.current, excerpt,
    coverImage { asset, crop, hotspot }, publishedAt,
    category, author, location, altText, body[] {
      ...,
      _type == "image" => { ..., asset, crop, hotspot }
    }
  }
`);
