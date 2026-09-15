"use client";

import React from "react";
import { motion } from "framer-motion";

type Cell = { text: string; tone?: "yes" | "no" | "soon" };

const ROWS: { capability: string; alone: Cell; withBuyience: Cell }[] = [
  {
    capability: "Request a quote on products",
    alone: { text: "Add-on plugins" },
    withBuyience: { text: "Built in, free", tone: "yes" },
  },
  {
    capability: "Customer-specific pricing",
    alone: { text: "Requires plugins" },
    withBuyience: { text: "Built in, free", tone: "yes" },
  },
  {
    capability: "Buyer portal — quotes & invoices",
    alone: { text: "Not available", tone: "no" },
    withBuyience: { text: "Built in, free", tone: "yes" },
  },
  {
    capability: "WooCommerce product sync with logs",
    alone: { text: "Not available", tone: "no" },
    withBuyience: { text: "Built in, free", tone: "yes" },
  },
  {
    capability: "AI-assisted quote recommendations",
    alone: { text: "Not available", tone: "no" },
    withBuyience: { text: "With Nova Core", tone: "yes" },
  },
  {
    capability: "Real-time negotiation room",
    alone: { text: "Not available", tone: "no" },
    withBuyience: { text: "With Nova Core", tone: "yes" },
  },
  {
    capability: "Multi-warehouse inventory",
    alone: { text: "Requires plugins" },
    withBuyience: { text: "With Nova Core", tone: "yes" },
  },
  {
    capability: "Product configurator (CPQ)",
    alone: { text: "Not available", tone: "no" },
    withBuyience: { text: "Coming soon", tone: "soon" },
  },
];

function CellBadge({ cell }: { cell: Cell }) {
  if (!cell.tone) {
    return <span className="text-[14px] text-(--muted)">{cell.text}</span>;
  }
  const cls =
    cell.tone === "yes"
      ? "bg-(--mint-tint) text-(--mint)"
      : cell.tone === "soon"
        ? "bg-(--amber-tint) text-(--amber)"
        : "bg-(--red-tint) text-(--red)";
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-[0.04em] ${cls}`}>
      {cell.tone === "yes" ? `✓ ${cell.text}` : cell.tone === "no" ? `✕ ${cell.text}` : `◷ ${cell.text}`}
    </span>
  );
}

export default function WpComparison({ purple = false }: { purple?: boolean }) {
  return (
    <section className={purple ? "bg-(--surface)" : undefined}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="center-head"
        >
          <p className="eyebrow">COMPARISON</p>
          <h2>WooCommerce alone vs WooCommerce + Nova Core</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mt-12 overflow-hidden rounded-3xl border border-(--border) bg-white md:mt-16"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-(--border) bg-(--surface)">
                  <th className="px-6 py-3 text-[11px] font-extrabold tracking-[0.08em] text-(--muted) uppercase lg:px-8">
                    Capability
                  </th>
                  <th className="px-6 py-3 text-[11px] font-extrabold tracking-[0.08em] text-(--muted) uppercase lg:px-8">
                    WooCommerce alone
                  </th>
                  <th className="px-6 py-3 text-[11px] font-extrabold tracking-[0.08em] text-brand-purple uppercase lg:px-8">
                    + Buyience &amp; Nova Core
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.capability} className="border-b border-(--border) last:border-b-0">
                    <td className="px-6 py-4 align-middle text-[14.5px] font-bold text-[#1B1033] lg:px-8">
                      {row.capability}
                    </td>
                    <td className="px-6 py-4 align-middle lg:px-8">
                      <CellBadge cell={row.alone} />
                    </td>
                    <td className="px-6 py-4 align-middle lg:px-8">
                      <CellBadge cell={row.withBuyience} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
