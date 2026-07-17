export const tokens = {
  colors: {
    ink: "#111111",
    charcoal: "#232323",
    graphite: "#343434",
    smoke: "#464646",
    ash: "#575757",
    concrete: "#696969",
    steel: "#7A7A7A",
    warmGray: "#9C9A9A",
    silver: "#B9B9B9",
    laterite: "#BE5B3F",
    bone: "#D8D6CF",
    sand: "#B9B9B9",
    olive: "#575757",
    clay: "#BE5B3F",
    brass: "#BE5B3F",
    white: "#ffffff",
  },
  spacing: {
    pageX: "clamp(1.5rem, 4vw, 5rem)",
    sectionY: "clamp(5rem, 9vw, 10rem)",
    sectionYTight: "clamp(3.5rem, 6vw, 6rem)",
  },
  typography: {
    hero: "clamp(4.5rem, 9vw, 10rem)",
    display: "clamp(3rem, 6vw, 6.75rem)",
    title: "clamp(2rem, 3.2vw, 3.75rem)",
    bodyLarge: "clamp(1.125rem, 1.45vw, 1.5rem)",
    kicker: "0.72rem",
  },
  zIndex: {
    base: 0,
    elevated: 10,
    header: 50,
    overlay: 100,
  },
  borders: {
    hairline: "1px solid rgb(17 16 12 / 0.14)",
    strong: "1px solid rgb(17 16 12 / 0.28)",
    radiusSoft: "0.375rem",
    radiusPanel: "0.5rem",
  },
} as const;

export type DesignTokens = typeof tokens;
