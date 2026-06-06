"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Search } from "lucide-react";
import { applicationCases } from "@/data/tradesafe";

const staticResults = [
  {
    title: "Overview Dashboard",
    description: "Portfolio KPIs, cash-flow trend, risk watchlist",
    href: "/backoffice",
    keywords: ["overview", "dashboard", "portfolio", "risk", "kpi"]
  },
  {
    title: "Application Upload",
    description: "Upload invoice, contract, shipping and profile documents",
    href: "/demo/upload",
    keywords: ["upload", "invoice", "contract", "shipping", "buyer", "supplier"]
  },
  {
    title: "AI Document Reader",
    description: "Extracted fields, confidence scores and missing evidence",
    href: "/demo/document-reader",
    keywords: ["document", "reader", "ocr", "fields", "confidence", "invoice"]
  },
  {
    title: "Transaction Verification",
    description: "Invoice, payment, contract and logistics consistency checks",
    href: "/demo/verification",
    keywords: ["verification", "transaction", "duplicate", "payment", "logistics"]
  },
  {
    title: "Risk Dashboard",
    description: "Creditworthiness, authenticity, AML and fraud risk",
    href: "/demo/risk-dashboard",
    keywords: ["risk", "credit", "aml", "fraud", "score"]
  },
  {
    title: "AI Credit Memo",
    description: "Officer-ready recommendation and proposed conditions",
    href: "/demo/credit-memo",
    keywords: ["memo", "recommendation", "approve", "conditions"]
  },
  {
    title: "Approval & Audit Trail",
    description: "Officer action, audit hashes and governance record",
    href: "/demo/audit-trail",
    keywords: ["audit", "hash", "approval", "officer", "governance"]
  }
];

const caseResults = applicationCases.map((item) => ({
  title: item.company,
  description: `${item.id} | ${item.industry} | ${item.request}`,
  href: item.href,
  keywords: [
    item.id,
    item.company,
    item.industry,
    item.route,
    item.request,
    item.owner,
    item.status,
    ...item.flags,
    ...item.missingDocs
  ]
}));

const searchResults = [...caseResults, ...staticResults];

export function GlobalSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return searchResults.slice(0, 5);

    return searchResults
      .map((item) => {
        const haystack = [item.title, item.description, ...item.keywords].join(" ").toLowerCase();
        const titleMatch = item.title.toLowerCase().includes(normalized) ? 2 : 0;
        const bodyMatch = haystack.includes(normalized) ? 1 : 0;
        return { item, score: titleMatch + bodyMatch };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item)
      .slice(0, 6);
  }, [query]);

  const showResults = isFocused && (query.length > 0 || results.length > 0);

  function openResult(href: string) {
    setQuery("");
    setIsFocused(false);
    router.push(href);
  }

  return (
    <div className="relative w-full max-w-[620px]">
      <label className="flex h-11 w-full items-center gap-3 rounded-md border border-bank-line bg-white px-4 text-sm font-semibold text-bank-muted shadow-sm focus-within:border-bank-red focus-within:ring-2 focus-within:ring-red-100">
        <Search size={18} className="shrink-0" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && results[0]) {
              event.preventDefault();
              openResult(results[0].href);
            }
            if (event.key === "Escape") {
              setIsFocused(false);
            }
          }}
          placeholder="Search company, case ID, invoice, buyer, supplier"
          className="min-w-0 flex-1 bg-transparent text-bank-navy outline-none placeholder:text-bank-muted"
        />
      </label>
      {showResults ? (
        <div className="absolute left-0 right-0 top-12 z-40 overflow-hidden rounded-lg border border-bank-line bg-white shadow-panel">
          {results.length > 0 ? (
            <div className="max-h-[320px] overflow-y-auto p-2">
              {results.map((item) => (
                <button
                  key={`${item.title}-${item.href}`}
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => openResult(item.href)}
                  className="flex w-full items-start gap-3 rounded-md p-3 text-left hover:bg-bank-bg"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-red-50 text-bank-red">
                    <FileText size={17} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-bank-navy">{item.title}</span>
                    <span className="mt-1 block line-clamp-2 text-xs font-semibold leading-5 text-bank-muted">{item.description}</span>
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="p-4 text-sm font-semibold text-bank-muted">No matching company, case, document, or page found.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
