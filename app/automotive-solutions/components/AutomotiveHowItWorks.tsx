"use client";

import React from "react";
import { motion } from "framer-motion";

const STEPS = [
  {
    n: "1",
    title: "Buyer identifies the vehicle",
    d: "Registration, VIN or year-make-model-engine. The catalogue narrows to what actually fits before a single part is shown.",
  },
  {
    n: "2",
    title: "Fitment and supersession resolve",
    d: "Old numbers map to current SKUs. OE references and interchange numbers return the same result as your own part code.",
  },
  {
    n: "3",
    title: "Their net price appears",
    d: "Tier, contract and volume break resolve at line level. No list price with a promise that the discount will be applied later.",
  },
  {
    n: "4",
    title: "Stock is shown by branch",
    d: "On the shelf, in transit, or lead time. The buyer decides between waiting and substituting without calling anyone.",
  },
  {
    n: "5",
    title: "Quote goes to the sales room",
    d: "Larger baskets and fleet schedules move into a live negotiation with margin guardrails visible to your side only.",
  },
  {
    n: "6",
    title: "Quote converts to order",
    d: "Accepted quote becomes an order with the agreed lines intact, payment terms applied and dispatch triggered.",
  },
  {
    n: "7",
    title: "Cores and returns close out",
    d: "Deposits, returns and credits are processed against the original order reference, so the final margin is the one you can audit.",
  },
];

export default function AutomotiveHowItWorks({ purple = false }: { purple?: boolean }) {
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
          <p className="eyebrow">HOW IT WORKS</p>
          <h2>From job card to credit note</h2>
          <p className="lede">
            What happens between a mechanic needing a part and your ledger closing the line.
          </p>
        </motion.div>

        <ol className="mt-12 m-0 grid list-none grid-cols-1 gap-4.5 p-0 min-[641px]:grid-cols-2 min-[961px]:grid-cols-3">
          {STEPS.map((step, idx) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.06, duration: 0.5 }}
              className="reveal in flex flex-col rounded-[18px] border border-[#EDE6FB] bg-white px-6 py-6 text-left"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-purple text-[13px] font-bold leading-none text-white"
                aria-hidden="true"
              >
                {step.n}
              </span>
              <h3 className="mt-5 mb-2 !text-[18px] font-bold text-[#1B1033]">{step.title}</h3>
              <p className="m-0 text-[14.5px] leading-[1.55] font-medium text-[#5A4B7C]">{step.d}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
