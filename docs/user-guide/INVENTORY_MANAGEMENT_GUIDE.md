# Inventory Management Guide

## 1. What is Inventory Management?

It tracks how many units you have, where they are, when you reorder from suppliers, and how stock moves between locations.

**Why you need it:** Accurate stock prevents overselling and late apologies to buyers.

**Where:** Left menu → **Inventory**

| Menu item | Purpose |
|-----------|---------|
| View All | Overview, movements, forecasting, suppliers tab, settings |
| Purchase Orders | Buy stock from suppliers |
| Add New PO | Create a purchase order |
| Suppliers | Supplier records |
| Transfer Order | Move stock between locations |

A **Warehouse Management** page also exists in the product but may **not** appear in the main left menu. Treat dedicated multi-warehouse tooling as partially available / evolving (also listed under Coming Soon Features in places).

---

## 2. Check available stock

1. Open **Inventory** → **View All**.  
2. Stay on the **Overview** tab.  
3. Find the product/location row.  
4. Read on-hand / available figures (column names include **Current Stock**, **On Hand**, **Available**, **Safety Stock**, **Committed**, depending on view).

**From the product form:** Open the product → **Inventory** tab for that item’s locations.

---

## 3. Update stock quantities

1. On Inventory **Overview**, edit the stock field for the location.  
2. Click **Save** (header actions may also include **Import** / **Export**).  

**What happens after Save:** The new quantity is stored. Product **Stock Status** (in stock / low / out of stock) updates when tracking is enabled.

**Can it be reversed?** Yes, by entering the correct quantity again. Prefer adjustment notes in your internal process for audits.

---

## 4. Low-stock products

1. Open Inventory → **Settings** tab (low-stock alerts) if available.  
2. Configure alert thresholds as shown.  
3. Watch **Dashboard** inventory alerts and Overview status badges.

**Benefit:** Reorder before you stock out.

---

## 5. When stock reaches zero

| If inventory tracking is… | Typical result |
|---------------------------|----------------|
| **On** | Product can show **out of stock**; buyers may be blocked from buying depending on storefront rules |
| **Off** | System may not stop sales — high risk of overselling |

**What you should do:** Create a **Purchase Order** or transfer stock in, then update quantities.

---

## 6. Purchase Orders (PO)

### View POs

**Inventory** → **Purchase Orders** → View All.

### Add a new PO

1. Click **Add New PO** (or Add New).  
2. Follow the PO wizard screens.  
3. Select supplier and products/quantities.  
4. Save / submit as prompted.  
5. When goods arrive, use **receive** actions on the PO (Receive stock screens).

**Expected result:** Incoming stock is recorded; on-hand quantities increase after receive.

---

## 7. Suppliers

1. **Inventory** → **Suppliers**.  
2. Click **Add New Supplier**.  
3. Complete steps: **Basic → Financial → Compliance → Logistics → Review**.  
4. Save.

**Why:** Clean supplier data makes POs faster and more accurate.

---

## 8. Transfer orders

1. **Inventory** → **Transfer Order**.  
2. Click **New Order Transfer**.  
3. Choose from/to locations and quantities.  
4. Save.  
5. When stock arrives at the destination, use **Receive Order** / mark as received.

**Benefit:** Keep multiple locations balanced without guessing.

---

## 9. Movements and forecasting tabs

On Inventory View All:

| Tab | Use |
|-----|-----|
| **Movements** | See stock movement history |
| **Forecasting** | Planning views (use as guidance; validate against real demand) |
| **Suppliers** | Jump into supplier context |
| **Settings** | Alerts and inventory preferences |

---

## 10. Import / Export

Use **Import** / **Export** on the inventory header when you need bulk updates or backups. Validate a small file first.

---

## 11. Common mistakes

1. Updating the wrong location.  
2. Receiving a PO without checking damaged goods.  
3. Transferring stock and forgetting to mark received.  
4. Turning tracking off to “fix” a stock error.  

---

## Related

- Product inventory tab → [PRODUCT_MANAGEMENT_GUIDE.md](./PRODUCT_MANAGEMENT_GUIDE.md)  
- Fulfilment → [ORDER_MANAGEMENT_GUIDE.md](./ORDER_MANAGEMENT_GUIDE.md)
