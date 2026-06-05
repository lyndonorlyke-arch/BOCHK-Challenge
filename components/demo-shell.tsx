import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock3, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { caseProfile, demoSteps } from "@/data/tradesafe";
import { Logo } from "@/components/ui";

export function DemoShell({ children, pathname }: { children: React.ReactNode; pathname: string }) {
  const active = demoSteps.some((step) => step.href === pathname);
  const activeIndex = demoSteps.findIndex((step) => step.href === pathname);

  if (!active) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bank-bg">
      <header className="border-b border-bank-line bg-white">
        <div className="section-shell flex min-h-16 items-center justify-between gap-4">
          <Logo />
          <Link href="/backoffice" className="inline-flex items-center gap-2 text-sm font-bold text-bank-muted hover:text-bank-navy">
            <ArrowLeft size={16} />
            Back to application queue
          </Link>
        </div>
      </header>
      <div className="section-shell grid gap-6 py-6 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-lg border border-bank-line bg-white p-4 shadow-subtle">
          <p className="px-3 pb-3 text-xs font-bold uppercase tracking-widest text-bank-red">2-minute demo flow</p>
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
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-md ${isActive ? "bg-white/15" : index < activeIndex ? "bg-green-50 text-green-700" : "bg-bank-bg"}`}>
                    {index < activeIndex ? <CheckCircle2 size={16} /> : <Icon size={16} />}
                  </span>
                  <span>{index + 1}. {step.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="mt-5 rounded-md border border-bank-line bg-bank-bg p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-bank-muted">Judge cue</p>
            <p className="mt-2 text-sm font-semibold leading-5 text-bank-navy">Each screen answers one question: can BOCHK trust the applicant, trade evidence and audit record?</p>
          </div>
        </aside>
        <main className="space-y-6">
          <MobileStepNav pathname={pathname} activeIndex={activeIndex} />
          <CaseBanner activeIndex={activeIndex} />
          {children}
        </main>
      </div>
    </div>
  );
}

function MobileStepNav({ pathname, activeIndex }: { pathname: string; activeIndex: number }) {
  return (
    <nav className="flex gap-2 overflow-x-auto rounded-lg border border-bank-line bg-white p-2 shadow-subtle lg:hidden" aria-label="Demo steps">
      {demoSteps.map((step, index) => {
        const isActive = step.href === pathname;
        return (
          <Link
            key={step.href}
            href={step.href}
            className={`min-w-fit rounded-md px-3 py-2 text-xs font-bold ${isActive ? "bg-bank-navy text-white" : index < activeIndex ? "bg-green-50 text-green-700" : "bg-bank-bg text-bank-muted"}`}
          >
            {index + 1}. {step.label}
          </Link>
        );
      })}
    </nav>
  );
}

function CaseBanner({ activeIndex }: { activeIndex: number }) {
  return (
    <section className="overflow-hidden rounded-lg border border-bank-line bg-white shadow-subtle">
      <div className="grid gap-4 p-5 md:grid-cols-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-bank-red">Applicant</p>
          <h1 className="mt-1 text-xl font-bold text-bank-navy">{caseProfile.company}</h1>
        </div>
        <BannerItem label="Financing Request" value={caseProfile.request} />
        <BannerItem label="Status" value={caseProfile.status} />
        <BannerItem label="Recommendation" value={caseProfile.recommendation} highlight />
      </div>
      <div className="grid border-t border-bank-line bg-bank-panel md:grid-cols-3">
        <StatusCue icon={Clock3} label="Current step" value={`${activeIndex + 1} of ${demoSteps.length}`} />
        <StatusCue icon={ShieldCheck} label="Control model" value="Human-in-the-loop" />
        <StatusCue icon={CheckCircle2} label="Evidence state" value={activeIndex >= 2 ? "Scores generated" : "Verification in progress"} />
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

function StatusCue({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-bank-line p-4 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-white text-bank-blue shadow-subtle">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-bank-muted">{label}</p>
        <p className="mt-1 text-sm font-bold text-bank-navy">{value}</p>
      </div>
    </div>
  );
}

export function DemoPanel({ title, subtitle, children, actions }: { title: string; subtitle?: string; children: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-bank-line bg-white p-4 shadow-subtle md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-bank-navy">{title}</h2>
          {subtitle ? <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-bank-muted">{subtitle}</p> : null}
        </div>
        {actions}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
