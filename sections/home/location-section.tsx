import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function LocationSection() {
  return (
    <section id="location" className="bg-bone pb-section-y">
      <Container>
        <div className="grid gap-14 border-t border-ink/14 pt-section-y-tight lg:grid-cols-[1fr_0.78fr]">
          <SectionHeading
            eyebrow="Location"
            title="Set above the city, close to its cultural center."
          />
          <div className="space-y-8 text-base leading-8 text-ink/68">
            <p>
              Benicio is positioned for privacy first: tucked into a landscaped
              rise, with fast access to galleries, dining rooms, schools, and
              the financial district.
            </p>
            <dl className="grid grid-cols-2 gap-px bg-ink/14">
              {[
                ["06 min", "Arts district"],
                ["09 min", "Marina road"],
                ["14 min", "Financial core"],
                ["22 min", "International airport"],
              ].map(([value, label]) => (
                <div key={label} className="bg-bone p-6">
                  <dt className="text-sm text-ink/54">{label}</dt>
                  <dd className="mt-2 font-display text-4xl font-semibold text-ink">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
