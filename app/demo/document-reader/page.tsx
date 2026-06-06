import {
  CheckCircle2,
  ChevronRight,
  Download,
  Edit3,
  Expand,
  FileText,
  RefreshCw,
  TriangleAlert,
  Upload,
  ZoomIn
} from "lucide-react";
import { GhostButton, Panel, RedButton, TradeSafeShell } from "@/components/tradesafe-shell";
import { ProgressBar, StatusPill } from "@/components/tradesafe-widgets";

const docs = [
  ["Invoice", "Success", "INV-2025-0501.pdf", "green"],
  ["Contract", "Success", "Sales_Contract.pdf", "green"],
  ["Shipping Document", "Partial", "BOL_HPLU1234567.pdf", "amber"],
  ["Bank Transaction CSV", "Imported", "tx_history_may2025.csv", "blue"]
];

const fields = [
  ["Buyer", "Global Retail Group Pte. Ltd.", 96, "High"],
  ["Seller", "ABC Textiles Co., Ltd.", 95, "High"],
  ["Supplier", "ABC Textiles Co., Ltd.", 95, "High"],
  ["Amount", "USD 94,178.00", 94, "High"],
  ["Goods", "Cotton Fabric (Grey, Navy, White)", 93, "High"],
  ["Payment Term", "90 Days After B/L Date", 72, "Medium"],
  ["Destination", "Singapore", 92, "High"],
  ["Currency", "USD", 98, "High"],
  ["Invoice Date", "30 Apr 2025", 97, "High"],
  ["Trade Route", "China -> Singapore", 65, "Medium"]
];

