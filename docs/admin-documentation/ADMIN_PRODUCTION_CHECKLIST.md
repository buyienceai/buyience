# Admin Production Checklist

Use before promoting dashboard or marketing lead intake to production.

Legend: `[ ]` todo · `[x]` done · `N/A` not applicable

---

## A. Architecture clarity

- [ ] Confirmed admin runs on `app.buyience.com` (dashboard), not inside marketing site
- [ ] Marketing CTAs point to correct app/register URLs per environment
- [ ] Documented which Neon databases are used (survey vs leads vs commerce)
- [ ] Backend admin API base URLs set via env (`BASEURL`, `CENTRALURL`, `VENDORURL`)

---

## B. Dashboard authentication

- [ ] No secrets named `NEXT_PUBLIC_*`
- [ ] Rotated any previously public-prefixed JWT secrets
- [ ] Session strategy reviewed (prefer HttpOnly cookies)
- [ ] Tokens removed from query strings (SSO/WP)
- [ ] Middleware or gateway enforces auth on `/apps` and `/dashboards`
- [ ] 2FA enabled for privileged roles
- [ ] Login rate limiting / lockout verified on **backend**
- [ ] Social login URL is environment-correct (not hardcoded prod host in staging)

---

## C. Authorization

- [ ] CASL grant-all bug fixed or CASL unused in prod paths
- [ ] Permission helper fails closed
- [ ] Backend denies unauthorized mutations (spot-checked)
- [ ] Superadmin accounts inventoried
- [ ] Role templates reviewed for least privilege

---

## D. Dangerous endpoints

- [ ] `/api/image-proxy` disabled, authenticated, or SSRF-hardened
- [ ] Survey endpoint rate-limited / protected if public
- [ ] Template CSV endpoints acceptable as public or locked down
- [ ] Production logs scrub API keys and tokens

---

## E. XSS / uploads

- [ ] HTML sanitization on store pages / email previews
- [ ] CSP deployed on admin host
- [ ] SVG upload policy decided and enforced server-side
- [ ] Server-side file validation in place

---

## F. Cookies / CORS / embed

- [ ] API-key cookie flags reviewed (`HttpOnly`, `Secure`, `SameSite`)
- [ ] WP embed origin allowlist strict
- [ ] `frame-ancestors` / CORS not reflecting arbitrary query params
- [ ] `NEXT_PUBLIC_SKIP_SUBSCRIPTION_CHECKS` false/unset in production

---

## G. Marketing website (Desktop docs target)

- [ ] Decision: keep Desktop as design snapshot **or** sync to GitHub lead stack
- [ ] If capturing leads in production: use GitHub implementation (APIs + Neon + SMTP)
- [ ] Lead rate limiting + CAPTCHA added
- [ ] `LEADS_BACKEND_URL` (if used) authenticated
- [ ] SMTP credentials in secret store; test failure modes
- [ ] `SEO_INDEXING=true` only on real production host
- [ ] Blog publish process (MDX + `posts.ts`) documented for editors
- [ ] No admin secrets in marketing `.env`

---

## H. Observability & ops

- [ ] Sentry/PostHog configured without leaking PII/tokens
- [ ] Uptime monitor for `status.buyience.com` / app health
- [ ] Backup/retention policy for Neon lead + survey tables
- [ ] On-call runbook for auth outages and API key rotation

---

## I. Go / No-Go

| Gate | Required for production admin? |
|------|--------------------------------|
| Critical findings C1–C3 resolved | **Yes** |
| High findings H1–H6 resolved or explicitly accepted with compensating controls | **Yes** |
| Backend authz verification completed | **Yes** |
| Marketing lead abuse controls (if leads live) | **Yes** |

**Current assessment (2026-11-16):** **No-Go** for production admin hardening; marketing GitHub leads are usable with residual Medium risk until rate limits/CAPTCHA exist.

---

## Sign-off

| Role | Name | Date | Decision |
|------|------|------|----------|
| Eng lead | | | |
| Security | | | |
| Product | | | |
