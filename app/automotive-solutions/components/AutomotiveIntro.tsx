"use client";

import React from "react";
import { motion } from "framer-motion";

const CARDS = [
  {
    title: "What it is",
    description:
      "Nova Core is an AI-powered B2B commerce platform for automotive parts distributors, wholesalers and OES suppliers — catalogue, pricing, stock, quoting and orders in one system.",
  },
  {
    title: "What it replaces",
    description:
      "Emailed price lists, spreadsheet quotes, phone-in stock checks, PDF order forms, and the WhatsApp thread where half your orders actually live.",
  },
  {
    title: "Who it is for",
    description:
      "Aftermarket distributors, tyre and battery wholesalers, commercial-vehicle and fleet parts suppliers, OE/OES suppliers, and multi-brand dealer groups.",
  },
  {
    title: "How it is built",
    description:
      "MACH architecture — microservices, API-first, cloud-native, headless. Run the hosted storefront or plug the APIs into the site you already have.",
  },
];

export default function AutomotiveIntro({ purple = false }: { purple?: boolean }) {
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
