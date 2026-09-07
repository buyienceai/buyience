"use client";

import React from "react";
import { MiniRow, MiniUi } from "@/components/MiniUi";
import SplitFeatureSection from "@/components/SplitFeatureSection";

function FeatureList({ items }: { items: { label: string; detail: string }[] }) {
  return (
    <ul className="mt-4.5 list-none p-0">
      {items.map((item) => (
        <li
          key={item.label}
          className="flex items-start gap-2.75 py-1.75 text-[15.5px] text-(--ink-soft)"
        >
          <span
            className="mt-0.75 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-(--violet) text-[10px] font-bold text-white"
            aria-hidden="true"
          >
            ✓
          </span>
          <span>
            <b className="text-(--ink)">{item.label}</b> — {item.detail}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function StorefrontDivesSection({ purple = false }: { purple?: boolean }) {
  return (
    <SplitFeatureSection
      purple={purple}
      className="pt-15 pb-15"
      rows={[
        {
          eyebrow: "SELF-SERVICE PORTAL",
          title: "Everything your buyers need in one place.",
          description: (
            <>
              <p>
                A branded portal where customers manage their entire relationship with you — orders, quotes, invoices
                and account settings — without calling your team.
              </p>
              <FeatureList
                items={[
                  { label: "Invoices", detail: "view and pay open invoices" },
                  { label: "Shipments", detail: "track deliveries in real time" },
                  { label: "Documents", detail: "download order confirmations & BOLs" },
                  { label: "Permissions", detail: "manage user access per account" },
                ]}
              />
            </>
          ),
          visual: (
            <MiniUi label="Buyer self-service portal">
              <MiniRow tone="warn" tag="INVOICE">
                INV-4412 · Net 30 · due in 6 days
              </MiniRow>
              <MiniRow tone="active" tag="SHIPPED">
                ORD-2418 · DHL · in transit
              </MiniRow>
              <MiniRow tone="done" tag="BOL">
                Confirmation & BOL ready to download
              </MiniRow>
              <MiniRow tag="USERS">3 buyers · 1 admin on this account</MiniRow>
            </MiniUi>
          ),
        },
        {
          eyebrow: "PRODUCT CATALOG",
          title: "B2B catalog built for complex products",
          description: (
            <>
              <p>
                Support for variants, bundles, minimum order quantities, case packs, and customer-restricted products.
                Not a B2C catalog with B2B bolted on.
              </p>
              <FeatureList
                items={[
                  { label: "Variants & attributes", detail: "unlimited product options" },
                  { label: "Catalog visibility", detail: "customer-specific assortments" },
                  { label: "MOQs & case packs", detail: "enforce how products actually sell" },
                  { label: "Bundles & kits", detail: "sell configurations as one line" },
                ]}
              />
            </>
          ),
          visual: (
            <MiniUi label="B2B catalog rules">
              <MiniRow tone="done" tag="VARIANT">
                Steel Bracket · M6 / M8 / M10
              </MiniRow>
              <MiniRow tone="active" tag="MOQ">
                Case pack 12 · min order 2 cases
              </MiniRow>
              <MiniRow tag="VISIBILITY">Hidden from cash-account buyers</MiniRow>
              <MiniRow tone="done" tag="KIT">
                Starter kit · 4 components
              </MiniRow>
            </MiniUi>
          ),
        },
      ]}
    />
  );
}
