import { OptimizedImage as Image } from "@/components/ui/optimized-image";
import { CTA } from "@/components/ui/cta";
import { EditorialHeroComposition } from "@/components/editorial-hero/editorial-hero-composition";
import { Reveal } from "@/components/ui/reveal";
import { SectionCrosshair } from "@/components/ui/section-crosshair";
import { AboutPageAnimations } from "./about-page-animations";
import type { AboutTeamSection } from "@/sanity/lib/aboutTeam";
import styles from "./practice-page.module.css";

const texturePlaceholder = "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/about/sketch.webp";
const founderimage = "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/about/Gemini_Generated_Image_t91y0mt91y0mt91y.png";
const horizontalbandimage = "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/about/horizontalbandleft.webp";
const horizontalBandRightImage = "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/about/horizontalbandright.webp";
const orangeBarImage = "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/orangeblock.webp";

const services = [
  {
    title: "Develop & Build Homes",
    copy: "We carry each project from planning and design through construction and handover. This keeps the architectural intent intact at every stage.",
  },
    {
    title: "Architectural Design & Development ",
    copy: "Structure, openings, materials and movement are resolved in response to the site, then followed through during construction.",
  },
  {
    title: "Property Management",
    copy: "Our responsibility continues after handover. We oversee maintenance, security and readiness with the same care used to build the home.",
  },
 
] as const;

function EditorialRule() {
  return (
    <span aria-hidden="true" className={styles.editorialRule} data-drawn-marker>
      <span data-marker-line />
      <span data-marker-block />
    </span>
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
      <Image src={orangeBarImage} alt="" fill sizes="15.125rem" />
    </span>
  );
}

export function AboutPracticePage({ teamSection }: { teamSection: AboutTeamSection }) {
  return (
    <div className={styles.page} data-about-practice-root>
      <AboutPageAnimations />
      <EditorialHeroComposition
        designSource="Hero Section.svg"
        sectionName="practice-hero"
        title={<>The Practice,<br />Behind the homes</>}
        titleId="practice-title"
      />

      <section
        aria-labelledby="respect-title"
        className={styles.respect}
        data-design-source="Section -2about.svg"
      >
        <div aria-hidden="true" className={styles.respectTexture}>
          <Image
            alt=""
            className={styles.cover}
            fill
            quality={75}
            sizes="100vw"
            src="https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/about/aboutsection-2.webp"
          />
        </div>
        <Reveal className={styles.respectHeading} revealMode="manual">
          <h2 id="respect-title">Every Home Begins With<br />Respect For Place</h2>
        </Reveal>
        <div className={styles.respectBand} data-respect-media-band>
          <figure className={styles.respectBandImage}>
            <Image src={horizontalbandimage} alt="Tropical architecture integrated with the Goan landscape" fill sizes="(max-width: 767px) calc((100vw - 7.5rem) / 2), 50vw" className={styles.cover} />
          </figure>
          <div className={styles.respectLogoBlock}>
            <Image src="/assets/NavBar/Logo-NavBar.svg" alt="Benicio Homes" width={188} height={143} className={styles.respectLogo} style={{ height: "auto" }} />
          </div>
          <figure className={styles.respectBandImage}>
            <Image src={horizontalBandRightImage} alt="Tropical landscape surrounding a Benicio home in Goa" fill sizes="(max-width: 767px) calc((100vw - 7.5rem) / 2), 50vw" className={styles.cover} />
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
        <div aria-hidden="true" className={styles.manifestoTexture}>
          <Image
            alt=""
            className={styles.cover}
            fill
            quality={75}
            sizes="100vw"
            src="https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/about/ourmanifesto-bg.webp"
          />
        </div>
        <SectionCrosshair className={`${styles.sectionCrosshair} ${styles.manifestoCrosshair}`} showMarker />
        <Reveal className={styles.manifestoCopy} revealMode="manual">
          <div className={styles.manifestoKicker}><span>Our Manifesto</span><i /></div>
          <h2 id="manifesto-title">Architecture Needs Someone
<br />To See It Through.</h2>
          <p className={styles.manifestoLead}>An idea only matters when it survives the realities of building.</p>
          <p className={styles.manifestoBody}>Aqeeb founded Benicio to bring architectural conviction and developer discipline into the same practice. The role is not only to imagine a different home, but to protect its intent through drawings, materials, construction and handover.</p>
          <div className={styles.manifestoLines}>
            <p>From First Drawing To Final Joint.<br />We Create What Deserves To Last.</p>
            <p>Every Decision Has A Reason.<br />Every Detail Has An Author.</p>
          </div>
        </Reveal>
        <Reveal as="figure" className={styles.founderPortrait} revealMode="manual">
          <Image src={founderimage} alt="Aqeeb Mapari, founder of Benicio Homes" fill sizes="(max-width: 767px) 100vw, 28rem" className={styles.cover} />
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
            <Image src={texturePlaceholder} alt="Architectural concept sketches for Benicio homes in Goa" fill sizes="(max-width: 767px) 100vw, 66vw" className={styles.cover} />
          </Reveal>
          <Reveal className={styles.servicesIntro} revealMode="manual">
            <p>From new developments to restorations, every project is approached with commitment to design, craftsmanship, and quality.</p>
            <CTA href="/#contact" variant="light">Get in Touch</CTA>
          </Reveal>
        </div>
        <div className={styles.serviceSteps} aria-hidden="true">
          <div className={styles.servicesSurface} data-architectural-stair="services-surface" />
        </div>
        <div className={styles.servicesPanel}>
          <div className={styles.mobileServiceSteps} aria-hidden="true">
            <div className={styles.servicesSurface} data-architectural-stair="services-surface-mobile" />
          </div>
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

      {teamSection.isVisible ? (
        <section
          aria-labelledby="vision-title"
          className={styles.vision}
          data-design-source="Section -5 about.svg"
        >
          <Reveal revealMode="manual"><h2 id="vision-title">{teamSection.heading}</h2></Reveal>
          <div className={styles.peopleGrid}>
            {teamSection.members.map((person) => (
              <Reveal as="article" className={styles.personCard} key={person.id} revealMode="manual">
                <figure><Image src={person.image} alt={person.altText} fill sizes="(max-width: 767px) 100vw, 33vw" className={styles.cover} /></figure>
                <div className={styles.personMeta}>
                  <span>{person.role}</span><EditorialRule /><h3>{person.name}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
