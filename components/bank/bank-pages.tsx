"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BellRing,
  CheckCircle2,
  Clock3,
  Download,
  Edit3,
  FileSearch,
  Network,
  RefreshCw,
  Send,
  ShieldAlert,
  Sparkles,
  TrendingUp
} from "lucide-react";
import type {
  ApprovalWorkflow,
  AuditLog,
  CreditMemo,
  RiskAnalysis,
  TradeDocument,
  VerificationResult
} from "@/lib/mock-backend";
import { nowParts, updateDemoState, useDemoState } from "@/lib/demo-store";

const activeCaseId = "TF-2026-0001";

type BankCaseSummary = {
  id: string;
  companyName: string;
  applicantName: string;
  financingType: string;
  requestedAmount: string;
  amount: number;
  currency: string;
  sector: string;
  region: string;
  status: string;
  riskLevel: string;
  riskScore: number;
  assignedOfficer: string;
  submittedAt: string;
  updatedAt: string;
};

type PortfolioData = {
  kpis: { label: string; value: string; detail: string; delta: string; tone: string }[];
  pipeline: { label: string; value: number }[];
  riskDistribution: { label: string; value: number }[];
  sectorBreakdown: { label: string; count: number; percentage: number }[];
  regionBreakdown: { label: string; count: number; percentage: number }[];
  alerts: { title: string; count: number; severity: string }[];
  recentRiskSignals: { caseId: string; companyName: string; riskType: string; severity: string; status: string }[];
};

type CasesResponse = {
  cases: BankCaseSummary[];
  filters: {
    financingTypes: string[];
    riskLevels: string[];
    statuses: string[];
  };
};

type DocumentsResponse = {
  case: { id: string; companyName: string; financingType: string };
  documents: TradeDocument[];
  extractedFields: { documentType: string; field: string; value: string; confidence: number }[];
  correctionLog: { at: string; officer: string; correction: string }[];
};

type RiskResponse = {
  case: { id: string; companyName: string; financingType: string; requestedAmount: string; status: string };
  risk: RiskAnalysis;
  verification: VerificationResult;
};

type MemoResponse = {
  case: { id: string; companyName: string; financingType: string; requestedAmount: string };
  memo: CreditMemo;
};

type AuditResponse = {
  case: { id: string; companyName: string; riskLevel: string };
  workflow: ApprovalWorkflow;
  auditLogs: AuditLog[];
  evidenceHashes: { item: string; value: string }[];
};

type MonitoringData = {
  kpis: { label: string; value: string }[];
  facilities: { facilityId: string; sme: string; type: string; limit: string; status: string; risk: string }[];
  riskTrend: number[];
  cashFlowMonitoring: string[];
  earlyWarningSignals: { caseId: string; companyName: string; type: string; severity: string; description: string }[];
  recommendedActions: string[];
};

const emptyPortfolio: PortfolioData = {
  kpis: [],
  pipeline: [],
  riskDistribution: [],
  sectorBreakdown: [],
  regionBreakdown: [],
  alerts: [],
  recentRiskSignals: []
};

const emptyCases: CasesResponse = {
  cases: [],
  filters: {
    financingTypes: [],
    riskLevels: [],
    statuses: []
  }
};

const emptyDocuments: DocumentsResponse = {
  case: { id: "", companyName: "", financingType: "" },
  documents: [],
  extractedFields: [],
  correctionLog: []
};

const emptyRisk: RiskResponse = {
  case: { id: "", companyName: "", financingType: "", requestedAmount: "", status: "" },
  risk: {
    score: 0,
    level: "Low",
    breakdown: [],
    redFlags: [],
    complianceChecks: [],
    aiExplanation: "",
    evidence: [],
    counterparties: []
  },
  verification: {
    summary: {
      documentMatch: 0,
      externalSourcesConnected: 0,
      evidenceItems: 0,
      recommendedAction: ""
    },
    matchingMatrix: [],
    externalConnections: [],
    evidence: []
  }
};

const emptyMemo: MemoResponse = {
  case: { id: "", companyName: "", financingType: "", requestedAmount: "" },
  memo: {
    status: "Draft",
    warning: "",
    sections: [],
    supportingEvidence: [],
    recommendation: "Request More Information"
  }
};

const emptyAudit: AuditResponse = {
  case: { id: "", companyName: "", riskLevel: "" },
  workflow: {
    currentStage: "",
    stages: [],
    decisionOptions: []
  },
  auditLogs: [],
  evidenceHashes: []
};

const emptyMonitoring: MonitoringData = {
  kpis: [],
  facilities: [],
  riskTrend: [],
  cashFlowMonitoring: [],
  earlyWarningSignals: [],
  recommendedActions: []
};

function useApiResource<T>(url: string, initialData: T) {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch(url)
      .then((response) => response.json() as Promise<T>)
      .then((payload) => {
        if (active) {
          setData(payload);
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [url]);

  return { data, isLoading };
}

function PageShell({
  title,
  subtitle,
  caseMeta,
  children
}: {
  title: string;
  subtitle?: string;
  caseMeta?: { id: string; companyName: string };
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0 space-y-5">
      <header className="flex min-w-0 flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div className="min-w-0">
          <h1 className="break-words text-2xl font-bold tracking-normal text-bank-navy sm:text-3xl">{title}</h1>
          {subtitle ? <p className="mt-2 max-w-4xl text-sm leading-6 text-bank-muted">{subtitle}</p> : null}
        </div>
        {caseMeta?.id ? (
          <p className="break-words text-sm font-semibold text-bank-muted">
            Case ID: <span className="text-bank-navy">{caseMeta.id}</span> <span className="mx-2">|</span> SME: <span className="text-bank-navy">{caseMeta.companyName}</span>
          </p>
        ) : null}
      </header>
      {children}
    </div>
  );
}

function Panel({ title, action, children, className = "" }: { title?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`min-w-0 overflow-hidden rounded-lg border border-bank-line bg-white shadow-sm ${className}`}>
      {title || action ? (
        <header className="flex min-w-0 flex-wrap items-center justify-between gap-3 border-b border-bank-line px-4 py-3">
          {title ? <h2 className="text-base font-bold text-bank-navy">{title}</h2> : <span />}
          {action}
        </header>
      ) : null}
      <div className="p-4">{children}</div>
    </section>
  );
}

function KpiCard({ label, value, detail, delta, tone }: { label: string; value: string; detail: string; delta: string; tone: string }) {
  const toneMap: Record<string, string> = {
    red: "bg-red-50 text-bank-red border-red-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    blue: "bg-blue-50 text-blue-700 border-blue-100"
  };
  const Icon = tone === "orange" ? Clock3 : tone === "green" ? TrendingUp : tone === "red" ? AlertTriangle : BarChart3;
  return (
    <article className="grid min-h-36 min-w-0 grid-cols-[52px_minmax(0,1fr)] gap-4 rounded-lg border border-bank-line bg-white p-4 shadow-sm">
      <span className={`mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full border ${toneMap[tone] ?? toneMap.blue}`}>
          <Icon size={25} />
      </span>
      <div className="flex min-w-0 flex-col">
        <p className="min-h-10 text-sm font-bold leading-5 text-bank-navy">{label}</p>
        <p className="mt-2 whitespace-nowrap text-3xl font-bold leading-none text-bank-navy">{value}</p>
        <div className="mt-auto flex min-w-0 items-end justify-between gap-3 pt-3">
          <p className="min-w-0 text-xs leading-4 text-bank-muted">{detail}</p>
          <span className={`shrink-0 whitespace-nowrap pb-0.5 text-xs font-bold ${delta.startsWith("+") || delta.startsWith("-0") ? "text-emerald-700" : "text-bank-red"}`}>{delta}</span>
        </div>
      </div>
    </article>
  );
}

function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "red" | "orange" | "green" | "blue" | "neutral" | "purple" }) {
  const map = {
    red: "border-red-300 bg-white text-bank-red",
    orange: "border-orange-300 bg-orange-50 text-orange-700",
    green: "border-emerald-300 bg-emerald-50 text-emerald-700",
    blue: "border-blue-300 bg-blue-50 text-blue-700",
    purple: "border-purple-300 bg-purple-50 text-purple-700",
    neutral: "border-slate-300 bg-white text-slate-700"
  };
  return <span className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-bold ${map[tone]}`}>{children}</span>;
}

function toneFor(value: string): "red" | "orange" | "green" | "blue" | "neutral" | "purple" {
  if (["High", "Critical", "Rejected"].includes(value)) return "red";
  if (["Medium High", "Medium", "Review Required", "Missing Documents", "Verification Required", "Needs Review", "Watchlist", "Delayed"].includes(value)) return "orange";
  if (["Low", "Clear", "Completed", "Ready for Credit Review", "Extracted", "Performing", "Approved", "Connected", "Verified"].includes(value)) return "green";
  if (["New Submission", "AI Extraction Completed", "Credit Review"].includes(value)) return "blue";
  return "neutral";
}

function DataTable({ columns, rows }: { columns: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="w-full max-w-full overflow-x-auto">
      <table className="min-w-[720px] text-left text-sm">
        <thead className="border-b border-bank-line bg-bank-bg/70 text-xs font-bold uppercase tracking-wide text-bank-muted">
          <tr>{columns.map((column) => <th key={column} className="px-3 py-2.5">{column}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-bank-line text-bank-navy">
          {rows.map((row, index) => (
            <tr key={index} className="hover:bg-bank-bg">
              {row.map((cell, cellIndex) => <td key={cellIndex} className="px-3 py-2.5 align-top">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ActionButton({
  children,
  tone = "primary",
  onClick,
  disabled = false
}: {
  children: React.ReactNode;
  tone?: "primary" | "ghost" | "green" | "orange" | "purple";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const map = {
    primary: "border-bank-red bg-bank-red text-white",
    ghost: "border-bank-line bg-white text-bank-navy",
    green: "border-emerald-300 bg-white text-emerald-700",
    orange: "border-orange-300 bg-white text-orange-700",
    purple: "border-purple-300 bg-white text-purple-700"
  };
  return <button type="button" className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-md border px-4 text-sm font-bold shadow-sm disabled:cursor-not-allowed disabled:opacity-60 ${map[tone]}`} onClick={onClick} disabled={disabled}>{children}</button>;
}

function ProgressDots({ labels, active }: { labels: string[]; active: number }) {
  return (
    <div className="grid gap-3 sm:grid-cols-5">
      {labels.map((label, index) => (
        <div key={label} className="text-center">
          <span className={`mx-auto grid h-9 w-9 place-items-center rounded-full border-2 text-sm font-bold ${index <= active ? "border-bank-red bg-bank-red text-white" : "border-bank-line bg-white text-bank-muted"}`}>
            {index + 1}
          </span>
          <p className={`mt-2 text-xs font-bold ${index === active ? "text-bank-red" : "text-bank-muted"}`}>{label}</p>
        </div>
      ))}
    </div>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm"><span>{label}</span><span>{value}%</span></div>
      <div className="mt-2 h-3 rounded-full bg-bank-bg"><div className="h-3 rounded-full bg-bank-blue" style={{ width: `${Math.min(value, 100)}%` }} /></div>
    </div>
  );
}

