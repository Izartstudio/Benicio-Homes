import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ResidenceFeature } from "@/types/home";

const features: ResidenceFeature[] = [
  {
    title: "Measured plans",
    description:
      "Large-format living spaces, private lift access, and quiet service zones support everyday elegance.",
  },
  {
    title: "Material depth",
    description:
      "Limestone, warm timber, burnished metal, and low-sheen plaster form a restrained interior palette.",
  },
  {
    title: "Framed outlooks",
    description:
      "Deep reveals, shaded terraces, and full-height glazing turn the skyline into a composed backdrop.",
  },
];

export function ResidencesSection() {
  return (
    <section id="residences" className="bg-sand py-section-y">
      <Container>
        <SectionHeading
          eyebrow="Residences"
          title="Homes built around calm, privacy, and long views."
        />
        <div className="mt-20 grid gap-px bg-ink/14 lg:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="bg-sand p-8 lg:p-10">
              <h3 className="font-display text-4xl font-semibold">
                {feature.title}
              </h3>
              <p className="mt-8 text-base leading-8 text-ink/68">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
