import { PROJECT_MEDIA } from "@/app/projects/data/project-media";
import type { ProjectDetailData } from "@/app/projects/data/types";

const media = PROJECT_MEDIA.villaPerola;

export const villaPerolaProject = {
  slug: "villa-perola",
  metadata: {
    title: "Villa Perola | Benicio",
    description:
      "An ancestral Goan home restored with care, Villa Perola preserves the character of its past while creating a refined setting for contemporary life.",
  },
  hero: {
    layout: "el-salva",
    title: "Villa Perola",
    description:
      "An ancestral Goan home restored with care, preserving the character of its past while creating a refined setting for contemporary life.",
    image: { src: media.hero, alt: "Villa Perola exterior" },
    foregroundImage: { src: media.heroForeground, alt: "" },
    mediaCanvas: {
      aspectRatio: 1440 / 1500,
    },
  },
  intro: {
    intro:
      "A living piece of Goa's architectural heritage, renewed with restraint and shaped for the rhythms of modern life.",
    backgroundImage: { src: media.intro, alt: "Villa Perola introduction" },
  },
  location: {
    location: "Goa",
    featureImage: { src: media.location, alt: "Villa Perola and its landscape" },
    decorativeImage: { src: media.locationDecorative, alt: "Tropical foliage" },
    description: [
      "Set within Goa's lush landscape, Villa Perola is shaped by the craft, proportions, and quiet dignity of a traditional family home.",
      "Its restoration protects the ancestral character of the house while giving every space a natural ease for contemporary living.",
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
      image: { src: media.editorialSiteComposition, alt: "Villa Perola site composition" },
    },
    moodboard: {
      labels: {
        primary: "LIVED",
        vertical: "UNHURRIED",
        footer: "STILLNESS",
      },
      images: [
        { src: media.editorialMoodboard[0], alt: "Villa Perola moodboard image 1" },
        { src: media.editorialMoodboard[1], alt: "Villa Perola moodboard image 2" },
        { src: media.editorialMoodboard[2], alt: "Villa Perola moodboard image 3" },
        { src: media.editorialMoodboard[3], alt: "Villa Perola moodboard image 4" },
      ],
    },
    showcase: {
      images: [
        { src: media.editorialShowcase[0], alt: "Villa Perola showcase image" },
        { src: media.editorialShowcase[1], alt: "Villa Perola detail image 1" },
        { src: media.editorialShowcase[2], alt: "Villa Perola detail image 2" },
        { src: media.editorialShowcase[3], alt: "Villa Perola detail image 3" },
        { src: media.editorialShowcase[4], alt: "Villa Perola detail image 4" },
      ],
    },
    gallery: {
      watermark: "Villa Perola",
      items: [
        { caption: "Comfort, Framed By Nature.", image: { src: media.editorialGallery[0], alt: "Villa Perola gallery image 1" } },
        { caption: "Inside, The Garden Continues.", image: { src: media.editorialGallery[1], alt: "Villa Perola gallery image 2" } },
      ],
    },
  },
} as const satisfies ProjectDetailData;
