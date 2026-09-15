"use client";

import React, { useMemo, useState } from "react";
import { useCurrency } from "@/components/CurrencyProvider";

const VEHICLES = [
  { id: "swift", label: "Maruti Suzuki Swift 1.2 · 2018–2023 · K12N" },
  { id: "i20", label: "Hyundai i20 1.2 · 2015–2020 · Kappa" },
];

const PARTS = [
  {
    id: "pads",
    line: "Front brake pads",
    name: "Front brake pad set",
    sku: "BX-1140-FR",
    meta: "OE 55810M74L00 · Ceramic · with wear sensor",
    list: 1840,
    floor: 1142,
    core: 0,
    nets: { workshop: 1472, jobber: 1285, fleet: 1198 },
    volumeBreak: 0.03,
    stock: [
      { loc: "Pune", note: "48 in stock" },
      { loc: "Delhi", note: "12 in stock" },
      { loc: "Chennai", note: "ETA 3 days" },
    ],
  },
  {
    id: "clutch",
    line: "Clutch kit",
    name: "Three-piece clutch kit",
    sku: "CK-2208-MS",
    meta: "OE 22100M68K00 · Cover, disc, bearing",
    list: 6420,
    floor: 4110,
    core: 850,
    nets: { workshop: 5280, jobber: 4795, fleet: 4380 },
    volumeBreak: 0.03,
    stock: [
      { loc: "Pune", note: "6 in stock" },
      { loc: "Delhi", note: "In transit" },
      { loc: "Chennai", note: "ETA 5 days" },
    ],
  },
];

const ACCOUNTS = [
  { id: "workshop", label: "Workshop · Tier 1" },
  { id: "jobber", label: "Jobber · Tier 2" },
  { id: "fleet", label: "Fleet · Contract" },
] as const;

const QTY = 8;

export default function AutomotiveCounterDemo() {
  const { format } = useCurrency();
  const [vehicleId, setVehicleId] = useState(VEHICLES[0].id);
  const [partId, setPartId] = useState(PARTS[0].id);
  const [accountId, setAccountId] = useState<(typeof ACCOUNTS)[number]["id"]>("jobber");

  const vehicle = VEHICLES.find((v) => v.id === vehicleId) ?? VEHICLES[0];
  const part = PARTS.find((p) => p.id === partId) ?? PARTS[0];
  const net = part.nets[accountId];
  const lineTotal = net * QTY;
  const cost = part.nets.jobber * (1 - 0.212);
  const margin = ((net - cost) / net) * 100;
  const marginTight = margin < 20;
  const marginLabel = margin >= 30 ? "Strong" : marginTight ? "Below target" : "Healthy";
  const money = useMemo(() => (value: number) => format(value, 0), [format]);

  const fieldClass =
    "mt-[6px] w-full rounded-[10px] border border-[#E7DEFB] bg-white px-3 py-[8px] text-[12.5px] font-bold text-[#1B1033]";

  return (
    <div className="quote-hero-visual aiq-console-wrap relative flex min-h-0 w-full flex-col self-stretch">
      <div className="aiq-console flex min-h-0 w-full flex-1 flex-col" aria-label="Parts counter — fitment and net price">
        <div className="aiq-head">
          <span className="aiq-head-dot" aria-hidden="true" />
          <span className="aiq-head-title">Parts Counter — Fitment &amp; Net Price</span>
          <span className="aiq-head-live">● Live</span>
        </div>

        <div className="aiq-body">
          <label className="aiq-label" htmlFor="auto-vehicle">
            Vehicle
          </label>
          <select
            id="auto-vehicle"
            className={fieldClass}
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
          >
            {VEHICLES.map((v) => (
              <option key={v.id} value={v.id}>
                {v.label}
              </option>
            ))}
          </select>

          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <div>
              <label className="aiq-label" htmlFor="auto-part">
                Part line
              </label>
              <select
                id="auto-part"
                className={fieldClass}
                value={partId}
                onChange={(e) => setPartId(e.target.value)}
              >
                {PARTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.line}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="aiq-label" htmlFor="auto-account">
                Account
              </label>
              <select
                id="auto-account"
                className={fieldClass}
                value={accountId}
                onChange={(e) => setAccountId(e.target.value as (typeof ACCOUNTS)[number]["id"])}
              >
                {ACCOUNTS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div
            className="aiq-customer"
            style={{ background: "#E9FBF0", borderColor: "#C6EED4", marginTop: 14, marginBottom: 12 }}
          >
            <span className="aiq-customer-badge" style={{ background: "#D1FAE5", color: "#166534" }}>
              ✓
            </span>
            <div className="aiq-customer-text">
              <div className="aiq-customer-name">Verified fit</div>
              <div className="aiq-customer-meta">{vehicle.label.split(" · ").slice(-2).join(" · ")}</div>
            </div>
          </div>

          <div className="aiq-customer-name">{part.name}</div>
          <div className="aiq-customer-meta">
            SKU {part.sku} · {part.meta}
          </div>

          <div className="aiq-stats" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
            <div className="aiq-stat">
              <div className="aiq-stat-lab">List</div>
              <div className="aiq-stat-val">{money(part.list)}</div>
            </div>
            <div className="aiq-stat">
              <div className="aiq-stat-lab">Your net</div>
              <div className="aiq-stat-val">{money(net)}</div>
            </div>
            <div className="aiq-stat">
              <div className="aiq-stat-lab">Core deposit</div>
              <div className="aiq-stat-val">{part.core ? money(part.core) : "—"}</div>
            </div>
          </div>

          <div className="aiq-tip">
            <span className="aiq-tip-icon" aria-hidden="true">
              ✦
            </span>
            <span className="aiq-tip-text">
              AI-optimised to <b>{money(net)}</b>/unit with a {Math.round(part.volumeBreak * 100)}% volume
              break. Floor {money(part.floor)} before the margin guardrail trips.
            </span>
          </div>

          <div className="aiq-stats">
            <div className="aiq-stat">
              <div className="aiq-stat-lab">Line total · {QTY} units</div>
              <div className="aiq-stat-val">{money(lineTotal)}</div>
            </div>
            <div className={`aiq-stat aiq-stat--margin${marginTight ? " is-tight" : ""}`}>
              <div className="aiq-stat-lab">Margin · {marginLabel}</div>
              <div className="aiq-stat-val">{margin.toFixed(1)}%</div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {part.stock.map((s) => (
              <span
                key={s.loc}
                className="rounded-full bg-(--violet-tint) px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-[0.02em] text-(--violet-deep)"
              >
                {s.loc} · {s.note}
              </span>
            ))}
          </div>

          <button type="button" className="aiq-send">
            Send to sales room →
          </button>
        </div>
      </div>
      <p className="mt-3 text-center text-[12px] font-medium text-[#6A5A8C]">
        Illustrative demo. Part numbers, prices and stock are sample data, not a live catalogue.
      </p>
    </div>
  );
}
