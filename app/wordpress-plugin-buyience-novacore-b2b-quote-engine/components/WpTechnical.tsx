"use client";

import React from "react";
import { motion } from "framer-motion";

const CODE = `// Place the quote builder anywhere yourself
[buyncbqe2_quote_builder]

// Skip the auto-created page entirely
add_filter( 'buyncbqe2_allow_auto_page_creation', '__return_false' );

// Or change its slug
add_filter( 'buyncbqe2_auto_page_slug', function() {
    return 'my-custom-slug';
} );

// Or create it as a draft for review first
add_filter( 'buyncbqe2_auto_page_status', function() {
    return 'draft';
} );`;

const FILTER_NOTES = [
  "Product sync runs through the WooCommerce REST API using a consumer key and secret you supply. Manual sync on demand, or a daily scheduler at midnight, with logs in the settings screen.",
  "Navbar integration adds a Dashboard button to a menu location you choose; it opens the Buyience storefront in a new tab.",
  "Multisite use is supported — each site connects with its own Buyience subdomain configuration.",
];

const SECURITY = [
  "Your Buyience password is never stored in WordPress. It is forwarded over HTTPS for authentication; only the returned access token is kept, with autoload disabled.",
  "No WordPress users are created or modified. No wp_set_current_user() or equivalent session bypass.",
  "Admin endpoints require manage_options through current_user_can(), and every REST route carries a permission callback.",
  "Nothing is transmitted without an explicit administrator action — no silent phone-home on activation.",
  "Hosted Buyience interfaces open as external links, not embedded iframes, so they are not loaded on your front end.",
  "The plugin performs no tracking or analytics of its own.",
  "No WooCommerce core data is modified or removed.",
];

export default function WpTechnical({ purple = false }: { purple?: boolean }) {
  return (
    <section className={purple ? "bg-(--surface)" : undefined}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="center-head"
        >
          <p className="eyebrow">FOR SITE OWNERS</p>
          <h2>Shortcodes, filters and what actually gets stored</h2>
          <p className="lede">
            The detail a cautious site owner asks for before installing anything on a production store.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="rounded-[18px] border border-(--border) bg-white p-6 text-left sm:p-8"
          >
            <h3 className="mb-3 text-[18px] font-bold text-[#1B1033]">Shortcode and activation filters</h3>
            <p className="m-0 mb-4 text-[14.5px] leading-relaxed text-(--muted)">
              Activation creates a Create Store page at <code className="font-mono text-[13px]">buyncbqe2-create-store</code>{" "}
              containing the quote builder. Three filters let you control that before you activate.
            </p>
            <pre className="m-0 overflow-x-auto rounded-[14px] border border-(--border) bg-[#170D3F] p-4 font-mono text-[12px] leading-relaxed text-[#EDEAF8]">
              <code>{CODE}</code>
            </pre>
            <ul className="m-0 mt-4 list-none p-0">
              {FILTER_NOTES.map((note) => (
                <li
                  key={note}
                  className="relative mb-2 pl-3.5 text-[13.5px] leading-relaxed text-(--muted) last:mb-0 before:absolute before:top-[0.55em] before:left-0 before:size-1.5 before:rounded-full before:bg-brand-purple"
                >
                  {note}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="rounded-[18px] border border-(--border) bg-white p-6 text-left sm:p-8"
          >
            <h3 className="mb-3 text-[18px] font-bold text-[#1B1033]">Security and data handling</h3>
            <p className="m-0 mb-4 text-[14.5px] leading-relaxed text-(--muted)">
              The plugin connects to an external service, so here is exactly what crosses the boundary and what stays
              put.
            </p>
            <ul className="m-0 list-none p-0">
              {SECURITY.map((note) => (
                <li
                  key={note}
                  className="relative mb-2.5 pl-3.5 text-[13.5px] leading-relaxed text-(--muted) last:mb-0 before:absolute before:top-[0.55em] before:left-0 before:size-1.5 before:rounded-full before:bg-brand-purple"
                >
                  {note}
                </li>
              ))}
            </ul>
            <p className="m-0 mt-5 text-[13.5px] leading-relaxed text-(--ink-soft)">
              Full disclosure, changelog and source are on the WordPress.org listing.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
