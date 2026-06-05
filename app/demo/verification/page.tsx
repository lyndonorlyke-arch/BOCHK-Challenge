import Link from "next/link";
import { AlertTriangle, CheckCircle2, ScanSearch } from "lucide-react";
import { extractedFields, verificationRows } from "@/data/tradesafe";
import { DemoPanel, DemoShell } from "@/components/demo-shell";
import { StatusBadge } from "@/components/ui";

export default function VerificationPage() {
  return (
    <DemoShell pathname="/demo/verification">
      <DemoPanel
        title="AI Document Verification"
        subtitle="The system extracts key trade fields and highlights consistency checks before any risk score is trusted."
        actions={<Link href="/demo/risk-dashboard" className="rounded-md bg-bank-red px-5 py-3 text-sm font-bold text-white">View Risk Dashboard</Link>}
      >
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          {[
            ["Fields extracted", "7", "Buyer, seller, supplier, amount, goods, term and destination", "success"],
            ["Consistency checks", "5", "Invoice, contract, payment and shipping evidence compared", "success"],
            ["Review items", "2", "New buyer and missing logistics evidence need officer attention", "warning"]
          ].map(([label, value, body, tone]) => (
            <article key={label} className="rounded-lg border border-bank-line bg-bank-bg p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-widest text-bank-muted">{label}</p>
                {tone === "warning" ? <AlertTriangle className="text-amber-600" size={18} /> : <ScanSearch className="text-bank-blue" size={18} />}
              </div>
              <p className="mt-2 text-3xl font-bold text-bank-navy">{value}</p>
              <p className="mt-2 text-sm leading-5 text-bank-muted">{body}</p>
            </article>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="font-bold text-bank-navy">Extracted Fields</h3>
            <div className="mt-4 overflow-x-auto rounded-lg border border-bank-line">
              <table className="w-full min-w-[480px] text-left text-sm">
                <tbody>
                  {extractedFields.map(([label, value]) => (
                    <tr key={label} className="border-b border-bank-line last:border-b-0">
                      <th className="bg-bank-bg p-4 font-bold text-bank-muted">{label}</th>
                      <td className="p-4 font-semibold text-bank-navy">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-bank-navy">Verification Results</h3>
            <div className="mt-4 space-y-3">
              {verificationRows.map(([label, value, status]) => (
                <article key={label} className="flex items-center justify-between gap-4 rounded-lg border border-bank-line bg-bank-bg p-4">
                  <div className="flex gap-3">
                    <CheckCircle2 className={status === "success" ? "text-green-600" : "text-amber-600"} size={19} />
                    <div>
                      <p className="font-bold text-bank-navy">{label}</p>
                      <p className="mt-1 text-sm text-bank-muted">{value}</p>
                    </div>
                  </div>
                  <StatusBadge status={status} />
                </article>
              ))}
            </div>
          </div>
        </div>
      </DemoPanel>
    </DemoShell>
  );
}
