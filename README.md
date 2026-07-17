# Benicio Website

Premium real estate website foundation built with Next.js App Router,
TypeScript, Tailwind CSS, `next/font`, and a section-driven homepage structure.

## Scripts

- `npm run dev` starts local development.
- `npm run build` creates a production build.
- `npm run lint` runs ESLint.

## Architecture

- `app/` contains App Router entry points, metadata, and global CSS imports.
- `sections/home/` contains isolated homepage sections.
- `components/ui/` contains small shared primitives.
- `styles/` contains design tokens and base CSS.
- `lib/animation/` is reserved for future GSAP and Lenis integration.
- `assets/` stores editable source assets.
- `public/assets/` stores browser-served optimized assets.
