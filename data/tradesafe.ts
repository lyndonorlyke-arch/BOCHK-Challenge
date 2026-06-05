import {
  AlertTriangle,
  Banknote,
  Blocks,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileText,
  Fingerprint,
  Gauge,
  GitBranch,
  Globe2,
  Landmark,
  Layers3,
  LineChart,
  LockKeyhole,
  Network,
  Radar,
  Route,
  Scale,
  ShieldCheck,
  Sparkles,
  UserCheck
} from "lucide-react";

export const caseProfile = {
  company: "HK Smart Components Ltd",
  business: "Electronic components trading",
  route: "Shenzhen -> Hong Kong -> Vietnam",
  request: "HK$800,000",
  tenor: "90 days",
  purpose: "Pay supplier before receiving overseas buyer payment",
  status: "AI Analysis Completed",
  recommendation: "Approve with Conditions",
  documents: ["Invoice.pdf", "Sales_Contract.pdf", "Shipping_Document.pdf", "Payment_Record.csv", "Buyer_Profile.pdf"]
};

export const problemCards = [
  {
    title: "Incomplete SME Credit Data",
    body: "Many SMEs lack complete financial statements, sufficient collateral or standardised credit records.",
    icon: FileText
  },
  {
    title: "Fragmented Trade Documents",
    body: "Invoices, contracts, logistics files and payment records are scattered across different sources.",
    icon: Layers3
  },
  {
    title: "Trade Authenticity Risk",
    body: "Fake invoices, duplicate financing and circular trading are difficult to detect quickly.",
    icon: AlertTriangle
  },
  {
    title: "Cross-border AML Complexity",
    body: "Multiple jurisdictions, currencies and counterparties increase AML and fraud risk.",
    icon: Globe2
  }
];

export const solutionColumns = [
  {
    title: "Input",
    icon: FileCheck2,
    items: ["Payment Records", "Invoices & Contracts", "Logistics Documents", "Counterparty Data"]
  },
  {
    title: "AI Processing",
    icon: Sparkles,
    items: ["Cash-flow analysis", "Document extraction and matching", "Trade route verification", "AML / fraud screening"]
  },
  {
    title: "Output",
    icon: Gauge,
    items: ["Creditworthiness Score", "Transaction Authenticity Score", "AML / Fraud Risk Insight", "Explainable Credit Memo", "Audit Trail"]
  }
];

export const workflowSteps = [
  "Upload SME documents",
  "AI extracts key fields",
  "System verifies document consistency",
  "Risk engine generates 3 scores",
  "GenAI creates explainable credit memo",
  "Credit officer reviews final decision",
  "Audit hashes are recorded"
];

export const featureCards = [
  {
    title: "AI Trade Document Reader",
    body: "Extract buyer, seller, amount, goods, payment term and destination from invoices, contracts and logistics documents.",
    icon: FileText
  },
  {
    title: "Transaction Authenticity Checker",
    body: "Cross-check invoice, contract, payment record and logistics evidence.",
    icon: FileCheck2
  },
  {
    title: "SME Credit & Risk Graph",
    body: "Connect SME, buyers, suppliers, payments, invoices and trade routes into one risk view.",
    icon: Network
  },
  {
    title: "Explainable Credit Memo Generator",
    body: "Generate structured credit memo drafts with positive signals, risk flags and follow-up actions.",
    icon: Sparkles
  }
];

export const architectureLayers = [
  {
    title: "Data Input Layer",
    body: "SME profile, payment records, invoice, contract, shipping document, counterparty data",
    icon: Blocks
  },
  {
    title: "AI Document Intelligence Layer",
    body: "OCR, GenAI extraction, document matching",
    icon: FileText
  },
  {
    title: "Risk Analytics Layer",
    body: "Cash-flow analysis, buyer concentration, AML risk, fraud pattern",
    icon: Radar
  },
  {
    title: "Explainable AI Memo Layer",
    body: "Credit memo, risk flags, evidence links",
    icon: FileText
  },
  {
    title: "Audit Trail Layer",
    body: "Document hash, report hash, timestamp, officer action log",
    icon: Fingerprint
  }
];

export const impactKpis = [
  ["Approval Turnaround Time", "Shorter SME trade finance review cycle", Clock3],
  ["Manual Review Hours", "Less time spent checking documents", UserCheck],
  ["Fraud Detection", "Earlier detection of fake or inconsistent documents", ShieldCheck],
  ["AML Risk Control", "Better high-risk counterparty identification", Scale],
  ["SME Conversion", "More qualified SMEs can access financing", Banknote],
  ["Audit Readiness", "More cases have evidence-linked decision records", LockKeyhole],
  ["Revenue Opportunity", "Scalable cross-border SME trade finance growth", LineChart]
] as const;

