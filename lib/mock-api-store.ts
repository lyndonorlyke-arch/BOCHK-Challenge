import {
  caseStatuses,
  clientMessages,
  documentTypes,
  financingTypes,
  getBankCases,
  getCaseById,
  getClientApplications,
  getMonitoring,
  getPortfolio,
  riskLevels,
  type ApprovalWorkflow,
  type AuditLog,
  type CaseStatus,
  type ClientApplication,
  type ClientMessage,
  type CreditMemo,
  type DocumentType,
  type TradeDocument,
  type TradeFinanceCase
} from "@/lib/mock-backend";

type ClientDocumentStatus = ClientApplication["documents"][number]["status"];

export interface ClientApplicationsResponse {
  applications: ClientApplication[];
  financingTypes: typeof financingTypes;
}

export interface ClientMessagesResponse {
  messages: ClientMessage[];
}

export interface ClientStatusResponse {
  application: ClientApplication;
  timeline: {
    at: string;
    title: string;
    description: string;
    status: "Completed" | "Current" | "Pending";
  }[];
  nextAction: string;
}

export interface BankCasesResponse {
  cases: ReturnType<typeof getBankCases>;
  filters: {
    financingTypes: typeof financingTypes;
    riskLevels: typeof riskLevels;
    statuses: typeof caseStatuses;
  };
}

export interface BankCaseDetailResponse {
  case: TradeFinanceCase & {
    requestedAmount: string;
  };
}

export interface BankDocumentsResponse {
  case: {
    id: string;
    companyName: string;
    financingType: string;
  };
  documents: TradeDocument[];
  extractedFields: {
    documentType: DocumentType;
    field: string;
    value: string;
    confidence: number;
  }[];
  correctionLog: {
    at: string;
    officer: string;
    correction: string;
  }[];
}

export interface CreditMemoResponse {
  case: {
    id: string;
    companyName: string;
    financingType: string;
    requestedAmount: string;
  };
  memo: CreditMemo;
}

export interface ApprovalResponse {
  caseId: string;
  decision: string;
  rationale: string;
  officer: string;
  workflow: ApprovalWorkflow;
  auditEntry: AuditLog;
  message: string;
}

export interface MockActionResponse {
  id: string;
  caseId?: string;
  action: string;
  status: string;
  at: string;
  message: string;
}

type MockMutableState = {
  clientApplications: ClientApplication[];
  clientMessages: ClientMessage[];
  clientDocumentStatuses: Record<string, ClientDocumentStatus>;
  clientTimeline: Record<string, ClientStatusResponse["timeline"]>;
  bankCaseStatuses: Record<string, CaseStatus>;
  bankAuditLogs: Record<string, AuditLog[]>;
  bankDocumentConfirmations: Record<string, BankDocumentsResponse["correctionLog"]>;
  bankMemoOverrides: Record<string, CreditMemo>;
  bankRiskActions: Record<string, MockActionResponse>;
  monitoringActions: Record<string, MockActionResponse>;
};

// Prototype-only persistence. Next.js keeps this module in memory during a dev/server process.
// Replace these helpers with database-backed repository functions when wiring real systems.
const globalMockState = globalThis as typeof globalThis & { __bochkTradeSafeMockState?: MockMutableState };

function getMutableState(): MockMutableState {
  const state = (globalMockState.__bochkTradeSafeMockState ??= {
    clientApplications: [],
    clientMessages: [],
    clientDocumentStatuses: {},
    clientTimeline: {},
    bankCaseStatuses: {},
    bankAuditLogs: {},
    bankDocumentConfirmations: {},
    bankMemoOverrides: {},
    bankRiskActions: {},
    monitoringActions: {}
  });

  state.clientApplications ??= [];
  state.clientMessages ??= [];
  state.clientDocumentStatuses ??= {};
  state.clientTimeline ??= {};
  state.bankCaseStatuses ??= {};
  state.bankAuditLogs ??= {};
  state.bankDocumentConfirmations ??= {};
  state.bankMemoOverrides ??= {};
  state.bankRiskActions ??= {};
  state.monitoringActions ??= {};

  return state;
}