export default function DocumentReaderPage() {
  return (
    <TradeSafeShell
      activePath="/demo/document-reader"
      title="AI Document Reader"
      subtitle="Extracting critical trade and financial data using AI"
      actions={
        <>
          <GhostButton><RefreshCw size={17} className="mr-2" />Re-parse All</GhostButton>
          <GhostButton><Download size={17} className="mr-2" />Download Report</GhostButton>
          <RedButton><Download size={17} className="mr-2" />Export Extracted Data</RedButton>
        </>
      }
    >
      <Panel className="grid gap-0 overflow-hidden md:grid-cols-2 xl:grid-cols-4">
        {docs.map(([name, status, file, tone]) => (
          <div key={name} className="flex items-center gap-4 border-b border-bank-line p-5 last:border-b-0 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0">
            <span className={`grid h-12 w-12 place-items-center rounded-full ${tone === "green" ? "bg-green-50 text-green-700" : tone === "amber" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-bank-blue"}`}>
              {tone === "amber" ? <TriangleAlert size={24} /> : tone === "blue" ? <Upload size={24} /> : <CheckCircle2 size={24} />}
            </span>
            <div>
              <p className="font-bold text-bank-navy">{name}</p>
              <p className={`text-sm font-bold ${tone === "green" ? "text-green-700" : tone === "amber" ? "text-amber-600" : "text-bank-blue"}`}>{status}</p>
              <p className="text-xs font-semibold text-bank-muted">{file}</p>
            </div>
          </div>
        ))}
      </Panel>

      <div className="mt-4 grid gap-4 xl:grid-cols-[0.98fr_1fr]">
        <Panel className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-bank-line p-4">
            <h2 className="font-bold text-bank-navy">Document Previews <span className="ml-1 rounded-full bg-bank-red px-2 py-0.5 text-xs text-white">4</span></h2>
            <div className="flex items-center gap-4 text-sm font-bold text-bank-navy">
              <span>&lt;</span>
              <span>1 / 2</span>
              <ChevronRight size={17} />
              <ZoomIn size={17} />
              <span>100%</span>
              <Download size={17} />
              <Expand size={17} />
            </div>
          </div>
          <div className="grid md:grid-cols-[220px_1fr]">
            <div className="border-b border-bank-line bg-bank-bg p-4 md:border-b-0 md:border-r">
              <div className="space-y-3">
                {docs.map(([name, status, file, tone], index) => (
                  <div key={name} className={`flex gap-3 rounded-md border p-3 ${index === 0 ? "border-red-100 bg-red-50" : "border-bank-line bg-white"}`}>
                    <div className="h-20 w-16 rounded border border-bank-line bg-white p-1">
                      <div className="h-2 w-10 bg-slate-200" />
                      <div className="mt-2 h-1.5 w-12 bg-slate-200" />
                      <div className="mt-1 h-1.5 w-8 bg-slate-200" />
                      <div className="mt-4 h-5 w-full bg-slate-100" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-bank-navy">{name}</p>
                      <p className="truncate text-[11px] font-semibold text-bank-muted">{file}</p>
                      <span className={`mt-3 inline-grid h-5 w-5 place-items-center rounded-full text-white ${tone === "amber" ? "bg-amber-500" : tone === "blue" ? "bg-bank-blue" : "bg-green-600"}`}>
                        <CheckCircle2 size={13} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-5">
              <InvoicePreview />
            </div>
          </div>
        </Panel>

        <Panel className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-bold text-bank-navy">Extracted Key Fields <StatusPill tone="green">92% Overall Confidence</StatusPill></h2>
            <GhostButton><Edit3 size={15} className="mr-2" />Edit</GhostButton>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {fields.map(([label, value, pct, rating]) => {
              const medium = rating === "Medium";
              return (
                <article key={label} className="rounded-lg border border-bank-line p-4">
                  <p className="text-sm font-bold text-bank-navy">{label}</p>
                  <p className="mt-2 min-h-5 text-sm font-semibold text-bank-navy">{value}</p>
                  <div className="mt-3 grid grid-cols-[70px_1fr_42px] items-center gap-3">
                    <span className={`text-xs font-bold ${medium ? "text-amber-600" : "text-green-700"}`}>{rating}</span>
                    <ProgressBar value={Number(pct)} tone={medium ? "amber" : "green"} />
                    <span className="text-right text-xs font-bold text-bank-muted">{pct}%</span>
                  </div>
                </article>
              );
            })}
          </div>
        </Panel>
      </div>

      <Panel className="mt-4 p-5">
        <h2 className="font-bold text-bank-navy">Confidence and Missing Fields <span className="ml-1 rounded-full bg-bank-red px-2 py-0.5 text-xs text-white">4</span></h2>
        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          <IssueTable
            icon="red"
            title="Missing or Partial Logistics Evidence"
            rows={[
              ["Bill of Lading", "Partial", "Vessel name and departure date not captured."],
              ["Packing List", "Missing", "Not found in uploaded documents."],
              ["Insurance Certificate", "Missing", "Required for CIF term."]
            ]}
          />
          <IssueTable
            icon="amber"
            title="Low-Confidence Fields"
            rows={[
              ["Trade Route", "Medium (65%)", "Inferred from document text; not explicitly stated."],
              ["Payment Term", "Medium (72%)", "Extracted from invoice notes; please verify."]
            ]}
          />
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-bank-muted">Please review highlighted items and upload missing documents or confirm corrected values.</p>
          <div className="flex flex-wrap gap-3">
            <GhostButton><Upload size={17} className="mr-2" />Upload Missing Document</GhostButton>
            <RedButton>Confirm & Proceed -&gt;</RedButton>
          </div>
        </div>
      </Panel>
    </TradeSafeShell>
  );
}

function InvoicePreview() {
  return (
    <div className="mx-auto min-h-[520px] max-w-[620px] border border-bank-line bg-white p-8 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="mb-4 grid h-12 w-12 place-items-center rounded-full border-2 border-bank-blue text-bank-blue">A</div>
          <p className="text-lg font-bold text-bank-navy">ABC Textiles Co., Ltd.</p>
          <p className="mt-1 text-xs font-semibold leading-5 text-bank-navy">7/F, Tower A, 123 Hoi Bun Road<br />Kwun Tong, Kowloon, Hong Kong</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-black">INVOICE</p>
          <p className="mt-4 text-xs font-bold text-bank-navy">Invoice No.: INV-2025-0501</p>
          <p className="text-xs font-semibold text-bank-navy">Invoice Date: 30 Apr 2025</p>
        </div>
      </div>
      <div className="mt-8 grid gap-6 text-xs font-semibold text-bank-navy sm:grid-cols-2">
        <div><p className="font-bold">Bill To:</p><p>Global Retail Group Pte. Ltd.<br />8 Marina View, #15-02<br />Asia Square Tower 1<br />Singapore 018960</p></div>
        <div><p className="font-bold">Ship To:</p><p>Global Retail Group Pte. Ltd.<br />7 Clementi Loop<br />Singapore 129809</p></div>
      </div>
      <table className="mt-8 w-full text-xs">
        <thead className="border-y border-slate-400 text-left font-bold">
          <tr><th className="py-2">Description</th><th>HS Code</th><th>Quantity</th><th>Unit Price</th><th className="text-right">Amount</th></tr>
        </thead>
        <tbody className="font-semibold text-bank-navy">
          {[
            ["Cotton Fabric (Grey)", "5208.32.00", "10,000 M", "3.25", "32,500.00"],
            ["Cotton Fabric (Navy)", "5208.32.00", "8,000 M", "3.30", "26,400.00"],
            ["Cotton Fabric (White)", "5208.32.00", "12,000 M", "3.10", "37,200.00"]
          ].map((row) => (
            <tr key={row[0]} className="border-b border-slate-200">
              {row.map((cell, index) => <td key={cell} className={`py-2 ${index === 4 ? "text-right" : ""}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-8 border-t border-slate-400 pt-4 text-xs font-semibold text-bank-navy">
        <p><strong>Payment Term:</strong> 90 Days After B/L Date</p>
        <p><strong>Incoterms:</strong> CIF Singapore</p>
        <p><strong>Country of Origin:</strong> China</p>
      </div>
    </div>
  );
}

function IssueTable({ title, rows, icon }: { title: string; rows: string[][]; icon: "red" | "amber" }) {
  return (
    <div>
      <h3 className={`flex items-center gap-2 text-sm font-bold ${icon === "red" ? "text-bank-red" : "text-amber-600"}`}>
        <TriangleAlert size={17} />{title}
      </h3>
      <div className="mt-3 overflow-x-auto rounded-lg border border-bank-line">
        <table className="w-full min-w-[560px] text-left text-xs">
          <tbody>
            {rows.map(([field, status, note]) => (
              <tr key={field} className="border-b border-bank-line last:border-b-0">
                <td className="p-3 font-bold text-bank-navy">{field}</td>
                <td className={`p-3 font-bold ${status.includes("Missing") ? "text-bank-red" : "text-amber-600"}`}>{status}</td>
                <td className="p-3 font-semibold text-bank-muted">{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
