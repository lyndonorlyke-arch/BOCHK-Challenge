import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  ClipboardList,
  FileWarning,
  Filter,
  Search,
  ShieldAlert,
  ShieldCheck
} from "lucide-react";
import { applicationCases, applicationStatusMeta } from "@/data/tradesafe";
import { Footer } from "@/components/footer";
import { Logo, MetricTile } from "@/components/ui";

const statusOrder = ["ready", "missing", "suspicious", "approved"] as const;
const statusIcons = {
  ready: CheckCircle2,
  missing: FileWarning,
  suspicious: ShieldAlert,
  approved: ShieldCheck
};
const statusStyles = {
  ready: "border-green-200 bg-green-50 text-green-700",
  missing: "border-amber-200 bg-amber-50 text-amber-700",
  suspicious: "border-red-200 bg-red-50 text-red-700",
  approved: "border-blue-200 bg-blue-50 text-bank-blue"
};

export default function BackOfficePage() {
  const readyCount = applicationCases.filter((item) => item.status === "ready").length;
  const missingCount = applicationCases.filter((item) => item.status === "missing").length;
  const suspiciousCount = applicationCases.filter((item) => item.status === "suspicious").length;
  const exposure = applicationCases.reduce((sum, item) => sum + Number(item.request.replace(/[^\d]/g, "")), 0);

  return (
    <div className="min-h-screen bg-bank-bg">
      <header className="border-b border-bank-line bg-white">
        <div className="section-shell flex min-h-16 items-center justify-between gap-4">
          <Logo />
          <div className="hidden items-center gap-3 rounded-full border border-bank-line bg-bank-bg px-4 py-2 text-sm font-bold text-bank-muted md:flex">
            <ClipboardList size={16} />
            Trade Finance Application Console
          </div>
          <Link href="/" className="text-sm font-bold text-bank-muted hover:text-bank-navy">
            Overview
          </Link>
        </div>
      </header>

      <main className="section-shell py-8">
        <section className="bank-panel rounded-lg border border-bank-line p-6 shadow-subtle md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-bank-red">BOCHK Internal Back Office</p>
              <h1 className="mt-3 text-3xl font-bold text-bank-navy md:text-5xl">SME Trade Finance Application Queue</h1>
              <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-bank-muted">
                多個跨境 SME 申請案件集中顯示，按資料完整度、可疑風險與審批狀態分類，方便 RM、credit officer 和 compliance team 快速分流。
              </p>
            </div>
            <div className="rounded-lg bg-bank-navy p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-white/60">Today&apos;s decision focus</p>
              <p className="mt-3 text-3xl font-bold">{suspiciousCount + readyCount} cases</p>
              <p className="mt-2 text-sm leading-6 text-white/72">High-risk alerts and complete applications should be reviewed first.</p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricTile label="Total queue" value={`${applicationCases.length} cases`} body="Active trade finance applications" />
          <MetricTile label="資料齊全待審批" value={`${readyCount}`} body="Ready for officer decision" />
          <MetricTile label="缺少資料" value={`${missingCount}`} body="Need document follow-up" />
          <MetricTile label="Total exposure" value={`HK$${(exposure / 1000000).toFixed(1)}M`} body="Mock requested facility amount" />
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-4">
          {statusOrder.map((status) => {
            const Icon = statusIcons[status];
            const cases = applicationCases.filter((item) => item.status === status);
            const meta = applicationStatusMeta[status];
            return (
              <article key={status} className="rounded-lg border border-bank-line bg-white p-5 shadow-subtle">
                <div className="flex items-start justify-between gap-3">
                  <div className={`grid h-10 w-10 place-items-center rounded-md border ${statusStyles[status]}`}>
                    <Icon size={19} />
                  </div>
                  <span className="rounded-full bg-bank-bg px-3 py-1 text-sm font-bold text-bank-navy">{cases.length}</span>
                </div>
                <h2 className="mt-4 text-lg font-bold text-bank-navy">{meta.label}</h2>
                <p className="mt-2 text-sm leading-6 text-bank-muted">{meta.description}</p>
              </article>
            );
          })}
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="rounded-lg border border-bank-line bg-white shadow-subtle">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-bank-line p-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-bank-red">Application list</p>
                <h2 className="mt-1 text-2xl font-bold text-bank-navy">不同申請公司情況</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-md border border-bank-line bg-bank-bg px-3 py-2 text-xs font-bold text-bank-muted">
                  <Search size={14} />
                  Search mock
                </span>
                <span className="inline-flex items-center gap-2 rounded-md border border-bank-line bg-bank-bg px-3 py-2 text-xs font-bold text-bank-muted">
                  <Filter size={14} />
                  Status filters
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] border-collapse text-left text-sm">
                <thead className="bg-bank-navy text-white">
                  <tr>
                    <th className="p-4">Company</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Request</th>
                    <th className="p-4">Completeness</th>
                    <th className="p-4">Risk Snapshot</th>
                    <th className="p-4">Owner</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {applicationCases.map((item) => (
                    <tr key={item.id} className="border-b border-bank-line last:border-b-0">
                      <td className="p-4">
                        <p className="font-bold text-bank-navy">{item.company}</p>
                        <p className="mt-1 text-xs font-semibold text-bank-muted">{item.id} · {item.industry}</p>
                        <p className="mt-1 text-xs text-bank-muted">{item.route}</p>
                      </td>
                      <td className="p-4">
                        <StatusPill status={item.status} />
                      </td>
                      <td className="p-4 font-bold text-bank-navy">
                        {item.request}
                        <p className="mt-1 text-xs font-semibold text-bank-muted">{item.tenor}</p>
                      </td>
                      <td className="p-4">
                        <div className="h-2 w-28 rounded-full bg-bank-bg">
                          <div className="h-2 rounded-full bg-bank-blue" style={{ width: `${item.completeness}%` }} />
                        </div>
                        <p className="mt-2 text-xs font-bold text-bank-muted">{item.completeness}% complete</p>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-2">
                          <MiniRisk label="Credit" value={item.creditScore} />
                          <MiniRisk label="Auth" value={item.authenticityScore} />
                          <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${item.amlRisk === "High" ? "border-red-200 bg-red-50 text-red-700" : "border-amber-200 bg-amber-50 text-amber-700"}`}>
                            AML {item.amlRisk}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-sm font-semibold text-bank-muted">{item.owner}</td>
                      <td className="p-4">
                        <Link href={item.href} className="inline-flex items-center gap-2 rounded-md bg-bank-red px-3 py-2 text-xs font-bold text-white">
                          查看分析
                          <ArrowUpRight size={14} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="space-y-6">
            <QueuePanel
              title="可疑提示分支"
              icon={AlertTriangle}
              cases={applicationCases.filter((item) => item.status === "suspicious")}
              empty="No suspicious case"
            />
            <QueuePanel
              title="缺少資料分支"
              icon={FileWarning}
              cases={applicationCases.filter((item) => item.status === "missing")}
              empty="No missing document case"
            />
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function StatusPill({ status }: { status: keyof typeof applicationStatusMeta }) {
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[status]}`}>{applicationStatusMeta[status].label}</span>;
}

function MiniRisk({ label, value }: { label: string; value: number }) {
  const tone = value >= 80 ? "border-green-200 bg-green-50 text-green-700" : value >= 65 ? "border-amber-200 bg-amber-50 text-amber-700" : "border-red-200 bg-red-50 text-red-700";
  return <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${tone}`}>{label} {value}</span>;
}

function QueuePanel({
  title,
  icon: Icon,
  cases,
  empty
}: {
  title: string;
  icon: typeof AlertTriangle;
  cases: typeof applicationCases[number][];
  empty: string;
}) {
  return (
    <section className="rounded-lg border border-bank-line bg-white p-5 shadow-subtle">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-md bg-bank-navy text-white">
          <Icon size={19} />
        </div>
        <h2 className="font-bold text-bank-navy">{title}</h2>
      </div>
      <div className="mt-5 space-y-4">
        {cases.length === 0 ? <p className="text-sm text-bank-muted">{empty}</p> : null}
        {cases.map((item) => (
          <article key={item.id} className="rounded-md border border-bank-line bg-bank-bg p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold text-bank-navy">{item.company}</p>
                <p className="mt-1 text-xs font-semibold text-bank-muted">{item.request} · {item.priority} priority</p>
              </div>
              <Link href={item.href} className="shrink-0 text-bank-red" aria-label={`Open ${item.company}`}>
                <ArrowUpRight size={18} />
              </Link>
            </div>
            <ul className="mt-3 space-y-2">
              {[...item.flags, ...item.missingDocs].map((flag) => (
                <li key={flag} className="text-xs font-semibold leading-5 text-bank-muted">· {flag}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
