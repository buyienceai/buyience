# Dashboard ↔ Website Integration Map

**Dashboard:** `buyience-app-dashboard`  
**Website (docs home):** Desktop `buyience`  
**Website (leads-capable):** GitHub `buyience`

---

## 1. Executive summary

| Question | Answer |
|----------|--------|
| Does the marketing website embed the admin dashboard? | **No** |
| Does the dashboard manage buyience.com blog/MDX? | **No** |
| Shared database between dashboard and marketing site? | **No** (only accidental shared Neon *provider* possible via separate env URLs) |
| How do users reach the product admin? | External link to `https://app.buyience.com` |
| Is `buyience-app-dashboard` referenced in website code? | **Not found** |
| Lead forms → dashboard CRM? | **Not verified / Not connected** in code |

**Integration status overall: Mostly Not Connected.** The sites share brand and product *messaging*; operational admin is a separate app + remote API.

---

## 2. Connection points that *do* exist

| Connection | Dashboard | Website | Status |
|------------|-----------|---------|--------|
| Marketing CTA → app | N/A | Links to `https://app.buyience.com` / `/register` | Implemented (outbound link) |
| Status page | N/A | Footer may link `https://status.buyience.com/` (GitHub site) | Website-only |
| Optional lead proxy | N/A | GitHub: `LEADS_BACKEND_URL` → `{base}/api/leads/{path}` | Partial — backend host Unverified as dashboard |
| WordPress / UCC | `NEXT_PUBLIC_UCC_URL`, WP embed auth | Marketing copy / WP plugin pages | Product integration, not buyience.com CMS |
| Social login host | Hardcoded `buyience.co` social-login | N/A | Dashboard-only |

---

## 3. Feature mapping table

| Dashboard module | Dashboard paths | Related API | Website functionality | DB | Data flow | Integration status |
|------------------|-----------------|-------------|----------------------|----|-----------|-------------------|
| Catalogue / products | `/apps/catalogue/product/*` | Admin product APIs | Marketing pages (`/nova-core`, etc.) | Remote | None to website | **Not connected** |
| Categories / brands | `/apps/catalogue/*` | Taxonomy APIs | None | Remote | None | **Not connected** |
| Orders | `/apps/orders/*` | Order APIs | Marketing `/order-management` | Remote | None | **Not connected** |
| Quotes / CPQ | `/apps/quotes/*`, configurator | Quote/config APIs | Marketing `/ai-quote-engine`, `/cpq-configurator` | Remote | None | **Not connected** |
| Inventory | `/apps/inventory/*` | Inventory APIs | Marketing `/inventory-management` | Remote | None | **Not connected** |
| Customers | `/apps/customers/*` | Customer APIs | None (leads ≠ customers) | Remote | None | **Not connected** |
| Floor margin | `/apps/settings/floor-margin` | Floor margin APIs | Blog/marketing content only | Remote | None | **Not connected** |
| Store pages / banners / menus | `/apps/settings/store-pages`, banners | Storefront CMS APIs | **Tenant storefront**, not buyience.com | Remote | Storefront theme | **Connected to tenant storefront (Unverified host); Not connected to buyience.com** |
| Users / roles | `/apps/users/*` | Admin user APIs | None | Remote | None | **Not connected** |
| Integrations | `/apps/integrations/*` | Analytics/Shopify/… | None on marketing site | Remote | None | **Not connected** |
| Blog | **Missing** | — | Static MDX + `posts.ts` | Files | Deploy git | **Website-only; dashboard Missing** |
| Media library | `/apps/catalogue/media` | `/media` | `public/` static assets | Remote vs files | Separate | **Not connected** |
| Analytics (admin) | `/dashboards/*` | Analytics APIs | Vercel Analytics on GitHub site | Separate | Separate | **Not connected** |
| Survey BVM26 | `/survey` | `/api/survey/bvm26` | None | Neon survey table | Dashboard-only | **Dashboard-only** |
| Marketing leads | — | — | Desktop mock / GitHub `/api/leads/*` | Neon leads (GitHub) | Form → API → DB/SMTP | **Website-only; Not connected to dashboard** |
| Geo currency | — | — | `/api/geo-currency` | None | Headers → currency | **Website-only** |

---

## 4. Content management comparison

| Content type | Managed by dashboard? | Managed by marketing repo? |
|--------------|----------------------|----------------------------|
| Tenant ecommerce storefront pages | Yes (store-pages, menus, theme) | No |
| buyience.com marketing pages | No | Yes (`app/**` React) |
| buyience.com blog | No | Yes (`content/blog/*.mdx` + `posts.ts`) |
| Legal pages (terms/privacy) | Tenant policy settings exist for storefront | Marketing legal routes exist separately |

---

## 5. Desktop vs GitHub website (integration readiness)

| Capability | Desktop (docs target) | GitHub |
|------------|----------------------|--------|
| Marketing pages | Yes | Yes |
| Blog MDX | Yes (fewer posts) | Yes |
| Lead APIs + Neon + SMTP | **Missing** | Implemented |
| `LEADS_BACKEND_URL` proxy | Missing | Implemented |
| Admin/CMS | Missing | Missing |
| Link to `app.buyience.com` | Yes | Yes |

If production marketing lead capture is required, **GitHub `buyience` is the verified implementation**, not Desktop.

---

## 6. Data-flow diagrams

### A. Admin commerce (dashboard)

```
Admin user → Dashboard SPA → BASEURL admin API → Commerce DB (remote)
```

### B. Marketing lead (GitHub website only)

```
Visitor → Form → POST /api/leads/{type}
                ├─(optional)→ LEADS_BACKEND_URL proxy
                └─(default)→ Neon lead_submissions + SMTP notify
```

### C. Blog publish

```
Editor → git commit MDX/posts.ts → deploy website
(No dashboard step)
```

---

## 7. Unverified / future integration notes

These are **not** implemented in the inspected website code:

- Pushing marketing leads into dashboard Customers
- Editing buyience.com blog from dashboard
- SSO from marketing site into admin
- Shared session cookie across buyience.com and app.buyience.com

Anything claimed in sales materials beyond the above must be treated as **Unverified** until backend/product code proves it.