function LoadingHint({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;
  return <p className="text-xs font-semibold text-bank-muted">Loading mock API data...</p>;
}

function RiskDistributionDonut({ items, total }: { items: PortfolioData["riskDistribution"]; total: number }) {
  const [hoveredRisk, setHoveredRisk] = useState<PortfolioData["riskDistribution"][number] | null>(null);
  const colors: Record<string, string> = {
    Low: "#16a34a",
    Medium: "#f59e0b",
    "Medium High": "#f97316",
    High: "#dc2626"
  };
  const segments = items.reduce<Array<{ item: PortfolioData["riskDistribution"][number]; percent: number; offset: number }>>((list, item) => {
    const percent = total ? (item.value / total) * 100 : 0;
    const offset = list.reduce((sum, segment) => sum + segment.percent, 0);
    return [...list, { item, percent, offset }];
  }, []);

  return (
    <div className="relative flex flex-col items-center gap-4 sm:flex-row">
      <div className="relative h-40 w-40">
        <svg viewBox="0 0 120 120" className="h-40 w-40 -rotate-90" aria-label="Risk distribution chart">
          <circle cx="60" cy="60" r="42" fill="none" stroke="#eef2f7" strokeWidth="22" />
          {segments.map(({ item, percent, offset }) => (
            <circle
              key={item.label}
              cx="60"
              cy="60"
              r="42"
              fill="none"
              pathLength={100}
              stroke={colors[item.label] ?? "#64748b"}
              strokeDasharray={`${percent} ${100 - percent}`}
              strokeDashoffset={-offset}
              strokeWidth="22"
              className="cursor-pointer transition-opacity hover:opacity-80"
              onMouseEnter={() => setHoveredRisk(item)}
              onMouseLeave={() => setHoveredRisk(null)}
            />
          ))}
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-center text-xl font-bold text-bank-navy">
            {total}
            <br />
            <span className="text-xs text-bank-muted">Total</span>
          </span>
        </div>
        {hoveredRisk ? (
          <div className="absolute left-full top-1/2 z-10 ml-3 min-w-36 -translate-y-1/2 rounded-lg border border-bank-line bg-white px-3 py-2 text-sm shadow-panel">
            <p className="font-bold text-bank-navy">{hoveredRisk.label}</p>
            <p className="mt-1 text-bank-muted">{hoveredRisk.value} cases</p>
          </div>
        ) : null}
      </div>
      <ul className="space-y-3 text-sm">
        {items.map((item) => (
          <li key={item.label} onMouseEnter={() => setHoveredRisk(item)} onMouseLeave={() => setHoveredRisk(null)}>
            <Badge tone={toneFor(item.label)}>{item.label}</Badge> {item.value} cases
          </li>
        ))}
      </ul>
    </div>
  );
}

function activeIndexFromStatus(status: string) {
  const stages = ["New Submission", "Missing Documents", "Verification Required", "Credit Review", "Approved"];
  return Math.max(0, stages.indexOf(status));
}

export function BankOverviewPage() {
  const { data: portfolio, isLoading } = useApiResource<PortfolioData>("/api/bank/portfolio", emptyPortfolio);
  const [selectedAlert, setSelectedAlert] = useState<PortfolioData["alerts"][number] | null>(null);
  const totalRiskCases = portfolio.riskDistribution.reduce((sum, item) => sum + item.value, 0);
  const stageColors = ["bg-bank-navy", "bg-blue-700", "bg-teal-600", "bg-amber-500", "bg-orange-500", "bg-bank-red"];
  const alertDetails: Record<string, { description: string; signal: string; action: string; cases: Array<{ caseId: string; signal: string; status: string }> }> = {
    "Duplicate Financing Alert": {
      description: "Potential duplicate financing attempts detected across invoice, buyer, and shipment references.",
      signal: "Invoice reference and shipment route overlap with existing submitted cases.",
      action: "Compare invoice numbers, buyer payment records, and facility utilization before routing to credit review.",
      cases: [
        { caseId: "TF-2026-0001", signal: "Invoice amount mismatch", status: "Verification Required" },
        { caseId: "TF-2026-0005", signal: "Duplicate invoice reference", status: "Needs Review" },
        { caseId: "TF-2026-0008", signal: "Repeated buyer PO number", status: "Needs Review" }
      ]
    },
    "Missing Document Alert": {
      description: "Cases are waiting for mandatory trade documents before verification can continue.",
      signal: "Required commercial invoice, purchase order, bill of lading, or bank statement is missing.",
      action: "Request documents from SME client and pause downstream credit memo generation until files are received.",
      cases: [
        { caseId: "TF-2026-0002", signal: "Bill of lading missing", status: "Missing Documents" },
        { caseId: "TF-2026-0006", signal: "Bank statement missing", status: "Missing Documents" },
        { caseId: "TF-2026-0009", signal: "Payment record missing", status: "Client Action" }
      ]
    },
    "Counterparty Risk Alert": {
      description: "Counterparty or related-party profile requires additional KYB and relationship review.",
      signal: "Shared directors, watchlist proximity, or unusual transaction links were detected.",
      action: "Open Counterparty & KYB Graph, review beneficial ownership, and escalate suspicious relationships.",
      cases: [
        { caseId: "TF-2026-0003", signal: "Shared director with supplier", status: "KYB Review" },
        { caseId: "TF-2026-0004", signal: "Beneficial owner overlap", status: "Enhanced Due Diligence" },
        { caseId: "TF-2026-0007", signal: "Counterparty watchlist proximity", status: "Escalated" }
      ]
    },
    "Shipment Mismatch Alert": {
      description: "Shipment, logistics, or trade route information does not fully match submitted documents.",
      signal: "Bill of lading, invoice, and logistics timestamps show inconsistent shipment information.",
      action: "Verify shipment evidence through trade verification before approving any drawdown.",
      cases: [
        { caseId: "TF-2026-0001", signal: "Shipment date mismatch", status: "Verification Required" },
        { caseId: "TF-2026-0008", signal: "Route inconsistent with invoice", status: "Needs Review" }
      ]
    }
  };
  const selectedAlertDetail = selectedAlert ? alertDetails[selectedAlert.title] ?? alertDetails["Duplicate Financing Alert"] : null;

  return (
    <PageShell title="Portfolio Overview" subtitle="Executive dashboard for cross-border SME trade finance portfolio monitoring">
      <LoadingHint isLoading={isLoading} />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{portfolio.kpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}</section>
      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
        <Panel title="Application Pipeline">
          <div className="grid gap-2 md:grid-cols-6">
            {portfolio.pipeline.map((stage, index) => (
              <div
                key={stage.label}
                className={`${stageColors[index] ?? "bg-bank-blue"} relative min-h-24 p-4 text-white shadow-sm md:[clip-path:polygon(0_0,92%_0,100%_50%,92%_100%,0_100%,8%_50%)] md:first:[clip-path:polygon(0_0,92%_0,100%_50%,92%_100%,0_100%)]`}
              >
                <p className="text-xs font-semibold text-white/86">{stage.label}</p>
                <p className="text-2xl font-bold">{stage.value}</p>
                <p className="mt-3 text-xs text-white/75">{totalRiskCases ? Math.round((stage.value / totalRiskCases) * 100) : 0}% of portfolio</p>
              </div>
            ))}
          </div>
          <p className="mt-4 border-t border-bank-line pt-3 text-center text-sm font-semibold text-bank-muted">Conversion to decision: 19.9%</p>
        </Panel>
        <Panel title="Risk Distribution">
          <RiskDistributionDonut items={portfolio.riskDistribution} total={totalRiskCases} />
        </Panel>
      </section>
      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,0.8fr)_minmax(0,1.4fr)]">
        <Panel title="Sector Breakdown">
          {portfolio.sectorBreakdown.map((item) => <Bar key={item.label} label={`${item.label} ${item.percentage}%`} value={item.percentage} />)}
        </Panel>
        <Panel title="Region Breakdown">
          {portfolio.regionBreakdown.map((item) => <Bar key={item.label} label={`${item.label} ${item.percentage}%`} value={item.percentage} />)}
        </Panel>
        <Panel title="Recent Risk Signals">
          <DataTable columns={["Case", "Risk Type", "Severity", "Status"]} rows={portfolio.recentRiskSignals.map((signal) => [signal.caseId, signal.riskType, <Badge key="s" tone={toneFor(signal.severity)}>{signal.severity}</Badge>, <Badge key="o" tone="orange">{signal.status}</Badge>])} />
        </Panel>
      </section>
      <Panel title="Alert Summary">
        <div className="grid gap-4 md:grid-cols-4">
          {portfolio.alerts.map((alert) => (
            <button key={alert.title} type="button" className="rounded-lg border border-orange-200 bg-orange-50 p-4 text-left hover:border-orange-400 hover:bg-orange-100/70" onClick={() => setSelectedAlert(alert)}>
              <BellRing className="text-orange-600" />
              <p className="mt-3 text-sm font-bold text-bank-navy">{alert.title}</p>
              <p className="mt-1 text-2xl font-bold text-bank-navy">{alert.count}</p>
              <span className="mt-2 inline-flex text-sm font-bold text-blue-700">
                View details <ArrowRight size={14} className="inline" />
              </span>
            </button>
          ))}
        </div>
      </Panel>
      {selectedAlert && selectedAlertDetail ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 px-4 py-6">
          <div className="w-full max-w-xl rounded-lg border border-bank-line bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-bank-line px-5 py-4">
              <div>
                <h2 className="text-xl font-bold text-bank-navy">{selectedAlert.title}</h2>
                <p className="mt-1 text-sm text-bank-muted">Internal bank alert detail for portfolio monitoring.</p>
              </div>
              <button type="button" className="text-sm font-bold text-bank-red" onClick={() => setSelectedAlert(null)}>Close</button>
            </div>
            <div className="space-y-4 p-5">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-bank-line p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-bank-muted">Open Alerts</p>
                  <p className="mt-1 text-2xl font-bold text-bank-navy">{selectedAlert.count}</p>
                </div>
                <div className="rounded-lg border border-bank-line p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-bank-muted">Severity</p>
                  <p className="mt-2"><Badge tone={toneFor(selectedAlert.severity)}>{selectedAlert.severity}</Badge></p>
                </div>
                <div className="rounded-lg border border-bank-line p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-bank-muted">Queue</p>
                  <p className="mt-1 font-bold text-bank-navy">Officer Review</p>
                </div>
              </div>
              <div className="rounded-lg border border-bank-line bg-bank-bg p-4 text-sm leading-6 text-bank-navy">
                {selectedAlertDetail.description}
              </div>
              <Panel title="Detected Signal">
                <p className="text-sm leading-6 text-bank-navy">{selectedAlertDetail.signal}</p>
              </Panel>
              <Panel title="Related Cases">
                <DataTable
                  columns={["Case", "Signal", "Status"]}
                  rows={selectedAlertDetail.cases.map((signal) => [
                    signal.caseId,
                    signal.signal,
                    <Badge key="status" tone={toneFor(signal.status)}>{signal.status}</Badge>
                  ])}
                />
              </Panel>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 text-sm leading-6 text-bank-navy">
                <span className="font-bold text-orange-700">Recommended action:</span> {selectedAlertDetail.action}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </PageShell>
  );
}

