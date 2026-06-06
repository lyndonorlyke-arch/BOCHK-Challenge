"use client";

import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";

export function DateRangeControl() {
  const [startDate, setStartDate] = useState("2025-05-01");
  const [endDate, setEndDate] = useState("2025-05-31");

  const rangeLabel = useMemo(() => {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  }, [startDate, endDate]);

  return (
    <div className="flex min-h-11 flex-wrap items-center gap-2 rounded-md border border-bank-line bg-white px-3 py-2 text-sm font-bold text-bank-navy shadow-sm">
      <CalendarDays size={17} className="shrink-0" />
      <span className="sr-only">{rangeLabel}</span>
      <input
        aria-label="Start date"
        type="date"
        value={startDate}
        max={endDate}
        onChange={(event) => setStartDate(event.target.value)}
        className="w-[132px] rounded-md border border-transparent bg-bank-bg px-2 py-1 text-xs font-bold text-bank-navy outline-none focus:border-bank-red focus:bg-white"
      />
      <span className="text-bank-muted">-</span>
      <input
        aria-label="End date"
        type="date"
        value={endDate}
        min={startDate}
        onChange={(event) => setEndDate(event.target.value)}
        className="w-[132px] rounded-md border border-transparent bg-bank-bg px-2 py-1 text-xs font-bold text-bank-navy outline-none focus:border-bank-red focus:bg-white"
      />
    </div>
  );
}

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}