function money(amount: number, currency: "HKD" | "USD") {
  return `${currency} ${amount.toLocaleString("en-US")}`;
}

function nowIso() {
  return new Date().toISOString();
}

function documentStatusKey(applicationId: string, documentType: string) {
  return `${applicationId}:${documentType}`;
}

function toClientStatus(status: string): ClientApplication["status"] {
  if (status === "Credit Review") return "Under Review";
  if (status === "Missing Documents") return "Additional Information Required";
  return status as ClientApplication["status"];
}

function mergeApplicationDocuments(application: ClientApplication): ClientApplication {
  const state = getMutableState();
  return {
    ...application,
    documents: application.documents.map((document) => ({
      ...document,
      status: state.clientDocumentStatuses[documentStatusKey(application.id, document.name)] ?? document.status
    }))
  };
}

export function getClientApplicationsResponse(): ClientApplicationsResponse {
  const state = getMutableState();
  const storedIds = new Set(state.clientApplications.map((item) => item.id));
  return {
    applications: [
      ...state.clientApplications.map(mergeApplicationDocuments),
      ...getClientApplications().filter((item) => !storedIds.has(item.id)).map(mergeApplicationDocuments)
    ],
    financingTypes
  };
}

export function createStoredClientApplication(payload: Partial<TradeFinanceCase>): ClientApplication {
  const state = getMutableState();
  const currency = (payload.currency as "HKD" | "USD") ?? "USD";
  const amount = Number(payload.amount ?? 2000000);
  const id = `TF-2026-${Math.floor(1000 + Math.random() * 8999)}`;
  const documents = documentTypes.map((documentType) => ({
    name: documentType,
    description: `${documentType} for trade finance review.`,
    status: "Missing" as const
  }));
  const application: ClientApplication = {
    id,
    company: payload.companyName ?? "Bright Summit Trading Ltd.",
    user: payload.applicantName ?? "David Chan",
    type: (payload.financingType as ClientApplication["type"]) ?? "Import Loan",
    financingType: (payload.financingType as ClientApplication["financingType"]) ?? "Import Loan",
    amount: money(amount, currency),
    requestedAmount: money(amount, currency),
    submittedDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    status: "New Submission",
    action: "View Status",
    requiredAction: "Upload required trade documents",
    actionDue: "2026-06-18",
    documents
  };

  state.clientApplications.unshift(application);
  state.clientTimeline[id] = [
    {
      at: nowIso(),
      title: "Application submitted",
      description: `${application.company} submitted ${application.financingType} application ${id}.`,
      status: "Current"
    }
  ];
  return application;
}

export function getClientMessagesResponse(): ClientMessagesResponse {
  return {
    messages: [...clientMessages, ...getMutableState().clientMessages]
  };
}

export function createStoredClientMessage(payload: Partial<ClientMessage> & { body?: string }): ClientMessage {
  const state = getMutableState();
  const message: ClientMessage = {
    id: `MSG-${Date.now()}`,
    applicationId: payload.applicationId ?? "TF-2026-0001",
    title: payload.title ?? "Client reply sent",
    sender: payload.sender ?? "SME Client",
    recipient: payload.recipient ?? "BOCHK Relationship Manager",
    date: "Just now",
    time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
    tone: payload.tone ?? "green",
    body: payload.body ?? "Thank you. We have provided the requested information."
  };
  state.clientMessages.push(message);
  state.clientTimeline[message.applicationId] = [
    {
      at: nowIso(),
      title: "Secure reply sent",
      description: "Client sent a reply to BOCHK Relationship Manager.",
      status: "Completed"
    },
    ...(state.clientTimeline[message.applicationId] ?? [])
  ];
  return message;
}

