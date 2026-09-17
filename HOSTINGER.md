# Hostinger deployment guide

## Hosting type

Deploy this project as a **Node.js Web App**, not as a static website. The app
uses Next.js server rendering, incremental revalidation, server actions, and API
routes. Hostinger supports those features on its Node.js web-app hosting.

## Recommended deployment

1. Push this repository to GitHub.
2. In hPanel, choose **Websites → Add Website → Node.js Web App**.
3. Import the GitHub repository and select the production branch.
4. Confirm these settings:
   - Framework: `Next.js`
   - Node.js version: `22.x`
   - Install command: `npm ci`
   - Build command: `npm run build`
   - Start command: `npm run start`
5. Add the environment variables listed below.
6. Deploy and verify `https://YOUR_DOMAIN/api/health` returns a JSON response
   with `"status":"ok"`.
7. Attach `benicio.co.in` as the custom domain and enable Hostinger SSL.

The start script listens on `0.0.0.0` and automatically uses the `PORT` supplied
by Hostinger. Do not hard-code a port or add an Apache rewrite file; Hostinger
manages the reverse proxy for Node.js web apps.

## Environment variables

Copy names from `.env.example` into hPanel's **Environment Variables** screen.
Do not upload `.env.local` or commit secrets to Git.

| Variable | Visibility | Required for |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Public/build-time | Journal and team content |
| `NEXT_PUBLIC_SANITY_DATASET` | Public/build-time | Sanity dataset selection |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Public/build-time | Sanity API requests |
| `NEXT_PUBLIC_CDN_URL` | Public/build-time | Front-end images and videos on the CDN |
| `NEXT_PUBLIC_MUX_HERO_DESKTOP_PLAYBACK_ID` | Public/build-time | Desktop hero video |
| `NEXT_PUBLIC_MUX_HERO_MOBILE_PLAYBACK_ID` | Public/build-time | Mobile hero video |
| `CONTACT_APPS_SCRIPT_URL` | Secret/runtime | Contact form submissions |
| `CONTACT_APPS_SCRIPT_SECRET` | Secret/runtime | Contact form authentication |
| `BROCHURE_APPS_SCRIPT_URL` | Secret/runtime | Brochure form submissions |
| `BROCHURE_APPS_SCRIPT_SECRET` | Secret/runtime | Brochure form authentication |
| `R2_ACCOUNT_ID` | Secret/runtime | Media upload API |
| `R2_ACCESS_KEY_ID` | Secret/runtime | Media upload API |
| `R2_SECRET_ACCESS_KEY` | Secret/runtime | Media upload API |
| `R2_BUCKET_NAME` | Secret/runtime | Media upload API |
| `UPLOAD_API_TOKEN` | Secret/runtime | Authorizing trusted upload clients |
| `R2_PUBLIC_URL` | Server/build-time | Uploaded-media URL and image allowlist |

The repository contains fallback Sanity identifiers, but setting the three
Sanity variables explicitly keeps production configuration intentional. If the
R2 upload API is not used, its variables may be omitted; the route will respond
with `503` instead of preventing the rest of the site from starting.

`NEXT_PUBLIC_*` values and image-host allowlists are resolved by `next build`.
After changing any of those values, trigger a full redeploy rather than only
restarting the process.

### Generate the upload token

Generate a 256-bit token locally:

```bash
openssl rand -hex 32
```

Copy the resulting 64-character value directly into Hostinger's environment
variables as `UPLOAD_API_TOKEN`, then redeploy. Do not add the value to
`.env.example`, GitHub, documentation, chat, or an issue. Store a recovery copy
in the client's password manager and configure the same value in the trusted
CMS or administrative tool that calls the upload endpoint.

That client must send this HTTP header:

```text
Authorization: Bearer YOUR_UPLOAD_API_TOKEN
```

To rotate the token, generate a new one, update both Hostinger and the trusted
client, redeploy, verify an upload, and delete the old password-manager entry.

## Domain and DNS

- Use `benicio.co.in` as the primary domain.
- Point the domain using the records Hostinger shows in hPanel.
- Add `www.benicio.co.in` as an alias. The application permanently redirects it
  to the apex domain while preserving the request path.
- Wait for SSL to become active before testing forms, Mux media, or uploads.

## Post-deployment checks

- `/api/health` returns HTTP 200.
- `/`, `/projects`, `/journal`, and `/the-practice` render without 500 errors.
- `www.benicio.co.in/some-path` redirects to `benicio.co.in/some-path`.
- Contact and brochure forms complete successfully.
- Sanity journal entries load and update after their five-minute revalidation.
- Project images, Mux videos, PDFs, and favicons load over HTTPS.
- `/robots.txt` and `/sitemap.xml` return successfully.

## Troubleshooting

- **Build fails while downloading Google fonts:** redeploy after confirming the
  build environment has outbound network access. Next.js fetches the selected
  Google font files during the build.
- **Remote image is rejected:** confirm `NEXT_PUBLIC_CDN_URL` or `R2_PUBLIC_URL`
  is a complete `https://` URL, then rebuild the app.
- **Forms return an error:** check the four Apps Script variables and confirm the
  deployed scripts accept requests from the production app.
- **Uploads return 401:** send the configured `UPLOAD_API_TOKEN` as a bearer token.
- **Uploads return 503:** configure the upload token and all five R2 variables. A
  partial setup is intentionally treated as unavailable.
- **A public environment change is not visible:** use **Redeploy**, not Restart;
  public variables are compiled into the browser bundle.
- **A route returns 403 after deployment:** redeploy from hPanel so Hostinger can
  regenerate its Node.js routing configuration.
