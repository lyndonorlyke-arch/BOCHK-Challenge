export const financingTypes = [
  "Import Loan",
  "Export Loan",
  "Invoice Financing",
  "Working Capital Trade Loan"
] as const;

export const documentTypes = [
  "Commercial Invoice",
  "Purchase Order",
  "Sales Contract",
  "Bill of Lading",
  "Bank Statement",
  "Payment Record"
] as const;

export const riskLevels = ["Low", "Medium", "Medium High", "High"] as const;

export const caseStatuses = [
  "New Submission",
  "Missing Documents",
  "Verification Required",
  "Credit Review",
  "Approved",
  "Rejected"
] as const;

export type FinancingType = (typeof financingTypes)[number];
export type DocumentType = (typeof documentTypes)[number];
export type RiskLevel = (typeof riskLevels)[number];
export type CaseStatus = (typeof caseStatuses)[number];

export type TradeDocument = {
  id: string;
  type: DocumentType;
  fileName: string;
  status: "Uploaded" | "Missing" | "Needs Review" | "Verified";
  confidence: number;
  extractedFields: {
    field: string;
    value: string;
    confidence: number;
  }[];
  warnings: string[];
};

export type VerificationResult = {
  summary: {
    documentMatch: number;
    externalSourcesConnected: number;
    evidenceItems: number;
    recommendedAction: string;
  };
  matchingMatrix: {
    item: string;
    invoice: string;
    purchaseOrder: string;
    shipment: string;
    payment: string;
    result: "Match" | "Variance" | "Mismatch" | "Review";
  }[];
  externalConnections: {
    source: string;
    status: "Connected" | "Delayed" | "Unavailable";
  }[];
  evidence: {
    evidence: string;
    source: string;
    finding: string;
  }[];
};

export type RiskAnalysis = {
  score: number;
  level: RiskLevel;
  breakdown: {
    category: string;
    score: number;
    level: RiskLevel;
  }[];
  redFlags: {
    title: string;
    description: string;
    severity: RiskLevel;
  }[];
  complianceChecks: {
    item: string;
    result: string;
    status: "Clear" | "Review Required";
  }[];
  aiExplanation: string;
  evidence: {
    riskFlag: string;
    evidence: string;
    severity: RiskLevel;
    source: string;
    suggestedAction: string;
  }[];
  counterparties: {
    name: string;
    role: string;
    region: string;
    risk: RiskLevel;
    highlight: string;
  }[];
};

export type CreditMemo = {
  status: "Draft" | "Generated" | "Submitted";
  warning: string;
  sections: {
    title: string;
    body: string;
  }[];
  supportingEvidence: {
    evidence: string;
    severity: RiskLevel;
  }[];
  recommendation: "Approve" | "Conditional Approve" | "Request More Information" | "Reject";
};

export type ApprovalWorkflow = {
  currentStage: string;
  stages: {
    label: string;
    status: "Completed" | "Current" | "Pending";
    actor: string;
  }[];
  decisionOptions: string[];
};

export type AuditLog = {
  at: string;
  actor: string;
  action: string;
  status: string;
};

export type MonitoringSignal = {
  type: string;
  severity: RiskLevel;
  description: string;
};

export type TradeFinanceCase = {
  id: string;
  companyName: string;
  applicantName: string;
  financingType: FinancingType;
  amount: number;
  currency: "HKD" | "USD";
  sector: string;
  region: string;
  status: CaseStatus;
  riskLevel: RiskLevel;
  riskScore: number;
  assignedOfficer: string;
  submittedAt: string;
  updatedAt: string;
  requestedAction: string;
  actionDue: string;
  relationshipManager: string;
  documents: TradeDocument[];
  verification: VerificationResult;
  risk: RiskAnalysis;
  creditMemo: CreditMemo;
  approvalWorkflow: ApprovalWorkflow;
  auditLogs: AuditLog[];
  monitoringSignals: MonitoringSignal[];
};

