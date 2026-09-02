import type { Metadata } from "next";
import { EditorialListingPage } from "@/components/journal/editorial-listing-page";
import { getJournalArticles } from "@/sanity/lib/journal";

export const metadata: Metadata = {
  title: "The Journal | Architecture & Design by Benicio Homes",
  description:
    "Essays and observations from Benicio on tropical architecture, brutalism, material honesty, craft, and the evolving language of design-led homes in Goa.",
};

export default async function JournalPage() {
  const articles = await getJournalArticles();
  const journalListStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "The Benicio Homes Journal",
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: article.title,
      url: `https://benicio.co.in/journal/${article.slug}`,
    })),
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(journalListStructuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      <EditorialListingPage
      accentColor="#dc4c28"
      cardAuthorColor="#ffffff"
      cardTitleColor="#ffffff"
      ctaBackgroundColor="#575757"
      ctaTextColor="#ffffff"
      contactTransitionGradient="linear-gradient(180deg, rgba(52,52,68,0) 0%, rgba(92,92,92,0.38) 48%, rgba(135,135,135,0.92) 76%, #b9b9b9 100%)"
      description="The Benicio Journal looks beyond the finished home. Notes on tropical architecture, brutalism, material, craft, restoration and the decisions that give buildings their character."
      descriptionTextColor="#575757"
      heading="Architecture Is A Way Of Seeing."
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
      loadMoreLabel="Load More Articles"
      sectionLabel="Journal articles"
      stepBackgroundColor="#343434"
      stepTexture="https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Journal/featured-blogstexture.webp"
      stepTextureBlend={false}
      />
    </>
  );
}
