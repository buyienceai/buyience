"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, LayoutTemplate, Plug, Server } from "lucide-react";

const CARDS = [
  {
    title: "Modern WordPress",
    description:
      "Requires WordPress 5.8 or higher on PHP 7.4 or higher. Current release tested up to 6.9.7.",
    chip: "WP 5.8+",
    Icon: Server,
  },
  {
    title: "WooCommerce",
    description:
      "Adds Request a Quote to product pages and syncs products through the WooCommerce REST API.",
    chip: "REST API",
    Icon: Plug,
  },
  {
    title: "Any theme or builder",
    description:
      "Standard WooCommerce hooks plus a shortcode, so Elementor, Divi, Astra and custom themes all work.",
    chip: "Shortcode",
    Icon: LayoutTemplate,
  },
  {
    title: "REST API",
    description:
      "Token-based authorisation between WordPress and Buyience, with permission callbacks on every route.",
    chip: "Secure token",
    Icon: Code2,
  },
];

export default function WpStack({ purple = false }: { purple?: boolean }) {
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
          <p className="eyebrow">FITS YOUR STACK</p>
          <h2>Works with your existing stack</h2>
          <p className="lede">No migration, no rebuild. The plugin sits alongside what you already run.</p>
        </motion.div>

        <div className="cap-grid">
          {CARDS.map((item, idx) => (
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
              <span className="mt-4 inline-flex rounded-full bg-(--violet-tint) px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-[0.04em] text-(--violet-deep)">
                {item.chip}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