export type ClientApplication = {
  id: string;
  company: string;
  user: string;
  type: FinancingType;
  financingType: FinancingType;
  amount: string;
  requestedAmount: string;
  submittedDate: string;
  status: CaseStatus | "Additional Information Required" | "Under Review";
  action: string;
  requiredAction: string;
  actionDue: string;
  documents: {
    name: DocumentType;
    description: string;
    status: TradeDocument["status"];
  }[];
};

export type ClientMessage = {
  id: string;
  applicationId: string;
  title: string;
  sender: string;
  recipient: string;
  date: string;
  time: string;
  tone: "red" | "blue" | "green" | "purple";
  body: string;
  requestedAction?: string;
};

const documentDescriptions: Record<DocumentType, string> = {
  "Commercial Invoice": "Invoice with item details and amount.",
  "Purchase Order": "Buyer's purchase order.",
  "Sales Contract": "Sales agreement or contract.",
  "Bill of Lading": "Shipping document or airway bill.",
  "Bank Statement": "Latest company bank statement.",
  "Payment Record": "Proof of payment or remittance."
};

const companies = [
  ["TF-2026-0001", "Global Star Electronics Ltd.", "David Chan", "Invoice Financing", 500000, "USD", "Electronics", "Mainland China", "Credit Review", "Medium High", 78, "Alice Chan"],
  ["TF-2026-0002", "Bright Ocean Trading Limited", "Iris Wong", "Import Loan", 2500000, "HKD", "Apparel", "Hong Kong", "Missing Documents", "Medium", 61, "Unassigned"],
  ["TF-2026-0003", "Prime Tech Solutions Limited", "Kevin Lam", "Working Capital Trade Loan", 880000, "USD", "Electronics", "ASEAN", "New Submission", "Low", 32, "Unassigned"],
  ["TF-2026-0004", "Shenzhen Winway Electronics Co., Ltd.", "Maggie Liu", "Export Loan", 1200000, "USD", "Electronics", "Mainland China", "Verification Required", "Low", 41, "Alice Wong"],
  ["TF-2026-0005", "Guangzhou Star Textiles Co., Ltd.", "Henry Zhang", "Import Loan", 3600000, "HKD", "Apparel", "Mainland China", "Verification Required", "High", 86, "Ken Cheng"],
  ["TF-2026-0006", "Asia Pacific Foods Limited", "Samantha Lee", "Invoice Financing", 1750000, "HKD", "Food Trade", "ASEAN", "Credit Review", "Medium", 55, "Mandy Li"],
  ["TF-2026-0007", "Harbour Link Machinery Limited", "Tony Ng", "Export Loan", 4200000, "HKD", "Machinery", "Europe", "Approved", "Low", 28, "Alice Chan"],
  ["TF-2026-0008", "Pearl Delta Components Limited", "Olivia Ho", "Working Capital Trade Loan", 5400000, "HKD", "Machinery", "Mainland China", "Rejected", "High", 91, "M. Wong"],
  ["TF-2026-0009", "Emerald Bay Homeware Limited", "Natalie Yu", "Import Loan", 980000, "USD", "Consumer Goods", "ASEAN", "Approved", "Medium", 48, "Ken Cheng"],
  ["TF-2026-0010", "Silverline Medical Supplies Ltd.", "Raymond Fong", "Invoice Financing", 2300000, "HKD", "Healthcare", "Europe", "New Submission", "Medium High", 69, "Mandy Li"]
] as const;

function formatMoney(amount: number, currency: "HKD" | "USD") {
  return `${currency} ${amount.toLocaleString("en-US")}`;
}

