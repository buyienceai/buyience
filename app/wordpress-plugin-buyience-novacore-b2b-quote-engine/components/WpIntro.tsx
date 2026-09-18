"use client";

import React from "react";
import { motion } from "framer-motion";

const CARDS = [
  {
    title: "What it is",
    description:
      "Buyience NovaCore B2B Quote Engine is a free WordPress plugin that extends WooCommerce with quote requests, pricing rules and a buyer portal.",
  },
  {
    title: "What it costs",
    description:
      "Nothing. The plugin is free on WordPress.org. The optional Nova Core service, which adds AI-assisted quoting and the Digital Sales Room, is priced separately.",
  },
  {
    title: "What it changes on your site",
    description:
      "No WooCommerce core data is modified or removed. It adds a quote button, its own settings screens, and a page holding the quote builder shortcode.",
  },
  {
    title: "What it needs",
    description:
      "WordPress 5.8 or higher and PHP 7.4 or higher. WooCommerce is needed only for product-page integration and product sync.",
  },
];

export default function WpIntro({ purple = false }: { purple?: boolean }) {
  return (
    <section className={purple ? "bg-(--surface)" : undefined}>
      <div className="container">
        <div className="mach-grid mt-0 grid grid-cols-1 gap-[18px] min-[641px]:grid-cols-2 min-[961px]:grid-cols-4">
          {CARDS.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="mach-card reveal in rounded-[18px] border border-[#EDE6FB] bg-white px-6 py-7 text-left"
            >
              <h3 className="mt-0 mb-1.5 text-[19px] font-bold text-[#1B1033]">{card.title}</h3>
              <p className="m-0 text-sm font-medium leading-normal text-[#5A4B7C]">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
