import { ContactForm } from "@/components/contact/contact-form";
import { ContactTextureSurface } from "@/components/ui/contact-texture-surface";
import { OptimizedImage } from "@/components/ui/optimized-image";
import styles from "./contact-section.module.css";

const defaultHeading = "Begin The Conversation.";
const defaultCopy =
  "Whether you're exploring a Benicio residence, considering a restoration opportunity, or simply want to understand our philosophy, we'd be pleased to hear from you. Every meaningful project begins with a conversation.";

type ContactSectionProps = {
  heading?: string;
  copy?: string;
};

export function ContactSection({
  heading = defaultHeading,
  copy = defaultCopy,
}: ContactSectionProps) {
  return (
    <section
      aria-labelledby="contact-section-heading"
      className={`relative isolate h-[63.75rem] overflow-hidden bg-[#b9b9b9] text-[#232323] ${styles.section}`}
      data-section="contact"
      id="contact"
    >
      <ContactTextureSurface data-contact-background />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,#b9b9b9_0%,#b9b9b9_45%,rgba(185,185,185,0.88)_52%,rgba(185,185,185,0.45)_63%,rgba(185,185,185,0)_75%)]"
        data-contact-background-wash
      />

      <div
        className={`relative z-10 grid h-full grid-cols-[minmax(0,1fr)_37.9375rem] gap-[clamp(4rem,6vw,5.75rem)] px-[5.208vw] pb-[8rem] pt-[6.25rem] ${styles.container}`}
        data-contact-container
      >
        <div className={styles.leftColumn} data-contact-left-column>
          <div data-contact-intro-static>
            <div
              className={`max-w-[39rem] ${styles.copyBlock}`}
              data-contact-copy-block
            >
              <h2
                className={`font-display text-[2.5rem] font-[350] leading-normal tracking-[0.01em] lg:text-[40px] ${styles.heading}`}
                id="contact-section-heading"
              >
                {heading}
              </h2>
              <p
                className="mt-[clamp(2rem,3vw,2.75rem)] font-display text-[1rem] font-light leading-[135%] tracking-[0.01em]"
                id="contact-section-copy"
              >
                {copy}
              </p>
            </div>
          </div>
        </div>

        <div data-contact-form-static>
          <div
            className={`relative h-[49.5rem] w-[37.9375rem] overflow-hidden bg-[#fafafa] ${styles.card}`}
            data-contact-card
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 select-none bg-cover bg-center opacity-50 mix-blend-multiply"
              data-contact-card-texture
            >
              <OptimizedImage
                alt=""
                className="object-cover object-center"
                fill
                quality={75}
                sizes="(max-width: 767px) 100vw, 38rem"
                src="/assets/textures/formbgtexture.webp"
              />
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
