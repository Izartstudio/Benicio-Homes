import { PROJECT_MEDIA } from "@/app/projects/data/project-media";
import type { ProjectDetailData } from "@/app/projects/data/types";

const media = PROJECT_MEDIA.zenVilla1;

export const zenVillas1Project = {
  slug: "zen-villa-1",
  metadata: {
    title: "Zen Villa 1 | Benicio",
    description:
      "Explore Zen Villa I by Benicio Homes, a standalone 3 BHK home in Assagao, Goa, defined by a restrained, Zen-inspired approach to tropical living.",
  },
  hero: {
    layout: "el-salva",
    title: "Zen Villa 1",
    titleLayer: "front",
    description:
      "Zen Villa I is a contemporary tropical home in Assagao, designed for openness and simplicity. With clean forms and natural light, it offers a refined retreat that blends modern design with Goa's calm landscape.",
    image: { src: media.hero, alt: "Contemporary exterior of Zen Villa I in Assagao, Goa" },
    foregroundImage: { src: media.heroForeground, alt: "" },
    mobileImage: {
      src: media.heroMobile,
      alt: "Contemporary exterior of Zen Villa I in Assagao, Goa",
    },
    mobileForegroundImage: {
      src: media.heroForegroundMobile,
      alt: "",
    },
    mediaCanvas: {
      aspectRatio: 1440 / 1500,
    },
    mobileMediaCanvas: {
      aspectRatio: 420 / 912,
      foregroundCanvasHeightRatio: 1,
    },
  },
  intro: {
    intro:
      "Zen Villa I balances clean contemporary design with the warmth of tropical living, creating a home defined by light, openness, and calm.",
    backgroundImage: { src: media.intro, alt: "Zen Villa I contemporary architecture and tropical landscape" },
  },
  location: {
    location: "Assagao, Goa",
    featureImage: { src: media.location, alt: "Zen Villa I within the tropical landscape of Assagao, Goa" },
    decorativeImage: { src: media.locationDecorative, alt: "Tropical foliage surrounding Zen Villa I in Assagao" },
    description: [
      "Nestled in the vibrant village of Assagao, Zen Villa I is a contemporary tropical residence designed around openness, natural light, and everyday comfort.",
      "Clean architectural forms, honest materials, and seamless indoor-outdoor connections come together to create a home that feels calm, timeless, and deeply connected to its surroundings.",
    ],
  },
  contact: {
    heading: "Begin The Conversation.",
    copy: "Whether you're exploring a Benicio residence, considering a restoration opportunity, or simply want to understand our philosophy, we'd be pleased to hear from you. Every meaningful project begins with a conversation.",
  },
  editorialVariants: {
    mobileLayout: "perola",
    textures: {
      siteComposition: media.editorialSiteCompositionTexture,
      steps: PROJECT_MEDIA.shared.concreteTexture,
      moodboard: "",
      showcase: "",
      gallery: media.restorationTexture,
    },
    siteComposition: {
      image: { src: media.editorialSiteComposition, alt: "Architectural composition of Zen Villa I in Assagao, Goa" },
    },
    moodboard: {
      labels: {
        primary: "CALM",
        vertical: "SERENITY",
        footer: "REFINED",
      },
      images: [
        { src: media.editorialMoodboard[0], alt: "Zen Villa I architectural references inspired by calm tropical living" },
        { src: media.editorialMoodboard[1], alt: "Natural material palette for Zen Villa I in Assagao" },
        { src: media.editorialMoodboard[2], alt: "Zen Villa I design sketches and spatial references" },
        { src: media.editorialMoodboard[3], alt: "Tropical architecture details informing Zen Villa I" },
      ],
    },
    showcase: {
      images: [
        { src: media.editorialShowcase[0], alt: "Contemporary facade and garden of Zen Villa I in Assagao" },
        { src: media.editorialShowcase[1], alt: "Clean architectural lines and tropical planting at Zen Villa I" },
        { src: media.editorialShowcase[2], alt: "Natural light and material detail inside Zen Villa I" },
        { src: media.editorialShowcase[3], alt: "Crafted contemporary detail at Zen Villa I" },
        { src: media.editorialShowcase[4], alt: "Indoor-outdoor living detail at Zen Villa I in Goa" },
      ],
    },
    gallery: {
      hideWatermark: true,
      watermark: "Zen Villa 1",
      items: [
        { caption: "Calm, Shaped By Light.", image: { src: media.editorialGallery[0], alt: "Natural light shaping the calm interiors of Zen Villa I" } },
        { caption: "Inside, Calm Endures.", image: { src: media.editorialGallery[1], alt: "Refined contemporary interior of Zen Villa I in Assagao" } },
      ],
    },
  },
} as const satisfies ProjectDetailData;
