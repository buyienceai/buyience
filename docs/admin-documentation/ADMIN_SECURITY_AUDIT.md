# Admin Security Audit (Read-Only)

**Date:** 2026-11-16  
**Scope:** Dashboard frontend + local Next APIs; Desktop & GitHub marketing sites.  
**Out of scope:** Destructive testing; remote admin API source (authorization there is **Unverified**).  
**Secrets:** Values never recorded. Risky **names** only.

---

## Production readiness

| System | Verdict |
|--------|---------|
| Dashboard (`buyience-app-dashboard`) | **Not Ready** |
| Desktop marketing website | **Not Ready** for lead capture (mock forms); low admin attack surface |
| GitHub marketing website | **Partially Ready** for public marketing + leads (needs abuse controls) |
| Combined admin + live intake | **Not Ready** until Critical/High items fixed |

---

## Critical

### C1 — JWT secrets named `NEXT_PUBLIC_*`

| | |
|--|--|
| **Severity** | Critical |
| **Affected** | Dashboard `.env` key names: `NEXT_PUBLIC_JWT_SECRET`, `NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET` |
| **Explanation** | `NEXT_PUBLIC_` marks values as browser-safe in Next.js. Secrets must never use this prefix. |
| **Evidence** | Env key names present; no `src/` references found (may not be inlined today) — naming remains a critical misconfiguration. |
| **Fix** | Rename to server-only names; rotate if ever deployed; never prefix secrets with `NEXT_PUBLIC_`. |

### C2 — Open SSRF via image proxy

| | |
|--|--|
| **Severity** | Critical |
| **Affected** | `src/pages/api/image-proxy.ts` |
| **Explanation** | Unauthenticated GET fetches arbitrary `?url=` (image content-type check only). |
| **Evidence** | No host allowlist, no auth, no private-IP block observed. |
| **Fix** | Auth + allowlist + block link-local/private/metadata IPs + size/timeouts; or remove. |

### C3 — Access tokens in `localStorage` / JS-readable cookies

| | |
|--|--|
| **Severity** | Critical |
| **Affected** | `AuthContext.tsx`, wordpress/SSO helpers, `bearerToken` utilities, `adminAuthCookie.ts` |
| **Explanation** | XSS can exfiltrate bearer tokens → account takeover. |
| **Evidence** | Tokens written to `localStorage` and non-HttpOnly cookies via `js-cookie` / `document.cookie`. |
| **Fix** | Prefer HttpOnly Secure SameSite session cookies; short-lived access tokens; harden XSS controls. |

---

## High

### H1 — Client-only route guards; middleware is not auth

| | |
|--|--|
| **Severity** | High |
| **Affected** | `middleware.ts`, `AuthGuard.tsx`, `_app.tsx` |
| **Explanation** | Middleware sets tenant API keys / embed headers; does not verify user session for `/apps/*`. |
| **Fix** | Server/edge session enforcement; treat client guards as UX only. |

### H2 — Tenant API key cookie not HttpOnly + logged

| | |
|--|--|
| **Severity** | High |
| **Affected** | `middleware.ts`, local API key helpers |
| **Explanation** | API key in JS-readable cookie; middleware logs include key material patterns. |
| **Fix** | Prefer HttpOnly; never log secrets; tighten SameSite; strip prod logs. |

### H3 — CASL ACL always grants manage-all

| | |
|--|--|
| **Severity** | High |
| **Affected** | `src/configs/acl.ts` |
| **Explanation** | `type === 'admin' \|\| 'vendor'` — `'vendor'` is always truthy. |
| **Fix** | `type === 'admin' \|\| type === 'vendor'`; do not use CASL until fixed. |

### H4 — Permission helper fail-open

| | |
|--|--|
| **Severity** | High |
| **Affected** | `src/store/apps/permissions/index.ts` |
| **Explanation** | Missing resource in payload → allow (`true`). |
| **Fix** | Fail closed; rely on backend denial for mutations. |

