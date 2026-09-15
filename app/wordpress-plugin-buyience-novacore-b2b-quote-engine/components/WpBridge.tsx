"use client";

import React from "react";
import { motion } from "framer-motion";

const CARDS = [
  {
    n: "1",
    title: "WordPress + WooCommerce",
    description: "Your store, products, theme and customers — unchanged. No migration and no rebuild.",
  },
  {
    n: "2",
    title: "Buyience plugin",
    description:
      "Adds Request a Quote, pricing rules and a buyer portal. Free, and installed from your WordPress admin.",
  },
  {
    n: "3",
    title: "Nova Core",
    description:
      "Connect over a secure token for AI-assisted quotes, the Digital Sales Room and multi-warehouse stock.",
  },
];

export default function WpBridge({ purple = false }: { purple?: boolean }) {
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
          <p className="eyebrow">HOW IT FITS</p>
          <h2>The plugin is the bridge</h2>
          <p className="lede">
            Core quoting lives in WordPress. When you want more, the plugin connects securely to Nova Core, where
            AI-assisted quoting and negotiation run. You choose how far to go.
          </p>
        </motion.div>

        <ol className="mt-12 m-0 grid list-none grid-cols-1 gap-4.5 p-0 min-[641px]:grid-cols-3">
          {CARDS.map((card, idx) => (
            <motion.li
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="reveal in flex flex-col rounded-[18px] border border-[#EDE6FB] bg-white px-6 py-6 text-left"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-purple text-[13px] font-bold leading-none text-white"
                aria-hidden="true"
              >
                {card.n}
              </span>
              <h3 className="mt-5 mb-2 !text-[18px] font-bold text-[#1B1033]">{card.title}</h3>
              <p className="m-0 text-[14.5px] leading-[1.55] font-medium text-[#5A4B7C]">{card.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
