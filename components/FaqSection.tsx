"use client";

import React from "react";
import { motion } from "framer-motion";

export type FaqItem = {
  q: string;
  a: React.ReactNode;
};

type FaqSectionProps = {
  eyebrow: string;
  title: React.ReactNode;
  items: FaqItem[];
  /** Extra classes on the <section> (e.g. page section utility classes). */
  className?: string;
  /** Inline styles on the <section> (spacing / background overrides). */
  style?: React.CSSProperties;
  /** Sitewide alternating-section-background rule: true = purple (var(--surface)); default/false = white (unchanged for existing callers). */
  purple?: boolean;
  /** Wrap the accordion in a white rounded card (home mockup). Default keeps the divider list. */
  card?: boolean;
  /** Skip the inner `.container` wrapper (blog articles already sit in a width-constrained column). */
  bare?: boolean;
};

/** Site-wide FAQ accordion: divider list with + toggle (Platform FAQ UI). */
export default function FaqSection({
  eyebrow,
  title,
  items,
  className = "",
  style,
  purple = false,
  card = true,
  bare = false,
}: FaqSectionProps) {
  const head = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="center-head reveal in"
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </motion.div>
  );

  const list = (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={card ? "faq-list faq-card-list reveal in" : "faq-list reveal in"}
    >
      {items.map((faq, idx) => (
        <details key={idx}>
          <summary>{faq.q}</summary>
          <p>{faq.a}</p>
        </details>
      ))}
    </motion.div>
  );

  return (
    <section
      id="faq"
      className={[className, purple ? "bg-(--surface)" : ""].filter(Boolean).join(" ") || undefined}
      style={style}
    >
      {bare ? (
        <>
          {head}
          {list}
        </>
      ) : (
        <div className="container">
          {head}
          {list}
        </div>
      )}
    </section>
  );
}
