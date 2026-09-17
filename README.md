# Benicio Homes Website

Production website for Benicio Homes, built with Next.js App Router,
TypeScript, Tailwind CSS, Sanity, GSAP, Lenis, Mux, and Cloudflare R2.

## Local setup

Requirements: Node.js `22.19.0` (see `.nvmrc`) and npm.

```bash
nvm use
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Ask the project owner for development credentials;
never copy production secrets into chat, tickets, commits, or documentation.

## Scripts

- `npm run dev` starts local development.
- `npm run build` creates a production build.
- `npm run lint` runs ESLint.
- `npm run typecheck` validates TypeScript without emitting files.
- `npm run check` runs the complete pre-release verification suite.
- `npm run sanity` starts Sanity Studio locally.

## Deploying to Hostinger

This repository is ready for Hostinger's **Node.js Web App** hosting. It must
not be deployed as a static front-end: server actions, ISR, redirects, and API
routes require a persistent Node.js process.

Use these settings in hPanel:

- Framework: `Next.js`
- Node.js: `22.x`
- Install command: `npm ci`
- Build command: `npm run build`
- Start command: `npm run start`
- Health check: `/api/health`

Add the variables from `.env.example` in hPanel before deploying. Values whose
names start with `NEXT_PUBLIC_` are embedded during the build, so redeploy after
changing them. Server-only secrets must never use that prefix.

For the complete launch checklist, environment-variable matrix, domain setup,
and troubleshooting notes, see [`HOSTINGER.md`](./HOSTINGER.md).

## Architecture

- `app/` — routes, layouts, metadata, server actions, and API handlers.
- `sections/home/` — homepage sections and their scroll-driven behavior.
- `components/` — shared navigation, forms, project, journal, and UI components.
- `components/providers/lenis-provider.tsx` — the single site-wide scroll engine
  and its GSAP ScrollTrigger synchronization.
- `app/projects/data/` — typed project content and media mappings.
- `sanity/` — CMS client, queries, types, and fallback content.
- `lib/` — service boundaries for SEO, CDN URLs, forms, brochures, and R2.
- `styles/` — shared design tokens and base styles.
- `assets/` — editable source assets; not served directly.
- `public/assets/` — browser-served production images, videos, PDFs, and textures.

For coding conventions and the release workflow, read
[`CONTRIBUTING.md`](./CONTRIBUTING.md). For accounts, ownership, and client
transfer steps, read [`HANDOFF.md`](./HANDOFF.md).

## Cloudflare R2 media

Copy `.env.example` to `.env.local` and provide the R2 credentials and public URL.
The authenticated `POST /api/upload` route accepts `multipart/form-data` with
`file` and `folder` fields, validates supported image types and a 10 MB maximum,
and returns the generated object key and public URL. Trusted tools must send
`Authorization: Bearer <UPLOAD_API_TOKEN>`. Use the storage helpers directly from
server code for CMS integrations; do not call Cloudflare from public components.

## Content and integrations

- Journal and team content come from Sanity, with local fallbacks where defined.
- Contact and brochure submissions are sent to Google Apps Script endpoints.
- Project media can be served from the configured CDN/R2 public domain.
- Hero video playback uses public Mux playback IDs.
- Google Analytics is initialized in `app/layout.tsx`.

All service accounts and production variables must be owned by the client before
the agency removes its access. See the ownership matrix in `HANDOFF.md`.