export function createStoredClientDocument(payload: { applicationId?: string; documentType?: DocumentType; fileName?: string }) {
  const state = getMutableState();
  const applicationId = payload.applicationId ?? "TF-2026-0001";
  const type = payload.documentType ?? "Commercial Invoice";
  state.clientDocumentStatuses[documentStatusKey(applicationId, type)] = "Uploaded";
  state.clientTimeline[applicationId] = [
    {
      at: nowIso(),
      title: "Document uploaded",
      description: `${type} uploaded and queued for AI pre-check.`,
      status: "Current"
    },
    ...(state.clientTimeline[applicationId] ?? [])
  ];

  return {
    id: `${applicationId}-DOC-${Date.now()}`,
    applicationId,
    type,
    fileName: payload.fileName ?? `${type.toLowerCase().replaceAll(" ", "-")}.pdf`,
    status: "Uploaded" as const,
    confidence: 89,
    uploadedAt: nowIso()
  };
}

export function getClientStatusResponse(applicationId: string): ClientStatusResponse {
  const application = getClientApplicationsResponse().applications.find((item) => item.id === applicationId) ?? getClientApplicationsResponse().applications[0];
  const storedTimeline = getMutableState().clientTimeline[application.id] ?? [];
  return {
    application,
    timeline: [
      ...storedTimeline,
      { at: "2026-06-10T09:18:00+08:00", title: "Application received", description: "BOCHK received the submitted trade finance application.", status: "Completed" },
      { at: "2026-06-10T09:22:00+08:00", title: "Document pre-check started", description: "Trade documents were queued for completeness review.", status: "Completed" },
      { at: "2026-06-12T15:30:00+08:00", title: "Relationship manager review", description: application.requiredAction, status: "Current" }
    ],
    nextAction: application.requiredAction
  };
}

export function getBankCasesResponse(): BankCasesResponse {
  const state = getMutableState();
  return {
    cases: getBankCases().map((item) => ({
      ...item,
      status: state.bankCaseStatuses[item.id] ?? item.status
    })),
    filters: {
      financingTypes,
      riskLevels,
      statuses: caseStatuses
    }
  };
}

export function getBankCaseDetailResponse(caseId: string): BankCaseDetailResponse {
  const state = getMutableState();
  const tradeCase = getCaseById(caseId);
  return {
    case: {
      ...tradeCase,
      status: (state.bankCaseStatuses[tradeCase.id] ?? tradeCase.status) as TradeFinanceCase["status"],
      requestedAmount: money(tradeCase.amount, tradeCase.currency)
    }
  };
}

export function reviewBankCase(caseId: string, payload: { officer?: string; nextStatus?: CaseStatus; notes?: string }): MockActionResponse {
  const state = getMutableState();
  const tradeCase = getCaseById(caseId);
  const nextStatus = payload.nextStatus ?? "Credit Review";
  const at = nowIso();
  const response: MockActionResponse = {
    id: `CASE-ACTION-${Date.now()}`,
    caseId: tradeCase.id,
    action: "Case review completed",
    status: nextStatus,
    at,
    message: `${tradeCase.id} routed to ${nextStatus}`
  };

  state.bankCaseStatuses[tradeCase.id] = nextStatus;
  state.bankAuditLogs[tradeCase.id] = [
    {
      at,
      actor: payload.officer ?? "Credit Officer",
      action: `${response.action}. ${payload.notes ?? "Officer reviewed intake details and routed the case."}`,
      status: nextStatus
    },
    ...(state.bankAuditLogs[tradeCase.id] ?? [])
  ];
  return response;
}

export function getPortfolioResponse() {
  return getPortfolio();
}

export function getBankDocumentsResponse(caseId: string): BankDocumentsResponse {
  const state = getMutableState();
  const tradeCase = getCaseById(caseId);
  return {
    case: {
      id: tradeCase.id,
      companyName: tradeCase.companyName,
      financingType: tradeCase.financingType
    },
    documents: tradeCase.documents,
    extractedFields: tradeCase.documents.flatMap((document) =>
      document.extractedFields.map((field) => ({
        documentType: document.type,
        ...field
      }))
    ),
    correctionLog: [
      ...(state.bankDocumentConfirmations[tradeCase.id] ?? []),
      { at: "2026-06-13T10:03:00+08:00", officer: "Alice Chan", correction: "Corrected supplier name" },
      { at: "2026-06-13T10:11:00+08:00", officer: "Alice Chan", correction: "Marked shipment date for review" },
      { at: "2026-06-13T10:18:00+08:00", officer: "TradeSafe System", correction: "Saved extraction version v1.2" }
    ]
  };
}

