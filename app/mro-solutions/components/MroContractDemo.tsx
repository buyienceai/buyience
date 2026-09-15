"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useCurrency } from "@/components/CurrencyProvider";

type AccountId = "northgate" | "verity" | "spot";
type ItemId = "glove" | "bolt" | "bearing" | "hose";

type Uom = { l: string; q: number; f: number };

const ACCOUNTS: Record<
  AccountId,
  { selectLabel: string; label: string; contract: string | null; mult: number }
> = {
  northgate: {
    selectLabel: "Northgate Foods · Plant 2 · contract MRO-2441",
    label: "Northgate Foods · Plant 2",
    contract: "MRO-2441",
    mult: 0.72,
  },
  verity: {
    selectLabel: "Verity Pharma · national agreement MRO-3180",
    label: "Verity Pharma · National",
    contract: "MRO-3180",
    mult: 0.68,
  },
  spot: {
    selectLabel: "Spot buy · no contract on file",
    label: "Spot buy",
    contract: null,
    mult: 1,
  },
};

const ITEMS: Record<
  ItemId,
  {
    selectLabel: string;
    name: string;
    mpn: string;
    list: number;
    cpn: Partial<Record<AccountId, string>>;
    uoms: Uom[];
    stock?: Record<string, number>;
    rush?: string;
    nonstock?: string;
  }
> = {
  glove: {
    selectLabel: "Cut-resistant glove · level D",
    name: "Cut-resistant glove · level D",
    mpn: "3M-CRG-D9",
    list: 385,
    cpn: { northgate: "NG-PPE-0042", verity: "VP-SAF-118" },
    uoms: [
      { l: "Pair", q: 1, f: 1 },
      { l: "Pack of 12", q: 12, f: 0.94 },
      { l: "Case of 120", q: 120, f: 0.88 },
    ],
    stock: { Pune: 960, Delhi: 420, Chennai: 0 },
    rush: "Pune",
  },
  bolt: {
    selectLabel: "Hex bolt M10×50 · A2-70",
    name: "Hex bolt M10×50 · A2-70 stainless",
    mpn: "FAS-M1050-A2",
    list: 18.4,
    cpn: { northgate: "NG-FAS-1188", verity: "VP-FST-0904" },
    uoms: [
      { l: "Each", q: 1, f: 1 },
      { l: "Box of 100", q: 100, f: 0.9 },
      { l: "Bag of 1,000", q: 1000, f: 0.82 },
    ],
    stock: { Pune: 24000, Delhi: 8500, Chennai: 3000 },
    rush: "Delhi",
  },
  bearing: {
    selectLabel: "Ball bearing 6205-2RS",
    name: "Deep groove ball bearing 6205-2RS",
    mpn: "SKF-6205-2RS",
    list: 412,
    cpn: { northgate: "NG-BRG-0311" },
    uoms: [
      { l: "Each", q: 1, f: 1 },
      { l: "Box of 10", q: 10, f: 0.95 },
      { l: "Case of 50", q: 50, f: 0.9 },
    ],
    stock: { Pune: 180, Delhi: 22, Chennai: 0 },
    rush: "Pune",
  },
  hose: {
    selectLabel: "Hydraulic hose assy · R2AT",
    name: 'Hydraulic hose assembly · R2AT 1/2" × 1200mm',
    mpn: "HYD-R2AT-12-1200",
    list: 1640,
    cpn: { northgate: "NG-HYD-0567", verity: "VP-FLU-2210" },
    uoms: [
      { l: "Each", q: 1, f: 1 },
      { l: "Set of 4", q: 4, f: 0.96 },
    ],
    nonstock: "6–8 working days",
  },
};

const fieldClass =
  "mt-[6px] w-full rounded-[10px] border border-[#E7DEFB] bg-white px-3 py-[8px] text-[12.5px] font-bold text-[#1B1033]";

