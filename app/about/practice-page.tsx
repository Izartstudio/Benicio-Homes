import Image from "next/image";
import Link from "next/link";
import { ArchitecturalStairs } from "@/components/ArchitecturalStairs";
import { Reveal } from "@/components/ui/reveal";
import { AboutPageAnimations } from "./about-page-animations";
import styles from "./practice-page.module.css";

const mediaPlaceholder = "/images/placeholders/responsive-media-fallback.webp";
const texturePlaceholder = "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/about/sketch.webp";
const founderimage = "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/about/founder-image.webp";
const horizontalbandimage = "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/about/horizontalbandleft.webp";
const horizontalBandRightImage = "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/about/horizontalbandright.webp";

const services = [
  {
    title: "Develop & Build Holiday Homes",
    copy: "From land to handover, we design and build homes that are rooted in Goa’s landscape and crafted for timeless living.",
  },
  {
    title: "Property Management",
    copy: "We care for every home long after completion, ensuring it remains maintained, secure, and ready whenever you arrive.",
  },
  {
    title: "Architectural Design & Development",
    copy: "Thoughtful planning, refined design, and meticulous execution come together to create homes that endure for generations.",
  },
] as const;

// CMS fallback data. The card dimensions are deliberately independent of copy
// length so future CMS entries cannot shift or break the six-card grid.
const sharedVision = [
  { role: "Head Of Marketing & Branding", name: "Priyanka Rohra", image: mediaPlaceholder },
  { role: "Head Of Finance", name: "Ms. Kaneez", image: texturePlaceholder },
  { role: "Head Of Admin", name: "Ms. Fatima", image: mediaPlaceholder },
  { role: "Site Supervisor", name: "Afzal Khan", image: texturePlaceholder },
  { role: "Head Of Legal Team", name: "Priyam Sheik", image: mediaPlaceholder },
  { role: "Designation", name: "Name", image: texturePlaceholder },
] as const;

function EditorialRule() {
  return (
    <span aria-hidden="true" className={styles.editorialRule} data-drawn-marker>
      <span data-marker-line />
      <span data-marker-block />
    </span>
  );
}

function SectionCrosshair({
  className,
  showMarker = false,
}: {
  className?: string;
  showMarker?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`${styles.sectionCrosshair} ${className ?? ""}`}
      data-section-crosshair
    >
      <i /><i /><i /><i /><i /><i />
      {showMarker ? <b data-crosshair-marker /> : null}
    </div>
  );
}

function HorizontalLinePair({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`${styles.horizontalLinePair} ${className ?? ""}`}
      data-horizontal-line-pair
    >
      <i /><i />
    </div>
  );
}

function TexturedOrangeBar() {
  return (
    <span aria-hidden="true" className={styles.texturedOrangeBar}>
      <Image src={horizontalbandimage} alt="" fill sizes="15.125rem" />
    </span>
  );
}

