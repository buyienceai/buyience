# Admin Features Documentation

Source of truth: `buyience-app-dashboard` pages + `src/query-config/services/*`.  
All mutating commerce data is **Backend-dependent** unless noted.

For each module: purpose, how it works, dashboard functionality, related APIs (relative to admin `BASEURL` unless noted), database interaction, validation, permissions, file paths.

---

## 1. Dashboard / analytics

| Field | Detail |
|-------|--------|
| **Purpose** | Operational KPIs: revenue, operations, performance |
| **How it works** | Pages call analytics endpoints; layout prefs saved per user |
| **Dashboard functionality** | Ecommerce / platform / sales / AI home dashboards |
| **APIs** | `GET /dashboard`, `/dashboard-analytics`, `/revenue-analytics`, `/operations-analytics`, `/performance-analytics`, `/user-dashboard-layouts/:key` |
| **Database** | Remote (Unverified). Local: none |
| **Validation** | N/A (read-heavy) |
| **Permissions** | Loaded via `GET /dashboard` → Redux |
| **Paths** | `src/pages/dashboards/*`, `GlobalService.tsx`, `DashboardLayoutService.tsx` |

---

## 2. Product management (catalogue)

| Field | Detail |
|-------|--------|
| **Purpose** | Create/edit products, variants, images, status |
| **How it works** | List → add/edit forms → API `add-edit` / status / soft-hard delete |
| **Dashboard functionality** | Product list, add, edit `[id]`, variant editors, bulk template download |
| **APIs** | Product add-edit, delete, restore, status, images, variants, analytics; local `GET/POST /api/products/template` |
| **Database** | Remote |
| **Validation** | Form-level + API errors; template helper is local Next API |
| **Permissions** | Resource `Products` / `Catalogue` (read/write) |
| **Paths** | `src/pages/apps/catalogue/product/*`, `ProductService.tsx` |

---

## 3. Category / brand / tags / filters

| Field | Detail |
|-------|--------|
| **Purpose** | Taxonomy for catalogue |
| **Dashboard functionality** | CRUD list + add + edit routes under `catalogue/category|brand|tags|filter` |
| **APIs** | `add-edit-*`, `delete-*`, `update-*-status`, assign products, analytics |
| **Database** | Remote |
| **Permissions** | Catalogue-related resources |
| **Paths** | Matching pages + `CategoryService` / `BrandService` / tags/filter services |

---

## 4. Media library & banners

| Field | Detail |
|-------|--------|
| **Purpose** | Media list; storefront sliders/banners |
| **APIs** | `GET /media`; banner add-edit/delete/status/reorder |
| **Database** | Remote |
| **Validation** | Client MIME/size; SVG allowed in uploaders (security risk — see audit) |
| **Paths** | `catalogue/media`, `apps/media/banner/*`, `MediaService.tsx`, `BannerService.tsx` |

---

## 5. Product configurator (CPQ)

| Field | Detail |
|-------|--------|
| **Purpose** | Configurable products / templates / conflicts |
| **APIs** | `/product-configuration*`, `/templates/*`, `/conflicts/:id` |
| **Paths** | `src/pages/apps/product-configurator/*`, `ConfiguratorService.tsx` |
| **Permissions** | `Product Configurations` |
| **Website link** | Marketing page `/cpq-configurator` on buyience.com — **Not connected** to this admin module |

---

## 6. Order management

| Field | Detail |
|-------|--------|
| **Purpose** | Orders, drafts, abandoned checkouts, invoices, shipping labels, returns |
| **Dashboard functionality** | Create/edit/preview, bulk upload, Stripe/PayPal pages, abandoned, returns |
| **APIs** | `/orders*`, `/add-edit-order`, `/update-order-status`, `/cart*`, `/abandoned-cart*`, `/stripe-checkout*`, shipping-label analytics, return-requests; local `/api/orders/template` |
| **Database** | Remote |
| **Permissions** | `Orders`, `Abandoned checkout`, `Shipping label`, `Returns` |
| **Paths** | `src/pages/apps/orders/**`, `OrderServices.tsx`, `ReturnService.ts` |

---

## 7. Quotes / RFQ

| Field | Detail |
|-------|--------|
| **Purpose** | B2B quoting, re-quote, counter-offers, RFQ invitations, DSR chats |
| **APIs** | `/quotes*`, `/add-quotes`, `/re-quotes`, `/rfq-*`, assignees, reprice, AI context |
| **Permissions** | `Quotes` with scopes `all` / `assigned` / `none` (`src/utils/quotes/quoteAccess.ts`) |
| **Paths** | `src/pages/apps/quotes/**`, `QuotesServices.tsx`, `QuoteAiService.ts`, `RfqInvitationService.ts` |
| **Website** | Marketing `/ai-quote-engine`, `/digital-sales-room` — **Not connected** |

---

## 8. Inventory / suppliers / transfers

| Field | Detail |
|-------|--------|
| **Purpose** | Stock, warehouses, POs, suppliers, transfer orders |
| **APIs** | `/inventory*`, `/inventory/purchase*`, `/supplier/*`, `/inventory-transfer*` |
| **Permissions** | `Inventory` |
| **Paths** | `src/pages/apps/inventory/**`, `InventoryServices.tsx` |

---

## 9. Customer management

| Field | Detail |
|-------|--------|
| **Purpose** | B2B customers, groups, approval, addresses, credit |
| **APIs** | `/users*`, delete/restore customer, analytics, groups; vendor register via `VENDORURL` |
| **Permissions** | `Customers` |
| **Paths** | `src/pages/apps/customers/**`, `CustomerService.tsx` |

