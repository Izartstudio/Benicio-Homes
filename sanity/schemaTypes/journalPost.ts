import { defineField, defineType } from "sanity";

export const journalPost = defineType({
  name: "journalPost",
  title: "Journal post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Keep this under 80 characters so it fits the Journal card.",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 4,
      description: "A concise summary of no more than 180 characters.",
      validation: (rule) => rule.required().max(180),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      description: "Use a portrait-friendly image; crops and hotspots are supported.",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Article body",
      type: "array",
      description:
        "Add headings, paragraphs, quotes, and images in the order they should appear.",
      of: [
        {
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Section heading", value: "h2" },
            { title: "Subheading", value: "h3" },
            { title: "Pull quote", value: "blockquote" },
          ],
          lists: [],
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
              validation: (rule) => rule.required().max(120),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
              validation: (rule) => rule.max(180),
            }),
          ],
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "altText",
      title: "Image alt text",
      type: "string",
      description: "Describe the image for visitors using assistive technology.",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Use a short, single-line label.",
      validation: (rule) => rule.required().max(32),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      description: "The byline displayed on the homepage card.",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Optional short location label.",
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
});
