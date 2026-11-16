# Security Best Practices (Buyience Admin + Marketing)

Recommendations derived from the read-only audit. Apply to dashboard first; marketing leads second.

---

## 1. Authentication & session

1. **Never** put secrets under `NEXT_PUBLIC_*`.
2. Prefer **HttpOnly + Secure + SameSite** session cookies over `localStorage` bearer tokens.
3. Enforce auth in **middleware / BFF / API gateway**, not only React guards.
4. Use short-lived access tokens + refresh rotation (server-side).
5. Keep 2FA for privileged admin roles; protect recovery codes.
6. Remove tokens from URL query strings (SSO/WP embed); use one-time exchange codes.
7. Configure social-login and API base URLs via environment, not hardcoding.

---

## 2. Authorization (RBAC)

1. Backend must authorize **every** mutating request (resource + action + tenant).
2. Frontend checks are UX only.
3. Fail **closed** when permission data is missing.
4. Fix CASL condition bugs; avoid template ACL code in production paths.
5. Audit `superadmin` usage; limit break-glass accounts.
6. Log permission denials without logging secrets.

---

## 3. API & network

1. Close or lock down `/api/image-proxy` (auth + allowlist + SSRF protections).
2. Rate-limit login, password reset, survey, and lead endpoints.
3. Add CAPTCHA/Turnstile on public forms after thresholds.
4. Strict CORS allowlists; never reflect arbitrary `Origin` / `site` query.
5. Disable verbose middleware logging of API keys in production.
6. Prefer `SameSite=Lax` unless cross-site embed truly requires `None` + `Secure`.

---

## 4. XSS & content security

1. Sanitize rich text (Jodit/HTML blocks) on **save and render** (e.g. DOMPurify allowlist).
2. Treat toast/error `message` as text, not HTML.
3. Deploy Content-Security-Policy; avoid `unsafe-inline` where possible.
4. Disallow SVG uploads or sanitize/re-encode before serve.
5. Keep JSON-LD generation from trusted app data only.

---

## 5. File uploads

1. Validate MIME **and** magic bytes server-side.
2. Enforce size limits and virus scanning where appropriate.
3. Store uploads outside executable paths; use signed URLs for download.
4. Strip EXIF if privacy-sensitive.

---

## 6. Marketing website (leads)

1. Use the GitHub lead pipeline (not Desktop mocks) for production.
2. Keep honeypot **and** add rate limits + bot protection.
3. Do not log full PII payloads unnecessarily; restrict SMTP recipients.
4. If proxying via `LEADS_BACKEND_URL`, authenticate the proxy (shared secret / mTLS) — currently Unverified.
5. Blog remains git-based — protect repo access (branch protection, reviews).

---

## 7. Secrets management

1. Rotate any secret that was ever prefixed `NEXT_PUBLIC_` or logged.
2. Use platform secret stores (Vercel/GitHub Environments).
3. Block `LOCAL_DEV_XAPIKEY` / `XAPIKEY` in production builds (dashboard already documents this risk).
4. Ensure `NEXT_PUBLIC_SKIP_SUBSCRIPTION_CHECKS` is unset/false in production.

---

## 8. Dependency & ops hygiene

1. Remove unused auth template dependencies (`jsonwebtoken` if unused).
2. Keep Next.js and Axios updated.
3. Enable Sentry with scrubbing for tokens/cookies.
4. Separate staging tenants from production; never reuse prod API keys in preview.

---

## 9. Security testing cadence

1. Quarterly dependency audit (`npm audit` / Dependabot) — without publishing secrets.
2. Periodic review of permission matrix vs UI routes.
3. Pen-test focus: SSRF proxy, XSS in CMS, authz IDOR on admin API (backend).
4. Re-verify WordPress embed origins allowlist when partners change.
