# Admin User Guide

This guide is for people who **run the store**: owners, operations managers, and users with broad admin rights.

---

## 1. What an admin does in Buyience

| Responsibility | Where in the dashboard |
|----------------|------------------------|
| See business health | Dashboard |
| Manage the catalogue | Products / Catalogue |
| Process sales | Orders, Quote Engine |
| Keep stock accurate | Inventory |
| Manage buyers | Customers |
| Configure the shop | Store Settings, Markets, Tax, Shipping, Payments |
| Control team access | Users, Roles & Permissions |
| Pay for Buyience | Account → Plan & Billing |

---

## 2. Dashboard

**Where:** Left menu → **Dashboard** (path often `/dashboards/ecommerce`)

**What it is:** A home screen with revenue, quotes, customers, recent orders, and inventory alerts.

**Why you need it:** Start the day knowing what needs attention.

**How to use it:**
1. Open **Dashboard**.
2. Scan KPI cards (revenue, active quotes, customers).
3. Open recent orders or alerts that need action.

**Also available:**
- **Demo Dashboard** (platform analytics) — broader charts.
- **Sales Dashboard** — sales-style metrics.
- **Prame Ai** — AI shortcuts hub (beta).

**Benefit:** Faster decisions without opening every module first.

---

## 3. Catalogue and products (admin view)

**Where:** **Products** → **All Products**, or **Catalogue** → **Products**

Admins typically:

- Create categories, brands, tags, and filters before large catalogue work.
- Add and publish products (see [PRODUCT_MANAGEMENT_GUIDE.md](./PRODUCT_MANAGEMENT_GUIDE.md)).
- Review customer **Reviews**.
- Manage **Media** library assets.
- Use **Product Configuration** for advanced configurator templates (separate from simple/variant products). **Configurable (CPQ)** as a product type on Add Product is marked **Soon** and is not available yet.

### Categories / Brands / Tags

| Task | Menu path |
|------|-----------|
| View categories | Catalogue → Categories → View All |
| Add category | Categories → Add New |
| Brands | Catalogue → Brands |
| Tags | Catalogue → Tags |
| Filters | Catalogue → Filters |

**After Save:** The new category/brand/tag becomes selectable when editing products.

**Mistake to avoid:** Publishing products without a category — **Categories** are required on the product form.

---

## 4. Orders (admin)

**Where:** **Orders** → **View All**

You can also open:

| Sub-item | Purpose |
|----------|---------|
| Draft Orders | Quotes/orders not yet final |
| Abandoned Checkouts | Buyers who left without paying |
| Bulk Upload (BETA) | Import orders in bulk |
| Shipping Labels | Create/print labels |
| Returns | Return requests |

Full steps → [ORDER_MANAGEMENT_GUIDE.md](./ORDER_MANAGEMENT_GUIDE.md)

---

## 5. Quote Engine

**Where:** **Quote Engine**

| Action | Path |
|--------|------|
| View quotes | Quote Engine → View All |
| Create quote | Create Quote / New Quote |
| Buyer chats (DSR) | DSR / Chats |
| RFQ invitations | RFQ Invitations |

**Why admins need it:** B2B sales often start with a quote, not a cart.

**Benefit:** Central place for negotiation, pricing, and follow-up instead of email-only quotes.

---

## 6. Inventory (admin)

**Where:** **Inventory** → View All, Purchase Orders, Suppliers, Transfer Order

Use this to keep sellable stock correct across locations. Details → [INVENTORY_MANAGEMENT_GUIDE.md](./INVENTORY_MANAGEMENT_GUIDE.md)

**Note:** A Warehouse Management page exists in the product but is **not** always shown in the main left menu. Multi-warehouse is also listed under Coming Soon Features in places — treat advanced multi-warehouse as partially available.

---

## 7. Customers

**Where:** **Customers**

| Feature | Use |
|---------|-----|
| View All | Search and open buyer accounts |
| Add New | Register a customer |
| Customer Groups | Group buyers for pricing or terms |
| Credit Management (BETA) | Credit-related tools (beta) |

**After adding a customer:** They can be selected on quotes/orders (depending on your sales process).

---

## 8. Discounts and marketing

**Where:** **Discounts** (and a **Marketing** section)