export default function MroContractDemo() {
  const { format } = useCurrency();
  const [accountId, setAccountId] = useState<AccountId>("northgate");
  const [itemId, setItemId] = useState<ItemId>("glove");
  const [uomIndex, setUomIndex] = useState(1);
  const [qty, setQty] = useState(6);

  const account = ACCOUNTS[accountId];
  const item = ITEMS[itemId];
  const uom = item.uoms[uomIndex] ?? item.uoms[0];

  useEffect(() => {
    setUomIndex(item.uoms.length > 1 ? 1 : 0);
  }, [itemId, item.uoms.length]);

  const money = useMemo(
    () => (value: number) => format(Math.round(value * 100) / 100, value < 100 ? 2 : 0),
    [format],
  );

  const q = Math.max(1, Math.min(500, qty || 1));
  const unit = item.list * account.mult * uom.f;
  const packPrice = unit * uom.q;
  const total = packPrice * q;
  const listTotal = item.list * uom.q * q;
  const saved = listTotal - total;
  const code = item.cpn[accountId];
  const need = uom.q * q;

  let xrefTone: "ok" | "warn" = "ok";
  let xrefIcon = "✓";
  let xrefText: string;
  if (!account.contract) {
    xrefTone = "warn";
    xrefIcon = "!";
    xrefText = `No contract on file for this account — list pricing shown. Searched by MPN ${item.mpn}.`;
  } else if (code) {
    xrefText = `Their code ${code} → your SKU · priced on contract ${account.contract}`;
  } else {
    xrefTone = "warn";
    xrefIcon = "!";
    xrefText = `No cross-reference on file for ${account.label} — matched on MPN ${item.mpn}. Add the code once and it resolves next time.`;
  }

  let tipText: string;
  if (item.nonstock) {
    tipText = `Non-stock line — direct ship in ${item.nonstock}. Confirm the lead time on the quote before the buyer commits to a shutdown date.`;
  } else {
    const next = item.uoms[uomIndex + 1];
    const totalUnits = uom.q * q;
    if (next && totalUnits >= next.q) {
      const altUnit = item.list * account.mult * next.f;
      const altTotal = altUnit * totalUnits;
      tipText = `At ${totalUnits.toLocaleString("en-IN")} units the ${next.l.toLowerCase()} is the better break — ${money(altUnit)} per unit instead of ${money(unit)}, saving a further ${money(total - altTotal)} on this line.`;
    } else {
      tipText = `Contract line priced at ${money(unit)} per unit on ${account.contract || "list"}. This is the best break at ${totalUnits.toLocaleString("en-IN")} units.`;
    }
  }

  return (
    <div className="quote-hero-visual aiq-console-wrap relative flex min-h-0 w-full flex-col self-stretch">
      <div
        className="aiq-console flex min-h-0 w-full flex-1 flex-col"
        aria-label="Contract Desk — Cross-Reference & Net Price"
      >
        <div className="aiq-head">
          <span className="aiq-head-dot" aria-hidden="true" />
          <span className="aiq-head-title">Contract Desk — Cross-Reference &amp; Net Price</span>
          <span className="aiq-head-live">● Live</span>
        </div>

        <div className="aiq-body">
          <label className="aiq-label" htmlFor="mro-account">
            Account
          </label>
          <select
            id="mro-account"
            className={fieldClass}
            value={accountId}
            onChange={(e) => setAccountId(e.target.value as AccountId)}
          >
            {(Object.keys(ACCOUNTS) as AccountId[]).map((id) => (
              <option key={id} value={id}>
                {ACCOUNTS[id].selectLabel}
              </option>
            ))}
          </select>

          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <div>
              <label className="aiq-label" htmlFor="mro-item">
                Item
              </label>
              <select
                id="mro-item"
                className={fieldClass}
                value={itemId}
                onChange={(e) => setItemId(e.target.value as ItemId)}
              >
                {(Object.keys(ITEMS) as ItemId[]).map((id) => (
                  <option key={id} value={id}>
                    {ITEMS[id].selectLabel}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="aiq-label" htmlFor="mro-uom">
                Pack / UOM
              </label>
              <select
                id="mro-uom"
                className={fieldClass}
                value={uomIndex}
                onChange={(e) => setUomIndex(Number(e.target.value))}
              >
                {item.uoms.map((u, i) => (
                  <option key={u.l} value={i}>
                    {u.l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label className="aiq-label mt-3 block" htmlFor="mro-qty">
            Quantity (packs)
          </label>
          <input
            id="mro-qty"
            type="number"
            min={1}
            max={500}
            className={fieldClass}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          />

          <div
            className="aiq-customer"
            style={{
              background: xrefTone === "ok" ? "#E9FBF0" : "#FFF7E8",
              borderColor: xrefTone === "ok" ? "#C6EED4" : "#F5D9A8",
              marginTop: 14,
              marginBottom: 12,
            }}
          >
            <span
              className="aiq-customer-badge"
              style={{
                background: xrefTone === "ok" ? "#D1FAE5" : "#FDECC8",
                color: xrefTone === "ok" ? "#166534" : "#9A6700",
              }}
            >
              {xrefIcon}
            </span>
            <div className="aiq-customer-text">
              <div className="aiq-customer-name">{xrefText}</div>
            </div>
          </div>

          <div className="aiq-customer-name">{item.name}</div>
          <div className="aiq-customer-meta">
            MPN {item.mpn} · base UOM: {item.uoms[0].l.toLowerCase()}
          </div>

          <div className="aiq-stats" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
            <div className="aiq-stat">
              <div className="aiq-stat-lab">List</div>
              <div className="aiq-stat-val">{money(item.list)}</div>
              <div className="mt-0.5 text-[10.5px] font-semibold text-[#6A5A8C]">per each</div>
            </div>
            <div className="aiq-stat">
              <div className="aiq-stat-lab">Contract</div>
              <div className="aiq-stat-val">{money(unit)}</div>
              <div className="mt-0.5 text-[10.5px] font-semibold text-[#6A5A8C]">per each</div>
            </div>
            <div className="aiq-stat">
              <div className="aiq-stat-lab">Pack price</div>
              <div className="aiq-stat-val">{money(packPrice)}</div>
              <div className="mt-0.5 text-[10.5px] font-semibold text-[#6A5A8C]">
                per {uom.l.toLowerCase()}
              </div>
            </div>
          </div>

          <div className="aiq-tip">
            <span className="aiq-tip-icon" aria-hidden="true">
              ✦
            </span>
            <span className="aiq-tip-text">{tipText}</span>
          </div>

          <div className="aiq-stats">
            <div className="aiq-stat">
              <div className="aiq-stat-lab">Line total</div>
              <div className="aiq-stat-val">{money(total)}</div>
            </div>
            <div className={`aiq-stat${account.contract ? " aiq-stat--margin" : ""}`}>
              <div className="aiq-stat-lab">vs list</div>
              <div className="aiq-stat-val" style={{ fontSize: account.contract ? undefined : "13px" }}>
                {account.contract
                  ? `Saved ${money(saved)} (${Math.round((saved / listTotal) * 100)}%)`
                  : "List price · no contract"}
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.nonstock ? (
              <span className="rounded-full bg-[#FDECC8] px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-[0.02em] text-[#9A6700]">
                Non-stock · direct ship {item.nonstock}
              </span>
            ) : (
              <>
                {Object.entries(item.stock ?? {}).map(([br, n]) => (
                  <span
                    key={br}
                    className={`rounded-full px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-[0.02em] ${
                      n >= need
                        ? "bg-(--violet-tint) text-(--violet-deep)"
                        : n > 0
                          ? "bg-[#FFF7E8] text-[#9A6700]"
                          : "bg-[#FDEBEB] text-[#D14343]"
                    }`}
                  >
                    {br} · {n > 0 ? `${n.toLocaleString("en-IN")} units` : "nil"}
                  </span>
                ))}
                {item.rush ? (
                  <span className="rounded-full bg-[#E9FBF0] px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-[0.02em] text-[#166534]">
                    Rush · same-day ex {item.rush}
                  </span>
                ) : null}
              </>
            )}
          </div>

          <a
            href="/ai-quote-engine"
            className="aiq-send"
            style={{ display: "block", textAlign: "center", color: "#fff", textDecoration: "none" }}
          >
            Add to quote →
          </a>
        </div>
      </div>
      <p className="mt-3 text-center text-[12px] font-medium text-[#6A5A8C]">
        Illustrative demo. Accounts, part numbers, prices and stock are sample data, not a live catalogue.
      </p>
    </div>
  );
}