export function BankCaseIntakePage() {
  const demoState = useDemoState();
  const { data, isLoading } = useApiResource<CasesResponse>("/api/bank/cases", emptyCases);
  const initialCaseId = typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("case") ?? "";
  const [filters, setFilters] = useState({ status: "", riskLevel: "", financingType: "", region: "", officer: "" });
  const [searchText, setSearchText] = useState(initialCaseId);
  const [selectedCaseId, setSelectedCaseId] = useState(initialCaseId);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [caseDetail, setCaseDetail] = useState<BankCaseSummary | null>(null);
  const [caseReviewStatus, setCaseReviewStatus] = useState("");
  const [reviewedCaseIds, setReviewedCaseIds] = useState<Record<string, boolean>>({});
  const [routedCaseIds, setRoutedCaseIds] = useState<Record<string, boolean>>({});
  const [caseExportStatus, setCaseExportStatus] = useState("");
  const [tableFilters, setTableFilters] = useState({ status: "", riskLevel: "", officer: "" });
  const cases = useMemo(
    () => data.cases.map((item) => ({ ...item, status: demoState.bankCaseStatuses[item.id] ?? item.status })),
    [data.cases, demoState.bankCaseStatuses]
  );
  const filteredCases = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();
    return cases.filter((item) => {
      const matchesSearch = !normalizedSearch || [item.id, item.companyName, item.financingType, item.status].some((value) => value.toLowerCase().includes(normalizedSearch));
      return (
        matchesSearch &&
        (!filters.status || item.status === filters.status) &&
        (!filters.riskLevel || item.riskLevel === filters.riskLevel) &&
        (!filters.financingType || item.financingType === filters.financingType) &&
        (!filters.region || item.region === filters.region) &&
        (!filters.officer || item.assignedOfficer === filters.officer) &&
        (!tableFilters.status || item.status === tableFilters.status) &&
        (!tableFilters.riskLevel || item.riskLevel === tableFilters.riskLevel) &&
        (!tableFilters.officer || item.assignedOfficer === tableFilters.officer)
      );
    });
  }, [cases, filters, searchText, tableFilters]);
  const selectedCase = cases.find((item) => item.id === selectedCaseId) ?? filteredCases[0] ?? cases[0];
  const intakeStats = [
    ["Total Cases", cases.length.toString(), "+12.6%", "red"],
    ["New Submission", cases.filter((item) => item.status === "New Submission").length.toString(), "+15.3%", "blue"],
    ["Missing Documents", cases.filter((item) => item.status === "Missing Documents").length.toString(), "+8.7%", "orange"],
    ["Verification Required", cases.filter((item) => item.status === "Verification Required").length.toString(), "+6.1%", "orange"],
    ["Ready for Credit Review", cases.filter((item) => item.status === "Credit Review").length.toString(), "+9.4%", "green"]
  ] as const;
  const setFilter = (key: keyof typeof filters, value: string) => setFilters((current) => ({ ...current, [key]: value }));
  const setTableFilter = (key: keyof typeof tableFilters, value: string) => setTableFilters((current) => ({ ...current, [key]: value }));
  const exportCases = () => {
    const now = nowParts();
    const exportId = `CASE-EXPORT-${now.time.replace(":", "")}`;
    updateDemoState((state) => ({
      ...state,
      bankAuditEntries: [
        {
          at: now.iso,
          actor: "Credit Officer",
          action: `Exported ${filteredCases.length} filtered case intake records (${exportId})`,
          status: "Completed"
        },
        ...state.bankAuditEntries
      ]
    }));
    setCaseExportStatus(`${exportId} generated at ${now.time}. ${filteredCases.length} filtered case records included.`);
  };
  const openCase = async (caseId: string) => {
    setSelectedCaseId(caseId);
    setIsDrawerOpen(true);
    const response = await fetch(`/api/bank/cases/${caseId}`).catch(() => undefined);
    const payload = await response?.json().catch(() => undefined);
    if (payload?.case) {
      setCaseDetail({
        id: payload.case.id,
        companyName: payload.case.companyName,
        applicantName: payload.case.applicantName,
        financingType: payload.case.financingType,
        requestedAmount: payload.case.requestedAmount,
        amount: payload.case.amount,
        currency: payload.case.currency,
        sector: payload.case.sector,
        region: payload.case.region,
        status: payload.case.status,
        riskLevel: payload.case.riskLevel,
        riskScore: payload.case.riskScore,
        assignedOfficer: payload.case.assignedOfficer,
        submittedAt: payload.case.submittedAt,
        updatedAt: payload.case.updatedAt
      });
    }
  };
  const regions = Array.from(new Set(cases.map((item) => item.region)));
  const officers = Array.from(new Set(cases.map((item) => item.assignedOfficer)));
  const markCaseReviewed = async () => {
    const activeCase = caseDetail ?? selectedCase;
    if (!activeCase) return;

    const reviewedAt = nowParts();
    await fetch(`/api/bank/cases/${activeCase.id}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        officer: "Credit Officer",
        nextStatus: activeCase.status,
        notes: "Case intake marked reviewed in right-side drawer"
      })
    }).catch(() => undefined);
    setReviewedCaseIds((current) => ({ ...current, [activeCase.id]: true }));
    updateDemoState((state) => ({
      ...state,
      bankAuditEntries: [
        {
          at: reviewedAt.iso,
          actor: "Credit Officer",
          action: `Marked ${activeCase.id} intake record as reviewed`,
          status: "Reviewed"
        },
        ...state.bankAuditEntries
      ]
    }));
    setCaseReviewStatus(`${activeCase.id} marked reviewed at ${reviewedAt.time}`);
  };
  const routeCaseToReview = async () => {
    const activeCase = caseDetail ?? selectedCase;
    if (!activeCase) return;

    const response = await fetch(`/api/bank/cases/${activeCase.id}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        officer: "Credit Officer",
        nextStatus: "Credit Review",
        notes: "Case intake reviewed from right-side drawer"
      })
    }).catch(() => undefined);
    const payload = await response?.json().catch(() => undefined) as { status?: string; message?: string } | undefined;
    const nextStatus = payload?.status ?? "Credit Review";
    setCaseDetail((current) => current ? { ...current, status: nextStatus } : current);
    setRoutedCaseIds((current) => ({ ...current, [activeCase.id]: true }));
    updateDemoState((state) => ({
      ...state,
      bankCaseStatuses: {
        ...state.bankCaseStatuses,
        [activeCase.id]: nextStatus
      },
      bankAuditEntries: [
        {
          at: nowParts().iso,
          actor: "Credit Officer",
          action: "Case intake reviewed and routed to credit review",
          status: nextStatus
        },
        ...state.bankAuditEntries
      ]
    }));
    setCaseReviewStatus(payload?.message ?? `${activeCase.id} routed to ${nextStatus}`);
  };

  return (
    <PageShell title="Case Intake" subtitle="Receive, review, assign, and route SME trade finance applications" caseMeta={selectedCase ? { id: selectedCase.id, companyName: selectedCase.companyName } : undefined}>
      <LoadingHint isLoading={isLoading} />
      <Panel title="Filters">
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          <input className="min-h-10 rounded-md border border-bank-line px-3 text-sm" placeholder="Search case, SME, type, status" value={searchText} onChange={(event) => setSearchText(event.target.value)} />
          <select className="min-h-10 rounded-md border border-bank-line px-3 text-sm" value={filters.status} onChange={(event) => setFilter("status", event.target.value)}>
            <option value="">Status: All</option>
            {data.filters.statuses.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
          <select className="min-h-10 rounded-md border border-bank-line px-3 text-sm" value={filters.riskLevel} onChange={(event) => setFilter("riskLevel", event.target.value)}>
            <option value="">Risk Level: All</option>
            {data.filters.riskLevels.map((risk) => <option key={risk} value={risk}>{risk}</option>)}
          </select>
          <select className="min-h-10 rounded-md border border-bank-line px-3 text-sm" value={filters.financingType} onChange={(event) => setFilter("financingType", event.target.value)}>
            <option value="">Financing Type: All</option>
            {data.filters.financingTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
          <select className="min-h-10 rounded-md border border-bank-line px-3 text-sm" value={filters.region} onChange={(event) => setFilter("region", event.target.value)}>
            <option value="">Region: All</option>
            {regions.map((region) => <option key={region} value={region}>{region}</option>)}
          </select>
          <select className="min-h-10 rounded-md border border-bank-line px-3 text-sm" value={filters.officer} onChange={(event) => setFilter("officer", event.target.value)}>
            <option value="">Officer: All</option>
            {officers.map((officer) => <option key={officer} value={officer}>{officer}</option>)}
          </select>
        </div>
      </Panel>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {intakeStats.map(([label, value, delta, tone]) => (
          <KpiCard key={label} label={label} value={value} detail="vs prior 30 days" delta={delta} tone={tone} />
        ))}
      </section>
      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(300px,360px)]">
        <Panel
          title={`${filteredCases.length} cases`}
          action={
            <div className="flex flex-wrap items-center gap-2">
              <select className="min-h-9 rounded-md border border-bank-line bg-white px-2 text-xs font-bold text-bank-navy outline-none focus:border-bank-red" value={tableFilters.status} onChange={(event) => setTableFilter("status", event.target.value)} aria-label="Filter table by status">
                <option value="">Status: All</option>
                {data.filters.statuses.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
              <select className="min-h-9 rounded-md border border-bank-line bg-white px-2 text-xs font-bold text-bank-navy outline-none focus:border-bank-red" value={tableFilters.riskLevel} onChange={(event) => setTableFilter("riskLevel", event.target.value)} aria-label="Filter table by risk">
                <option value="">Risk: All</option>
                {data.filters.riskLevels.map((risk) => <option key={risk} value={risk}>{risk}</option>)}
              </select>
              <select className="min-h-9 rounded-md border border-bank-line bg-white px-2 text-xs font-bold text-bank-navy outline-none focus:border-bank-red" value={tableFilters.officer} onChange={(event) => setTableFilter("officer", event.target.value)} aria-label="Filter table by officer">
                <option value="">Officer: All</option>
                {officers.map((officer) => <option key={officer} value={officer}>{officer}</option>)}
              </select>
              {caseExportStatus ? (
                <span className="inline-flex min-h-9 items-center justify-center gap-2 rounded-md border border-emerald-300 bg-emerald-50 px-3 text-xs font-bold text-emerald-700">
                  <CheckCircle2 size={15} />
                  Exported
                </span>
              ) : (
                <ActionButton tone="ghost" onClick={exportCases}><Download size={16} />Export</ActionButton>
              )}
            </div>
          }
        >
          <DataTable columns={["Case ID", "SME Name", "Financing Type", "Amount", "Status", "Risk", "Officer", "Action"]} rows={filteredCases.map((row) => [row.id, row.companyName, row.financingType, row.requestedAmount, <Badge key="st" tone={toneFor(row.status)}>{row.status}</Badge>, <Badge key="r" tone={toneFor(row.riskLevel)}>{row.riskLevel}</Badge>, row.assignedOfficer, <button key="a" className="font-bold text-blue-700" onClick={() => openCase(row.id)}>Review</button>])} />
          {caseExportStatus ? <p className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700">{caseExportStatus}</p> : null}
        </Panel>
        <div className="space-y-4">
          <Panel title={selectedCase?.id ?? "Case detail"} action={selectedCase ? <Badge tone={toneFor(selectedCase.status)}>{selectedCase.status}</Badge> : null}>
            {selectedCase ? (
              <dl className="space-y-3 text-sm">
                {[
                  ["SME Name", selectedCase.companyName],
                  ["Industry", selectedCase.sector],
                  ["Region", selectedCase.region],
                  ["Risk Score", `${selectedCase.riskScore}/100`],
                  ["Submission", selectedCase.submittedAt]
                ].map(([label, value]) => <div key={label} className="flex justify-between gap-3"><dt className="text-bank-muted">{label}</dt><dd className="text-right font-medium text-bank-navy">{value}</dd></div>)}
              </dl>
            ) : null}
          </Panel>
          <Panel title="Financing Request">
            {selectedCase ? (
              <dl className="space-y-3 text-sm">
                {[
                  ["Financing Type", selectedCase.financingType],
                  ["Requested Amount", selectedCase.requestedAmount],
                  ["Currency", selectedCase.currency],
                  ["Purpose", "Purchase of raw materials for exports"]
                ].map(([label, value]) => <div key={label} className="flex justify-between gap-3"><dt className="text-bank-muted">{label}</dt><dd className="text-right font-medium text-bank-navy">{value}</dd></div>)}
              </dl>
            ) : null}
          </Panel>
          <Panel title="Required Document Checklist">
            <ul className="space-y-2 text-sm">
              {["Invoice", "Purchase Order", "Bill of Lading", "Bank Statement", "Business Registration", "Trade Contract"].map((item, index) => (
                <li key={item} className="flex items-center justify-between gap-3">
                  <span className="font-medium text-bank-navy">{item}</span>
                  <Badge tone={index === 1 ? "red" : index === 2 || index === 5 ? "neutral" : "green"}>{index === 1 ? "Missing" : index === 2 || index === 5 ? "Pending" : "Completed"}</Badge>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Current Progress"><ProgressDots labels={["Intake", "Documents", "Verification", "Credit Review", "Decision"]} active={activeIndexFromStatus(selectedCase?.status ?? "")} /></Panel>
          <ActionButton onClick={() => selectedCase ? openCase(selectedCase.id) : undefined}>Open Case</ActionButton>
        </div>
      </section>
      {isDrawerOpen && selectedCase ? (
        <div className="fixed inset-0 z-50">
          <button type="button" className="absolute inset-0 bg-bank-navy/45" aria-label="Close case drawer" onClick={() => setIsDrawerOpen(false)} />
          <aside className="absolute bottom-0 right-0 top-0 w-full max-w-xl overflow-y-auto border-l border-bank-line bg-white p-5 shadow-panel">
            <div className="flex items-start justify-between gap-4 border-b border-bank-line pb-4">
              <div>
                <p className="text-sm font-bold text-bank-muted">Case Detail Drawer</p>
                <h2 className="mt-1 text-2xl font-bold text-bank-navy">{(caseDetail ?? selectedCase).id}</h2>
                <p className="mt-1 text-sm text-bank-muted">{(caseDetail ?? selectedCase).companyName}</p>
              </div>
              <button type="button" className="rounded-md border border-bank-line px-3 py-2 text-sm font-bold text-bank-navy" onClick={() => setIsDrawerOpen(false)}>Close</button>
            </div>
            <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
              {[
                ["Applicant", (caseDetail ?? selectedCase).applicantName],
                ["Financing Type", (caseDetail ?? selectedCase).financingType],
                ["Amount", (caseDetail ?? selectedCase).requestedAmount],
                ["Status", (caseDetail ?? selectedCase).status],
                ["Risk", `${(caseDetail ?? selectedCase).riskLevel} (${(caseDetail ?? selectedCase).riskScore}/100)`],
                ["Officer", (caseDetail ?? selectedCase).assignedOfficer],
                ["Region", (caseDetail ?? selectedCase).region],
                ["Sector", (caseDetail ?? selectedCase).sector]
              ].map(([label, value]) => (
                <div key={label} className="rounded-md bg-bank-bg p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-bank-muted">{label}</p>
                  <p className="mt-1 font-bold text-bank-navy">{value}</p>
                </div>
              ))}
            </div>
            <Panel title="Progress Tracker" className="mt-5"><ProgressDots labels={["Intake", "Documents", "Verification", "Credit Review", "Decision"]} active={activeIndexFromStatus((caseDetail ?? selectedCase).status)} /></Panel>
            <div className="mt-5 flex flex-wrap gap-3 rounded-lg border border-bank-line bg-bank-bg p-4">
              {reviewedCaseIds[(caseDetail ?? selectedCase).id] ? (
                <button type="button" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-emerald-300 bg-emerald-50 px-4 text-sm font-bold text-emerald-700 shadow-sm">
                  <CheckCircle2 size={17} />
                  Reviewed
                </button>
              ) : (
                <ActionButton onClick={markCaseReviewed}>Mark Reviewed</ActionButton>
              )}
              {routedCaseIds[(caseDetail ?? selectedCase).id] ? (
                <button type="button" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-emerald-300 bg-emerald-50 px-4 text-sm font-bold text-emerald-700 shadow-sm">
                  <CheckCircle2 size={17} />
                  Routed to Credit Review
                </button>
              ) : (
                <ActionButton tone="ghost" onClick={routeCaseToReview}>Route to Credit Review</ActionButton>
              )}
            </div>
            {caseReviewStatus ? <p className="mt-3 rounded-md bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700">{caseReviewStatus}</p> : null}
          </aside>
        </div>
      ) : null}
    </PageShell>
  );
}

export function BankDocumentReaderPage() {
  const demoState = useDemoState();
  const { data, isLoading } = useApiResource<DocumentsResponse>(`/api/bank/documents/${activeCaseId}`, emptyDocuments);
  const [confirmationStatus, setConfirmationStatus] = useState("");
  const [isExtractedDataConfirmed, setIsExtractedDataConfirmed] = useState(false);
  const correctionRows = [
    ...data.correctionLog.map((row) => [row.at, row.officer, row.correction]),
    ...demoState.bankDocumentConfirmations.map((row) => [row.at, row.actor, row.action])
  ];
  const confirmExtractedData = async () => {
    const now = nowParts();
    await fetch(`/api/bank/documents/${activeCaseId}/confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        officer: "Credit Officer",
        notes: "Confirmed extracted document fields and locked values for review"
      })
    }).catch(() => undefined);
    updateDemoState((state) => ({
      ...state,
      bankDocumentConfirmations: [
        {
          at: now.iso,
          actor: "Credit Officer",
          action: "Confirmed extracted document fields and locked values for review",
          status: "Completed"
        },
        ...state.bankDocumentConfirmations
      ]
    }));
    setIsExtractedDataConfirmed(true);
    setConfirmationStatus(`Extracted data confirmed at ${now.time}. Log entry added.`);
  };

  return (
    <PageShell title="AI Document Reader" subtitle="Extract and validate trade finance document fields with officer review" caseMeta={data.case}>
      <LoadingHint isLoading={isLoading} />
      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(280px,320px)_minmax(0,1fr)_minmax(300px,360px)]">
        <Panel title="Document List">
          <ul className="space-y-3">{data.documents.map((doc) => <li key={doc.id} className="rounded-lg border border-bank-line p-3"><p className="font-bold text-bank-navy">{doc.type}</p><p className="mt-1 text-xs text-bank-muted">{doc.fileName || "Not uploaded"}</p><div className="mt-2"><Badge tone={toneFor(doc.status)}>{doc.status}</Badge></div></li>)}</ul>
        </Panel>
        <Panel title="Document Preview">
          <div className="min-h-[420px] overflow-auto rounded-lg border border-bank-line bg-slate-100 p-4">
            <article className="mx-auto min-w-[520px] max-w-2xl rounded-md border border-slate-300 bg-white p-6 text-left text-sm text-bank-navy shadow-sm">
              <header className="flex items-start justify-between border-b border-bank-line pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-bank-muted">Commercial Invoice</p>
                  <h3 className="mt-2 text-xl font-bold text-bank-navy">Global Star Electronics Ltd.</h3>
                  <p className="mt-1 text-xs text-bank-muted">Unit 1802, Harbour Centre, Hong Kong</p>
                </div>
                <div className="rounded-md border-2 border-blue-300 bg-blue-50 px-3 py-2 text-right">
                  <p className="text-xs font-bold text-blue-700">Invoice No.</p>
                  <p className="font-bold">INV-2026-0613</p>
                </div>
              </header>
              <section className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-md border border-bank-line p-3">
                  <p className="text-xs font-bold uppercase text-bank-muted">Seller</p>
                  <p className="mt-1 font-bold">Global Star Electronics Ltd.</p>
                  <p className="text-xs text-bank-muted">Hong Kong SAR</p>
                </div>
                <div className="rounded-md border-2 border-blue-300 bg-blue-50 p-3">
                  <p className="text-xs font-bold uppercase text-blue-700">Buyer</p>
                  <p className="mt-1 font-bold">ABC Trading Co., Ltd.</p>
                  <p className="text-xs text-bank-muted">Shenzhen, Mainland China</p>
                </div>
                <div className="rounded-md border-2 border-red-200 bg-red-50 p-3">
                  <p className="text-xs font-bold uppercase text-bank-red">Invoice Date</p>
                  <p className="mt-1 font-bold">13 Jun 2026</p>
                </div>
                <div className="rounded-md border border-bank-line p-3">
                  <p className="text-xs font-bold uppercase text-bank-muted">Payment Terms</p>
                  <p className="mt-1 font-bold">60 days after shipment</p>
                </div>
              </section>
              <table className="mt-5 w-full border-collapse text-sm">
                <thead className="bg-bank-bg text-xs uppercase text-bank-muted">
                  <tr>
                    <th className="border border-bank-line px-3 py-2 text-left">Description</th>
                    <th className="border border-bank-line px-3 py-2 text-right">Qty</th>
                    <th className="border border-bank-line px-3 py-2 text-right">Unit Price</th>
                    <th className="border border-bank-line px-3 py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-bank-line px-3 py-2">Electronic control modules</td>
                    <td className="border border-bank-line px-3 py-2 text-right">2,000</td>
                    <td className="border border-bank-line px-3 py-2 text-right">HKD 425</td>
                    <td className="border border-bank-line px-3 py-2 text-right">HKD 850,000</td>
                  </tr>
                  <tr>
                    <td className="border border-bank-line px-3 py-2">Smart sensor assemblies</td>
                    <td className="border border-bank-line px-3 py-2 text-right">1,000</td>
                    <td className="border border-bank-line px-3 py-2 text-right">HKD 400</td>
                    <td className="border border-bank-line px-3 py-2 text-right">HKD 400,000</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-5 flex justify-end">
                <div className="w-64 rounded-md border-2 border-blue-300 bg-blue-50 p-3">
                  <p className="flex justify-between text-sm"><span>Total Amount</span><span className="font-bold">HKD 1,250,000</span></p>
                </div>
              </div>
              <footer className="mt-5 rounded-md border border-dashed border-orange-300 bg-orange-50 p-3 text-xs text-orange-800">
                Highlighted fields indicate AI-extracted values requiring officer review before confirmation.
              </footer>
            </article>
          </div>
        </Panel>
        <div className="space-y-5">
          <Panel title="Confidence Scores">{data.documents.map((doc) => <Bar key={doc.id} label={doc.type} value={doc.confidence} />)}</Panel>
          <Panel title="Warning Cards"><WarningList warnings={data.documents.flatMap((doc) => doc.warnings)} /></Panel>
        </div>
      </section>
      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
        <Panel
          title="Extracted Fields Table"
          action={
            isExtractedDataConfirmed ? (
              <span className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-emerald-300 bg-emerald-50 px-4 text-sm font-bold text-emerald-700">
                <CheckCircle2 size={17} />
                Data Confirmed
              </span>
            ) : (
              <ActionButton tone="green" onClick={confirmExtractedData}><CheckCircle2 size={17} />Confirm Extracted Data</ActionButton>
            )
          }
        >
          <DataTable columns={["Document", "Field", "Extracted Value", "Confidence"]} rows={data.extractedFields.map((row) => [row.documentType, row.field, row.value, <Badge key="c" tone={row.confidence > 85 ? "green" : "orange"}>{row.confidence}%</Badge>])} />
          {confirmationStatus ? <p className="mt-3 text-sm font-bold text-emerald-700">{confirmationStatus}</p> : null}
        </Panel>
        <Panel title="Human Correction Log"><DataTable columns={["Time", "Officer", "Correction"]} rows={correctionRows} /></Panel>
      </section>
    </PageShell>
  );
}

function WarningList({ warnings }: { warnings: string[] }) {
  const [selectedWarning, setSelectedWarning] = useState("");
  const visibleWarnings = warnings.length > 0 ? warnings : ["No blocking document warning from mock API"];
  const selectedAction = selectedWarning.includes("Bill of Lading")
    ? {
        title: "Shipment evidence review required",
        description: "Cross-check bill of lading vessel, shipment date, port of loading, and consignee against invoice and logistics records.",
        href: "/bank/trade-verification"
      }
    : selectedWarning.includes("Purchase Order")
      ? {
          title: "Purchase order review required",
          description: "Compare PO number, buyer name, goods description, quantity, and amount against the commercial invoice before confirming extraction.",
          href: "/bank/trade-verification"
        }
      : {
          title: "Officer review required",
          description: "Flag this document for officer review and verify matching evidence before confirmation.",
          href: "/bank/trade-verification"
        };

  return (
    <div className="space-y-3">
      <ul className="space-y-3">
        {visibleWarnings.map((item) => (
          <li key={item}>
            <button
              type="button"
              className={`flex w-full gap-3 rounded-md border p-3 text-left text-sm font-bold ${
                selectedWarning === item ? "border-bank-red bg-red-50 text-bank-red" : "border-orange-200 bg-orange-50 text-orange-800"
              }`}
              onClick={() => setSelectedWarning(item)}
            >
              <AlertTriangle size={17} className="shrink-0" />
              {item}
            </button>
          </li>
        ))}
      </ul>
      {selectedWarning ? (
        <div className="rounded-md border border-bank-line bg-white p-3 text-sm">
          <p className="font-bold text-bank-navy">{selectedAction.title}</p>
          <p className="mt-1 text-bank-muted">{selectedWarning}</p>
          <p className="mt-2 text-bank-navy">{selectedAction.description}</p>
          <Link href={selectedAction.href} className="mt-3 inline-flex min-h-9 items-center justify-center rounded-md bg-bank-red px-3 text-xs font-bold text-white">
            Open Trade Verification
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export function BankTradeVerificationPage() {
  const { data, isLoading } = useApiResource<RiskResponse>(`/api/bank/risk/${activeCaseId}`, emptyRisk);
  const [informationRequestStatus, setInformationRequestStatus] = useState("");
  const [matchResultFilter, setMatchResultFilter] = useState("All");
  const verification = data.verification;
  const requestMoreInformation = () => {
    const now = nowParts();
    updateDemoState((state) => ({
      ...state,
      bankAuditEntries: [
        {
          at: now.iso,
          actor: "Credit Officer",
          action: "Requested supplier justification and logistics route confirmation",
          status: "Missing Documents"
        },
        ...state.bankAuditEntries
      ]
    }));
    setInformationRequestStatus(`Information request sent at ${now.time}. Case routed back for client/supplier clarification.`);
  };
  const resultOptions = ["All", ...Array.from(new Set(verification.matchingMatrix.map((row) => row.result)))];
  const filteredMatchingRows = matchResultFilter === "All" ? verification.matchingMatrix : verification.matchingMatrix.filter((row) => row.result === matchResultFilter);

  return (
    <PageShell title="Trade Verification" subtitle="Cross-check trade documents, external data, and transaction evidence" caseMeta={data.case}>
      <LoadingHint isLoading={isLoading} />
      <section className="grid gap-5 lg:grid-cols-4">
        {[
          { label: "Document Match", value: `${verification.summary.documentMatch}%`, detail: "Invoice, PO, shipment and payment cross-check", icon: FileSearch, tone: "blue" },
          { label: "External Sources", value: `${verification.summary.externalSourcesConnected}/7`, detail: "Connected verification data feeds", icon: Network, tone: "green" },
          { label: "Evidence Items", value: `${verification.summary.evidenceItems}`, detail: "Linked evidence points for review", icon: BarChart3, tone: "orange" },
          { label: "Next Action", value: "Required", detail: "Supplier/logistics clarification needed", icon: AlertTriangle, tone: "red" }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Panel key={item.label}>
              <div className="flex min-h-24 items-center gap-4">
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${item.tone === "red" ? "bg-red-50 text-bank-red" : item.tone === "orange" ? "bg-orange-50 text-orange-700" : item.tone === "green" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}>
                  <Icon size={22} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-bank-muted">{item.label}</p>
                  <p className="mt-1 text-2xl font-bold leading-7 text-bank-navy">{item.value}</p>
                  <p className="mt-1 text-xs leading-5 text-bank-muted">{item.detail}</p>
                </div>
              </div>
            </Panel>
          );
        })}
      </section>
      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
        <Panel
          title="Document Matching Matrix"
          action={
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-bank-muted">{filteredMatchingRows.length} shown</span>
              <label className="flex items-center gap-2 text-xs font-bold text-bank-muted">
                Result
                <select
                  className="min-h-9 rounded-md border border-bank-line bg-white px-3 text-sm font-bold text-bank-navy outline-none focus:border-bank-red"
                  value={matchResultFilter}
                  onChange={(event) => setMatchResultFilter(event.target.value)}
                >
                  {resultOptions.map((result) => <option key={result} value={result}>{result}</option>)}
                </select>
              </label>
            </div>
          }
        >
          <DataTable columns={["Item", "Invoice", "PO", "Shipment", "Payment", "Result"]} rows={filteredMatchingRows.map((row) => [row.item, row.invoice, row.purchaseOrder, row.shipment, row.payment, <Badge key="b" tone={toneFor(row.result)}>{row.result}</Badge>])} />
        </Panel>
        <Panel title="External Data Connection Panel">
          <div className="space-y-3">
            {verification.externalConnections.map((row) => (
              <div key={row.source} className="flex min-h-12 items-center justify-between gap-3 rounded-md border border-bank-line bg-white px-3">
                <span className="min-w-0 text-sm font-bold text-bank-navy">{row.source}</span>
                <Badge tone={toneFor(row.status)}>{row.status}</Badge>
              </div>
            ))}
          </div>
          <p className="mt-3 rounded-md bg-bank-bg px-3 py-2 text-xs font-semibold leading-5 text-bank-muted">
            Status is shown beside each source so officers can review connection health without horizontal scrolling.
          </p>
        </Panel>
      </section>
      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(300px,360px)]">
        <Panel title="Evidence Panel"><DataTable columns={["Evidence", "Source", "Finding"]} rows={verification.evidence.map((row) => [row.evidence, row.source, row.finding])} /></Panel>
        <Panel title="Recommended Next Action">
          <p className="text-sm leading-6 text-bank-muted">{verification.summary.recommendedAction}</p>
          <div className="mt-4">
            {informationRequestStatus ? (
              <span className="inline-flex min-h-10 items-center justify-center rounded-md border border-emerald-300 bg-emerald-50 px-4 text-sm font-bold text-emerald-700">
                Request Sent
              </span>
            ) : (
              <ActionButton onClick={requestMoreInformation}>Request More Information</ActionButton>
            )}
          </div>
          {informationRequestStatus ? (
            <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm leading-6 text-emerald-800">
              <p className="font-bold">{informationRequestStatus}</p>
              <Link href="/bank/case-intake?case=TF-2026-0001" className="mt-2 inline-flex font-bold text-bank-navy">Open Case Intake</Link>
            </div>
          ) : null}
        </Panel>
      </section>
    </PageShell>
  );
}

export function BankKybGraphPage() {
  const { data, isLoading } = useApiResource<RiskResponse>(`/api/bank/risk/${activeCaseId}`, emptyRisk);
  const counterparties = data.risk.counterparties;

  return (
    <PageShell title="Counterparty & KYB Graph" subtitle="Inspect counterparties, ownership links, and suspicious relationships" caseMeta={data.case}>
      <LoadingHint isLoading={isLoading} />
      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,380px)]">
        <Panel title="Relationship Graph">
          <div className="space-y-3 md:hidden">
            <div className="rounded-lg border border-bank-red bg-red-50 p-3 text-sm font-bold text-bank-red">{data.case.companyName || "SME Applicant"}</div>
            {counterparties.slice(0, 4).map((item) => (
              <div key={item.name} className="rounded-lg border border-bank-line bg-white p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-bold text-bank-navy">{item.name}</p>
                  <Badge tone={toneFor(item.risk)}>{item.risk}</Badge>
                </div>
                <p className="mt-1 text-sm text-bank-muted">{item.role} | {item.highlight}</p>
              </div>
            ))}
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm font-bold text-bank-red">Suspicious shared director</div>
          </div>
          <div className="relative hidden min-h-[460px] overflow-hidden rounded-lg border border-bank-line bg-[radial-gradient(circle_at_center,#ffffff_0,#f8fafc_48%,#eef2f7_100%)] p-6 md:block">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 760 460" preserveAspectRatio="none" aria-hidden="true">
              <line x1="380" y1="230" x2="150" y2="92" stroke="#94a3b8" strokeWidth="2" />
              <line x1="380" y1="230" x2="610" y2="98" stroke="#94a3b8" strokeWidth="2" />
              <line x1="380" y1="230" x2="170" y2="365" stroke="#94a3b8" strokeWidth="2" />
              <line x1="380" y1="230" x2="610" y2="365" stroke="#94a3b8" strokeWidth="2" />
              <line x1="150" y1="92" x2="610" y2="98" stroke="#dc2626" strokeDasharray="8 8" strokeWidth="3" />
            </svg>
            <div className="absolute left-1/2 top-1/2 w-60 -translate-x-1/2 -translate-y-1/2 rounded-xl border-2 border-bank-red bg-white p-4 text-center shadow-lg">
              <p className="text-xs font-bold uppercase tracking-wide text-bank-red">SME Applicant</p>
              <p className="mt-1 font-bold text-bank-navy">{data.case.companyName || "SME Applicant"}</p>
              <Badge tone="orange">Medium High Risk</Badge>
            </div>
            {counterparties.slice(0, 4).map((item, index) => (
              <div
                key={item.name}
                className="absolute w-52 rounded-xl border border-bank-line bg-white p-3 shadow-md"
                style={index === 0 ? { left: "5%", top: "10%" } : index === 1 ? { right: "5%", top: "10%" } : index === 2 ? { left: "7%", bottom: "10%" } : { right: "6%", bottom: "10%" }}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-bold leading-5 text-bank-navy">{item.name}</p>
                  <Badge tone={toneFor(item.risk)}>{item.risk}</Badge>
                </div>
                <p className="mt-2 text-xs font-semibold text-bank-muted">{item.role} | {item.region}</p>
                <p className="mt-2 text-xs leading-5 text-bank-muted">{item.highlight}</p>
              </div>
            ))}
            <div className="absolute left-1/2 top-[18%] -translate-x-1/2 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-bank-red shadow-sm">Suspicious shared director link</div>
          </div>
        </Panel>
        <Panel title="Counterparty Risk Panel">
          <div className="group relative overflow-hidden rounded-xl border border-orange-200 bg-gradient-to-br from-red-50 via-white to-orange-50 p-5 text-center shadow-sm">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-bank-red shadow-sm ring-1 ring-red-100">
              <Network size={25} />
            </div>
            <p className="mt-4 text-6xl font-bold leading-none text-bank-red">{data.risk.score}</p>
            <p className="mt-2 text-sm font-semibold text-bank-muted">Counterparty risk score</p>
            <div className="mt-2"><Badge tone={toneFor(data.risk.level)}>{data.risk.level}</Badge></div>
            <div className="pointer-events-none absolute inset-x-4 bottom-4 translate-y-3 rounded-lg border border-bank-line bg-white p-3 text-left text-xs leading-5 text-bank-navy opacity-0 shadow-panel transition group-hover:translate-y-0 group-hover:opacity-100">
              <p className="font-bold text-bank-red">Score explanation</p>
              <p className="mt-1">78 indicates medium-high KYB exposure driven by shared director signals, indirect shipment route and open counterparty links.</p>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {[
              ["Open ownership links", "2 links", 62],
              ["Verified partner coverage", "Partial", 54],
              ["Indirect route exposure", "Elevated", 78]
            ].map(([label, value, width]) => (
              <div key={label as string} className="rounded-lg border border-bank-line bg-white p-3">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-bold text-bank-navy">{label}</span>
                  <span className="font-semibold text-bank-muted">{value}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-bank-bg">
                  <div className="h-2 rounded-full bg-bank-red" style={{ width: `${width}%` }} />
                </div>
              </div>
            ))}
          </div>
          <ul className="mt-5 space-y-3 text-sm text-bank-muted">{counterparties.slice(0, 3).map((item) => <li key={item.name} className="rounded-md bg-bank-bg px-3 py-2">{item.highlight}</li>)}</ul>
        </Panel>
      </section>
      <Panel title="Counterparty Table"><DataTable columns={["Name", "Role", "Region", "Risk", "Highlight"]} rows={counterparties.map((row) => [row.name, row.role, row.region, <Badge key="risk" tone={toneFor(row.risk)}>{row.risk}</Badge>, row.highlight])} /></Panel>
    </PageShell>
  );
}

export function BankRiskDashboardPage() {
  const demoState = useDemoState();
  const { data, isLoading } = useApiResource<RiskResponse>(`/api/bank/risk/${activeCaseId}`, emptyRisk);
  const risk = data.risk;
  const riskActionStatus = demoState.actionStatuses[`risk:${activeCaseId}`];
  const confirmRiskAction = async (action: string) => {
    const response = await fetch(`/api/bank/risk/${activeCaseId}/action`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, officer: "Credit Officer" })
    }).catch(() => undefined);
    const payload = await response?.json().catch(() => undefined) as { status?: string; message?: string; at?: string } | undefined;
    const nextStatus = payload?.status ?? "Recorded";
    updateDemoState((state) => ({
      ...state,
      bankCaseStatuses: {
        ...state.bankCaseStatuses,
        [activeCaseId]: nextStatus
      },
      actionStatuses: {
        ...state.actionStatuses,
        [`risk:${activeCaseId}`]: payload?.message ?? `${action} recorded at ${nowParts().time}`
      },
      bankAuditEntries: [
        {
          at: payload?.at ?? nowParts().iso,
          actor: "Credit Officer",
          action: `Risk dashboard action: ${action}`,
          status: nextStatus
        },
        ...state.bankAuditEntries
      ]
    }));
  };

  return (
    <PageShell title="Risk & Fraud Dashboard" subtitle="Identify SME trade finance risks, fraud red flags, and compliance concerns for informed credit decisions." caseMeta={data.case}>
      <LoadingHint isLoading={isLoading} />
      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.4fr)]">
        <Panel title="Overall Risk Score"><div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6"><div className="grid h-36 w-36 shrink-0 place-items-center rounded-full border-[16px] border-orange-400 border-r-slate-200 sm:h-40 sm:w-40 sm:border-[18px]"><p className="text-center text-4xl font-bold text-bank-red sm:text-5xl">{risk.score}<br /><span className="text-base text-bank-navy">/100</span></p></div><div><Badge tone={toneFor(risk.level)}>{risk.level}</Badge><p className="mt-4 text-sm text-bank-muted">Human officer review is required before final decision.</p></div></div></Panel>
        <Panel title="Triggered Rules">
          <div className="divide-y divide-bank-line">
            {[
              ["Triggered Rules", `${risk.redFlags.length}`],
              ["High Severity Flags", `${risk.redFlags.filter((item) => item.severity === "High").length}`],
              ["Total Evidence Items", `${risk.evidence.length}`],
              ["Case Review Progress", "60%"]
            ].map(([label, value], index) => (
              <div key={label} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <span className="text-sm font-semibold text-bank-navy">{label}</span>
                {index === 3 ? (
                  <span className="flex min-w-28 items-center gap-3">
                    <span className="h-2 flex-1 rounded-full bg-bank-bg"><span className="block h-2 w-3/5 rounded-full bg-bank-red" /></span>
                    <span className="text-sm font-bold">{value}</span>
                  </span>
                ) : (
                  <span className="text-2xl font-bold text-bank-navy">{value}</span>
                )}
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Risk Breakdown"><div className="grid gap-3 sm:grid-cols-2">{risk.breakdown.map((item) => <div key={item.category} className="rounded-lg border border-bank-line p-3"><p className="text-sm font-bold text-bank-navy">{item.category}</p><p className="mt-2 text-2xl font-bold text-bank-red">{item.score}<span className="text-sm text-bank-muted">/100</span></p><Badge tone={toneFor(item.level)}>{item.level}</Badge></div>)}</div></Panel>
      </section>
      <section className="grid min-w-0 gap-5 xl:grid-cols-3">
        <Panel title="Fraud Red Flags"><DataTable columns={["Flag", "Description", "Severity"]} rows={risk.redFlags.map((row) => [row.title, row.description, <Badge key="s" tone={toneFor(row.severity)}>{row.severity}</Badge>])} /></Panel>
        <Panel title="Compliance Screening"><DataTable columns={["Check Item", "Result", "Status"]} rows={risk.complianceChecks.map((row) => [row.item, row.result, <Badge key="s" tone={toneFor(row.status)}>{row.status}</Badge>])} /></Panel>
        <Panel title="AI Explanation" action={<Badge tone="blue">Explainable AI</Badge>}><div className="rounded-lg border border-blue-200 bg-blue-50 p-4"><Sparkles className="text-blue-700" /><p className="mt-3 text-sm leading-6 text-bank-navy">{risk.aiExplanation}</p></div><p className="mt-4 rounded-md bg-bank-bg px-3 py-2 text-xs font-semibold text-bank-muted">Final decision rests with the officer. This is internal bank information only.</p></Panel>
      </section>
      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(280px,320px)]">
        <Panel title="Evidence Table"><DataTable columns={["Risk Flag", "Evidence", "Severity", "Source", "Suggested Action"]} rows={risk.evidence.map((row) => [row.riskFlag, row.evidence, <Badge key="s" tone={toneFor(row.severity)}>{row.severity}</Badge>, row.source, row.suggestedAction])} /></Panel>
        <Panel title="Decision Actions">
          <div className="grid gap-3">
            <ActionButton tone="green" onClick={() => confirmRiskAction("Approve")}><CheckCircle2 size={17} />Approve</ActionButton>
            <ActionButton tone="orange" onClick={() => confirmRiskAction("Conditional Approve")}>Conditional Approve</ActionButton>
            <ActionButton onClick={() => confirmRiskAction("Request More Info")}>Request More Info</ActionButton>
            <ActionButton tone="purple" onClick={() => confirmRiskAction("Escalate")}>Escalate</ActionButton>
            <ActionButton tone="ghost" onClick={() => confirmRiskAction("Reject")}>Reject</ActionButton>
          </div>
          {riskActionStatus ? <p className="mt-4 rounded-md bg-emerald-50 px-3 py-2 text-center text-xs font-bold text-emerald-700">{riskActionStatus}</p> : <p className="mt-4 text-center text-xs font-semibold text-bank-muted">All actions will be logged in the audit trail.</p>}
        </Panel>
      </section>
    </PageShell>
  );
}

export function BankCreditMemoPage() {
  const demoState = useDemoState();
  const { data, isLoading } = useApiResource<MemoResponse>(`/api/bank/credit-memo/${activeCaseId}`, emptyMemo);
  const [isEditing, setIsEditing] = useState(false);
  const [memoDrafts, setMemoDrafts] = useState<Record<string, string>>({});
  const [memoNotice, setMemoNotice] = useState("");
  const [activeMemoSection, setActiveMemoSection] = useState("Executive Summary");

  const effectiveMemoStatus = demoState.memo.status ?? data.memo.status;
  const visibleSections = data.memo.sections.map((section) => ({
    ...section,
    body: memoDrafts[section.title] ?? demoState.memo.sections?.[section.title] ?? section.body
  }));
  const navItems = visibleSections.length > 0 ? visibleSections.map((section) => section.title) : ["Executive Summary", "Borrower Profile", "Trade Background", "Risk Assessment", "Recommendation", "Conditions"];
  const selectedMemoSection = visibleSections.find((section) => section.title === activeMemoSection) ?? visibleSections[0];
  const selectedMemoIndex = Math.max(0, visibleSections.findIndex((section) => section.title === selectedMemoSection?.title));
  const persistMemoSections = (sections: CreditMemo["sections"], notice: string) => {
    updateDemoState((state) => ({
      ...state,
      memo: {
        ...state.memo,
        sections: sections.reduce<Record<string, string>>((map, section) => {
          map[section.title] = section.body;
          return map;
        }, {})
      }
    }));
    setMemoNotice(notice);
  };
  const regenerateSection = async () => {
    const sectionTitle = selectedMemoSection?.title ?? visibleSections[0]?.title ?? "Executive Summary";
    const response = await fetch(`/api/bank/credit-memo/${activeCaseId}/regenerate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sectionTitle })
    }).catch(() => undefined);
    const payload = await response?.json().catch(() => undefined) as { memo?: { sections?: CreditMemo["sections"] } } | undefined;
    const nextSections: CreditMemo["sections"] = payload?.memo?.sections ?? visibleSections.map((section) => section.title === sectionTitle ? {
      ...section,
      body: `${section.body} Mock regenerated paragraph added at ${nowParts().time}: latest document confidence and trade verification evidence have been re-summarized for officer review.`
    } : section);
    setMemoDrafts(nextSections.reduce<Record<string, string>>((map, section) => {
      map[section.title] = section.body;
      return map;
    }, {}));
    persistMemoSections(nextSections, `${sectionTitle} regenerated with mock AI text.`);
  };
  const exportMemo = async () => {
    const response = await fetch(`/api/bank/credit-memo/${activeCaseId}/export`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ officer: "Credit Officer" })
    }).catch(() => undefined);
    const payload = await response?.json().catch(() => undefined) as { id?: string; message?: string } | undefined;
    setMemoNotice(payload?.message ?? "Mock PDF export generated successfully.");
  };
  const submitMemo = async () => {
    const response = await fetch(`/api/bank/credit-memo/${activeCaseId}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ officer: "Credit Officer" })
    }).catch(() => undefined);
    const payload = await response?.json().catch(() => undefined) as { status?: string; message?: string; at?: string } | undefined;
    updateDemoState((state) => ({
      ...state,
      memo: { ...state.memo, status: "Submitted" },
      bankAuditEntries: [
        {
          at: payload?.at ?? nowParts().iso,
          actor: "Credit Officer",
          action: "Submitted AI credit memo for approval",
          status: "Completed"
        },
        ...state.bankAuditEntries
      ]
    }));
    setMemoNotice(payload?.message ?? "Memo submitted for approval.");
  };

  return (
    <PageShell title="AI Credit Memo" subtitle="Review AI-generated credit memo content with linked evidence before submission" caseMeta={data.case}>
      <LoadingHint isLoading={isLoading} />
      <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 text-sm font-bold text-orange-800"><AlertTriangle className="mr-2 inline" size={18} />{data.memo.warning || "AI-generated memo requires human review."}</div>
      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(220px,260px)_minmax(0,1fr)_minmax(300px,360px)]">
        <Panel title="Memo Sections">
          <nav className="space-y-1">
            {navItems.map((item, index) => {
              const isActive = selectedMemoSection?.title === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setActiveMemoSection(item);
                    setIsEditing(false);
                    setMemoNotice(`${item} section opened.`);
                  }}
                  className={`flex min-h-11 w-full items-center justify-between rounded-md border-l-4 px-3 py-2 text-left text-sm font-bold transition ${isActive ? "border-bank-red bg-red-50 text-bank-navy shadow-sm" : "border-transparent text-bank-navy hover:bg-bank-bg"}`}
                >
                  <span>{item}</span>
                  <Badge tone={index < 5 ? "green" : "orange"}>{index < 5 ? "Done" : "Review"}</Badge>
                </button>
              );
            })}
          </nav>
        </Panel>
        <Panel title="Generated Credit Memo" action={<Badge tone={effectiveMemoStatus === "Submitted" ? "green" : "blue"}>{effectiveMemoStatus}</Badge>}>
          <div className="mb-4 grid gap-3 border-b border-bank-line pb-4 text-sm sm:grid-cols-2 xl:grid-cols-4">
            {[["Case ID", data.case.id], ["Applicant", data.case.companyName], ["Requested Amount", data.case.requestedAmount], ["Generated By", "AI Credit Co-pilot"]].map(([label, value]) => (
              <div key={label}><p className="text-xs font-bold uppercase tracking-wide text-bank-muted">{label}</p><p className="mt-1 font-semibold text-bank-navy">{value}</p></div>
            ))}
          </div>
          <article className="max-w-none overflow-hidden break-words rounded-lg border border-bank-line bg-white text-sm leading-7 text-bank-navy">
            {selectedMemoSection ? (
              <section className="p-4">
                <div className="mb-3 flex flex-wrap items-start justify-between gap-3 border-b border-bank-line pb-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-bank-muted">Selected Memo Section</p>
                    <h3 className="mt-1 text-base font-bold text-bank-blue">{selectedMemoIndex + 1}. {selectedMemoSection.title}</h3>
                  </div>
                  <Badge tone={selectedMemoIndex < 5 ? "green" : "orange"}>{selectedMemoIndex < 5 ? "Done" : "Review"}</Badge>
                </div>
                {isEditing ? (
                  <textarea
                    className="min-h-52 w-full rounded-md border border-bank-line p-3 text-sm leading-6 outline-none focus:border-bank-red"
                    value={selectedMemoSection.body}
                    onChange={(event) => setMemoDrafts((current) => ({ ...current, [selectedMemoSection.title]: event.target.value }))}
                  />
                ) : (
                  <p>{selectedMemoSection.body}</p>
                )}
              </section>
            ) : (
              <p className="p-4 text-bank-muted">Select a memo section to review its generated content.</p>
            )}
          </article>
          <div className="mt-4 rounded-md border border-orange-200 bg-orange-50 p-3 text-sm text-bank-navy"><span className="font-bold">AI Recommendation:</span> {data.memo.recommendation}</div>
          {memoNotice ? <p className="mt-3 text-sm font-bold text-emerald-700">{memoNotice}</p> : null}
        </Panel>
        <Panel title="Supporting Evidence">
          <div className="space-y-4">
            <section>
              <h3 className="mb-2 text-sm font-bold text-bank-navy">Extracted Document Fields</h3>
              <ul className="divide-y divide-bank-line rounded-lg border border-bank-line">
                {data.memo.supportingEvidence.map((row) => (
                  <li key={row.evidence} className="flex items-start justify-between gap-3 px-3 py-3">
                    <span className="text-sm font-medium leading-5 text-bank-navy">{row.evidence}</span>
                    <Badge tone={toneFor(row.severity)}>{row.severity}</Badge>
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-lg border border-bank-line p-3">
              <div className="flex items-center justify-between gap-3"><h3 className="text-sm font-bold text-bank-navy">Verification Result</h3><Badge tone="orange">Partially Matched</Badge></div>
              <Bar label="Confidence Score" value={82} />
            </section>
            <section className="rounded-lg border border-bank-line p-3">
              <h3 className="text-sm font-bold text-bank-navy">Fraud Red Flags</h3>
              <ul className="mt-2 space-y-2 text-sm text-bank-muted">
                <li>Invoice amount mismatch</li>
                <li>Unusual shipment route</li>
                <li>Possible duplicate financing attempt</li>
              </ul>
            </section>
          </div>
        </Panel>
      </section>
      <div className="flex flex-wrap gap-3 rounded-lg border border-bank-line bg-white p-4">
        <ActionButton tone="ghost" onClick={() => {
          if (isEditing) {
            persistMemoSections(visibleSections, "Memo edits saved locally for this demo.");
            setMemoDrafts({});
          }
          setIsEditing((current) => !current);
        }}><Edit3 size={16} />{isEditing ? "Save Memo" : "Edit Memo"}</ActionButton>
        <ActionButton tone="ghost" onClick={regenerateSection}><RefreshCw size={16} />Regenerate Section</ActionButton>
        <ActionButton tone="ghost" onClick={exportMemo}><Download size={16} />Export PDF</ActionButton>
        <ActionButton onClick={submitMemo}><Send size={16} />Submit for Approval</ActionButton>
      </div>
    </PageShell>
  );
}

export function BankApprovalAuditPage() {
  const demoState = useDemoState();
  const { data, isLoading } = useApiResource<AuditResponse>(`/api/bank/audit/${activeCaseId}`, emptyAudit);
  const [selectedDecision, setSelectedDecision] = useState("Conditional Approve");
  const [decisionRationale, setDecisionRationale] = useState("");
  const [decisionError, setDecisionError] = useState("");
  const [exportStatus, setExportStatus] = useState("");
  const effectiveCaseStatus = demoState.bankCaseStatuses[activeCaseId];
  const activeStage = useMemo(() => effectiveCaseStatus === "Approved" || effectiveCaseStatus === "Rejected" || effectiveCaseStatus === "Missing Documents" ? 4 : Math.max(0, data.workflow.stages.findIndex((stage) => stage.status === "Current")), [data.workflow.stages, effectiveCaseStatus]);
  const auditRows = [...demoState.bankAuditEntries, ...data.auditLogs];
  const decisionToStatus: Record<string, string> = {
    Approve: "Approved",
    "Conditional Approve": "Approved",
    "Request More Information": "Missing Documents",
    Reject: "Rejected"
  };
  const recordDecision = async (decision = selectedDecision) => {
    if (!decisionRationale.trim()) {
      setDecisionError("Decision rationale is required before recording a final decision.");
      return;
    }

    const nextStatus = decisionToStatus[decision] ?? "Credit Review";
    await fetch(`/api/bank/approval/${activeCaseId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision, rationale: decisionRationale, officer: "Credit Officer" })
    }).catch(() => undefined);

    updateDemoState((state) => ({
      ...state,
      bankCaseStatuses: {
        ...state.bankCaseStatuses,
        [activeCaseId]: nextStatus
      },
      bankAuditEntries: [
        {
          at: nowParts().iso,
          actor: "Credit Officer",
          action: `Recorded decision: ${decision}. Rationale: ${decisionRationale}`,
          status: nextStatus
        },
        ...state.bankAuditEntries
      ]
    }));
    setDecisionError(`Decision recorded. Case status updated to ${nextStatus}.`);
  };
  const exportAuditReport = () => {
    const now = nowParts();
    const reportId = `AUD-${activeCaseId}-${now.time.replace(":", "")}`;
    updateDemoState((state) => ({
      ...state,
      bankAuditEntries: [
        {
          at: now.iso,
          actor: "Credit Officer",
          action: `Exported audit report ${reportId}`,
          status: "Completed"
        },
        ...state.bankAuditEntries
      ]
    }));
    setExportStatus(`${reportId} generated at ${now.time}. Audit timeline, evidence hashes and officer actions included.`);
  };

  return (
    <PageShell title="Approval & Audit Trail" subtitle="All approval actions are logged. Final decision must be made by authorized BOCHK staff." caseMeta={data.case}>
      <LoadingHint isLoading={isLoading} />
      <div className="rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-bold text-orange-800"><AlertTriangle className="mr-2 inline" size={17} />All approval actions are logged. Final decision must be made by authorized BOCHK staff.</div>
      <Panel title="Approval Workflow"><ProgressDots labels={data.workflow.stages.map((stage) => stage.label)} active={activeStage} /></Panel>
      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(300px,360px)]">
        <Panel title="Human Decision">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{data.workflow.decisionOptions.map((item) => (
            <button
              key={item}
              className={`min-h-20 rounded-md border p-3 text-sm font-bold ${selectedDecision === item ? "border-orange-300 bg-orange-50 text-orange-700 ring-1 ring-orange-200" : "border-bank-line bg-white text-bank-navy"}`}
              onClick={() => setSelectedDecision(item)}
            >
              {item}
            </button>
          ))}</div>
          <label className="mt-5 block">
            <span className="text-sm font-bold text-bank-navy">Decision Rationale</span>
            <textarea className="mt-2 min-h-28 w-full rounded-md border border-bank-line p-3 text-sm" placeholder="Enter human approval reason" value={decisionRationale} onChange={(event) => setDecisionRationale(event.target.value)} />
          </label>
          <div className="mt-4 flex flex-wrap gap-3">
            {data.workflow.decisionOptions.map((item) => <ActionButton key={item} tone={item === "Reject" ? "ghost" : item === "Request More Information" ? "orange" : "primary"} onClick={() => recordDecision(item)}>{item}</ActionButton>)}
          </div>
          {decisionError ? <p className={`mt-3 text-sm font-bold ${decisionError.startsWith("Decision recorded") ? "text-emerald-700" : "text-bank-red"}`}>{decisionError}</p> : null}
        </Panel>
        <Panel title="Case Summary"><DataTable columns={["Item", "Value"]} rows={[["Case ID", data.case.id], ["SME Applicant", data.case.companyName], ["Risk Level", <Badge key="r" tone={toneFor(data.case.riskLevel)}>{data.case.riskLevel}</Badge>], ["Workflow Stage", <Badge key="m" tone="green">{effectiveCaseStatus ? "Decision Recorded" : data.workflow.currentStage || "Loading"}</Badge>], ["Current Case Status", <Badge key="s" tone={toneFor(effectiveCaseStatus ?? "Credit Review")}>{effectiveCaseStatus ?? "Credit Review"}</Badge>]]} /></Panel>
      </section>
      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)_minmax(300px,360px)]">
        <Panel title="Audit Timeline"><DataTable columns={["Time", "Actor", "Action", "Status"]} rows={auditRows.map((row) => [row.at, row.actor, row.action, <Badge key="s" tone={toneFor(row.status)}>{row.status}</Badge>])} /></Panel>
        <Panel title="Evidence Hash Panel"><DataTable columns={["Hash Item", "Value"]} rows={data.evidenceHashes.map((row) => [row.item, row.value])} /></Panel>
        <Panel title="Export Audit Report">
          <p className="text-sm leading-6 text-bank-muted">Generate a comprehensive audit trail report for compliance review and record keeping.</p>
          <div className="mt-5">
            {exportStatus ? (
              <span className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-emerald-300 bg-emerald-50 px-4 text-sm font-bold text-emerald-700">
                <CheckCircle2 size={16} />
                Report Exported
              </span>
            ) : (
              <ActionButton onClick={exportAuditReport}><Download size={16} />Export Audit Report</ActionButton>
            )}
          </div>
          {exportStatus ? <p className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold leading-5 text-emerald-700">{exportStatus}</p> : null}
          <ul className="mt-4 space-y-2 text-sm text-bank-muted"><li>Case summary and decision</li><li>Audit timeline</li><li>Evidence hashes</li><li>Officer actions</li></ul>
        </Panel>
      </section>
    </PageShell>
  );
}

