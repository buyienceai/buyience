"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const FOUNDERS = [
  {
    name: "Girish K. Laathar",
    role: "Co-founder",
    bio: "Girish founded Buyience and leads it as CEO, shaping Nova Core's product and engineering directly — from the AI Quote Engine to the platform architecture. He kept seeing the same gap that B2C tools and enterprise platforms both left open, and set out to close it for the businesses caught in between.",
    image: "/blog/authors/girish1.png",
    imageAlt: "Girish K. Laathar, Co-founder of Buyience",
  },
  {
    name: "Jordian Farahani",
    role: "Co-founder",
    bio: "Jordian co-founded Buyience and helps drive the company alongside Girish, bringing a complementary perspective to how Nova Core is built and taken to market.",
    image: "/blog/authors/jordian.jpg",
    imageAlt: "Jordian Farahani, Co-founder of Buyience",
  },
];

export default function AboutFounders({ purple = false }: { purple?: boolean }) {
  const reduceMotion = useReducedMotion() === true;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.08, duration: 0.5 },
    }),
  };

  return (
    <section
      id="founders"
      className={purple ? "bg-(--surface)" : undefined}
    >
      <div className="container">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="center-head reveal in"
        >
          <p className="eyebrow">THE FOUNDERS</p>
          <h2>Who&apos;s building Nova Core.</h2>
          <p className="lede">
            A small, focused team that would rather ship the right thing than the expected thing.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 min-[721px]:grid-cols-2">
          {FOUNDERS.map((founder, idx) => (
            <motion.article
              key={founder.name}
              custom={idx}
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className="rounded-3xl border border-(--border) bg-white p-7 text-left shadow-(--shadow-1) sm:p-8"
            >
              <div className="mb-5 size-12 overflow-hidden rounded-2xl bg-(--violet-tint)">
                <Image
                  src={founder.image}
                  alt={founder.imageAlt}
                  width={96}
                  height={96}
                  className="size-full object-cover object-top"
                />
              </div>
              <h3 className="mb-1 text-[18px] font-bold tracking-[-0.01em]">{founder.name}</h3>
              <p className="m-0 mb-4 font-mono text-[11px] font-semibold tracking-[0.08em] text-(--violet-deep) uppercase">
                {founder.role}
              </p>
              <p className="m-0 text-[14.5px] leading-relaxed text-(--muted)">{founder.bio}</p>
            </motion.article>
          ))}
        </div>

        <motion.blockquote
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mx-auto mt-10 max-w-[52ch] border-0 p-0 text-center"
        >
          <p className="m-0 text-[20px] leading-snug font-semibold tracking-[-0.02em] text-(--ink) sm:text-[24px]">
            &ldquo;We&apos;re not trying to be the biggest B2B platform. We&apos;re trying to be the
            one that finally fits the businesses everyone else overlooked.&rdquo;
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}
