import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutTeamSection = defineType({
  name: "aboutTeamSection",
  title: "About team section",
  type: "document",
  fields: [
    defineField({
      name: "isVisible",
      title: "Show section",
      type: "boolean",
      description: "Turn this off to hide the entire team section from the About page.",
      initialValue: true,
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Crafted By A Shared Vision",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "members",
      title: "Team members",
      type: "array",
      description: "Drag the cards to control the order shown on the About page.",
      of: [
        defineArrayMember({
          name: "teamMember",
          title: "Team member",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (rule) => rule.required().max(80),
            }),
            defineField({
              name: "role",
              title: "Role",
              type: "string",
              validation: (rule) => rule.required().max(80),
            }),
            defineField({
              name: "image",
              title: "Portrait",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "altText",
              title: "Image alt text",
              type: "string",
              description: "Briefly describe the portrait for screen-reader users.",
              validation: (rule) => rule.required().max(120),
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "role", media: "image" },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { title: "heading", isVisible: "isVisible" },
    prepare({ title, isVisible }) {
      return {
        title: title || "About team section",
        subtitle: isVisible === false ? "Hidden" : "Visible",
      };
    },
  },
});
