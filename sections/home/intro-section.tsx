import { Container } from "@/components/ui/container";

export function IntroSection() {
  return (
    <section className="bg-bone py-section-y" aria-label="Design philosophy">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1fr] lg:items-start">
          <p className="text-kicker font-bold uppercase tracking-[0.24em] text-clay">
            Architecture as atmosphere
          </p>
          <div>
            <p className="max-w-5xl font-display text-title font-semibold leading-none text-balance">
              Every threshold is composed to slow the pace: stone underfoot,
              garden air, long shadows, and rooms that open with restraint.
            </p>
            <p className="mt-8 max-w-2xl text-base leading-8 text-ink/68">
              The site architecture mirrors that rhythm. Each homepage block is
              isolated, semantic, and ready to receive scroll-driven timelines
              later without rewriting the content structure.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
