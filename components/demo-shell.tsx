import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { caseProfile, demoSteps } from "@/data/tradesafe";
import { Logo } from "@/components/ui";

export function DemoShell({ children, pathname }: { children: React.ReactNode; pathname: string }) {
  const active = demoSteps.some((step) => step.href === pathname);

  if (!active) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bank-bg">
      <header className="border-b border-bank-line bg-white">
        <div className="section-shell flex min-h-16 items-center justify-between gap-4">
          <Logo />
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-bank-muted hover:text-bank-navy">
            <ArrowLeft size={16} />
            Back to overview
          </Link>
        </div>
      </header>
      <div className="section-shell grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-lg border border-bank-line bg-white p-4 shadow-subtle">
          <p className="px-3 pb-3 text-xs font-bold uppercase tracking-widest text-bank-red">Demo Flow</p>
          <nav className="space-y-2">
            {demoSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.href === pathname;
              return (
                <Link
                  key={step.href}
                  href={step.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-3 text-sm font-bold ${
                    isActive ? "bg-bank-navy text-white" : "text-bank-muted hover:bg-bank-bg hover:text-bank-navy"
                  }`}
                >
                  <span className={`grid h-7 w-7 place-items-center rounded-md ${isActive ? "bg-white/15" : "bg-bank-bg"}`}>
                    <Icon size={16} />
                  </span>
                  <span>{index + 1}. {step.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="space-y-6">
          <CaseBanner />
          {children}
        </main>
      </div>
    </div>
  );
}

function CaseBanner() {
  return (
    <section className="rounded-lg border border-bank-line bg-white p-5 shadow-subtle">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="text-xs font-bold uppercase tracking-widest text-bank-red">Applicant</p>
          <h1 className="mt-1 text-xl font-bold text-bank-navy">{caseProfile.company}</h1>
        </div>
        <BannerItem label="Financing Request" value={caseProfile.request} />
        <BannerItem label="Status" value={caseProfile.status} />
        <BannerItem label="Recommendation" value={caseProfile.recommendation} highlight />
      </div>
    </section>
  );
}

function BannerItem({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-bank-muted">{label}</p>
      <p className={`mt-1 text-base font-bold ${highlight ? "text-bank-red" : "text-bank-navy"}`}>{value}</p>
    </div>
  );
}

export function DemoPanel({ title, children, actions }: { title: string; children: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-bank-line bg-white p-6 shadow-subtle">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h2 className="text-2xl font-bold text-bank-navy">{title}</h2>
        {actions}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
