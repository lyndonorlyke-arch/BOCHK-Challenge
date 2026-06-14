export const clientApplication = {
  id: "TF25052100087",
  company: "Bright Summit Trading Ltd.",
  user: "David Chan",
  financingType: "Import Loan",
  requestedAmount: "HKD 5,000,000.00",
  submittedDate: "20 May 2025",
  status: "Additional Information Required",
  requiredAction: "Please upload revised purchase order",
  actionDue: "30 May 2025"
};

export const financingTypes = [
  {
    title: "Import Loan",
    description: "Finance your import of goods and services.",
    icon: "ship"
  },
  {
    title: "Export Loan",
    description: "Finance your export receivables.",
    icon: "truck"
  },
  {
    title: "Invoice Financing",
    description: "Unlock cash flow tied to your invoices.",
    icon: "invoice"
  },
  {
    title: "Working Capital Trade Loan",
    description: "Support your short-term trade working capital needs.",
    icon: "growth"
  }
];

export const applications = [
  {
    id: "TF-2024-000567",
    type: "Import Loan",
    amount: "HKD 2,500,000.00",
    status: "Draft",
    action: "Continue Application"
  },
  {
    id: "TF-2024-000523",
    type: "Export Loan",
    amount: "HKD 1,800,000.00",
    status: "Submitted",
    action: "View Details"
  },
  {
    id: "TF-2024-000498",
    type: "Invoice Financing",
    amount: "HKD 950,000.00",
    status: "Documents Required",
    action: "Upload Documents"
  },
  {
    id: "TF-2024-000471",
    type: "Working Capital Trade Loan",
    amount: "HKD 3,200,000.00",
    status: "Under Review",
    action: "View Details"
  }
];

export const requiredDocuments = [
  {
    name: "Commercial Invoice",
    description: "Invoice with item details and amount.",
    status: "Uploaded"
  },
  {
    name: "Purchase Order",
    description: "Buyer's purchase order.",
    status: "Missing"
  },
  {
    name: "Sales Contract",
    description: "Sales agreement or contract.",
    status: "Needs Review"
  },
  {
    name: "Shipping Document",
    description: "Bill of lading or airway bill.",
    status: "Uploaded"
  },
  {
    name: "Payment Record",
    description: "Proof of payment or remittance.",
    status: "Uploaded"
  },
  {
    name: "Bank Statement",
    description: "Latest company bank statement.",
    status: "Uploaded"
  }
];

export const applicationSteps = [
  "Select Financing Type",
  "Basic Information",
  "Upload Documents",
  "Data Authorization",
  "Submit"
];

export const dataSources = [
  {
    title: "Cargo / Logistics Verification Data",
    description: "Allow BOCHK to access logistics and shipment tracking data from trusted providers."
  },
  {
    title: "Trade Document Verification Data",
    description: "Allow BOCHK to verify invoices, bills of lading, purchase orders, and contracts."
  },
  {
    title: "Payment Record Data",
    description: "Allow BOCHK to access settlement records related to this trade."
  },
  {
    title: "Business Cash-flow Data",
    description: "Allow BOCHK to access business account cash-flow information for repayment assessment."
  },
  {
    title: "Existing BOCHK Relationship Data",
    description: "Allow BOCHK to use your existing relationship data to support this application."
  }
];

export const statusTimeline = [
  {
    date: "20 May 2025",
    time: "10:15",
    title: "Application submitted",
    description: "Your application has been successfully submitted.",
    state: "complete"
  },
  {
    date: "20 May 2025",
    time: "10:20",
    title: "Documents received",
    description: "We have received your submitted documents.",
    state: "complete"
  },
  {
    date: "22 May 2025",
    time: "14:35",
    title: "AI pre-check completed",
    description: "Preliminary review of your documents has been completed.",
    state: "complete"
  },
  {
    date: "23 May 2025",
    time: "09:45",
    title: "Additional information requested",
    description: "We need additional information to continue the review.",
    state: "current"
  },
  {
    date: "--",
    time: "",
    title: "Pending",
    description: "Credit review and decision pending.",
    state: "pending"
  }
];

export const messages = [
  {
    title: "Additional document request",
    sender: "Mr. Chan Tai Man (Relationship Manager)",
    date: "Today",
    time: "10:30",
    tone: "red"
  },
  {
    title: "Relationship manager message",
    sender: "Mr. Chan Tai Man (Relationship Manager)",
    date: "Yesterday",
    time: "16:45",
    tone: "blue"
  },
  {
    title: "Application update",
    sender: "Trade Finance Operations Team",
    date: "22 May 2025",
    time: "11:20",
    tone: "green"
  },
  {
    title: "Submission confirmation",
    sender: "TradeSafe System",
    date: "20 May 2025",
    time: "09:15",
    tone: "purple"
  }
];

export const relationshipManager = {
  name: "Mr. Chan Tai Man",
  role: "Relationship Manager",
  department: "Commercial Banking Department",
  bank: "Bank of China (Hong Kong)",
  phone: "+852 3988 2388",
  email: "kelvin.leung@bochk.com"
};
