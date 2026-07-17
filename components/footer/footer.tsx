import Image from "next/image";
import Link from "next/link";
import { FooterColumn } from "@/components/footer/footer-column";
import { FooterLink } from "@/components/footer/footer-link";
import { Reveal } from "@/components/ui/reveal";

const navigationLinks = [
  { href: "#featured-projects", label: "Projects" },
  { href: "#about", label: "About Us" },
  { href: "#contact", label: "Get In Touch" },
  { href: "#journal", label: "Journal" },
] as const;

const socialLinks = [
  {
    href: "https://www.facebook.com/",
    label: "Facebook",
    src: "/assets/icons/facebookicon.svg",
  },
  {
    href: "https://www.instagram.com/",
    label: "Instagram",
    src: "/assets/icons/instagramicon.svg",
  },
] as const;

export function Footer() {
  return (
    <footer
      className="relative isolate h-[26.875rem] overflow-hidden bg-[#b9b9b9] text-[#232323]"
      data-section="footer"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-cover bg-center"
        data-footer-background
        style={{
          backgroundImage: 'url("/assets/footer/footer-texture.svg")',
        }}
      />

      <div
        className="relative z-10 grid h-full grid-cols-[minmax(24rem,34.5rem)_minmax(9rem,12rem)_minmax(12rem,14rem)_minmax(14rem,16rem)] gap-[clamp(3rem,5.8vw,5.25rem)] px-[5.208vw] pt-[6.25rem]"
        data-footer-content
      >
        <div>
          <Reveal revealId="footer-brand">
            <section aria-label="Benicio footer brand" data-footer-brand>
              <Link
                aria-label="Benicio home"
                className="inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite"
                href="/"
              >
                <Image
                  src="/assets/footer/Logo-footer.svg"
                  alt="Benicio"
                  width={75}
                  height={57}
                  priority={false}
                />
              </Link>

              <p className="mt-[2.875rem] max-w-[21rem] font-display text-[1.125rem] leading-[1.35]">
                Building Bespoke, Eco-conscious and Immersive Tropical Luxury
                Holiday Homes
              </p>

              <p className="sr-only">
                © {new Date().getFullYear()} Benicio Homes.
              </p>
            </section>
          </Reveal>

          <Reveal className="mt-[1.625rem]" revealId="footer-social">
            <section aria-labelledby="footer-social-title" data-footer-social>
              <h2 id="footer-social-title" className="sr-only">
                Social
              </h2>
              <ul
                aria-label="Social links"
                className="flex items-center gap-[1.5rem]"
              >
                {socialLinks.map((item) => (
                  <li key={item.label}>
                    <FooterLink
                      aria-label={item.label}
                      className="grid size-5 place-items-center opacity-100 transition-opacity duration-300 hover:opacity-70"
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
          </Reveal>
        </div>

        <Reveal revealId="footer-navigation">
          <nav aria-label="Footer navigation" data-footer-navigation>
            <FooterColumn title="Quick Links">
              <ul className="grid gap-[1.625rem]">
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
        </Reveal>

        <Reveal revealId="footer-legal">
          <nav aria-label="Legal links" data-footer-legal>
            <FooterColumn title="Legal">
              <ul className="grid gap-[1.625rem]">
                <li>
                  <FooterLink href="/terms">Terms &amp; Conditions</FooterLink>
                </li>
                <li>
                  <FooterLink href="/privacy">Privacy Policy</FooterLink>
                </li>
              </ul>
            </FooterColumn>
          </nav>
        </Reveal>

        <Reveal revealId="footer-contact">
          <section aria-label="Contact" data-footer-contact>
            <FooterColumn title="Contact">
              <address className="not-italic">
                <ul className="grid gap-[1.625rem]">
                  <li>
                    <FooterLink href="tel:+91921013324">
                      +91 92101 3324
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink href="mailto:info@beniciohomes.co.in">
                      info@beniciohomes.co.in
                    </FooterLink>
                  </li>
                  <li>
                    <p className="max-w-[12.5rem] text-[#575757]">
                      Benicio Homes, 123 Beach Road, Candolim, Goa, 403515,
                      India
                    </p>
                  </li>
                </ul>
              </address>
            </FooterColumn>
          </section>
        </Reveal>

       
      </div>
    </footer>
  );
}
