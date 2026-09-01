import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/contact-section";
import { Footer } from "@/components/footer/footer";
import { RestorationShowcaseSection, type RestorationSlide } from "@/sections/home/restoration-showcase-section";
import { AboutPracticePage } from "./practice-page";
import { getAboutTeamSection } from "@/sanity/lib/aboutTeam";

// The CMS visibility switch must be reflected on the very next page request.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Practice | Benicio Residences",
  description: "The people, principles and shared vision behind Benicio Residences.",
};

const restorationSlides: readonly RestorationSlide[] = [
  {
    id: "about-restoration-01",
    heading: "VANAM VILLAS",
    leftLabel: "FOREST HOMES",
    rightLabel: "CLIMATE LIVING",
    href: "/projects/vanam-villas",
    number: "TROPICAL HOMES-",
    url: "/assets/projects/bgvanam.png",
    alt: "Restoration project placeholder",
  },
  {
    id: "about-restoration-02",
    heading: "NAYAN VILLAS",
    leftLabel: "ANCESTRAL CHARACTER",
    rightLabel: "RESTORED FOR CONTEMPORARY LIFE",
    href: "/projects/nayan-villa",
    number: "TROPICAL HOMES-",
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/vanam/vanam-nextproject.webp",
    alt: "Heritage residence placeholder",
  },
  {
    id: "about-restoration-03",
    heading: "EL SALVA VILLAS",
    leftLabel: "A LIVING LEGACY",
    rightLabel: "CRAFTED AROUND PLACE",
    href: "/projects/el-salva-villa",
    number: "TROPICAL HOMES-",
    url: "/assets/projects/villaelsalvabg.png",
    alt: "Restored Goan home placeholder",
  },
    {
    id: "about-restoration-04",
    heading: "ZEN VILLAS-II",
    leftLabel: "A Living Legacy",
    rightLabel: "Crafted Around Place",
    href: "/projects/zen-villas-2",
    number: "TROPICAL HOMES-",
    url: "/assets/projects/villazenbg.png",
    alt: "Restored Goan home placeholder",
  },
];

export default async function AboutPage() {
  const teamSection = await getAboutTeamSection();

  return (
    <main data-about-page>
      <AboutPracticePage teamSection={teamSection} />
      <RestorationShowcaseSection
        backgroundTexture="https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/about/restoration-about.webp"
        designSource="Section -6 about.svg"
        labelFont="roboto-slab"
        showLabels={false}
        smoothContactTransition
        slides={restorationSlides}
      />
      <ContactSection />
      <Footer />
    </main>
  );
}
