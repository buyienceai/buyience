"use client";

import React from "react";
import { motion } from "framer-motion";

const AUDIENCES = [
  {
    title: "Aftermarket distributors",
    description: "SKU-heavy ranges across many brands, sold to workshops and jobbers on tiered nets.",
  },
  {
    title: "Tyre & battery wholesalers",
    description: "Size, load index and speed rating as filters; fast-moving stock across depots.",
  },
  {
    title: "Commercial vehicle & fleet",
    description: "Contracted schedules, scheduled maintenance parts, and downtime that costs by the hour.",
  },
  {
    title: "OE & OES suppliers",
    description: "Kits and part sets quoted as catalogue products today, with full configuration coming soon.",
  },
  {
    title: "Multi-brand dealer groups",
    description: "Separate storefronts and price books per brand, one operations and reporting layer.",
  },
];

export default function AutomotiveAudiences({ purple = false }: { purple?: boolean }) {
  return (
    <section className={purple ? "bg-(--surface)" : undefined}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="center-head reveal in"
        >
          <p className="eyebrow">WHO IT IS FOR</p>
          <h2>Who it is for</h2>
        </motion.div>

        <div className="cap-grid">
          {AUDIENCES.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="cap-card"
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
