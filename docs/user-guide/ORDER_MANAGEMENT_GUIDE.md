# Order Management Guide

## 1. What is Order Management?

It is where you view, update, fulfil, and complete customer orders — including drafts, abandoned checkouts, shipping labels, and returns.

**Why you need it:** So every order moves clearly from “new” to “delivered” (or cancelled/refunded) with one shared status.

**Where:** Left menu → **Orders**

| Menu item | Purpose |
|-----------|---------|
| View All | Main order list |
| Draft Orders | Not-yet-final orders |
| Abandoned Checkouts | Checkouts started but not completed |
| Bulk Upload (BETA) | Import orders in bulk |
| Shipping Labels | Label creation / print / PDF |
| Returns | Return requests |

---

## 2. How to view new orders

1. Open **Orders** → **View All**.  
2. Scan the list for statuses such as **New** or **Pending**.  
3. Use search/filters if available to find a customer or order number.  
4. Click the order to open details.

**Expected result:** You see customer information, line items, quantities, prices, and current status.

---

## 3. Order detail — what to check

On the order detail page, review:

- Customer / company details  
- Products ordered and quantities  
- Pricing and discounts  
- Current **status**  
- Notes / history (if shown)  
- Shipping / payment information (as provided)

---

## 4. Update order status

### Status names used in the product

**New**, **Pending**, **Cancelled**, **In Progress**, **Shipped**, **Partially Shipped**, **Delivered**, **Refunded**, **Paid**, **Draft**

(Exact options on a given order come from your store’s configured status list.)

### Steps

1. Open the order.  
2. Find the status control.  
3. Choose the new status.  
4. Click **Update Status**.

**When it may be blocked:** If the order is already handed to Shiprocket (or similar) in a way that locks manual edits — follow on-screen guidance or sync tools instead.

**Can it be reversed?** Often you can move to another status later, but cancellations and refunds should follow your finance process. Prefer accurate statuses over “temporary” wrong ones.

---

## 5. Process an order (typical fulfilment path)

1. Open a **New** / **Pending** order.  
2. Confirm stock is available (check Inventory if unsure).  
3. Set status to **In Progress** while picking/packing.  
4. Create a shipping label if you use **Shipping Labels** or **Sync to Shiprocket** (when integration is on).  
5. Set status to **Shipped** or **Partially Shipped**.  
6. When the buyer receives goods, set **Delivered**.  
7. Use **Paid** / **Refunded** according to payment reality.

**Benefit:** Everyone on the team sees the same progress.

---

## 6. Notes

1. Enter an internal note on the order.  
2. Click **Save Note**.  

**Result:** The note is stored on the order for your team (not necessarily emailed to the customer unless your process says so).

---

## 7. Invoice / review & send

1. On the order, use **Review & send** when you need the invoice flow.  
2. Or open the invoice route from the order (invoice screen).  
3. Review totals.  
4. Send/share according to the buttons on that screen.

---

## 8. Draft orders

**Where:** Orders → **Draft Orders**

Use drafts when an order is being prepared and should not be treated as final yet.

Typical actions: create draft, edit draft, preview, then convert/send when ready (follow on-screen actions on draft pages).

---

## 9. Abandoned checkouts

**Where:** Orders → **Abandoned Checkouts**

1. Open the list.  
2. Click a checkout to see what the buyer left behind.  
3. Follow up outside the system or with your marketing tools as your process requires.

**Benefit:** Recover lost sales.

---

## 10. Shipping labels

**Where:** Orders → **Shipping Labels**

Common actions:

- Open a label record  
- **Print Label**  
- **Download PDF**  

If Shiprocket is connected, you may also see **Sync to Shiprocket** on the order.

---

## 11. Returns

**Where:** Orders → **Returns**

1. Open **Returns**.  
2. Select a return request.  
3. Review items and reason.  
4. Update the return according to the statuses/actions shown.  
5. Coordinate refunds with your finance process (**Refunded** on the original order if applicable).

Return policy settings also exist under Settings (return management / policies) for admins.

---

## 12. Bulk upload (BETA)

**Where:** Orders → **Bulk Upload**

Use only if you understand the template format. Because it is marked **BETA**, test with a small file first.

---

## 13. Buttons cheat sheet

| Button / action | Purpose |
|-----------------|--------|
| **Update Status** | Change fulfilment/payment progress |
| **Save Note** | Store internal comment |
| **Review & send** | Invoice / send flow |
| **Sync to Shiprocket** | Push to shipping provider (if enabled) |
| **Print Label** / **Download PDF** | Shipping paperwork |
| Create / edit draft controls | Build incomplete orders safely |

---

## 14. Common mistakes

1. Marking **Shipped** before the parcel leaves.  
2. Ignoring **Partially Shipped** when only some lines went out.  
3. Cancelling without checking payment capture/refund.  
4. Forgetting to update inventory after fulfilment (if your process is manual).  

---

## Related

- Stock → [INVENTORY_MANAGEMENT_GUIDE.md](./INVENTORY_MANAGEMENT_GUIDE.md)  
- Quotes before orders → [COMMON_TASKS_AND_WORKFLOWS.md](./COMMON_TASKS_AND_WORKFLOWS.md)
