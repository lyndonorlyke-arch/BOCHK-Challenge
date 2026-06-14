import type { PortalPage } from "@/data/portal-pages";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Drawer } from "@/components/ui/drawer";
import { KpiCard } from "@/components/ui/kpi-card";
import { ProgressStepper } from "@/components/ui/progress-stepper";
import { RiskBadge } from "@/components/ui/risk-badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Timeline } from "@/components/ui/timeline";

export function PlaceholderPage({
  page,
  portal
}: {
  page: PortalPage;
  portal: "client" | "bank";
}) {
  const rows = [
    ["TS-24018", portal === "client" ? "Client action" : "Officer review", <StatusBadge key="status" status={page.status} />],
    ["TS-24021", portal === "client" ? "Document update" : "Risk review", <Badge key="badge" tone="info">Open</Badge>],
    ["TS-24025", portal === "client" ? "Message thread" : "Approval queue", <Badge key="badge2" tone="neutral">Queued</Badge>]
  ];

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-lg border border-bank-line bg-white p-5 shadow-sm lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <StatusBadge status={page.status} />
            {portal === "bank" ? <RiskBadge level="Medium" /> : <Badge tone="success">Client-safe view</Badge>}
          </div>
          <h1 className="text-2xl font-bold tracking-normal text-bank-navy sm:text-3xl">{page.title}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-bank-muted">{page.description}</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {page.kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </section>

      <ProgressStepper steps={page.steps} currentStep={Math.min(2, page.steps.length - 1)} />

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card title="Working placeholder" description="This screen is wired into the route structure and ready for detailed UI implementation.">
            <DataTable columns={["Case", "Work item", "Status"]} rows={rows} />
          </Card>
          <Card title="Recent activity">
            <Timeline
              items={[
                { title: "Route scaffold created", description: `${page.title} is available in the portal navigation.`, time: "Now" },
                { title: "Mock data attached", description: "Placeholder KPIs and workflow states are rendered from shared route metadata.", time: "Prototype" },
                { title: "Responsive base ready", description: "Layout adapts across mobile, tablet, laptop, and desktop breakpoints.", time: "Base layout" }
              ]}
            />
          </Card>
        </div>
        <Drawer title={portal === "client" ? "Client help drawer" : "Officer context drawer"}>
          {portal === "client"
            ? "Client pages expose only application progress, documents, authorizations, status, and secure messages."
            : "Bank pages may expose verification, risk review, credit memo, approval, audit, and monitoring workflows."}
        </Drawer>
      </section>
    </div>
  );
}
