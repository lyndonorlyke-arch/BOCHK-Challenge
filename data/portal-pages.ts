export type PortalPage = {
  href: string;
  label: string;
  title: string;
  description: string;
  status: "Not started" | "In progress" | "Submitted" | "Review" | "Approved" | "Action required";
  kpis: { label: string; value: string; detail: string; trend?: string }[];
  steps: string[];
};

export const clientPages: PortalPage[] = [
  {
    href: "/client/dashboard",
    label: "Dashboard",
    title: "SME Client Dashboard",
    description: "Track your TradeSafe facility application, pending actions, and secure messages.",
    status: "In progress",
    kpis: [
      { label: "Application", value: "72%", detail: "Profile and trade details captured", trend: "+12%" },
      { label: "Documents", value: "5/7", detail: "Two uploads still pending" },
      { label: "Messages", value: "3", detail: "Unread bank requests" }
    ],
    steps: ["Profile", "Documents", "Authorization", "Bank review", "Decision"]
  },
  {
    href: "/client/new-application",
    label: "New Application",
    title: "New Trade Finance Application",
    description: "Create a working capital request with buyer, invoice, shipment, and facility details.",
    status: "Not started",
    kpis: [
      { label: "Draft sections", value: "0/5", detail: "Start with company profile" },
      { label: "Estimated time", value: "18m", detail: "Guided multi-step flow" },
      { label: "Saved drafts", value: "1", detail: "Continue previous application" }
    ],
    steps: ["Company", "Trade", "Facility", "Documents", "Submit"]
  },
  {
    href: "/client/documents",
    label: "Documents",
    title: "Client Document Upload",
    description: "Upload invoices, purchase orders, shipping documents, and supporting KYB records.",
    status: "Action required",
    kpis: [
      { label: "Uploaded", value: "5", detail: "Files received by BOCHK" },
      { label: "Required", value: "2", detail: "Awaiting latest invoice and BL" },
      { label: "Accepted", value: "4", detail: "Passed client-side validation" }
    ],
    steps: ["Prepare", "Upload", "Review", "Submit"]
  },
  {
    href: "/client/data-authorization",
    label: "Data Authorization",
    title: "Data Authorization",
    description: "Consent to share trade, bank, logistics, and company registry data for assessment.",
    status: "Review",
    kpis: [
      { label: "Consents", value: "4/5", detail: "Registry consent pending" },
      { label: "Sources", value: "6", detail: "Connected data providers" },
      { label: "Expiry", value: "89d", detail: "Consent renewal window" }
    ],
    steps: ["Explain", "Select sources", "Authorize", "Confirm"]
  },
  {
    href: "/client/status",
    label: "Status",
    title: "Application Status",
    description: "View transparent milestones and client-visible requests without internal bank scoring.",
    status: "Submitted",
    kpis: [
      { label: "Stage", value: "Bank review", detail: "No client action needed" },
      { label: "SLA", value: "2d", detail: "Estimated response window" },
      { label: "Requests", value: "0", detail: "No outstanding items" }
    ],
    steps: ["Submitted", "Initial check", "Bank review", "Decision"]
  },
  {
    href: "/client/messages",
    label: "Messages",
    title: "Secure Messages",
    description: "Respond to bank requests and keep all application correspondence in one place.",
    status: "In progress",
    kpis: [
      { label: "Unread", value: "3", detail: "Two document requests" },
      { label: "Threads", value: "6", detail: "Across current application" },
      { label: "Last update", value: "Today", detail: "Relationship manager replied" }
    ],
    steps: ["Receive", "Respond", "Attach", "Resolve"]
  }
];

