"use client";

import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { useState, type PointerEvent as ReactPointerEvent } from "react";
import { Reveal } from "@/components/ui/reveal";
import { CdnImage } from "@/components/ui/cdn-image";
import {
  ProjectStatusTag,
  type ProjectStatus,
} from "@/components/journal/project-status-tag";

const PAGE_SIZE = 4;

export type EditorialListingItem = {
  author: string;
  description?: string;
  href: string;
  image: { alt: string; src: ImageProps["src"] };
  number: string;
  specifications?: Array<{ label: string; value: string }>;
  status?: ProjectStatus;
  title: string;
};

type JournalGridProps = {
  articles: EditorialListingItem[];
  emptyMessage?: string;
  loadMoreLabel?: string;
  variant?: "journal" | "projects";
};

export function JournalGrid({
  articles,
  emptyMessage = "New stories are coming soon.",
  loadMoreLabel = "Load More Blogs",
  variant = "journal",
}: JournalGridProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [cursor, setCursor] = useState({ visible: false, x: 0, y: 0 });
  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  const updateCursor = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== "mouse") return;
    setCursor({ visible: true, x: event.clientX, y: event.clientY });
  };

  const hideCursor = () => {
    setCursor((current) => ({ ...current, visible: false }));
  };

  if (!articles.length) {
    return <p className="py-28 text-center font-display">{emptyMessage}</p>;
  }

  return (
    <>
      <div className={`journal-grid mx-auto grid max-w-[81rem] md:grid-cols-2 ${variant === "projects" ? "project-listing-grid" : ""}`}>
        {visibleArticles.map((article, index) => (
          <Reveal as="article" className="min-w-0" delay={(index % 2) * 0.06} key={article.href}>
            {variant === "projects" ? (
              <Link className="listing-card-hover project-listing-card group block overflow-hidden" href={article.href} onPointerEnter={updateCursor} onPointerLeave={hideCursor} onPointerMove={updateCursor}>
                <span className="project-listing-image relative block h-[31.25rem] w-full overflow-hidden">
                  <CdnImage
                    alt={article.image.alt}
                    className="object-cover transition-[filter] duration-300 min-[1200px]:group-hover:blur-[5px]"
                    fill
                    sizes="(min-width: 768px) 44vw, calc(100vw - 3rem)"
                    src={article.image.src}
                  />
                  {article.status ? (
                    <span className="absolute right-5 top-5 z-20">
                      <ProjectStatusTag status={article.status} />
                    </span>
                  ) : null}
                </span>
                <span className="project-listing-copy grid h-[15.25rem] grid-cols-[minmax(0,1fr)_minmax(13rem,1fr)] gap-10 bg-[rgb(185_185_185_/_0.25)] bg-[image:var(--editorial-card-texture)] bg-[length:100%_100%] bg-center bg-no-repeat bg-blend-overlay px-9 py-10 text-[var(--editorial-card-title-color)]">
                  <span className="min-w-0">
                    <span className="project-listing-title block break-words font-display text-[clamp(1.5rem,2vw,2rem)] font-medium uppercase leading-tight">
                      {article.title}
                    </span>
                    {article.description ? (
                      <span className="mt-6 line-clamp-4 block font-serif text-sm leading-[1.4]">
                        {article.description}
                      </span>
                    ) : null}
                  </span>
                  <span className="block self-start font-display text-xs">
                    {article.specifications?.map((specification) => (
                      <span className="flex min-h-10 items-center justify-between gap-4 border-b border-current/35 last:border-b-0" key={specification.label}>
                        <span className="opacity-55">{specification.label}</span>
                        <span className="text-right font-medium">{specification.value}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </Link>
            ) : (
            <Link className="listing-card-hover journal-card group block border border-white/15 p-[3.125rem_4.25rem_3.125rem_3.875rem]" href={article.href} onPointerEnter={updateCursor} onPointerLeave={hideCursor} onPointerMove={updateCursor}>
              
              <span className="journal-card-content block overflow-hidden">
          
                <span className="journal-card-copy block h-[15.1875rem] px-2 pt-[1.875rem]">
                <span className="flex items-center gap-3 font-serif text-[0.78rem] text-[var(--editorial-accent-color)]">
                  <span className="whitespace-nowrap">{article.number}</span>
                  <span className="h-px flex-1 bg-[var(--editorial-accent-color)]" />
                </span>
                <span className="mt-5 line-clamp-3 block break-words font-serif text-[clamp(1.35rem,1.8vw,1.75rem)] leading-[1.15] text-[var(--editorial-card-title-color)]">
                  {article.title}
                </span>
                <span className="mt-7 flex items-center gap-3 font-display text-[0.75rem] text-[var(--editorial-card-author-color)]">
                  <span className="h-4 w-px bg-[var(--editorial-card-author-color)]" /> {article.author}
                </span>
                </span>
                    <span className="journal-card-image relative block h-[28.125rem] w-full overflow-hidden">
                  <CdnImage
                    alt={article.image.alt}
                    className="object-cover transition-[filter] duration-300 min-[1200px]:group-hover:blur-[5px]"
                    fill
                    sizes="(min-width: 768px) 32.1875rem, calc(100vw - 5rem)"
                    src={article.image.src}
                  />
                </span>
              </span>
              
            </Link>
            )}
          </Reveal>
        ))}
      </div>
      <button
          className="mx-auto mt-20 flex h-[3.125rem] min-w-[12.5rem] items-center justify-between bg-[var(--editorial-cta-background)] px-5 font-display text-sm text-[var(--editorial-cta-text)] disabled:cursor-default disabled:opacity-60"
          disabled={!hasMore}
          onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
          type="button"
        >
          {loadMoreLabel} <span aria-hidden="true">⌄</span>
      </button>
      <span
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[200] hidden min-[1200px]:block ${cursor.visible ? "opacity-100" : "opacity-0"}`}
        style={{ transform: `translate3d(${cursor.x + 18}px, ${cursor.y - 25}px, 0)` }}
      >
        {variant === "journal" ? (
          <span className="flex h-[3.125rem] w-[11rem] items-center justify-between border border-[#696969] bg-[#232323] px-3 font-display text-[0.75rem] uppercase text-white">
            <span>Read Blog</span>
            <span aria-hidden="true">›</span>
          </span>
        ) : (
          <Image alt="" height={50} src="/assets/cursors/listing-card-cta.svg" unoptimized width={176} />
        )}
      </span>
    </>
  );
}
