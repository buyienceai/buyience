# Common Tasks and Workflows

End-to-end recipes using real menu names.

---

## Workflow A — Publish a simple product and sell it

1. **Products** → **All Products** → **Create Product**.  
2. Type **Simple**; fill name, slug, category; add images.  
3. **Save and Next** through Pricing and Inventory.  
4. **Publish Product** on Enrich (or earlier publish control when shown).  
5. Confirm **Published** on the list.  
6. When an order arrives: **Orders** → open → **Update Status** through fulfilment.

**Expected result:** Product is sellable on your storefront; orders can be fulfilled in Orders.

---

## Workflow B — Create a quote then fulfil

1. **Quote Engine** → **Create Quote** / New Quote.  
2. Select customer and products; set prices (watch floor margin warnings if enabled).  
3. Save / send the quote using on-screen actions.  
4. Negotiate in **DSR / Chats** if the buyer responds there.  
5. When accepted, continue into order creation/fulfilment as your process provides.  
6. Complete shipping statuses in **Orders**.

---

## Workflow C — Receive supplier stock

1. **Inventory** → **Suppliers** (create supplier if needed).  
2. **Purchase Orders** → **Add New PO**.  
3. Add lines and save.  
4. When goods arrive, **Receive** against the PO.  
5. Confirm **Overview** stock increased.  
6. Resume selling / clear backorders.

---

## Workflow D — Transfer stock between locations

1. **Inventory** → **Transfer Order** → **New Order Transfer**.  
2. Choose source, destination, quantities.  
3. Save.  
4. At destination, **Receive** / mark received.  
5. Verify both locations on Overview.

---

## Workflow E — Recover an abandoned checkout

1. **Orders** → **Abandoned Checkouts**.  
2. Open the record.  
3. Note customer and cart contents.  
4. Follow up (call/email) per your sales playbook.  
5. If they buy, confirm the new order appears under **View All**.

---

## Workflow F — Onboard a teammate (admin)

1. **Users** → Add New.  
2. Create the user.  
3. **Roles & Permissions** → assign a least-privilege role.  
4. User logs in and confirms menus.  
5. Optionally enable 2FA under Profile & Security.

---

## Workflow G — Morning ops routine (seller)

1. Dashboard — alerts.  
2. Quote Engine — unanswered quotes/chats.  
3. Orders — New / Pending.  
4. Inventory — low stock.  
5. Update statuses before end of day.

---

## Workflow H — Apply a promotion

1. **Discounts** → create coupon or B2B discount (as permitted).  
2. Save/activate.  
3. Place a test quote/order to confirm the discount applies.  
4. Monitor margin (Floor Margin / cost fields).

---

## Tips for smooth workflows

- Finish product tabs in order; locked tabs mean a previous save is missing.  
- Do not mark Shipped before the carrier scan.  
- Keep Draft vs Published intentional.  
- Ask admin before changing Tax, Shipping, or Payment Methods mid-day.

---

## Related guides

- Products → [PRODUCT_MANAGEMENT_GUIDE.md](./PRODUCT_MANAGEMENT_GUIDE.md)  
- Quotes → [QUOTE_ENGINE_GUIDE.md](./QUOTE_ENGINE_GUIDE.md)  
- Orders → [ORDER_MANAGEMENT_GUIDE.md](./ORDER_MANAGEMENT_GUIDE.md)  
- Inventory → [INVENTORY_MANAGEMENT_GUIDE.md](./INVENTORY_MANAGEMENT_GUIDE.md)  
- Buttons → [BUTTON_CHEAT_SHEET.md](./BUTTON_CHEAT_SHEET.md)
