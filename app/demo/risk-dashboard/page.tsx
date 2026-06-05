import Link from "next/link";
import { MiniRiskVisual } from "@/components/landing-sections";
import { DemoPanel, DemoShell } from "@/components/demo-shell";

export default function RiskDashboardPage() {
  return (
    <DemoShell pathname="/demo/risk-dashboard">
      <DemoPanel
        title="Risk Dashboard"
        subtitle="The risk dashboard separates creditworthiness, trade authenticity and AML/fraud risk so officers can challenge each dimension."
        actions={<Link href="/demo/credit-memo" className="rounded-md bg-bank-red px-5 py-3 text-sm font-bold text-white">Generate Credit Memo</Link>}
      >
        <MiniRiskVisual />
        <div className="mt-6 rounded-lg border border-bank-line bg-bank-bg p-5">
          <h3 className="font-bold text-bank-navy">Trade Route</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {["Shenzhen Supplier B", "HK Smart Components", "Vietnam Buyer A", "BOCHK Review"].map((node, index) => (
              <div key={node} className="relative rounded-md bg-white p-4 text-center text-sm font-bold text-bank-navy">
                <span className="mx-auto mb-2 grid h-7 w-7 place-items-center rounded-md bg-bank-navy text-xs text-white">{index + 1}</span>
                {node}
              </div>
            ))}
          </div>
        </div>
      </DemoPanel>
    </DemoShell>
  );
}
