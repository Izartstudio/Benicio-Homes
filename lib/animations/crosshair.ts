import gsap from "gsap";

export function prepareCrosshair(crosshair: HTMLElement) {
  const lines = Array.from(crosshair.querySelectorAll<HTMLElement>("i"));
  const marker = crosshair.querySelector<HTMLElement>("[data-crosshair-marker]");

  lines.forEach((line, index) => {
    const vertical = index === 2 || index === 3;
    const origin = index === 0 || index === 5
      ? "right center"
      : index === 2
        ? "center bottom"
        : index === 3
          ? "center top"
          : "left center";

    gsap.set(line, {
      scaleX: vertical ? 1 : 0,
      scaleY: vertical ? 0 : 1,
      transformOrigin: origin,
    });
  });
  if (marker) {
    gsap.set(marker, { autoAlpha: 0, scale: 0, transformOrigin: "center" });
  }

  return { lines, marker };
}

export function addCrosshair(
  timeline: gsap.core.Timeline,
  crosshair: HTMLElement,
  at = 0,
) {
  const { lines, marker } = prepareCrosshair(crosshair);

  if (marker) {
    timeline.to(marker, {
      autoAlpha: 1,
      duration: 0.24,
      ease: "back.out(1.8)",
      scale: 1,
    }, at);
  }

  timeline.to(lines, {
    duration: 0.58,
    ease: "power2.inOut",
    scaleX: 1,
    scaleY: 1,
    stagger: 0.025,
  }, at + 0.12);
}
