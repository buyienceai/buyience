"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import SectionCapsule from "@/components/SectionCapsule";

const SECTION_JUMPS = [
  { n: "01", label: "Our story", href: "#story" },
  { n: "02", label: "Mission & vision", href: "#mission" },
  { n: "03", label: "The founders", href: "#founders" },
  { n: "04", label: "Our values", href: "#values" },
];

const ChevronRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
  >
    <path
      d="M6 3.5L10.5 8L6 12.5"
      stroke="#6E2CF4"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: "easeOut" as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.52, ease: "easeOut" as const, delay: 0.22 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: 12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.36, ease: "easeOut" as const, delay: 0.38 + i * 0.07 },
  }),
};

export default function AboutHero() {
  return (
    <header className="hero about-hero relative flex flex-col overflow-hidden bg-hero-grid text-left sm:min-h-(--home-hero-h) sm:justify-center">
      <div className="pointer-events-none absolute inset-0 bg-hero-glows" aria-hidden="true" />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="about-hero-inner container relative z-10 grid w-full flex-[0_1_auto] grid-cols-1 items-stretch gap-10 py-12 sm:grid-cols-2 sm:gap-9 sm:py-6 lg:gap-12"
      >
        {/* Left: copy + CTA */}
        <div className="about-hero-copy flex min-h-0 flex-col justify-center gap-[clamp(28px,4vh,56px)]">
          <div>
            <motion.div variants={itemVariants}>
              <SectionCapsule>About Buyience</SectionCapsule>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="mt-4 mb-5 max-w-[18ch] text-(--ink) sm:mt-5 sm:mb-6"
            >
              We&apos;re building the B2B platform we{" "}
              <span className="grad-text">wished existed.</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="lede m-0 max-w-136 text-(--muted) sm:text-[18.5px] sm:leading-[1.7]"
            >
              Nova Core exists because the tools wholesalers, distributors and manufacturers were
              handed never fit how B2B actually works — so we set out to build the one that does.
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className="about-hero-copy-foot flex flex-col gap-4">
            <div className="cta-row justify-start!">
              <Button variant="primary" size="lg" href="https://app.buyience.com/register">
                Start free trial →
              </Button>
              <Button variant="ghost" size="lg" href="/request-a-demo">
                Request a demo
              </Button>
            </div>
            <p className="trust-micro m-0 flex items-center gap-2.5 text-[13px] font-medium text-(--muted)">
              <span className="trust-live" aria-hidden="true" />
              14-day trial · No card required
            </p>
          </motion.div>
        </div>

        {/* Right: jump-nav card */}
        <div className="about-hero-visual relative flex min-h-0 w-full flex-col justify-center">
          <motion.aside
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            aria-label="Jump to a section"
            className="overflow-hidden rounded-2xl border border-(--border) bg-white shadow-[0_2px_4px_rgba(23,18,65,0.06),0_12px_32px_rgba(23,18,65,0.11)]"
          >
            {/* Card header */}
            <div className="flex items-center gap-3 border-b border-(--border) bg-[#faf9ff] px-5 py-3.5">
              {/* Pulsing dot */}
              <span className="relative flex size-2.5 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-purple opacity-30" />
                <span className="relative inline-flex size-2.5 rounded-full bg-brand-purple shadow-[0_0_0_3px_rgba(110,44,244,0.18)]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="m-0 text-[14px] font-extrabold tracking-tight text-(--ink) leading-none">
                  Our story
                </p>
                <p className="m-0 mt-0.5 text-[11px] font-semibold text-[#6A5A8C]">
                  Buyience · About
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-(--violet-tint) px-2.5 py-1 text-[11px] font-bold tracking-wide text-(--violet-deep)">
                Jump in
              </span>
            </div>

            {/* Card body */}
            <div className="px-5 py-5">
              <p className="m-0 mb-3 font-mono text-[10.5px] font-extrabold tracking-[0.12em] text-[#8A79AE] uppercase">
                Navigate the page
              </p>
              <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
                {SECTION_JUMPS.map((item, i) => (
                  <motion.li
                    key={item.n + item.label}
                    custom={i}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <a
                      href={item.href}
                      className="group flex items-center gap-3 rounded-xl border border-transparent px-3.5 py-3 text-(--ink) no-underline decoration-transparent transition-all duration-150 hover:border-(--border) hover:bg-(--violet-tint) hover:no-underline hover:decoration-transparent"
                    >
                      <span className="w-6 shrink-0 font-mono text-[11px] font-semibold tracking-[0.06em] text-[#9A8CB8]">
                        {item.n}
                      </span>
                      <span className="min-w-0 flex-1 text-[14.5px] font-semibold tracking-[-0.01em]">
                        {item.label}
                      </span>
                      <ChevronRight />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </div>
      </motion.div>
    </header>
  );
}
