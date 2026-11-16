# Payments and Earnings Guide

## 1. Read this first

| Question | Answer in Buyience today |
|----------|---------------------------|
| Is there a seller wallet / payout dashboard? | **No — not available** |
| Can marketplace sellers cash out commissions here? | **No — not a marketplace seller portal** |
| Where do I see money **customers owe my store**? | **Receivables** (if enabled) |
| Where do I pay **Buyience** for the software? | Account → **Plan & Billing** |
| Where do buyers pay for orders? | Your configured **Payment Methods** at checkout / invoice flows |

---

## 2. Receivables (customer balances owed to you)

**What it is:** Finance view of outstanding customer invoices and payments **to your store**.

**Where:** `/apps/receivables` (and Invoices / Payments / Credit subpages). This area may stay hidden until payment-terms features are enabled for your account.

### Typical screens

| Screen | Use |
|--------|-----|
| Receivables overview | Outstanding, overdue, aging-style summaries |
| Invoices | Customer invoices |
| Payments | Payment records |
| Credit | Credit notes (some credit-note UI may be hidden until finance features launch) |

### How to use (general)

1. Ask an admin to confirm Receivables is enabled.  
2. Open Receivables.  
3. Filter for overdue if needed.  
4. Open an invoice to see detail.  
5. Record/reconcile payments using the payments tools shown.

**Benefit:** Better cash collection without leaving the commerce system.

---

## 3. Payment methods (how buyers pay)

**Where:** Settings → Business Operations → **Payment Methods**

Admins configure gateways such as Stripe, PayPal, or Razorpay (as offered).

### Admin steps (high level)

1. Open **Payment Methods**.  
2. Add or edit a method.  
3. Enter credentials/settings required on screen.  
4. Save.  
5. Place a test order in a safe environment if possible.

**Mistake:** Saving live keys in a test store (or the reverse).

---

## 4. Payment terms (B2B)

**Where:** Settings → **Payment Terms**

Use for Net-style terms and B2B due dates. Combined with Receivables, this supports invoice-led selling.

---

## 5. Plan & Billing (your Buyience subscription)

**Where:** Account Settings → **Plan & Billing**

| Sub-area | Purpose |
|----------|---------|
| Current Plan | What plan you are on |
| Payment Method | Card / payment method for subscription |
| Invoices | Buyience invoices to you |
| Billing Settings | Billing preferences |

**This is not seller earnings.** It is what your company pays for Nova Core / Buyience.

---

## 6. Floor margin and discounts (protecting profit)

While not “earnings reports,” these protect margin:

- **Floor Margin** settings — stop or approve prices that are too low.  
- **Discounts / Coupons** — intentional promotions.

See admin settings and [PRODUCT_MANAGEMENT_GUIDE.md](./PRODUCT_MANAGEMENT_GUIDE.md) pricing section for cost/margin fields on products.

---

## 7. What staff should tell finance teams

1. Customer AR (accounts receivable) → Receivables module (if live).  
2. Software subscription → Plan & Billing.  
3. No built-in marketplace payout ledger was verified in this dashboard.

---

## 8. Unavailable features (explicit)

- Seller earnings dashboard  
- Automatic commission calculation for third-party vendors  
- Payout scheduling to seller bank accounts as a marketplace  

If your business model needs those, they are **outside** what this user manual can document from the current app.
