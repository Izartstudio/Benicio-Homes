import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/contact-section";
import { Footer } from "@/components/footer/footer";
import { RestorationShowcaseSection, type RestorationSlide } from "@/sections/home/restoration-showcase-section";
import { AboutPracticePage } from "./practice-page";

export const metadata: Metadata = {
  title: "The Practice | Benicio Residences",
  description: "The people, principles and shared vision behind Benicio Residences.",
};

const restorationSlides: readonly RestorationSlide[] = [
  {
    id: "about-restoration-01",
    heading: "VILLA EL SALVA",
    leftLabel: "Heritage Value",
    rightLabel: "Portuguese-Inspired Architecture",
    number: "Restoration 001 -",
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/vanam/vanam-nextproject.webp",
    alt: "Restoration project placeholder",
  },
  {
    id: "about-restoration-02",
    heading: "VILLA PEROLA",
    leftLabel: "Ancestral Character",
    rightLabel: "Restored For Contemporary Life",
    number: "Restoration 002 -",
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/vanam/vanam-nextproject.webp",
    alt: "Heritage residence placeholder",
  },
  {
    id: "about-restoration-03",
    heading: "CASA VERDE",
    leftLabel: "A Living Legacy",
    rightLabel: "Crafted Around Place",
    number: "Restoration 003 -",
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/vanam/vanam-nextproject.webp",
    alt: "Restored Goan home placeholder",
  },
];

export default function AboutPage() {
  return (
    <main data-about-page>
      <AboutPracticePage />
      <RestorationShowcaseSection
        backgroundTexture="https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/about/restoration-about.webp"
        designSource="Section -6 about.svg"
        smoothContactTransition
        slides={restorationSlides}
      />
      <ContactSection />
      <Footer />
    </main>
  );
}
