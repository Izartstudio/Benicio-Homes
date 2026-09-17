# Contributing

## Before making changes

1. Use the Node version in `.nvmrc`.
2. Run `npm ci`; use `npm install` only when intentionally changing dependencies.
3. Copy `.env.example` to `.env.local` and obtain values from the project owner.
4. Create a short-lived branch from `main`.

## Project conventions

- Keep route-level composition in `app/` and reusable presentation in
  `components/` or `sections/`.
- Server-only integrations belong in `lib/` and must not be imported by client
  components. Only variables intentionally safe for browsers may use the
  `NEXT_PUBLIC_` prefix.
- Use `OptimizedImage` or `CdnImage` for content images. Always provide accurate
  `alt` text and a `sizes` value for responsive fill images.
- Put files served directly by the browser in `public/assets`. Keep editable
  design sources outside `public/` so they are not shipped to visitors.
- Reuse existing design tokens and CSS modules. Avoid one-off global styles.
- There must be only one document-level Lenis instance. New GSAP ScrollTriggers
  must be created inside a scoped effect and killed or reverted during cleanup.
- Preserve reduced-motion behavior for every new animation.
- Prefer comments that explain constraints or non-obvious decisions. Do not add
  comments that merely repeat what the code says.

## Content changes

- Project content and media mappings live in `app/projects/data/`.
- Journal content is queried through `sanity/lib/journal.ts`.
- Redirects and remote-image hosts are configured in `next.config.ts`.
- Public environment variables are compiled at build time; redeploy after they
  change.

## Required checks

Run the full verification suite before merging or deploying:

```bash
npm run check
```

For visual changes, also check the homepage and every project template at desktop
and mobile widths. Pay particular attention to the sticky homepage hero, internal
navigation, contact forms, remote images, and reduced-motion mode.

## Pull requests

- Keep each pull request focused on one concern.
- Explain user-visible changes and list the routes tested.
- Include before/after screenshots for visual work.
- Never commit `.env.local`, credentials, exported customer data, `.next`, or
  generated build output.
