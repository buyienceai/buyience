"use client";

import React from "react";
import { motion } from "framer-motion";

const CARDS = [
  {
    title: "What it is",
    description:
      "Nova Core is an AI-powered B2B commerce platform for MRO suppliers and industrial distributors — contract pricing, catalogue, stock, quoting and orders in one system.",
  },
  {
    title: "What it replaces",
    description:
      "Contract price lists that live in a spreadsheet, RFQs priced line by line overnight, stock checks by phone, and reorders that arrive as a photo of a bin label.",
  },
  {
    title: "Who it is for",
    description:
      "Industrial and MRO distributors, safety and PPE suppliers, fastener and fixings specialists, electrical and automation wholesalers, and facilities supply businesses.",
  },
  {
    title: "How it is built",
    description:
      "MACH architecture — microservices, API-first, cloud-native, headless. Run the hosted storefront, or connect the APIs to the procurement systems your customers already use.",
  },
];

export default function MroIntro({ purple = false }: { purple?: boolean }) {
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
