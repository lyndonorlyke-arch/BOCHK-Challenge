import Link from "next/link";
import { caseProfile } from "@/data/tradesafe";
import { DemoPanel, DemoShell } from "@/components/demo-shell";
import { UploadVisual } from "@/components/landing-sections";

export default function UploadPage() {
  return (
    <DemoShell pathname="/demo/upload">
      <DemoPanel
        title="Application Upload"
        actions={<Link href="/demo/verification" className="rounded-md bg-bank-red px-5 py-3 text-sm font-bold text-white">Run AI Analysis</Link>}
      >
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg bg-bank-bg p-5">
            <h3 className="font-bold text-bank-navy">Application Form</h3>
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
          </div>
          <UploadVisual />
        </div>
      </DemoPanel>
    </DemoShell>
  );
}
