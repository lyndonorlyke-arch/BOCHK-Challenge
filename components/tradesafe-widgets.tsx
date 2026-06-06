import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Info, TriangleAlert } from "lucide-react";

export function MetricCard({
  icon: Icon,
  label,
  value,
  change,
  tone = "red"
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: string;
  tone?: "red" | "green" | "amber" | "blue";
}) {
  const toneClass = {
    red: "bg-red-50 text-bank-red",
    green: "bg-green-50 text-green-700",
    amber: "bg-amber-50 text-amber-600",
    blue: "bg-blue-50 text-bank-blue"
  }[tone];
  return (
    <article className="min-w-0 rounded-lg border border-bank-line bg-white p-5 shadow-sm">
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${toneClass}`}>
        <Icon size={20} />
      </span>
      <p className="mt-4 min-h-10 text-sm font-semibold leading-5 text-bank-muted">{label}</p>
      <p className="mt-2 break-words text-[clamp(1.75rem,2.2vw,2.35rem)] font-bold leading-tight text-bank-navy">{value}</p>
      {change ? <p className="mt-3 text-xs font-bold leading-5 text-green-700">{change}</p> : null}
    </article>
  );
}

export function ScoreCard({
  title,
  value,
  total = "100",
  label,
  tone = "red"
}: {
  title: string;
  value: number;
  total?: string;
  label: string;
  tone?: "red" | "green" | "amber";
}) {
  const bar = tone === "green" ? "bg-green-600" : tone === "amber" ? "bg-amber-500" : "bg-bank-red";
  const text = tone === "green" ? "text-green-700" : tone === "amber" ? "text-amber-600" : "text-green-700";
  return (
    <article className="rounded-lg border border-bank-line bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <h3 className="font-bold text-bank-navy">{title}</h3>
        <Info size={15} className="text-bank-muted" />
      </div>
      <p className="mt-6 text-3xl font-bold text-bank-navy">
        {value} <span className="text-lg font-semibold">/ {total}</span>
      </p>
      <div className="mt-5 h-4 rounded-full bg-slate-100">
        <div className={`h-4 rounded-full ${bar}`} style={{ width: `${value}%` }} />
      </div>
      <p className={`mt-4 text-sm font-bold ${text}`}>{label}</p>
    </article>
  );
}

export function ProgressBar({ value, tone = "green" }: { value: number; tone?: "green" | "amber" | "red" | "blue" }) {
  const color = {
    green: "bg-green-600",
    amber: "bg-amber-500",
    red: "bg-bank-red",
    blue: "bg-bank-blue"
  }[tone];
  return (
    <div className="h-2.5 w-full rounded-full bg-slate-100">
      <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${value}%` }} />
    </div>
  );
}

export function StatusPill({
  children,
  tone
}: {
  children: React.ReactNode;
  tone: "green" | "amber" | "red" | "blue" | "neutral";
}) {
  const style = {
    green: "border-green-200 bg-green-50 text-green-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    red: "border-red-200 bg-red-50 text-red-700",
    blue: "border-blue-200 bg-blue-50 text-bank-blue",
    neutral: "border-slate-200 bg-slate-50 text-slate-700"
  }[tone];
  return <span className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-bold ${style}`}>{children}</span>;
}

export function MiniLineChart() {
  const points = "10,66 60,58 110,48 160,58 210,56 260,66 310,57 360,65 410,55 460,63 510,54 560,60";
  const pointsTwo = "10,96 60,93 110,88 160,83 210,86 260,96 310,82 360,86 410,87 460,91 510,88 560,82";
  return (
    <div className="h-52 overflow-hidden rounded-md bg-white">
      <svg viewBox="0 0 580 160" className="h-full w-full" role="img" aria-label="12-month cash flow trend">
        <defs>
          <linearGradient id="cashFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#c8102e" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#c8102e" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[30, 60, 90, 120].map((y) => (
          <line key={y} x1="8" x2="570" y1={y} y2={y} stroke="#e5eaf2" strokeWidth="1" />
        ))}
        <path d={`M ${points} L 560,135 L 10,135 Z`} fill="url(#cashFill)" />
        <polyline points={pointsTwo} fill="none" stroke="#94a3b8" strokeWidth="3" />
        <polyline points={points} fill="none" stroke="#c8102e" strokeWidth="3" />
        {points.split(" ").map((point) => {
          const [x, y] = point.split(",");
          return <circle key={point} cx={x} cy={y} r="4" fill="white" stroke="#c8102e" strokeWidth="2" />;
        })}
      </svg>
    </div>
  );
}

export function DonutChart() {
  const segments = [
    ["#c8102e", "0 0 50 50"],
    ["#ef6f7d", "50 0 68 68"],
    ["#64748b", "68 0 79 79"],
    ["#94a3b8", "79 0 88 88"],
    ["#d6d3cc", "88 0 100 100"]
  ];
  return (
    <div className="relative mx-auto h-44 w-44">
      <svg viewBox="0 0 42 42" className="h-full w-full -rotate-90" role="img" aria-label="Buyer concentration donut chart">
        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#edf1f6" strokeWidth="7" />
        {segments.map(([color, dash]) => (
          <circle key={color} cx="21" cy="21" r="15.915" fill="transparent" stroke={color} strokeDasharray={dash} strokeWidth="7" />
        ))}
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="text-xl font-bold text-bank-navy">100%</p>
          <p className="text-xs font-semibold text-bank-muted">by trade value</p>
        </div>
      </div>
    </div>
  );
}

export function GaugeChart({ score = 58 }: { score?: number }) {
  return (
    <div className="mx-auto grid h-36 w-44 place-items-center">
      <svg viewBox="0 0 180 120" className="h-full w-full" role="img" aria-label={`Risk score ${score} out of 100`}>
        <path d="M35 92 A55 55 0 0 1 145 92" fill="none" stroke="#e5e7eb" strokeWidth="14" strokeLinecap="round" />
        <path d="M35 92 A55 55 0 0 1 69 41" fill="none" stroke="#15915b" strokeWidth="14" strokeLinecap="round" />
        <path d="M69 41 A55 55 0 0 1 118 50" fill="none" stroke="#f59e0b" strokeWidth="14" strokeLinecap="round" />
        <path d="M118 50 A55 55 0 0 1 145 92" fill="none" stroke="#d1d5db" strokeWidth="14" strokeLinecap="round" />
        <line x1="90" y1="92" x2="119" y2="58" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
        <circle cx="90" cy="92" r="7" fill="#334155" />
      </svg>
      <p className="-mt-10 text-sm font-bold text-bank-navy">Score: {score} / 100</p>
    </div>
  );
}

export function AlertRow({ children, tone = "red" }: { children: React.ReactNode; tone?: "red" | "green" | "amber" }) {
  const Icon = tone === "green" ? CheckCircle2 : TriangleAlert;
  const color = tone === "green" ? "text-green-700" : tone === "amber" ? "text-amber-600" : "text-bank-red";
  return (
    <li className="flex items-start gap-2 text-sm font-semibold leading-6 text-bank-navy">
      <Icon className={`mt-1 shrink-0 ${color}`} size={16} />
      <span>{children}</span>
    </li>
  );
}
