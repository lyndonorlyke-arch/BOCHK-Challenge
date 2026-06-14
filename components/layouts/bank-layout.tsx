"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Bell,
  ClipboardCheck,
  ClipboardList,
  FileCheck2,
  FileSearch,
  Gauge,
  HelpCircle,
  Menu,
  Network,
  Search,
  ShieldCheck,
  TrendingUp,
  UserRound,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";
import { PortalGuard } from "@/components/auth/portal-guard";

const bankNavigation: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Portfolio Overview", href: "/bank/overview", icon: BarChart3 },
  { label: "Case Intake", href: "/bank/case-intake", icon: ClipboardList },
  { label: "AI Document Reader", href: "/bank/document-reader", icon: FileSearch },
  { label: "Trade Verification", href: "/bank/trade-verification", icon: ShieldCheck },
  { label: "Counterparty & KYB Graph", href: "/bank/kyb-graph", icon: Network },
  { label: "Risk & Fraud Dashboard", href: "/bank/risk-dashboard", icon: Gauge },
  { label: "AI Credit Memo", href: "/bank/credit-memo", icon: FileCheck2 },
  { label: "Approval & Audit Trail", href: "/bank/approval-audit", icon: ClipboardCheck },
  { label: "Post-loan Monitoring", href: "/bank/post-loan-monitoring", icon: TrendingUp }
];

const bankNotifications = [
  {
    title: "Credit memo submitted",
    detail: "TF-2026-0001 is ready for approval review.",
    href: "/bank/approval-audit",
    tone: "red"
  },
  {
    title: "Document review required",
    detail: "Purchase Order and Bill of Lading need officer confirmation.",
    href: "/bank/document-reader",
    tone: "orange"
  },
  {
    title: "Risk signal updated",
    detail: "Medium High counterparty risk detected in KYB graph.",
    href: "/bank/kyb-graph",
    tone: "blue"
  }
];

const bankHelpLinks = [
  {
    title: "Case Review Guide",
    detail: "Open intake workflow, progress tracker, and officer actions.",
    href: "/bank/case-intake"
  },
  {
    title: "Document Verification",
    detail: "Review extraction confidence, warnings, and correction log.",
    href: "/bank/document-reader"
  },
  {
    title: "Risk Dashboard Help",
    detail: "Understand internal risk factors, evidence, and recommended actions.",
    href: "/bank/risk-dashboard"
  },
  {
    title: "Approval & Audit Trail",
    detail: "Record final decisions and export audit evidence.",
    href: "/bank/approval-audit"
  }
];

export function BankLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTabletCollapsed, setIsTabletCollapsed] = useState(true);

  return (
    <PortalGuard requiredRole="bank">
      <div className="min-h-screen bg-bank-bg text-bank-ink">
        <BankTopBar onOpenSidebar={() => setIsSidebarOpen(true)} />

        <div className="min-w-0 lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="hidden h-[calc(100vh-4rem)] lg:block">
            <BankSidebar pathname={pathname} collapsed={false} />
          </aside>

          <aside className={`fixed left-0 top-16 z-30 hidden h-[calc(100vh-4rem)] border-r border-bank-blue/40 bg-bank-navy shadow-panel md:block lg:hidden ${isTabletCollapsed ? "w-20" : "w-[280px]"}`}>
            <BankSidebar pathname={pathname} collapsed={isTabletCollapsed} onToggleCollapsed={() => setIsTabletCollapsed((current) => !current)} />
          </aside>

          {isSidebarOpen ? (
            <div className="fixed inset-0 z-40 md:hidden">
              <button type="button" className="absolute inset-0 bg-bank-navy/55" aria-label="Close sidebar" onClick={() => setIsSidebarOpen(false)} />
              <aside className="absolute inset-y-0 left-0 h-[100dvh] w-[86vw] max-w-[320px] bg-bank-navy shadow-panel">
                <BankSidebar pathname={pathname} collapsed={false} onClose={() => setIsSidebarOpen(false)} fullHeight />
              </aside>
            </div>
          ) : null}

          <main className={`min-w-0 px-4 py-6 transition-[margin] sm:px-6 lg:ml-0 lg:px-8 ${isTabletCollapsed ? "md:ml-20" : "md:ml-[280px]"}`}>{children}</main>
        </div>
      </div>
    </PortalGuard>
  );
}

