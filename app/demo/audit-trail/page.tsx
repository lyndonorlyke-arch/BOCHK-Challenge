import {
  CheckCircle2,
  ClipboardCopy,
  Download,
  FileText,
  GitBranch,
  Shield,
  ShieldAlert,
  UserCheck,
  XCircle
} from "lucide-react";
import { GhostButton, Panel, RedButton, TradeSafeShell } from "@/components/tradesafe-shell";
import { AlertRow, StatusPill } from "@/components/tradesafe-widgets";

const officerActions = [
  ["Approve with Conditions", "Approve with tailored conditions", CheckCircle2, "green"],
  ["Request More Documents", "Request additional documents", FileText, "amber"],
  ["Escalate to Compliance", "Escalate for compliance review", Shield, "blue"],
  ["Reject", "Reject this credit application", XCircle, "red"],
  ["Override AI Recommendation", "Override and enter manual decision", UserCheck, "purple"]
] as const;

const auditCards = [
  ["Document Hash", "b9f3e7d2c6e3a9f8...", "SHA-256"],
  ["Report Hash", "e4c1d7f98b9a2d34...", "SHA-256"],
  ["Timestamp (UTC+8)", "May 31, 2025 10:32:18", "Synced"],
  ["Officer Action", "Pending", "Awaiting final decision"],
  ["Model Version", "v2.4", "Credit Co-pilot"],
  ["Version History", "7 versions", "View History"]
];

const timeline = [
  ["Upload Completed", "All documents uploaded (18 files, 42.6MB)", "Applicant User", "May 28, 2025 14:22"],
  ["AI Parsing Completed", "Document parsing and data extraction completed", "AI Service (v2.4)", "May 28, 2025 14:24"],
  ["Transaction Verification Run", "Counterparty, bank, and transaction verification completed", "Verification Engine", "May 28, 2025 14:25"],
  ["AI Credit Memo Generated", "AI credit memo and risk assessment generated", "AI Service (v2.4)", "May 28, 2025 14:27"],
  ["Compliance Review", "Compliance screening completed with no critical issues", "Compliance System", "May 29, 2025 09:12"],
  ["Officer Decision (Pending)", "Awaiting final officer decision", "Risk Officer", "-"]
];

