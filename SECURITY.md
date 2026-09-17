# Security policy

Report security issues privately to the repository owner or the client's nominated
technical contact. Do not open a public issue containing credentials, customer
submissions, infrastructure details, or an exploitable vulnerability.

## Credential rules

- Store production secrets in Hostinger's environment-variable manager.
- Keep local credentials in `.env.local`, which is ignored by Git.
- Never prefix a secret with `NEXT_PUBLIC_`; those values are included in the
  browser bundle.
- Use separate development and production credentials where the provider allows.
- Rotate R2 and Apps Script credentials after the client handoff or any suspected
  disclosure.
- Generate `UPLOAD_API_TOKEN` with `openssl rand -hex 32`; store the value in
  Hostinger and the client's password manager, never in this repository.
- Grant the least access needed and remove accounts when support ends.

If a secret is committed, removing it from the latest file is not sufficient.
Immediately revoke or rotate it, then coordinate repository-history remediation
with the repository owner.
