import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { Stat } from "@/types/home";

const stats: Stat[] = [
  { value: "42", label: "Private residences" },
  { value: "17", label: "Garden terraces" },
  { value: "360", label: "Degree skyline views" },
];

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate min-h-[92vh] overflow-hidden bg-charcoal text-bone"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(17,16,12,0.18),rgba(17,16,12,0.86)),radial-gradient(circle_at_72%_34%,rgba(180,151,90,0.34),transparent_28%),linear-gradient(135deg,#6f7259_0%,#1f211c_46%,#11100c_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 -z-10 h-[72vh] w-[62vw] border-l border-t border-bone/18 bg-bone/8"
      />

      <Container className="flex min-h-[92vh] flex-col justify-end pb-14 pt-32">
        <p className="mb-8 max-w-sm text-kicker font-bold uppercase tracking-[0.24em] text-bone/72">
          Private hillside residences
        </p>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div>
            <h1
              id="hero-title"
              className="max-w-6xl font-display text-hero font-semibold text-balance"
            >
              Benicio Residences
            </h1>
            <p className="mt-8 max-w-2xl text-body-large text-bone/78">
              A quieter expression of luxury, shaped through proportion,
              material restraint, and a deliberate relationship to landscape.
            </p>
          </div>
          <div className="border-t border-bone/24 pt-6">
            <p className="mb-7 text-sm leading-7 text-bone/72">
              Designed as a sequence of arrival, retreat, and outlook, the
              homepage foundation is structured for immersive storytelling
              without coupling presentation to animation logic.
            </p>
            <ButtonLink href="#enquire" variant="light">
              Register interest
            </ButtonLink>
          </div>
        </div>

        <dl className="mt-16 grid gap-4 border-t border-bone/20 pt-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-sm text-bone/62">{stat.label}</dt>
              <dd className="mt-2 font-display text-5xl font-semibold">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
