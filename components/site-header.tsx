import Link from "next/link";
import { Container } from "@/components/ui/container";

const navItems = [
  { href: "#residences", label: "Residences" },
  { href: "#amenities", label: "Amenities" },
  { href: "#location", label: "Location" },
  { href: "#enquire", label: "Enquire" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-header py-5 text-bone mix-blend-difference">
      <Container className="flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-[0.08em]"
          aria-label="Benicio Residences home"
        >
          Benicio
        </Link>
        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-8 text-[0.72rem] font-semibold uppercase tracking-[0.18em]">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
