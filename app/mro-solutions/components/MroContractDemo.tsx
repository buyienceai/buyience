"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
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

type Stage = "desk" | "quoted";

const fieldClass =
  "mt-[4px] w-full rounded-[10px] border border-[#E7DEFB] bg-white px-2.5 py-[6px] text-[12px] font-bold text-[#1B1033]";

export default function MroContractDemo() {
  const { format } = useCurrency();
  const [accountId, setAccountId] = useState<AccountId>("northgate");
  const [itemId, setItemId] = useState<ItemId>("glove");
  const [uomIndex, setUomIndex] = useState(1);
  const [qty, setQty] = useState(6);
  const [stage, setStage] = useState<Stage>("desk");
  const [xrefSingleLine, setXrefSingleLine] = useState(true);
  const xrefTextRef = useRef<HTMLDivElement>(null);

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

  const reset = () => {
    setAccountId("northgate");
    setItemId("glove");
    setUomIndex(1);
    setQty(6);
    setStage("desk");
  };

  const q = Math.max(1, Math.min(500, qty || 1));
  const unit = item.list * account.mult * uom.f;
  const packPrice = unit * uom.q;
  const total = packPrice * q;
  const listTotal = item.list * uom.q * q;
  const saved = listTotal - total;
  const code = item.cpn[accountId];
  const need = uom.q * q;
  const lineSummary = `${q} × ${uom.l} · ${money(packPrice)} / pack`;

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

  useEffect(() => {
    const el = xrefTextRef.current;
    if (!el) return;

    const measure = () => {
      const styles = window.getComputedStyle(el);
      const lineHeight = parseFloat(styles.lineHeight) || 18;
      setXrefSingleLine(el.scrollHeight <= lineHeight * 1.4);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [xrefText, stage]);

  let tipText: string;
  if (item.nonstock) {
    tipText = `Non-stock · direct ship in ${item.nonstock}. Confirm lead time before shutdown.`;
  } else {
    const next = item.uoms[uomIndex + 1];
    const totalUnits = uom.q * q;
    if (next && totalUnits >= next.q) {
      const altUnit = item.list * account.mult * next.f;
      const altTotal = altUnit * totalUnits;
      tipText = `${next.l} break is better at ${totalUnits.toLocaleString("en-IN")} units — save ${money(total - altTotal)}.`;
    } else {
      tipText = `Contract net ${money(unit)} / unit on ${account.contract || "list"} · best break at ${totalUnits.toLocaleString("en-IN")} units.`;
    }
  }

  return (
    <div
      className="quote-hero-visual aiq-console-wrap relative flex min-h-0 w-full flex-col"
      style={
        stage === "quoted"
          ? { alignSelf: "stretch", height: "100%", minHeight: "100%" }
          : { alignSelf: "flex-start", height: "auto" }
      }
    >
      <div
        className="aiq-console flex min-h-0 w-full flex-col"
        style={
          stage === "quoted"
            ? { flex: "1 1 auto", height: "100%", minHeight: 0, display: "flex", flexDirection: "column" }
            : { flex: "0 1 auto", height: "auto" }
        }
        aria-label="Contract Desk — Cross-Reference & Net Price"
      >
        {stage === "desk" ? (
          <>
            <div className="aiq-head">
              <span className="aiq-head-dot" aria-hidden="true" />
              <span className="aiq-head-title">Contract Desk — Cross-Reference &amp; Net Price</span>
              <span className="aiq-head-live">● Live</span>
            </div>

            <div className="aiq-body" style={{ paddingTop: 12, paddingBottom: 14 }}>
              <div className="grid grid-cols-[1.6fr_0.7fr] gap-2">
                <div>
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
                </div>
                <div>
                  <label className="aiq-label" htmlFor="mro-qty">
                    Quantity
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
                </div>
              </div>

              <div className="mt-2 grid grid-cols-2 gap-2">
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

              <div
                className="aiq-customer"
                style={{
                  background: xrefTone === "ok" ? "#E9FBF0" : "#FFF7E8",
                  borderColor: xrefTone === "ok" ? "#C6EED4" : "#F5D9A8",
                  marginTop: 10,
                  marginBottom: 8,
                  padding: "8px 10px",
                  justifyContent: xrefSingleLine ? "center" : "flex-start",
                  alignItems: "center",
                }}
              >
                <span
                  className="aiq-customer-badge"
                  style={{
                    background: xrefTone === "ok" ? "#D1FAE5" : "#FDECC8",
                    color: xrefTone === "ok" ? "#166534" : "#9A6700",
                    width: 28,
                    height: 28,
                    fontSize: 12,
                  }}
                >
                  {xrefIcon}
                </span>
                <div
                  className="aiq-customer-text"
                  style={{
                    flex: "0 1 auto",
                    maxWidth: "calc(100% - 38px)",
                    textAlign: xrefSingleLine ? "center" : "left",
                  }}
                >
                  <div
                    ref={xrefTextRef}
                    className="aiq-customer-name"
                    style={{ fontSize: 12 }}
                  >
                    {xrefText}
                  </div>
                </div>
              </div>

              <div className="aiq-customer-name" style={{ fontSize: 13 }}>
                {item.name}
              </div>
              <div className="aiq-customer-meta" style={{ marginBottom: 8 }}>
                MPN {item.mpn} · base UOM: {item.uoms[0].l.toLowerCase()}
              </div>

              <div
                className="aiq-stats"
                style={{ gridTemplateColumns: "1fr 1fr 1fr", marginBottom: 8 }}
              >
                <div className="aiq-stat">
                  <div className="aiq-stat-lab">List</div>
                  <div className="aiq-stat-val">{money(item.list)}</div>
                </div>
                <div className="aiq-stat">
                  <div className="aiq-stat-lab">Contract</div>
                  <div className="aiq-stat-val">{money(unit)}</div>
                </div>
                <div className="aiq-stat">
                  <div className="aiq-stat-lab">Pack</div>
                  <div className="aiq-stat-val">{money(packPrice)}</div>
                </div>
              </div>

              <div className="aiq-tip" style={{ marginBottom: 8, marginTop: 0 }}>
                <span className="aiq-tip-icon" aria-hidden="true">
                  ✦
                </span>
                <span className="aiq-tip-text">{tipText}</span>
              </div>

              <div className="aiq-stats" style={{ marginBottom: 8 }}>
                <div className="aiq-stat">
                  <div className="aiq-stat-lab">Line total</div>
                  <div className="aiq-stat-val">{money(total)}</div>
                </div>
                <div className={`aiq-stat${account.contract ? " aiq-stat--margin" : ""}`}>
                  <div className="aiq-stat-lab">vs list</div>
                  <div
                    className="aiq-stat-val"
                    style={{ fontSize: account.contract ? undefined : "12px" }}
                  >
                    {account.contract
                      ? `Saved ${money(saved)} (${Math.round((saved / listTotal) * 100)}%)`
                      : "List price · no contract"}
                  </div>
                </div>
              </div>

              <div className="mb-2 flex flex-wrap gap-1.5">
                {item.nonstock ? (
                  <span className="rounded-full bg-[#FDECC8] px-2 py-0.5 font-mono text-[10px] font-semibold tracking-[0.02em] text-[#9A6700]">
                    Non-stock · direct ship {item.nonstock}
                  </span>
                ) : (
                  Object.entries(item.stock ?? {}).map(([br, n]) => (
                    <span
                      key={br}
                      className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold tracking-[0.02em] ${
                        n >= need
                          ? "bg-(--violet-tint) text-(--violet-deep)"
                          : n > 0
                            ? "bg-[#FFF7E8] text-[#9A6700]"
                            : "bg-[#FDEBEB] text-[#D14343]"
                      }`}
                    >
                      {br} · {n > 0 ? `${n.toLocaleString("en-IN")} units` : "nil"}
                    </span>
                  ))
                )}
              </div>

              <button
                type="button"
                className="aiq-send"
                style={{
                  display: "block",
                  width: "100%",
                  color: "#fff",
                  marginTop: 0,
                  padding: "11px 14px",
                  fontSize: 14,
                }}
                onClick={() => setStage("quoted")}
              >
                Add to quote →
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="aiq-head">
              <span className="aiq-head-dot" aria-hidden="true" />
              <span className="aiq-head-title">Quote Q-MRO-1842</span>
              <span className="aiq-head-live">● In quote</span>
            </div>

            <div
              className="aiq-body"
              style={{
                flex: "1 1 auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 0,
                paddingTop: 16,
                paddingBottom: 16,
              }}
            >
              <div>
                <div className="mb-1 text-[12px] font-semibold text-[#6A5A8C]">
                  {account.label}
                  {account.contract ? ` · ${account.contract}` : ""}
                </div>

                <div
                  className="rounded-[12px] border border-(--border) bg-(--surface) px-3.5 py-3"
                  style={{ marginBottom: 14 }}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[14px] font-bold text-[#1B1033]">{item.name}</span>
                    <span className="shrink-0 font-mono text-[11px] text-[#6A5A8C]">
                      Qty: {q} × {uom.l}
                    </span>
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-[#6A5A8C]">{lineSummary}</div>
                  <div className="mt-2 flex items-center gap-1.5 text-[12px] font-semibold text-[#16A34A]">
                    <span
                      className="size-1.5 shrink-0 rounded-full bg-[#16A34A]"
                      aria-hidden="true"
                    />
                    {account.contract
                      ? `Contract net applied${code ? ` · ${code}` : ""}`
                      : "List price line — no contract"}
                  </div>
                </div>

                <div className="aiq-stats">
                  <div className="aiq-stat">
                    <div className="aiq-stat-lab">Quote line total</div>
                    <div className="aiq-stat-val">{money(total)}</div>
                  </div>
                  <div className={`aiq-stat${account.contract ? " aiq-stat--margin" : ""}`}>
                    <div className="aiq-stat-lab">Status</div>
                    <div className="aiq-stat-val" style={{ fontSize: "13px" }}>
                      ✓ Ready to send
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="aiq-tip" style={{ marginTop: 0, marginBottom: 14 }}>
                  <span className="aiq-tip-icon" aria-hidden="true">
                    ✦
                  </span>
                  <span className="aiq-tip-text">
                    Line added with cross-reference and net price intact — no retyping into a separate
                    quote sheet.
                  </span>
                </div>

                <button
                  type="button"
                  className="aiq-send"
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: 0,
                    background: "#fff",
                    color: "#6E2CF4",
                    border: "1.5px solid #E7DEFB",
                  }}
                  onClick={reset}
                >
                  ↺ Price another line
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {stage === "desk" ? (
        <p className="mt-2 text-center text-[11px] font-medium text-[#6A5A8C]">
          Illustrative demo. Accounts, part numbers, prices and stock are sample data, not a live
          catalogue.
        </p>
      ) : null}
    </div>
  );
}
