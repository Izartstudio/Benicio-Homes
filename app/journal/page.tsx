import type { Metadata } from "next";
import Image from "next/image";
import { getHomepageJournalArticles } from "@/sanity/lib/journal";

export const metadata: Metadata = {
  title: "Journal | Benicio Residences",
  description:
    "Stories about the people, places, materials, and architectural ideas behind Benicio homes.",
};

export default async function JournalPage() {
  const articles = await getHomepageJournalArticles();

  return (
    <main className="min-h-screen bg-[#b9b9b9] px-[clamp(1.25rem,5vw,4.5rem)] pb-24 pt-44 text-[#232323]">
      <header className="mx-auto max-w-[90rem]">
        <p className="font-display text-sm uppercase tracking-[0.14em] text-laterite">
          Benicio Journal
        </p>
        <h1 className="mt-4 font-display text-[clamp(2.75rem,7vw,6.5rem)] font-normal uppercase leading-none">
          Notes from Goa
        </h1>
      </header>

      <section
        aria-label="Journal articles"
        className="mx-auto mt-16 grid max-w-[90rem] gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {articles.map((article) => (
          <article className="min-w-0" key={article.slug}>
            <div className="relative aspect-[347/432] overflow-hidden">
              <Image
                src={article.image.src}
                alt={article.image.alt}
                fill
                sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="relative min-h-[12.625rem] overflow-hidden p-6">
              <Image
                src="/assets/textures/journalcard.webp"
                alt=""
                aria-hidden="true"
                fill
                unoptimized
                sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 90vw"
                className="pointer-events-none object-fill"
              />
              <div className="relative z-10">
                <p className="truncate font-display text-sm text-laterite">
                  {article.category}
                </p>
                <h2 className="mt-5 line-clamp-3 break-words font-display text-xl leading-tight">
                  {article.title}
                </h2>
                <p className="mt-4 line-clamp-3 break-words font-display text-sm leading-relaxed text-[#575757]">
                  {article.excerpt}
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
