"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BadgePercent,
  Crosshair,
  Warehouse,
  Sparkles,
  MessageSquare,
  RefreshCw,
} from "lucide-react";

const CAPABILITIES = [
  {
    title: "Contract pricing",
    description:
      "The agreement becomes the price the buyer actually sees, not a discount applied later by someone at a desk.",
    bullets: [
      "Unlimited price lists and discount matrices",
      "Contracted rates per account or per site",
      "Volume breaks and campaign pricing",
      "Net 30 / 60 / 90 terms per account",
    ],
    Icon: BadgePercent,
  },
  {
    title: "Cross-references & UOM",
    description: "Let the buyer search the way their item master is written, and price the pack the way they buy it.",
    bullets: [
      "Customer part numbers as searchable codes",
      "Manufacturer and supplier part numbers",
      "Pack and unit-of-measure variants priced separately",
      "Classification codes held on the product record",
    ],
    Icon: Crosshair,
  },
  {
    title: "Multi-branch inventory",
    description: 'Answer "can you get it here today" without three phone calls and an optimistic guess.',
    bullets: [
      "Live stock by depot and warehouse",
      "Allocation and transfer orders",
      "Backorder visibility with expected dates",
      "Non-stock and direct-ship lead times",
    ],
    Icon: Warehouse,
  },
  {
    title: "AI-assisted bulk quoting",
    description: "Turn a 200-line tender into a reviewed quote in an afternoon instead of a week.",
    bullets: [
      "Suggested price per line with visible floor",
      "Live margin guardrails as you concede",
      "Bulk quoting from a pasted schedule",
      "Quote converts straight to order",
    ],
    Icon: Sparkles,
  },
  {
    title: "Digital Sales Room",
    description: "Keep the tender negotiation in one room with a record, instead of across nine forwarded emails.",
    bullets: [
      "Real-time back-and-forth on the live quote",
      "Revision history on every line",
      "Buying-committee access and approvals",
      "One-click acceptance",
    ],
    Icon: MessageSquare,
  },
  {
    title: "Self-service reordering",
    description: "Give routine consumable demand somewhere to go that is not your inside sales desk.",
    bullets: [
      "Customer portal with order history",
      "Reorder from a previous order",
      "Order tracking and dispatch status",
      "Supplier purchase orders and approvals",
    ],
    Icon: RefreshCw,
  },
];

export default function MroCapabilities({ purple = false }: { purple?: boolean }) {
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
          <h2>What Nova Core does for an MRO business</h2>
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
