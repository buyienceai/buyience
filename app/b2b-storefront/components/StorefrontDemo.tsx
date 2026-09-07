"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ShoppingCart } from "lucide-react";
import { useCurrency } from "@/components/CurrencyProvider";

type Tab = "catalog" | "quick" | "lists";

type CartLine = {
  id: string;
  sku: string;
  name: string;
  qty: number;
  unit: number;
};

const CATALOG = [
  { sku: "BR-M8", name: "Steel Bracket M8", stock: 640, price: 3.48 },
  { sku: "HB-K12", name: "Hex Bolt Kit", stock: 220, price: 12.9 },
  { sku: "PW-500", name: "Pallet Wrap 500mm", stock: 150, price: 8.4 },
] as const;

const QUICK_LINES: CartLine[] = [
  { id: "quick-br", sku: "BR-M8", name: "Steel Bracket M8", qty: 24, unit: 3.48 },
  { id: "quick-hb", sku: "HB-K12", name: "Hex Bolt Kit", qty: 10, unit: 12.9 },
];

const MRO_LINES: CartLine[] = [
  { id: "mro-1", sku: "BR-M8", name: "Steel Bracket M8", qty: 48, unit: 3.48 },
  { id: "mro-2", sku: "HB-K12", name: "Hex Bolt Kit", qty: 20, unit: 12.9 },
  { id: "mro-3", sku: "PW-500", name: "Pallet Wrap 500mm", qty: 12, unit: 8.4 },
];

const ORD_LINES: CartLine[] = [
  { id: "ord-1", sku: "BR-M8", name: "Steel Bracket M8", qty: 120, unit: 3.48 },
  { id: "ord-2", sku: "HB-K12", name: "Hex Bolt Kit", qty: 40, unit: 12.9 },
  { id: "ord-3", sku: "PW-500", name: "Pallet Wrap 500mm", qty: 24, unit: 8.4 },
];

type Flash = {
  tone: "ok" | "info";
  text: string;
  left: number;
  top: number;
  placement: "above" | "below";
  scope: "cart" | "action";
} | null;

function mergeLines(existing: CartLine[], incoming: CartLine[]): CartLine[] {
  const next = [...existing];
  for (const line of incoming) {
    const idx = next.findIndex((l) => l.sku === line.sku);
    if (idx >= 0) {
      next[idx] = { ...next[idx], qty: next[idx].qty + line.qty };
    } else {
      next.push(line);
    }
  }
  return next;
}

