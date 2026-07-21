"use client";

import Image from "next/image";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const journalArticles = [
  {
    number: "Journal 003",
    title: "Preserving Goa's Architectural Heritage",
    author: "Author Name",
    image: {
      src: "/assets/legacy/legacy-1.svg",
      alt: "Concrete room opening into tropical landscape",
    },
  },
  {
    number: "Journal 002",
    title: "Why Climate Shapes Every Benicio Home",
    author: "Author Name",
    image: {
      src: "/assets/legacy/legacy-2.svg",
      alt: "Architectural stair and planted courtyard",
    },
  },
  {
    number: "Journal 001",
    title: "The Enduring Beauty of Laterite",
    author: "Author Name",
    image: {
      src: "/assets/legacy/legacy-3.svg",
      alt: "Laterite detail with an orange square insert",
    },
  },
] as const;

const visibleJournalArticles = [...journalArticles, ...journalArticles] as const;

export function JournalSection() {
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
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
      });
    }, section);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      aria-labelledby="journal-section-title"
      className="relative isolate overflow-hidden bg-[#949494] text-[#232323]"
      data-section="journal"
      id="journal"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-cover bg-center opacity-100 mix-blend-multiply"
        data-journal-background
        style={{
          backgroundImage: 'url("/assets/textures/NotesSection-texture.svg")',
        }}
      />

      <div
        className="relative z-10 grid min-h-[50rem] grid-cols-[clamp(22rem,27.777vw,25rem)_minmax(0,1fr)] gap-[clamp(0.9rem,1.1vw,1rem)] py-[clamp(4.75rem,5.85vw,5.25rem)]"
        data-journal-foreground
      >
        <aside
          className="flex h-[39.75rem] flex-col bg-[#949494] px-[clamp(2.5rem,4vw,4rem)] py-[clamp(3.5rem,5vw,4rem)]"
          data-journal-static-panel
        >
          <div>
            <h2
              id="journal-section-title"
              className="whitespace-pre-line font-display text-[clamp(1.875rem,2.35vw,2.125rem)] font-normal leading-[1.16] tracking-[0.01em]"
              data-journal-heading
            >
              {"Notes\nfrom Goa"}
            </h2>
            <p className="mt-[clamp(1.75rem,2.2vw,2rem)] max-w-[18.75rem] font-display text-[clamp(0.95rem,1.1vw,1rem)] leading-[1.36]">
              Our journal documents the people, places, and architectural ideas
              that inspire every Benicio project. From tropical living to
              heritage restoration, these are the stories behind the homes we
              create.
            </p>
          </div>

          <div
            aria-hidden="true"
            className="mt-[clamp(9rem,15vw,11rem)] size-[clamp(18px,1.65vw,22px)] bg-[#be5b3f]"
            data-journal-accent
          />

          <div
            className="mt-auto flex items-center gap-[1.75rem] text-[2rem] leading-none"
            data-journal-navigation
          >
            <button
              aria-label="Previous journal articles"
              className="grid size-8 place-items-center"
              type="button"
            >
              <span aria-hidden="true">&lsaquo;</span>
            </button>
            <button
              aria-label="Next journal articles"
              className="grid size-8 place-items-center"
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
                className="w-[calc((100vw-clamp(22rem,27.777vw,25rem)-clamp(0.9rem,1.1vw,1rem)-clamp(0.55rem,0.7vw,0.625rem)-clamp(0.55rem,0.7vw,0.625rem))/3)] min-w-[18rem] shrink-0 bg-[#e3e3df]"
                data-journal-card
                key={`${article.number}-${index}`}
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
                  className="flex h-[12.75rem] flex-col px-[clamp(1.25rem,1.6vw,1.375rem)] py-[1.35rem]"
                  data-journal-info
                >
                  <div className="flex items-center gap-[clamp(1rem,1.4vw,1.25rem)]">
                    <p className="shrink-0 font-display text-[0.9375rem] leading-none text-laterite">
                      {article.number}
                    </p>
                    <div
                      aria-hidden="true"
                      className="h-px flex-1 bg-laterite"
                      data-journal-accent-divider
                    />
                  </div>

                  <h3 className="mt-[1.45rem] max-w-[17rem] font-display text-[clamp(1.05rem,1.32vw,1.1875rem)] font-normal leading-[1.2]">
                    {article.title}
                  </h3>

                  <div
                    className="mt-auto flex items-center gap-[0.875rem] font-display text-[0.875rem] text-[#575757]"
                    data-journal-author
                  >
                    <span
                      aria-hidden="true"
                      className="h-[1rem] w-px bg-[#232323]"
                    />
                    <p>{article.author}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