function makeDocuments(caseId: string, status: CaseStatus, amount: number): TradeDocument[] {
  return documentTypes.map((type, index) => {
    const isMissing = status === "Missing Documents" && (type === "Purchase Order" || type === "Sales Contract");
    const needsReview = (status === "Verification Required" || status === "Credit Review") && (type === "Bill of Lading" || type === "Purchase Order");
    const confidence = isMissing ? 0 : Math.max(58, 96 - index * 5 - (needsReview ? 9 : 0));
    return {
      id: `${caseId}-DOC-${index + 1}`,
      type,
      fileName: isMissing ? "" : `${type.replaceAll(" ", "-").toLowerCase()}-${caseId}.pdf`,
      status: isMissing ? "Missing" : needsReview ? "Needs Review" : "Verified",
      confidence,
      extractedFields: [
        { field: "Document Type", value: type, confidence },
        { field: "Case ID", value: caseId, confidence: Math.min(99, confidence + 3) },
        { field: "Amount", value: formatMoney(amount, amount > 2000000 ? "HKD" : "USD"), confidence: Math.max(60, confidence - 4) }
      ],
      warnings: isMissing ? [`${type} has not been uploaded`] : needsReview ? [`${type} requires officer review`] : []
    };
  });
}

function makeVerification(caseId: string, riskScore: number): VerificationResult {
  const hasVariance = riskScore >= 60;
  return {
    summary: {
      documentMatch: hasVariance ? 83 : 94,
      externalSourcesConnected: hasVariance ? 6 : 7,
      evidenceItems: hasVariance ? 18 : 9,
      recommendedAction: hasVariance
        ? "Request supplier justification and logistics route confirmation."
        : "Proceed to credit review with standard officer validation."
    },
    matchingMatrix: [
      {
        item: "Invoice Amount",
        invoice: "500,000",
        purchaseOrder: hasVariance ? "450,000" : "500,000",
        shipment: "-",
        payment: "500,000",
        result: hasVariance ? "Variance" : "Match"
      },
      {
        item: "Buyer Name",
        invoice: "Orion Retail Group",
        purchaseOrder: "Orion Retail Group",
        shipment: "-",
        payment: "-",
        result: "Match"
      },
      {
        item: "Shipment Route",
        invoice: "-",
        purchaseOrder: "CN-HK",
        shipment: hasVariance ? "CN-AE-HK" : "CN-HK",
        payment: "-",
        result: hasVariance ? "Mismatch" : "Match"
      }
    ],
    externalConnections: [
      { source: "Logistics API", status: "Connected" },
      { source: "Company Registry", status: "Connected" },
      { source: "Payment Feed", status: hasVariance ? "Delayed" : "Connected" }
    ],
    evidence: [
      { evidence: `Invoice hash match checked for ${caseId}`, source: "Trade Document Data", finding: hasVariance ? "Similar invoice pattern found" : "No duplicate pattern" },
      { evidence: "Shipment route validated", source: "Logistics Tracking", finding: hasVariance ? "Indirect route detected" : "Route consistent" },
      { evidence: "Counterparty registry checked", source: "KYB Provider", finding: hasVariance ? "Limited operating history" : "Registry current" }
    ]
  };
}

