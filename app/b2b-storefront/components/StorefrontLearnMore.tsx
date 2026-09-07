"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const cards = [
  {
    title: "Nova Core",
    description:
      "API-first B2B commerce platform powered by the AI Quote Engine. Built on MACH architecture (Microservices, API-first, Cloud-native, Headless) for unlimited scalability and flexibility.",
    linkText: "Platform overview →",
    linkHref: "/platform-overview",
  },
  {
    title: "Solutions",
    description:
      "Complete B2B commerce suite — from AI Quote Engine to inventory management. Everything you need to sell to business customers, all in one platform.",
    linkText: "Explore solutions →",
    linkHref: "/solutions",
  },
  {
    title: "Integrations",
    description:
      "Connect WordPress, WooCommerce, Shopify & BigCommerce (coming soon) and 50+ other tools — keep your stack in one place.",
    linkText: "See integrations →",
    linkHref: "/integrations",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function StorefrontLearnMore({ purple = false }: { purple?: boolean }) {
  return (
    <section className={`learn ${purple ? "bg-(--surface)" : ""}`.trim()}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", maxWidth: "62ch", margin: "0 auto" }}
        >
          <p className="eyebrow">LEARN MORE</p>
          <h2 style={{ marginTop: "14px" }}>Learn more about Buyience</h2>
          <p className="lede" style={{ marginTop: "12px" }}>
            Discover how our team can help bring your unique digital vision to life.
          </p>
        </motion.div>

        <div className="sf-learn-grid">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className="sf-learn-card text-left"
            >
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <Link href={card.linkHref} className="go">
                {card.linkText}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
