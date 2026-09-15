"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import { useCurrency } from "@/components/CurrencyProvider";

export default function PackagingPricing() {
  const { format, prices } = useCurrency();

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="narrow reveal in"
          style={{ textAlign: "center" }}
        >
          <p className="eyebrow">PRICING</p>
          <h2 style={{ marginTop: "14px" }}>Simple plans. No surprises.</h2>
        </motion.div>

        <div className="price-grid">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="price-card reveal in"
          >
            <h3>Grow</h3>
            <div className="price">
              {format(prices.growMonthly)}
              <small>/mo</small>
            </div>
            <p className="price-note">{format(prices.growAnnual)}/yr — 2 months free</p>
            <div className="price-feat">
              Full commerce platform: quoting, CPQ, orders, inventory, customer portal.
              <br />
              <b className="mt-2 block">AI Quote Engine</b> available as a {format(prices.aiQuoteAddon)}/mo add-on.
            </div>
            <div className="mt-8">
              <Button variant="ghost" className="w-full" href="https://app.buyience.com/register">
                Start free trial
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="price-card pro reveal in"
          >
            <span className="pill">MOST POPULAR</span>
            <h3>Pro</h3>
            <div className="price">
              {format(prices.proMonthly)}
              <small>/mo</small>
            </div>
            <p className="price-note">{format(prices.proAnnual)}/yr — 2 months free</p>
            <div className="price-feat">
              Everything in Grow.
              <br />
              <b className="mt-2 block">AI Quote Engine included</b> — win probability, agents, negotiation assistant.
            </div>
            <div className="mt-8">
              <Button variant="primary" className="w-full" href="https://app.buyience.com/register">
                Start free trial
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="launch-note reveal in"
        >
          {format(prices.growMonthly)} is the launch price — it moves to {format(prices.growStandard)}/mo. Lock it in for life.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="pricing-links reveal in"
        >
          Full details, Enterprise, and GBP / EUR / INR pricing → <a href="/pricing">see pricing</a>
        </motion.p>
      </div>
    </section>
  );
}