function makeRisk(caseId: string, riskLevel: RiskLevel, riskScore: number): RiskAnalysis {
  const high = riskScore >= 70;
  return {
    score: riskScore,
    level: riskLevel,
    breakdown: [
      { category: "Document Consistency Risk", score: high ? 81 : 42, level: high ? "High" : "Medium" },
      { category: "Trade Authenticity Risk", score: high ? 72 : 38, level: high ? "Medium High" : "Low" },
      { category: "Counterparty Risk", score: high ? 65 : 35, level: high ? "Medium" : "Low" },
      { category: "Cash-flow Risk", score: high ? 58 : 44, level: high ? "Medium" : "Medium" },
      { category: "Compliance Risk", score: high ? 32 : 22, level: "Low" },
      { category: "Repayment History Risk", score: high ? 40 : 25, level: "Low" }
    ],
    redFlags: [
      {
        title: high ? "Invoice amount mismatch" : "Minor payment timing variance",
        description: high ? "Invoice amount exceeds PO amount by 11%." : "Latest payment record is delayed by 2 days.",
        severity: high ? "High" : "Medium"
      },
      {
        title: high ? "Unusual shipment route" : "New counterparty relationship",
        description: high ? "Route is indirect and uncommon for this product." : "Counterparty relationship started within the past year.",
        severity: high ? "Medium High" : "Medium"
      },
      {
        title: "Possible duplicate financing attempt",
        description: high ? "Similar invoice details found in another case." : "No duplicate case confirmed, similarity below threshold.",
        severity: high ? "High" : "Low"
      }
    ],
    complianceChecks: [
      { item: "Sanctions Screening", result: "No Match Found", status: "Clear" },
      { item: "PEP Screening", result: "No Match Found", status: "Clear" },
      { item: "Adverse Media Screening", result: high ? "1 record found" : "No record found", status: high ? "Review Required" : "Clear" },
      { item: "Watchlist Screening", result: "No Match Found", status: "Clear" }
    ],
    aiExplanation: high
      ? "The risk score increased because invoice amount differs from purchase order, shipment routing is indirect, and supplier operating history is limited."
      : "The case has consistent documents, clear compliance screening, and limited fraud indicators. Standard officer review is sufficient.",
    evidence: [
      { riskFlag: "Invoice amount mismatch", evidence: `Invoice ${caseId} amount variance checked.`, severity: high ? "High" : "Low", source: "Trade Document Data", suggestedAction: high ? "Request revised invoice or justification" : "No additional action" },
      { riskFlag: "Shipment route", evidence: "Bill of lading route reviewed.", severity: high ? "Medium High" : "Low", source: "Logistics Tracking", suggestedAction: high ? "Request routing explanation" : "Proceed" },
      { riskFlag: "Supplier history", evidence: "Supplier due diligence profile refreshed.", severity: high ? "Medium" : "Low", source: "Supplier Due Diligence", suggestedAction: high ? "Request trade references" : "Proceed" }
    ],
    counterparties: [
      { name: "Orion Retail Group", role: "Buyer", region: "United Kingdom", risk: high ? "Medium" : "Low", highlight: "2 open links" },
      { name: "Harbour Link Logistics", role: "Carrier", region: "Hong Kong", risk: "Low", highlight: "Verified partner" },
      { name: "Jebel Ali Transit Co.", role: "Transit agent", region: "UAE", risk: high ? "Medium High" : "Medium", highlight: high ? "Indirect route" : "Standard route" },
      { name: "Pacific Components Ltd.", role: "Related supplier", region: "Shenzhen", risk: high ? "High" : "Medium", highlight: high ? "Shared director" : "Registry match" }
    ]
  };
}

function makeCreditMemo(companyName: string, riskLevel: RiskLevel, riskScore: number): CreditMemo {
  const high = riskScore >= 70;
  return {
    status: "Generated",
    warning: "AI-generated memo requires human review. Verify all evidence and rationale before submitting.",
    recommendation: high ? "Conditional Approve" : "Approve",
    sections: [
      {
        title: "Executive Summary",
        body: `${companyName} requests trade finance support for a cross-border SME transaction. The case has been assessed using document extraction, trade verification, KYB, compliance screening, and cash-flow indicators.`
      },
      {
        title: "Risk Assessment",
        body: high
          ? `Overall risk is ${riskLevel} with a score of ${riskScore}. Main drivers are document variance, indirect shipment route, and limited supplier history.`
          : `Overall risk is ${riskLevel} with a score of ${riskScore}. Documents and external verification data are broadly consistent.`
      },
      {
        title: "Recommendation",
        body: high
          ? "Conditional approval is recommended subject to revised purchase order, supplier justification, and routing confirmation."
          : "Approval is recommended subject to standard documentation retention and post-disbursement monitoring."
      },
      {
        title: "Conditions",
        body: "Maintain audit trail, record officer rationale, and refresh monitoring signals after drawdown."
      }
    ],
    supportingEvidence: [
      { evidence: "Document extraction and confidence scores reviewed", severity: riskLevel },
      { evidence: "Compliance screening completed", severity: "Low" },
      { evidence: "Trade verification evidence linked to memo", severity: riskLevel }
    ]
  };
}

