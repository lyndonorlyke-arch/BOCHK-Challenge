import { Fingerprint, LockKeyhole } from "lucide-react";
import { auditRows } from "@/data/tradesafe";
import { DemoPanel, DemoShell } from "@/components/demo-shell";

export default function AuditTrailPage() {
  return (
    <DemoShell pathname="/demo/audit-trail">
      <DemoPanel title="Audit Trail">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="overflow-hidden rounded-lg border border-bank-line">
            <table className="w-full text-left text-sm">
              <tbody>
                {auditRows.map(([label, value]) => (
                  <tr key={label} className="border-b border-bank-line bg-white last:border-b-0">
                    <th className="bg-bank-bg p-4 font-bold text-bank-muted">{label}</th>
                    <td className="p-4 font-mono font-bold text-bank-navy">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-lg bg-bank-navy p-6 text-white">
            <div className="grid h-12 w-12 place-items-center rounded-md bg-white/12">
              <Fingerprint size={24} />
            </div>
            <h3 className="mt-5 text-2xl font-bold">Tamper-evident, privacy-aware records</h3>
            <p className="mt-4 text-sm leading-6 text-white/75">
              Sensitive customer documents are not stored on-chain. Only document hashes, report hashes, timestamps and approval actions are recorded for auditability.
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-md border border-white/15 bg-white/8 p-4">
              <LockKeyhole size={20} />
              <p className="text-sm font-bold">Private deployment, encryption and officer access control remain mandatory.</p>
            </div>
          </div>
        </div>
      </DemoPanel>
    </DemoShell>
  );
}
