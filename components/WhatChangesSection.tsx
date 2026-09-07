"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export type WhatChangesItem = {
  title: string;
  from: string;
  after: string;
  desc?: string;
  Icon: LucideIcon;
};

export type WhatChangesSectionProps = {
  eyebrow?: string;
  heading: string;
  lede?: string;
  outcomeLabel?: string;
  fromLabel: string;
  toLabel: string;
  items: WhatChangesItem[];
  purple?: boolean;
  /** Optional block under the comparison table (e.g. pricing callout) */
  footer?: React.ReactNode;
};

export default function WhatChangesSection({
  eyebrow,
  heading,
  lede,
  outcomeLabel = "Outcome",
  fromLabel,
  toLabel,
  items,
  purple = false,
  footer,
}: WhatChangesSectionProps) {
  const reduceMotion = useReducedMotion() === true;

  return (
    <section className={purple ? "bg-(--surface)" : ""}>
      <div className="container">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="center-head"
        >
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2>{heading}</h2>
          {lede ? <p className="lede">{lede}</p> : null}
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
          className="mt-12 overflow-hidden rounded-3xl border border-(--border) bg-white md:mt-16"
        >
          <div className="hidden grid-cols-[minmax(168px,0.85fr)_minmax(0,1fr)_16px_minmax(0,1.2fr)] items-center border-b border-(--border) bg-(--surface) px-8 py-3 md:grid lg:px-10">
            <span className="text-[11px] font-extrabold tracking-[0.08em] text-(--muted) uppercase">
              {outcomeLabel}
            </span>
            <span className="text-[11px] font-extrabold tracking-[0.08em] text-(--muted) uppercase">
              {fromLabel}
            </span>
            <span aria-hidden="true" />
            <span className="text-[11px] font-extrabold tracking-[0.08em] text-brand-purple uppercase">{toLabel}</span>
          </div>

          <ul className="m-0 list-none p-0" aria-label={heading}>
            {items.map((item, idx) => {
              const Icon = item.Icon;
              return (
                <motion.li
                  key={item.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: 0.12 + idx * 0.08, duration: 0.45, ease: EASE }}
                  className={`grid grid-cols-1 items-center gap-3 px-5 py-6 sm:px-7 md:grid-cols-[minmax(168px,0.85fr)_minmax(0,1fr)_16px_minmax(0,1.2fr)] md:gap-x-5 md:px-8 md:py-7 lg:px-10 ${
                    idx < items.length - 1 ? "border-b border-(--border)" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-(--violet-tint) text-brand-purple"
                      aria-hidden="true"
                    >
                      <Icon className="size-5" strokeWidth={2.25} />
                    </span>
                    <p className="m-0 text-[15px] leading-snug font-bold tracking-tight text-[#1B1033]">{item.title}</p>
                  </div>

                  <p className="m-0 text-[14.5px] leading-snug text-(--muted) line-through decoration-(--border-strong) md:text-[15px]">
                    <span className="mr-2 font-extrabold tracking-[0.08em] text-(--muted) uppercase no-underline md:hidden">
                      {fromLabel}
                    </span>
                    {item.from}
                  </p>

                  <ArrowRight
                    className="hidden size-4 justify-self-center text-brand-purple md:block"
                    strokeWidth={2.4}
                    aria-hidden="true"
                  />

                  <div className="rounded-2xl bg-(--surface) px-4 py-3.5 md:bg-transparent md:px-0 md:py-0">
                    <p className="mb-1 font-heading text-[1.25rem] leading-[1.15] font-extrabold tracking-tight text-[#1B1033] md:text-[1.4rem]">
                      {item.after}
                    </p>
                    {item.desc ? <p className="m-0 text-[13.5px] leading-relaxed text-(--muted)">{item.desc}</p> : null}
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>

        {footer ? <div className="mt-10 md:mt-12">{footer}</div> : null}
      </div>
    </section>
  );
}