---

## 10. Discounts & coupons

| Field | Detail |
|-------|--------|
| **Purpose** | Coupons and advanced discounts |
| **APIs** | `/add-edit-coupon`, `/add-edit-discount`, `/advanced-discounts*` |
| **Partial** | Nav link `/apps/discount/b2b/bulkdiscount` has no page folder |
| **Paths** | `apps/discount/b2c/coupon/*`, `apps/discounts/*`, `CouponService.tsx`, `DiscountService.tsx` |

---

## 11. Floor margin (margin guardrails)

| Field | Detail |
|-------|--------|
| **Purpose** | Margin floor settings, overrides, evaluate |
| **APIs** | Floor-margin setting / overrides / evaluate (`FloorMarginService.tsx`) |
| **Permissions** | `Floor Margin` |
| **Paths** | `src/pages/apps/settings/floor-margin` |
| **Website** | Marketing blog/pages about margin — **Not connected** |

---

## 12. User management

| Field | Detail |
|-------|--------|
| **Purpose** | Admin/vendor users for the tenant |
| **APIs** | `/all`, `/admin-register`, `/admin-edit/:id`, `/admin-delete/:id`, `/update-admin-status`, `/admin-analytics`, vendor register/edit |
| **Validation** | yup on add-user drawer; login/register forms |
| **Permissions** | `User` |
| **Paths** | `src/pages/apps/users/**`, `user-management/**`, `RolePermissionService.tsx` |

---

## 13. Role & permission management

| Field | Detail |
|-------|--------|
| **Purpose** | Define roles and assign permissions |
| **APIs** | `/role_permission`, `/roles`, `/roles/:id/update`, `/assign-role`, `/assign-roles-users/:id`, `/delete-role-permissions` |
| **Database** | Remote |
| **Paths** | `apps/users/roles/**`, `views/apps/roles/*` |
| **Notes** | Operational gates use Redux permissions from `/dashboard`, not CASL (CASL has a known bug — see security doc) |

---

## 14. Content / storefront CMS (tenant storefront — not buyience.com)

| Field | Detail |
|-------|--------|
| **Purpose** | Menus, policies/pages, homepage sections, theme presets, email templates |
| **APIs** | Menu CRUD, pages/policies, homepage-sections, style-presets, email templates |
| **Paths** | `apps/settings/Menu`, `store-pages/*`, `theme-configuration`, `settings/email/*` |
| **Blog** | **Missing** — no blog module |
| **Buyience.com marketing pages** | **Not connected** — managed as React/MDX in marketing repo |

---

## 15. Website settings (tenant)

| Area | Paths | APIs / services |
|------|-------|-----------------|
| Store profile | `/store-settings` | `GeneralService.tsx` |
| Markets | `/apps/settings/market/*` | `MarketService.tsx` |
| Payments | `/apps/settings/payment/*` | `PaymentService.tsx` |
| Payment terms | `/apps/settings/payment-terms/*` | `PaymentTermsService.tsx` |
| Tax | `/tax-settings/*` | `TaxServices.tsx` |
| Shipping | `/apps/settings/shipping/*` | `ShippingService.tsx` |
| Price/stock visibility | `/pricing-visibility` | `StockVisibilityService.ts` |
| Quote settings | `/apps/settings/quote-settings` | Quotes services |
| Domain | `/apps/settings/domain` | Domain UI |
| SEO | redirects/robots/scripts | `SEOService.tsx` |

---

## 16. Integrations

| Field | Detail |
|-------|--------|
| **Purpose** | Connect GA, Ads, GTM, Hotjar, Clarity, Klaviyo, Brevo, IndexNow, reCAPTCHA, Shiprocket, Shopify, Tally, email |
| **Paths** | `src/pages/apps/integrations/*` |
| **Services** | `AnalyticsService.tsx`, `ShopifyService.tsx`, `TallyService.tsx`, etc. |
| **Permissions** | `Integration` / `Integrations` |

---

## 17. Receivables / finance / billing

| Field | Detail |
|-------|--------|
| **Receivables** | Invoices, payments, credit — `apps/receivables/*`, `ReceivablesService.tsx` |
| **Finance** | `apps/finance-management/*` |
| **Billing usage** | `apps/billing-usage/*` |
| **Zoho subscription** | `ZohoService.tsx`, account choose-plan, billing callbacks |

---

## 18. Survey (BVM26)

| Field | Detail |
|-------|--------|
| **Purpose** | Public research survey |
| **APIs** | Local `POST /api/survey/bvm26` |
| **Database** | Local Neon `bvm26_survey_responses` (+ CSV backup) |
| **Auth** | Unauthenticated |
| **Paths** | `src/pages/survey/*`, `src/pages/api/survey/bvm26.ts`, `src/lib/survey/bvm26Db.ts` |

---

## 19. Features commonly expected but **Missing** in dashboard

| Expected feature | Status |
|------------------|--------|
| Blog management for buyience.com | Missing |
| Editing Desktop/GitHub marketing site content | Missing / Not connected |
| In-repo commerce database admin | Missing (remote API only) |
| Full B2B bulk discount page (nav only) | Partial / Missing page |

---

## 20. Marketing website “admin-like” surfaces (Desktop)

| Feature | Status on Desktop `buyience` |
|---------|------------------------------|
| Blog CMS | Missing — static MDX |
| Lead admin UI | Missing |
| Lead APIs | Missing (mock forms) |
| Product/order admin | Missing — marketing pages only |

GitHub `buyience` adds lead **APIs** but still **no admin UI** for viewing leads.
