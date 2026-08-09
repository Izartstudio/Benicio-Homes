import type { CSSProperties, ReactNode } from "react";
import { ContactSection } from "@/components/contact/contact-section";
import { Footer } from "@/components/footer/footer";
import { Reveal } from "@/components/ui/reveal";
import { getCdnAsset } from "@/lib/getCdnAsset";
import styles from "./legal-page.module.css";

type LegalSection = {
  title: string;
  content: ReactNode;
};

const legalSections: LegalSection[] = [
  {
    title: "Introduction",
    content: (
      <p>
        Welcome to Benicio Homes&apos; website at https://benicio.co.in (the
        &quot;Website&quot;). By accessing or using our Website, you agree to comply
        with and be bound by the following terms and conditions. If you do not
        agree with any of these terms, please do not use our Website.
      </p>
    ),
  },
  {
    title: "1. Use of Website",
    content: (
      <>
        <p><strong>1.1.</strong> The content on this Website, including but not limited to, text, images, graphics, and information, is provided for general information purposes only. Benicio Homes reserves the right to change or update content at any time without notice.</p>
        <p><strong>1.2.</strong> You agree to use the Website only for lawful purposes and in a way that does not infringe upon the rights of others or restrict or inhibit anyone else&apos;s use and enjoyment of the Website.</p>
      </>
    ),
  },
  {
    title: "2. Intellectual Property Rights",
    content: (
      <>
        <p><strong>2.1.</strong> All content, trademarks, logos, and images on this Website are the property of Benicio Homes unless otherwise stated. Unauthorized use of any of the materials on this Website is prohibited.</p>
        <p><strong>2.2.</strong> You may view, download, and print pages from the Website for personal, non-commercial use. However, you must not republish, reproduce, or modify any content on this Website without prior written consent from Benicio Homes.</p>
      </>
    ),
  },
  {
    title: "3. User Content",
    content: (
      <>
        <p><strong>3.1.</strong> If you submit or post any content, such as comments, on the Website, you grant Benicio Homes a non-exclusive, royalty-free, perpetual, and irrevocable right to use, reproduce, modify, and display such content in any media.</p>
        <p><strong>3.2.</strong> You agree not to post or upload content that is unlawful, harmful, abusive, defamatory, or infringes on any intellectual property rights.</p>
      </>
    ),
  },
  {
    title: "4. Privacy and Cookies",
    content: (
      <>
        <p><strong>4.1.</strong> Benicio Homes respects your privacy. Please refer to our Privacy Policy for information on how we collect, use, and disclose personal information.</p>
        <p><strong>4.2.</strong> By using our Website, you consent to our use of cookies in accordance with our Privacy Policy.</p>
      </>
    ),
  },
  {
    title: "5. Third-Party Links",
    content: (
      <>
        <p><strong>5.1.</strong> Our Website may contain links to third-party websites or services that are not owned or controlled by Benicio Homes. We have no control over the content, policies, or practices of any third-party websites.</p>
        <p><strong>5.2.</strong> Benicio Homes assumes no responsibility for any loss or damage that may arise from your use of any third-party sites.</p>
      </>
    ),
  },
  {
    title: "6. Limitation of Liability",
    content: (
      <>
        <p><strong>6.1.</strong> Benicio Homes does not guarantee that the Website will be available at all times or be free from errors, viruses, or other harmful components.</p>
        <p><strong>6.2.</strong> To the fullest extent permitted by law, Benicio Homes shall not be liable for any indirect, incidental, or consequential damages, including but not limited to loss of profits, data, or other intangible losses, arising out of or in connection with your use of our Website.</p>
      </>
    ),
  },
  {
    title: "7. Disclaimer",
    content: <p><strong>7.1.</strong> All information on this Website is provided &quot;as is&quot; without warranties of any kind, either express or implied. Benicio Homes does not warrant the accuracy, reliability, or completeness of any information on this Website.</p>,
  },
  {
    title: "8. Changes to Terms and Conditions",
    content: <p><strong>8.1.</strong> Benicio Homes reserves the right to modify these Terms and Conditions at any time. Your continued use of the Website following any changes signifies your acceptance of the new Terms and Conditions.</p>,
  },
  {
    title: "9. Governing Law",
    content: <p><strong>9.1.</strong> These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction where Benicio Homes is registered, without regard to its conflict of law provisions.</p>,
  },
  {
    title: "10. Contact Us",
    content: (
      <>
        <p>For any questions or concerns regarding these Terms and Conditions, please contact us at:</p>
        <address>
          <strong>Benicio Homes</strong><br /><br />
          <a href="https://maps.google.com/?q=55-58+Aldeia+Aurino+Porvorim+North+Goa+403501">55–58, Aldeia Aurino, Porvorim<br />North Goa - 403501</a><br /><br />
          <a href="mailto:info@benicio.co.in">info@benicio.co.in</a>
        </address>
      </>
    ),
  },
];

type LegalPageProps = {
  title: string;
};

export function LegalPage({ title }: LegalPageProps) {
  const texture = getCdnAsset("https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Journal/textureblogposts.webp");
  const textureStyle = {
    "--legal-texture": texture ? `url("${texture}")` : "none",
  } as CSSProperties;

  return (
    <main className={styles.page} style={textureStyle}>
      <section className={styles.hero} aria-labelledby="legal-page-title">
        <div className={styles.heroInner}>
          <Reveal as="h1" className={styles.title} revealMode="mount" id="legal-page-title">
            {title}
          </Reveal>
          <Reveal className={styles.updated} delay={0.08} revealMode="mount">
            <span className={styles.updatedLabel}>Last updated</span>
            <span aria-hidden="true" className={styles.updatedRule} />
            <time dateTime="2026-07-12">12 July 2026</time>
          </Reveal>
        </div>
      </section>

      <article className={styles.paper}>
        <div className={styles.content}>
          {legalSections.map((section, index) => (
            <Reveal as="section" className={styles.section} delay={Math.min(index * 0.025, 0.15)} key={section.title}>
              <h2>{section.title}</h2>
              <div className={styles.copy}>{section.content}</div>
            </Reveal>
          ))}
        </div>
      </article>

      <ContactSection />
      <Footer />
    </main>
  );
}
