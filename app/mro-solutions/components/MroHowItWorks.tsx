"use client";

import React from "react";
import { motion } from "framer-motion";

const STEPS = [
  {
    n: "1",
    title: "The buyer searches their own way",
    d: "Their internal code, a manufacturer part number, or a description. All three resolve to the same SKU in your catalogue.",
  },
  {
    n: "2",
    title: "Contract price resolves",
    d: "Account, site, product group and contracted rate settle the price at line level. No list price with a discount promised later.",
  },
  {
    n: "3",
    title: "Pack and UOM are made explicit",
    d: "Each, box or case is priced as its own option, so the buyer sees what the pack costs rather than converting it themselves.",
  },
  {
    n: "4",
    title: "Availability is shown per branch",
    d: "On the shelf, in transit, or direct ship with a lead time. A breakdown gets an honest answer instead of an optimistic one.",
  },
  {
    n: "5",
    title: "Long schedules go to quote",
    d: "Tenders and shutdown lists are priced in bulk against contracted rates, with margin guardrails on every line for your side only.",
  },
  {
    n: "6",
    title: "Quote converts to order",
    d: "Accepted lines become an order with terms applied, dispatch triggered, and the agreement intact.",
  },
  {
    n: "7",
    title: "Routine demand self-serves",
    d: "Order history and reordering move repeat consumables into the portal, so inside sales keeps its time for the complex work.",
  },
];

export default function MroHowItWorks({ purple = false }: { purple?: boolean }) {
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
          <h2>From requisition to reorder</h2>
          <p className="lede">
            What happens between a maintenance planner raising a line and the same line coming round again next
            quarter.
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