function makeApprovalWorkflow(status: CaseStatus): ApprovalWorkflow {
  const decisionComplete = status === "Approved" || status === "Rejected";
  return {
    currentStage: decisionComplete ? "Decision Recorded" : "Credit Officer Review",
    decisionOptions: ["Approve", "Conditional Approve", "Request More Information", "Reject"],
    stages: [
      { label: "Intake", status: "Completed", actor: "TradeSafe System" },
      { label: "Document AI", status: "Completed", actor: "AI Document Reader" },
      { label: "Verification", status: status === "New Submission" ? "Pending" : "Completed", actor: "Trade Verification System" },
      { label: "Risk Review", status: decisionComplete ? "Completed" : "Current", actor: "Credit Officer" },
      { label: "Decision", status: decisionComplete ? "Completed" : "Pending", actor: "Approval Committee" }
    ]
  };
}

function makeAuditLogs(caseId: string, status: CaseStatus): AuditLog[] {
  return [
    { at: "2026-06-10T09:18:00+08:00", actor: "SME Client", action: `Submitted application ${caseId}`, status: "Completed" },
    { at: "2026-06-10T09:22:00+08:00", actor: "AI Document Reader", action: "Extracted document fields", status: "Completed" },
    { at: "2026-06-10T10:40:00+08:00", actor: "Trade Verification System", action: "Completed external verification checks", status: "Completed" },
    { at: "2026-06-11T11:05:00+08:00", actor: "Compliance Screening", action: "Completed sanctions and PEP screening", status: "Clear" },
    { at: "2026-06-12T15:30:00+08:00", actor: "Credit Officer", action: status === "Approved" || status === "Rejected" ? "Recorded final decision" : "Opened credit review", status: status === "Rejected" ? "Rejected" : "In Progress" }
  ];
}

export const tradeFinanceCases: TradeFinanceCase[] = companies.map((row) => {
  const [id, companyName, applicantName, financingType, amount, currency, sector, region, status, riskLevel, riskScore, assignedOfficer] = row;
  const documents = makeDocuments(id, status, amount);
  return {
    id,
    companyName,
    applicantName,
    financingType,
    amount,
    currency,
    sector,
    region,
    status,
    riskLevel,
    riskScore,
    assignedOfficer,
    submittedAt: "2026-06-10T09:18:00+08:00",
    updatedAt: "2026-06-13T10:28:00+08:00",
    requestedAction: status === "Missing Documents" ? "Upload revised purchase order and sales contract" : "Review latest application status",
    actionDue: "2026-06-18",
    relationshipManager: "Mr. Chan Tai Man",
    documents,
    verification: makeVerification(id, riskScore),
    risk: makeRisk(id, riskLevel, riskScore),
    creditMemo: makeCreditMemo(companyName, riskLevel, riskScore),
    approvalWorkflow: makeApprovalWorkflow(status),
    auditLogs: makeAuditLogs(id, status),
    monitoringSignals: [
      { type: "Cash-flow variance", severity: riskLevel, description: "Monthly inflow variance checked against repayment plan." },
      { type: "Buyer payment delay", severity: riskScore >= 70 ? "High" : "Medium", description: "Buyer payment behavior monitored after facility drawdown." },
      { type: "Shipment delay", severity: riskScore >= 70 ? "Medium High" : "Low", description: "Logistics milestones compared with expected shipping timeline." }
    ]
  };
});

