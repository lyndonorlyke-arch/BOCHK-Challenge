import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  Bell,
  ClipboardList,
  FileArchive,
  FileCheck2,
  FileSearch,
  Gauge,
  Home,
  LineChart,
  Network,
  Search,
  Shield,
  ShieldAlert,
  Upload,
  UserRound,
  Workflow
} from "lucide-react";

const primaryNav = [
  { label: "Overview", href: "/backoffice", icon: Home },
  { label: "Application Upload", href: "/demo/upload", icon: Upload },
  { label: "AI Document Reader", href: "/demo/document-reader", icon: FileSearch },
  { label: "Transaction Verification", href: "/demo/verification", icon: Workflow },
  { label: "Risk Dashboard", href: "/demo/risk-dashboard", icon: Gauge },
  { label: "SME Risk Graph", href: "/demo/risk-dashboard", icon: LineChart },
  { label: "AI Credit Memo", href: "/demo/credit-memo", icon: FileCheck2 },
  { label: "Approval & Audit Trail", href: "/demo/audit-trail", icon: ClipboardList }
];

const caseNav = [
  { label: "All Cases", href: "/backoffice", icon: ClipboardList },
  { label: "Pending Review", href: "/backoffice?status=pending", icon: FileArchive },
  { label: "Missing Documents", href: "/backoffice?status=missing", icon: AlertCircle },
  { label: "Compliance Flag", href: "/backoffice?status=flag", icon: ShieldAlert }
];

const riskNav = [
  { label: "Counterparty KYB", href: "/demo/risk-dashboard", icon: UserRound },
  { label: "AML / Sanctions Check", href: "/demo/risk-dashboard", icon: Shield },
  { label: "Duplicate Invoice Check", href: "/demo/verification", icon: Network },
  { label: "Audit Hash Records", href: "/demo/audit-trail", icon: FileArchive }
];

