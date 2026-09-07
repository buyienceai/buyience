"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import { useCurrency } from "@/components/CurrencyProvider";

export default function StorefrontPricingCallout({ purple = false }: { purple?: boolean }) {
  const { format, prices } = useCurrency();

  return (
    <section className={`sf-callout-section ${purple ? "bg-(--surface)" : ""}`.trim()}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55 }}
          className="sf-callout"
        >
          <div className="sf-callout-body">
            <span className="sf-callout-zap" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
              </svg>
            </span>
            <div className="txt">
              <b>Enterprise storefront features, without the enterprise cost.</b>
              <p>
                A branded B2B portal that usually takes a six-figure build and months of work — auto-generated, from{" "}
                <strong>{format(prices.growMonthly)}/month</strong>, live in days.
              </p>
            </div>
          </div>
          <Button variant="lime" href="/pricing" className="sf-callout-cta">
            See pricing
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
