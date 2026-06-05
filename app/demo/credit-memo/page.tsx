import Link from "next/link";
import { CheckCircle2, FileText } from "lucide-react";
import { DemoPanel, DemoShell } from "@/components/demo-shell";

const conditions = [
  "Enhanced KYB for Vietnam Buyer A",
  "Submission of missing logistics document",
  "Final approval by BOCHK credit officer"
];

export default function CreditMemoPage() {
  return (
    <DemoShell pathname="/demo/credit-memo">
      <DemoPanel
        title="AI Credit Memo"
        actions={<Link href="/demo/audit-trail" className="rounded-md bg-bank-red px-5 py-3 text-sm font-bold text-white">Record Audit Trail</Link>}
      >
        <article className="rounded-lg border border-bank-line bg-bank-bg p-6">
          <div className="flex items-center gap-3 border-b border-bank-line pb-5">
            <div className="grid h-11 w-11 place-items-center rounded-md bg-bank-navy text-white">
              <FileText size={22} />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-bank-red">AI-generated Credit Memo</p>
              <h3 className="text-2xl font-bold text-bank-navy">Approve with conditions</h3>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Applicant", "HK Smart Components Ltd"],
              ["Financing Request", "HK$800,000"],
              ["Tenor", "90 days"],
              ["Recommendation", "Approve with conditions"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-md bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-bank-muted">{label}</p>
                <p className="mt-1 font-bold text-bank-navy">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <MemoBlock
              title="Summary"
              body="HK Smart Components Ltd shows stable monthly cross-border inflows from recurring buyers in Vietnam and Malaysia. Invoice and contract amounts are consistent, and the goods description aligns with the company's business profile."
            />
            <MemoBlock
              title="Key Risk Flags"
              body="One new Vietnam buyer appeared in the latest transaction cycle. One logistics document is missing. Enhanced KYB review is recommended."
            />
          </div>
          <div className="mt-6 rounded-md bg-white p-5">
            <h4 className="font-bold text-bank-navy">Suggested Conditions</h4>
            <ul className="mt-4 space-y-3">
              {conditions.map((condition) => (
                <li key={condition} className="flex gap-3 text-sm font-semibold text-bank-muted">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-green-600" size={16} />
                  {condition}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {["Approve with Conditions", "Request More Documents", "Escalate to Compliance"].map((action) => (
              <button key={action} className="rounded-md border border-bank-line bg-white px-4 py-3 text-sm font-bold text-bank-navy hover:border-bank-red">
                {action}
              </button>
            ))}
          </div>
        </article>
      </DemoPanel>
    </DemoShell>
  );
}

function MemoBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-md bg-white p-5">
      <h4 className="font-bold text-bank-navy">{title}</h4>
      <p className="mt-3 text-sm leading-6 text-bank-muted">{body}</p>
    </div>
  );
}
