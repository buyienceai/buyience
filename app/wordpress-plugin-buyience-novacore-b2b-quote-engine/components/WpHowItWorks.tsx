"use client";

import React from "react";
import { motion } from "framer-motion";

const STEPS = [
  {
    n: "1",
    title: "Install the plugin",
    dur: "about 5 minutes",
    d: 'In WordPress admin go to Plugins → Add New, search "Buyience NovaCore B2B Quote Engine", then Install and Activate. Activation creates a Create Store page holding the quote builder shortcode.',
  },
  {
    n: "2",
    title: "Turn on WooCommerce integration",
    dur: "about 5 minutes",
    d: "Under Settings → WooCommerce Integration, enable it and set the button position, text and styling. Optionally hide Add to Cart and prices on trade products.",
  },
  {
    n: "3",
    title: "Connect and sync",
    dur: "about 10 minutes",
    d: "Optionally click Connect to Buyience Account — the subdomain configures itself. Add WooCommerce REST API credentials to sync products, then let the daily scheduler keep them in step.",
  },
];

export default function WpHowItWorks({ purple = false }: { purple?: boolean }) {
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
          <h2>Up and running in three steps</h2>
          <p className="lede">No developer required. It installs from your WordPress admin like any other plugin.</p>
        </motion.div>

        <ol className="mt-12 m-0 grid list-none grid-cols-1 gap-4.5 p-0 min-[641px]:grid-cols-3">
          {STEPS.map((step, idx) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="reveal in flex flex-col rounded-[18px] border border-[#EDE6FB] bg-white px-6 py-6 text-left"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-purple text-[13px] font-bold leading-none text-white"
                  aria-hidden="true"
                >
                  {step.n}
                </span>
                <span className="rounded-full bg-[#E7F6F1] px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-[0.06em] text-[#0E9E7E]">
                  {step.dur}
                </span>
              </div>
              <h3 className="mt-5 mb-2 !text-[18px] font-bold text-[#1B1033]">{step.title}</h3>
              <p className="m-0 text-[14.5px] leading-[1.55] font-medium text-[#5A4B7C]">{step.d}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
