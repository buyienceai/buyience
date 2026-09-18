"use client";

import React from "react";
import { motion } from "framer-motion";

type Status = "mapped" | "native" | "soon" | "project";

const ROWS: { data: string; how: string; status: Status; label: string }[] = [
  {
    data: "Contract price lists",
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
    data: "Customer part numbers",
    how: "Held against your SKU as searchable alternate identifiers, alongside manufacturer and supplier codes.",
    status: "mapped",
    label: "Mapped",
  },
  {
    data: "Pack & UOM variants",
    how: "Modelled as priced options against the item, each with its own price and stock position.",
    status: "mapped",
    label: "Mapped",
  },
  {
    data: "Classification codes",
    how: "UNSPSC, ETIM and internal category codes stored as product attributes and usable as filters.",
    status: "mapped",
    label: "Mapped",
  },
  {
    data: "Compliance documents",
    how: "Safety data sheets, certificates and spec sheets attached to the product record for buyers to download.",
    status: "mapped",
    label: "Mapped",
  },
  {
    data: "Configurable assemblies",
    how: "The CPQ configurator — option groups, conflict rules and dynamic pricing for built-to-order assemblies.",
    status: "soon",
    label: "Coming soon",
  },
  {
    data: "Punchout catalogues",
    how: "cXML and OCI punchout into Ariba, Coupa or SAP is built against the REST APIs — scoped per project.",
    status: "project",
    label: "Project scope",
  },
  {
    data: "EDI transaction sets",
    how: "850, 855, 856 and 810 exchanged through middleware connected to the order and catalogue APIs — scoped per project.",
    status: "project",
    label: "Project scope",
  },
];

const STATUS_CLASS: Record<Status, string> = {
  mapped: "bg-(--violet-tint) text-(--violet-deep)",
  native: "bg-(--mint-tint) text-(--mint)",
  soon: "bg-(--amber-tint) text-(--amber)",
  project: "bg-[#EEF1F5] text-[#5B6B82]",
};

export default function MroData({ purple = false }: { purple?: boolean }) {
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
          <h2>How MRO data is handled</h2>
          <p className="lede">
            Data and procurement plumbing decide the timeline on an MRO project. Here is what Nova Core does with each
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
