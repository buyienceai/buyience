"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionCapsule from "@/components/SectionCapsule";
import {
  CURRENCY_CODES,
  CURRENCY_META,
  CurrencyCode,
  formatMoney,
  getPlanPrices,
} from "@/lib/pricing/currency";

interface PricingHeroProps {
  billingPeriod: "monthly" | "annual";
  setBillingPeriod: (period: "monthly" | "annual") => void;
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
}

export default function PricingHero({
  billingPeriod,
  setBillingPeriod,
  currency,
  setCurrency,
}: PricingHeroProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const prices = getPlanPrices(currency);
  const meta = CURRENCY_META[currency];

  /** Founder launch scarcity — keep label + bar fill in sync */
  const SPOTS_TOTAL = 50;
  const SPOTS_LEFT = 19;
  const SPOTS_TAKEN = SPOTS_TOTAL - SPOTS_LEFT;
  const spotsFillPct = (SPOTS_TAKEN / SPOTS_TOTAL) * 100;

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <header className="hero relative overflow-hidden bg-hero-grid">
      <div className="pointer-events-none absolute inset-0 bg-hero-glows" aria-hidden="true" />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container relative z-10"
      >
        <motion.div variants={itemVariants}>
          <SectionCapsule>No Hidden Fees · Cancel Anytime</SectionCapsule>
        </motion.div>
        <motion.h1 variants={itemVariants}>
          Simple, <span className="grad-text">transparent pricing.</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="lede">
          Start with a 14-day free trial on any plan. Pay monthly, or save 17% paying annually.
        </motion.p>

        <motion.div variants={itemVariants} className="launch reveal in">
          <div className="txt">
            <b>Founders Launch Pricing</b>
            <p>
              60% off for life — {formatMoney(prices.growMonthly, currency)}/mo instead of the standard{" "}
              <b>{formatMoney(prices.growStandard, currency)}/mo</b>. Your rate never rises while your subscription is active.
            </p>
          </div>
          <div
            className="spots"
            aria-label={`${SPOTS_TAKEN} of ${SPOTS_TOTAL} founder spots taken`}
          >
            <div className="n">
              {SPOTS_LEFT} of {SPOTS_TOTAL} spots left
            </div>
            <div className="track">
              <div
                className="fill"
                style={{ width: `${spotsFillPct}%` }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="controls"
          style={{ overflow: "visible" }}
        >
          <div className="toggle" role="group" aria-label="Billing period">
            <button
              type="button"
              id="btnMonthly"
              aria-pressed={billingPeriod === "monthly"}
              onClick={() => setBillingPeriod("monthly")}
            >
              Monthly
            </button>
            <button
              type="button"
              id="btnAnnual"
              aria-pressed={billingPeriod === "annual"}
              onClick={() => setBillingPeriod("annual")}
            >
              Annual<span className="save">SAVE 17%</span>
            </button>
          </div>

          <div className="currency-dropdown" ref={dropdownRef}>
            <button
              type="button"
              className="currency-trigger"
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-controls={listboxId}
              onClick={() => setOpen((prev) => !prev)}
            >
              <span>
                {meta.symbol} {meta.label}
              </span>
              <ChevronDown
                className={`currency-chevron${open ? " open" : ""}`}
                aria-hidden
              />
            </button>
            {open && (
              <ul id={listboxId} className="currency-menu" role="listbox" aria-label="Currency">
                {CURRENCY_CODES.map((code) => {
                  const option = CURRENCY_META[code];
                  const selected = code === currency;
                  return (
                    <li key={code} role="option" aria-selected={selected}>
                      <button
                        type="button"
                        className={selected ? "active" : undefined}
                        onClick={() => {
                          setCurrency(code);
                          setOpen(false);
                        }}
                      >
                        {option.symbol} {option.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </motion.div>
      </motion.div>
    </header>
  );
}