export default function StorefrontDemo() {
  const { format } = useCurrency();
  const cartPanelId = useId();
  const cartWrapRef = useRef<HTMLDivElement>(null);

  const [tab, setTab] = useState<Tab>("catalog");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [addedSkus, setAddedSkus] = useState<Record<string, boolean>>({});
  const [quickDone, setQuickDone] = useState(false);
  const [listDone, setListDone] = useState<Record<string, boolean>>({});
  const [flash, setFlash] = useState<Flash>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [orderThanks, setOrderThanks] = useState<{
    orderId: string;
    lines: number;
    units: number;
    total: number;
  } | null>(null);

  const lineCount = cart.length;
  const unitCount = cart.reduce((sum, line) => sum + line.qty, 0);
  const cartTotal = cart.reduce((sum, line) => sum + line.qty * line.unit, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!flash) return;
    const id = window.setTimeout(() => setFlash(null), 2600);
    return () => window.clearTimeout(id);
  }, [flash]);

  useEffect(() => {
    if (cartOpen) {
      setFlash((prev) => (prev && prev.scope !== "cart" ? null : prev));
    } else {
      setFlash((prev) => (prev && prev.scope === "cart" ? null : prev));
    }
  }, [cartOpen]);

  useEffect(() => {
    if (!cartOpen) return;
    const onPointer = (event: MouseEvent) => {
      if (!cartWrapRef.current?.contains(event.target as Node)) {
        setCartOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCartOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [cartOpen]);

  const showFlash = (
    tone: "ok" | "info",
    text: string,
    anchor: HTMLElement,
    scope: "cart" | "action" = "action",
  ) => {
    const rect = anchor.getBoundingClientRect();
    const placement: "above" | "below" = rect.top < 80 ? "below" : "above";
    const left = Math.min(Math.max(rect.left + rect.width / 2, 16), window.innerWidth - 16);
    const top = placement === "above" ? rect.top - 8 : rect.bottom + 8;
    setFlash({ tone, text, left, top, placement, scope });
  };

  const addLines = (lines: CartLine[], message: string, anchor: HTMLElement) => {
    setOrderThanks(null);
    setCart((prev) => mergeLines(prev, lines));
    showFlash("ok", message, anchor);
  };

  const addCatalogItem = (
    sku: string,
    name: string,
    unit: number,
    anchor: HTMLElement,
  ) => {
    if (addedSkus[sku]) {
      showFlash("info", `${name} is already in your cart`, anchor);
      return;
    }
    setAddedSkus((prev) => ({ ...prev, [sku]: true }));
    addLines(
      [{ id: `cat-${sku}`, sku, name, qty: 1, unit }],
      `Added ${name} at your contract price`,
      anchor,
    );
  };

  const addQuickOrder = (anchor: HTMLElement) => {
    if (quickDone) {
      showFlash("info", "Those lines are already in the cart", anchor);
      return;
    }
    setQuickDone(true);
    addLines(QUICK_LINES, "2 lines added — BR-M8 ×24, HB-K12 ×10", anchor);
  };

  const reorderList = (
    id: "mro" | "ord",
    label: string,
    lines: CartLine[],
    anchor: HTMLElement,
  ) => {
    if (listDone[id]) {
      showFlash("info", "Already in cart — ready when you are", anchor);
      return;
    }
    setListDone((prev) => ({ ...prev, [id]: true }));
    addLines(lines, `${label} · ${lines.length} lines added to cart`, anchor);
  };

  const clearCart = (anchor: HTMLElement) => {
    setCart([]);
    setAddedSkus({});
    setQuickDone(false);
    setListDone({});
    setOrderThanks(null);
    showFlash("info", "Cart cleared", anchor, "cart");
  };

  const placeOrder = () => {
    if (lineCount === 0) return;
    const orderId = `ORD-${2400 + Math.floor(Math.random() * 80)}`;
    setFlash(null);
    setOrderThanks({
      orderId,
      lines: lineCount,
      units: unitCount,
      total: cartTotal,
    });
    setCart([]);
    setAddedSkus({});
    setQuickDone(false);
    setListDone({});
    setCartOpen(true);
  };

  const shopAgain = () => {
    setOrderThanks(null);
    setCartOpen(false);
  };

  return (
    <div className="sf-hero-visual relative flex min-h-0 w-full flex-col">
      {mounted && flash
        ? createPortal(
            <div
              className="pointer-events-none fixed z-[200] max-w-[min(280px,calc(100vw-24px))]"
              style={{
                left: flash.left,
                top: flash.top,
                transform:
                  flash.placement === "above" ? "translate(-50%, -100%)" : "translate(-50%, 0)",
              }}
              aria-live="polite"
              aria-atomic="true"
            >
              <div
                className={`relative flex items-center gap-2 rounded-xl border px-3 py-2 shadow-[0_12px_28px_-14px_rgba(27,16,51,0.55)] ${
                  flash.tone === "ok"
                    ? "border-[#B7E5D4] bg-white"
                    : "border-[#D4C4F7] bg-white"
                }`}
                role="status"
              >
                <span
                  className={`absolute left-1/2 size-2 -translate-x-1/2 rotate-45 border-r border-b bg-white ${
                    flash.placement === "above" ? "bottom-[-5px]" : "top-[-5px] rotate-[225deg]"
                  } ${flash.tone === "ok" ? "border-[#B7E5D4]" : "border-[#D4C4F7]"}`}
                  aria-hidden="true"
                />
                <span
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold text-white ${
                    flash.tone === "ok" ? "bg-[#0E9E7E]" : "bg-[#6E2CF4]"
                  }`}
                  aria-hidden="true"
                >
                  {flash.tone === "ok" ? "✓" : "!"}
                </span>
                <p className="m-0 text-[12px] leading-snug font-semibold text-[#1B1033]">{flash.text}</p>
              </div>
            </div>,
            document.body,
          )
        : null}

      <div className="sf-portal" aria-label="Interactive B2B storefront portal demo">
        <div className="sf-portal-head">
          <span className="sf-portal-pulse" aria-hidden="true" />
          <div className="sf-portal-head-text">
            <div className="sf-portal-title">Buyer portal</div>
            <div className="sf-portal-sub">Acme Industrial · Net 30 · your pricing</div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <span className="sf-portal-live">Live demo</span>

            <div className="relative" ref={cartWrapRef}>
              <button
                type="button"
                className={`relative flex size-9 items-center justify-center rounded-xl border transition-colors ${
                  lineCount > 0 || orderThanks
                    ? "border-[#D4C4F7] bg-[#F4EFFF] text-[#5B21D8]"
                    : "border-[#E8E4F4] bg-white text-[#6A5A8C] hover:border-[#D4C4F7] hover:text-[#5B21D8]"
                }`}
                aria-label={
                  orderThanks
                    ? `Order ${orderThanks.orderId} confirmed`
                    : lineCount > 0
                      ? `Open cart, ${lineCount} lines`
                      : "Open cart"
                }
                aria-expanded={cartOpen}
                aria-controls={cartPanelId}
                onClick={() => setCartOpen((open) => !open)}
              >
                <ShoppingCart className="size-4" strokeWidth={2.25} aria-hidden="true" />
                {lineCount > 0 ? (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#6E2CF4] px-1 text-[10px] font-extrabold text-white">
                    {lineCount}
                  </span>
                ) : orderThanks ? (
                  <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-[#0E9E7E] text-[10px] font-extrabold text-white">
                    ✓
                  </span>
                ) : null}
              </button>

              {cartOpen ? (
                <div
                  id={cartPanelId}
                  role="dialog"
                  aria-label={orderThanks ? "Order confirmation" : "Cart details"}
                  className="absolute top-[calc(100%+8px)] right-0 z-20 w-[min(288px,calc(100vw-48px))] overflow-hidden rounded-2xl border border-[#E7DEFB] bg-white shadow-[0_18px_40px_-20px_rgba(27,16,51,0.45)]"
                >
                  {orderThanks ? (
                    <div className="px-4 py-5 text-center">
                      <span
                        className="mx-auto mb-3 flex size-11 items-center justify-center rounded-full bg-[#E7F6F1] text-[18px] font-extrabold text-[#0E9E7E]"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <p className="m-0 text-[15px] font-extrabold tracking-tight text-[#1B1033]">
                        Thanks — order placed
                      </p>
                      <p className="mt-1.5 mb-0 text-[12.5px] leading-snug font-semibold text-[#6A5A8C]">
                        {orderThanks.orderId} · {orderThanks.lines} line
                        {orderThanks.lines === 1 ? "" : "s"} · {format(orderThanks.total, 2)}
                      </p>
                      <p className="mt-2 mb-4 text-[12px] leading-snug text-[#6A5A8C]">
                        Confirmation sent to Acme Industrial. Net 30 terms applied — no sales call needed.
                      </p>
                      <button
                        type="button"
                        className="w-full rounded-[10px] bg-[#6E2CF4] px-3 py-2 text-[12.5px] font-bold text-white hover:bg-[#5B21D8]"
                        onClick={shopAgain}
                      >
                        Continue shopping →
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between border-b border-[#F0EAFB] px-3.5 py-2.5">
                        <div>
                          <p className="m-0 text-[13px] font-extrabold text-[#1B1033]">Your cart</p>
                          <p className="m-0 text-[11px] font-semibold text-[#6A5A8C]">
                            {lineCount === 0
                              ? "Empty — add from catalog or lists"
                              : `${lineCount} line${lineCount === 1 ? "" : "s"} · ${unitCount} units`}
                          </p>
                        </div>
                        {lineCount > 0 ? (
                          <button
                            type="button"
                            className="text-[11px] font-bold text-[#5B21D8] hover:underline"
                            onClick={(e) => clearCart(e.currentTarget)}
                          >
                            Clear
                          </button>
                        ) : null}
                      </div>

                      {lineCount === 0 ? (
                        <p className="m-0 px-3.5 py-4 text-[12.5px] leading-snug text-[#6A5A8C]">
                          Contract pricing applies automatically once items are added.
                        </p>
                      ) : (
                        <ul className="m-0 max-h-[220px] list-none space-y-0 overflow-y-auto p-0">
                          {cart.map((line) => (
                            <li
                              key={line.id}
                              className="flex items-start justify-between gap-3 border-b border-[#F5F2FB] px-3.5 py-2.5 last:border-b-0"
                            >
                              <div className="min-w-0">
                                <p className="m-0 truncate text-[12.5px] font-bold text-[#1B1033]">{line.name}</p>
                                <p className="m-0 text-[11px] font-medium text-[#6A5A8C]">
                                  {line.sku} · qty {line.qty} · {format(line.unit, 2)}
                                </p>
                              </div>
                              <span className="shrink-0 text-[12.5px] font-extrabold text-[#5B21D8]">
                                {format(line.qty * line.unit, 2)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="border-t border-[#F0EAFB] bg-[#FAFAFE] px-3.5 py-2.5">
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <span className="text-[11px] font-bold tracking-[0.04em] text-[#6A5A8C] uppercase">
                            Cart total
                          </span>
                          <span className="text-[14px] font-extrabold text-[#1B1033]">
                            {format(cartTotal, 2)}
                          </span>
                        </div>
                        <button
                          type="button"
                          className="w-full rounded-[10px] bg-[#6E2CF4] px-3 py-2 text-[12.5px] font-bold text-white hover:bg-[#5B21D8] disabled:cursor-not-allowed disabled:opacity-50"
                          disabled={lineCount === 0}
                          onClick={placeOrder}
                        >
                          {lineCount === 0 ? "Cart is empty" : "Checkout →"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="sf-portal-tabs" role="tablist" aria-label="Portal views">
          {(
            [
              ["catalog", "Catalog"],
              ["quick", "Quick order"],
              ["lists", "Saved lists"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              className={tab === id ? "is-active" : undefined}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="sf-portal-body">
          {tab === "catalog" ? (
            <ul className="sf-portal-rows">
              {CATALOG.map((row) => {
                const inCart = Boolean(addedSkus[row.sku]);
                return (
                  <li key={row.sku}>
                    <div className="sf-portal-row-main">
                      <b>{row.name}</b>
                      <span>
                        {row.sku} · {format(row.price, 2)}
                      </span>
                    </div>
                    <div className="sf-portal-row-meta">
                      <span className="sf-portal-stock">{row.stock} in stock</span>
                      <button
                        type="button"
                        className={`rounded-[10px] px-2.5 py-1.5 text-[12px] font-bold transition-colors ${
                          inCart
                            ? "bg-[#E7F6F1] text-[#0B7A5E]"
                            : "bg-[#6E2CF4] text-white hover:bg-[#5B21D8]"
                        }`}
                        onClick={(e) => addCatalogItem(row.sku, row.name, row.price, e.currentTarget)}
                      >
                        {inCart ? "In cart ✓" : "Add →"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : null}

          {tab === "quick" ? (
            <div className="sf-portal-quick">
              <label className="sf-portal-field">
                <span>SKU / CSV paste</span>
                <div
                  className={`sf-portal-input whitespace-pre-wrap ${
                    quickDone ? "border-[#B7E5D4] bg-[#F3FBF7] text-[#0B7A5E]" : ""
                  }`}
                >
                  {quickDone ? "✓ BR-M8,24\n✓ HB-K12,10" : "BR-M8,24\nHB-K12,10"}
                </div>
              </label>
              <div className="sf-portal-hint">
                {quickDone
                  ? "Lines priced from Acme's contract list and sitting in the cart."
                  : "Prices apply from Acme's contract list — no browsing required."}
              </div>
              <button
                type="button"
                className={`w-full rounded-[10px] px-3.5 py-2.5 text-[13px] font-bold transition-colors ${
                  quickDone
                    ? "bg-[#E7F6F1] text-[#0B7A5E]"
                    : "bg-[#6E2CF4] text-white hover:bg-[#5B21D8]"
                }`}
                onClick={(e) => addQuickOrder(e.currentTarget)}
              >
                {quickDone ? "✓ 2 lines in cart" : "Add 2 lines to cart →"}
              </button>
            </div>
          ) : null}

          {tab === "lists" ? (
            <ul className="sf-portal-rows">
              <li>
                <div className="sf-portal-row-main">
                  <b>Weekly MRO restock</b>
                  <span>12 SKUs · saved list</span>
                </div>
                <button
                  type="button"
                  className={`shrink-0 rounded-[10px] px-3 py-2 text-[13px] font-bold transition-colors ${
                    listDone.mro
                      ? "bg-[#E7F6F1] text-[#0B7A5E]"
                      : "bg-[#F4EFFF] text-[#5B21D8] hover:bg-[#E8DCFF]"
                  }`}
                  onClick={(e) =>
                    reorderList("mro", "Weekly MRO restock", MRO_LINES, e.currentTarget)
                  }
                >
                  {listDone.mro ? "In cart ✓" : "Reorder →"}
                </button>
              </li>
              <li>
                <div className="sf-portal-row-main">
                  <b>Last order · ORD-2418</b>
                  <span>8 lines · {format(14640, 0)}</span>
                </div>
                <button
                  type="button"
                  className={`shrink-0 rounded-[10px] px-3 py-2 text-[13px] font-bold transition-colors ${
                    listDone.ord
                      ? "bg-[#E7F6F1] text-[#0B7A5E]"
                      : "bg-[#F4EFFF] text-[#5B21D8] hover:bg-[#E8DCFF]"
                  }`}
                  onClick={(e) => reorderList("ord", "ORD-2418", ORD_LINES, e.currentTarget)}
                >
                  {listDone.ord ? "In cart ✓" : "Buy again →"}
                </button>
              </li>
            </ul>
          ) : null}
        </div>

        <div className="sf-portal-foot">
          <span className="sf-portal-stat">
            {orderThanks
              ? `${orderThanks.orderId} confirmed · Net 30`
              : lineCount > 0
                ? `Cart · ${lineCount} line${lineCount === 1 ? "" : "s"} · ${format(cartTotal, 2)}`
                : "Customer-specific pricing · live stock"}
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-[10.5px] font-extrabold tracking-[0.04em] uppercase ${
              orderThanks
                ? "bg-[#E7F6F1] text-[#0E9E7E]"
                : lineCount > 0
                  ? "bg-[#6E2CF4] text-white"
                  : "bg-[#E7F6F1] text-[#0E9E7E]"
            }`}
          >
            {orderThanks ? "Order placed" : lineCount > 0 ? `${lineCount} in cart` : "24/7 self-serve"}
          </span>
        </div>
      </div>
      <p className="sf-portal-note">Branded portal — each buyer sees only their pricing and catalogue</p>
    </div>
  );
}