### H5 — Tokens / SSO in URL query

| | |
|--|--|
| **Severity** | High |
| **Affected** | `wordpress-iframe-auth.ts`, `sso-handler.ts`, middleware WP helpers |
| **Explanation** | Tokens in query leak via Referer, history, logs. |
| **Fix** | One-time codes; origin allowlists; drop legacy query tokens. |

### H6 — Hardcoded social-login host

| | |
|--|--|
| **Severity** | High |
| **Affected** | `src/configs/auth.ts` |
| **Explanation** | Social login posts to fixed `buyience.co` host. |
| **Fix** | Environment-specific URL configuration. |

---

## Medium

| ID | Finding | Affected | Fix |
|----|---------|----------|-----|
| M1 | XSS via unsanitized HTML (Jodit / `dangerouslySetInnerHTML`) | Editor + store page forms, toasts | DOMPurify/allowlist on save+render; CSP |
| M2 | SVG uploads allowed | Upload components | Disallow or sanitize SVG |
| M3 | CSRF / `SameSite=None` cookies | Auth + API-key cookies | Prefer Lax/Strict; CSRF tokens if cookie auth |
| M4 | Lead APIs unauthenticated (honeypot only) | GitHub `lib/leads/handler.ts` | Rate limit + CAPTCHA/Turnstile |
| M5 | Desktop forms mock-only | Desktop contact/partner forms | Port GitHub lead stack before production |
| M6 | Survey API unauthenticated | `/api/survey/bvm26` | Auth or signed token + rate limit |
| M7 | No login brute-force controls in SPA | `AuthContext.handleLogin` | Server lockout/CAPTCHA (backend verify) |
| M8 | WP embed CORS from `site` query | `middleware.ts` | Strict origin allowlist |

---

## Low / Info

| ID | Finding | Notes |
|----|---------|-------|
| L1 | Unauthenticated CSV templates | Low sensitivity |
| L2 | Website JSON-LD `dangerouslySetInnerHTML` | App-controlled data — generally OK |
| L3 | Unused `jsonwebtoken` dependency | Cleanup |
| L4 | `NEXT_PUBLIC_SKIP_SUBSCRIPTION_CHECKS` | Ensure false in prod |
| L5 | Upload validation client-side only | Backend must enforce |

---

## Checklist coverage summary

| Control | Dashboard | GitHub website | Desktop website |
|---------|-----------|----------------|-----------------|
| Auth tokens / guards | Weak (client + LS) | N/A | N/A |
| Secret exposure naming | Critical risk | Clean `.env.example` | No `.env.example` |
| XSS | Medium–High (editors) | Low (JSON-LD) | Low |
| CSRF | Medium | N/A for leads | N/A |
| IDOR / RBAC UI | High defects | N/A | N/A |
| Rate limiting | Missing (client) | Missing on leads | N/A |
| SSRF | Critical (image-proxy) | Absent | Absent |
| File upload | Client-only + SVG | N/A | N/A |

---

## Missing protections (typical production admin)

- Server-side session enforcement for all `/apps` and `/dashboards` routes  
- HttpOnly sessions; no long-lived tokens in `localStorage`  
- Login rate limiting / lockout / bot protection  
- Strict CORS and `frame-ancestors` allowlists  
- CSP + HTML sanitization for rich text  
- SSRF-safe media strategy  
- Lead/survey abuse controls  
- Confirmed **backend** authorization on every mutating endpoint (Unverified here)  
- Security headers (CSP, HSTS) on admin + marketing hosts  

---

## Related docs

- [SECURITY_BEST_PRACTICES.md](./SECURITY_BEST_PRACTICES.md)  
- [ADMIN_PRODUCTION_CHECKLIST.md](./ADMIN_PRODUCTION_CHECKLIST.md)  
- Dashboard upstream: `buyience-app-dashboard/docs/SECURITY.md`
