import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { extractedFields, verificationRows } from "@/data/tradesafe";
import { DemoPanel, DemoShell } from "@/components/demo-shell";
import { StatusBadge } from "@/components/ui";

export default function VerificationPage() {
  return (
    <DemoShell pathname="/demo/verification">
      <DemoPanel
        title="AI Document Verification"
        actions={<Link href="/demo/risk-dashboard" className="rounded-md bg-bank-red px-5 py-3 text-sm font-bold text-white">View Risk Dashboard</Link>}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="font-bold text-bank-navy">Extracted Fields</h3>
            <div className="mt-4 overflow-hidden rounded-lg border border-bank-line">
              <table className="w-full text-left text-sm">
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
