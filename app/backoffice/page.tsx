import Link from "next/link";
import {
  Banknote,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Download,
  FileText,
  ShieldAlert,
  ShieldCheck,
  TrendingUp
} from "lucide-react";
import { GhostButton, Panel, RedButton, TradeSafeShell } from "@/components/tradesafe-shell";
import { AlertRow, DonutChart, GaugeChart, MetricCard, MiniLineChart, ProgressBar, ScoreCard } from "@/components/tradesafe-widgets";

const riskFlags = [
  ["New Counterparty", 18, "34%"],
  ["Missing Logistics Evidence", 13, "25%"],
  ["Extended Payment Term", 9, "17%"],
  ["FX Exposure", 7, "13%"],
  ["Duplicate Invoice Review", 6, "11%"]
];

const regions = [
  ["Mainland China", "54.0%", "bg-bank-red"],
  ["Vietnam", "18.0%", "bg-red-300"],
  ["Malaysia", "11.0%", "bg-slate-500"],
  ["Singapore", "9.0%", "bg-slate-400"],
  ["Other", "8.0%", "bg-stone-300"]
];

export default function BackOfficePage() {
  return (
    <TradeSafeShell
      activePath="/backoffice"
      title="Overview Dashboard"
      subtitle="Cross-border SME trade finance portfolio overview"
      actions={
        <>
          <GhostButton>
            <CalendarDays size={17} className="mr-2" />
            May 1 - May 31, 2025
          </GhostButton>
          <RedButton>
            <Download size={17} className="mr-2" />
            Export Summary
          </RedButton>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <MetricCard icon={FileText} label="Applications in Review" value="24" change="vs Apr: +14.3%" />
        <MetricCard icon={TrendingUp} label="AI Parsing Success Rate" value="96.4%" change="vs Apr: +2.1%" />
        <MetricCard icon={Clock3} label="Average Approval Time" value="1.8 days" change="vs Apr: -0.4 days" />
        <MetricCard icon={Banknote} label="Monthly Trade Volume" value="HK$48.2M" change="vs Apr: +8.7%" />
        <MetricCard icon={ShieldAlert} label="Compliance Alerts" value="5" change="vs Apr: -16.7%" />
        <MetricCard icon={ShieldCheck} label="Recommended Credit Limit" value="HK$126.0M" change="vs Apr: +6.5%" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr_0.78fr_1.05fr_1fr]">
        <ScoreCard title="Creditworthiness Score" value={78} label="Good" />
        <ScoreCard title="Transaction Authenticity Score" value={85} label="Very Good" />
        <Panel className="p-5">
          <h2 className="font-bold text-bank-navy">AML / Fraud Risk</h2>
          <p className="mt-4 text-3xl font-bold text-amber-500">Medium</p>
          <GaugeChart score={58} />
        </Panel>
        <Panel className="p-5">
          <h2 className="font-bold text-bank-navy">Recommendation Summary</h2>
          <ul className="mt-5 space-y-3">
            <AlertRow tone="red">Approve with conditions dominant</AlertRow>
            <AlertRow tone="red">Enhanced KYB needed for flagged counterparties</AlertRow>
            <AlertRow tone="red">Stable portfolio trend</AlertRow>
          </ul>
        </Panel>
        <Panel className="p-5">
          <h2 className="font-bold text-bank-navy">Quick Actions</h2>
          <div className="mt-4 space-y-3">
            {[
              ["Continue Review", "/demo/document-reader"],
              ["Generate Memo", "/demo/credit-memo"],
              ["Open Audit Log", "/demo/audit-trail"]
            ].map(([label, href]) => (
              <Link key={label} href={href} className="flex min-h-12 items-center justify-between rounded-md border border-bank-line px-4 text-sm font-bold text-bank-navy hover:border-bank-red">
                {label}
                <ChevronRight size={17} className="text-bank-muted" />
              </Link>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.25fr_0.68fr_0.68fr]">
        <Panel className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-bold text-bank-navy">12-Month Cash Flow Trend</h2>
            <span className="rounded-md border border-bank-line px-3 py-1.5 text-xs font-bold text-bank-navy">Monthly</span>
          </div>
          <div className="mt-2 flex gap-5 text-xs font-semibold text-bank-muted">
            <span><span className="mr-2 inline-block h-2 w-2 rounded-full bg-bank-red" />Inflow (HK$M)</span>
            <span><span className="mr-2 inline-block h-2 w-2 rounded-full bg-slate-400" />Outflow (HK$M)</span>
          </div>
          <MiniLineChart />
        </Panel>

        <Panel className="p-5">
          <h2 className="font-bold text-bank-navy">Buyer Concentration by Region</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-[180px_1fr] xl:grid-cols-1">
            <DonutChart />
            <div className="space-y-3">
              {regions.map(([label, value, color]) => (
                <div key={label} className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2 font-semibold text-bank-muted"><span className={`h-2.5 w-2.5 rounded-full ${color}`} />{label}</span>
                  <span className="font-bold text-bank-navy">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <div className="grid gap-4">
          <Panel className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-bank-navy">Compliance Watchlist</h2>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-bank-red text-xs font-bold text-white">4</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm font-semibold text-bank-navy">
              <li>1 counterparty KYB expiring soon</li>
              <li>2 sanctions matches require review</li>
              <li>3 high-risk transactions flagged</li>
              <li>Missing logistics documents: 7 cases</li>
            </ul>
            <Link href="/demo/risk-dashboard" className="mt-5 inline-flex text-sm font-bold text-bank-red">View all alerts -&gt;</Link>
          </Panel>
          <Panel className="p-5">
            <h2 className="font-bold text-bank-navy">System Health</h2>
            <dl className="mt-4 space-y-3 text-sm">
              {[
                ["Audit Hash Ready", "Ready"],
                ["Last Sync", "09:32"],
                ["Model Version", "v2.4"]
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-3">
                  <dt className="flex items-center gap-2 font-semibold text-bank-muted"><CheckCircle2 size={15} className="text-green-700" />{label}</dt>
                  <dd className="font-bold text-bank-navy">{value}</dd>
                </div>
              ))}
            </dl>
            <Link href="/demo/audit-trail" className="mt-5 inline-flex text-sm font-bold text-bank-red">System Status -&gt;</Link>
          </Panel>
        </div>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[0.9fr_1fr]">
        <Panel className="p-5">
          <h2 className="font-bold text-bank-navy">Risk Flag Breakdown</h2>
          <p className="text-xs font-semibold text-bank-muted">By number of cases</p>
          <div className="mt-4 space-y-3">
            {riskFlags.map(([label, count, pct]) => (
              <div key={label as string} className="grid grid-cols-[150px_1fr_70px] items-center gap-3 text-sm">
                <span className="font-semibold text-bank-navy">{label}</span>
                <ProgressBar value={Number(pct.toString().replace("%", "")) * 2.1} tone="red" />
                <span className="text-right font-bold text-bank-navy">{count} ({pct})</span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-between border-t border-bank-line pt-4 text-sm font-bold text-bank-navy">
            <span>Total</span>
            <span>53</span>
          </div>
        </Panel>

        <Panel className="p-5">
          <h2 className="font-bold text-bank-navy">AI Recommendation Distribution</h2>
          <p className="text-xs font-semibold text-bank-muted">By number of recommendations</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            {[
              ["Approve", "38", "40%", "green"],
              ["Approve with Conditions", "41", "43%", "amber"],
              ["Review Further", "14", "14%", "blue"],
              ["Escalate", "4", "3%", "red"]
            ].map(([label, value, pct, tone]) => (
              <div key={label} className="border-b border-bank-line pb-4 text-center last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                <span className={`mx-auto grid h-10 w-10 place-items-center rounded-full border ${tone === "green" ? "border-green-300 text-green-700" : tone === "amber" ? "border-amber-300 text-amber-600" : tone === "blue" ? "border-blue-300 text-bank-blue" : "border-red-300 text-bank-red"}`}><CheckCircle2 size={18} /></span>
                <p className="mt-3 text-sm font-semibold text-bank-navy">{label}</p>
                <p className="mt-2 text-3xl font-bold text-bank-navy">{value}</p>
                <p className={`text-sm font-bold ${tone === "green" ? "text-green-700" : tone === "amber" ? "text-amber-600" : tone === "blue" ? "text-bank-blue" : "text-bank-red"}`}>({pct})</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </TradeSafeShell>
  );
}
