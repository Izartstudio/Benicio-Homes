# Benicio Homes SEO Status Report

Date: 9 September 2026

## Current status

The changes listed as completed below are implemented and validated in the primary Benicio website project at `/Users/manyaagureja/Benicio Website`. The owner will deploy this linked project to Vercel. Post-deployment PageSpeed testing and search-engine submissions remain pending.

## Completed locally

### Domain consolidation and redirects

- Added a permanent 308 redirect from every `www.benicio.co.in` URL to the matching non-www URL.
- Paths and query strings are preserved by the hostname redirect.
- Added permanent redirects for the supplied legacy URLs:
  - `/about-us` to `/the-practice`
  - `/vanam-villa` to `/projects/vanam-villas`
  - `/majorda-villas` to `/projects/nayan-villa`
  - `/zen-villa` to `/projects/zen-villa-1`
  - `/blogs` to `/journal`
  - `/contact` to `/#contact`
  - `/terms-and-conditions` to `/terms`
  - `/privacy-policy` to `/privacy`
  - `/the-foundation-of-benicio-homes-trust-transparency` to `/the-practice`
  - `/journal/Journal004` to `/journal/restoring-heritage-homes-in-goa`
  - The old Vanam PDF URL to the current local Vanam PDF path

### Canonicals, metadata and social sharing

- Added self-referencing canonical URLs to the homepage, Practice, Projects, all six project pages, Journal and the live journal article.
- Added the recommended SEO titles while preserving the site's original visible page copy.
- Added Open Graph title, description, URL, image and type metadata.
- Added Twitter/X large-card metadata.
- Added a generated 1200 × 630 social card endpoint for indexable pages.
- Added `noindex,follow` to Terms and Privacy.

### Sitemap and robots

- The XML sitemap contains exactly 11 indexable URLs:
  - Homepage
  - The Practice
  - Projects
  - Six project pages
  - Journal
  - The live journal article
- Terms and Privacy are excluded from the sitemap.
- `robots.txt` allows public crawling, blocks `/api/`, and declares `https://benicio.co.in/sitemap.xml`.

### Semantic HTML

- Fixed the shared reveal-animation component so its requested HTML element is actually rendered.
- Headings requested as `h1`, `h2` and `h3` now render as headings rather than generic `div` elements.
- Journal body paragraphs now render as `p` elements.
- Journal body section headings render as `h2` elements.
- Legal pages render proper `h1` headings.
- The homepage has accessible H1 text while retaining the visual wordmark.
- Each project page has one semantic H1 using its original visible project name.
- The live journal article has one non-empty H1.

### Journal article URL and schema

- The existing CMS article is available through `/journal/restoring-heritage-homes-in-goa`.
- `/journal/Journal004` permanently redirects to the descriptive URL.
- Added Article metadata and connected the publisher to the main Benicio organization entity.
- Placeholder roles such as “Lead Architect” or “Author Name” are not incorrectly declared as a Person entity.

### Internal linking

- Every project card is a real link.
- All six projects are present in the server-rendered Projects listing, including Zen Villa I.
- This removes the orphan-page issue for `/projects/zen-villa-1`.
- Journal pages retain normal links to their article pages.

### Structured data

- Changed the main business entity from `RealEstateAgent` to `Organization` pending a more specific verified legal classification.
- Added a stable organization ID used by related schema.
- Retained WebSite and Projects/Journal ItemList schema.
- Added Residence and ImageObject information to project pages.
- Added Article and publisher information to the journal article.
- Added the verified S5–S8, Aldeia Aurino, Porvorim office address to the organization schema.
- Added the supplied Facebook page and existing Instagram account to the organization social references.

### Performance and images

- Only the first homepage sequence image is eager/high priority; later sequence images are lazy-loaded.
- Project desktop and mobile hero variants use responsive picture sources, avoiding duplicate desktop/mobile image downloads.
- Project moodboard desktop and mobile variants use one responsive picture instead of duplicate markup.
- Below-the-fold standard project gallery images explicitly use lazy loading and a lower delivery quality.
- The standard project gallery is split into a separate route chunk while retaining its original reveal animation.
- AVIF and WebP image output are enabled.
- Bahnschrift was subset to the character ranges used by the site and converted from a 315 KB TTF to a 53 KB WOFF2 file.
- Image dimensions and responsive `sizes` remain defined through the shared image components.

