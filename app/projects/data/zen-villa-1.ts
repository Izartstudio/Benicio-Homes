import { PROJECT_MEDIA } from "@/app/projects/data/project-media";
import type { ProjectDetailData } from "@/app/projects/data/types";

const media = PROJECT_MEDIA.zenVilla1;

export const zenVillas1Project = {
  slug: "zen-villa-1",
  metadata: {
    title: "Zen Villa 1 | Benicio",
    description:
      "Zen Villa 1 is shaped as a quiet Goan retreat, balancing contemporary architecture, privacy, and a close relationship with nature.",
  },
  hero: {
    layout: "el-salva",
    title: "Zen Villa 1",
    titleLayer: "front",
    description:
      "Zen Villa I is a contemporary tropical home in Assagao, designed for openness and simplicity. With clean forms and natural light, it offers a refined retreat that blends modern design with Goa's calm landscape.",
    image: { src: media.hero, alt: "Zen Villa 1 exterior" },
    foregroundImage: { src: media.heroForeground, alt: "" },
    mediaCanvas: {
      aspectRatio: 1440 / 1500,
    },
  },
  intro: {
    intro:
      "Zen Villa I balances clean contemporary design with the warmth of tropical living, creating a home defined by light, openness, and calm.",
    backgroundImage: { src: media.intro, alt: "Zen Villa 1 introduction" },
  },
  location: {
    location: "Assagao, Goa",
    featureImage: { src: media.location, alt: "Zen Villa 1 and its landscape" },
    decorativeImage: { src: media.locationDecorative, alt: "Tropical foliage" },
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
      image: { src: media.editorialSiteComposition, alt: "Zen Villa 1 site composition" },
    },
    moodboard: {
      labels: {
        primary: "CALM",
        vertical: "SERENITY",
        footer: "REFINED",
      },
      images: [
        { src: media.editorialMoodboard[0], alt: "Zen Villa 1 moodboard image 1" },
        { src: media.editorialMoodboard[1], alt: "Zen Villa 1 moodboard image 2" },
        { src: media.editorialMoodboard[2], alt: "Zen Villa 1 moodboard image 3" },
        { src: media.editorialMoodboard[3], alt: "Zen Villa 1 moodboard image 4" },
      ],
    },
    showcase: {
      images: [
        { src: media.editorialShowcase[0], alt: "Zen Villa 1 showcase image" },
        { src: media.editorialShowcase[1], alt: "Zen Villa 1 detail image 1" },
        { src: media.editorialShowcase[2], alt: "Zen Villa 1 detail image 2" },
        { src: media.editorialShowcase[3], alt: "Zen Villa 1 detail image 3" },
        { src: media.editorialShowcase[4], alt: "Zen Villa 1 detail image 4" },
      ],
    },
    gallery: {
      hideWatermark: true,
      watermark: "Zen Villa 1",
      items: [
        { caption: "Calm, Shaped By Light.", image: { src: media.editorialGallery[0], alt: "Zen Villa 1 gallery image 1" } },
        { caption: "Inside, Calm Endures.", image: { src: media.editorialGallery[1], alt: "Zen Villa 1 gallery image 2" } },
      ],
    },
  },
} as const satisfies ProjectDetailData;
