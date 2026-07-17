import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Amenity } from "@/types/home";

const amenities: Amenity[] = [
  { name: "Wellness pavilion", detail: "Thermal suites, treatment rooms, and a quiet pool garden." },
  { name: "Residents' salon", detail: "A private lounge for hosted dinners, tastings, and conversation." },
  { name: "Arrival court", detail: "A layered entry sequence screened by planting and natural stone." },
  { name: "Sky terrace", detail: "Open-air rooms oriented to sunset, skyline, and evening service." },
];

export function AmenitiesSection() {
  return (
    <section id="amenities" className="bg-ink py-section-y text-bone">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1fr]">
          <SectionHeading
            eyebrow="Amenities"
            title="Shared spaces with the discretion of a private club."
            className="[&>p]:text-brass"
          />
          <div className="divide-y divide-bone/18 border-y border-bone/18">
            {amenities.map((amenity) => (
              <article
                key={amenity.name}
                className="grid gap-5 py-8 sm:grid-cols-[14rem_1fr]"
              >
                <h3 className="font-display text-3xl font-semibold">
                  {amenity.name}
                </h3>
                <p className="leading-8 text-bone/68">{amenity.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
