# Troubleshooting Guide

Use this when something in the dashboard does not behave as expected.

---

## Login and access

| Problem | What to try |
|---------|-------------|
| Cannot log in | Check email/password; Caps Lock; try reset password |
| Asked for 2FA but no code | Open authenticator app; check device time; use a recovery code |
| Logged in but menus missing | Your role lacks permission — ask an admin |
| Sent to payment / suspended pages | Subscription issue — admin opens Plan & Billing |
| Session expired | Log in again; avoid sharing one login across many people |

---

## Products

| Problem | What to try |
|---------|-------------|
| Cannot open next tab | Click **Save and Next** on the current tab first |
| Cannot save Basic | Fill **Product Name**, **URLSlug**, **Category**; if Tax Applied is on, select **Tax Category** |
| Images will not upload | Check file type/size; try Media Library; try another browser |
| Variants tab missing | Product type must be **Variants** (not Simple) |
| Configurable/CPQ disabled | Expected — shows **Soon** |
| Published but not on buyience.com marketing site | Expected — products appear on **your storefront**, not the marketing blog site |
| Published but not on your shop | Check **Visible on storefront**, markets, and pricing visibility settings |

---

## Orders

| Problem | What to try |
|---------|-------------|
| Cannot update status | Refresh; check if Shiprocket sync locked the order; confirm permission |
| Wrong status chosen | Update again to the correct status; add a **Save Note** explaining the correction |
| No shipping label options | Open **Shipping Labels**; confirm shipping integration settings |
| Return not listed | Check **Returns** menu and filters; confirm a return request exists |

---

## Inventory

| Problem | What to try |
|---------|-------------|
| Stock wrong after sale | Confirm tracking is on; check **Committed** vs **On Hand**; review Movements |
| PO received but stock unchanged | Complete the receive step; verify location |
| Transfer missing at destination | Mark transfer as received |
| Warehouse menu missing | Warehouse page may exist without main-nav link; ask admin or use Inventory Overview locations |

---

## Quotes

| Problem | What to try |
|---------|-------------|
| Cannot create quote | Need Quote permission; ask admin |
| Price blocked / needs approval | Floor Margin may require approval — follow the approval prompt |
| Buyer chat missing | Open Quote Engine → DSR/Chats; confirm the conversation exists |

---

## Payments and billing

| Problem | What to try |
|---------|-------------|
| Looking for seller payouts | Not available — see [PAYMENTS_AND_EARNINGS_GUIDE.md](./PAYMENTS_AND_EARNINGS_GUIDE.md) |
| Receivables menu missing | Feature may be disabled until payment terms engine is on |
| Cannot change plan | Need Billing & Usage permission |

---

## Settings

| Problem | What to try |
|---------|-------------|
| Social networks show Coming Soon | Expected for some networks |
| Currency controls locked / Coming Soon | Contact admin or Buyience support |
| Changes not visible on storefront | Hard refresh storefront; confirm you edited the live market/theme |

---

## When to contact support

Contact **Help & Support** (in the dashboard) or your Buyience representative if:

1. Errors persist after refresh and a second browser.  
2. Permissions look correct but actions still fail.  
3. Payment gateway or shipping sync fails repeatedly.  
4. Data looks corrupted (duplicate orders, impossible stock).  

Provide: approximate time, what you clicked, order/product ID, and a screenshot of the error message (never include passwords or API keys).

---

## Quick health checks

1. Can you open Dashboard?  
2. Can you open All Products?  
3. Can you open one recent order?  
4. Does Inventory Overview load?  

If all four fail, it is likely a login/session or outage issue — check status communications from Buyience and try again later.
