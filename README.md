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
- `lib/storage/r2.ts` is the server-only Cloudflare R2 storage boundary for media.

## Cloudflare R2 media

Copy `.env.example` to `.env.local` and provide the R2 credentials and public URL.
The `POST /api/upload` route accepts `multipart/form-data` with `file` and `folder`
fields, validates supported image types and a 10 MB maximum size, and returns the
generated object key and public URL. Use the storage helpers directly from trusted
server code for CMS integrations; do not call Cloudflare from components or pages.
