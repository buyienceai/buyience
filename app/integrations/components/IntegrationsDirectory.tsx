"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { integrationsData, Integration } from "../data/integrations";

export default function IntegrationsDirectory() {
  const [activeCat, setActiveCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All" },
    { id: "payments", label: "Payments" },
    { id: "commerce", label: "Commerce" },
    { id: "marketing", label: "Marketing" },
    { id: "shipping", label: "Shipping" },
    { id: "analytics", label: "Analytics" },
    { id: "infrastructure", label: "Infrastructure" },
  ];

  // Calculate counts for each category pill
  const getCatCount = (catId: string) => {
    if (catId === "all") return integrationsData.length;
    return integrationsData.filter((i) => i.category === catId).length;
  };

  // Perform search and category filtering
  const filteredIntegrations = integrationsData.filter((item) => {
    const matchesCat = activeCat === "all" || item.category === activeCat;
    const matchesSearch =
      !searchQuery.trim() ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section className="dir" id="directory">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="center-head reveal in"
          style={{ marginBottom: "40px" }}
        >
          <p className="eyebrow">THE DIRECTORY</p>
          <h2>Every integration, by category.</h2>
          <p className="lede">
            Every name below is live in the product today — except where marked coming soon. This directory grows as we
            ship.
          </p>
        </motion.div>

        {/* Directory Layout: Sidebar + Main content */}
        <div className="dir-layout">
          {/* Sidebar Filters */}
          <aside className="dir-side text-left" aria-label="Integration categories">
            <p className="side-label">CATEGORIES</p>
            <div className="pills" id="pills" role="group" aria-label="Filter by category">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  data-cat={cat.id}
                  aria-pressed={activeCat === cat.id}
                  onClick={() => setActiveCat(cat.id)}
                >
                  {cat.label}
                  <span className="n">{getCatCount(cat.id)}</span>
                </button>
              ))}
            </div>
            <div className="side-req">
              Don't see your tool?
              <br />
              Requests shape what ships next.
              <a href="/contact" className="text-violet-600 block mt-1.5 font-bold hover:underline">
                Request an integration →
              </a>
            </div>
          </aside>

          {/* Main Grid */}
          <div className="dir-main text-left">
            {/* Search Bar */}
            <div className="search">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="search"
                placeholder="Search integrations…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search integrations"
              />
            </div>

            {/* Grid Container */}
            <div className="grid">
              <AnimatePresence>
                {filteredIntegrations.map((item) => (
                  <motion.article
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    key={item.id}
                    className="int"
                    data-cat={item.category}
                  >
                    <div className="int-top">
                      <span className={`tile${item.logo ? " has-logo" : ""}`}>
                        {item.logo ? (
                          <Image
                            src={item.logo}
                            alt=""
                            width={28}
                            height={28}
                            className="tile-logo"
                          />
                        ) : (
                          item.tileText
                        )}
                      </span>
                      <div className="int-name">
                        <b>{item.name}</b>
                        <span>{item.category}</span>
                      </div>
                    </div>
                    <p>{item.description}</p>
                    <span className={`int-status ${item.status}`}>
                      {item.status === "live" ? "LIVE" : "COMING SOON"}
                    </span>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredIntegrations.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="empty show"
                id="empty"
              >
                <b>No integrations match.</b>
                Try another search — or connect it yourself through the API below.
              </motion.div>
            )}

            {/* Build your own row */}
            <div className="byo">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="byo-card api"
              >
                <h3>Build your own with the API</h3>
                <p>
                  Everything in Nova Core is API-first: 80+ REST endpoints and 38 webhook events. If your tool can speak
                  HTTP, it can speak to Nova Core.
                </p>
                <span className="mono-line">GET /api/v1/orders · webhook: quote.accepted</span>
                <a href="#architecture" className="hover:underline">
                  Explore the architecture →
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="byo-card req"
              >
                <h3>Don't see your tool?</h3>
                <p>
                  Tell us what you need connected. Integration requests from customers directly shape what we ship next
                  — this directory grows in the order you ask for it.
                </p>
                <a href="/contact" className="text-violet-600 font-bold hover:underline">
                  Request an integration →
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