export function TradeSafeShell({
  activePath,
  title,
  subtitle,
  actions,
  children
}: {
  activePath: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-bank-navy">
      <div className="lg:grid lg:grid-cols-[272px_1fr]">
        <aside className="hidden min-h-screen border-r border-bank-line bg-white lg:flex lg:flex-col">
          <BrandLockup />
          <div className="flex-1 overflow-y-auto px-4 pb-6">
            <SidebarSection items={primaryNav} activePath={activePath} />
            <SidebarSection title="Case Management" items={caseNav} activePath={activePath} />
            <SidebarSection title="Risk Tools" items={riskNav} activePath={activePath} />
          </div>
          <div className="border-t border-bank-line p-5 text-center text-xs font-bold text-bank-muted">{"<<"}</div>
        </aside>

        <div className="min-w-0">
          <TopBar activePath={activePath} />
          <main className="px-4 py-5 sm:px-6 lg:px-7">
            <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-normal text-bank-navy sm:text-3xl">{title}</h1>
                {subtitle ? <p className="mt-1 max-w-4xl text-sm font-semibold leading-6 text-bank-muted">{subtitle}</p> : null}
              </div>
              {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
            </div>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

function BrandLockup() {
  return (
    <Link href="/backoffice" className="flex min-h-[86px] items-center gap-3 px-5" aria-label="BOCHK TradeSafe home">
      <span className="relative grid h-11 w-11 place-items-center rounded-full border-2 border-bank-red">
        <span className="h-6 w-6 rounded-sm border-[3px] border-bank-red" />
        <span className="absolute h-3 w-9 bg-white" />
        <span className="absolute h-9 w-3 bg-white" />
      </span>
      <span>
        <span className="block text-lg font-bold leading-5 text-bank-navy">BOCHK TradeSafe</span>
        <span className="block text-base font-semibold leading-5 text-bank-navy">Credit Co-pilot</span>
      </span>
    </Link>
  );
}

function TopBar({ activePath }: { activePath: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-bank-line bg-white/95 backdrop-blur">
      <div className="flex min-h-[72px] items-center gap-3 px-4 sm:px-6 lg:px-7">
        <div className="lg:hidden">
          <BrandLockup />
        </div>
        <label className="hidden h-11 min-w-0 flex-1 items-center gap-3 rounded-md border border-bank-line bg-white px-4 text-sm font-semibold text-bank-muted shadow-sm md:flex">
          <Search size={18} />
          <span className="truncate">Search company, case ID, invoice, buyer, supplier</span>
        </label>
        <StatusChip label="Portfolio Status:" value="Active" tone="green" />
        <StatusChip label="AI Review Queue" value="12" tone="blue" />
        <StatusChip label="Risk Level:" value="Moderate" tone="amber" />
        <TopIcon icon={Bell} label="Notifications" count={activePath === "/backoffice" ? 6 : 3} />
        <TopIcon icon={Shield} label="Compliance Alerts" count={2} />
        <div className="hidden items-center gap-2 text-sm font-bold text-bank-navy xl:flex">
          <UserRound size={18} />
          Risk Officer
        </div>
      </div>
      <nav className="flex gap-2 overflow-x-auto border-t border-bank-line px-4 py-2 lg:hidden" aria-label="Mobile navigation">
        {primaryNav.map((item) => (
          <MobileLink key={item.href + item.label} item={item} activePath={activePath} />
        ))}
      </nav>
    </header>
  );
}

function SidebarSection({
  title,
  items,
  activePath
}: {
  title?: string;
  items: { label: string; href: string; icon: LucideIcon }[];
  activePath: string;
}) {
  return (
    <div className={title ? "mt-5 border-t border-bank-line pt-5" : ""}>
      {title ? <p className="mb-3 px-2 text-xs font-bold uppercase tracking-widest text-bank-muted">{title}</p> : null}
      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.href.split("?")[0] === activePath;
          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              className={`flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-bold ${
                isActive ? "bg-red-50 text-bank-red" : "text-bank-navy hover:bg-bank-bg"
              }`}
            >
              <Icon size={17} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function MobileLink({
  item,
  activePath
}: {
  item: { label: string; href: string; icon: LucideIcon };
  activePath: string;
}) {
  const isActive = item.href === activePath;
  return (
    <Link
      href={item.href}
      className={`inline-flex min-w-fit items-center gap-2 rounded-md px-3 py-2 text-xs font-bold ${
        isActive ? "bg-bank-red text-white" : "bg-bank-bg text-bank-navy"
      }`}
    >
      <item.icon size={14} />
      {item.label}
    </Link>
  );
}

function StatusChip({ label, value, tone }: { label: string; value: string; tone: "green" | "blue" | "amber" }) {
  const dot = tone === "green" ? "bg-green-600" : tone === "amber" ? "bg-amber-500" : "bg-blue-600";
  const text = tone === "green" ? "text-green-700" : tone === "amber" ? "text-amber-600" : "text-bank-blue";
  return (
    <div className="hidden h-11 shrink-0 items-center gap-2 rounded-md border border-bank-line bg-white px-4 text-sm font-bold text-bank-muted shadow-sm lg:flex">
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      <span>{label}</span>
      <span className={text}>{value}</span>
    </div>
  );
}

function TopIcon({ icon: Icon, label, count }: { icon: LucideIcon; label: string; count: number }) {
  return (
    <div className="relative hidden h-11 shrink-0 items-center gap-2 px-2 text-sm font-bold text-bank-navy xl:flex">
      <Icon size={18} />
      <span>{label}</span>
      <span className="absolute right-0 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-bank-red px-1 text-[10px] font-bold text-white">{count}</span>
    </div>
  );
}

export function Panel({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={`rounded-lg border border-bank-line bg-white shadow-sm ${className}`}>{children}</section>;
}

export function RedButton({ children }: { children: React.ReactNode }) {
  return <button className="inline-flex min-h-11 items-center justify-center rounded-md bg-bank-red px-5 text-sm font-bold text-white shadow-sm hover:bg-bank-darkRed">{children}</button>;
}

export function GhostButton({ children }: { children: React.ReactNode }) {
  return <button className="inline-flex min-h-11 items-center justify-center rounded-md border border-bank-line bg-white px-5 text-sm font-bold text-bank-navy shadow-sm">{children}</button>;
}
