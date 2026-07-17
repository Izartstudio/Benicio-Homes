import { Container } from "@/components/ui/container";

const frames = ["Arrival", "Residence", "Terrace", "Garden"];

export function GallerySection() {
  return (
    <section className="bg-bone py-section-y" aria-label="Visual story">
      <Container>
        <div className="grid gap-4 md:grid-cols-4">
          {frames.map((frame, index) => (
            <figure
              key={frame}
              className="aspect-[3/4] overflow-hidden rounded-panel border border-ink/12 bg-stone"
            >
              <div
                aria-hidden="true"
                className="h-full w-full bg-[linear-gradient(145deg,rgba(17,16,12,0.08),rgba(17,16,12,0.34)),linear-gradient(180deg,#d7d0c2,#9b6f52)]"
                style={{ opacity: 1 - index * 0.08 }}
              />
              <figcaption className="sr-only">{frame}</figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
