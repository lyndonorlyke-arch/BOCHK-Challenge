import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="TradeSafe home">
      <span className="grid h-9 w-9 place-items-center rounded-md bg-bank-red">
        <span className="h-4 w-4 rotate-45 border-2 border-white" />
      </span>
      <span className="text-lg font-bold tracking-normal text-bank-navy">TradeSafe</span>
    </Link>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  body,
  align = "left",
  inverse = false
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  inverse?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="mb-3 text-sm font-bold uppercase tracking-widest text-bank-red">{eyebrow}</p> : null}
      <h2 className={`text-3xl font-bold tracking-normal md:text-4xl ${inverse ? "text-white" : "text-bank-navy"}`}>{title}</h2>
      {body ? <p className={`mt-4 text-base leading-7 md:text-lg ${inverse ? "text-white/72" : "text-bank-muted"}`}>{body}</p> : null}
    </div>
  );
}

export function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex min-h-11 items-center justify-center rounded-md bg-bank-red px-5 py-3 text-sm font-bold text-white shadow-subtle ring-1 ring-bank-red/10 hover:bg-bank-darkRed">
      {children}
    </Link>
  );
}

export function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex min-h-11 items-center justify-center rounded-md border border-bank-line bg-white px-5 py-3 text-sm font-bold text-bank-navy hover:border-bank-blue">
      {children}
    </Link>
  );
}

export function InfoCard({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  return (
    <article className="rounded-lg border border-bank-line bg-white p-6 shadow-subtle">
      <div className="mb-5 grid h-11 w-11 place-items-center rounded-md bg-bank-bg text-bank-blue">
        <Icon size={22} />
      </div>
      <h3 className="text-lg font-bold text-bank-navy">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-bank-muted">{body}</p>
    </article>
  );
}

export function KPIcard({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  return (
    <article className="rounded-lg border border-bank-line bg-white p-5">
      <div className="flex items-start gap-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-bank-navy text-white">
          <Icon size={19} />
        </div>
        <div>
          <h3 className="font-bold text-bank-navy">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-bank-muted">{body}</p>
        </div>
      </div>
    </article>
  );
}

export function StatusBadge({ status }: { status: "success" | "warning" | "risk" | "neutral" }) {
  const map = {
    success: "bg-green-50 text-green-700 border-green-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    risk: "bg-red-50 text-red-700 border-red-200",
    neutral: "bg-slate-50 text-slate-700 border-slate-200"
  };
  const label = {
    success: "Match",
    warning: "Review Needed",
    risk: "High Risk",
    neutral: "Recorded"
  };
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${map[status]}`}>{label[status]}</span>;
}

export function RiskScoreCard({ title, score, label, tone }: { title: string; score: string; label: string; tone: "green" | "amber" | "red" | "blue" }) {
  const toneClasses = {
    green: "text-green-700 bg-green-50 border-green-200",
    amber: "text-amber-700 bg-amber-50 border-amber-200",
    red: "text-red-700 bg-red-50 border-red-200",
    blue: "text-bank-blue bg-blue-50 border-blue-200"
  };

  return (
    <article className="rounded-lg border border-bank-line bg-white p-6 shadow-subtle">
      <p className="text-sm font-bold text-bank-muted">{title}</p>
      <div className="mt-4 flex items-end justify-between gap-4">
        <strong className="text-4xl font-bold text-bank-navy">{score}</strong>
        <span className={`rounded-full border px-3 py-1 text-xs font-bold ${toneClasses[tone]}`}>{label}</span>
      </div>
      <div className="mt-5 h-2 rounded-full bg-bank-bg">
        <div className={`h-2 rounded-full ${tone === "green" ? "bg-green-600" : tone === "amber" ? "bg-amber-500" : tone === "red" ? "bg-red-600" : "bg-bank-blue"}`} style={{ width: score.includes("85") ? "85%" : score.includes("78") ? "78%" : "62%" }} />
      </div>
    </article>
  );
}

export function MetricTile({ label, value, body, inverse = false }: { label: string; value: string; body: string; inverse?: boolean }) {
  return (
    <article className={`rounded-lg border p-4 ${inverse ? "border-white/15 bg-white/10 text-white" : "border-bank-line bg-white text-bank-navy shadow-subtle"}`}>
      <p className={`text-xs font-bold uppercase tracking-widest ${inverse ? "text-white/60" : "text-bank-muted"}`}>{label}</p>
      <p className={`mt-2 text-2xl font-bold ${inverse ? "text-white" : "text-bank-navy"}`}>{value}</p>
      <p className={`mt-2 text-sm leading-5 ${inverse ? "text-white/70" : "text-bank-muted"}`}>{body}</p>
    </article>
  );
}
