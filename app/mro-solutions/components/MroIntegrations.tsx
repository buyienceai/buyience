"use client";

import React from "react";
import { motion } from "framer-motion";
import StackLogoMarquee from "@/app/components/StackLogoMarquee";
import EyebrowPill from "@/components/EyebrowPill";

export default function MroIntegrations({ purple = false }: { purple?: boolean }) {
  return (
    <section
      className={`integrations text-center ${purple ? "integrations--purple" : ""}`.trim()}
      style={purple ? { background: "var(--surface)" } : undefined}
    >
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.55, ease: "easeOut" as const }}
        className="container"
      >
        <div className="center-head">
          <EyebrowPill>FITS YOUR STACK</EyebrowPill>
          <h2>
            Works with the systems already{" "}
            <span className="grad-text">running your branches.</span>
          </h2>
          <p className="lede">
            API-first and headless, so Nova Core sits alongside your ERP and storefront rather than replacing
            everything at once.
          </p>
        </div>
        <StackLogoMarquee />
        <p className="mt-6 text-center text-[15px] text-(--muted)">
          <a href="/integrations">See integrations →</a>
        </p>
      </motion.div>
    </section>
  );
}
