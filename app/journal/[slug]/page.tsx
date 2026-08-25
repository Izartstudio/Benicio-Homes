import type { Metadata } from "next";
import { OptimizedImage as Image } from "@/components/ui/optimized-image";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/contact/contact-section";
import { Footer } from "@/components/footer/footer";
import { JournalBody } from "@/components/journal/journal-body";
import { JournalTableOfContents } from "@/components/journal/journal-table-of-contents";
import { Reveal } from "@/components/ui/reveal";
import { getCdnAsset } from "@/lib/getCdnAsset";
import { getJournalPost } from "@/sanity/lib/journal";
import type { CSSProperties } from "react";
import { getJournalHeadingId } from "@/utils/journal-heading";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getJournalPost(slug);
  return post
    ? { title: `${post.title} | The Journal`, description: post.excerpt }
    : { title: "Journal article not found" };
}

export default async function JournalDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getJournalPost(slug);
  if (!post) notFound();

  const headings = post.body
    .filter((block) => block._type === "block" && block.style === "h2")
    .map((block) => block._type === "block" ? block.children?.map((child) => child.text).join("") ?? "" : "")
    .filter(Boolean)
    .map((label, index) => ({ id: getJournalHeadingId(label, index), label }));
  const published = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit", month: "long", year: "numeric",
  }).format(new Date(post.publishedAt));
  const journalTexture = getCdnAsset("https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Journal/textureblogposts.webp");
  const textureStyle = {
    "--journal-detail-hero-texture": journalTexture
      ? `url("${journalTexture}")`
      : "none",
    "--journal-texture": journalTexture ? `url("${journalTexture}")` : "none",
  } as CSSProperties;

  return (
    <main className="bg-[#b9b9b9] text-[#343434]" data-journal-detail style={textureStyle}>
      <section className="journal-detail-stage relative h-[64rem] overflow-hidden bg-[#b9b9b9]">
      <header className="journal-detail-masthead absolute inset-x-0 top-0 grid h-[34.375rem] items-center gap-14 px-[5.208vw] pb-36 pt-18 text-[#d8d6cf] lg:grid-cols-[1fr_30rem]">
        <Reveal as="h3" revealMode="mount" className="max-w-[32rem] break-words font-Bahnschrift text-[clamp(2.8rem,5vw,2rem)] font-light leading-[1.03]">
          {post.title}
        </Reveal>
        <Reveal revealMode="mount" delay={0.08} className="self-center font-Bahnschrift text-[0.8rem]">
          <p className="border-b border-[#dc4c28] pb-3 font-semibold uppercase text-[#dc4c28]">{post.category}</p>
          <dl className="divide-y divide-white/20 text-[#d8d6cf]">
            <div className="flex justify-between py-3"><dt>Published</dt><dd>{published}</dd></div>
            <div className="flex justify-between py-3"><dt>Author</dt><dd>{post.author}</dd></div>
            <div className="flex justify-between py-3"><dt>Journal</dt><dd>{post.number.replace("Journal ", "")}</dd></div>
          </dl>
        </Reveal>
      </header>

        <div className="journal-detail-image-frame absolute inset-x-0 flex justify-center">
          <Reveal as="figure" className="journal-detail-hero relative overflow-hidden bg-[#aaa]" revealMode="mount">
            <Image alt={post.image.alt} className="object-cover" fill preload sizes="(min-width: 1280px) 74.375rem, calc(100vw - 2rem)" src={post.image.src} />
          </Reveal>
        </div>
      </section>

      <section className="journal-article-paper px-[5.208vw] pb-36 pt-20 lg:pb-48 lg:pt-28">
        <div className="relative z-10 mx-auto grid max-w-[81rem] gap-16 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-20">
          <aside className="hidden self-start lg:sticky lg:top-32 lg:block">
            <div className="flex items-center gap-3 font-serif text-[0.78rem] font-semibold uppercase text-[#dc4c28]"><span>Table of contents</span><span className="h-px flex-1 bg-[#dc4c28]" /></div>
            <JournalTableOfContents headings={headings} />
          </aside>
          <JournalBody body={post.body} />
        </div>
      </section>
      <ContactSection />
      <Footer />
    </main>
  );
}