### Business details and validation

- Updated the footer Facebook link to `https://www.facebook.com/beniciohomesgoa/`.
- Standardized the office unit as S5–S8 in the footer, legal page and organization schema.
- Fixed the missing Nayan Villas hero title caused by an intermediate semantic wrapper change.
- Made Nayan's “Contact Our Team” CTA visually consistent with other project brochure CTAs.
- The production build, TypeScript checks, ESLint and whitespace/diff checks pass.
- Local HTTP validation confirmed both permanent redirects and the 11-URL sitemap.
- Rendered article validation confirmed its canonical, social metadata, non-empty H1 and semantic paragraphs.

## Intentionally restored to the previous visible copy

At the owner's request, all visible copy changes made during this SEO pass were restored. The following recommendations are therefore not currently implemented in the visible page content:

- The recommended visible H1 wording on the homepage, Practice, Projects, Journal and individual project pages.
- The revised visible journal article title and corrected journal numbering.
- The visible project breadcrumb navigation.
- The visible project FAQ sections.
- The added descriptive project H2 and factual summary block.
- Previous and next project navigation.
- The contextual heritage-project sentence added to the journal article.
- The Press and Recognition section on the Practice page.
- The corrections from “Assagaon” to “Assagao” and from “Salvador do mundo” to “Salvador do Mundo.”
- The correction of Vanam's displayed `3408–3658` and `3518–3776` units from square metres to square feet.

The page-level SEO titles, canonical URLs, schema, sitemap and other nonvisual technical SEO work remain in place.

## Remaining work

### Required before launch

- Deploy the validated primary Benicio website project through its existing Vercel connection.
- Verify every redirect and canonical on the production hostname after deployment.
- Run PageSpeed Insights and Lighthouse against mobile and desktop production pages after caches and image optimization are active.
- Fix any production-only performance findings from those tests.

### Missing source content

- Supply the original `/new-blog/` article or a backup/export so it can be migrated to a relevant journal URL. The URL currently returns 404, the content is absent from repository history, and no indexed copy was found.
- Supply the real journal author name, professional designation, publication date and short biography.
- Decide whether the visible journal article title and numbering should remain as before or be corrected to match its new URL and metadata.

### Project facts requiring verification

For each project, supply or confirm:

- Sale status
- Exact locality and region
- Number of villas
- Configuration
- Plot, carpet, built-up and saleable areas with confirmed units
- Private pool and amenities
- Development, architecture and design teams
- Expected possession date
- RERA number or an accurate applicability statement
- Current brochure
- Map, nearby landmarks and travel times
- Three to five approved FAQs

These details should not be inferred from third-party property portals because their information may be inconsistent.

### Brochures

- Review the PDF currently served at `/assets/pdf/vanam-villas.pdf` and confirm that it contains current branding, hostname, spelling and specifications.
- Supply current brochures for projects that do not have one, including Nayan Villas.
- Replace or revise any existing PDF that still contains obsolete branding or factual errors.

### Search-engine and local-business accounts

- Submit `https://benicio.co.in/sitemap.xml` in Google Search Console.
- Submit the sitemap in Bing Webmaster Tools.
- Review indexing, canonical selection and legacy-URL coverage after deployment.
- Update Google Business Profile with the same business name, S5–S8 address, phone, website, category, service area and current project photography.
- Reconcile the same information across social profiles and property portals.

### Content and authority

- Decide whether to reintroduce project breadcrumbs, approved factual content, FAQs and previous/next navigation in a design that matches the existing project pages.
- Decide whether to publish the verified Architectural Digest feature and any confirmed awards in a designed Press and Recognition section.
- Publish useful journal content around buying in Goa, climate-responsive architecture, materials and heritage restoration.
- Build editorial links from reputable architecture, design and property publications.

### Further performance work

- Use production PageSpeed results to identify the remaining largest image and JavaScript costs.
- Review the homepage image loop, which deliberately repeats imagery for continuous scrolling, and reduce its network/DOM cost without changing the interaction.
- Split or defer other page-specific motion code where production coverage shows a measurable saving.
- Remove unused font weights after checking the final rendered typography.
- Replace the generated text-based social cards with approved photo-led 1200 × 630 artwork if desired.
