import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/ui/reveal";

export function ContactSection() {
  return (
    <section
      aria-labelledby="contact-section-copy"
      className="relative isolate h-[55.9375rem] overflow-hidden bg-[linear-gradient(#B9B9B9),linear-gradient(#B9B9B9),linear-gradient(180deg,#d7d0c2,#9b6f52)] text-[#232323]"
      data-section="contact"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-cover bg-center opacity-35 mix-blend-multiply"
        data-contact-background
        style={{
          backgroundImage: 'url("/assets/textures/contact-texture.svg")',
        }}
      />

      <div
        className="relative z-10 grid h-full grid-cols-[minmax(0,1fr)_37.9375rem] gap-[clamp(4rem,6vw,5.75rem)] px-[5.208vw] pt-[6.25rem]"
        data-contact-container
      >
        <div data-contact-left-column>
          <Reveal revealId="contact-intro">
            <p
              className="max-w-[39rem] font-display text-[clamp(1.875rem,2.25vw,2rem)] font-normal leading-[1.35] tracking-[0.01em]"
              id="contact-section-copy"
            >
              Whether you&apos;re looking for a thoughtfully designed home,
              exploring a restoration opportunity, or simply want to learn more
              about Benicio, we&apos;d be glad to hear from you.
            </p>
          </Reveal>
        </div>

        <Reveal revealId="contact-form">
          <div
            className="relative h-[43.4375rem] w-[37.9375rem] overflow-hidden  bg-[#fafafa]"
            data-contact-card
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 z-0 bg-cover bg-center opacity-50 mix-blend-multiply"
              data-contact-card-texture
              style={{
                backgroundImage: 'url("/assets/textures/formbgtexture.svg")',
              }}
            />
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
