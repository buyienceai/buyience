# Admin Workflows

Workflows below are inferred from dashboard UI routes + services. Backend side effects are **Backend-dependent**.

---

## 1. Tenant admin login

1. User opens tenant subdomain (or local with `LOCAL_DEV_XAPIKEY`).
2. Middleware resolves tenant → sets `x-api-key-*` cookie.
3. User submits credentials on `/login`.
4. Optional 2FA challenge.
5. Tokens stored; `GET /get-user` + `GET /dashboard` load profile/permissions.
6. `AccessControlGuard` may redirect to onboarding or payment-expiry if subscription state requires it.
7. User lands on dashboard home / configured start route.

**Paths:** `middleware.ts`, `AuthContext.tsx`, `pages/login/`, `AccessControlGuard`

---

## 2. Invite / create team user + assign role

1. Superadmin/admin with `User` write opens `/apps/users` or user-management.
2. Create via `/apps/users/add-new` → `admin-register` (or vendor register).
3. Open roles UI → create/edit role permissions (`/role_permission`, `/roles`).
4. Assign role to user (`assign-role`).
5. New user logs in; permissions come from `GET /dashboard`.

**Paths:** `pages/apps/users/**`, `RolePermissionService.tsx`

---

## 3. Catalogue: add product → publish

1. `/apps/catalogue/product` → Add product.
2. Fill details, images, variants (variant sub-routes).
3. Optionally assign category/brand/tags/filters.
4. Update status (active/inactive) via status API.
5. Storefront consumption is remote storefront — **not** buyience.com.

**Paths:** `pages/apps/catalogue/product/**`, `ProductService.tsx`

---

## 4. Quote-to-order (B2B)

1. Create quote `/apps/quotes/quote/new-quote`.
2. Configure lines / pricing; margin floor may evaluate (`FloorMarginService`).
3. Preview PDF / send; optional RFQ invitation or chat.
4. Counter-offers / re-quote flows as needed.
5. Convert/accept path continues into order flows (backend-dependent).
6. Order appears under `/apps/orders/order`.

**Paths:** `pages/apps/quotes/**`, `pages/apps/orders/**`, `QuotesServices.tsx`, `OrderServices.tsx`

---

## 5. Draft order → payment

1. Create draft order routes under `/apps/orders/draft-order` or draft order pages.
2. Preview / send.
3. Checkout may use Stripe/PayPal pages under orders.
4. Success/failure pages finalize UX.

**Paths:** `pages/apps/orders/draft-order/**`, Stripe/PayPal page components

---

## 6. Inventory receive / transfer

1. Manage suppliers → create PO (`/apps/inventory/purchase-orders`).
2. Receive stock (`/apps/inventory/recieve/[id]`).
3. Transfer between locations (`transfer-order` routes).
4. Inventory list/detail reflects updates via inventory APIs.

**Paths:** `pages/apps/inventory/**`, `InventoryServices.tsx`

---

## 7. Margin floor override

1. Configure floors at `/apps/settings/floor-margin`.
2. During quote/order pricing, evaluate against floor.
3. Below-floor path depends on backend enforcement + UI approval (Backend-dependent).
4. Overrides managed via floor-margin override APIs.

**Paths:** `FloorMarginService.tsx`, floor-margin settings page

---

## 8. Storefront content update (tenant)

1. Edit menus (`/apps/settings/Menu`).
2. Edit store pages / homepage sections (`store-pages`).
3. Upload banners (`/apps/media/banner`).
4. Adjust theme presets (`theme-configuration`).
5. Changes apply to **tenant storefront**, not the marketing website.

---

## 9. Integration setup (example: analytics)

1. Open `/apps/integrations/...`.
2. Enter credentials/settings → store via analytics/integration APIs.
3. Scripts may also be managed under SEO script settings.

---

## 10. Billing / subscription recovery

1. Zoho/plan UI under account-settings / billing-usage.
2. Payment failure → `AccessControlGuard` limits routes (`/payment-expiry`, `/service-suspended`).
3. Callbacks under `/billing/*`.

**Paths:** `ZohoService.tsx`, `pages/billing/**`, `pages/account-settings/**`

---

## 11. Marketing website workflows (not admin dashboard)

### Blog publish (both websites)

1. Add/edit `content/blog/<slug>.mdx`.
2. Register metadata in `app/blog/data/posts.ts`.
3. Deploy. Optional `SHOW_FUTURE_BLOGS` on GitHub site.

### Lead capture

| Site | Workflow |
|------|----------|
| Desktop | Form validate → mock success (no API) |
| GitHub | Form → `submitLead` → `/api/leads/*` → Neon or proxy → SMTP |

**There is no admin workflow in these marketing repos to triage leads.**

---

## 12. Workflow gaps

| Desired workflow | Status |
|------------------|--------|
| Edit buyience.com from dashboard | Missing |
| View marketing leads in dashboard | Unverified / Not connected |
| Blog approval workflow | Missing (git-based only) |