export const clientMessages: ClientMessage[] = [
  {
    id: "MSG-001",
    applicationId: "TF-2026-0001",
    title: "Additional document request",
    sender: "Mr. Chan Tai Man (Relationship Manager)",
    recipient: "Global Star Electronics Ltd.",
    date: "Today",
    time: "10:30",
    tone: "red",
    body: "Please upload the revised purchase order and supplier routing explanation so BOCHK can continue the credit review.",
    requestedAction: "Upload revised purchase order by 18 June 2026"
  },
  {
    id: "MSG-002",
    applicationId: "TF-2026-0001",
    title: "Relationship manager message",
    sender: "Mr. Chan Tai Man (Relationship Manager)",
    recipient: "Global Star Electronics Ltd.",
    date: "Yesterday",
    time: "16:45",
    tone: "blue",
    body: "Your application has entered credit review. We will notify you if any additional documents are required."
  },
  {
    id: "MSG-003",
    applicationId: "TF-2026-0004",
    title: "Application update",
    sender: "Trade Finance Operations Team",
    recipient: "Shenzhen Winway Electronics Co., Ltd.",
    date: "12 Jun 2026",
    time: "11:20",
    tone: "green",
    body: "Trade verification has been completed and the case has moved to officer review."
  },
  {
    id: "MSG-004",
    applicationId: "TF-2026-0002",
    title: "Missing document reminder",
    sender: "TradeSafe System",
    recipient: "Bright Ocean Trading Limited",
    date: "11 Jun 2026",
    time: "09:15",
    tone: "purple",
    body: "Two required documents are still missing. Please upload them from the documents page."
  }
];

export function getClientApplications(): ClientApplication[] {
  return tradeFinanceCases.map((item) => ({
    id: item.id,
    company: item.companyName,
    user: item.applicantName,
    type: item.financingType,
    financingType: item.financingType,
    amount: formatMoney(item.amount, item.currency),
    requestedAmount: formatMoney(item.amount, item.currency),
    submittedDate: "10 Jun 2026",
    status: item.status === "Credit Review" ? "Under Review" : item.status === "Missing Documents" ? "Additional Information Required" : item.status,
    action: item.status === "Missing Documents" ? "Upload Documents" : item.status === "New Submission" ? "View Details" : "View Status",
    requiredAction: item.requestedAction,
    actionDue: item.actionDue,
    documents: item.documents.map((document) => ({
      name: document.type,
      description: documentDescriptions[document.type],
      status: document.status
    }))
  }));
}

export function createClientApplication(payload: Partial<TradeFinanceCase>) {
  const id = `TF-2026-${Math.floor(1000 + Math.random() * 8999)}`;
  return {
    id,
    company: payload.companyName ?? "New SME Applicant",
    financingType: payload.financingType ?? "Import Loan",
    requestedAmount: formatMoney(Number(payload.amount ?? 1000000), (payload.currency as "HKD" | "USD") ?? "HKD"),
    status: "New Submission" as CaseStatus,
    submittedAt: new Date().toISOString(),
    nextStep: "/client/documents"
  };
}

export function createClientDocument(payload: { applicationId?: string; documentType?: DocumentType; fileName?: string }) {
  return {
    id: `${payload.applicationId ?? "TF-2026-NEW"}-DOC-${Date.now()}`,
    applicationId: payload.applicationId ?? "TF-2026-NEW",
    type: payload.documentType ?? "Commercial Invoice",
    fileName: payload.fileName ?? "uploaded-document.pdf",
    status: "Uploaded" as const,
    confidence: 89,
    uploadedAt: new Date().toISOString()
  };
}

export function getBankCases() {
  return tradeFinanceCases.map((item) => ({
    id: item.id,
    companyName: item.companyName,
    applicantName: item.applicantName,
    financingType: item.financingType,
    requestedAmount: formatMoney(item.amount, item.currency),
    amount: item.amount,
    currency: item.currency,
    sector: item.sector,
    region: item.region,
    status: item.status,
    riskLevel: item.riskLevel,
    riskScore: item.riskScore,
    assignedOfficer: item.assignedOfficer,
    submittedAt: item.submittedAt,
    updatedAt: item.updatedAt
  }));
}

export function getCaseById(caseId: string) {
  return tradeFinanceCases.find((item) => item.id === caseId) ?? tradeFinanceCases[0];
}

