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

export const heroMetrics = [
  ["Credit review cycle", "Minutes", "From fragmented files to officer-ready risk view"],
  ["Evidence coverage", "5 sources", "Invoice, contract, logistics, payment and buyer profile"],
  ["Decision posture", "Human-led", "AI recommends; BOCHK credit officer decides"]
] as const;

export const judgeTakeaways = [
  "What problem it solves: fragmented SME trade data slows credit review.",
  "What the AI does: extracts, cross-checks, scores and drafts explainable memo evidence.",
  "What BOCHK controls: final approval, compliance review, privacy and audit trail."
];

export const demoFlowCards = [
  ["1", "Upload", "SME case and documents enter one controlled workspace"],
  ["2", "Verify", "AI extracts fields and checks invoice, contract and logistics consistency"],
  ["3", "Score", "Credit, authenticity and AML risk are shown with evidence"],
  ["4", "Memo", "Officer receives a structured memo draft and conditions"],
  ["5", "Audit", "Hashes and officer actions are recorded for review"]
] as const;

export const applicationStatusMeta = {
  ready: {
    label: "資料齊全待審批",
    tone: "green",
    description: "文件完整，AI 已完成核驗，等待 credit officer 最終審批。"
  },
  missing: {
    label: "缺少資料",
    tone: "amber",
    description: "申請可初步分析，但仍需補交物流、合約或買方資料。"
  },
  suspicious: {
    label: "可疑需覆核",
    tone: "red",
    description: "偵測到高風險或不一致訊號，需要合規或高級審批覆核。"
  },
  approved: {
    label: "已批核 / 條件批核",
    tone: "blue",
    description: "已完成 officer action，保留 audit trail 供後續檢視。"
  }
} as const;

export const applicationCases = [
  {
    id: "TS-2026-001",
    company: "HK Smart Components Ltd",
    industry: "Electronic Components Trading",
    route: "Shenzhen -> Hong Kong -> Vietnam",
    request: "HK$800,000",
    tenor: "90 days",
    status: "ready",
    priority: "Medium",
    creditScore: 78,
    authenticityScore: 85,
    amlRisk: "Medium",
    completeness: 96,
    owner: "Credit Officer Chan",
    submitted: "2026-06-05",
    flags: ["New Vietnam buyer", "Enhanced KYB required"],
    missingDocs: [],
    href: "/demo/upload"
  },
  {
    id: "TS-2026-002",
    company: "Pearl River Homeware Co.",
    industry: "Consumer Goods Export",
    route: "Foshan -> Hong Kong -> Singapore",
    request: "HK$1,250,000",
    tenor: "120 days",
    status: "missing",
    priority: "Low",
    creditScore: 72,
    authenticityScore: 69,
    amlRisk: "Low-medium",
    completeness: 68,
    owner: "RM Lee",
    submitted: "2026-06-04",
    flags: ["Buyer profile outdated"],
    missingDocs: ["Shipping document", "Updated buyer profile"],
    href: "/demo/upload"
  },
  {
    id: "TS-2026-003",
    company: "GBA Precision Tools Ltd",
    industry: "Industrial Tools",
    route: "Dongguan -> Hong Kong -> Malaysia",
    request: "HK$2,400,000",
    tenor: "150 days",
    status: "suspicious",
    priority: "High",
    creditScore: 61,
    authenticityScore: 54,
    amlRisk: "High",
    completeness: 82,
    owner: "Compliance Wong",
    submitted: "2026-06-05",
    flags: ["Invoice amount mismatch", "Potential duplicate financing", "New counterparty cluster"],
    missingDocs: ["Original purchase order"],
    href: "/demo/upload"
  },
  {
    id: "TS-2026-004",
    company: "Harbour Medical Supplies Ltd",
    industry: "Medical Supplies",
    route: "Hong Kong -> Thailand",
    request: "HK$620,000",
    tenor: "60 days",
    status: "approved",
    priority: "Closed",
    creditScore: 84,
    authenticityScore: 91,
    amlRisk: "Low",
    completeness: 100,
    owner: "Credit Officer Ng",
    submitted: "2026-06-03",
    flags: ["Approved with invoice assignment condition"],
    missingDocs: [],
    href: "/demo/audit-trail"
  },
  {
    id: "TS-2026-005",
    company: "Kowloon Textile Export Ltd",
    industry: "Textile Trading",
    route: "Guangzhou -> Hong Kong -> Indonesia",
    request: "HK$980,000",
    tenor: "90 days",
    status: "missing",
    priority: "Medium",
    creditScore: 70,
    authenticityScore: 73,
    amlRisk: "Medium",
    completeness: 74,
    owner: "RM Ho",
    submitted: "2026-06-02",
    flags: ["Payment record gap in March"],
    missingDocs: ["12-month payment record", "Latest logistics proof"],
    href: "/demo/upload"
  },
  {
    id: "TS-2026-006",
    company: "Asia Battery Components Ltd",
    industry: "Battery Components",
    route: "Shenzhen -> Hong Kong -> Vietnam",
    request: "HK$1,780,000",
    tenor: "120 days",
    status: "suspicious",
    priority: "High",
    creditScore: 58,
    authenticityScore: 62,
    amlRisk: "High",
    completeness: 91,
    owner: "Compliance Wong",
    submitted: "2026-06-05",
    flags: ["Circular trade pattern", "Sanctions-screening name similarity"],
    missingDocs: [],
    href: "/demo/upload"
  }
] as const;

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

export const auditHashCards = [
  ["Invoice Hash", "0xA71B", "Document fingerprint"],
  ["Contract Hash", "0x8C21", "Agreement fingerprint"],
  ["Risk Report Hash", "0x9F3A", "AI report fingerprint"],
  ["Officer Action", "A+C", "Approve with conditions"]
] as const;

export const routeSteps = [
  ["Shenzhen Supplier", "Supplier B"],
  ["HK SME", "Smart Components"],
  ["Vietnam Buyer", "Buyer A"],
  ["BOCHK", "Trade Finance Application"]
] as const;

export const demoSteps = [
  { label: "Application Upload", href: "/demo/upload", icon: FileText },
  { label: "AI Document Reader", href: "/demo/document-reader", icon: FileText },
  { label: "Transaction Verification", href: "/demo/verification", icon: FileCheck2 },
  { label: "Risk Dashboard", href: "/demo/risk-dashboard", icon: Gauge },
  { label: "AI Credit Memo", href: "/demo/credit-memo", icon: Landmark },
  { label: "Approval & Audit Trail", href: "/demo/audit-trail", icon: GitBranch }
];