export function AboutPracticePage() {
  return (
    <div className={styles.page} data-about-practice-root>
      <AboutPageAnimations />
      <section
        aria-labelledby="practice-title"
        className={styles.hero}
        data-design-source="Hero Section.svg"
        data-section="practice-hero"
      >
        <div aria-hidden="true" className={styles.heroConcrete} />
        <div aria-hidden="true" className={styles.heroShadow} />
        <SectionCrosshair className={styles.heroCrosshair} showMarker />
        <Reveal className={styles.heroTitle} revealMode="manual">
          <h1 id="practice-title">Thoughtfully Designed,<br />Endlessly Lived</h1>
        </Reveal>
        <Reveal className={styles.heroLocation} revealMode="manual">
          <strong>GOA, IN</strong>
          <span>15.4909° N&nbsp;&nbsp;/&nbsp;&nbsp;73.8278° E</span>
        </Reveal>
        <Reveal className={styles.heroStatement} revealMode="manual">
          <p>Every Benicio home begins with an understanding of place. From heritage restorations to contemporary tropical villas, our work celebrates craftsmanship, climate, and a slower way of living.</p>
          <Link href="/projects">Explore Projects <span aria-hidden="true">›</span></Link>
        </Reveal>
      </section>

      <section
        aria-labelledby="respect-title"
        className={styles.respect}
        data-design-source="Section -2about.svg"
      >
        <div aria-hidden="true" className={styles.respectTexture} />
        <Reveal className={styles.respectHeading} revealMode="manual">
          <h2 id="respect-title">Every Home Begins With<br />Respect For Place</h2>
        </Reveal>
        <div className={styles.respectBand} data-respect-media-band>
          <figure className={styles.respectBandImage}>
            <Image src={horizontalbandimage} alt="Architecture in its landscape" fill sizes="(max-width: 767px) calc((100vw - 7.5rem) / 2), 37.8125rem" className={styles.cover} />
          </figure>
          <div className={styles.respectLogoBlock}>
            <Image src="/assets/NavBar/Logo-NavBar.svg" alt="Benicio" width={188} height={143} className={styles.respectLogo} style={{ height: "auto" }} />
          </div>
          <figure className={styles.respectBandImage}>
            <Image src={horizontalBandRightImage} alt="Goan landscape placeholder" fill sizes="(max-width: 767px) calc((100vw - 7.5rem) / 2), 37.8125rem" className={styles.cover} />
          </figure>
        </div>
        <Reveal className={styles.respectCopy} revealMode="manual">
          <TexturedOrangeBar />
          <p>We believe architecture should respond to its surroundings, not reshape them. Every choice, from orientation and materials to light, ventilation, and landscape, aims to create homes that feel effortless today and last for generations.</p>
        </Reveal>
      </section>

      <section
        aria-labelledby="manifesto-title"
        className={styles.manifesto}
        data-design-source="Section -3 about.svg"
      >
        <div aria-hidden="true" className={styles.manifestoTexture} />
        <SectionCrosshair className={styles.manifestoCrosshair} showMarker />
        <Reveal className={styles.manifestoCopy} revealMode="manual">
          <div className={styles.manifestoKicker}><span>Our Manifesto</span><i /></div>
          <h2 id="manifesto-title">We Build With A Deep<br />Respect For Place</h2>
          <p className={styles.manifestoLead}>Every project begins by understanding what already exists before imagining what comes next.</p>
          <p className={styles.manifestoBody}>Architecture is more than the act of building. It is the careful balance of land, climate, material, memory, and the lives that unfold within them. Whether restoring a century-old Goan home or crafting a contemporary tropical villa, our work is guided by the belief that every home should feel inevitable, as though it has always belonged there.</p>
          <div className={styles.manifestoLines}>
            <p>We Preserve What Deserves To Endure.<br />We Create What Deserves To Last.</p>
            <p>We Design For The Rhythm Of Everyday Living.<br />We Build For Generations Yet To Come.</p>
          </div>
        </Reveal>
        <Reveal as="figure" className={styles.founderPortrait} revealMode="manual">
          <Image src={founderimage} alt="Founder portrait placeholder" fill sizes="(max-width: 767px) 100vw, 28rem" className={styles.cover} />
          <figcaption>
            <span>Founder</span><i /><b aria-hidden="true" />
            <strong>Aqeeb Mapari</strong>
          </figcaption>
        </Reveal>
      </section>

      <section
        aria-labelledby="services-title"
        className={styles.services}
        data-design-source="Section -4 about.svg"
      >
        <div className={styles.servicesTop}>
          <HorizontalLinePair className={styles.servicesCrosshair} />
          <Reveal as="figure" className={styles.sketches} revealMode="manual">
            <Image src={texturePlaceholder} alt="Architectural sketches placeholder" fill sizes="(max-width: 767px) 100vw, 66vw" className={styles.cover} priority />
          </Reveal>
          <Reveal className={styles.servicesIntro} revealMode="manual">
            <p>From new developments to restorations, every project is approached with commitment to design, craftsmanship, and quality.</p>
            <Link href="/#contact">Get in Touch <span aria-hidden="true">›</span></Link>
          </Reveal>
        </div>
        <div className={styles.serviceSteps} aria-hidden="true">
          <ArchitecturalStairs variant="practice" stairClassName="bg-[#E7E8E8]" />
        </div>
        <div className={styles.servicesPanel}>
          <div className={styles.servicesKicker}><span id="services-title">What We Build</span><i /></div>
          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <Reveal className={styles.service} key={service.title} revealMode="manual">
                <h3>{service.title}</h3><p>{service.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="vision-title"
        className={styles.vision}
        data-design-source="Section -5 about.svg"
      >
        <Reveal revealMode="manual"><h2 id="vision-title">Crafted By A Shared Vision</h2></Reveal>
        <div className={styles.peopleGrid}>
          {sharedVision.map((person, index) => (
            <Reveal as="article" className={styles.personCard} key={`${person.name}-${index}`} revealMode="manual">
              <figure><Image src={person.image} alt="" fill sizes="(max-width: 767px) 100vw, 33vw" className={styles.cover} /></figure>
              <div className={styles.personMeta}>
                <span>{person.role}</span><EditorialRule /><h3>{person.name}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
