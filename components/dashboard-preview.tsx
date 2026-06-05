import { ShieldCheck } from "lucide-react";

const rows = [
  ["Creditworthiness Score", "78 / 100", "bg-blue-50 text-bank-blue"],
  ["Transaction Authenticity Score", "85 / 100", "bg-green-50 text-green-700"],
  ["AML / Fraud Risk", "Medium", "bg-amber-50 text-amber-700"]
];

export function DashboardPreview() {
  return (
    <div className="rounded-lg border border-bank-line bg-white p-5 shadow-panel">
      <div className="flex items-center justify-between border-b border-bank-line pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-bank-red">Live Case Preview</p>
          <h3 className="mt-1 text-lg font-bold text-bank-navy">HK Smart Components Ltd</h3>
        </div>
        <div className="grid h-11 w-11 place-items-center rounded-md bg-bank-navy text-white">
          <ShieldCheck size={22} />
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {rows.map(([label, value, className]) => (
          <div key={label} className="flex items-center justify-between rounded-md border border-bank-line bg-bank-bg p-4">
            <span className="text-sm font-semibold text-bank-muted">{label}</span>
            <strong className={`rounded-full px-3 py-1 text-sm ${className}`}>{value}</strong>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-md bg-bank-navy p-4 text-white">
        <p className="text-xs uppercase tracking-widest text-white/70">Recommendation</p>
        <p className="mt-2 text-xl font-bold">Approve with conditions</p>
        <p className="mt-2 text-sm leading-6 text-white/75">Evidence links, KYB checks and audit hashes are ready for officer review.</p>
      </div>
    </div>
  );
}
