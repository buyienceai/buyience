import React from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";

export default function Footer() {
  const columns = [
    {
      title: "Core Platform",
      links: [
        { label: "NOVA Core", href: "/nova-core" },
        { label: "AI Quote Engine", href: "/ai-quote-engine" },
        { label: "CPQ Configurator", href: "/cpq-configurator" },
        { label: "Order Management", href: "/order-management" },
        { label: "Supplier Management", href: "/supplier-management" },
        { label: "Inventory Management", href: "/inventory-management" },
      ],
    },
    {
      title: "Capabilities",
      links: [
        { label: "Platform Overview", href: "/platform-overview" },
        { label: "MACH Architecture", href: "/mach-architecture" },
        { label: "Digital Sales Room", href: "/digital-sales-room" },
        { label: "Pricing & Margin Control", href: "/pricing-and-margin-control" },
        { label: "Wordpress Plugin", href: "/wordpress-plugin-buyience-novacore-b2b-quote-engine" },
        // { label: "Integrations", href: "/integrations" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        { label: "Pricing", href: "/pricing" },
        { label: "Contact", href: "/contact" },
        // { label: "Become a Solution Partner", href: "/become-a-solution-partner" },
        // { label: "Become a Technology Partner", href: "/become-a-technology-partner" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Solution Partners", href: "/become-a-solution-partner" },
        { label: "Technology Partners", href: "/become-a-technology-partner" },
        { label: "Integrations", href: "/integrations" },
      ],
    },
  ];

  return (
    <footer className="border-t border-[#ebe7f2] bg-[#f7f6fa] pt-20 pb-7 text-[#6b7280]">
      <Container>
        <div className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8 xl:gap-10">
          {/* Brand */}
          <div className="flex flex-col items-start gap-3.5 lg:max-w-[220px]">
            <Link prefetch={false} href="/" className="flex items-center">
              <Image
                src="/images/buyience.png"
                alt="Buyience"
                width={160}
                height={38}
                className="h-[26px] w-auto object-contain lg:h-[32px] xl:h-[36px]"
                style={{ width: "auto" }}
              />
            </Link>
            <p className="max-w-full text-[12.5px] font-normal leading-[1.65] text-[#7b8190] sm:max-w-[280px] lg:max-w-[210px]">
              AI-powered B2B commerce platform. Enterprise features, SMB-friendly pricing. Built for wholesalers,
              distributors, and manufacturers.
            </p>
            <div className="mt-1.5 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/buyience"
                target="_blank"
                rel="noreferrer"
                className="text-[#9aa0ae] transition-colors hover:text-[#6E2CF4]"
                aria-label="LinkedIn"
              >
                <svg className="h-[17px] w-[17px] fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://x.com/buyience"
                target="_blank"
                rel="noreferrer"
                className="text-[#9aa0ae] transition-colors hover:text-[#6E2CF4]"
                aria-label="X"
              >
                <svg className="h-[16px] w-[16px] fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                </svg>
              </a>
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title} className="flex flex-col items-start">
              <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.08em] text-[#1f2937]">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-[11px]">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link prefetch={false}
                      href={link.href}
                      className="text-[13px] font-normal leading-none text-[#6b7280] transition-colors hover:text-[#6E2CF4]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-[#e6e2ee] pt-6 text-[11.5px] font-normal leading-relaxed text-[#9aa0ae] md:flex-row md:flex-wrap md:items-center md:gap-x-4 md:gap-y-2">
          <div>Copyright © 2026 Buyience All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Link prefetch={false} href="/terms-and-conditions" className="transition-colors hover:text-[#6E2CF4]">
              Terms & Conditions
            </Link>
            <span className="text-[#c5c9d4]" aria-hidden="true">
              |
            </span>
            <Link prefetch={false} href="/privacy-policy" className="transition-colors hover:text-[#6E2CF4]">
              Privacy Policy
            </Link>
            <span className="text-[#c5c9d4]" aria-hidden="true">
              |
            </span>
            <Link prefetch={false} href="/refund-policy" className="transition-colors hover:text-[#6E2CF4]">
              Refund Policy
            </Link>
          </div>
          <div className="md:ml-auto lg:ml-0">Company No: 14871419. Registered in England and Wales.</div>
        </div>
      </Container>
    </footer>
  );
}