export default function AuditTrailPage() {
  return (
    <TradeSafeShell
      activePath="/demo/audit-trail"
      title="Approval & Audit Trail"
      subtitle="Final officer decision and complete governance record"
      actions={
        <GhostButton>
          <Download size={17} className="mr-2" />
          Export Audit Package
        </GhostButton>
      }
    >
      <Panel className="p-5">
        <div className="grid gap-4 xl:grid-cols-[260px_1fr] xl:items-center">
          <div>
            <h2 className="font-bold text-bank-navy">Officer Action</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-bank-muted">Select your decision to finalize this credit case</p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-5">
            {officerActions.map(([title, body, Icon, tone]) => (
              <button key={title} className="flex min-h-28 items-center gap-4 rounded-lg border border-bank-line bg-white p-4 text-left hover:border-bank-red hover:bg-red-50">
                <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-full ${tone === "green" ? "bg-green-50 text-green-700" : tone === "amber" ? "bg-amber-50 text-amber-600" : tone === "blue" ? "bg-blue-50 text-bank-blue" : tone === "red" ? "bg-red-50 text-bank-red" : "bg-purple-50 text-purple-700"}`}>
                  <Icon size={25} />
                </span>
                <span>
                  <span className="block font-bold text-bank-navy">{title}</span>
                  <span className="mt-1 block text-sm font-semibold leading-5 text-bank-muted">{body}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </Panel>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_390px]">
        <div className="space-y-4">
          <Panel className="p-5">
            <h2 className="font-bold text-bank-navy">Final Decision <StatusPill tone="red">Pending Decision</StatusPill></h2>
            <div className="mt-5 grid gap-5 lg:grid-cols-[220px_190px_1fr]">
              <div>
                <p className="text-xs font-bold text-bank-muted">AI Recommendation</p>
                <StatusPill tone="green">Approve with Conditions</StatusPill>
                <p className="mt-4 text-xs font-bold text-bank-muted">AI Confidence</p>
                <p className="mt-2 text-3xl font-bold text-green-700">96.4%</p>
              </div>
              <div className="border-y border-bank-line py-4 lg:border-x lg:border-y-0 lg:px-5">
                <p className="text-xs font-bold text-bank-muted">Risk Level</p>
                <p className="mt-4 text-3xl font-bold text-amber-500">Moderate</p>
                <p className="mt-3 text-sm font-semibold text-bank-navy">Score: 58 / 100</p>
              </div>
              <div>
                <p className="text-xs font-bold text-bank-muted">Proposed Approval Conditions</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm font-semibold leading-6 text-bank-navy">
                  <li>Maximum facility amount: HK$80.0M</li>
                  <li>Tenor: Up to 180 days</li>
                  <li>Require post-shipment documents within 5 banking days</li>
                  <li>Maintain Debt Service Coverage Ratio greater than 1.25x</li>
                  <li>Review bank statements monthly</li>
                </ul>
              </div>
            </div>
            <a className="mt-6 inline-flex text-sm font-bold text-bank-red" href="/demo/credit-memo">View AI Credit Memo -&gt;</a>
          </Panel>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {auditCards.map(([label, value, body]) => (
              <Panel key={label} className="p-4">
                <p className="text-sm font-bold text-bank-navy">{label}</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="truncate font-mono text-sm font-bold text-bank-navy">{value}</p>
                  <ClipboardCopy size={16} className="shrink-0 text-bank-muted" />
                </div>
                <p className={`mt-3 text-sm font-semibold ${body === "Synced" ? "text-green-700" : body === "View History" ? "text-bank-red" : "text-bank-muted"}`}>{body}</p>
              </Panel>
            ))}
          </div>

          <Panel className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-bold text-bank-navy">Audit Trail</h2>
                <p className="text-sm font-semibold text-bank-muted">Chronological record of all system and user actions</p>
              </div>
              <GhostButton><Download size={17} className="mr-2" />Download Audit Trail</GhostButton>
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <tbody>
                  {timeline.map(([event, detail, actor, time]) => (
                    <tr key={event} className="border-b border-bank-line last:border-b-0">
                      <td className="w-8 py-4"><span className="block h-3 w-3 rounded-full border-2 border-bank-red bg-white" /></td>
                      <td className="py-4 font-bold text-bank-navy">{event}</td>
                      <td className="py-4 font-semibold text-bank-muted">{detail}</td>
                      <td className="py-4 font-semibold text-bank-muted">{actor}</td>
                      <td className="py-4 font-semibold text-bank-muted">{time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>

        <aside className="space-y-4">
          <Panel className="p-5">
            <h2 className="flex items-center gap-2 font-bold text-bank-navy"><Shield size={18} />Governance & Audit</h2>
            <div className="mt-4 rounded-lg border border-bank-line p-4">
              <p className="font-bold text-bank-navy">Audit Hash Status</p>
              <p className="mt-3 flex items-center gap-2 text-sm font-bold text-green-700"><CheckCircle2 size={16} />Verified on Blockchain</p>
              <p className="mt-3 text-sm font-semibold text-bank-muted">Block ID: <span className="font-bold text-bank-navy">19,845,773</span></p>
              <div className="mt-4 border-t border-bank-line pt-4">
                <p className="font-bold text-bank-navy">Last Sync</p>
                <p className="mt-2 text-sm font-semibold text-bank-navy">May 31, 2025 10:32:18 (UTC+8)</p>
                <p className="mt-3 text-sm font-bold text-green-700">Source: BOCHK Audit Node 3</p>
              </div>
            </div>
          </Panel>

          <Panel className="border-red-200 bg-red-50 p-5">
            <h2 className="flex items-center gap-3 font-bold text-bank-red"><ShieldAlert size={24} />AI does not automatically approve loans.</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-bank-navy">Final decision remains with BOCHK credit officers in accordance with credit policy and governance requirements.</p>
          </Panel>

          <Panel className="p-5">
            <h2 className="font-bold text-bank-navy">Case Summary</h2>
            <dl className="mt-4 divide-y divide-bank-line text-sm">
              {[
                ["Case ID", "TS-2025-05-00078"],
                ["Applicant", "Pearl Ocean Export Ltd."],
                ["Facility Type", "Trade Finance (LC)"],
                ["Facility Amount", "HK$80.0M"],
                ["Tenor", "180 days"],
                ["Submitted On", "May 28, 2025 14:22"]
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 py-3">
                  <dt className="font-semibold text-bank-muted">{label}</dt>
                  <dd className="text-right font-bold text-bank-navy">{value}</dd>
                </div>
              ))}
            </dl>
            <a href="/backoffice" className="mt-5 inline-flex text-sm font-bold text-bank-red">View Case Dashboard -&gt;</a>
          </Panel>

          <Panel className="p-5">
            <h2 className="font-bold text-bank-navy">Control Principles</h2>
            <ul className="mt-4 space-y-2">
              <AlertRow tone="green">Human final approval</AlertRow>
              <AlertRow tone="green">Tamper-evident hashes</AlertRow>
              <AlertRow tone="green">No customer document stored on-chain</AlertRow>
              <AlertRow tone="green">Manual override captured in version history</AlertRow>
            </ul>
            <RedButton>
              <GitBranch size={17} className="mr-2" />
              Record Officer Decision
            </RedButton>
          </Panel>
        </aside>
      </div>
    </TradeSafeShell>
  );
}