export const bankPages: PortalPage[] = [
  {
    href: "/bank/overview",
    label: "Overview",
    title: "Bank Console Overview",
    description: "Monitor SME trade finance cases, AI review queues, and operational workload.",
    status: "Review",
    kpis: [
      { label: "Active cases", value: "48", detail: "12 pending officer action", trend: "+8%" },
      { label: "Avg review", value: "2.4d", detail: "From intake to recommendation" },
      { label: "Exceptions", value: "7", detail: "Need compliance review" }
    ],
    steps: ["Intake", "Verification", "Risk review", "Memo", "Approval"]
  },
  {
    href: "/bank/case-intake",
    label: "Case Intake",
    title: "Case Intake",
    description: "Triage new applications, assign officers, and check document readiness.",
    status: "Action required",
    kpis: [
      { label: "New cases", value: "9", detail: "Arrived in the last 24 hours" },
      { label: "Assigned", value: "6", detail: "Officer ownership confirmed" },
      { label: "Missing docs", value: "3", detail: "Client follow-up required" }
    ],
    steps: ["Receive", "Validate", "Assign", "Start review"]
  },
  {
    href: "/bank/document-reader",
    label: "Document Reader",
    title: "AI Document Reader",
    description: "Extract invoice, shipment, counterparty, and facility fields for officer validation.",
    status: "In progress",
    kpis: [
      { label: "Parsed docs", value: "126", detail: "Across active cases" },
      { label: "Fields matched", value: "91%", detail: "Before officer override" },
      { label: "Exceptions", value: "14", detail: "Require manual check" }
    ],
    steps: ["Ingest", "Extract", "Compare", "Officer verify"]
  },
  {
    href: "/bank/trade-verification",
    label: "Trade Verification",
    title: "Trade Verification",
    description: "Cross-check invoices, purchase orders, logistics records, and duplicated trade signals.",
    status: "Review",
    kpis: [
      { label: "Matches", value: "83%", detail: "Document-to-data consistency" },
      { label: "Duplicate alerts", value: "2", detail: "Potential repeated invoice" },
      { label: "Verified trades", value: "31", detail: "Ready for memo drafting" }
    ],
    steps: ["Compare", "Detect", "Resolve", "Approve evidence"]
  },
  {
    href: "/bank/kyb-graph",
    label: "KYB Graph",
    title: "KYB Relationship Graph",
    description: "Inspect counterparties, directors, beneficial owners, and connected entities.",
    status: "Review",
    kpis: [
      { label: "Entities", value: "42", detail: "Connected to current portfolio" },
      { label: "Open checks", value: "5", detail: "Ownership links to confirm" },
      { label: "Network depth", value: "3", detail: "Relationship layers displayed" }
    ],
    steps: ["Resolve entities", "Map links", "Flag issues", "Record finding"]
  },
  {
    href: "/bank/risk-dashboard",
    label: "Risk Dashboard",
    title: "Risk Dashboard",
    description: "Review bank-only credit, fraud, compliance, and transaction risk indicators.",
    status: "Action required",
    kpis: [
      { label: "Risk band", value: "Medium", detail: "Composite internal model output" },
      { label: "Alerts", value: "7", detail: "Fraud and compliance indicators" },
      { label: "Overrides", value: "1", detail: "Officer rationale required" }
    ],
    steps: ["Score", "Explain", "Investigate", "Record decision"]
  },
  {
    href: "/bank/credit-memo",
    label: "Credit Memo",
    title: "AI Credit Memo",
    description: "Draft, review, and edit the internal credit memo before approval routing.",
    status: "In progress",
    kpis: [
      { label: "Draft ready", value: "86%", detail: "Sections generated from verified evidence" },
      { label: "Citations", value: "24", detail: "Linked back to documents" },
      { label: "Open comments", value: "4", detail: "Officer review notes" }
    ],
    steps: ["Generate", "Review", "Edit", "Submit"]
  },
  {
    href: "/bank/approval-audit",
    label: "Approval Audit",
    title: "Approval Workflow And Audit Trail",
    description: "Track approvals, decisions, overrides, and immutable audit events.",
    status: "Approved",
    kpis: [
      { label: "Approvers", value: "3/4", detail: "Final approval pending" },
      { label: "Audit events", value: "38", detail: "System and user actions" },
      { label: "Overrides", value: "2", detail: "Rationale captured" }
    ],
    steps: ["Officer", "Manager", "Risk", "Final approver"]
  },
  {
    href: "/bank/post-loan-monitoring",
    label: "Post-Loan Monitoring",
    title: "Post-Loan Monitoring",
    description: "Monitor funded facilities, repayment signals, shipment status, and early warning triggers.",
    status: "In progress",
    kpis: [
      { label: "Facilities", value: "22", detail: "Under active monitoring" },
      { label: "Early warnings", value: "4", detail: "Need relationship manager review" },
      { label: "Repayment due", value: "HK$8.2M", detail: "Next 30 days" }
    ],
    steps: ["Fund", "Monitor", "Alert", "Review", "Close"]
  }
];

export function findPage(href: string) {
  return [...clientPages, ...bankPages].find((page) => page.href === href);
}
