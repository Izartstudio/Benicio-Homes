import { OptimizedImage as Image } from "@/components/ui/optimized-image";
import Link from "next/link";
import { FooterColumn } from "@/components/footer/footer-column";
import { FooterLink } from "@/components/footer/footer-link";
import styles from "./footer.module.css";

const navigationLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "The Practice" },
  { href: "#contact", label: "Get In Touch" },
  { href: "/journal", label: "Journal" },
] as const;

const socialLinks = [
  {
    href: "https://www.facebook.com/",
    label: "Facebook",
    src: "/assets/icons/facebookicon.svg",
  },
  {
    href: "https://www.instagram.com/benicio_homes_/",
    label: "Instagram",
    src: "/assets/icons/instagramicon.svg",
  },
] as const;

export function Footer() {
  return (
    <footer
      className={`relative isolate h-[26.875rem] overflow-hidden bg-[#b9b9b9] text-[#232323] ${styles.footer}`}
      data-section="footer"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        data-footer-background
      >
        <Image
          alt=""
          className="object-cover object-center md:object-top"
          fill
          quality={75}
          sizes="100vw"
          src="/assets/footer/footer-texture.webp"
        />
      </div>

      <div
        className={`relative grid h-full grid-cols-[minmax(24rem,34.5rem)_minmax(9rem,12rem)_minmax(12rem,14rem)_minmax(14rem,16rem)] gap-[clamp(3rem,5.8vw,5.25rem)] px-[5.208vw] pt-[6.25rem] ${styles.content}`}
        data-footer-content
      >
        <div className={styles.brandSocialGroup}>
          <div className={styles.brandReveal}>
            <section aria-label="Benicio footer brand" data-footer-brand>
              <Link
                aria-label="Benicio home"
                className="inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite"
                href="/"
              >
                <Image
                  className={styles.brandLogo}
                  src="/assets/footer/Logo-footer.svg"
                  alt="Benicio"
                  width={75}
                  height={57}
                />
              </Link>

              <p
                className={`mt-[2.875rem] max-w-[21rem] font-display text-[1.125rem] leading-[1.35] ${styles.brandTagline}`}
              >
                Good Architecture should respect the climate of the land, and not stay apart from it.
              </p>

              <p className="sr-only">
                © {new Date().getFullYear()} Benicio Homes.
              </p>
            </section>
          </div>

          <div className={`mt-[1.625rem] ${styles.socialReveal}`}>
            <section aria-labelledby="footer-social-title" data-footer-social>
              <h2 id="footer-social-title" className="sr-only">
                Social
              </h2>
              <ul
                aria-label="Social links"
                className={`flex items-center gap-[1.5rem] ${styles.socialList}`}
              >
                {socialLinks.map((item) => (
                  <li key={item.label}>
                    <FooterLink
                      aria-label={item.label}
                      className={`grid size-5 place-items-center opacity-100 transition-opacity duration-300 hover:opacity-70 ${styles.socialLink}`}
                      href={item.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Image
                        src={item.src}
                        alt=""
                        width={18}
                        height={18}
                        className="h-auto w-[1.125rem]"
                      />
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <div className={styles.navigationReveal}>
          <nav aria-label="Footer navigation" data-footer-navigation>
            <FooterColumn title="Quick Links">
              <ul className={`grid gap-[1.625rem] ${styles.columnList}`}>
                {navigationLinks.map((item) => (
                  <li key={item.href}>
                    <FooterLink href={item.href}>
                      {item.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          </nav>
        </div>

        <div className={styles.legalReveal}>
          <nav aria-label="Legal links" data-footer-legal>
            <FooterColumn title="Legal">
              <ul className={`grid gap-[1.625rem] ${styles.columnList}`}>
                <li>
                  <FooterLink href="/terms">Terms &amp; Conditions</FooterLink>
                </li>
                <li>
                  <FooterLink href="/privacy">Privacy Policy</FooterLink>
                </li>
              </ul>
            </FooterColumn>
          </nav>
        </div>

        <div className={styles.contactReveal}>
          <section aria-label="Contact" data-footer-contact>
            <FooterColumn title="Contact">
              <address className="not-italic">
                <ul className={`grid gap-[1.625rem] ${styles.columnList}`}>
                  <li>
                    <FooterLink href="tel:+919021829812">
                      +91 90218 29812
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink href="mailto:info@benicio.co.in">
                      info@benicio.co.in
                    </FooterLink>
                  </li>
                  <li>
                    <p
                      className={`max-w-[12.5rem] text-[#575757] ${styles.contactAddress}`}
                    >
                     Benicio Homes, S5-S8, Aldeia Aurino, Porvorim
                      North Goa - 403501
                    </p>
                  </li>
                </ul>
              </address>
            </FooterColumn>
          </section>
        </div>

       
      </div>
    </footer>
  );
}
