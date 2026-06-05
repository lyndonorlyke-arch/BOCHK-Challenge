import { AlertTriangle, CheckCircle2, FileText, ShieldCheck } from "lucide-react";

const rows = [
  ["Creditworthiness Score", "78 / 100", "bg-blue-50 text-bank-blue"],
  ["Transaction Authenticity Score", "85 / 100", "bg-green-50 text-green-700"],
  ["AML / Fraud Risk", "Medium", "bg-amber-50 text-amber-700"]
];

const evidence = [
  ["5", "Docs checked", FileText],
  ["2", "Risk flags", AlertTriangle],
  ["3", "Officer conditions", CheckCircle2]
] as const;

export function DashboardPreview() {
  return (
    <div className="rounded-lg border border-bank-line bg-white p-5 shadow-panel">
      <div className="flex items-center justify-between border-b border-bank-line pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-bank-red">Officer Decision Cockpit</p>
          <h3 className="mt-1 text-lg font-bold text-bank-navy">HK Smart Components Ltd</h3>
          <p className="mt-1 text-sm font-semibold text-bank-muted">HK$800,000 trade finance request</p>
        </div>
        <div className="grid h-11 w-11 place-items-center rounded-md bg-bank-navy text-white">
          <ShieldCheck size={22} />
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {evidence.map(([value, label, Icon]) => (
          <div key={label} className="rounded-md border border-bank-line bg-bank-bg p-3">
            <Icon className="text-bank-blue" size={18} />
            <p className="mt-2 text-xl font-bold text-bank-navy">{value}</p>
            <p className="text-xs font-semibold leading-4 text-bank-muted">{label}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 space-y-3">
        {rows.map(([label, value, className]) => (
          <div key={label} className="rounded-md border border-bank-line bg-bank-bg p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-bank-muted">{label}</span>
              <strong className={`rounded-full px-3 py-1 text-sm ${className}`}>{value}</strong>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-white">
              <div className={`h-1.5 rounded-full ${label.includes("Authenticity") ? "bg-green-600" : label.includes("AML") ? "bg-amber-500" : "bg-bank-blue"}`} style={{ width: label.includes("Authenticity") ? "85%" : label.includes("AML") ? "62%" : "78%" }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-md bg-bank-navy p-4 text-white">
        <p className="text-xs uppercase tracking-widest text-white/70">Recommendation</p>
        <p className="mt-2 text-xl font-bold">Approve with conditions</p>
        <p className="mt-2 text-sm leading-6 text-white/75">Enhanced KYB, missing logistics document, final officer approval.</p>
      </div>
    </div>
  );
}
