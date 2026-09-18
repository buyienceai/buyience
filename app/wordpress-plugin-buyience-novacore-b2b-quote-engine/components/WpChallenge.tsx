"use client";

import React from "react";
import { motion } from "framer-motion";

const CARDS: { num: string; kicker?: string; title: string; description: string }[] = [
  {
    num: "01",
    kicker: "No native quoting",
    title: "Fixed prices, or a plugin stack",
    description:
      "B2B buyers expect a quote. WooCommerce offers a fixed price and a cart, so the usual answer is four add-ons that each solve a quarter of the problem and none of which talk to each other.",
  },
  {
    num: "02",
    kicker: "One price for everyone",
    title: "Your best customer sees retail",
    description:
      "The account you have supplied for nine years opens your site and sees the same number a first-time visitor sees. Negotiated pricing lives in a spreadsheet that the storefront knows nothing about.",
  },
  {
    num: "03",
    kicker: "The deal happens in email",
    title: "No place to negotiate",
    description:
      "Revisions travel as attachments. Nobody is sure which version is current, and the only record of what was agreed is somebody's sent folder.",
  },
  {
    num: "04",
    kicker: "No buyer self-service",
    title: "Every reorder is a message",
    description:
      "Without a portal for quotes, orders and invoices, routine repeat business arrives as email and phone calls that your team retypes by hand.",
  },
  {
    num: "05",
    title: "Six add-ons, one update away",
    description:
      "Wholesale pricing, quote forms, role-based visibility and tax handling as separate plugins means every WooCommerce release is a compatibility gamble.",
  },
  {
    num: "06",
    kicker: "The usual advice",
    title: '"Just replatform"',
    description:
      "Moving to an enterprise B2B platform means rebuilding the site, the content and the SEO you spent years earning — to solve a quoting problem.",
  },
];

export default function WpChallenge({ purple = false }: { purple?: boolean }) {
  return (
    <section className={purple ? "bg-(--surface)" : undefined}>
      <div className="container">
        <div className="center-head">
          <p className="eyebrow">THE CHALLENGE</p>
          <h2>WooCommerce wasn&apos;t built for B2B</h2>
          <p className="lede">
            You like WordPress. Wholesale buyers just need six things WooCommerce does not do out of the box.
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
      </div>
    </section>
  );
}