export function getPortfolio() {
  const cases = tradeFinanceCases;
  const total = cases.length;
  const approved = cases.filter((item) => item.status === "Approved").length;
  const highRisk = cases.filter((item) => item.riskLevel === "High" || item.riskLevel === "Medium High").length;
  return {
    kpis: [
      { label: "Total Applications", value: `${total}`, detail: "Mock portfolio", delta: "+12.6%", tone: "red" },
      { label: "Pending Review", value: `${cases.filter((item) => item.status !== "Approved" && item.status !== "Rejected").length}`, detail: "Requires attention", delta: "-8.4%", tone: "orange" },
      { label: "Approval Rate", value: `${Math.round((approved / total) * 100)}%`, detail: "Of completed cases", delta: "+3.7 pp", tone: "green" },
      { label: "Average Processing Time", value: "4.6 days", detail: "From submission", delta: "-0.6 days", tone: "blue" },
      { label: "High-risk Cases", value: `${highRisk}`, detail: "Medium High or High", delta: "+18.2%", tone: "red" }
    ],
    pipeline: caseStatuses.map((status) => ({
      label: status,
      value: cases.filter((item) => item.status === status).length
    })),
    riskDistribution: riskLevels.map((risk) => ({
      label: risk,
      value: cases.filter((item) => item.riskLevel === risk).length
    })),
    sectorBreakdown: summarize(cases.map((item) => item.sector)),
    regionBreakdown: summarize(cases.map((item) => item.region)),
    alerts: [
      { title: "Duplicate Financing Alert", count: 3, severity: "High" },
      { title: "Missing Document Alert", count: 5, severity: "Medium" },
      { title: "Counterparty Risk Alert", count: 4, severity: "Medium High" },
      { title: "Shipment Mismatch Alert", count: 2, severity: "High" }
    ],
    recentRiskSignals: cases
      .filter((item) => item.riskScore >= 55)
      .slice(0, 5)
      .map((item) => ({
        caseId: item.id,
        companyName: item.companyName,
        riskType: item.risk.redFlags[0].title,
        severity: item.riskLevel,
        status: "Open"
      }))
  };
}

function summarize(values: string[]) {
  return Array.from(new Set(values)).map((label) => {
    const count = values.filter((value) => value === label).length;
    return {
      label,
      count,
      percentage: Math.round((count / values.length) * 100)
    };
  });
}

export function submitApproval(caseId: string, payload: { decision?: string; rationale?: string; officer?: string }) {
  return {
    caseId,
    decision: payload.decision ?? "Request More Information",
    rationale: payload.rationale ?? "Officer rationale pending.",
    officer: payload.officer ?? "Credit Officer",
    workflow: {
      ...getCaseById(caseId).approvalWorkflow,
      currentStage: "Decision Recorded"
    },
    auditEntry: {
      at: new Date().toISOString(),
      actor: payload.officer ?? "Credit Officer",
      action: `Recorded decision: ${payload.decision ?? "Request More Information"}`,
      status: "Completed"
    }
  };
}

export function getMonitoring() {
  const active = tradeFinanceCases.filter((item) => item.status === "Approved" || item.status === "Credit Review" || item.status === "Verification Required");
  return {
    kpis: [
      { label: "Active Facilities", value: `${active.length}` },
      { label: "Outstanding Exposure", value: "HKD 82.4M" },
      { label: "Repayment Due", value: "HKD 8.2M" },
      { label: "Early Warnings", value: "4" },
      { label: "Watchlist Cases", value: "6" }
    ],
    facilities: active.slice(0, 6).map((item) => ({
      facilityId: item.id.replace("TF", "FAC"),
      sme: item.companyName,
      type: item.financingType,
      limit: formatMoney(item.amount, item.currency),
      status: item.riskScore >= 75 ? "Watchlist" : "Performing",
      risk: item.riskLevel
    })),
    riskTrend: [35, 44, 41, 58, 62, 55, 72],
    cashFlowMonitoring: [
      "Monthly inflow down 12%",
      "Buyer payment delayed 8 days",
      "Inventory turnover stable"
    ],
    earlyWarningSignals: tradeFinanceCases
      .flatMap((item) => item.monitoringSignals.map((signal) => ({ caseId: item.id, companyName: item.companyName, ...signal })))
      .slice(0, 6),
    recommendedActions: [
      "Contact Relationship Manager",
      "Request updated bank statement",
      "Move high-risk cases to watchlist"
    ]
  };
}
