import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import type { JournalPost } from "@/sanity/journal/types";
import { getJournalHeadingId } from "@/utils/journal-heading";

function textOf(block: Extract<JournalPost["body"][number], { _type: "block" }>) {
  return block.children?.map((child) => child.text).join("") ?? "";
}

export function JournalBody({ body }: { body: JournalPost["body"] }) {
  const headingIds = new Map(
    body
      .filter(
        (block) => block._type === "block" && block.style === "h2",
      )
      .map((block, index) => [
        block._key,
        getJournalHeadingId(block._type === "block" ? textOf(block) : "", index),
      ]),
  );

  return (
    <div className="journal-body min-w-0">
      {body.map((block) => {
        if (block._type === "image") {
          return (
            <Reveal as="figure" className="my-16" key={block._key}>
              <div className="relative aspect-[16/10] overflow-hidden bg-[#c8c8c8]">
                <Image alt={block.alt ?? ""} className="object-cover" fill sizes="(min-width: 1024px) 60vw, 90vw" src={block.imageUrl} />
              </div>
              {block.caption ? <figcaption className="mt-3 text-xs text-[#696969]">{block.caption}</figcaption> : null}
            </Reveal>
          );
        }

        const text = textOf(block);
        if (!text) return null;
        if (block.style === "h2") {
          const id = headingIds.get(block._key);
          return <Reveal as="h2" className="scroll-mt-32 mb-7 mt-20 font-serif text-[clamp(1.7rem,2.2vw,2.25rem)] font-semibold leading-tight" id={id} key={block._key}>{text}</Reveal>;
        }
        if (block.style === "h3") return <Reveal as="h3" className="mb-5 mt-12 font-serif text-[1.35rem] font-semibold" key={block._key}>{text}</Reveal>;
        if (block.style === "blockquote") return <Reveal as="blockquote" className="my-8 border-l-2 border-[#dc4c28] pl-5 font-display text-[1.05rem] font-medium leading-[1.5]" key={block._key}>{text}</Reveal>;
        return <Reveal as="p" className="mb-7 break-words font-display text-[0.95rem] font-light leading-[1.55] text-[#575757]" key={block._key}>{text}</Reveal>;
      })}
    </div>
  );
}
