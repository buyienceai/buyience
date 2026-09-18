"use client";

import React from "react";
import { motion } from "framer-motion";

type Status = "mapped" | "native" | "soon" | "integration" | "project";

const ROWS: { data: string; how: string; status: Status; label: string }[] = [
  {
    data: "Vehicle fitment",
    how: "Modelled as structured product attributes — make, model, variant, engine, year range — and exposed as storefront filters.",
    status: "mapped",
    label: "Mapped",
  },
  {
    data: "OE cross-references",
    how: "Stored against each SKU as searchable alternate identifiers, so an OE number returns your equivalent part.",
    status: "mapped",
    label: "Mapped",
  },
  {
    data: "Supersessions",
    how: "Old part numbers remain searchable and resolve to the current SKU; chains are maintained in bulk.",
    status: "mapped",
    label: "Mapped",
  },
  {
    data: "Customer price lists",
    how: "Unlimited price lists, tier matrices and contracted rates, resolved per line at quote and order time.",
    status: "native",
    label: "Native",
  },
  {
    data: "Multi-warehouse stock",
    how: "Real-time quantities per location with allocation and transfer orders.",
    status: "native",
    label: "Native",
  },
  {
    data: "Fixed kits & part sets",
    how: "Sold as standard catalogue products with their own SKU, pricing and stock.",
    status: "native",
    label: "Native",
  },
  {
    data: "Configurable assemblies",
    how: "The CPQ configurator — option groups, conflict rules and dynamic pricing for built-to-order assemblies.",
    status: "soon",
    label: "Coming soon",
  },
  {
    data: "Registration / VIN lookup",
    how: "Connected through a third-party lookup provider over the API and mapped onto your fitment attributes.",
    status: "integration",
    label: "Via integration",
  },
  {
    data: "Industry data feeds",
    how: "ACES/PIES and TecDoc-style feeds are imported by transforming them into the catalogue and attribute model — scoped per project.",
    status: "project",
    label: "Project scope",
  },
];

const STATUS_CLASS: Record<Status, string> = {
  mapped: "bg-(--violet-tint) text-(--violet-deep)",
  native: "bg-(--mint-tint) text-(--mint)",
  soon: "bg-(--amber-tint) text-(--amber)",
  integration: "bg-(--surface-2) text-(--ink-soft)",
  project: "bg-[#EEF1F5] text-[#5B6B82]",
};

export default function AutomotiveData({ purple = false }: { purple?: boolean }) {
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
          <p className="eyebrow">DATA</p>
          <h2>How automotive data is handled</h2>
          <p className="lede">
            Parts data is the part of the project that decides the timeline. Here is what Nova Core does with each
            piece of it, stated plainly.
          </p>
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
                    Data
                  </th>
                  <th className="px-6 py-3 text-[11px] font-extrabold tracking-[0.08em] text-(--muted) uppercase lg:px-8">
                    How it works in Nova Core
                  </th>
                  <th className="px-6 py-3 text-[11px] font-extrabold tracking-[0.08em] text-(--muted) uppercase lg:px-8">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.data} className="border-b border-(--border) last:border-b-0">
                    <td className="px-6 py-4 align-top text-[14.5px] font-bold text-[#1B1033] lg:px-8">{row.data}</td>
                    <td className="px-6 py-4 align-top text-[14px] leading-relaxed text-(--muted) lg:px-8">{row.how}</td>
                    <td className="px-6 py-4 align-top whitespace-nowrap lg:px-8">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-[0.04em] ${STATUS_CLASS[row.status]}`}
                      >
                        {row.label}
                      </span>
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
