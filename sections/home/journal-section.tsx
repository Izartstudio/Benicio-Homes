"use client";

import responsiveStyles from "./journal-section.responsive.module.css";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CTA } from "@/components/ui/cta";
import { DifferenceText } from "@/components/ui/difference-text";
import { fallbackJournalArticles } from "@/sanity/journal/fallback";
import type { JournalArticle } from "@/sanity/journal/types";
import { OrangeBlock } from "@/components/ui/orange-block";

gsap.registerPlugin(ScrollTrigger);

type JournalSectionProps = {
  articles?: readonly JournalArticle[];
};

export function JournalSection({
  articles = fallbackJournalArticles,
}: JournalSectionProps) {
  const visibleJournalArticles = [...articles, ...articles];
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const navigateJournal = (direction: -1 | 1) => {
    const trigger = scrollTriggerRef.current;
    if (!trigger) return;

    const section = trigger.trigger as HTMLElement;
    const viewport = section.querySelector<HTMLElement>("[data-journal-viewport]");
    const track = section.querySelector<HTMLElement>("[data-journal-track]");
    if (!viewport || !track) return;

    const distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
    if (distance <= 1) return;

    const firstCard = track.querySelector<HTMLElement>("[data-journal-card]");
    const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
    const step = Math.min(1, ((firstCard?.offsetWidth ?? viewport.clientWidth) + gap) / distance);
    const progress = Math.min(1, Math.max(0, trigger.progress + direction * step));
    window.scrollTo({
      top: trigger.start + (trigger.end - trigger.start) * progress,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      return;
    }

    const section = document.querySelector<HTMLElement>(
      '[data-section="journal"]',
    );
    const viewport = section?.querySelector<HTMLElement>(
      "[data-journal-viewport]",
    );
    const track = section?.querySelector<HTMLElement>("[data-journal-track]");

    if (!section || !viewport || !track) {
      return;
    }

    const ctx = gsap.context(() => {
      const getScrollDistance = () =>
        Math.max(0, track.scrollWidth - viewport.clientWidth);

      if (getScrollDistance() <= 1) {
        return;
      }

      gsap.set(track, { x: 0, force3D: true });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 0.25,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
      });
      scrollTriggerRef.current = timeline.scrollTrigger ?? null;
    }, section);

    return () => {
      scrollTriggerRef.current = null;
      ctx.revert();
    };
  }, []);

  return (
    <section
      aria-labelledby="journal-section-title"
      className={`relative isolate overflow-hidden bg-[#b9b9b9] text-[#232323] ${responsiveStyles.responsiveRoot}`}
      data-section="journal"
      id="journal"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[calc(clamp(4.75rem,5.85vw,5.25rem)+39.75rem)] overflow-hidden bg-[#FAFAFA]"
        data-journal-restoration-texture
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-multiply"
          data-journal-restoration-texture-image
          style={{
            backgroundImage: 'url("/assets/textures/heritage-texture.webp")',
          }}
        />
      </div>

      <div
        aria-hidden="true"
        data-journal-contact-transition
      />

      <div
        className="relative z-10 grid min-h-[50rem] grid-cols-[clamp(22rem,27.777vw,25rem)_minmax(0,1fr)] gap-[clamp(0.9rem,1.1vw,1rem)] py-[clamp(4.75rem,5.85vw,5.25rem)]"
        data-journal-foreground
      >
        <aside
          className="flex h-[39.75rem] flex-col bg-[#b9b9b9] px-[clamp(2.5rem,4vw,4rem)] py-[clamp(3.5rem,5vw,4rem)]"
          data-journal-static-panel
        >
          <div className={responsiveStyles.intro}>
            <h2
              id="journal-section-title"
              className="relative z-10 whitespace-pre-line font-display text-[clamp(1.875rem,2.35vw,32px)] font-[350] leading-normal tracking-[0.01em] lg:text-[32px]"
              data-journal-heading
            >
              {"Notes\nfrom Goa"}
            </h2>
            <p
              className="mt-[clamp(1.75rem,2.2vw,2rem)] max-w-[18.75rem] font-display text-[clamp(0.95rem,1.1vw,16px)] font-light leading-[135%]"
              data-journal-description
            >
              Our journal documents the people, places, and architectural ideas
              that inspire every Benicio project. From tropical living to
              heritage restoration, these are the stories behind the homes we
              create.
            </p>
            <CTA
              arrowClassName="translate-y-[0.1rem] text-lg"
              className="mt-[1.25rem] inline-flex h-[3.125rem] min-h-0 w-[11rem] items-center justify-between rounded-none border-0 px-3 py-0 font-display text-[0.95rem] font-normal normal-case tracking-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#464646]"
              darkBackground="#464646"
              data-journal-intro-cta
              href="/journal"
              variant="dark"
            >
              View all blogs
            </CTA>
          </div>

          <OrangeBlock
            className="mt-[clamp(3.5rem,5vw,4.75rem)] self-start"
            data-journal-accent
          />

          <div
            className="mt-auto flex items-center gap-[1.75rem] text-[2rem] leading-none"
            data-journal-navigation
          >
            <button
              aria-label="Previous journal articles"
              className="grid size-8 place-items-center"
              onClick={() => navigateJournal(-1)}
              type="button"
            >
              <span aria-hidden="true">&lsaquo;</span>
            </button>
            <button
              aria-label="Next journal articles"
              className="grid size-8 place-items-center"
              onClick={() => navigateJournal(1)}
              type="button"
            >
              <span aria-hidden="true">&rsaquo;</span>
            </button>
          </div>
        </aside>

        <div
          className="overflow-x-auto overflow-y-hidden"
          data-journal-viewport
        >
          <div
            className="flex w-max gap-[clamp(0.55rem,0.7vw,0.625rem)]"
            data-journal-track
          >
            {visibleJournalArticles.map((article, index) => (
              <article
                className={`min-w-[18rem] w-[calc((100vw-clamp(22rem,27.777vw,25rem)-clamp(0.9rem,1.1vw,1rem)-clamp(0.55rem,0.7vw,0.625rem)-clamp(0.55rem,0.7vw,0.625rem))/3)] shrink-0 ${
                  index >= articles.length
                    ? responsiveStyles.duplicateCard
                    : ""
                }`}
                data-journal-card
                key={`${article.slug}-${index}`}
              >
                <figure
                  className="relative h-[clamp(24rem,30vw,27rem)] w-full overflow-hidden"
                  data-journal-image
                >
                  <Image
                    src={article.image.src}
                    alt={article.image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 90vw"
                    className="object-cover"
                  />
                </figure>

                <div
                  className="relative flex h-[12.75rem] min-w-0 flex-col overflow-hidden px-[clamp(1.25rem,1.6vw,1.375rem)] py-[1.35rem]"
                  data-journal-info
                >
                  <Image
                    src="/assets/textures/journalcard.webp"
                    alt=""
                    aria-hidden="true"
                    fill
                    draggable={false}
                    unoptimized
                    sizes="(min-width: 1024px) 25vw, 78vw"
                    className="pointer-events-none select-none object-fill [-webkit-user-drag:none]"
                    data-journal-card-surface
                  />

                  <div className="relative z-10 flex min-w-0 items-center gap-[clamp(1rem,1.4vw,1.25rem)]">
                    <p className="shrink-0 font-display text-[0.9375rem] leading-none text-laterite">
                      {article.number}
                    </p>
                    <div
                      aria-hidden="true"
                      className="h-px flex-1 bg-laterite"
                      data-journal-accent-divider
                    />
                  </div>

                  <DifferenceText
                    as="h3"
                    className="relative z-10 mt-[1.45rem] line-clamp-3 max-w-[17rem] overflow-hidden break-words font-display text-[clamp(1.05rem,1.32vw,1.1875rem)] font-normal leading-[1.2]"
                    title={article.title}
                  >
                    {article.title}
                  </DifferenceText>

                  <div
                    className="relative z-10 mt-auto flex min-w-0 items-center gap-[0.875rem] font-display text-[0.875rem] text-[#575757]"
                    data-journal-author
                  >
                    <span
                      aria-hidden="true"
                      className="h-[1rem] w-px bg-[#232323]"
                    />
                    <p
                      className="min-w-0 truncate"
                      title={article.author}
                    >
                      {article.author}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div aria-label="Journal call to action" data-journal-mobile-footer>
          <CTA
            arrowClassName="text-[1.125rem] leading-none"
            darkBackground="#464646"
            data-journal-mobile-cta
            href="/journal"
            variant="dark"
          >
            View All Blogs
          </CTA>
          <span aria-hidden="true" data-journal-mobile-divider />
          <OrangeBlock data-journal-mobile-marker />
        </div>
      </div>
    </section>
  );
}
