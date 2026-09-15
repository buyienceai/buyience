"use client";

import React from "react";
import { motion } from "framer-motion";

const CARDS: { num: string; kicker?: string; title: string; description: string }[] = [
  {
    num: "01",
    kicker: "The codes do not match",
    title: "Their part number is not your part number",
    description:
      "A maintenance planner orders against the plant's own item master. Unless your catalogue answers to their codes as well as yours, every requisition needs a human to translate it first.",
  },
  {
    num: "02",
    kicker: "Price depends on the paperwork",
    title: "Contract, agreement, or spot",
    description:
      "A national agreement, a single-plant contract and a one-off buy are three different prices for the same item. When the contract book lives outside the system, the price quoted and the price agreed drift apart.",
  },
  {
    num: "03",
    kicker: "Units do not divide cleanly",
    title: "Each, box of 100, bag of 1,000",
    description:
      "Fasteners price per thousand, gloves per pair, sealant per case. If the storefront cannot convert, buyers order the wrong quantity and you ship a pallet where they wanted a box.",
  },
  {
    num: "04",
    title: "Planned replenishment vs line down",
    description:
      "Most of the volume is routine consumables. Most of the pressure is the breakdown at 2am. The same system has to serve a scheduled bin refill and a same-day emergency without confusing the two.",
  },
  {
    num: "05",
    kicker: "One customer, many customers",
    title: "Every site behaves differently",
    description:
      "Head office signs the agreement; four plants order against it, each with its own ship-to, cost centre and approval habits. Treating them as one account hides the detail that matters.",
  },
  {
    num: "06",
    kicker: "The RFQ is enormous",
    title: "Two hundred lines, priced by hand",
    description:
      "An annual tender or a shutdown schedule arrives as a spreadsheet. Pricing it line by line takes days, and by the time it goes back the buyer has already had two other quotes.",
  },
];

const STATS = [
  { metric: "90%", title: "faster quote turnaround" },
  { metric: "95%", title: "pricing accuracy" },
  { metric: "15 min", title: "to a live storefront" },
  { metric: "50+", title: "integrations" },
];

export default function MroChallenge({ purple = false }: { purple?: boolean }) {
  return (
    <section className={purple ? "bg-(--surface)" : undefined}>
      <div className="container">
        <div className="center-head">
          <p className="eyebrow">THE CHALLENGE</p>
          <h2>Why MRO breaks a standard commerce platform</h2>
          <p className="lede">
            Industrial supply is not catalogue shopping. It is a contract, a cross-reference table and a
            maintenance schedule that occasionally becomes an emergency.
          </p>
        </div>

        <div className="chal-grid">
          {CARDS.map((card, index) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.55 }}
              className="chal-card text-left"
            >
              <span className="num">{card.num}</span>
              {card.kicker ? (
                <p className="m-0 mb-2 font-mono text-[10.5px] tracking-[0.12em] text-(--violet-deep) uppercase">
                  {card.kicker}
                </p>
              ) : null}
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="out-grid">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="out-card"
            >
              <span className="big">{stat.metric}</span>
              <b>{stat.title}</b>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
