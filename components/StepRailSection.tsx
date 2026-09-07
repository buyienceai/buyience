"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface StepRailStep {
  /** Short status chip text, e.g. "Sent", "Live", "Won" */
  chip: string;
  title: string;
  desc: string;
  Icon: LucideIcon;
  /**
   * Mark the last/success step. Renders with mint-green colours and the
   * end of the track gradient.
   */
  won?: boolean;
  /**
   * Show a pulsing green dot next to the chip — useful for "Live" steps.
   */
  live?: boolean;
}

export interface StepRailSectionProps {
  eyebrow?: string;
  heading: React.ReactNode;
  /** Accessible name for the step list when `heading` is not plain text */
  headingLabel?: string;
  headingClassName?: string;
  lede?: string;
  steps: StepRailStep[];
  /** Sitewide alternating-section-background rule */
  purple?: boolean;
}

/**
 * Shared animated step-rail section.
 *
 * Usage example:
 * ```tsx
 * import StepRailSection from "@/components/StepRailSection";
 * import { Send, PanelsTopLeft, MessageSquareText, BadgeCheck } from "lucide-react";
 *
 * <StepRailSection
 *   eyebrow="HOW IT WORKS"
 *   heading="From counter-offer to closed deal."
 *   lede="A streamlined flow that gets both parties to agreement faster."
 *   steps={[
 *     { chip: "Sent",  title: "Counter-offer sent",  desc: "...", Icon: Send },
 *     { chip: "Open",  title: "The room opens",       desc: "...", Icon: PanelsTopLeft },
 *     { chip: "Live",  title: "Live negotiation",     desc: "...", Icon: MessageSquareText, live: true },
 *     { chip: "Won",   title: "Deal closed",          desc: "...", Icon: BadgeCheck, won: true },
 *   ]}
 * />
 * ```
 */
export default function StepRailSection({
  eyebrow = "HOW IT WORKS",
  heading,
  headingLabel,
  headingClassName,
  lede,
  steps,
  purple = false,
}: StepRailSectionProps) {
  const reduceMotion = useReducedMotion();
  const colCount = steps.length;
  const listLabel = headingLabel ?? (typeof heading === "string" ? heading : undefined);

  return (
    <section className={`how ${purple ? "bg-(--surface)" : ""}`.trim()}>
      <div className="container">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="center-head"
        >
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className={headingClassName}>{heading}</h2>
          {lede && <p className="lede">{lede}</p>}
        </motion.div>

        <ol
          className="relative mx-auto mt-14 grid w-full max-w-280 list-none grid-cols-1 gap-8 p-0 max-md:pl-1 md:mt-16 md:gap-0 md:[grid-template-columns:repeat(var(--step-cols),minmax(0,1fr))]"
          style={{ ["--step-cols" as string]: colCount } as React.CSSProperties}
          aria-label={listLabel}
        >
          {/* Mobile: vertical fill track — left offset centers on size-12 icons (+ max-md:pl-1) */}
          <div
            className="pointer-events-none absolute top-7 bottom-7 left-[25px] w-1.5 overflow-hidden rounded-full bg-white max-md:block md:hidden"
            aria-hidden="true"
          >
            <motion.div
              className="h-full w-full origin-top rounded-full bg-linear-to-b from-brand-purple via-[#9B5DE5] to-(--mint)"
              initial={reduceMotion ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.05, ease: EASE, delay: 0.15 }}
            />
          </div>

          {/* Desktop: horizontal fill track */}
          <div
            className="pointer-events-none absolute top-5.5 right-[12.5%] left-[12.5%] hidden h-1.5 overflow-hidden rounded-full bg-white md:block"
            aria-hidden="true"
          >
            <motion.div
              className="h-full w-full origin-left rounded-full bg-linear-to-r from-brand-purple via-[#9B5DE5] to-(--mint)"
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.05, ease: EASE, delay: 0.15 }}
            />
          </div>

          {steps.map((step, idx) => {
            const Icon = step.Icon;
            return (
              <motion.li
                key={step.chip}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.18 + idx * 0.12, duration: 0.5, ease: EASE }}
                className="relative z-10 flex gap-4 max-md:items-start md:flex-col md:items-center md:px-3 md:text-center"
              >
                <span
                  className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${
                    step.won
                      ? "bg-(--mint) text-white shadow-[0_0_0_6px_var(--surface)]"
                      : "bg-brand-purple text-white shadow-[0_0_0_6px_var(--surface),0_10px_24px_rgba(110,44,244,0.28)]"
                  }`}
                  aria-hidden="true"
                >
                  <Icon className="size-5" strokeWidth={2.25} />
                </span>

                <div className="min-w-0 flex-1 rounded-2xl border border-(--border) bg-white p-5 text-left md:mt-6 md:w-full">
                  <p
                    className={`m-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.75 text-[10px] font-extrabold tracking-[0.08em] uppercase ${
                      step.won ? "bg-(--mint-tint) text-(--mint)" : "bg-(--violet-tint) text-brand-purple"
                    }`}
                  >
                    {step.live && (
                      <span className="size-1.5 animate-pulse rounded-full bg-[#16A34A]" aria-hidden="true" />
                    )}
                    {step.chip}
                  </p>
                  <p className="mt-2.5 mb-1.5 text-[15px] leading-snug font-bold tracking-tight text-[#1B1033]">
                    {step.title}
                  </p>
                  <p className="m-0 text-[13.5px] leading-relaxed text-(--muted)">{step.desc}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