export function BankPostLoanMonitoringPage() {
  const demoState = useDemoState();
  const { data, isLoading } = useApiResource<MonitoringData>("/api/bank/monitoring", emptyMonitoring);
  const [selectedMonitoringAction, setSelectedMonitoringAction] = useState("");
  const [facilityStatusFilter, setFacilityStatusFilter] = useState("All");
  const [facilityRiskFilter, setFacilityRiskFilter] = useState("All");
  const monitoringKpiIcons = [BarChart3, TrendingUp, Clock3, ShieldAlert, BellRing];
  const monitoringKpiDetails = [
    "Active loan facilities",
    "Current drawn exposure",
    "Due in next cycle",
    "Open early alerts",
    "Cases under watch"
  ];
  const monitoringActionDetails: Record<string, string> = {
    "Contact Relationship Manager": "RM contact task created for Global Star Electronics Ltd.",
    "Request updated bank statement": "Updated bank statement request queued for SME client.",
    "Move high-risk cases to watchlist": "High-risk active facilities moved to watchlist queue."
  };
  const monitoringActionLinks: Record<string, { label: string; href: string }> = {
    "Contact Relationship Manager": { label: "Open Case Intake", href: "/bank/case-intake?case=TF-2026-0001" },
    "Request updated bank statement": { label: "Open Document Reader", href: "/bank/document-reader" },
    "Move high-risk cases to watchlist": { label: "Open Risk Dashboard", href: "/bank/risk-dashboard" }
  };
  const markMonitoringAction = async (action: string) => {
    const response = await fetch("/api/bank/monitoring/actions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, officer: "Credit Officer" })
    }).catch(() => undefined);
    const payload = await response?.json().catch(() => undefined) as { message?: string; at?: string } | undefined;
    updateDemoState((state) => ({
      ...state,
      actionStatuses: {
        ...state.actionStatuses,
        [`monitoring:${action}`]: monitoringActionDetails[action] ?? payload?.message ?? `Action queued at ${nowParts().time}`
      },
      bankAuditEntries: [
        {
          at: payload?.at ?? nowParts().iso,
          actor: "Credit Officer",
          action: `Post-loan monitoring action queued: ${action}`,
          status: "Queued"
        },
        ...state.bankAuditEntries
      ]
    }));
    setSelectedMonitoringAction(action);
  };
  const statusOptions = ["All", ...Array.from(new Set(data.facilities.map((facility) => facility.status)))];
  const riskOptions = ["All", ...Array.from(new Set(data.facilities.map((facility) => facility.risk)))];
  const filteredFacilities = data.facilities.filter((facility) => (
    (facilityStatusFilter === "All" || facility.status === facilityStatusFilter) &&
    (facilityRiskFilter === "All" || facility.risk === facilityRiskFilter)
  ));

  return (
    <PageShell title="Post-loan Monitoring" subtitle="Monitor active facilities, repayment signals, cash flow and early warning indicators">
      <LoadingHint isLoading={isLoading} />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{data.kpis.map((item, index) => {
        const Icon = monitoringKpiIcons[index] ?? BarChart3;
        return (
          <article key={item.label} className="rounded-lg border border-bank-line bg-white p-4 shadow-sm">
            <div className="flex min-h-28 items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-red-50 text-bank-red ring-1 ring-red-100">
                <Icon size={23} />
              </span>
              <div className="flex min-h-28 min-w-0 flex-1 flex-col justify-between">
                <div>
                  <p className="text-sm font-bold leading-5 text-bank-muted">{item.label}</p>
                  <p className="mt-2 text-3xl font-bold leading-8 text-bank-navy">{item.value}</p>
                </div>
                <p className="mt-3 text-xs font-semibold leading-5 text-bank-muted">{monitoringKpiDetails[index]}</p>
              </div>
            </div>
          </article>
        );
      })}</section>
      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
        <Panel
          title="Active Facilities Table"
          action={
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-bank-muted">{filteredFacilities.length} shown</span>
              <label className="flex items-center gap-2 text-xs font-bold text-bank-muted">
                Status
                <select
                  className="min-h-9 rounded-md border border-bank-line bg-white px-3 text-sm font-bold text-bank-navy outline-none focus:border-bank-red"
                  value={facilityStatusFilter}
                  onChange={(event) => setFacilityStatusFilter(event.target.value)}
                >
                  {statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
              </label>
              <label className="flex items-center gap-2 text-xs font-bold text-bank-muted">
                Risk
                <select
                  className="min-h-9 rounded-md border border-bank-line bg-white px-3 text-sm font-bold text-bank-navy outline-none focus:border-bank-red"
                  value={facilityRiskFilter}
                  onChange={(event) => setFacilityRiskFilter(event.target.value)}
                >
                  {riskOptions.map((risk) => <option key={risk} value={risk}>{risk}</option>)}
                </select>
              </label>
            </div>
          }
        >
          <DataTable columns={["Facility", "SME", "Type", "Limit", "Status", "Risk"]} rows={filteredFacilities.map((row) => [row.facilityId, row.sme, row.type, row.limit, <Badge key="s" tone={toneFor(row.status)}>{row.status}</Badge>, <Badge key="r" tone={toneFor(row.risk)}>{row.risk}</Badge>])} />
        </Panel>
        <Panel title="Risk Trend Chart">
          <div className="rounded-lg bg-bank-bg p-4">
            <div className="mb-4 grid gap-2 rounded-md bg-white px-3 py-2 text-xs font-bold text-bank-muted sm:grid-cols-2">
              <span className="min-w-0">Risk index</span>
              <span className="min-w-0 text-left sm:text-right">Higher bar = higher monitoring risk</span>
            </div>
            <div className="flex h-36 items-end gap-3 pt-2">{data.riskTrend.map((value, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t bg-bank-red" style={{ height: `${value * 2}px` }} title={`Week ${index + 1}: risk index ${value}`} />
                <span className="text-xs font-semibold text-bank-muted" title={`Week ${index + 1}`}>W{index + 1}</span>
              </div>
            ))}</div>
          </div>
          <div className="mt-3 rounded-md border border-bank-line bg-white px-3 py-2 text-xs leading-5 text-bank-muted">
            <span className="font-bold text-bank-navy">Explanation:</span> W1-W7 represent the last seven monitoring weeks. Taller bars indicate higher post-loan risk signals from repayment delay, cash-flow variance and shipment delay indicators.
          </div>
        </Panel>
      </section>
      <section className="grid min-w-0 gap-5 xl:grid-cols-3">
        <Panel title="Cash-flow Monitoring">{data.cashFlowMonitoring.map((item) => <div key={item} className="mb-3 rounded-md border border-bank-line p-3 text-sm font-bold text-bank-navy">{item}</div>)}</Panel>
        <Panel title="Early Warning Signals">{data.earlyWarningSignals.map((item) => <div key={`${item.caseId}-${item.type}`} className="mb-3 flex gap-3 rounded-md border border-orange-200 bg-orange-50 p-3 text-sm font-bold text-orange-800"><ShieldAlert size={17} />{item.type}<Badge tone={toneFor(item.severity)}>{item.severity}</Badge></div>)}</Panel>
        <Panel title="Recommended Actions">
          <div className="space-y-3">{data.recommendedActions.map((item, index) => (
            <div key={item} className="space-y-2">
              <ActionButton tone={demoState.actionStatuses[`monitoring:${item}`] ? "green" : index === 0 ? "primary" : index === 1 ? "ghost" : "orange"} onClick={() => markMonitoringAction(item)}>
                {demoState.actionStatuses[`monitoring:${item}`] ? <CheckCircle2 size={16} /> : null}
                {demoState.actionStatuses[`monitoring:${item}`] ? "Action Queued" : item}
              </ActionButton>
            </div>
          ))}</div>
          {selectedMonitoringAction || data.recommendedActions.some((item) => demoState.actionStatuses[`monitoring:${item}`]) ? (() => {
            const action = selectedMonitoringAction || data.recommendedActions.find((item) => demoState.actionStatuses[`monitoring:${item}`]) || "";
            const link = monitoringActionLinks[action];
            return (
              <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm">
                <p className="font-bold text-emerald-800">Action result</p>
                <p className="mt-1 leading-6 text-emerald-700">{demoState.actionStatuses[`monitoring:${action}`] ?? monitoringActionDetails[action]}</p>
                <p className="mt-2 text-xs font-semibold text-emerald-700">This mock action has been added to the bank audit trail.</p>
                {link ? (
                  <Link href={link.href} className="mt-3 inline-flex min-h-9 items-center justify-center rounded-md bg-bank-red px-3 text-xs font-bold text-white">
                    {link.label}
                  </Link>
                ) : null}
              </div>
            );
          })() : (
            <p className="mt-4 rounded-md bg-bank-bg px-3 py-2 text-xs font-semibold leading-5 text-bank-muted">Click an action to queue a mock post-loan follow-up task and create an audit trail entry.</p>
          )}
        </Panel>
      </section>
    </PageShell>
  );
}