export function confirmBankDocuments(caseId: string, payload: { officer?: string; notes?: string }) {
  const state = getMutableState();
  const entry = {
    at: nowIso(),
    officer: payload.officer ?? "Credit Officer",
    correction: payload.notes ?? "Confirmed extracted document fields for credit review"
  };
  state.bankDocumentConfirmations[caseId] = [entry, ...(state.bankDocumentConfirmations[caseId] ?? [])];
  state.bankAuditLogs[caseId] = [
    { at: entry.at, actor: entry.officer, action: entry.correction, status: "Completed" },
    ...(state.bankAuditLogs[caseId] ?? [])
  ];
  return entry;
}

export function getCreditMemoResponse(caseId: string): CreditMemoResponse {
  const tradeCase = getCaseById(caseId);
  return {
    case: {
      id: tradeCase.id,
      companyName: tradeCase.companyName,
      financingType: tradeCase.financingType,
      requestedAmount: money(tradeCase.amount, tradeCase.currency)
    },
    memo: getMutableState().bankMemoOverrides[tradeCase.id] ?? tradeCase.creditMemo
  };
}

export function regenerateCreditMemoSection(caseId: string, payload: { sectionTitle?: string }) {
  const state = getMutableState();
  const currentMemo = state.bankMemoOverrides[caseId] ?? getCaseById(caseId).creditMemo;
  const sectionTitle = payload.sectionTitle ?? currentMemo.sections[0]?.title ?? "Executive Summary";
  const nextMemo: CreditMemo = {
    ...currentMemo,
    status: "Generated",
    sections: currentMemo.sections.map((section) =>
      section.title === sectionTitle
        ? {
            ...section,
            body: `${section.body} Mock regenerated update at ${new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}: refreshed document confidence, trade verification, and officer review context have been summarized.`
          }
        : section
    )
  };
  state.bankMemoOverrides[caseId] = nextMemo;
  state.bankAuditLogs[caseId] = [
    { at: nowIso(), actor: "AI Credit Co-pilot", action: `Regenerated memo section: ${sectionTitle}`, status: "Completed" },
    ...(state.bankAuditLogs[caseId] ?? [])
  ];
  return nextMemo;
}

export function getRiskResponse(caseId: string) {
  const tradeCase = getCaseById(caseId);
  return {
    case: {
      id: tradeCase.id,
      companyName: tradeCase.companyName,
      financingType: tradeCase.financingType,
      requestedAmount: money(tradeCase.amount, tradeCase.currency),
      status: getMutableState().bankCaseStatuses[tradeCase.id] ?? tradeCase.status
    },
    risk: tradeCase.risk,
    verification: tradeCase.verification
  };
}

export function recordRiskAction(caseId: string, payload: { action?: string; officer?: string }): MockActionResponse {
  const state = getMutableState();
  const action = payload.action ?? "Request More Info";
  const at = nowIso();
  const nextStatus: CaseStatus =
    action === "Approve" || action === "Conditional Approve"
      ? "Approved"
      : action === "Reject"
        ? "Rejected"
        : action === "Request More Info"
          ? "Missing Documents"
          : "Credit Review";
  const response: MockActionResponse = {
    id: `RISK-ACTION-${Date.now()}`,
    caseId,
    action,
    status: nextStatus,
    at,
    message: `Risk dashboard action recorded: ${action}`
  };

  state.bankRiskActions[caseId] = response;
  state.bankCaseStatuses[caseId] = nextStatus;
  state.bankAuditLogs[caseId] = [
    {
      at,
      actor: payload.officer ?? "Credit Officer",
      action: `Risk dashboard action: ${action}`,
      status: nextStatus
    },
    ...(state.bankAuditLogs[caseId] ?? [])
  ];
  return response;
}

