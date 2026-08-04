import { Reveal } from "@/components/ui/reveal";
import { DifferenceText } from "@/components/ui/difference-text";
import responsiveStyles from "./project-specifications-section.responsive.module.css";
import type { CSSProperties } from "react";
import { PDP_MEDIA_URLS } from "./pdp-texture";

type ProjectSpecificationGroup = {
  items: readonly string[];
  title: string;
};

export type ProjectSpecificationsSectionProps = {
  groups: readonly ProjectSpecificationGroup[];
};

export function ProjectSpecificationsSection({
  groups,
}: ProjectSpecificationsSectionProps) {
  return (
    <section
      aria-label="Project specifications"
      className={`relative isolate overflow-hidden bg-[#343434] text-bone ${responsiveStyles.responsiveRoot}`}
      data-project-specifications-section
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[#343434] bg-cover bg-center bg-blend-overlay"
        data-project-specifications-background-texture
        style={{ backgroundImage: `url('${PDP_MEDIA_URLS.concreteTexture}')` }}
      />

      <div
        className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-[4.5rem] px-[clamp(1.5rem,5.208vw,4.6875rem)] py-[clamp(5rem,5.833vw,5.25rem)] lg:grid-cols-[minmax(0,28.125rem)_minmax(0,31.4375rem)] lg:justify-between lg:gap-0"
        data-project-specifications-container
      >
        <div
          className="grid gap-[3.75rem] lg:gap-0"
          data-project-specifications-left-column
        >
          {groups.map((group, groupIndex) => (
            <section
              aria-label={`${group.title} specifications`}
              className={`overflow-hidden lg:min-h-[12.5625rem] lg:last:min-h-0 ${responsiveStyles.specificationGroup}`}
              data-project-specification-group
              key={group.title}
              style={
                {
                  "--specification-order": groupIndex * 2 + 2,
                } as CSSProperties
              }
            >
              <Reveal
                delay={0.14}
                duration={0.82}
                fade={false}
                revealId={`project-specification-group-${groupIndex + 1}`}
                start="top 80%"
                triggerClosest="[data-project-specification-group]"
                y={18}
              >
                <ul className="m-0 list-none p-0">
                  {group.items.map((item, itemIndex) => (
                    <li
                      className="font-serif text-[0.9375rem] font-normal leading-none text-bone"
                      data-project-specification-item
                      key={item}
                    >
                      <span>{item}</span>
                      {itemIndex < group.items.length - 1 ? (
                        <span
                          aria-hidden="true"
                          className="my-[0.625rem] block h-px w-full bg-white/30"
                          data-project-specification-divider
                        />
                      ) : null}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>
          ))}
        </div>

        <div
          className="grid gap-[3.75rem] lg:gap-0"
          data-project-specifications-right-column
        >
          {groups.map((group, groupIndex) => (
            <div
              className={`overflow-hidden lg:min-h-[12.5625rem] lg:last:min-h-0 ${responsiveStyles.categoryHeading} ${
                groupIndex === 0 ? responsiveStyles.firstCategory : ""
              }`}
              data-project-specification-category-heading
              key={group.title}
              style={
                {
                  "--specification-order": groupIndex * 2 + 1,
                } as CSSProperties
              }
            >
              <Reveal
                className="flex items-start gap-[1.125rem] pt-px"
                duration={0.82}
                fade={false}
                revealId={`project-specification-category-${groupIndex + 1}`}
                start="top 80%"
                triggerClosest="[data-project-specification-category-heading]"
                y={18}
              >
                <span
                  aria-hidden="true"
                  className="mt-[-0.0625rem] block size-[0.625rem] shrink-0 bg-cover bg-center"
                  data-project-specification-category-accent
                  style={{ backgroundImage: `url('${PDP_MEDIA_URLS.orangeBlock}')` }}
                />
                <DifferenceText
                  as="h2"
                  className="relative z-10 shrink-0 font-display text-[0.875rem] font-normal uppercase leading-none"
                >
                  {group.title}
                </DifferenceText>
                <span
                  aria-hidden="true"
                  className="mt-[0.25rem] h-px min-w-0 flex-1 bg-[#838383]"
                  data-project-specification-category-divider
                />
              </Reveal>
            </div>
          ))}
        </div>
      </div>

      <div
        className="relative z-10 hidden px-[1.5rem] py-[4.5rem]"
        data-project-specifications-mobile-accordion
      >
        {groups.map((group, groupIndex) => (
          <details
            className="group border-b border-bone/30"
            data-project-specification-mobile-group
            key={group.title}
            open={groupIndex === 0}
          >
            <summary className="flex min-w-0 cursor-pointer list-none items-center gap-[1.125rem] py-[1.25rem] [&::-webkit-details-marker]:hidden">
              <span
                aria-hidden="true"
                className="block size-[0.625rem] shrink-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${PDP_MEDIA_URLS.orangeBlock}')` }}
              />
              <DifferenceText
                as="h2"
                className="min-w-0 font-display text-[0.875rem] font-normal uppercase leading-none"
              >
                {group.title}
              </DifferenceText>
              
              <span
                aria-hidden="true"
                className="relative ml-auto block size-3 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:-translate-y-1/2 before:bg-bone after:absolute after:left-1/2 after:top-0 after:h-full after:w-px after:-translate-x-1/2 after:bg-bone group-open:after:hidden"
              />
            </summary>
            <ul className="m-0 list-none pb-[1.25rem] pl-[1.75rem] pr-0">
              {group.items.map((item, itemIndex) => (
                <li
                  className="font-serif text-[0.9375rem] font-normal leading-[1.25] text-bone"
                  key={item}
                >
                  <span>{item}</span>
                  {itemIndex < group.items.length - 1 ? (
                    <span aria-hidden="true" className="my-[0.625rem] block h-px w-full bg-white/30" />
                  ) : null}
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}
