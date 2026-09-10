"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import { MiniRow, MiniUi } from "@/components/MiniUi";
import SplitFeatureSection from "@/components/SplitFeatureSection";

function FeatureList({
  items,
}: {
  items: { label: string; detail: string }[];
}) {
  return (
    <ul className="mt-4.5 list-none p-0">
      {items.map((item) => (
        <li
          key={item.label}
          className="flex items-start gap-2.75 py-1.75 text-[15.5px] text-(--ink-soft)"
        >
          <span
            className="mt-0.75 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-(--mint-tint) text-[10px] font-bold text-(--mint)"
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

export default function SupplierDivesSection({ purple = false }: { purple?: boolean }) {
  return (
    <SplitFeatureSection
      purple={purple}
      className="pt-15 pb-15"
      rows={[
        {
          eyebrow: "SUPPLIER DASHBOARD",
          title: "Every supplier. One view.",
          description: (
            <>
              <p>
                See all suppliers at a glance. Sortable columns, status badges, and click-to-edit navigation. Search by
                company name, email, or registration number.
              </p>
              <FeatureList
                items={[
                  { label: "Table display", detail: "ID, company info, contact, status, actions" },
                  { label: "Status badges", detail: "colour-coded at a glance" },
                  { label: "Click-to-edit", detail: "click any row to open supplier details" },
                  { label: "Search & filter", detail: "find suppliers by name, email, phone" },
                ]}
              />
            </>
          ),
          visual: (
            <MiniUi label="Supplier dashboard rows">
              <MiniRow tone="done" tag="APPROVED">
                Nordfab Components GmbH · EUR · Net 30
              </MiniRow>
              <MiniRow tone="warn" tag="PENDING">
                Askern Packaging Ltd · GBP · in review
              </MiniRow>
              <MiniRow tone="done" tag="APPROVED">
                Meiwa Trading Co. · USD · Net 60
              </MiniRow>
              <MiniRow tone="warn" tag="REJECTED">
                Incomplete compliance documents
              </MiniRow>
            </MiniUi>
          ),
        },
        {
          eyebrow: "COMPLIANCE TRACKING",
          title: "Track every certificate. See every expiry coming.",
          description: (
            <>
              <p>
                Upload compliance documents as PDFs. Track issue dates, expiry dates, and verification status. The system
                automatically calculates certificate status based on dates.
              </p>
              <FeatureList
                items={[
                  { label: "PDF upload", detail: "secure storage with file validation" },
                  { label: "Date tracking", detail: "issue date, expiry date, last verified" },
                  { label: "Auto-status", detail: "calculated from dates automatically" },
                ]}
              />
            </>
          ),
          visual: (
            <MiniUi label="Certificate statuses">
              <MiniRow tone="done" tag="VALID">
                ISO 9001 · expires Dec 2026
              </MiniRow>
              <MiniRow tone="warn" tag="EXPIRING">
                Liability insurance · 21 days left
              </MiniRow>
              <MiniRow tag="PENDING">Import licence · awaiting verification</MiniRow>
            </MiniUi>
          ),
        },
        {
          eyebrow: "LOGISTICS & DELIVERY",
          title: "Configure how suppliers deliver.",
          description: (
            <>
              <p>
                Define shipping methods, service coverage, and delivery schedules for each supplier. Set up delivery zones
                with specific postal codes and special instructions.
              </p>
              <FeatureList
                items={[
                  { label: "Shipping", detail: "methods and transit times per supplier" },
                  { label: "Delivery zones", detail: "postal-code precision" },
                  { label: "Order rules", detail: "minimums and special instructions" },
                ]}
              />
            </>
          ),
          visual: (
            <MiniUi label="Service coverage and logistics">
              <MiniRow tag="METHOD">Road freight · 5-day transit</MiniRow>
              <MiniRow tag="ZONE">UK mainland + EU · postal-code rules</MiniRow>
              <MiniRow tone="warn" tag="RULES">
                Min order £500 · chilled transport required
              </MiniRow>
              <MiniRow tone="active" tag="COVER">
                Domestic · international · cross-border
              </MiniRow>
            </MiniUi>
          ),
        },
      ]}
      footer={
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="po-callout reveal in"
        >
          <div>
            <h3>⚡ Linked straight to purchase orders.</h3>
            <p>
              Approved suppliers connect directly to purchasing: when stock falls below safety levels, one-click POs are
              generated with the preferred supplier already attached. The full reorder flow lives on the inventory
              management page.
            </p>
          </div>
          <Button variant="primary" href="/inventory-management">
            Inventory management
          </Button>
        </motion.div>
      }
    />
  );
}