export function submitCreditMemo(caseId: string, payload: { officer?: string }): MockActionResponse {
  const state = getMutableState();
  const currentMemo = state.bankMemoOverrides[caseId] ?? getCaseById(caseId).creditMemo;
  const at = nowIso();
  const nextMemo: CreditMemo = {
    ...currentMemo,
    status: "Submitted"
  };
  const response: MockActionResponse = {
    id: `MEMO-SUBMIT-${Date.now()}`,
    caseId,
    action: "Submit for Approval",
    status: "Submitted",
    at,
    message: "AI credit memo submitted to approval workflow"
  };

  state.bankMemoOverrides[caseId] = nextMemo;
  state.bankAuditLogs[caseId] = [
    {
      at,
      actor: payload.officer ?? "Credit Officer",
      action: "Submitted AI credit memo for approval",
      status: "Completed"
    },
    ...(state.bankAuditLogs[caseId] ?? [])
  ];
  return response;
}

export function exportCreditMemo(caseId: string, payload: { officer?: string }): MockActionResponse {
  const state = getMutableState();
  const at = nowIso();
  const response: MockActionResponse = {
    id: `MEMO-PDF-${Date.now()}`,
    caseId,
    action: "Export PDF",
    status: "Generated",
    at,
    message: "Mock PDF export generated and logged"
  };

  state.bankAuditLogs[caseId] = [
    {
      at,
      actor: payload.officer ?? "Credit Officer",
      action: `Exported AI credit memo PDF (${response.id})`,
      status: "Completed"
    },
    ...(state.bankAuditLogs[caseId] ?? [])
  ];
  return response;
}

export function submitApprovalDecision(caseId: string, payload: { decision?: string; rationale?: string; officer?: string }): ApprovalResponse {
  const state = getMutableState();
  const decision = payload.decision ?? "Request More Information";
  const nextStatus: CaseStatus = decision === "Reject" ? "Rejected" : decision === "Request More Information" ? "Missing Documents" : "Approved";
  const auditEntry: AuditLog = {
    at: nowIso(),
    actor: payload.officer ?? "Credit Officer",
    action: `Recorded decision: ${decision}. Rationale: ${payload.rationale ?? "Officer rationale pending."}`,
    status: nextStatus
  };
  state.bankCaseStatuses[caseId] = nextStatus;
  state.bankAuditLogs[caseId] = [auditEntry, ...(state.bankAuditLogs[caseId] ?? [])];
  return {
    caseId,
    decision,
    rationale: payload.rationale ?? "Officer rationale pending.",
    officer: payload.officer ?? "Credit Officer",
    workflow: {
      ...getCaseById(caseId).approvalWorkflow,
      currentStage: "Decision Recorded"
    },
    auditEntry,
    message: "Mock approval decision recorded"
  };
}

export function getAuditResponse(caseId: string) {
  const tradeCase = getCaseById(caseId);
  return {
    case: {
      id: tradeCase.id,
      companyName: tradeCase.companyName,
      riskLevel: tradeCase.riskLevel
    },
    workflow: tradeCase.approvalWorkflow,
    auditLogs: [...(getMutableState().bankAuditLogs[caseId] ?? []), ...tradeCase.auditLogs],
    evidenceHashes: [
      { item: "Document Hash", value: "a3f7c9b1d4e2f5a9" },
      { item: "Credit Memo Hash", value: "b8d4e6f2a1c3d5e7" },
      { item: "Decision Hash", value: "c7e2d9a1b3f4c6e8" },
      { item: "Ledger Status", value: "Committed" }
    ]
  };
}

export function getMonitoringResponse() {
  return {
    ...getMonitoring(),
    actionStatuses: getMutableState().monitoringActions
  };
}

export function recordMonitoringAction(payload: { action?: string; officer?: string }): MockActionResponse {
  const state = getMutableState();
  const action = payload.action ?? "Review monitoring signal";
  const at = nowIso();
  const response: MockActionResponse = {
    id: `MONITORING-ACTION-${Date.now()}`,
    action,
    status: "Queued",
    at,
    message: `${action} queued for follow-up`
  };

  state.monitoringActions[action] = response;
  state.bankAuditLogs.monitoring = [
    {
      at,
      actor: payload.officer ?? "Credit Officer",
      action: `Post-loan monitoring action queued: ${action}`,
      status: "Queued"
    },
    ...(state.bankAuditLogs.monitoring ?? [])
  ];
  return response;
}
