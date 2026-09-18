"use client";

import FaqSection from "@/components/FaqSection";
import { renderFaqAnswer } from "../lib/renderFaqAnswer";

export type BlogFaqItem = {
  q: string;
  a: string;
};

type Props = {
  title?: string;
  items: BlogFaqItem[];
};

/** Blog article FAQ — marketing FaqSection accordion, embedded in the article column. */
export default function BlogFaq({
  title = "Questions, answered",
  items,
}: Props) {
  if (!items.length) return null;

  return (
    <FaqSection
      eyebrow="FAQ"
      title={title}
      items={items.map((item) => ({
        q: item.q,
        a: renderFaqAnswer(item.a),
      }))}
      card
      bare
      className="blog-faq-section"
    />
  );
}
