"use client";

import React, { useState } from "react";
import { useCurrency } from "@/components/CurrencyProvider";

type Tab = "catalog" | "quick" | "lists";

const CATALOG = [
  { sku: "BR-M8", name: "Steel Bracket M8", stock: 640 },
  { sku: "HB-K12", name: "Hex Bolt Kit", stock: 220 },
  { sku: "PW-500", name: "Pallet Wrap 500mm", stock: 150 },
] as const;

export default function StorefrontDemo() {
  const { format } = useCurrency();
  const [tab, setTab] = useState<Tab>("catalog");

  const unit = (sku: string) => {
    if (sku === "BR-M8") return format(3.48, 2);
    if (sku === "HB-K12") return format(12.9, 2);
    return format(8.4, 2);
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
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="sf-portal-body">
          {tab === "catalog" ? (
            <ul className="sf-portal-rows">
              {CATALOG.map((row) => (
                <li key={row.sku}>
                  <div className="sf-portal-row-main">
                    <b>{row.name}</b>
                    <span>{row.sku}</span>
                  </div>
                  <div className="sf-portal-row-meta">
                    <span className="sf-portal-price">{unit(row.sku)}</span>
                    <span className="sf-portal-stock">{row.stock} in stock</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}

          {tab === "quick" ? (
            <div className="sf-portal-quick">
              <label className="sf-portal-field">
                <span>SKU / CSV paste</span>
                <div className="sf-portal-input">BR-M8,24{"\n"}HB-K12,10</div>
              </label>
              <div className="sf-portal-hint">Prices apply from Acme&apos;s contract list — no browsing required.</div>
              <button type="button" className="sf-portal-btn">
                Add 2 lines to cart →
              </button>
            </div>
          ) : null}

          {tab === "lists" ? (
            <ul className="sf-portal-rows">
              <li>
                <div className="sf-portal-row-main">
                  <b>Weekly MRO restock</b>
                  <span>12 SKUs</span>
                </div>
                <button type="button" className="sf-portal-reorder">
                  Reorder →
                </button>
              </li>
              <li>
                <div className="sf-portal-row-main">
                  <b>Last order · ORD-2418</b>
                  <span>8 lines · {format(14640, 0)}</span>
                </div>
                <button type="button" className="sf-portal-reorder">
                  Buy again →
                </button>
              </li>
            </ul>
          ) : null}
        </div>

        <div className="sf-portal-foot">
          <span className="sf-portal-stat">Customer-specific pricing · live stock</span>
          <span className="sf-portal-badge">24/7 self-serve</span>
        </div>
      </div>
      <p className="sf-portal-note">Branded portal — each buyer sees only their pricing and catalogue</p>
    </div>
  );
}
