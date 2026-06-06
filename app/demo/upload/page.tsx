import {
  CheckCircle2,
  Download,
  ExternalLink,
  Eye,
  FileText,
  MoreVertical,
  Truck,
  Upload,
  UserRound,
  XCircle
} from "lucide-react";
import { GhostButton, Panel, RedButton, TradeSafeShell } from "@/components/tradesafe-shell";
import { ProgressBar, StatusPill } from "@/components/tradesafe-widgets";

const requiredDocs = [
  ["Invoice PDF", FileText],
  ["Purchase Order", FileText],
  ["Sales Contract", FileText],
  ["Shipping Document", Truck],
  ["Bank Transaction CSV", FileText],
  ["Buyer Profile", UserRound],
  ["Supplier Profile", UserRound]
] as const;

const uploadedDocs = [
  ["Invoice PDF", "INV_20250530_001.pdf", "1.24 MB", "May 31, 2025 09:31", "Parsed"],
  ["Purchase Order", "PO_20250528_001.pdf", "842 KB", "May 31, 2025 09:31", "Parsed"],
  ["Sales Contract", "-", "-", "-", "Missing"],
  ["Shipping Document", "BL_20250530_001.pdf", "612 KB", "May 31, 2025 09:31", "Parsed"],
  ["Bank Transaction CSV", "TXN_202505.csv", "256 KB", "May 31, 2025 09:31", "Parsed"],
  ["Buyer Profile", "Buyer_Profile_ABC.pdf", "1.01 MB", "May 31, 2025 09:31", "Parsed"],
  ["Supplier Profile", "Supplier_Profile_GTS.pdf", "910 KB", "May 31, 2025 09:31", "Parsed"]
];

const extractedPreview = [
  ["Buyer", "ABC Electronics Pte. Ltd."],
  ["Currency", "HKD"],
  ["Invoice Date", "May 30, 2025"],
  ["B/L No.", "SZX250530001"],
  ["Seller", "Global Tech Solutions Ltd."],
  ["Goods Description", "Lithium-ion Battery Pack 48V 20Ah"],
  ["Invoice No.", "INV-20250530-001"],
  ["ETD", "May 30, 2025"],
  ["Supplier", "Shenzhen Power Components Co., Ltd."],
  ["Payment Term", "90 days from B/L date"],
  ["PO No.", "PO-20250528-001"],
  ["ETA", "Jun 03, 2025"],
  ["Invoice Amount", "HK$1,280,000.00"],
  ["Trade Route", "Shenzhen, China -> Singapore"],
  ["Incoterm", "FOB Shenzhen"],
  ["HS Code", "8507600090"]
];

