"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import Container from "./Container";

interface MenuItem {
  title: string;
  description: string;
  href: string;
  tileClass: string;
  icon: React.ReactNode;
}

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [accPlatform, setAccPlatform] = useState(false);
  const [accSolutions, setAccSolutions] = useState(false);
  const [accResources, setAccResources] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Hover Intent handlers for desktop dropdowns
  const handleMouseEnter = (menuName: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 160); // 160ms close delay matching the template
  };

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setIsDrawerOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-menu]")) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // Disable scroll when mobile menu is active
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Mega-menu custom item SVG icons
  const icons = {
    overview: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5.5 w-5.5">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
    bolt: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5.5 w-5.5">
        <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
      </svg>
    ),
    chat: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5.5 w-5.5">
        <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 1 1 16.1-3.8z" />
      </svg>
    ),
    cog: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5.5 w-5.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5.5 w-5.5">
        <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
    write: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5.5 w-5.5">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    wallet: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5.5 w-5.5">
        <path d="M21 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
        <rect x="3" y="8" width="18" height="12" rx="2" />
        <path d="M9 12h6" />
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5.5 w-5.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    layout: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5.5 w-5.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 9h20" />
        <circle cx="5.5" cy="6.5" r=".5" />
        <circle cx="8" cy="6.5" r=".5" />
      </svg>
    ),
    connect: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5.5 w-5.5">
        <path d="m18 16 4-4-4-4M6 8l-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    ),
    dashboard: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5.5 w-5.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5.5 w-5.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    gift: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5.5 w-5.5">
        <rect x="3" y="8" width="18" height="13" rx="2" />
        <path d="M3 12h18M12 8v13M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
    box3d: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5.5 w-5.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
      </svg>
    ),
    help: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5.5 w-5.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </svg>
    ),
    doc: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5.5 w-5.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
      </svg>
    ),
    book: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5.5 w-5.5">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  };

  return (
    <>
      <header className="sticky top-0 z-40 h-[var(--home-nav-h)] w-full border-b border-[#ECE5FB] bg-[rgba(251,250,255,0.94)] backdrop-blur-[14px] backdrop-saturate-160 sm:bg-[rgba(251,250,255,0.82)]">
        <Container className="h-full">
          <div className="flex h-full items-center gap-6">
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center">
              <Image
                src="/images/buyience.png"
                alt="buyience"
                width={160}
                height={38}
                priority
                className="h-[25px] w-auto object-contain sm:h-[26px] lg:h-[32px] xl:h-[36px]"
                style={{ width: "auto" }}
              />
            </Link>

            {/* Desktop Navigation Links — centered like Framer */}
            <nav
              className="hidden lg:flex flex-1 items-center justify-center gap-6 xl:gap-7"
              aria-label="Main Navigation"
            >
              {/* PLATFORM */}
              <div
                className="relative"
                data-menu
                onMouseEnter={() => handleMouseEnter("platform")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`flex items-center gap-1 px-0.5 py-1 text-[14px] font-medium transition-colors cursor-pointer ${
                    activeMenu === "platform" ? "text-slate-900" : "text-[#1f2937] hover:text-slate-900"
                  }`}
                  aria-expanded={activeMenu === "platform" ? "true" : "false"}
                  aria-controls="menu-platform"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveMenu(activeMenu === "platform" ? null : "platform");
                  }}
                >
                  Platform
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
                      activeMenu === "platform" ? "rotate-180 text-slate-700" : ""
                    }`}
                  />
                </button>

                {/* Platform Mega Menu Panel */}
                <AnimatePresence>
                  {activeMenu === "platform" && (
                    <motion.div
                      id="menu-platform"
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-[calc(100%+8px)] left-[-120px] w-[760px] max-w-[calc(100vw-40px)] bg-white border border-slate-100 rounded-3xl shadow-xl p-8 z-50"
                    >
                      <div className="grid grid-cols-2 gap-x-8 gap-y-6 text-left">
                        {/* Col 1 */}
                        <div>
                          <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono border-b border-slate-50 pb-2 mb-3">
                            Core Platform
                          </div>
                          <div className="flex flex-col gap-2">
                            <Link href="/platform-overview" className="flex gap-3 items-start p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group/item">
                              <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-violet-50 text-violet-600 group-hover/item:bg-violet-100 transition-colors">
                                {icons.overview}
                              </span>
                              <div>
                                <span className="block text-sm font-medium text-slate-900 group-hover/item:text-violet-600 transition-colors">Platform Overview</span>
                                <span className="block text-[12px] text-slate-600 font-semibold mt-0.5 leading-relaxed">The complete B2B commerce platform</span>
                              </div>
                            </Link>
                            <Link href="/ai-quote-engine" className="flex gap-3 items-start p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group/item">
                              <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-50 text-blue-600 group-hover/item:bg-blue-100 transition-colors">
                                {icons.bolt}
                              </span>
                              <div>
                                <span className="block text-sm font-medium text-slate-900 group-hover/item:text-violet-600 transition-colors">AI Quote Engine</span>
                                <span className="block text-[12px] text-slate-600 font-semibold mt-0.5 leading-relaxed">AI-powered pricing with win probability</span>
                              </div>
                            </Link>
                            <Link href="/digital-sales-room" className="flex gap-3 items-start p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group/item">
                              <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-pink-50 text-pink-600 group-hover/item:bg-pink-100 transition-colors">
                                {icons.chat}
                              </span>
                              <div>
                                <span className="block text-sm font-medium text-slate-900 group-hover/item:text-violet-600 transition-colors">Digital Sales Room</span>
                                <span className="block text-[12px] text-slate-600 font-semibold mt-0.5 leading-relaxed">Real-time negotiation &amp; deal rooms</span>
                              </div>
                            </Link>
                            <Link href="/pricing-and-margin-control" className="flex gap-3 items-start p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group/item">
                              <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-50 text-emerald-600 group-hover/item:bg-emerald-100 transition-colors">
                                {icons.shield}
                              </span>
                              <div>
                                <span className="block text-sm font-medium text-slate-900 group-hover/item:text-violet-600 transition-colors">Pricing &amp; Margin Control</span>
                                <span className="block text-[12px] text-slate-600 font-semibold mt-0.5 leading-relaxed">Floors, customer rates, volume tiers</span>
                              </div>
                            </Link>
                            <Link href="/cpq-configurator" className="flex gap-3 items-start p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group/item">
                              <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-orange-50 text-orange-600 group-hover/item:bg-orange-100 transition-colors">
                                {icons.cog}
                              </span>
                              <div>
                                <span className="block text-sm font-medium text-slate-900 group-hover/item:text-violet-600 transition-colors">Product Configurator</span>
                                <span className="block text-[12px] text-slate-600 font-semibold mt-0.5 leading-relaxed">CPQ with conflict resolution</span>
                              </div>
                            </Link>
                          </div>

                          <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono border-b border-slate-50 pb-2 mb-3 mt-6">
                            Architecture
                          </div>
                          <Link href="/mach-architecture" className="flex gap-3 items-start p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group/item">
                            <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-indigo-50 text-indigo-600 group-hover/item:bg-indigo-100 transition-colors">
                              {icons.code}
                            </span>
                            <div>
                              <span className="block text-sm font-medium text-slate-900 group-hover/item:text-violet-600 transition-colors">MACH Architecture</span>
                              <span className="block text-[12px] text-slate-600 font-semibold mt-0.5 leading-relaxed">Microservices, API-first, cloud-native, headless</span>
                            </div>
                          </Link>
                        </div>

                        {/* Col 2 */}
                        <div>
                          <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono border-b border-slate-50 pb-2 mb-3">
                            Operations
                          </div>
                          <div className="flex flex-col gap-2">
                            <Link href="/order-management" className="flex gap-3 items-start p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group/item">
                              <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-50 text-blue-600 group-hover/item:bg-blue-100 transition-colors">
                                {icons.write}
                              </span>
                              <div>
                                <span className="block text-sm font-medium text-slate-900 group-hover/item:text-violet-600 transition-colors">Order Management</span>
                                <span className="block text-[12px] text-slate-600 font-semibold mt-0.5 leading-relaxed">Quote-to-order lifecycle</span>
                              </div>
                            </Link>
                            <Link href="/inventory-management" className="flex gap-3 items-start p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group/item">
                              <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-50 text-emerald-600 group-hover/item:bg-emerald-100 transition-colors">
                                {icons.wallet}
                              </span>
                              <div>
                                <span className="block text-sm font-medium text-slate-900 group-hover/item:text-violet-600 transition-colors">Inventory Management</span>
                                <span className="block text-[12px] text-slate-600 font-semibold mt-0.5 leading-relaxed">Multi-warehouse, real-time sync</span>
                              </div>
                            </Link>
                            <Link href="/supplier-management" className="flex gap-3 items-start p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group/item">
                              <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-violet-50 text-violet-600 group-hover/item:bg-violet-100 transition-colors">
                                {icons.users}
                              </span>
                              <div>
                                <span className="block text-sm font-medium text-slate-900 group-hover/item:text-violet-600 transition-colors">Supplier Management</span>
                                <span className="block text-[12px] text-slate-600 font-semibold mt-0.5 leading-relaxed">Onboarding, compliance &amp; logistics</span>
                              </div>
                            </Link>
                            <Link href="/b2b-storefront" className="flex gap-3 items-start p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group/item">
                              <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-pink-50 text-pink-600 group-hover/item:bg-pink-100 transition-colors">
                                {icons.layout}
                              </span>
                              <div>
                                <span className="block text-sm font-medium text-slate-900 group-hover/item:text-violet-600 transition-colors">B2B Storefront</span>
                                <span className="block text-[12px] text-slate-600 font-semibold mt-0.5 leading-relaxed">24/7 self-service ordering</span>
                              </div>
                            </Link>
                          </div>

                          <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono border-b border-slate-50 pb-2 mb-3 mt-6">
                            Integration
                          </div>
                          <Link href="/wordpress-plugin-buyience-novacore-b2b-quote-engine" className="flex gap-3 items-start p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group/item">
                            <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-amber-50 text-amber-600 group-hover/item:bg-amber-100 transition-colors">
                              {icons.connect}
                            </span>
                            <div>
                              <span className="block text-sm font-medium text-slate-900 group-hover/item:text-violet-600 transition-colors">WordPress / WooCommerce</span>
                              <span className="block text-[12px] text-slate-600 font-semibold mt-0.5 leading-relaxed">Add B2B to your WordPress site</span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SOLUTIONS */}
              <div
                className="relative"
                data-menu
                onMouseEnter={() => handleMouseEnter("solutions")}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href="/solutions"
                  className={`flex items-center gap-1 text-[14px] font-medium py-1 px-0.5 transition-colors cursor-pointer ${
                    activeMenu === "solutions" ? "text-slate-900" : "text-[#1f2937] hover:text-slate-900"
                  }`}
                  aria-expanded={activeMenu === "solutions" ? "true" : "false"}
                  aria-controls="menu-solutions"
                >
                  Solutions
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
                      activeMenu === "solutions" ? "rotate-180 text-slate-700" : ""
                    }`}
                  />
                </Link>

                <AnimatePresence>
                  {activeMenu === "solutions" && (
                    <motion.div
                      id="menu-solutions"
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[640px] max-w-[calc(100vw-40px)] bg-white border border-slate-100 rounded-3xl shadow-xl p-8 z-50"
                    >
                      <div className="grid grid-cols-2 gap-x-8 gap-y-6 text-left">
                        {/* Capability */}
                        <div>
                          <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono border-b border-slate-50 pb-2 mb-3">
                            By Capability
                          </div>
                          <div className="flex flex-col gap-2">
                            <Link href="/solutions" className="flex gap-3 items-start p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group/item">
                              <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-violet-50 text-violet-600 group-hover/item:bg-violet-100 transition-colors">
                                {icons.dashboard}
                              </span>
                              <div>
                                <span className="block text-sm font-medium text-slate-900 group-hover/item:text-violet-600 transition-colors">Unified B2B Commerce</span>
                                <span className="block text-[12px] text-slate-600 font-semibold mt-0.5 leading-relaxed">One platform for the whole operation</span>
                              </div>
                            </Link>
                            <Link href="/pricing-and-margin-control" className="flex gap-3 items-start p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group/item">
                              <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-50 text-emerald-600 group-hover/item:bg-emerald-100 transition-colors">
                                {icons.shield}
                              </span>
                              <div>
                                <span className="block text-sm font-medium text-slate-900 group-hover/item:text-violet-600 transition-colors">Pricing &amp; Margin Control</span>
                                <span className="block text-[12px] text-slate-600 font-semibold mt-0.5 leading-relaxed">Floors and rules on every quote</span>
                              </div>
                            </Link>
                          </div>
                        </div>

                        {/* Industry */}
                        <div>
                          <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono border-b border-slate-50 pb-2 mb-3">
                            By Industry
                          </div>
                          <div className="flex flex-col gap-2">
                            <Link href="/automotive-solutions" className="flex gap-3 items-start p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group/item">
                              <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-slate-100 text-slate-700 group-hover/item:bg-slate-200 transition-colors">
                                {icons.cog}
                              </span>
                              <div>
                                <span className="block text-sm font-medium text-slate-900 group-hover/item:text-violet-600 transition-colors">Automotive</span>
                                <span className="block text-[12px] text-slate-600 font-semibold mt-0.5 leading-relaxed">Parts catalogs &amp; dealer pricing</span>
                              </div>
                            </Link>
                            <Link href="/mro-solutions" className="flex gap-3 items-start p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group/item">
                              <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-50 text-emerald-600 group-hover/item:bg-emerald-100 transition-colors">
                                {icons.wallet}
                              </span>
                              <div>
                                <span className="block text-sm font-medium text-slate-900 group-hover/item:text-violet-600 transition-colors">MRO / Industrial</span>
                                <span className="block text-[12px] text-slate-600 font-semibold mt-0.5 leading-relaxed">Contract pricing &amp; replenishment</span>
                              </div>
                            </Link>
                            <Link href="/corporate-gifting" className="flex gap-3 items-start p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group/item">
                              <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-orange-50 text-orange-600 group-hover/item:bg-orange-100 transition-colors">
                                {icons.gift}
                              </span>
                              <div>
                                <span className="block text-sm font-medium text-slate-900 group-hover/item:text-violet-600 transition-colors">Corporate Gifting</span>
                                <span className="block text-[12px] text-slate-600 font-semibold mt-0.5 leading-relaxed">Kitted quotes &amp; seasonal margin protection</span>
                              </div>
                            </Link>
                            <Link href="/industrial-packaging" className="flex gap-3 items-start p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group/item">
                              <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-indigo-50 text-indigo-600 group-hover/item:bg-indigo-100 transition-colors">
                                {icons.box3d}
                              </span>
                              <div>
                                <span className="block text-sm font-medium text-slate-900 group-hover/item:text-violet-600 transition-colors">Industrial Packaging</span>
                                <span className="block text-[12px] text-slate-600 font-semibold mt-0.5 leading-relaxed">Spec-driven, tiered quoting</span>
                              </div>
                            </Link>
                          </div>
                          <Link href="/solutions#industries" className="flex items-center gap-1 text-xs font-bold text-violet-600 hover:text-violet-700 transition-colors pl-3 mt-4">
                            All industries →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link className="flex items-center gap-1 text-[14px] font-medium py-1 px-0.5 text-[#1f2937] hover:text-slate-900 transition-colors" href="/integrations">
                Integrations
              </Link>
              <Link className="flex items-center gap-1 text-[14px] font-medium py-1 px-0.5 text-[#1f2937] hover:text-slate-900 transition-colors" href="/pricing">
                Pricing
              </Link>

              {/* RESOURCES */}
              <div
                className="relative"
                data-menu
                onMouseEnter={() => handleMouseEnter("resources")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`flex items-center gap-1 text-[14px] font-medium py-1 px-0.5 transition-colors cursor-pointer ${
                    activeMenu === "resources" ? "text-slate-900" : "text-[#1f2937] hover:text-slate-900"
                  }`}
                  aria-expanded={activeMenu === "resources" ? "true" : "false"}
                  aria-controls="menu-resources"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveMenu(activeMenu === "resources" ? null : "resources");
                  }}
                >
                  Resources
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
                      activeMenu === "resources" ? "rotate-180 text-slate-700" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeMenu === "resources" && (
                    <motion.div
                      id="menu-resources"
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[560px] max-w-[calc(100vw-40px)] bg-white border border-slate-100 rounded-3xl shadow-xl p-8 z-50"
                    >
                      <div className="grid grid-cols-2 gap-x-8 gap-y-6 text-left">
                        {/* Company */}
                        <div>
                          <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono border-b border-slate-50 pb-2 mb-3">
                            Company
                          </div>
                          <div className="flex flex-col gap-2">
                            <Link href="/about" className="flex gap-3 items-start p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group/item">
                              <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-50 text-emerald-600 group-hover/item:bg-emerald-100 transition-colors">
                                {icons.help}
                              </span>
                              <div>
                                <span className="block text-sm font-medium text-slate-900 group-hover/item:text-violet-600 transition-colors">About Us</span>
                                <span className="block text-[12px] text-slate-600 font-semibold mt-0.5 leading-relaxed">Get to know Buyience</span>
                              </div>
                            </Link>
                            <Link href="/contact" className="flex gap-3 items-start p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group/item">
                              <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-50 text-blue-600 group-hover/item:bg-blue-100 transition-colors">
                                {icons.doc}
                              </span>
                              <div>
                                <span className="block text-sm font-medium text-slate-900 group-hover/item:text-violet-600 transition-colors">Contact Us</span>
                                <span className="block text-[12px] text-slate-600 font-semibold mt-0.5 leading-relaxed">Talk to our team</span>
                              </div>
                            </Link>
                          </div>

                          <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono border-b border-slate-50 pb-2 mb-3 mt-6">
                            Learn
                          </div>
                          <Link href="/blog" className="flex gap-3 items-start p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group/item">
                            <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-50 text-blue-600 group-hover/item:bg-blue-100 transition-colors">
                              {icons.book}
                            </span>
                            <div>
                              <span className="block text-sm font-medium text-slate-900 group-hover/item:text-violet-600 transition-colors">Blog</span>
                              <span className="block text-[12px] text-slate-600 font-semibold mt-0.5 leading-relaxed">Guides on B2B commerce</span>
                            </div>
                          </Link>
                        </div>

                        {/* Partners */}
                        <div>
                          <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono border-b border-slate-50 pb-2 mb-3">
                            Partners
                          </div>
                          <div className="flex flex-col gap-2">
                            <Link href="/become-a-solution-partner" className="flex gap-3 items-start p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group/item">
                              <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-pink-50 text-pink-600 group-hover/item:bg-pink-100 transition-colors">
                                {icons.layout}
                              </span>
                              <div>
                                <span className="block text-sm font-medium text-slate-900 group-hover/item:text-violet-600 transition-colors">Solution Partners</span>
                                <span className="block text-[12px] text-slate-600 font-semibold mt-0.5 leading-relaxed">Agencies &amp; consultants</span>
                              </div>
                            </Link>
                            <Link href="/become-a-technology-partner" className="flex gap-3 items-start p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group/item">
                              <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-amber-50 text-amber-600 group-hover/item:bg-amber-100 transition-colors">
                                {icons.code}
                              </span>
                              <div>
                                <span className="block text-sm font-medium text-slate-900 group-hover/item:text-violet-600 transition-colors">Technology Partners</span>
                                <span className="block text-[12px] text-slate-600 font-semibold mt-0.5 leading-relaxed">Integrate with Nova Core</span>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Desktop Actions — Framer spacing + divider */}
            <div className="hidden lg:flex shrink-0 items-center gap-3">
              <span className="mr-1 h-5 w-px bg-[#e5e7eb]" aria-hidden="true" />
              <Button
                variant="text"
                size="sm"
                href="https://app.buyience.com"
                className="!px-1 !py-1 !text-[14px] !font-medium !text-[#1f2937] hover:!text-slate-900"
              >
                Login
              </Button>
              <Link
                href="/request-a-demo"
                className="nav-btn-outline"
              >
                Request Demo
              </Link>
              <Button
                variant="primary"
                size="sm"
                href="https://app.buyience.com/register"
                className="!border-0 !px-[18px] !py-[9px] !text-[13px] !font-bold"
              >
                Start free trial
              </Button>
            </div>

            {/* Mobile Menu Burger Button */}
            <div className="ml-auto flex lg:hidden">
              <button
                className="inline-flex items-center justify-center rounded-lg p-1.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer sm:rounded-xl sm:p-2.5"
                aria-expanded={isDrawerOpen ? "true" : "false"}
                aria-controls="drawer"
                aria-label="Open menu"
                onClick={() => setIsDrawerOpen(true)}
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
            />

            {/* Slide-over Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white p-6 shadow-2xl flex flex-col overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-5">
                <Link href="/" className="flex items-center" onClick={() => setIsDrawerOpen(false)}>
                  <Image
                    src="/images/buyience.png"
                    alt="buyience"
                    width={130}
                    height={30}
                    className="h-7 w-auto object-contain"
                    style={{ width: "auto" }}
                  />
                </Link>
                <button
                  className="inline-flex items-center justify-center rounded-xl p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors cursor-pointer"
                  onClick={() => setIsDrawerOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Drawer Navigation List */}
              <div className="flex flex-col gap-1 text-left flex-grow">
                {/* Platform Accordion */}
                <div className="border-b border-slate-100">
                  <button
                    onClick={() => setAccPlatform(!accPlatform)}
                    className="w-full py-4 flex items-center justify-between text-base font-bold text-slate-800 focus:outline-none cursor-pointer"
                    aria-expanded={accPlatform ? "true" : "false"}
                  >
                    Platform
                    <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform ${accPlatform ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {accPlatform && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-2 pb-4 flex flex-col gap-3"
                      >
                        <div className="text-[9px] font-bold tracking-widest text-slate-400 uppercase font-mono mt-2">Core Platform</div>
                        <Link href="/platform-overview" className="text-sm font-semibold text-slate-700 hover:text-violet-600 block py-1" onClick={() => setIsDrawerOpen(false)}>Platform Overview</Link>
                        <Link href="/ai-quote-engine" className="text-sm font-semibold text-slate-700 hover:text-violet-600 block py-1" onClick={() => setIsDrawerOpen(false)}>AI Quote Engine</Link>
                        <Link href="/digital-sales-room" className="text-sm font-semibold text-slate-700 hover:text-violet-600 block py-1" onClick={() => setIsDrawerOpen(false)}>Digital Sales Room</Link>
                        <Link href="/pricing-and-margin-control" className="text-sm font-semibold text-slate-700 hover:text-violet-600 block py-1" onClick={() => setIsDrawerOpen(false)}>Pricing &amp; Margin Control</Link>
                        <Link href="/cpq-configurator" className="text-sm font-semibold text-slate-700 hover:text-violet-600 block py-1" onClick={() => setIsDrawerOpen(false)}>Product Configurator</Link>
                        
                        <div className="text-[9px] font-bold tracking-widest text-slate-400 uppercase font-mono mt-2">Operations</div>
                        <Link href="/order-management" className="text-sm font-semibold text-slate-700 hover:text-violet-600 block py-1" onClick={() => setIsDrawerOpen(false)}>Order Management</Link>
                        <Link href="/inventory-management" className="text-sm font-semibold text-slate-700 hover:text-violet-600 block py-1" onClick={() => setIsDrawerOpen(false)}>Inventory Management</Link>
                        <Link href="/supplier-management" className="text-sm font-semibold text-slate-700 hover:text-violet-600 block py-1" onClick={() => setIsDrawerOpen(false)}>Supplier Management</Link>
                        <Link href="/b2b-storefront" className="text-sm font-semibold text-slate-700 hover:text-violet-600 block py-1" onClick={() => setIsDrawerOpen(false)}>B2B Storefront</Link>
                        
                        <div className="text-[9px] font-bold tracking-widest text-slate-400 uppercase font-mono mt-2">Architecture &amp; Integration</div>
                        <Link href="/mach-architecture" className="text-sm font-semibold text-slate-700 hover:text-violet-600 block py-1" onClick={() => setIsDrawerOpen(false)}>MACH Architecture</Link>
                        <Link href="/wordpress-plugin-buyience-novacore-b2b-quote-engine" className="text-sm font-semibold text-slate-700 hover:text-violet-600 block py-1" onClick={() => setIsDrawerOpen(false)}>WordPress / WooCommerce</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Solutions Accordion */}
                <div className="border-b border-slate-100">
                  <button
                    onClick={() => setAccSolutions(!accSolutions)}
                    className="w-full py-4 flex items-center justify-between text-base font-bold text-slate-800 focus:outline-none cursor-pointer"
                    aria-expanded={accSolutions ? "true" : "false"}
                  >
                    Solutions
                    <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform ${accSolutions ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {accSolutions && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-2 pb-4 flex flex-col gap-3"
                      >
                        <div className="text-[9px] font-bold tracking-widest text-slate-400 uppercase font-mono mt-2">By Capability</div>
                        <Link href="/solutions" className="text-sm font-semibold text-slate-700 hover:text-violet-600 block py-1" onClick={() => setIsDrawerOpen(false)}>Unified B2B Commerce</Link>
                        <Link href="/pricing-and-margin-control" className="text-sm font-semibold text-slate-700 hover:text-violet-600 block py-1" onClick={() => setIsDrawerOpen(false)}>Pricing &amp; Margin Control</Link>
                        
                        <div className="text-[9px] font-bold tracking-widest text-slate-400 uppercase font-mono mt-2">By Industry</div>
                        <div className="text-[9px] font-bold tracking-widest text-slate-400 uppercase font-mono mt-2">By Industry</div>
                        <Link href="/automotive-solutions" className="text-sm font-semibold text-slate-700 hover:text-violet-600 block py-1" onClick={() => setIsDrawerOpen(false)}>Automotive</Link>
                        <Link href="/mro-solutions" className="text-sm font-semibold text-slate-700 hover:text-violet-600 block py-1" onClick={() => setIsDrawerOpen(false)}>MRO / Industrial</Link>
                        <Link href="/corporate-gifting" className="text-sm font-semibold text-slate-700 hover:text-violet-600 block py-1" onClick={() => setIsDrawerOpen(false)}>Corporate Gifting</Link>
                        <Link href="/industrial-packaging" className="text-sm font-semibold text-slate-700 hover:text-violet-600 block py-1" onClick={() => setIsDrawerOpen(false)}>Industrial Packaging</Link>
                        <Link href="/solutions#industries" className="text-sm font-bold text-violet-600 block py-1" onClick={() => setIsDrawerOpen(false)}>All industries →</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Plain Links */}
                <Link href="/integrations" className="w-full py-4 text-base font-bold text-slate-800 border-b border-slate-100 block" onClick={() => setIsDrawerOpen(false)}>
                  Integrations
                </Link>
                <Link href="/pricing" className="w-full py-4 text-base font-bold text-slate-800 border-b border-slate-100 block" onClick={() => setIsDrawerOpen(false)}>
                  Pricing
                </Link>

                {/* Resources Accordion */}
                <div className="border-b border-slate-100">
                  <button
                    onClick={() => setAccResources(!accResources)}
                    className="w-full py-4 flex items-center justify-between text-base font-bold text-slate-800 focus:outline-none cursor-pointer"
                    aria-expanded={accResources ? "true" : "false"}
                  >
                    Resources
                    <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform ${accResources ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {accResources && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-2 pb-4 flex flex-col gap-3"
                      >
                        <Link href="/about" className="text-sm font-semibold text-slate-700 hover:text-violet-600 block py-1" onClick={() => setIsDrawerOpen(false)}>About Us</Link>
                        <Link href="/contact" className="text-sm font-semibold text-slate-700 hover:text-violet-600 block py-1" onClick={() => setIsDrawerOpen(false)}>Contact Us</Link>
                        <Link href="/become-a-solution-partner" className="text-sm font-semibold text-slate-700 hover:text-violet-600 block py-1" onClick={() => setIsDrawerOpen(false)}>Solution Partners</Link>
                        <Link href="/become-a-technology-partner" className="text-sm font-semibold text-slate-700 hover:text-violet-600 block py-1" onClick={() => setIsDrawerOpen(false)}>Technology Partners</Link>
                        <Link href="/blog" className="text-sm font-semibold text-slate-700 hover:text-violet-600 block py-1" onClick={() => setIsDrawerOpen(false)}>Blog</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <a href="https://app.buyience.com" className="w-full py-4 text-base font-bold text-slate-800 border-b border-slate-100 block" onClick={() => setIsDrawerOpen(false)}>
                  Login
                </a>
              </div>

              {/* Drawer Action CTAs */}
              <div className="flex flex-col gap-3 mt-8">
                <Link
                  href="/request-a-demo"
                  className="nav-btn-outline nav-btn-outline-block"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Request Demo
                </Link>
                <Button
                  variant="primary"
                  href="https://app.buyience.com/register"
                  className="w-full justify-center font-bold py-3.5"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Start free trial
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}