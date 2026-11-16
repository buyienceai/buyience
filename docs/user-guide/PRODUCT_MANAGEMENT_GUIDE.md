# Product Management Guide

This guide explains how to add, edit, publish, and maintain products in the Buyience dashboard.

---

## 1. What is Product Management?

It is the set of screens where you create your catalogue: names, descriptions, images, prices, variants, stock, and SEO.

**Why you need it:** Buyers can only purchase what you publish (and make visible) in your store.

**Where to find it:**

1. Left menu → **Products** → **All Products**, then **Create Product**, **or**
2. Left menu → **Catalogue** → **Products** → **View All** / **Add New**

Page title on create: **Add New Product**. On edit: **Edit Product**.

---

## 2. Product tabs (steps)

| Tab | Purpose |
|-----|---------|
| **Basic** | Type, name, slug, descriptions, images, category, brand, tags, tax |
| **Variants** | Only if product type is **Variants** |
| **Pricing** | Regular price, sale price, cost, order limits, packs, tiers |
| **Inventory** | Track stock per location |
| **Enrich** | Specifications, dimensions, SEO |

On create, tabs unlock after you save earlier steps. If a tab shows a lock, finish and save the previous step first.

---

## 3. How to add a new product (step by step)

### Step 1 — Open the product list

Go to **Products** → **All Products** (or Catalogue → Products → View All).

### Step 2 — Start create

Click **Create Product** (or **Add New**).

### Step 3 — Choose product type (Basic)

| Option | Meaning |
|--------|---------|
| **Simple** | One SKU, one price |
| **Variants** | Size, colour, material, etc. |
| **Configurable (CPQ)** | Shows **Soon** — **not available** yet |

### Step 4 — Enter product information

| Field | Required? | What to enter |
|-------|-----------|---------------|
| **Product Name** | Yes | Clear buyer-facing name |
| **URL Slug** | Yes | Web address segment (often auto-suggested from the name) |
| **SKU** | Optional* | Your internal code (e.g. ISG-001-BLK) |
| **Short Description** | Optional | Short summary |
| **Long Description (Rich Editor)** | Optional | Full details |
| **MPN / GTIN / EAN/ISBN** | Optional | Under Advanced Identifiers |

\*SKU may be required by your process or later validation—add it when you can.

### Step 5 — Upload images and optional video

Under **Product Images**:

1. Drag and drop images, or click **Browse Files**.  
2. Or choose from **Media Library**.  
3. You can upload multiple images (up to 8).  
4. Reorder by dragging; remove with the delete control.  
5. Crop/edit if the editor opens (**Edit image** → **Use image**).

Supported image types include JPEG, PNG, WEBP, and related formats (SVG may be allowed by the uploader—prefer standard photo formats for products).

Optional **Product Video** accordion: upload MP4 / MOV / WEBM (max 20MB) via Browse Files or Media Library.

### Step 6 — Organise the product

| Field | Required? | Notes |
|-------|-----------|-------|
| **Categories** | Yes | Search and select; use **+** to add a new category |
| **Brand** | Optional | Search/select or add new |
| **Tags** | Optional | Multi-select; you can create tags |
| **Tax Applied** | Optional switch | If on, **Tax Category** becomes required |

### Step 7 — Save Basic and continue

Click **Save and Next**.

**What happens:** Basic data is saved. The next tab unlocks (Variants or Pricing).

### Step 8 — Variants (only if type = Variants)

1. Enter **Attribute Name** (e.g. Size).  
2. Enter **First Option** (e.g. Small) → **Add**.  
3. Use **Add option** for more values (Medium, Large…).  
4. Click **Generate Variants** (or **Update Attributes**).  
5. For each row: set **SKU**, optional image, **Status** switch.  
6. Click **Save Variants** (or **Save N Variants**).  
7. Continue to Pricing.

### Step 9 — Pricing

| Field / control | Purpose |
|-----------------|--------|
| **Regular Price (Base Price Per Unit)** | Main selling price (required when shown) |
| **Price After Category Discount** | Computed |
| **Sale Price** switch | Enable markdown |
| Sale method | **% Off**, **$ Off**, or **Direct** price |
| **Cost Price (Your Cost)** | Your cost for margin |
| **Profit/Loss** fields | Computed |
| **Minimum Order Quantity** | Required; default often 1 |
| **Maximum Order Quantity** | Optional cap |
| **Pack Options** | Sell in packs |
| **Tiered Pricing** | Volume breaks (**Add Price Tier**) |