| Item | Status |
|------|--------|
| Coupons / volume / B2B discounts | Available under Discounts |
| Marketing → Email / Checkout Email | Listed; Marketing section is marked **coming** in navigation — treat advanced campaigns as limited |

---

## 9. Store and business settings

**Where:** **Settings**

### Store Management

| Setting | What you configure |
|---------|-------------------|
| Store Settings | Store details, regional formats, social, branding |
| Menu | Storefront navigation |
| Email Templates | Store emails |
| Store Pages | Content pages / homepage sections |
| Theme & Appearance | Look and feel |
| Website Sliders | Banner/slider content |
| Notifications | Notification preferences |

### Business Operations (Commerce Settings)

| Setting | Purpose |
|---------|---------|
| Markets | Selling markets / currencies |
| Payment Methods | Stripe, PayPal, Razorpay, etc. |
| Payment Terms | B2B payment terms |
| Quote Settings | How quoting behaves |
| Tax | Tax categories and zones |
| Shipping | Zones and rates |
| Pricing Visibility | Who sees prices/stock |
| Floor Margin | Minimum margin rules |

### SEO & Analytics

| Setting | Purpose |
|---------|---------|
| SEO Settings | Redirects, robots, scripts |
| Integrations | Google Analytics, Shopify, Klaviyo, Shiprocket, and more |

Details → [STORE_AND_PROFILE_GUIDE.md](./STORE_AND_PROFILE_GUIDE.md)

---

## 10. User management (admin only)

**Where:** **Settings** → **User Management** → **Users** and **Roles & Permissions**

### Why you need it

So each teammate only sees what they need (catalogue only, orders only, full admin, etc.).

### How to add a user (typical)

1. Open **Users**.
2. Click **Add New** (or equivalent).
3. Enter name, email, and access details.
4. Assign a **role**.
5. Save.
6. Ask the user to log in and confirm they see the right menus.

### Roles & Permissions

1. Open **Roles & Permissions**.
2. Create or edit a role.
3. Tick the resources the role may **read** or **write** (Catalogue, Orders, Inventory, and so on).
4. Assign the role to users.
5. Save.

**After Save:** Menus update on the user’s next login/session refresh.

**Mistake to avoid:** Giving every user full admin access “for convenience.”

---

## 11. Account, security, and subscription

**Where:** **Settings** → **Account** → Profile / Security, or **Account Settings**

| Tab | Purpose |
|-----|---------|
| Profile & Security | Personal details, password, 2FA |
| Business Details | Company billing profile (if permitted) |
| Plan & Billing | Your Buyience subscription, payment method, invoices |
| Usage | API usage and quotas (if shown) |

This billing area is **what you pay Buyience**, not payouts to marketplace sellers.

---

## 12. Receivables (customer money owed to you)

**Where:** `/apps/receivables` (Invoices, Payments, Credit) — may not appear in every left menu until payment-terms features are enabled.

**What it is:** Tracking what **buyers owe your store**.

**Not the same as:** Plan & Billing (your SaaS subscription).

---

## 13. Help & Support

**Where:** **Help & Support**

Use this to contact support / send enquiries from inside the product.

---

## 14. Admin checklist (weekly)

1. Review Dashboard alerts.  
2. Clear overdue quotes and new orders.  
3. Check low-stock inventory.  
4. Confirm payment and shipping settings still match how you sell.  
5. Review user access if staff have joined or left.

---

## 15. How this relates to buyience.com

| Action in dashboard | Appears on buyience.com marketing site? | Appears on your storefront? |
|---------------------|-------------------------------------------|------------------------------|
| Add/publish product | No | Yes (your shop), when published and visible |
| Change store theme | No | Yes |
| Write a Buyience company blog | No — blogs are managed separately on the marketing site | N/A |

---

## Next guides

- Products → [PRODUCT_MANAGEMENT_GUIDE.md](./PRODUCT_MANAGEMENT_GUIDE.md)  
- Orders → [ORDER_MANAGEMENT_GUIDE.md](./ORDER_MANAGEMENT_GUIDE.md)  
- Daily workflows → [COMMON_TASKS_AND_WORKFLOWS.md](./COMMON_TASKS_AND_WORKFLOWS.md)