export const governanceRows = [
  ["AI hallucination", "Evidence-linked output only"],
  ["Black-box lending", "Human-in-the-loop final decision"],
  ["Data privacy", "Private deployment, encryption and access control"],
  ["Blockchain misuse", "No customer documents stored on-chain"],
  ["Model bias", "Industry-specific calibration and manual override"],
  ["Data quality", "Multi-source verification"],
  ["Over-reliance on AI", "Mandatory officer review"]
];

export const roadmap = [
  {
    phase: "Phase 1",
    title: "Competition MVP",
    timing: "8-12 weeks",
    items: ["Synthetic data demo", "AI extraction", "Risk dashboard", "Credit memo", "Audit hash"]
  },
  {
    phase: "Phase 2",
    title: "Internal Pilot",
    timing: "3-6 months",
    items: ["Anonymised historical cases", "RM and credit officer workflow test", "Compliance review"]
  },
  {
    phase: "Phase 3",
    title: "Controlled Rollout",
    timing: "6-12 months",
    items: ["Integrate with selected SME trade finance workflow", "Add eBL, logistics or ERP data"]
  },
  {
    phase: "Phase 4",
    title: "Future Expansion",
    timing: "12+ months",
    items: ["Payment Connect or tokenised settlement experiment", "Regional GBA / Southeast Asia rollout"]
  }
];

export const cashFlowData = [
  { month: "Jul", inflow: 530, outflow: 390 },
  { month: "Aug", inflow: 610, outflow: 430 },
  { month: "Sep", inflow: 580, outflow: 420 },
  { month: "Oct", inflow: 690, outflow: 510 },
  { month: "Nov", inflow: 720, outflow: 540 },
  { month: "Dec", inflow: 660, outflow: 470 },
  { month: "Jan", inflow: 760, outflow: 560 },
  { month: "Feb", inflow: 710, outflow: 530 },
  { month: "Mar", inflow: 820, outflow: 610 },
  { month: "Apr", inflow: 790, outflow: 590 },
  { month: "May", inflow: 860, outflow: 640 },
  { month: "Jun", inflow: 910, outflow: 680 }
];

export const buyerConcentration = [
  { name: "Vietnam Buyer A", value: 42 },
  { name: "Malaysia Buyer B", value: 28 },
  { name: "Thailand Buyer C", value: 18 },
  { name: "Others", value: 12 }
];

export const positiveSignals = [
  "Stable 12-month cross-border inflows",
  "Invoice and contract amount match",
  "Goods align with company business",
  "Financing amount is proportional to verified trade volume"
];

export const riskFlags = [
  "New Vietnam buyer with limited history",
  "One missing logistics document",
  "Payment term extended from 30 days to 60 days",
  "Moderate buyer concentration"
];

export const verificationRows = [
  ["Invoice vs Contract", "Match", "success"],
  ["Invoice vs Payment Record", "Match", "success"],
  ["Contract vs Shipping Document", "Partial Match, one logistics document missing", "warning"],
  ["New Buyer Detection", "Review Needed, new Vietnam buyer detected", "warning"],
  ["Duplicate Invoice", "Not Found", "success"]
] as const;

export const extractedFields = [
  ["Buyer", "Vietnam Buyer A"],
  ["Seller", "HK Smart Components Ltd"],
  ["Supplier", "Shenzhen Supplier B"],
  ["Amount", "HK$800,000"],
  ["Goods", "Electronic components"],
  ["Payment Term", "60 days"],
  ["Destination", "Vietnam"]
];

export const auditRows = [
  ["Invoice Hash", "0xA71B..."],
  ["Contract Hash", "0x8C21..."],
  ["Risk Report Hash", "0x9F3A..."],
  ["Generated Timestamp", "2026-06-05 14:32"],
  ["Officer Action", "Approve with conditions"],
  ["Review Status", "Pending final approval"]
];

export const routeSteps = [
  ["Shenzhen Supplier", "Supplier B"],
  ["HK SME", "Smart Components"],
  ["Vietnam Buyer", "Buyer A"],
  ["BOCHK", "Trade Finance Application"]
] as const;

export const demoSteps = [
  { label: "Application Upload", href: "/demo/upload", icon: FileText },
  { label: "AI Verification", href: "/demo/verification", icon: FileCheck2 },
  { label: "Risk Dashboard", href: "/demo/risk-dashboard", icon: Gauge },
  { label: "AI Credit Memo", href: "/demo/credit-memo", icon: Landmark },
  { label: "Audit Trail", href: "/demo/audit-trail", icon: GitBranch }
];
