const texturePath = "/assets/textures/concrete-background-textures-09-1.svg";

export function TexturedHeroSection() {
  return (
    <section
      aria-label="Benicio hero"
      className="relative isolate h-screen min-h-[640px] overflow-hidden bg-[#2d2d2d]"
      data-section="textured-hero"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-cover bg-center opacity-80"
        data-hero-background-texture
        style={{ backgroundImage: `url("${texturePath}")` }}
      />
    </section>
  );
}
