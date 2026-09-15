"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MessageSquareQuote,
  BadgePercent,
  UserRound,
  RefreshCw,
  Sparkles,
  PanelsTopLeft,
} from "lucide-react";

const FEATURES = [
  {
    tag: "Free plugin",
    title: "Request a Quote",
    description:
      "Add a Request a Quote button to any WooCommerce product — replace Add to Cart, or offer both. Button text, colour and position are all configurable, and quotes carry SKU and quantity.",
    Icon: MessageSquareQuote,
  },
  {
    tag: "Free plugin",
    title: "Customer-specific pricing",
    description:
      "Show each buyer their negotiated prices and payment terms, with tiered and contract-based pricing rules instead of one retail number for everyone.",
    Icon: BadgePercent,
  },
  {
    tag: "Free plugin",
    title: "Buyer portal",
    description:
      "Buyers view quotes, approve offers, manage orders and download invoices from a dedicated portal — so reorders stop arriving as email.",
    Icon: UserRound,
  },
  {
    tag: "Free plugin",
    title: "WooCommerce product sync",
    description:
      "Synchronise WooCommerce products with Buyience manually or on a daily schedule, with sync logs you can review when something looks off.",
    Icon: RefreshCw,
  },
  {
    tag: "With Nova Core",
    title: "AI-assisted quotes",
    description:
      "Optional quote recommendations drawn from pricing history and buyer behaviour. Recommendations only — a person approves every price, and nothing is set automatically.",
    Icon: Sparkles,
  },
  {
    tag: "With Nova Core",
    title: "Digital Sales Room",
    description:
      "Move complex deals into a real-time negotiation room with revision history on every line, instead of a chain of forwarded emails.",
    Icon: PanelsTopLeft,
  },
];

export default function WpCapabilities({ purple = false }: { purple?: boolean }) {
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
          <h2>B2B features inside your WordPress dashboard</h2>
          <p className="lede">
            Tags show what ships in the free plugin and what needs a connected Nova Core account.
          </p>
        </motion.div>

        <div className="cap-grid">
          {FEATURES.map((item, idx) => (
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
              <span
                className={`mb-3 inline-flex rounded-full px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-[0.04em] ${
                  item.tag === "Free plugin"
                    ? "bg-(--mint-tint) text-(--mint)"
                    : "bg-(--violet-tint) text-(--violet-deep)"
                }`}
              >
                {item.tag}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
