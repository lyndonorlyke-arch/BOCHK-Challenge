import Link from "next/link";
import { Banknote, CalendarClock, FileCheck2, Route } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { caseProfile } from "@/data/tradesafe";
import { DemoPanel, DemoShell } from "@/components/demo-shell";
import { UploadVisual } from "@/components/landing-sections";
import { MetricTile } from "@/components/ui";

export default function UploadPage() {
  return (
    <DemoShell pathname="/demo/upload">
      <DemoPanel
        title="Application Upload"
        subtitle="Start with one SME case package. The interface frames loan purpose, tenor, documents and route before AI analysis begins."
        actions={<Link href="/demo/verification" className="rounded-md bg-bank-red px-5 py-3 text-sm font-bold text-white">Run AI Analysis</Link>}
      >
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <MetricTile label="Request" value={caseProfile.request} body="Supplier payment before buyer settlement" />
          <MetricTile label="Tenor" value={caseProfile.tenor} body="Short-term trade finance facility" />
          <MetricTile label="Evidence pack" value="5 files" body="Documents queued for AI extraction" />
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg bg-bank-bg p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-md bg-white text-bank-blue">
                <Banknote size={19} />
              </div>
              <h3 className="font-bold text-bank-navy">Application Form</h3>
            </div>
            <dl className="mt-5 grid gap-4">
              {[
                ["Company Name", caseProfile.company],
                ["Industry", "Electronic Components Trading"],
                ["Financing Request", caseProfile.request],
                ["Tenor", caseProfile.tenor],
                ["Loan Purpose", "Supplier payment"]
              ].map(([label, value]) => (
                <div key={label} className="rounded-md border border-bank-line bg-white p-4">
                  <dt className="text-xs font-bold uppercase tracking-widest text-bank-muted">{label}</dt>
                  <dd className="mt-1 font-bold text-bank-navy">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 grid gap-3 md:grid-cols-3 lg:grid-cols-1">
              <MiniCue icon={Route} label="Route" value="Shenzhen - HK - Vietnam" />
              <MiniCue icon={CalendarClock} label="Payment term" value="60 days" />
              <MiniCue icon={FileCheck2} label="Review mode" value="Officer-assisted" />
            </div>
          </div>
          <UploadVisual />
        </div>
      </DemoPanel>
    </DemoShell>
  );
}

function MiniCue({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-bank-line bg-white p-3">
      <Icon className="text-bank-blue" size={17} />
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-bank-muted">{label}</p>
        <p className="text-sm font-bold text-bank-navy">{value}</p>
      </div>
    </div>
  );
}
