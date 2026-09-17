# Client handoff checklist

This document covers operational ownership. Do not put credentials or recovery
codes in this repository; exchange them through a password manager.

## Ownership matrix

Before the agency removes its access, confirm that the client controls each item:

| System | What must be transferred or recreated |
| --- | --- |
| GitHub | Repository ownership, administrator access, branch rules, and recovery owners |
| Hostinger | Hosting subscription, deployment, environment variables, domain, DNS, SSL, billing, and alerts |
| Sanity | Project ownership, dataset access, CORS origins, and billing |
| Cloudflare R2/CDN | Account, bucket, API credentials, upload token, public domain, CORS, and billing |
| Mux | Playback assets, allowed domains or signing settings, and billing |
| Google Apps Script | Script ownership, deployments, linked Sheets, notification recipients, and secrets |
| Google Analytics | GA4 property ownership and administrator access |
| Domain email/social | `info@benicio.co.in`, WhatsApp number, Instagram, and Facebook links |

Rotate server-side credentials after ownership moves. Update Hostinger variables,
redeploy, test the affected integration, and then revoke the agency credential.

## GitHub repository transfer

Current repository: `Izartstudio/Benicio-Homes`.

Preferred destination: a client-owned GitHub organization, with at least two
client organization owners. The destination must not already contain a repository
named `Benicio-Homes` or a fork in the same network.

1. Ask the client to create its GitHub organization and invite the transferring
   agency user with permission to create repositories.
2. Record current collaborators, deploy keys, webhooks, branch protection,
   secrets, Actions variables, and installed GitHub Apps.
3. Ensure the client has accepted access to every external service in the
   ownership matrix.
4. In GitHub, open the repository and go to **Settings → General → Danger Zone →
   Transfer ownership**.
5. Enter the client organization, confirm `Benicio-Homes`, and complete the
   transfer. An agency organization owner may need to perform or approve it.
6. Have a client owner verify repository administration, clone/push access, and
   Hostinger's GitHub connection before anyone removes agency access.
7. Update local clones:

   ```bash
   git remote set-url origin https://github.com/CLIENT_ORG/Benicio-Homes.git
   git remote -v
   ```

8. Reconnect Hostinger to the transferred repository if its GitHub authorization
   does not follow the transfer, then run a production redeploy.
9. Keep the agency as an outside collaborator only if the support agreement
   requires it. Otherwise remove agency users, teams, deploy keys, and tokens.

GitHub redirects the old repository URL after a transfer, but do not recreate a
repository at the old `Izartstudio/Benicio-Homes` path because that removes the
redirect.

## Final acceptance test

- Run `npm run check` from a clean clone.
- Deploy the exact `main` commit to Hostinger.
- Complete every check in `HOSTINGER.md`.
- Submit both forms and verify their destination Sheets/notifications.
- Confirm Sanity publishing, R2/CDN media, Mux video, and Analytics access using
  client-owned accounts.
- Record the accepted commit SHA and handoff date outside this repository.
- Only after acceptance, rotate credentials and remove obsolete agency access.

## Known operational notes

- This is a server-backed Next.js application, not a static export.
- `NEXT_PUBLIC_*` changes require a rebuild and redeploy.
- The repository contains large, design-led media assets. Use GitHub deployment
  or a clean ZIP excluding `node_modules`, `.next`, `.git`, and `.env.local`.
- `/api/health` provides a non-secret deployment health check.