function BankTopBar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const [caseSearch, setCaseSearch] = useState("");
  const [cases, setCases] = useState<Array<{ id: string; companyName: string; financingType: string; status: string }>>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);
  const notificationCount = notificationsRead ? 0 : 12;

  useEffect(() => {
    fetch("/api/bank/cases")
      .then((response) => response.json())
      .then((payload) => setCases(payload.cases ?? []))
      .catch(() => undefined);
  }, []);

  const searchResults = useMemo(() => {
    const normalized = caseSearch.trim().toLowerCase();
    if (!normalized) {
      return [];
    }

    return cases
      .filter((item) => [item.id, item.companyName, item.financingType, item.status].some((value) => value.toLowerCase().includes(normalized)))
      .slice(0, 5);
  }, [caseSearch, cases]);

  const searchInput = (
    <>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-bank-muted" />
      <input
        type="search"
        placeholder="Search Case"
        className="min-h-11 w-full rounded-md border border-bank-line bg-white py-2 pl-10 pr-3 text-sm text-bank-navy outline-none ring-bank-red/20 placeholder:text-bank-muted focus:border-bank-red focus:ring-4"
        value={caseSearch}
        onChange={(event) => setCaseSearch(event.target.value)}
      />
      {searchResults.length > 0 ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-lg border border-bank-line bg-white shadow-panel">
          {searchResults.map((item) => (
            <Link
              key={item.id}
              href={`/bank/case-intake?case=${encodeURIComponent(item.id)}`}
              className="block border-b border-bank-line px-4 py-3 last:border-0 hover:bg-bank-bg"
              onClick={() => setCaseSearch(item.id)}
            >
              <span className="block text-sm font-bold text-bank-navy">{item.id} · {item.companyName}</span>
              <span className="mt-1 block text-xs text-bank-muted">{item.financingType} · {item.status}</span>
            </Link>
          ))}
        </div>
      ) : caseSearch.trim() ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 rounded-lg border border-bank-line bg-white px-4 py-3 text-sm font-semibold text-bank-muted shadow-panel">No matching mock case</div>
      ) : null}
    </>
  );

  return (
    <header className="sticky top-0 z-30 border-b border-bank-line bg-white">
      <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button type="button" className="grid h-10 w-10 place-items-center rounded-md border border-bank-line bg-white text-bank-navy md:hidden" aria-label="Open bank console sidebar" onClick={onOpenSidebar}>
          <Menu size={20} />
        </button>

        <Link href="/bank/overview" className="flex min-w-fit items-center gap-3" aria-label="BOCHK TradeSafe Credit Co-pilot">
          <span className="relative h-10 w-10 shrink-0 rounded-full border-[5px] border-bank-red bg-white" aria-hidden="true">
            <span className="absolute left-1/2 top-0 h-full w-[5px] -translate-x-1/2 bg-bank-red" />
            <span className="absolute left-1/2 top-1/2 h-[17px] w-[17px] -translate-x-1/2 -translate-y-1/2 rounded-[2px] border-[4px] border-bank-red bg-white" />
          </span>
          <span className="hidden items-center gap-2 xl:flex">
            <span className="text-base font-bold text-bank-red">BOCHK</span>
            <span className="text-base font-bold text-bank-navy">TradeSafe Credit Co-pilot</span>
          </span>
          <span className="text-sm font-bold text-bank-navy sm:hidden">BOCHK</span>
          <span className="hidden text-base font-bold text-bank-navy sm:inline xl:hidden">TradeSafe</span>
        </Link>

        <label className="relative mx-auto hidden w-full max-w-xl md:block">
          <span className="sr-only">Search Case</span>
          {searchInput}
        </label>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="relative">
            <button
              type="button"
              className={`relative grid h-10 w-10 place-items-center rounded-md border text-bank-navy transition ${isNotificationsOpen ? "border-bank-red bg-red-50" : "border-bank-line bg-white hover:border-bank-red"}`}
              aria-label="Notifications"
              aria-expanded={isNotificationsOpen}
              onClick={() => {
                setIsNotificationsOpen((current) => !current);
                setIsHelpOpen(false);
              }}
            >
              <Bell size={19} />
              {notificationCount > 0 ? (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-bank-red px-1 text-[10px] font-bold text-white">{notificationCount}</span>
              ) : null}
            </button>
            {isNotificationsOpen ? (
              <div className="absolute right-0 top-[calc(100%+0.65rem)] z-50 w-[min(90vw,380px)] overflow-hidden rounded-lg border border-bank-line bg-white shadow-panel">
                <div className="flex items-center justify-between gap-3 border-b border-bank-line px-4 py-3">
                  <div>
                    <p className="text-sm font-bold text-bank-navy">Notifications</p>
                    <p className="text-xs text-bank-muted">{notificationCount > 0 ? `${notificationCount} unread internal alerts` : "All notifications read"}</p>
                  </div>
                  <button
                    type="button"
                    className="rounded-md border border-bank-line px-3 py-1.5 text-xs font-bold text-bank-navy hover:border-bank-red hover:text-bank-red"
                    onClick={() => setNotificationsRead(true)}
                  >
                    Mark all read
                  </button>
                </div>
                <div className="max-h-[360px] overflow-y-auto p-2">
                  {bankNotifications.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="flex gap-3 rounded-md px-3 py-3 hover:bg-bank-bg"
                      onClick={() => setIsNotificationsOpen(false)}
                    >
                      <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${item.tone === "red" ? "bg-bank-red" : item.tone === "orange" ? "bg-orange-500" : "bg-blue-600"}`} />
                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-bank-navy">{item.title}</span>
                        <span className="mt-1 block text-xs leading-5 text-bank-muted">{item.detail}</span>
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-bank-line bg-bank-bg px-4 py-3 text-xs font-semibold text-bank-muted">
                  Prototype notifications only. Actions are logged in mock state.
                </div>
              </div>
            ) : null}
          </div>
          <div className="relative hidden sm:block">
            <button
              type="button"
              className={`grid h-10 w-10 place-items-center rounded-md border text-bank-navy transition ${isHelpOpen ? "border-bank-red bg-red-50" : "border-bank-line bg-white hover:border-bank-red"}`}
              aria-label="Help"
              aria-expanded={isHelpOpen}
              onClick={() => {
                setIsHelpOpen((current) => !current);
                setIsNotificationsOpen(false);
              }}
            >
              <HelpCircle size={19} />
            </button>
            {isHelpOpen ? (
              <div className="absolute right-0 top-[calc(100%+0.65rem)] z-50 w-[min(90vw,400px)] overflow-hidden rounded-lg border border-bank-line bg-white shadow-panel">
                <div className="flex items-start justify-between gap-3 border-b border-bank-line px-4 py-3">
                  <div>
                    <p className="text-sm font-bold text-bank-navy">Bank Console Help</p>
                    <p className="mt-1 text-xs leading-5 text-bank-muted">Internal prototype support for BOCHK credit officers.</p>
                  </div>
                  <button
                    type="button"
                    className="grid h-8 w-8 place-items-center rounded-md text-bank-muted hover:bg-bank-bg hover:text-bank-navy"
                    aria-label="Close help"
                    onClick={() => setIsHelpOpen(false)}
                  >
                    <X size={17} />
                  </button>
                </div>
                <div className="space-y-2 p-3">
                  {bankHelpLinks.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="block rounded-md border border-bank-line px-3 py-3 hover:border-bank-red hover:bg-red-50"
                      onClick={() => setIsHelpOpen(false)}
                    >
                      <span className="block text-sm font-bold text-bank-navy">{item.title}</span>
                      <span className="mt-1 block text-xs leading-5 text-bank-muted">{item.detail}</span>
                    </Link>
                  ))}
                </div>
                <div className="grid gap-2 border-t border-bank-line bg-bank-bg px-4 py-3 text-xs text-bank-muted">
                  <p><span className="font-bold text-bank-navy">Support desk:</span> tradesafe-support@bochk-demo.local</p>
                  <p><span className="font-bold text-bank-navy">Hotline:</span> +852 3988 0000</p>
                </div>
              </div>
            ) : null}
          </div>
          <div className="hidden items-center gap-3 border-l border-bank-line pl-3 md:flex">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-bank-red text-sm font-bold text-white">CO</span>
            <span className="hidden leading-5 lg:block">
              <span className="block text-sm font-bold text-bank-navy">Credit Officer</span>
              <span className="block text-xs text-bank-muted">Role: Credit Officer</span>
            </span>
          </div>
          <LogoutButton />
        </div>
      </div>

      <div className="border-t border-bank-line px-4 py-3 md:hidden">
        <label className="relative block">
          <span className="sr-only">Search Case</span>
          {searchInput}
        </label>
      </div>
    </header>
  );
}

function BankSidebar({
  pathname,
  collapsed,
  onToggleCollapsed,
  onClose,
  fullHeight = false
}: {
  pathname: string;
  collapsed: boolean;
  onToggleCollapsed?: () => void;
  onClose?: () => void;
  fullHeight?: boolean;
}) {
  return (
    <div className={`flex ${fullHeight ? "h-full" : "h-full lg:sticky lg:top-16"} flex-col bg-bank-navy text-white ${collapsed ? "w-20" : "w-[280px]"}`}>
      <div className={`flex min-h-16 items-center gap-3 border-b border-white/10 px-4 ${collapsed ? "justify-center" : ""}`}>
        <span className="relative h-10 w-10 shrink-0 rounded-full border-[5px] border-bank-red bg-bank-navy" aria-hidden="true">
          <span className="absolute right-[8px] top-[5px] h-[25px] w-[5px] bg-bank-red" />
          <span className="absolute left-1/2 top-1/2 h-[17px] w-[17px] -translate-x-1/2 -translate-y-1/2 rounded-[2px] border-[4px] border-bank-red bg-bank-navy" />
        </span>
        {!collapsed ? (
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">BOCHK TradeSafe</p>
            <p className="truncate text-xs text-white/60">Bank Console</p>
          </div>
        ) : null}
        {onClose ? (
          <button type="button" className="ml-auto grid h-9 w-9 place-items-center rounded-md text-white/75 hover:bg-white/10" aria-label="Close sidebar" onClick={onClose}>
            <X size={20} />
          </button>
        ) : null}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto py-4" aria-label="Bank console sidebar">
        {bankNavigation.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mx-0 flex min-h-12 items-center gap-3 border-l-4 px-4 text-sm font-bold ${
                active ? "border-bank-red bg-bank-red text-white" : "border-transparent text-white/86 hover:bg-white/10 hover:text-white"
              } ${collapsed ? "justify-center px-0" : ""}`}
              title={collapsed ? item.label : undefined}
              onClick={onClose}
            >
              <Icon size={21} className="shrink-0" />
              {!collapsed ? <span className="leading-5">{item.label}</span> : null}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          className={`hidden min-h-11 w-full items-center gap-3 rounded-md text-sm font-bold text-white/85 hover:bg-white/10 md:flex lg:hidden ${collapsed ? "justify-center px-0" : "px-3"}`}
          onClick={onToggleCollapsed}
        >
          <Menu size={19} />
          {!collapsed ? "Collapse" : null}
        </button>
        <div className={`mt-2 hidden rounded-md bg-white/5 p-3 text-xs text-white/60 lg:block ${collapsed ? "hidden" : ""}`}>Internal bank console only</div>
      </div>
    </div>
  );
}
