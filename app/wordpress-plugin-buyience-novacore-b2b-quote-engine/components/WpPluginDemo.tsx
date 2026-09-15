"use client";

import React, { useState } from "react";
import { useCurrency } from "@/components/CurrencyProvider";

type Mode = "both" | "quote" | "cart";
type Viewer = "guest" | "trade";
type Hide = "show" | "hide";

const LIST = 4.2;
const NET = 3.02;

const fieldClass =
  "mt-[6px] w-full rounded-[10px] border border-[#E7DEFB] bg-white px-3 py-[8px] text-[12.5px] font-bold text-[#1B1033]";

export default function WpPluginDemo() {
  const { format } = useCurrency();
  const [mode, setMode] = useState<Mode>("quote");
  const [viewer, setViewer] = useState<Viewer>("trade");
  const [hide, setHide] = useState<Hide>("hide");
  const [nova, setNova] = useState(false);

  const isTrade = viewer === "trade";
  const priceHidden = hide === "hide" && !isTrade;

  let statusText: string;
  if (mode === "cart") {
    statusText =
      "Standard WooCommerce checkout. No quote button on this product — useful for retail lines you sell at list.";
  } else if (nova) {
    statusText =
      "Quote request opens in Nova Core with an AI price recommendation on every line, ready to negotiate in the Digital Sales Room.";
  } else {
    statusText =
      "Quote request is stored in WordPress and your team is notified. Everything here works without connecting an external service.";
  }

  const tags: { label: string; tone: "free" | "nova" }[] = [];
  if (mode !== "cart") tags.push({ label: "Request a quote · free", tone: "free" });
  if (isTrade) tags.push({ label: "Customer pricing · free", tone: "free" });
  if (nova && mode !== "cart") {
    tags.push({ label: "AI recommendation", tone: "nova" });
    tags.push({ label: "Sales Room", tone: "nova" });
  }

  return (
    <div
      className="quote-hero-visual aiq-console-wrap relative flex min-h-0 w-full flex-col self-start"
      style={{ alignSelf: "start" }}
    >
      <div
        className="aiq-console flex min-h-0 w-full flex-1 flex-col"
        aria-label="Buyience NovaCore — settings preview"
      >
        <div className="aiq-head">
          <span className="aiq-head-dot" aria-hidden="true" />
          <span className="aiq-head-title">Buyience NovaCore — settings preview</span>
          <span className="aiq-head-live">● Interactive</span>
        </div>

        <div className="aiq-body grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
          <div>
            <div className="aiq-label">Plugin settings</div>

            <label className="mt-2 block" htmlFor="wp-mode">
              <span className="text-[11.5px] font-semibold text-[#6A5A8C]">Product page buttons</span>
              <select
                id="wp-mode"
                className={fieldClass}
                value={mode}
                onChange={(e) => setMode(e.target.value as Mode)}
              >
                <option value="both">Add to Cart + Request a Quote</option>
                <option value="quote">Request a Quote only</option>
                <option value="cart">Add to Cart only</option>
              </select>
            </label>

            <label className="mt-3 block" htmlFor="wp-viewer">
              <span className="text-[11.5px] font-semibold text-[#6A5A8C]">Viewing as</span>
              <select
                id="wp-viewer"
                className={fieldClass}
                value={viewer}
                onChange={(e) => setViewer(e.target.value as Viewer)}
              >
                <option value="guest">Guest visitor</option>
                <option value="trade">Trade account · Tier 2</option>
              </select>
            </label>

            <label className="mt-3 block" htmlFor="wp-hide">
              <span className="text-[11.5px] font-semibold text-[#6A5A8C]">Price visibility</span>
              <select
                id="wp-hide"
                className={fieldClass}
                value={hide}
                onChange={(e) => setHide(e.target.value as Hide)}
              >
                <option value="show">Show price to everyone</option>
                <option value="hide">Hide price from guests</option>
              </select>
            </label>

            <label className="mt-4 flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={nova}
                onChange={(e) => setNova(e.target.checked)}
                className="size-4 accent-[#6E2CF4]"
                aria-label="Connect Nova Core account"
              />
              <span className="text-[13px] font-bold text-[#1B1033]">Connect Nova Core account</span>
            </label>
          </div>

          <div>
            <div className="aiq-label">What the buyer sees</div>
            <div className="mt-2 rounded-[14px] border border-[#EFE7FC] bg-[#FAF7FF] p-4">
              <div className="flex gap-3">
                <div
                  className="flex size-14 shrink-0 items-center justify-center rounded-[12px] bg-white text-[10px] font-extrabold tracking-[0.04em] text-(--violet-deep)"
                  aria-hidden="true"
                >
                  product image
                </div>
                <div className="min-w-0">
                  <div className="text-[14px] font-extrabold text-[#1B1033]">
                    Industrial Bearing — SKF 6205-2RS
                  </div>
                  <div className="mt-1 text-[12px] font-semibold text-[#6A5A8C]">
                    SKU: SKF-6205 · In stock
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-baseline gap-2">
                {priceHidden ? (
                  <span className="text-[18px] font-extrabold text-[#1B1033]">Price on request</span>
                ) : isTrade ? (
                  <>
                    <span className="text-[18px] font-extrabold text-[#1B1033]">{format(NET, 2)}</span>
                    <span className="text-[13px] font-semibold text-[#9A94C4] line-through">
                      {format(LIST, 2)}
                    </span>
                    <span className="rounded-full bg-[#E8F8F0] px-2 py-0.5 text-[10.5px] font-bold tracking-wide text-[#0F7A4A] uppercase">
                      Your contract price
                    </span>
                  </>
                ) : (
                  <span className="text-[18px] font-extrabold text-[#1B1033]">{format(LIST, 2)}</span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {mode === "both" || mode === "cart" ? (
                  <button
                    type="button"
                    className="rounded-[12px] border border-[#E7DEFB] bg-white px-3.5 py-2.5 text-[13px] font-bold text-[#6E2CF4]"
                  >
                    Add to cart
                  </button>
                ) : null}
                {mode === "both" || mode === "quote" ? (
                  <button type="button" className="aiq-send" style={{ marginTop: 0, width: "auto" }}>
                    Request a quote
                  </button>
                ) : null}
              </div>

              <div className="aiq-tip mt-3 mb-0">
                <span className="aiq-tip-icon" aria-hidden="true">
                  ✦
                </span>
                <span className="aiq-tip-text">{statusText}</span>
              </div>

              {tags.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag.label}
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${
                        tag.tone === "nova"
                          ? "bg-[#EFE7FC] text-[#6E2CF4]"
                          : "bg-[#E8F8F0] text-[#0F7A4A]"
                      }`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-[12px] font-medium text-[#6A5A8C]">
        Illustrative preview of plugin settings. Product and pricing shown are sample data.
      </p>
    </div>
  );
}
