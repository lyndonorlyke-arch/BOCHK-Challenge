export const bankCase = {
  id: "TF25052100087",
  sme: "Global Star Electronics Ltd.",
  amount: "USD 500,000",
  type: "Trade Financing - Invoice Financing",
  riskLevel: "Medium High",
  officer: "Alice Chan",
  updated: "May 20, 2025 10:28 HKT"
};

export const portfolioKpis = [
  { label: "Total Applications", value: "1,284", detail: "Past 30 days", delta: "+12.6%", tone: "red" },
  { label: "Pending Review", value: "342", detail: "Requires attention", delta: "-8.4%", tone: "orange" },
  { label: "Approval Rate", value: "78.4%", detail: "Of completed cases", delta: "+3.7 pp", tone: "green" },
  { label: "Average Processing Time", value: "4.6 days", detail: "From submission", delta: "-0.6 days", tone: "blue" },
  { label: "High-risk Cases", value: "67", detail: "Past 30 days", delta: "+18.2%", tone: "red" }
];

export const pipeline = [
  { label: "Submitted", value: "1,284", color: "bg-bank-navy" },
  { label: "Document Review", value: "912", color: "bg-blue-700" },
  { label: "Trade Verification", value: "642", color: "bg-teal-600" },
  { label: "Risk Review", value: "428", color: "bg-amber-500" },
  { label: "Credit Decision", value: "256", color: "bg-orange-500" },
  { label: "Approved / Rejected", value: "186", color: "bg-bank-red" }
];

export const caseRows = [
  ["CS25-0611-0001", "Bright Ocean Trading Limited", "Invoice Financing", "2,500,000", "HKD", "Missing Documents", "Medium", "Unassigned"],
  ["CS25-0611-0002", "Prime Tech Solutions Limited", "Purchase Order Financing", "8,800,000", "USD", "New Submission", "Low", "Unassigned"],
  ["CS25-0611-0003", "Shenzhen Winway Electronics Co., Ltd.", "Export Financing", "1,200,000", "USD", "AI Extraction Completed", "Low", "Alice Wong"],
  ["CS25-0611-0004", "Guangzhou Star Textiles Co., Ltd.", "Import Financing", "3,600,000", "HKD", "Verification Required", "High", "Ken Cheng"],
  ["CS25-0611-0005", "Asia Pacific Foods Limited", "Receivables Financing", "1,750,000", "HKD", "Ready for Credit Review", "Medium", "Mandy Li"]
];

export const documents = [
  { name: "Commercial Invoice", type: "PDF", confidence: "96%", status: "Extracted" },
  { name: "Purchase Order", type: "PDF", confidence: "82%", status: "Needs Review" },
  { name: "Bill of Lading", type: "PDF", confidence: "71%", status: "Warning" },
  { name: "Bank Statement", type: "XLSX", confidence: "94%", status: "Extracted" }
];

export const extractedFields = [
  ["Invoice No.", "INV-2025-0456", "96%"],
  ["Invoice Amount", "USD 500,000", "94%"],
  ["Buyer", "Orion Retail Group", "88%"],
  ["Supplier", "Global Star Electronics Ltd.", "97%"],
  ["Shipment Date", "Missing", "42%"]
];

export const riskBreakdown = [
  ["Document Consistency Risk", "81", "High"],
  ["Trade Authenticity Risk", "72", "Medium High"],
  ["Counterparty Risk", "65", "Medium"],
  ["Cash-flow Risk", "58", "Medium"],
  ["Compliance Risk", "32", "Low"],
  ["Repayment History Risk", "40", "Low"]
];

export const redFlags = [
  ["Invoice amount mismatch", "Invoice amount exceeds PO amount by 11%.", "High"],
  ["Unusual shipment route", "Route is indirect and uncommon for this product.", "Medium High"],
  ["New supplier with limited history", "Supplier established 3 months ago.", "Medium"],
  ["Possible duplicate financing attempt", "Similar invoice details found in another case.", "High"]
];

export const complianceChecks = [
  ["Sanctions Screening", "No Match Found", "Clear"],
  ["PEP Screening", "No Match Found", "Clear"],
  ["Adverse Media Screening", "1 record(s) found", "Review Required"],
  ["Watchlist Screening", "No Match Found", "Clear"]
];

export const evidenceRows = [
  ["Invoice amount mismatch", "Invoice INV-2025-0456 exceeds PO amount by 11%.", "High", "Trade Document Data", "Request revised invoice or justification"],
  ["Unusual shipment route", "Bill of lading route: Shanghai -> Jebel Ali -> Hong Kong.", "Medium High", "Logistics Tracking", "Request routing explanation"],
  ["New supplier with limited history", "Supplier has two prior transactions.", "Medium", "Supplier Due Diligence", "Request trade references"],
  ["Possible duplicate financing attempt", "Similar invoice hash match at 92%.", "High", "External Bank Feed", "Confirm financing status"]
];

export const counterparties = [
  ["Orion Retail Group", "Buyer", "United Kingdom", "Medium", "2 open links"],
  ["Harbour Link Logistics", "Carrier", "Hong Kong", "Low", "Verified partner"],
  ["Jebel Ali Transit Co.", "Transit agent", "UAE", "Medium High", "Indirect route"],
  ["Pacific Components Ltd.", "Related supplier", "Shenzhen", "High", "Shared director"]
];

export const auditEvents = [
  ["May 18, 2025 14:02 HKT", "SME", "Document uploaded by SME", "Uploaded"],
  ["May 18, 2025 14:03 HKT", "AI Document Reader", "AI extracted invoice fields", "Extracted"],
  ["May 18, 2025 15:30 HKT", "Trade Verification System", "Trade verification completed", "Completed"],
  ["May 19, 2025 09:08 HKT", "Compliance Screening", "Compliance screening completed", "Clear"],
  ["May 20, 2025 10:28 HKT", "Credit Officer", "Final decision recorded", "In Progress"]
];

export const activeFacilities = [
  ["FAC-2025-0881", "Global Star Electronics Ltd.", "Invoice Financing", "USD 500,000", "Performing", "Medium"],
  ["FAC-2025-0724", "Bright Ocean Trading Limited", "Import Loan", "HKD 2,500,000", "Watchlist", "High"],
  ["FAC-2025-0662", "Asia Pacific Foods Limited", "Receivables", "HKD 1,750,000", "Performing", "Low"],
  ["FAC-2025-0540", "Prime Tech Solutions Limited", "PO Financing", "USD 880,000", "Early Warning", "Medium High"]
];
