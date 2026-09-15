"use client";

import React from "react";
import Link from "next/link";
import { useCurrency } from "@/components/CurrencyProvider";

export default function AnnouncementBar() {
  const { format, prices } = useCurrency();

  return (
    <div className="announcement-bar relative w-full overflow-hidden select-none">
      <div className="relative z-10 mx-auto flex max-w-[var(--w-max,1200px)] flex-row items-center justify-between gap-2 px-3 py-2 sm:flex-wrap sm:justify-center sm:gap-x-3 sm:gap-y-1 sm:px-8 sm:py-2.5 sm:text-center">
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#D6FB4F] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.08em] text-[#1B1033] sm:gap-1.5 sm:px-3 sm:py-1 sm:text-[11px] sm:tracking-[0.06em]">
          <span aria-hidden="true" className="text-[8px] opacity-80 sm:text-[9px]">
            ✦
          </span>
          Founder launch
        </span>
        <p className="min-w-0 flex-1 text-right text-[13px] font-medium leading-snug tracking-wide text-white sm:max-w-none sm:flex-none sm:text-center sm:text-[15px]">
          lock in <b className="font-bold text-white">{format(prices.growMonthly)}/mo</b>
          <span className="hidden sm:inline">
            {" "}
            before standard pricing rises to {format(prices.growStandard)}
          </span>
          <span className="mx-1 text-white/40 sm:mx-1.5" aria-hidden="true">
            ·
          </span>
          <b className="font-semibold text-white">31 of 50</b> spots taken
          <span className="mx-1 text-white/40 sm:mx-1.5" aria-hidden="true">
            ·
          </span>
          <Link prefetch={false}
            href="/pricing"
            className="font-bold whitespace-nowrap text-[#D6FB4F] transition-colors hover:text-[#E6FF8A]"
          >
            View Pricing
          </Link>
        </p>
      </div>
    </div>
  );
}
