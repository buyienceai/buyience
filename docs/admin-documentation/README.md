# Buyience Admin Panel Documentation

**Documentation target (marketing website):** `C:\Users\ADMIN\OneDrive\Desktop\buyience`  
**Admin dashboard reference:** `C:\Users\ADMIN\OneDrive\Documents\GitHub\buyience-app-dashboard`  
**Related marketing site (GitHub, more complete lead APIs):** `C:\Users\ADMIN\OneDrive\Documents\GitHub\buyience`

**Generated:** 2026-11-16  
**Scope:** Read-only analysis of source code. No application code, databases, or deployments were modified.

---

## Important architecture fact

Buyience is **not** a single monorepo admin + website CMS.

| Project | Role | Admin panel? |
|---------|------|--------------|
| `buyience-app-dashboard` | Multi-tenant **Nova Core / Buyience admin SPA** | **Yes** — full commerce admin UI |
| Desktop `buyience` | Marketing website (this documentation folder’s home) | **No** |
| GitHub `buyience` | Same marketing site + lead capture APIs (Neon/SMTP) | **No** |

The admin dashboard talks to a **remote multi-tenant REST admin API** (`BASEURL`, typically `.../admin`). Core commerce data (products, orders, users, quotes) lives on that backend — **not** in the marketing website database.

Product app / admin login surface used in marketing CTAs: `https://app.buyience.com` (and `/register`). That is a **link out**, not an embedded admin inside the marketing site.

---

## Document index

| # | File | Contents |
|---|------|----------|
| 1 | [ADMIN_DASHBOARD_OVERVIEW.md](./ADMIN_DASHBOARD_OVERVIEW.md) | Stack, architecture, modules inventory |
| 2 | [ADMIN_FEATURES_DOCUMENTATION.md](./ADMIN_FEATURES_DOCUMENTATION.md) | Per-module purpose, UI, APIs, permissions |
| 3 | [ADMIN_AUTHENTICATION.md](./ADMIN_AUTHENTICATION.md) | Login, tokens, 2FA, middleware |
| 4 | [ADMIN_ROLES_AND_PERMISSIONS.md](./ADMIN_ROLES_AND_PERMISSIONS.md) | RBAC model, resources, fail-open risks |
| 5 | [ADMIN_API_DOCUMENTATION.md](./ADMIN_API_DOCUMENTATION.md) | Local Next APIs + external REST domains |
| 6 | [ADMIN_DATABASE_DOCUMENTATION.md](./ADMIN_DATABASE_DOCUMENTATION.md) | What DB exists where |
| 7 | [DASHBOARD_WEBSITE_INTEGRATION.md](./DASHBOARD_WEBSITE_INTEGRATION.md) | Mapping dashboard ↔ marketing site |
| 8 | [ADMIN_WORKFLOWS.md](./ADMIN_WORKFLOWS.md) | End-to-end admin workflows |
| 9 | [ADMIN_SECURITY_AUDIT.md](./ADMIN_SECURITY_AUDIT.md) | Findings with severity |
| 10 | [SECURITY_BEST_PRACTICES.md](./SECURITY_BEST_PRACTICES.md) | Recommended controls |
| 11 | [ADMIN_PRODUCTION_CHECKLIST.md](./ADMIN_PRODUCTION_CHECKLIST.md) | Go-live checklist |
| 12 | This README | Index and status summary |

---

## Status legend used in these docs

| Status | Meaning |
|--------|---------|
| **Implemented** | Verified in dashboard (or website) source |
| **Backend-dependent** | UI exists; data/authz enforced by remote API (not in this repo) |
| **Partial** | UI or API present but incomplete / mismatched |
| **Missing** | Not found in code |
| **Unverified** | Could not confirm without backend source |
| **Not connected** | Dashboard feature does not integrate with marketing website |

---

## Quick findings

1. **Admin modules live in `buyience-app-dashboard`**, not in the marketing website.
2. **Desktop marketing site** has no admin CMS, no auth, no lead persistence (forms are mock).
3. **GitHub marketing site** adds unauthenticated lead APIs → Neon `lead_submissions` (or `LEADS_BACKEND_URL` proxy) + SMTP.
4. **Blog** on the website is static MDX + `posts.ts` — not managed by the admin dashboard.
5. **No `buyience-app-dashboard` string** appears in either marketing website codebase.
6. Production readiness for admin: **Not Ready** until Critical/High security items are addressed (see security docs).

---

## Rules followed while writing

- Only features verified in source code are documented.
- Secrets and credential **values** are never copied.
- Env vars are listed by **name only**.
- Distinctions between Desktop website, GitHub website, and dashboard are explicit.
- Application code was not modified.