export default function UploadPage() {
  return (
    <TradeSafeShell
      activePath="/demo/upload"
      title="Application Upload"
      subtitle="Upload trade documents to initiate or update a financing case. AI parsing starts automatically after the evidence pack is received."
      actions={
        <>
          <GhostButton>Save Draft</GhostButton>
          <RedButton>
            <Download size={17} className="mr-2" />
            Submit for Review
          </RedButton>
        </>
      }
    >
      <div className="grid gap-4 xl:grid-cols-[1fr_330px]">
        <div className="space-y-4">
          <Panel className="p-5">
            <h2 className="font-bold text-bank-navy">1. Upload Required Documents</h2>
            <p className="mt-1 text-xs font-semibold text-bank-muted">Drag and drop files, or click to browse. PDF, PNG, JPG, CSV. Max 20MB per file.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-7">
              {requiredDocs.map(([label, Icon]) => (
                <button key={label} className="grid min-h-28 place-items-center rounded-lg border border-dashed border-bank-line bg-white p-3 text-center hover:border-bank-red hover:bg-red-50">
                  <Icon size={24} className="text-bank-red" />
                  <span className="mt-2 text-sm font-bold text-bank-navy">{label}</span>
                  <span className="mt-2 rounded-md border border-bank-line px-5 py-2 text-xs font-bold text-bank-navy">Upload</span>
                </button>
              ))}
            </div>
          </Panel>

          <Panel className="grid gap-0 overflow-hidden md:grid-cols-4">
            <StatusBlock title="Uploaded Documents" value="6 / 7">
              <ProgressBar value={86} />
              <p className="mt-2 text-xs font-bold text-green-700">6 completed</p>
            </StatusBlock>
            <StatusBlock title="Missing Documents" value="1">
              <p className="mt-3 text-xs font-bold text-bank-red">Sales Contract</p>
            </StatusBlock>
            <StatusBlock title="Completeness" value="86%">
              <div className="mt-1 h-16 w-16 rounded-full border-[8px] border-green-700 border-l-slate-200" />
            </StatusBlock>
            <StatusBlock title="AI Parsing Status" value="AI Parsing Triggered" valueClassName="text-green-700 text-lg">
              <p className="text-xs font-semibold text-bank-muted">Parsing completed today, 09:32 AM</p>
            </StatusBlock>
          </Panel>

          <Panel className="p-5">
            <h2 className="font-bold text-bank-navy">2. Uploaded Documents</h2>
            <div className="mt-4 overflow-x-auto rounded-lg border border-bank-line">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead className="bg-bank-bg text-xs font-bold text-bank-muted">
                  <tr>
                    <th className="p-3">Document Type</th>
                    <th className="p-3">File Name</th>
                    <th className="p-3">File Size</th>
                    <th className="p-3">Upload Time</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadedDocs.map(([type, file, size, time, status]) => (
                    <tr key={type} className="border-t border-bank-line">
                      <td className="p-3 font-bold text-bank-navy"><FileText size={15} className="mr-2 inline text-bank-red" />{type}</td>
                      <td className="p-3 font-semibold text-bank-muted">{file}</td>
                      <td className="p-3 font-semibold text-bank-muted">{size}</td>
                      <td className="p-3 font-semibold text-bank-muted">{time}</td>
                      <td className="p-3">
                        <StatusPill tone={status === "Missing" ? "red" : "green"}>{status}</StatusPill>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-3 text-bank-muted">
                          <Eye size={16} />
                          <MoreVertical size={16} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs font-semibold text-bank-muted">Showing 1 to 7 of 7 documents</p>
          </Panel>
        </div>

        <aside className="space-y-4">
          <Panel className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-bank-navy">Current Financing Case</h2>
              <StatusPill tone="green">Draft</StatusPill>
            </div>
            <InfoList
              rows={[
                ["Case ID", "TSFC-2025-000128"],
                ["SME Name", "Global Tech Solutions Ltd."],
                ["Industry", "Electronics Manufacturing"],
                ["Financing Amount", "HK$48,000,000"],
                ["Tenor", "180 days"],
                ["Loan Purpose", "Working Capital"],
                ["Created By", "Risk Officer"],
                ["Created On", "May 31, 2025 09:32"]
              ]}
            />
            <button className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-bank-line text-sm font-bold text-bank-navy">
              View Case Details <ExternalLink size={15} />
            </button>
          </Panel>

          <Panel className="p-5">
            <h2 className="font-bold text-bank-navy">3. Document Checklist</h2>
            <div className="mt-4 space-y-3">
              {requiredDocs.map(([label]) => {
                const missing = label === "Sales Contract";
                return (
                  <div key={label} className="flex items-center justify-between gap-3 text-sm">
                    <span className="flex items-center gap-2 font-semibold text-bank-navy">
                      {missing ? <XCircle size={16} className="text-bank-red" /> : <CheckCircle2 size={16} className="text-green-700" />}
                      {label}
                    </span>
                    <span className={`font-bold ${missing ? "text-bank-red" : "text-green-700"}`}>{missing ? "Missing" : "Uploaded"}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 rounded-md border border-amber-200 bg-amber-50 p-4 text-xs font-semibold leading-5 text-amber-800">
              Please upload the missing document to achieve 100% completeness.
            </div>
          </Panel>

          <Panel className="p-5">
            <h2 className="font-bold text-bank-navy">Extraction Summary</h2>
            <InfoList rows={[["Fields Extracted", "128"], ["High Confidence", "112 (88%)"], ["Needs Review", "16 (12%)"], ["Extraction Time", "32 seconds"]]} />
            <button className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-bank-line text-sm font-bold text-bank-navy">
              View Extraction Details <ExternalLink size={15} />
            </button>
          </Panel>
        </aside>
      </div>

      <Panel className="mt-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-bold text-bank-navy">4. Extracted Data Preview <span className="text-xs font-semibold text-bank-muted">(Auto-filled by AI)</span></h2>
          <GhostButton>
            View Full Extracted Data <ExternalLink size={15} className="ml-2" />
          </GhostButton>
        </div>
        <div className="mt-4 grid overflow-hidden rounded-lg border border-bank-line sm:grid-cols-2 xl:grid-cols-4">
          {extractedPreview.map(([label, value]) => (
            <div key={label} className="grid grid-cols-[120px_1fr] border-b border-bank-line text-sm last:border-b-0 xl:border-r xl:[&:nth-child(4n)]:border-r-0">
              <span className="bg-bank-bg p-3 font-bold text-bank-muted">{label}</span>
              <span className="p-3 font-semibold text-bank-navy">{value}</span>
            </div>
          ))}
        </div>
      </Panel>
    </TradeSafeShell>
  );
}

function StatusBlock({
  title,
  value,
  children,
  valueClassName = "text-3xl"
}: {
  title: string;
  value: string;
  children: React.ReactNode;
  valueClassName?: string;
}) {
  return (
    <div className="border-b border-bank-line p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <p className="text-sm font-bold text-bank-muted">{title}</p>
      <p className={`mt-3 font-bold text-bank-navy ${valueClassName}`}>{value}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function InfoList({ rows }: { rows: string[][] }) {
  return (
    <dl className="mt-4 divide-y divide-bank-line text-sm">
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-center justify-between gap-4 py-3">
          <dt className="font-semibold text-bank-muted">{label}</dt>
          <dd className="text-right font-bold text-bank-navy">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
