import type { Metadata } from "next";
import { EditorialListingPage } from "@/components/journal/editorial-listing-page";
import { getJournalArticles } from "@/sanity/lib/journal";

export const metadata: Metadata = {
  title: "The Journal | Benicio Residences",
  description:
    "Stories from the places we build: architecture, tropical living, heritage restoration, and thoughtful design.",
};

export default async function JournalPage() {
  const articles = await getJournalArticles();

  return (
    <EditorialListingPage
      accentColor="#dc4c28"
      cardAuthorColor="#ffffff"
      cardTitleColor="#ffffff"
      ctaBackgroundColor="#575757"
      ctaTextColor="#ffffff"
      contactTransitionGradient="linear-gradient(180deg, rgba(52,52,68,0) 0%, rgba(92,92,92,0.38) 48%, rgba(135,135,135,0.92) 76%, #b9b9b9 100%)"
      description="Architecture is more than what is built. Explore insights on tropical living, heritage restoration, thoughtful design, and the ideas that continue to shape every Benicio home."
      descriptionTextColor="#575757"
      heading="Stories From The Places We Build"
      introBackgroundColor="#d4d4d1"
      introTextColor="#232323"
      introTexture="https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Journal/texture-journal.webp"
      items={articles.map((article) => ({
        author: article.author,
        href: `/journal/${article.slug}`,
        image: article.image,
        number: article.number,
        title: article.title,
      }))}
      listingBackgroundColor="#343434"
      listingTexture="https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Journal/featured-blogstexture.webp"
      loadMoreLabel="Load More Blogs"
      sectionLabel="Journal articles"
      stepBackgroundColor="#343434"
      stepTexture="https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Journal/featured-blogstexture.webp"
      stepTextureBlend={false}
    />
  );
}
