"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const cards = [
  {
    title: "AI Quote Engine",
    description: "Buyers request quotes from the storefront; the AI prices them instantly.",
    href: "/ai-quote-engine",
  },
  {
    title: "Digital Sales Room",
    description: "Complex deals move from quote request to a live negotiation room.",
    href: "/digital-sales-room",
  },
  {
    title: "Order Management",
    description: "Storefront orders flow into unified order management automatically.",
    href: "/order-management",
  },
  {
    title: "Inventory Management",
    description: "Real-time multi-warehouse stock powers storefront availability.",
    href: "/inventory-management",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08, duration: 0.5 },
  }),
};

export default function StorefrontConnected({ purple = false }: { purple?: boolean }) {
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
          <p className="eyebrow">CONNECTED PLATFORM</p>
          <h2>Part of the full Nova Core suite.</h2>
          <p className="lede">
            The storefront isn&apos;t standalone — it&apos;s connected to the AI Quote Engine, Digital Sales Room and
            your back-office.
          </p>
        </motion.div>

        <div className="sf-connect-grid">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className="sf-connect-card"
            >
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <Link href={card.href} className="go">
                Learn more →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
