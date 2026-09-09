# Benicio SEO implementation

Changes are in the local Next.js project; production deployment and external account updates have not been performed.

Implemented:
- Permanent www-to-non-www redirect preserving paths and queries; legacy redirect map except /new-blog, whose source article needs recovery.
- Self-referencing canonicals, requested SEO titles, Open Graph and Twitter metadata, 1200 × 630 text-based social cards.
- Sitemap excludes legal pages and currently contains 11 live URLs. Legal pages use noindex,follow.
- Shared Reveal component now respects its semantic HTML tag. Headings, article paragraphs, sections and articles render as requested.
- Accessible homepage and project H1 text. Visible headings retain their original wording at the owner's request.
- Existing CMS Journal004 article served at /journal/restoring-heritage-homes-in-goa with permanent redirect and consistent title/number. CMS document and article body preserved.
- All six project cards render initially. Journal breadcrumbs with schema and heritage article links are included. Visible additions to individual project pages were removed at the owner's request, preserving their original presentation.
- Organization classification, consistent organization identifier, project Residence/ImageObject schema, article publisher reference.
- Visible copy, including project location spellings and displayed Vanam measurement labels, retains its original wording at the owner's request.
- Facebook URL supplied by owner applied in footer and organization social references.
- Office address is standardized as S5–S8, Aldeia Aurino, Porvorim across the footer, legal page and organization schema.
- Nayan's contact CTA now matches the layout and typography of the other project brochure CTAs while retaining its enquiry-form destination.
- Only the first homepage sequence image loads eagerly; AVIF and WebP are enabled.
- Project desktop/mobile hero images now share responsive `<picture>` elements, preventing both variants from being fetched or preloaded. Moodboard variants use one responsive picture instead of duplicate desktop/mobile markup.
- The standard project gallery is split into its own route chunk while retaining its original reveal animation. Below-the-fold gallery images are explicitly lazy-loaded at a lower quality setting.
- Bahnschrift was subset to the Latin ranges used by the site and converted from a 315 KB TTF to a 53 KB WOFF2 file.
- Old Vanam PDF URL redirects to the existing /assets/pdf/vanam-villas.pdf asset. This asset has NOT been certified as a newly revised brochure.

Remaining work requiring verified source material or access:
- Real journal author name, designation, biography. Placeholder role is not represented as a Person in schema.
- Recover/migrate /new-blog once its original content is supplied. It is absent from repository history, currently returns 404, and no indexed copy was found.
- Verify RERA status, possession dates, project area definitions, team credits, travel times and missing brochures before adding claims.
- Supply or approve revised brochure assets; audit old branding in existing PDFs.
- Submit sitemap in Google Search Console and Bing; update Google Business Profile and property portals.
- Mobile and desktop PageSpeed testing after the updated build is deployed.
- Dedicated photo-led social artwork can replace the current unique typographic cards.

Validation:
- Production build and TypeScript passed during implementation.
- ESLint passed after semantic component and Link fixes.
- Local HTTP checks confirmed 308 www redirect with query preservation, 308 Journal004 redirect, and 11 sitemap URLs.
- Article rendered one non-empty H1, real paragraph tags, canonical URL and article Open Graph metadata.
- Practice heading visually inspected at desktop size.
