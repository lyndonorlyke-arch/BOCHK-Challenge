"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { ArrowRight, CheckCircle2, FileUp, ShieldCheck } from "lucide-react";
import {
  architectureLayers,
  buyerConcentration,
  cashFlowData,
  caseProfile,
  demoFlowCards,
  featureCards,
  governanceRows,
  heroMetrics,
  impactKpis,
  judgeTakeaways,
  positiveSignals,
  problemCards,
  riskFlags,
  roadmap,
  routeSteps,
  solutionColumns,
  workflowSteps
} from "@/data/tradesafe";
import { DashboardPreview } from "@/components/dashboard-preview";
import { InfoCard, KPIcard, MetricTile, PrimaryButton, RiskScoreCard, SecondaryButton, SectionHeader } from "@/components/ui";

const pieColors = ["#123B6D", "#C8102E", "#16A34A", "#F59E0B"];

export function HeroSection() {
  return (
    <section className="bank-grid bg-white py-10 md:py-14">
      <div className="section-shell grid items-center gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-bank-line bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-bank-red shadow-subtle">
            BOCHK Challenge 2026 Proposal
          </div>
          <h1 className="mt-5 text-4xl font-bold tracking-normal text-bank-navy md:text-6xl">
            TradeSafe Credit Co-pilot
          </h1>
          <p className="mt-5 max-w-2xl text-xl font-semibold leading-8 text-bank-blue">
            Turn SME trade documents into auditable credit risk intelligence for BOCHK credit officers.
          </p>
          <ul className="mt-6 grid gap-3">
            {judgeTakeaways.map((item) => (
              <li key={item} className="flex gap-3 rounded-md border border-bank-line bg-white p-3 text-sm font-semibold text-bank-muted shadow-subtle">
                <CheckCircle2 className="mt-0.5 shrink-0 text-green-600" size={16} />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <PrimaryButton href="/backoffice">Start Live Demo</PrimaryButton>
            <SecondaryButton href="#solution">View Solution Overview</SecondaryButton>
          </div>
        </div>
        <DashboardPreview />
      </div>
      <div className="section-shell mt-8 grid gap-4 md:grid-cols-3">
        {heroMetrics.map(([label, value, body]) => (
          <MetricTile key={label} label={label} value={value} body={body} />
        ))}
      </div>
    </section>
  );
}

export function ProblemSection() {
  return (
    <section id="problem" className="py-16 md:py-20">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Why this matters"
          title="Cross-border SME trade finance is data-rich but decision-poor"
          body="The bottleneck is not the absence of files. It is turning scattered evidence into a decision record a bank can trust."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {problemCards.map((card) => (
            <InfoCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function TargetScenarioSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="section-shell">
        <SectionHeader title="Use Case: A Hong Kong SME applies for trade financing" />
        <div className="mt-10 grid gap-6 rounded-lg border border-bank-line bg-bank-bg p-6 shadow-subtle lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg bg-white p-6">
            <h3 className="text-2xl font-bold text-bank-navy">{caseProfile.company}</h3>
            <dl className="mt-6 grid gap-4 text-sm">
              {[
                ["Business", caseProfile.business],
                ["Trade Route", caseProfile.route],
                ["Financing Request", caseProfile.request],
                ["Tenor", caseProfile.tenor],
                ["Purpose", caseProfile.purpose],
                ["Uploaded Documents", "Invoice, contract, shipping document, 12-month payment record"]
              ].map(([label, value]) => (
                <div key={label} className="grid gap-1 border-b border-bank-line pb-3">
                  <dt className="font-bold text-bank-muted">{label}</dt>
                  <dd className="font-semibold text-bank-navy">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6">
              <PrimaryButton href="/demo/upload">Analyse This Case</PrimaryButton>
            </div>
          </div>
          <div className="grid content-center gap-4">
            {routeSteps.map(([title, subtitle], index) => (
              <div key={title} className="flex items-center gap-4">
                <div className="min-w-0 flex-1 rounded-lg border border-bank-line bg-white p-5">
                  <p className="text-sm font-bold text-bank-red">{subtitle}</p>
                  <p className="mt-1 text-xl font-bold text-bank-navy">{title}</p>
                </div>
                {index < routeSteps.length - 1 ? <ArrowRight className="hidden shrink-0 text-bank-blue md:block" /> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SolutionSection() {
  return (
    <section id="solution" className="py-16 md:py-20">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Banking workflow"
          title="Our Solution: TradeSafe Credit Co-pilot"
          body="A governed assistant for relationship managers, credit officers and compliance teams. AI prepares evidence; BOCHK officers retain final decision authority."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {solutionColumns.map(({ title, icon: Icon, items }) => (
            <article key={title} className="rounded-lg border border-bank-line bg-white p-6 shadow-subtle">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-md bg-bank-navy text-white">
                  <Icon size={20} />
                </div>
                <h3 className="text-xl font-bold text-bank-navy">{title}</h3>
              </div>
              <ul className="mt-6 space-y-3">
                {items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-semibold text-bank-muted">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-green-600" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WorkflowSection() {
  return (
    <section className="bg-bank-navy py-16 text-white md:py-20">
      <div className="section-shell">
        <SectionHeader title="How It Works" body="A controlled workflow that turns raw trade evidence into reviewable credit intelligence." inverse />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {workflowSteps.map((step, index) => (
            <article key={step} className="rounded-lg border border-white/15 bg-white/8 p-4">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-bank-red text-sm font-bold">{index + 1}</span>
              <p className="mt-4 text-sm font-bold leading-6">{step}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {["Human-in-the-loop", "Evidence-linked AI", "Tamper-evident audit trail"].map((badge) => (
            <span key={badge} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DemoEntrySection() {
  return (
    <section id="demo" className="py-16 md:py-20">
      <div className="section-shell">
        <div className="overflow-hidden rounded-lg border border-bank-line bg-white shadow-panel">
          <div className="grid items-center gap-8 border-b border-bank-line p-8 md:p-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-bank-red">Try the Trade Finance Risk Demo</p>
              <h2 className="mt-3 text-3xl font-bold text-bank-navy">Understand the complete case in under 2 minutes.</h2>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-bank-muted">
                Follow one SME application from upload to verification, risk dashboard, credit memo and privacy-preserving audit record.
              </p>
            </div>
              <PrimaryButton href="/backoffice">Start Demo</PrimaryButton>
          </div>
          <div className="grid gap-0 md:grid-cols-5">
            {demoFlowCards.map(([step, title, body]) => (
              <article key={title} className="border-b border-bank-line p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-bank-navy text-sm font-bold text-white">{step}</span>
                <h3 className="mt-4 font-bold text-bank-navy">{title}</h3>
                <p className="mt-2 text-sm leading-5 text-bank-muted">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CoreFeaturesSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="section-shell">
        <SectionHeader title="Core Capabilities" align="center" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {featureCards.map((card) => (
            <InfoCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ArchitectureSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="section-shell">
        <SectionHeader eyebrow="Architecture" title="Technology Architecture" body="GenAI explains. Big Data scores. Blockchain audits. Human officers decide." />
        <div className="mt-10 grid gap-4">
          {architectureLayers.map(({ title, body, icon: Icon }, index) => (
            <article key={title} className="grid gap-4 rounded-lg border border-bank-line bg-white p-5 shadow-subtle md:grid-cols-[220px_1fr_40px] md:items-center">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-md bg-bank-blue text-white">
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-bank-navy">{title}</h3>
              </div>
              <p className="text-sm leading-6 text-bank-muted">{body}</p>
              <span className="text-sm font-bold text-bank-red">L{index + 1}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ImpactSection() {
  return (
    <section id="impact" className="bg-white py-16 md:py-20">
      <div className="section-shell">
        <SectionHeader eyebrow="Business value" title="Business Impact for BOCHK" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {impactKpis.map(([title, body, icon]) => (
            <KPIcard key={title} title={title} body={body} icon={icon} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function GovernanceSection() {
  return (
    <section id="governance" className="py-16 md:py-20">
      <div className="section-shell">
        <SectionHeader title="Built for Banking Governance" />
        <div className="mt-10 overflow-x-auto rounded-lg border border-bank-line bg-white shadow-subtle">
          <table className="w-full min-w-[620px] border-collapse text-left text-sm">
            <thead className="bg-bank-navy text-white">
              <tr>
                <th className="p-4">Risk</th>
                <th className="p-4">Design Control</th>
              </tr>
            </thead>
            <tbody>
              {governanceRows.map(([risk, control]) => (
                <tr key={risk} className="border-b border-bank-line last:border-b-0">
                  <td className="p-4 font-bold text-bank-navy">{risk}</td>
                  <td className="p-4 text-bank-muted">{control}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 rounded-lg border-l-4 border-bank-red bg-white p-5 text-lg font-bold text-bank-navy shadow-subtle">
          The AI system will not automatically approve or reject SME loans. Final credit decisions remain with BOCHK credit officers.
        </div>
      </div>
    </section>
  );
}

export function RoadmapSection() {
  return (
    <section id="roadmap" className="bg-bank-navy py-16 text-white md:py-20">
      <div className="section-shell">
        <SectionHeader title="Roadmap from MVP to BOCHK Pilot" inverse />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {roadmap.map((item) => (
            <article key={item.phase} className="rounded-lg border border-white/15 bg-white/8 p-5">
              <p className="text-sm font-bold text-red-200">{item.phase}</p>
              <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
              <p className="mt-1 text-sm font-bold text-white/65">{item.timing}</p>
              <ul className="mt-5 space-y-3">
                {item.items.map((entry) => (
                  <li key={entry} className="text-sm leading-6 text-white/80">{entry}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClosingSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="section-shell text-center">
        <h2 className="mx-auto max-w-3xl text-4xl font-bold text-bank-navy">Turn fragmented trade data into auditable risk intelligence.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-bank-muted">TradeSafe helps BOCHK make faster, safer and more inclusive cross-border SME financing decisions.</p>
        <div className="mt-8">
          <PrimaryButton href="/backoffice">Start Live Demo</PrimaryButton>
        </div>
      </div>
    </section>
  );
}

export function MiniRiskVisual() {
  const [chartsReady, setChartsReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setChartsReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <RiskScoreCard title="Creditworthiness Score" score="78 / 100" label="Medium-low risk" tone="blue" />
      <RiskScoreCard title="Transaction Authenticity Score" score="85 / 100" label="Broadly consistent" tone="green" />
      <RiskScoreCard title="AML / Fraud Risk" score="Medium" label="Enhanced KYB" tone="amber" />
      <div className="rounded-lg border border-bank-line bg-white p-5 shadow-subtle lg:col-span-2">
        <h3 className="font-bold text-bank-navy">12-month cash-flow</h3>
        <div className="mt-4 h-64">
          {chartsReady ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashFlowData}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="inflow" stroke="#123B6D" fill="#123B6D" fillOpacity={0.14} />
                <Area type="monotone" dataKey="outflow" stroke="#C8102E" fill="#C8102E" fillOpacity={0.08} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full rounded-md bg-bank-bg" />
          )}
        </div>
      </div>
      <div className="rounded-lg border border-bank-line bg-white p-5 shadow-subtle">
        <h3 className="font-bold text-bank-navy">Buyer concentration</h3>
        <div className="mt-4 h-64">
          {chartsReady ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={buyerConcentration} dataKey="value" innerRadius={55} outerRadius={88} paddingAngle={3}>
                  {buyerConcentration.map((entry, index) => (
                    <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full rounded-md bg-bank-bg" />
          )}
        </div>
      </div>
      <div className="rounded-lg border border-bank-line bg-white p-5 shadow-subtle lg:col-span-3">
        <div className="grid gap-5 md:grid-cols-2">
          <SignalList title="Positive Signals" items={positiveSignals} icon="check" />
          <SignalList title="Risk Flags" items={riskFlags} icon="warn" />
        </div>
      </div>
    </div>
  );
}

function SignalList({ title, items, icon }: { title: string; items: string[]; icon: "check" | "warn" }) {
  return (
    <div>
      <h3 className="font-bold text-bank-navy">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm font-semibold text-bank-muted">
            {icon === "check" ? <CheckCircle2 className="mt-0.5 shrink-0 text-green-600" size={16} /> : <ShieldCheck className="mt-0.5 shrink-0 text-amber-600" size={16} />}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function UploadVisual() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {caseProfile.documents.map((document) => (
        <div key={document} className="flex items-center gap-3 rounded-lg border border-bank-line bg-white p-4">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-bank-bg text-bank-blue">
            <FileUp size={19} />
          </div>
          <div>
            <p className="font-bold text-bank-navy">{document}</p>
            <p className="text-sm text-bank-muted">Uploaded</p>
          </div>
        </div>
      ))}
      <Link href="/demo/verification" className="inline-flex min-h-11 items-center justify-center rounded-md bg-bank-red px-5 py-3 text-sm font-bold text-white md:col-span-2">
        Run AI Analysis
      </Link>
    </div>
  );
}