Click **Save and Next**.

### Step 10 — Inventory

1. Turn **Track inventory for this product** on (recommended).  
2. Select locations that stock this product.  
3. Enter **Current Stock** / **On Hand** and **Safety Stock** as shown.  
4. Watch **Stock Status** (in stock / low / out of stock) — calculated for you.  
5. Click **Save and Next**, or use **Publish Product** if you are ready and the button is shown.

### Step 11 — Enrich (specs + SEO)

| Field | Purpose |
|-------|---------|
| **Visible on storefront** | Show/hide on the shop |
| **Add Specification** | Extra attributes/filters |
| **Length / Width / Height / Weight** | Physical dimensions |
| **Meta Title** | SEO title |
| **Meta Description** | SEO description |

Click **Publish Product**.

### Step 12 — Confirm result

1. Return to **All Products**.  
2. Confirm status **Published** (or open the product and check the badge).  
3. If your storefront is live, use **View Live** on edit (when shown) or open your shop to verify.

**Website note:** Publishing updates **your Buyience storefront**. It does **not** create an article on the public buyience.com marketing blog.

---

## 4. Required vs optional (summary)

| Required (typical) | Optional |
|--------------------|----------|
| Product Name | SKU (recommended) |
| URL Slug | Short/Long description |
| Category | Brand, Tags |
| Tax Category (if Tax Applied is on) | Sale price, cost price |
| Regular price (when pricing step shown) | Max qty, packs, tiers |
| Min order quantity | Specs, SEO, video |

---

## 5. Edit an existing product

1. Open **All Products**.  
2. Click the product.  
3. Move between tabs and change fields.  
4. Click **Update** or **Save and Exit** (edit header).  
5. To remove a product, use overflow **Delete** and confirm (edit screen).

**Publish Status card (edit):** choose **Published** or **Draft**.

**Can it be reversed?**  
- Draft ↔ Published: yes, by changing status.  
- Delete: treat as permanent unless your admin restores from archive processes (list has an **Archived** filter — use carefully).

---

## 6. Buttons cheat sheet

| Button | When to use | Result |
|--------|-------------|--------|
| **Create Product** | Start a new item | Opens Add New Product |
| **Save and Next** | Finished a tab | Saves and unlocks next tab |
| **Publish Product** | Ready to sell | Publishes (Inventory/Enrich steps) |
| **Update** | Editing | Saves changes |
| **Save and Exit** | Editing | Saves and leaves the form |
| **View Live** | Published product | Opens live storefront view when available |
| **Delete** | Remove product | Asks for confirmation |
| **Generate Variants** | After defining attributes | Builds variant rows |
| **Save Variants** | After editing variant rows | Stores variants |
| **Browse Files** / **Media Library** | Images/video | Attaches media |
| **Add Price Tier** | Tiered pricing on | Adds a volume row |
| **Refresh** | On list | Reloads list |
| **Archived** | On list | Shows archived items |

---

## 7. Real-life example

**Goal:** Sell “Industrial Safety Gloves” as a simple product.

1. All Products → **Create Product**.  
2. Type: **Simple**.  
3. Name: Industrial Safety Gloves. Confirm slug. SKU: ISG-001.  
4. Upload 3 photos.  
5. Category: Safety Gear. Brand: optional.  
6. **Save and Next**.  
7. Regular price: 12.50. Min qty: 1. Cost price: 7.00.  
8. **Save and Next**.  
9. Track inventory → Location Main Warehouse → On hand 500.  
10. Enrich: weight 0.2 kg; meta title for search.  
11. **Publish Product**.  
12. Check All Products shows Published.

---

## 8. Benefits

- Structured catalogue instead of spreadsheets.  
- Prices, images, and stock stay in one system.  
- Variants keep size/colour organised.  
- Draft/publish control when items go live.

---

## 9. Common mistakes

1. Skipping **Category** (required).  
2. Enabling **Tax Applied** without a tax category.  
3. Choosing **Variants** but not saving variant SKUs.  
4. Publishing with inventory tracking off while promising stock.  
5. Expecting the product on buyience.com marketing pages.  
6. Trying to use **Configurable (CPQ)** while it still shows **Soon**.

---

## Related guides

- Inventory details → [INVENTORY_MANAGEMENT_GUIDE.md](./INVENTORY_MANAGEMENT_GUIDE.md)  
- Orders after a sale → [ORDER_MANAGEMENT_GUIDE.md](./ORDER_MANAGEMENT_GUIDE.md)
