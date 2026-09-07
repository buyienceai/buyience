"use client";

import React, { useEffect, useState } from "react";
import { useCurrency } from "@/components/CurrencyProvider";

type Tab = "catalog" | "quick" | "lists";

const CATALOG = [
  { sku: "BR-M8", name: "Steel Bracket M8", stock: 640, price: 3.48 },
  { sku: "HB-K12", name: "Hex Bolt Kit", stock: 220, price: 12.9 },
  { sku: "PW-500", name: "Pallet Wrap 500mm", stock: 150, price: 8.4 },
] as const;

type Flash = {
  tone: "ok" | "info";
  text: string;
} | null;

export default function StorefrontDemo() {
  const { format } = useCurrency();
  const [tab, setTab] = useState<Tab>("catalog");
  const [cartLines, setCartLines] = useState(0);
  const [addedSkus, setAddedSkus] = useState<Record<string, boolean>>({});
  const [quickDone, setQuickDone] = useState(false);
  const [listDone, setListDone] = useState<Record<string, boolean>>({});
  const [flash, setFlash] = useState<Flash>(null);

  useEffect(() => {
    if (!flash) return;
    const id = window.setTimeout(() => setFlash(null), 2400);
    return () => window.clearTimeout(id);
  }, [flash]);

  const showFlash = (tone: "ok" | "info", text: string) => {
    setFlash({ tone, text });
  };

  const switchTab = (next: Tab) => {
    setTab(next);
  };

  const addCatalogItem = (sku: string, name: string) => {
    if (addedSkus[sku]) {
      showFlash("info", `${name} is already in your cart`);
      return;
    }
    setAddedSkus((prev) => ({ ...prev, [sku]: true }));
    setCartLines((n) => n + 1);
    showFlash("ok", `Added ${name} at your contract price`);
  };

  const addQuickOrder = () => {
    if (quickDone) {
      showFlash("info", "Those lines are already in the cart");
      return;
    }
    setQuickDone(true);
    setCartLines((n) => n + 2);
    showFlash("ok", "2 lines added — BR-M8 ×24, HB-K12 ×10");
  };

  const reorderList = (id: string, label: string, lines: number) => {
    if (listDone[id]) {
      showFlash("info", "Already in cart — ready when you are");
      return;
    }
    setListDone((prev) => ({ ...prev, [id]: true }));
    setCartLines((n) => n + lines);
    showFlash("ok", `${label} · ${lines} lines added to cart`);
  };

  return (
    <div className="sf-hero-visual relative flex min-h-0 w-full flex-col">
      <div className="sf-portal" aria-label="Interactive B2B storefront portal demo">
        <div className="sf-portal-head">
          <span className="sf-portal-pulse" aria-hidden="true" />
          <div className="sf-portal-head-text">
            <div className="sf-portal-title">Buyer portal</div>
            <div className="sf-portal-sub">Acme Industrial · Net 30 · your pricing</div>
          </div>
          <span className="sf-portal-live">Live demo</span>
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
              onClick={() => switchTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="sf-portal-body" aria-live="polite">
          {flash ? (
            <div
              className={`mb-2.5 flex items-center gap-2 rounded-[11px] px-3 py-2.5 text-[12.5px] leading-snug font-semibold ${
                flash.tone === "ok"
                  ? "bg-[#E7F6F1] text-[#0B7A5E]"
                  : "bg-[#F4EFFF] text-[#5B21D8]"
              }`}
            >
              <span
                className={`flex size-[18px] shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold text-white ${
                  flash.tone === "ok" ? "bg-[#0E9E7E]" : "bg-[#6E2CF4]"
                }`}
                aria-hidden="true"
              >
                {flash.tone === "ok" ? "✓" : "!"}
              </span>
              <span>{flash.text}</span>
            </div>
          ) : null}

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
                        onClick={() => addCatalogItem(row.sku, row.name)}
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
                onClick={addQuickOrder}
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
                  onClick={() => reorderList("mro", "Weekly MRO restock", 12)}
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
                  onClick={() => reorderList("ord", "ORD-2418", 8)}
                >
                  {listDone.ord ? "In cart ✓" : "Buy again →"}
                </button>
              </li>
            </ul>
          ) : null}
        </div>

        <div className="sf-portal-foot">
          <span className="sf-portal-stat">
            {cartLines > 0
              ? `Cart · ${cartLines} line${cartLines === 1 ? "" : "s"} · contract pricing`
              : "Customer-specific pricing · live stock"}
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-[10.5px] font-extrabold tracking-[0.04em] uppercase ${
              cartLines > 0 ? "bg-[#6E2CF4] text-white" : "bg-[#E7F6F1] text-[#0E9E7E]"
            }`}
          >
            {cartLines > 0 ? `${cartLines} in cart` : "24/7 self-serve"}
          </span>
        </div>
      </div>
      <p className="sf-portal-note">Branded portal — each buyer sees only their pricing and catalogue</p>
    </div>
  );
}
