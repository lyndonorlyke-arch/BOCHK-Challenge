export function KpiCard({
  label,
  value,
  detail,
  trend
}: {
  label: string;
  value: string;
  detail: string;
  trend?: string;
}) {
  return (
    <article className="rounded-lg border border-bank-line bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-wide text-bank-muted">{label}</p>
        {trend ? <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">{trend}</span> : null}
      </div>
      <p className="mt-3 text-2xl font-bold text-bank-navy">{value}</p>
      <p className="mt-2 text-sm leading-5 text-bank-muted">{detail}</p>
    </article>
  );
}
