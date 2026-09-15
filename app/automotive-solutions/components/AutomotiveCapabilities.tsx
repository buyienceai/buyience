"use client";

import React from "react";
import { motion } from "framer-motion";
import { Car, BadgePercent, Warehouse, Sparkles, MessageSquare, ClipboardCheck } from "lucide-react";

const CAPABILITIES = [
  {
    title: "Fitment-aware catalogue",
    description: "Structure your range so buyers find parts the way they think about them — by vehicle, then by line.",
    bullets: [
      "Year / make / model / engine filtering",
      "OE and interchange cross-references",
      "Supersession chains resolve to current SKU",
      "Import by CSV or push over the API",
    ],
    Icon: Car,
  },
  {
    title: "Customer-specific nets",
    description:
      "Price resolves at line level from the account tier, product group, contract and volume break.",
    bullets: [
      "Unlimited price lists and discount matrices",
      "Contracted rates for fleet accounts",
      "Volume breaks and campaign pricing",
      "Net 30 / 60 / 90 terms per account",
    ],
    Icon: BadgePercent,
  },
  {
    title: "Multi-branch inventory",
    description: "Show the truth about availability so the counter stops fielding stock checks.",
    bullets: [
      "Live stock by depot and warehouse",
      "Allocation and transfer orders",
      "Backorder visibility with expected dates",
      "Will-call and delivery routing per branch",
    ],
    Icon: Warehouse,
  },
  {
    title: "AI-assisted quoting",
    description: "Quote a 40-line fleet schedule without rebuilding it in a spreadsheet first.",
    bullets: [
      "Suggested price per line with visible floor",
      "Live margin guardrails as you concede",
      "Bulk quoting from a pasted parts list",
      "Quote converts straight to order",
    ],
    Icon: Sparkles,
  },
  {
    title: "Digital Sales Room",
    description: "Move the negotiation out of email and into a room with a record.",
    bullets: [
      "Real-time back-and-forth on the live quote",
      "Revision history on every line",
      "Buying-committee access and approvals",
      "One-click acceptance",
    ],
    Icon: MessageSquare,
  },
  {
    title: "Orders, cores and returns",
    description: "Keep the paperwork after the sale attached to the order that caused it.",
    bullets: [
      "Core deposits as their own charge line",
      "Returns and credits against order reference",
      "Order tracking and dispatch status",
      "Supplier purchase orders and approvals",
    ],
    Icon: ClipboardCheck,
  },
];

export default function AutomotiveCapabilities({ purple = false }: { purple?: boolean }) {
  return (
    <section id="capabilities" className={purple ? "bg-(--surface)" : undefined}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="center-head reveal in"
        >
          <p className="eyebrow">CAPABILITIES</p>
          <h2>What Nova Core does for a parts business</h2>
          <p className="lede">
            Six things that have to work together. They are one platform here, not six integrations you maintain.
          </p>
        </motion.div>

        <div className="cap-grid">
          {CAPABILITIES.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="cap-card"
            >
              <div className="cap-icon" aria-hidden="true">
                <item.Icon size={20} strokeWidth={2} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ul className="m-0 mt-4 list-none p-0">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="relative mb-1.5 pl-3.5 text-[13.5px] leading-relaxed text-(--muted) last:mb-0 before:absolute before:top-[0.55em] before:left-0 before:size-1.5 before:rounded-full before:bg-brand-purple"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
