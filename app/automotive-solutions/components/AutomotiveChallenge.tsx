"use client";

import React from "react";
import { motion } from "framer-motion";

const CARDS: { num: string; kicker?: string; title: string; description: string }[] = [
  {
    num: "01",
    title: "Buyers shop by vehicle, not by keyword",
    description:
      "A mechanic has a registration number and a job card, not a part number. Without fitment data behind the catalogue, every lookup becomes a phone call to someone who knows the range by heart.",
  },
  {
    num: "02",
    title: "Every account has its own net",
    description:
      "Workshop, jobber, fleet and buying-group rates sit on different discount matrices, with contracted lines on top. Publishing one price list is not an option, and maintaining twelve is not either.",
  },
  {
    num: "03",
    kicker: "Stock is a phone call",
    title: "Availability lives across branches",
    description:
      "The part is in stock — at the other depot, in transit, or on the van. A buyer who cannot see that will call, and your counter team answers the same question forty times a day.",
  },
  {
    num: "04",
    title: "Supersessions break the order",
    description:
      "The buyer orders from a three-year-old invoice. The number has been superseded twice since. Either the system resolves it or someone reconciles it by hand after the credit note.",
  },
  {
    num: "05",
    kicker: "Margin leaks after the sale",
    title: "Cores, returns and warranty",
    description:
      "Reman lines carry a deposit that has to survive the quote, the invoice and the return. When core tracking lives in a spreadsheet, the margin you quoted is not the margin you keep.",
  },
  {
    num: "06",
    kicker: "The quote is the bottleneck",
    title: "Deals close in an inbox",
    description:
      "A fleet enquiry becomes twelve emails, three revised PDFs and no record of who agreed what. The slowest part of the sale is not the pricing — it is the back-and-forth around it.",
  },
];

const STATS = [
  { metric: "90%", title: "faster quote turnaround" },
  { metric: "95%", title: "pricing accuracy" },
  { metric: "15 min", title: "to a live storefront" },
  { metric: "50+", title: "integrations" },
];

export default function AutomotiveChallenge({ purple = false }: { purple?: boolean }) {
  return (
    <section className={purple ? "bg-(--surface)" : undefined}>
      <div className="container">
        <div className="center-head">
          <p className="eyebrow">THE CHALLENGE</p>
          <h2>Why a generic storefront fails on the parts counter</h2>
          <p className="lede">
            Consumer commerce assumes one price, one warehouse and a buyer who knows what they want. Automotive
            wholesale breaks all three assumptions before lunch.
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
