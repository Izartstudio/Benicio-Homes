import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export function ClosingSection() {
  return (
    <section id="enquire" className="bg-charcoal py-section-y text-bone">
      <Container>
        <div className="max-w-5xl">
          <p className="mb-6 text-kicker font-bold uppercase tracking-[0.24em] text-brass">
            Private appointments
          </p>
          <h2 className="font-display text-display font-semibold text-balance">
            A composed foundation for a cinematic real estate launch.
          </h2>
          <p className="mt-8 max-w-2xl text-body-large text-bone/70">
            The next phase can layer in imagery, GSAP timelines, Lenis smooth
            scrolling, and route-level storytelling while preserving this
            section structure.
          </p>
          <ButtonLink href="mailto:hello@example.com" variant="light" className="mt-10">
            Request brochure
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
