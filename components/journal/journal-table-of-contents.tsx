"use client";

import { useEffect, useState } from "react";

type ContentsHeading = {
  id: string;
  label: string;
};

export function JournalTableOfContents({
  headings,
}: {
  headings: ContentsHeading[];
}) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    const elements = headings
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <ol className="mt-8 divide-y divide-black/10 font-display text-[0.78rem] text-[#696969]">
      {headings.map((heading) => {
        const isActive = heading.id === activeId;

        return (
          <li className="py-3" key={heading.id}>
            <a
              aria-current={isActive ? "location" : undefined}
              className={`block transition-[color,font-weight] duration-200 hover:text-[#343434] ${isActive ? "font-semibold text-[#343434]" : "font-normal"}`}
              href={`#${heading.id}`}
              onClick={() => setActiveId(heading.id)}
            >
              {heading.label}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
