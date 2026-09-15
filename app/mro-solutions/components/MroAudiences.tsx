"use client";

import React from "react";
import { motion } from "framer-motion";

const AUDIENCES = [
  {
    title: "Industrial distributors",
    description:
      "Broad-line catalogues sold to contracted plants across bearings, hydraulics, tools and consumables.",
  },
  {
    title: "Safety & PPE suppliers",
    description: "Sizing, standards and pack variants, with reorder cycles tied to headcount rather than machinery.",
  },
  {
    title: "Fasteners & fixings",
    description: "High line counts, small values, and pricing that only makes sense per hundred or per thousand.",
  },
  {
    title: "Electrical & automation",
    description: "Manufacturer part numbers, long-tail stock, and project buys that sit alongside routine replenishment.",
  },
  {
    title: "Facilities & janitorial",
    description: "Repeat consumables across many sites, each with its own ship-to and its own ordering habits.",
  },
];

export default function MroAudiences({ purple = false }: { purple?: boolean }) {
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
