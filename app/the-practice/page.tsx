import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/contact-section";
import { Footer } from "@/components/footer/footer";
import { RestorationShowcaseSection, type RestorationSlide } from "@/sections/home/restoration-showcase-section";
import { AboutPracticePage } from "./practice-page";
import { getAboutTeamSection } from "@/sanity/lib/aboutTeam";

// The CMS visibility switch must be reflected on the very next page request.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Practice | Benicio Homes",
  description: "Discover the thinking behind Benicio Homes, a Goa-based real estate developer shaped by tropical modernism, brutalist influences, honest materials, and a clear architectural point of view.",
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
    alt: "Vanam Villas tropical residences surrounded by landscaping in Anjuna, Goa",
  },
  {
    id: "about-restoration-02",
    heading: "NAYAN VILLAS",
    leftLabel: "ANCESTRAL CHARACTER",
    rightLabel: "RESTORED FOR CONTEMPORARY LIFE",
    href: "/projects/nayan-villa",
    number: "TROPICAL HOMES-",
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/vanam/vanam-nextproject.webp",
    alt: "Nayan Villas contemporary tropical residences in Majorda, South Goa",
  },
  {
    id: "about-restoration-03",
    heading: "EL SALVA VILLAS",
    leftLabel: "A LIVING LEGACY",
    rightLabel: "CRAFTED AROUND PLACE",
    href: "/projects/el-salva-villa",
    number: "TROPICAL HOMES-",
    url: "/assets/projects/villaelsalvabg.png",
    alt: "Villa El Salva restored Goan heritage home in Salvador do Mundo",
  },
    {
    id: "about-restoration-04",
    heading: "ZEN VILLAS-II",
    leftLabel: "A Living Legacy",
    rightLabel: "Crafted Around Place",
    href: "/projects/zen-villas-2",
    number: "TROPICAL HOMES-",
    url: "/assets/projects/Zen-Villa-IIbg.png",
    alt: "Zen Villa II contemporary tropical home in Assagao, Goa",
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
