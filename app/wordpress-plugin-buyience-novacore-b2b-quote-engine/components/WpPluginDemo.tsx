"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCurrency } from "@/components/CurrencyProvider";

type Mode = "both" | "quote" | "cart";
type Viewer = "guest" | "trade";
type Hide = "show" | "hide";

const LIST = 4.2;
const NET = 3.02;

const fieldClass =
  "mt-[5px] w-full rounded-[10px] border border-[#E7DEFB] bg-white px-3 py-[7px] text-[12.5px] font-bold text-[#1B1033]";

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
      style={{ alignSelf: "start", height: "auto" }}
    >
      <div
        className="aiq-console flex min-h-0 w-full flex-col"
        style={{ flex: "0 1 auto", height: "auto" }}
        aria-label="Buyience NovaCore — settings preview"
      >
        <div className="aiq-head min-w-0 gap-2">
          <span className="aiq-head-dot shrink-0" aria-hidden="true" />
          <span className="aiq-head-title min-w-0 flex-1 truncate text-[13px] sm:text-[14px]">
            <span className="sm:hidden">NovaCore — settings</span>
            <span className="hidden sm:inline">Buyience NovaCore — settings preview</span>
          </span>
          <span className="aiq-head-live shrink-0 text-[10px] sm:text-[11px]">● Interactive</span>
        </div>

        <div
          className="aiq-body grid min-h-0 grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4"
          style={{ flex: "0 1 auto" }}
        >
          <div>
            <div className="aiq-label">Plugin settings</div>

            <label className="mt-1.5 block" htmlFor="wp-mode">
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

            <label className="mt-2 block" htmlFor="wp-viewer">
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

            <label className="mt-2 block" htmlFor="wp-hide">
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

            <label className="mt-3 flex cursor-pointer items-center gap-3">
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
            <div className="mt-1.5 rounded-[14px] border border-[#EFE7FC] bg-[#FAF7FF] p-3 sm:p-3.5">
              <div className="flex gap-3">
                <div className="size-12 shrink-0 overflow-hidden rounded-[12px] border border-[#EFE7FC] bg-white sm:size-14">
                  <Image
                    src="/images/products/industrial-bearing.png"
                    alt="Industrial Bearing — SKF 6205-2RS"
                    width={56}
                    height={56}
                    className="size-full object-contain p-0.5"
                    unoptimized
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-extrabold text-[#1B1033] sm:text-[14px]">
                    Industrial Bearing — SKF 6205-2RS
                  </div>
                  <div className="mt-1 text-[11px] font-semibold text-[#6A5A8C] sm:text-[12px]">
                    SKU: SKF-6205 · In stock
                  </div>
                </div>
              </div>

              <div className="mt-2.5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                <div className="flex min-w-0 flex-wrap items-baseline gap-2">
                  {priceHidden ? (
                    <span className="text-[17px] font-extrabold text-[#1B1033] sm:text-[18px]">
                      Price on request
                    </span>
                  ) : isTrade ? (
                    <>
                      <span className="text-[17px] font-extrabold text-[#1B1033] sm:text-[18px]">
                        {format(NET, 2)}
                      </span>
                      <span className="text-[12px] font-semibold text-[#9A94C4] line-through sm:text-[13px]">
                        {format(LIST, 2)}
                      </span>
                      <span className="rounded-full bg-[#E8F8F0] px-2 py-0.5 text-[10px] font-bold tracking-wide text-[#0F7A4A] uppercase sm:text-[10.5px]">
                        Your contract price
                      </span>
                    </>
                  ) : (
                    <span className="text-[17px] font-extrabold text-[#1B1033] sm:text-[18px]">
                      {format(LIST, 2)}
                    </span>
                  )}
                </div>

                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
                  {mode === "both" || mode === "cart" ? (
                    <span className="rounded-[12px] border border-[#E7DEFB] bg-white px-3.5 py-2.5 text-center text-[13px] font-bold text-[#6E2CF4] sm:text-left">
                      Add to cart
                    </span>
                  ) : null}
                  {mode === "both" || mode === "quote" ? (
                    <span
                      className="aiq-send !mt-0 w-full text-center text-[13.5px] !py-[11px] sm:w-auto sm:text-left"
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                        cursor: "default",
                      }}
                    >
                      {nova ? "Quote → Sales Room" : "Request a quote"}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="aiq-tip mt-2.5 mb-0">
                <span className="aiq-tip-icon" aria-hidden="true">
                  ✦
                </span>
                <span className="aiq-tip-text">{statusText}</span>
              </div>

              {tags.length > 0 ? (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
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
      <p className="mt-2.5 text-center text-[12px] font-medium text-[#6A5A8C]">
        Illustrative preview of plugin settings. Product and pricing shown are sample data.
      </p>
    </div>
  );
}
