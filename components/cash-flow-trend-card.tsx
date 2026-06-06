"use client";

import { useMemo, useState } from "react";
import { Panel } from "@/components/tradesafe-shell";

const periodData = {
  today: {
    label: "Today",
    title: "Today Cash Flow Trend",
    xLabels: ["09:00", "11:00", "13:00", "15:00", "17:00", "Now"],
    inflow: [18, 24, 31, 44, 52, 61],
    outflow: [12, 16, 20, 26, 31, 36]
  },
  weekly: {
    label: "Weekly",
    title: "Weekly Cash Flow Trend",
    xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    inflow: [62, 74, 68, 88, 96, 82, 91],
    outflow: [38, 44, 41, 52, 58, 49, 55]
  },
  monthly: {
    label: "Monthly",
    title: "12-Month Cash Flow Trend",
    xLabels: ["Jun", "Aug", "Oct", "Dec", "Feb", "Apr"],
    inflow: [66, 58, 48, 58, 56, 66, 57, 65, 55, 63, 54, 60],
    outflow: [96, 93, 88, 83, 86, 96, 82, 86, 87, 91, 88, 82]
  },
  yearly: {
    label: "Yearly",
    title: "Yearly Cash Flow Trend",
    xLabels: ["2021", "2022", "2023", "2024", "2025"],
    inflow: [42, 55, 64, 79, 88],
    outflow: [31, 39, 47, 58, 63]
  }
} as const;

type Period = keyof typeof periodData;

export function CashFlowTrendCard() {
  const [period, setPeriod] = useState<Period>("monthly");
  const selected = periodData[period];
  const chart = useMemo(() => makeChart(selected.inflow, selected.outflow), [selected]);

  return (
    <Panel className="p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-bold text-bank-navy">{selected.title}</h2>
        <label className="sr-only" htmlFor="cash-flow-period">Cash flow period</label>
        <select
          id="cash-flow-period"
          value={period}
          onChange={(event) => setPeriod(event.target.value as Period)}
          className="h-9 rounded-md border border-bank-line bg-white px-3 text-xs font-bold text-bank-navy shadow-sm outline-none focus:border-bank-red focus:ring-2 focus:ring-red-100"
        >
          {Object.entries(periodData).map(([value, item]) => (
            <option key={value} value={value}>{item.label}</option>
          ))}
        </select>
      </div>
      <div className="mt-2 flex gap-5 text-xs font-semibold text-bank-muted">
        <span><span className="mr-2 inline-block h-2 w-2 rounded-full bg-bank-red" />Inflow (HK$M)</span>
        <span><span className="mr-2 inline-block h-2 w-2 rounded-full bg-slate-400" />Outflow (HK$M)</span>
      </div>
      <div className="mt-3 h-52 overflow-hidden rounded-md bg-white">
        <svg viewBox="0 0 580 172" className="h-full w-full" role="img" aria-label={`${selected.label} cash flow trend`}>
          <defs>
            <linearGradient id={`cashFill-${period}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#c8102e" stopOpacity="0.20" />
              <stop offset="100%" stopColor="#c8102e" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[35, 65, 95, 125].map((y) => (
            <line key={y} x1="12" x2="568" y1={y} y2={y} stroke="#e5eaf2" strokeWidth="1" />
          ))}
          <path d={`M ${chart.inflowPath} L 560,140 L 20,140 Z`} fill={`url(#cashFill-${period})`} />
          <polyline points={chart.outflowPath} fill="none" stroke="#94a3b8" strokeWidth="3" />
          <polyline points={chart.inflowPath} fill="none" stroke="#c8102e" strokeWidth="3" />
          {chart.inflowPoints.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="white" stroke="#c8102e" strokeWidth="2" />
          ))}
          {selected.xLabels.map((label, index) => (
            <text key={label} x={labelPosition(index, selected.xLabels.length)} y="164" textAnchor="middle" className="fill-slate-500 text-[10px] font-semibold">
              {label}
            </text>
          ))}
        </svg>
      </div>
    </Panel>
  );
}

function makeChart(inflow: readonly number[], outflow: readonly number[]) {
  const max = Math.max(...inflow, ...outflow);
  const min = Math.min(...inflow, ...outflow);
  const scaleY = (value: number) => 132 - ((value - min) / Math.max(max - min, 1)) * 96;
  const scaleX = (index: number, length: number) => 20 + (index / Math.max(length - 1, 1)) * 540;
  const toPoints = (values: readonly number[]) => values.map((value, index) => [scaleX(index, values.length), scaleY(value)] as const);
  const inflowPoints = toPoints(inflow);
  const outflowPoints = toPoints(outflow);

  return {
    inflowPoints,
    inflowPath: inflowPoints.map(([x, y]) => `${x},${y}`).join(" "),
    outflowPath: outflowPoints.map(([x, y]) => `${x},${y}`).join(" ")
  };
}

function labelPosition(index: number, length: number) {
  return 20 + (index / Math.max(length - 1, 1)) * 540;
}
