"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ChangeEvent, type DragEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Bell,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock3,
  Download,
  FileText,
  Headphones,
  Info,
  MessageSquare,
  Paperclip,
  Phone,
  Save,
  Send,
  ShieldCheck,
  Ship,
  TrendingUp,
  Truck,
  Upload,
  UserRound,
  WalletCards
} from "lucide-react";
import {
  applicationSteps,
  dataSources,
  financingTypes,
  relationshipManager,
  statusTimeline
} from "@/data/client-portal";
import type { ClientApplication, ClientMessage } from "@/lib/mock-backend";
import {
  clientTimelineEntry,
  documentStatusKey,
  makeClientApplication,
  makeClientReply,
  updateDemoState,
  useDemoState
} from "@/lib/demo-store";

type ClientApplicationsResponse = {
  applications: ClientApplication[];
};

type ClientMessagesResponse = {
  messages: ClientMessage[];
};

function useClientApplicationsData() {
  const demoState = useDemoState();
  const [applications, setApplications] = useState<ClientApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch("/api/client/applications")
      .then((response) => response.json() as Promise<ClientApplicationsResponse>)
      .then((data) => {
        if (active) {
          setApplications(data.applications);
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const mergedApplications = useMemo(() => {
    const demoIds = new Set(demoState.clientApplications.map((item) => item.id));
    return [...demoState.clientApplications, ...applications.filter((item) => !demoIds.has(item.id))];
  }, [applications, demoState.clientApplications]);

  const clientApplication = mergedApplications[0];
  const requiredDocuments = useMemo(() => {
    if (!clientApplication) {
      return [];
    }

    return clientApplication.documents.map((document) => ({
      ...document,
      status: demoState.clientDocumentStatuses[documentStatusKey(clientApplication.id, document.name)] ?? document.status
    }));
  }, [clientApplication, demoState.clientDocumentStatuses]);

  return {
    applications: mergedApplications,
    clientApplication,
    requiredDocuments,
    isLoading
  };
}

function useClientMessagesData() {
  const demoState = useDemoState();
  const [messages, setMessages] = useState<ClientMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch("/api/client/messages")
      .then((response) => response.json() as Promise<ClientMessagesResponse>)
      .then((data) => {
        if (active) {
          setMessages(data.messages);
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return { messages: [...messages, ...demoState.clientReplies], isLoading };
}

function PageShell({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0 space-y-6">
      <header>
        <h1 className="break-words text-2xl font-bold tracking-normal text-bank-navy sm:text-3xl">{title}</h1>
        {subtitle ? <p className="mt-2 max-w-4xl text-sm leading-6 text-bank-muted sm:text-base">{subtitle}</p> : null}
      </header>
      {children}
    </div>
  );
}

function Panel({
  title,
  action,
  children,
  className = ""
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`min-w-0 overflow-hidden rounded-lg border border-bank-line bg-white shadow-sm ${className}`}>
      {title || action ? (
        <header className="flex min-w-0 flex-wrap items-center justify-between gap-4 border-b border-bank-line px-4 py-3 sm:px-5">
          {title ? <h2 className="text-base font-bold text-bank-navy">{title}</h2> : <span />}
          {action}
        </header>
      ) : null}
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}

function LoadingPanel({ title }: { title: string }) {
  return (
    <PageShell title={title}>
      <Panel>
        <div className="grid min-h-40 place-items-center text-sm font-semibold text-bank-muted">Loading mock backend data...</div>
      </Panel>
    </PageShell>
  );
}

function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-bank-red px-5 text-sm font-bold text-white shadow-sm hover:bg-bank-darkRed">
      {children}
      <ChevronRight size={18} />
    </Link>
  );
}

function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button type="button" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-bank-line bg-white px-4 text-sm font-bold text-bank-navy hover:border-bank-red" onClick={onClick}>
      {children}
    </button>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Uploaded: "bg-emerald-50 text-emerald-700",
    Missing: "bg-red-50 text-red-700",
    "Needs Review": "bg-orange-50 text-orange-700",
    Draft: "bg-slate-100 text-slate-700",
    Submitted: "bg-blue-50 text-blue-700",
    "Documents Required": "bg-orange-50 text-orange-700",
    "Under Review": "bg-blue-50 text-blue-700",
    Approved: "bg-emerald-50 text-emerald-700",
    Verified: "bg-emerald-50 text-emerald-700",
    "Additional Information Required": "bg-orange-50 text-orange-700"
  };
  return <span className={`inline-flex w-fit max-w-none whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-bold ${map[status] ?? "bg-slate-100 text-slate-700"}`}>{status}</span>;
}

function StepProgress({ current }: { current: number }) {
  return (
    <ol className="grid gap-3 rounded-lg bg-white py-2 sm:grid-cols-2 lg:grid-cols-5">
      {applicationSteps.map((step, index) => {
        const stepNumber = index + 1;
        const done = stepNumber < current;
        const active = stepNumber === current;
        return (
          <li key={step} className="relative flex items-center gap-3 sm:flex-col sm:gap-2">
            <span
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border text-sm font-bold ${
                done || active ? "border-bank-red bg-bank-red text-white" : "border-bank-line bg-white text-bank-muted"
              }`}
            >
              {done ? <Check size={18} /> : stepNumber}
            </span>
            <span className={`text-sm font-bold ${active ? "text-bank-red" : done ? "text-bank-navy" : "text-bank-muted"}`}>
              {stepNumber}. {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function DocumentStatusIcon({ status }: { status: string }) {
  if (status === "Uploaded" || status === "Verified") {
    return <CheckCircle2 size={18} className="text-emerald-600" />;
  }
  if (status === "Missing") {
    return <Info size={18} className="text-red-600" />;
  }
  return <Clock3 size={18} className="text-orange-500" />;
}

function FinancingIcon({ icon }: { icon: string }) {
  const icons = {
    ship: Ship,
    truck: Truck,
    invoice: FileText,
    growth: TrendingUp
  };
  const Icon = icons[icon as keyof typeof icons] ?? FileText;
  return <Icon size={28} />;
}

function ManagerCard() {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [messageDraft, setMessageDraft] = useState("");
  const [messageStatus, setMessageStatus] = useState("");

  const sendManagerMessage = async () => {
    const trimmedMessage = messageDraft.trim();
    if (!trimmedMessage) {
      setMessageStatus("Please type a message before sending.");
      return;
    }

    await fetch("/api/client/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        applicationId: "TF-2026-0001",
        body: trimmedMessage,
        sender: "SME Client",
        recipient: relationshipManager.name
      })
    }).catch(() => undefined);
    updateDemoState((state) => ({
      ...state,
      clientReplies: [...state.clientReplies, makeClientReply("TF-2026-0001", trimmedMessage)],
      clientTimeline: [
        clientTimelineEntry("Message sent", `A message was sent to ${relationshipManager.name}.`),
        ...state.clientTimeline
      ]
    }));
    setMessageDraft("");
    setMessageStatus("Message sent to your Relationship Manager.");
  };

  return (
    <div className="h-full">
      <div className="flex gap-4">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-slate-100 text-bank-navy">
          <UserRound size={30} />
        </div>
        <div>
          <h3 className="font-bold text-bank-navy">{relationshipManager.name}</h3>
          <p className="mt-1 text-sm leading-6 text-bank-muted">
            {relationshipManager.role}
            <br />
            {relationshipManager.department}
            <br />
            {relationshipManager.bank}
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        <SecondaryButton onClick={() => {
          setIsMessageOpen(true);
          setMessageStatus("");
        }}>
          <MessageSquare size={16} />
          Message
        </SecondaryButton>
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-bank-red px-4 text-sm font-bold text-white"
          onClick={() => setIsContactOpen(true)}
        >
          <Phone size={16} />
          Contact
        </button>
      </div>
      {isMessageOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 px-4 py-6">
          <div className="w-full max-w-lg rounded-lg border border-bank-line bg-white shadow-2xl">
            <div className="border-b border-bank-line px-5 py-4">
              <h3 className="text-lg font-bold text-bank-navy">Message Relationship Manager</h3>
              <p className="mt-1 text-sm text-bank-muted">Send a secure demo message to {relationshipManager.name}.</p>
            </div>
            <div className="p-5">
              <label className="block">
                <span className="text-sm font-bold text-bank-navy">Your message</span>
                <textarea
                  className="mt-2 min-h-32 w-full rounded-md border border-bank-line p-3 text-sm text-bank-navy outline-none focus:border-bank-red"
                  placeholder="Type your message here..."
                  value={messageDraft}
                  onChange={(event) => setMessageDraft(event.target.value)}
                />
              </label>
              {messageStatus ? <p className="mt-3 text-sm font-bold text-bank-red">{messageStatus}</p> : null}
              <div className="mt-5 flex flex-col justify-end gap-3 sm:flex-row">
                <button
                  type="button"
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-bank-line bg-white px-4 text-sm font-bold text-bank-navy"
                  onClick={() => setIsMessageOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-bank-red px-5 text-sm font-bold text-white"
                  onClick={sendManagerMessage}
                >
                  Send Message
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {isContactOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 px-4 py-6">
          <div className="w-full max-w-md rounded-lg border border-bank-line bg-white shadow-2xl">
            <div className="border-b border-bank-line px-5 py-4">
              <h3 className="text-lg font-bold text-bank-navy">Hong Kong Contact</h3>
              <p className="mt-1 text-sm text-bank-muted">Contact your BOCHK Relationship Manager for this demo application.</p>
            </div>
            <div className="space-y-4 p-5">
              <div className="rounded-lg border border-bank-line bg-bank-bg p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-bank-muted">Relationship Manager</p>
                <p className="mt-1 font-bold text-bank-navy">{relationshipManager.name}</p>
              </div>
              <div className="rounded-lg border border-bank-line p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-bank-muted">Hong Kong Telephone</p>
                <p className="mt-1 text-lg font-bold text-bank-navy">+852 3988 2388</p>
              </div>
              <div className="rounded-lg border border-bank-line p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-bank-muted">Email</p>
                <p className="mt-1 break-all text-lg font-bold text-bank-navy">tradesafe.hk@bochk.example</p>
              </div>
              <button
                type="button"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-bank-red px-5 text-sm font-bold text-white"
                onClick={() => setIsContactOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function ClientDashboardPage() {
  const { applications, clientApplication, requiredDocuments, isLoading } = useClientApplicationsData();

  if (isLoading && !clientApplication) {
    return <LoadingPanel title="TradeSafe Client Portal" />;
  }

  if (!clientApplication) {
    return <LoadingPanel title="TradeSafe Client Portal" />;
  }

  return (
    <div className="space-y-6">
      <section className="min-w-0 overflow-hidden rounded-lg border border-bank-line bg-white shadow-sm">
        <div className="grid min-w-0 gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:items-center">
          <div>
            <p className="text-lg font-semibold text-bank-navy">Welcome back, {clientApplication.user}</p>
            <h1 className="mt-2 text-2xl font-bold tracking-normal text-bank-navy sm:text-3xl">Start your Cross-border Trade Finance Application</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-bank-muted">Submit your application and upload trade documents securely. Track progress in real time.</p>
          </div>
          <div className="hidden min-h-32 rounded-lg bg-gradient-to-r from-blue-50 via-white to-red-50 p-5 lg:block">
            <div className="flex h-full items-end justify-end gap-3">
              <div className="h-12 w-20 rounded-t-md bg-bank-blue/20" />
              <div className="h-20 w-16 rounded-t-md bg-bank-blue/30" />
              <div className="h-28 w-14 rounded-t-md bg-bank-blue/40" />
              <div className="grid h-20 w-20 place-items-center rounded-full border-8 border-bank-red text-bank-red">
                <span className="h-8 w-8 rounded-sm border-4 border-bank-red" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["New Trade Finance Application", "Start a new application", "/client/new-application", FileText],
          ["Upload Trade Documents", "Upload files securely", "/client/documents", Upload],
          ["View Application Status", "Track your applications", "/client/status", ClipboardList],
          ["Contact Relationship Manager", "Get in touch with your RM", "/client/messages", UserRound]
        ].map(([title, body, href, Icon]) => (
          <Link key={title as string} href={href as string} className="flex min-h-24 items-center gap-4 rounded-lg border border-bank-line bg-white p-5 shadow-sm hover:border-bank-red">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-bank-red to-red-500 text-white shadow-sm">
              <Icon size={26} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-bold text-bank-navy">{title as string}</span>
              <span className="mt-1 block text-sm text-bank-muted">{body as string}</span>
            </span>
            <ChevronRight size={20} className="text-bank-navy" />
          </Link>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,460px)]">
        <Panel title="Current Applications" action={<Link href="/client/status" className="text-sm font-bold text-bank-red">View all applications</Link>}>
          <div className="w-full max-w-full overflow-x-auto">
            <table className="min-w-[760px] text-left text-sm">
              <thead className="border-b border-bank-line text-bank-muted">
                <tr>
                  <th className="py-3 font-semibold">Application ID</th>
                  <th className="py-3 font-semibold">Financing Type</th>
                  <th className="py-3 font-semibold">Requested Amount</th>
                  <th className="py-3 font-semibold">Current Status</th>
                  <th className="py-3 font-semibold">Required Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bank-line">
                {applications.map((application) => (
                  <tr key={application.id}>
                    <td className="py-3 font-medium text-bank-navy">{application.id}</td>
                    <td className="py-3">{application.type}</td>
                    <td className="py-3">{application.amount}</td>
                    <td className="py-3"><StatusPill status={application.status} /></td>
                    <td className="py-3"><Link href="/client/status" className="font-bold text-bank-red">{application.action}</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel title="Document Checklist" action={<Link href="/client/documents" className="text-sm font-bold text-bank-red">View all</Link>}>
            <ul className="divide-y divide-bank-line">
              {requiredDocuments.map((document) => (
                <li key={document.name} className="flex items-center justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
                  <span className="flex items-center gap-3 text-sm font-medium text-bank-navy">
                    <DocumentStatusIcon status={document.status} />
                    {document.name}
                  </span>
                  <StatusPill status={document.status} />
                </li>
              ))}
            </ul>
            <p className="mt-3 border-t border-bank-line pt-3 text-xs font-semibold text-bank-muted">Keep your documents up to date for faster processing.</p>
          </Panel>
          <Panel title="Message from your Relationship Manager" action={<Link href="/client/messages" className="text-sm font-bold text-bank-red">View all</Link>}>
            <div className="rounded-lg border border-red-100 bg-red-50/60 p-4">
              <div className="flex gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-bank-red">
                  <UserRound size={26} />
                </div>
                <div className="min-w-0 text-sm leading-6">
                  <p className="font-semibold text-bank-navy">Dear {clientApplication.user},</p>
                  <p className="mt-1 text-bank-muted">Thank you for banking with BOCHK. Please feel free to contact me about your application.</p>
                  <p className="mt-2 font-bold text-bank-navy">{relationshipManager.name}</p>
                  <p className="text-xs font-semibold text-bank-muted">Relationship Manager</p>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </section>

      <Panel title="Our Trade Finance Solutions">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {financingTypes.map((type) => (
            <article key={type.title} className="rounded-lg border border-bank-line p-5">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-full border border-red-100 text-bank-red">
                <FinancingIcon icon={type.icon} />
              </div>
              <h3 className="font-bold text-bank-navy">{type.title}</h3>
              <p className="mt-2 text-sm leading-6 text-bank-muted">{type.description}</p>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}

export function ClientNewApplicationPage() {
  const [selectedFinancingType, setSelectedFinancingType] = useState(financingTypes[0].title);

  return (
    <PageShell title="New Trade Finance Application" subtitle="Start your cross-border trade finance application. Please provide accurate information to help us process your request efficiently.">
      <StepProgress current={2} />
      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(300px,360px)]">
        <div className="space-y-0 rounded-lg border border-bank-line bg-white shadow-sm">
          <div className="border-b border-bank-line p-5">
            <h2 className="text-xl font-bold text-bank-navy">Select Financing Type</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {financingTypes.map((type) => (
                <button
                  key={type.title}
                  type="button"
                  className={`grid min-h-44 grid-rows-[36px_56px_1fr] rounded-lg border p-5 text-left ${selectedFinancingType === type.title ? "border-bank-red bg-red-50/40" : "border-bank-line bg-white"}`}
                  onClick={() => setSelectedFinancingType(type.title)}
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-8 min-w-8 items-start justify-start text-bank-red"><FinancingIcon icon={type.icon} /></span>
                    <span className={`h-6 w-6 rounded-full border ${selectedFinancingType === type.title ? "border-bank-red bg-bank-red ring-4 ring-red-50" : "border-bank-line"}`} />
                  </div>
                  <h3 className="self-start pt-4 font-bold leading-6 text-bank-navy">{type.title}</h3>
                  <p className="pt-2 text-sm leading-6 text-bank-muted">{type.description}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="p-5">
            <h2 className="text-xl font-bold text-bank-navy">Basic Information</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                ["Company Name", "Bright Summit Trading Ltd."],
                ["Business Registration Number", "76543218-000-07-23-1"],
                ["Requested Amount", "2,000,000.00"],
                ["Currency", "USD - US Dollar"],
                ["Trade Route", "Hong Kong -> Shenzhen"],
                ["Buyer Country", "China (Mainland)"],
                ["Supplier Country", "Hong Kong SAR"],
                ["Expected Repayment Source", "Sales Proceeds"]
              ].map(([label, value]) => (
                <label key={label} className="block">
                  <span className="flex min-h-10 items-end text-sm font-semibold leading-5 text-bank-navy">{label}</span>
                  <input className="mt-2 min-h-11 w-full rounded-md border border-bank-line px-3 text-sm text-bank-navy outline-none focus:border-bank-red" defaultValue={value} />
                </label>
              ))}
            </div>
          </div>
        </div>
        <Panel>
          <div className="flex gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-red-50 text-bank-red">
              <Headphones size={28} />
            </span>
            <div>
              <h2 className="text-xl font-bold text-bank-navy">Need help?</h2>
              <p className="mt-2 text-sm leading-6 text-bank-muted">Need help? Contact your BOCHK Relationship Manager.</p>
            </div>
          </div>
          <div className="mt-6 border-t border-bank-line pt-6">
            <ManagerCard />
          </div>
        </Panel>
      </section>
      <div className="flex flex-col justify-between gap-3 rounded-lg border border-bank-line bg-white p-4 sm:flex-row">
        <SecondaryButton><Save size={17} />Save Draft</SecondaryButton>
        <PrimaryLink href="/client/documents">Continue to Document Upload</PrimaryLink>
      </div>
    </PageShell>
  );
}

export function ClientDocumentsPage() {
  const { requiredDocuments, clientApplication, isLoading } = useClientApplicationsData();
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [draftStatus, setDraftStatus] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (isLoading && !clientApplication) {
    return <LoadingPanel title="Upload Trade Documents" />;
  }

  if (!clientApplication) {
    return <LoadingPanel title="Upload Trade Documents" />;
  }

  const uploadedCount = requiredDocuments.filter((document) => document.status === "Uploaded" || document.status === "Verified").length;

  const nextUploadTarget = () => requiredDocuments.find((document) => document.status !== "Uploaded" && document.status !== "Verified")?.name ?? requiredDocuments[0]?.name ?? "Commercial Invoice";

  const uploadDocument = (documentName: string, fileName?: string) => {
    if (uploadProgress[documentName] !== undefined) {
      return;
    }

    setUploadProgress((current) => ({ ...current, [documentName]: 12 }));
    const timer = window.setInterval(() => {
      setUploadProgress((current) => {
        const nextValue = Math.min((current[documentName] ?? 12) + 22, 100);
        if (nextValue >= 100) {
          window.clearInterval(timer);
          fetch("/api/client/documents", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              applicationId: clientApplication.id,
              documentType: documentName,
              fileName: fileName ?? `${documentName.toLowerCase().replaceAll(" ", "-")}-uploaded.pdf`
            })
          }).catch(() => undefined);
          updateDemoState((state) => ({
            ...state,
            clientDocumentStatuses: {
              ...state.clientDocumentStatuses,
              [documentStatusKey(clientApplication.id, documentName)]: "Uploaded"
            },
            clientTimeline: [
              clientTimelineEntry("Document uploaded", `${documentName} was uploaded and queued for BOCHK pre-check.`),
              ...state.clientTimeline
            ]
          }));
        }
        return { ...current, [documentName]: nextValue };
      });
    }, 260);
  };

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    uploadDocument(nextUploadTarget(), file.name);
    event.target.value = "";
  };

  const handleDropZoneDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      uploadDocument(nextUploadTarget(), file.name);
    }
  };

  const saveDocumentsDraft = () => {
    setDraftStatus(`Draft saved at ${new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}.`);
  };

  return (
    <PageShell title="Upload Trade Documents" subtitle="Upload the required trade documents for your application. AI pre-check will help identify missing or incomplete information before submission.">
      <StepProgress current={3} />
      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
        <div className="space-y-5">
          <Panel>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {requiredDocuments.map((document) => (
                <article key={document.name} className="rounded-lg border border-bank-line p-5">
                  <div className="grid h-12 w-12 place-items-center rounded-md border border-red-100 bg-white text-bank-red">
                    <FileText size={30} />
                  </div>
                  <h3 className="mt-4 font-bold leading-5 text-bank-navy">{document.name}</h3>
                  <p className="mt-2 text-sm leading-5 text-bank-muted">{document.description}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <StatusPill status={document.status} />
                    <button
                      type="button"
                      className="rounded-md border border-bank-line px-3 py-1.5 text-xs font-bold text-bank-navy hover:border-bank-red"
                      onClick={() => uploadDocument(document.name)}
                    >
                      {document.status === "Uploaded" || document.status === "Verified" ? "Re-upload" : "Upload"}
                    </button>
                  </div>
                  {uploadProgress[document.name] !== undefined ? (
                    <div className="mt-4">
                      <div className="h-2 rounded-full bg-bank-bg">
                        <div className="h-2 rounded-full bg-bank-red" style={{ width: `${uploadProgress[document.name]}%` }} />
                      </div>
                      <p className="mt-2 text-xs font-semibold text-bank-muted">{uploadProgress[document.name] >= 100 ? "Upload complete" : `Uploading ${uploadProgress[document.name]}%`}</p>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
            <button
              type="button"
              className="mt-5 grid min-h-48 w-full place-items-center rounded-lg border-2 border-dashed border-slate-300 bg-white p-6 text-center hover:border-bank-red hover:bg-red-50/30"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(event) => event.preventDefault()}
              onDrop={handleDropZoneDrop}
            >
              <div>
                <Upload className="mx-auto h-12 w-12 text-bank-red" />
                <p className="mt-4 text-lg font-bold text-bank-navy">Drag and drop files here or <span className="text-blue-700 underline">browse files</span></p>
                <p className="mt-2 text-sm text-bank-muted">PDF, JPG, PNG, XLSX up to 20 MB each</p>
              </div>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png,.xlsx,application/pdf,image/jpeg,image/png,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handleFileSelection}
            />
          </Panel>
          <div className="rounded-lg bg-blue-50 px-5 py-4 text-sm font-medium text-bank-navy">
            Please ensure your uploaded files are clear and complete to avoid delays in processing.
          </div>
        </div>
        <div className="space-y-5">
          <Panel title="Document Checklist" action={<span className="text-sm font-bold text-bank-muted">{uploadedCount} of {requiredDocuments.length}</span>}>
            <ul className="divide-y divide-bank-line">
              {requiredDocuments.map((document) => (
                <li key={document.name} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                  <span className="flex items-center gap-3 text-sm font-medium text-bank-navy">
                    <DocumentStatusIcon status={document.status} />
                    {document.name}
                  </span>
                  <StatusPill status={document.status} />
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="AI pre-check" action={<button className="text-sm font-bold text-blue-700">Learn more</button>}>
            <ul className="divide-y divide-bank-line text-sm">
              {[
                ["Invoice amount detected", clientApplication.requestedAmount, "ok"],
                ["Buyer name detected", "ABC Trading Co., Ltd.", "ok"],
                ["Shipment date missing", "Add shipment date", "bad"],
                ["Purchase order requires review", "Check PO details", "warn"]
              ].map(([label, value, state]) => (
                <li key={label} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                  <span className="flex items-center gap-2 text-bank-navy">
                    {state === "ok" ? <CheckCircle2 size={17} className="text-emerald-600" /> : state === "bad" ? <Info size={17} className="text-red-600" /> : <Clock3 size={17} className="text-orange-500" />}
                    {label}
                  </span>
                  <span className={state === "ok" ? "font-medium text-bank-navy" : "font-bold text-bank-red"}>{value}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </section>
      <div className="rounded-lg border border-bank-line bg-white p-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row">
          <SecondaryButton onClick={saveDocumentsDraft}><Save size={17} />Save Draft</SecondaryButton>
          <PrimaryLink href="/client/data-authorization">Continue to Data Authorization</PrimaryLink>
        </div>
        {draftStatus ? <p className="mt-3 text-sm font-bold text-emerald-700">{draftStatus}</p> : null}
      </div>
    </PageShell>
  );
}

export function ClientDataAuthorizationPage() {
  const router = useRouter();
  const { clientApplication, requiredDocuments, isLoading } = useClientApplicationsData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedDataSources, setExpandedDataSources] = useState<Record<string, boolean>>({});
  const [authorizedDataSources, setAuthorizedDataSources] = useState<Record<string, boolean>>({});

  if (isLoading && !clientApplication) {
    return <LoadingPanel title="Data Authorization" />;
  }

  if (!clientApplication) {
    return <LoadingPanel title="Data Authorization" />;
  }

  const submitApplication = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    const response = await fetch("/api/client/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyName: clientApplication.company,
        financingType: clientApplication.financingType,
        amount: Number(clientApplication.requestedAmount.replace(/[^0-9.]/g, "")) || 1000000,
        currency: clientApplication.requestedAmount.startsWith("USD") ? "USD" : "HKD"
      })
    }).catch(() => undefined);
    const payload = await response?.json().catch(() => undefined);
    const newId = payload?.application?.id ?? `TF-2026-${Date.now().toString().slice(-4)}`;
    const newApplication = makeClientApplication({
      id: newId,
      company: clientApplication.company,
      user: clientApplication.user,
      financingType: clientApplication.financingType,
      requestedAmount: clientApplication.requestedAmount,
      documents: requiredDocuments.length > 0 ? requiredDocuments : clientApplication.documents
    });

    updateDemoState((state) => ({
      ...state,
      clientApplications: [newApplication, ...state.clientApplications.filter((application) => application.id !== newApplication.id)],
      clientTimeline: [
        clientTimelineEntry("Application submitted", `${newApplication.id} was submitted through the TradeSafe Client Portal.`),
        ...state.clientTimeline
      ]
    }));
    router.push("/client/status");
  };

  return (
    <PageShell title="Data Authorization" subtitle={`Application ID: ${clientApplication.id}  |  Financing Type: ${clientApplication.financingType}`}>
      <StepProgress current={4} />
      <section className="rounded-lg border border-red-100 bg-gradient-to-r from-red-50 to-white p-5">
        <div className="flex gap-4">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white text-bank-red">
            <ShieldCheck size={34} />
          </span>
          <div>
            <h2 className="text-lg font-bold text-bank-navy">Authorize BOCHK to access permitted data sources</h2>
            <p className="mt-2 text-sm leading-6 text-bank-muted">Authorize BOCHK to access permitted data sources to verify trade authenticity and support your application review. You can review and manage your authorization at any time.</p>
          </div>
        </div>
      </section>
      <Panel title="Select Data Sources to Authorize">
        <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-5">
          {dataSources.map((source, index) => {
            const isAuthorized = authorizedDataSources[source.title] ?? true;
            return (
              <article key={source.title} className="flex h-full min-h-72 flex-col rounded-lg border border-bank-line p-5">
                <div className="flex-1">
                  <div className={`mb-4 grid h-14 w-14 place-items-center rounded-full ${index % 2 === 0 ? "bg-red-50 text-bank-red" : "bg-blue-50 text-blue-700"}`}>
                    {index === 0 ? <Ship size={25} /> : index === 1 ? <FileText size={25} /> : index === 2 ? <WalletCards size={25} /> : index === 3 ? <TrendingUp size={25} /> : <Building2 size={25} />}
                  </div>
                  <h3 className="font-bold leading-6 text-bank-navy">{source.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-bank-muted">{source.description}</p>
                </div>
                {expandedDataSources[source.title] ? (
                  <p className="mt-4 rounded-md bg-bank-bg p-3 text-xs leading-5 text-bank-muted">
                    BOCHK will use this permitted source only for trade authenticity checks, application assessment, and related regulatory review for this demo application.
                  </p>
                ) : null}
                <div className="mt-5 flex min-h-8 items-center justify-between">
                  <button
                    type="button"
                    className="text-sm font-semibold text-bank-navy hover:text-bank-red"
                    aria-expanded={expandedDataSources[source.title] ?? false}
                    onClick={() => setExpandedDataSources((current) => ({ ...current, [source.title]: !current[source.title] }))}
                  >
                    {expandedDataSources[source.title] ? "Show less" : "Learn more"}
                  </button>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isAuthorized}
                    aria-label={`${isAuthorized ? "Disable" : "Enable"} ${source.title} authorization`}
                    className={`relative inline-flex h-7 w-12 rounded-full transition-colors ${isAuthorized ? "bg-bank-red" : "bg-slate-300"}`}
                    onClick={() => setAuthorizedDataSources((current) => ({ ...current, [source.title]: !(current[source.title] ?? true) }))}
                  >
                    <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${isAuthorized ? "right-1" : "left-1"}`} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-5 text-sm text-bank-muted">You may withdraw or modify your authorization at any time. This will not affect your existing banking services.</p>
      </Panel>
      <section className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Panel title="Your Consent">
          <div className="space-y-4">
            {[
              "I confirm that the information and documents submitted in this application are true, accurate and complete.",
              "I authorize BOCHK to access and use the selected data sources for verifying trade authenticity and processing this application.",
              "I understand that BOCHK may request additional information or documents if necessary."
            ].map((item) => (
              <label key={item} className="flex gap-3 text-sm leading-6 text-bank-navy">
                <input type="checkbox" defaultChecked className="mt-1 h-4 w-4 accent-bank-red" />
                {item}
              </label>
            ))}
          </div>
        </Panel>
        <Panel title="Privacy & Security Assurance">
          <p className="text-sm leading-6 text-bank-muted">Your data will be used only for application review, verification, and regulatory compliance purposes.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {["Data encrypted in transit and at rest", "Access controlled by authorized staff", "Compliant with HK regulations and PDPO"].map((item) => (
              <div key={item} className="rounded-md border border-bank-line p-3 text-sm font-medium text-bank-navy">{item}</div>
            ))}
          </div>
        </Panel>
      </section>
      <div className="flex flex-col justify-between gap-3 rounded-lg border border-bank-line bg-white p-4 sm:flex-row">
        <PrimaryLink href="/client/documents">Back to Upload Documents</PrimaryLink>
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-bank-red px-5 text-sm font-bold text-white shadow-sm hover:bg-bank-darkRed disabled:cursor-not-allowed disabled:opacity-70"
          onClick={submitApplication}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
          <ChevronRight size={18} />
        </button>
      </div>
    </PageShell>
  );
}

export function ClientStatusPage() {
  const demoState = useDemoState();
  const { clientApplication, requiredDocuments, isLoading } = useClientApplicationsData();
  const [serverTimeline, setServerTimeline] = useState<Array<{ at: string; title: string; description: string; status: string }>>([]);
  const requestedDocumentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!clientApplication?.id) {
      return;
    }

    let active = true;
    fetch(`/api/client/status/${clientApplication.id}`)
      .then((response) => response.json() as Promise<{ timeline: Array<{ at: string; title: string; description: string; status: string }> }>)
      .then((payload) => {
        if (active) {
          setServerTimeline(payload.timeline ?? []);
        }
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, [clientApplication?.id]);

  if (isLoading && !clientApplication) {
    return <LoadingPanel title="Application Status" />;
  }

  if (!clientApplication) {
    return <LoadingPanel title="Application Status" />;
  }

  const visibleTimeline = [
    ...demoState.clientTimeline,
    ...serverTimeline.map((item, index) => ({
      id: `api-${index}-${item.at}`,
      date: new Date(item.at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      time: new Date(item.at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      title: item.title,
      description: item.description,
      state: item.status === "Completed" ? "complete" as const : item.status === "Current" ? "current" as const : "pending" as const
    })),
    ...(serverTimeline.length === 0 ? statusTimeline.map((item, index) => ({ ...item, id: `base-${index}` })) : [])
  ];
  const uploadedCount = requiredDocuments.filter((document) => document.status === "Uploaded" || document.status === "Verified").length;
  const progressActiveIndex = demoState.clientTimeline.some((item) => item.title === "Application submitted") ? 3 : uploadedCount > 0 ? 2 : 2;

  const uploadRequestedDocument = (fileName?: string) => {
    const target = requiredDocuments.find((document) => document.status !== "Uploaded" && document.status !== "Verified") ?? requiredDocuments[0];
    if (!target) {
      return;
    }

    fetch("/api/client/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        applicationId: clientApplication.id,
        documentType: target.name,
        fileName: fileName ?? `${target.name.toLowerCase().replaceAll(" ", "-")}-requested-upload.pdf`
      })
    }).catch(() => undefined);
    updateDemoState((state) => ({
      ...state,
      clientDocumentStatuses: {
        ...state.clientDocumentStatuses,
        [documentStatusKey(clientApplication.id, target.name)]: "Uploaded"
      },
      clientTimeline: [
        clientTimelineEntry("Requested document uploaded", `${target.name} was uploaded in response to BOCHK's request.`),
        ...state.clientTimeline
      ]
    }));
  };

  const handleRequestedDocumentSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    uploadRequestedDocument(file.name);
    event.target.value = "";
  };

  return (
    <PageShell title="Application Status" subtitle="Track the progress of your trade finance application">
      <Panel
        title="Application Summary"
        action={<StatusPill status={clientApplication.status} />}
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {[
            ["Application ID", clientApplication.id],
            ["Financing Type", clientApplication.financingType],
            ["Requested Amount", clientApplication.requestedAmount],
            ["Submission Date", clientApplication.submittedDate],
            ["Current Status", clientApplication.status]
          ].map(([label, value]) => (
            <div key={label} className="rounded-md bg-bank-bg px-3 py-3 xl:bg-transparent xl:px-0 xl:py-0 xl:border-r xl:border-bank-line xl:pr-4 xl:last:border-0">
              <p className="text-xs font-bold uppercase tracking-wide text-bank-muted">{label}</p>
              <div className="mt-2 text-sm font-bold text-bank-navy">{label === "Current Status" ? <StatusPill status={value} /> : value}</div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Progress Tracker">
        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {["Submitted", "Document Review", "Additional Information Required", "Credit Review", "Decision"].map((step, index) => (
            <div key={step} className="relative text-center">
              {index < 4 ? <span className="absolute left-[calc(50%+1.5rem)] top-6 hidden h-px w-[calc(100%-3rem)] bg-bank-line lg:block" /> : null}
              <span className={`relative z-10 mx-auto grid h-12 w-12 place-items-center rounded-full border-4 border-white font-bold shadow-sm ${index < progressActiveIndex ? "bg-emerald-600 text-white" : index === progressActiveIndex ? "bg-bank-red text-white" : "bg-slate-100 text-bank-navy"}`}>
                {index < progressActiveIndex ? <Check size={20} /> : index + 1}
              </span>
              <p className={`mt-3 text-sm font-bold ${index === progressActiveIndex ? "text-bank-red" : "text-bank-navy"}`}>{step}</p>
              <p className="mt-1 text-sm text-bank-muted">{index < 3 ? ["20 May 2025", "22 May 2025", "23 May 2025"][index] : "Pending"}</p>
            </div>
          ))}
        </div>
      </Panel>
      <section className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
        <div className="space-y-5">
          <section className="rounded-lg border border-red-100 bg-red-50 p-5">
            <div className="flex gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-bank-red text-white">
                <FileText size={26} />
              </span>
              <div>
                <h2 className="font-bold text-bank-red">Action Required</h2>
                <p className="mt-2 text-bank-navy">{clientApplication.requiredAction}.</p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button type="button" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-bank-red px-4 text-sm font-bold text-white" onClick={() => requestedDocumentInputRef.current?.click()}>
                    <Upload size={16} />
                    Upload Requested Document
                  </button>
                  <input
                    ref={requestedDocumentInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.xlsx,application/pdf,image/jpeg,image/png,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    onChange={handleRequestedDocumentSelection}
                  />
                  <p className="text-sm text-bank-muted">Please upload the requested document by {clientApplication.actionDue}</p>
                </div>
              </div>
            </div>
          </section>
          <Panel title="Timeline">
            <ol className="space-y-5">
              {visibleTimeline.map((item) => (
                <li key={item.id ?? item.title} className="grid min-w-0 gap-3 sm:grid-cols-[150px_minmax(0,1fr)]">
                  <div className="flex gap-3 text-sm text-bank-muted">
                    <span>{item.date}</span>
                    <span>{item.time}</span>
                  </div>
                  <div className="relative border-l border-bank-line pl-5">
                    <span className={`absolute -left-2 top-1 h-4 w-4 rounded-full ${item.state === "complete" ? "bg-emerald-600" : item.state === "current" ? "bg-bank-red" : "border border-slate-300 bg-white"}`} />
                    <h3 className={`font-bold ${item.state === "current" ? "text-bank-red" : "text-bank-navy"}`}>{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-bank-muted">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Panel>
        </div>
        <div className="space-y-5">
          <Panel title="Contact Your Relationship Manager">
            <ManagerCard />
          </Panel>
          <Panel>
            <div className="flex gap-4">
              <Info className="mt-1 text-blue-700" />
              <div>
                <h3 className="font-bold text-bank-navy">What happens next?</h3>
                <p className="mt-2 text-sm leading-6 text-bank-muted">Once we receive the required information, we will continue the credit review process. We will notify you of the decision via messages and email.</p>
              </div>
            </div>
          </Panel>
          <Panel>
            <div className="flex gap-4">
              <Headphones className="mt-1 text-bank-red" />
              <div>
                <h3 className="font-bold text-bank-navy">Need Help?</h3>
                <p className="mt-2 text-sm leading-6 text-bank-muted">If you have questions about your application, please contact your Relationship Manager or our Trade Finance support team.</p>
              </div>
            </div>
          </Panel>
        </div>
      </section>
    </PageShell>
  );
}

export function ClientMessagesPage() {
  const { clientApplication, isLoading: applicationsLoading } = useClientApplicationsData();
  const { messages, isLoading: messagesLoading } = useClientMessagesData();
  const [selectedMessageId, setSelectedMessageId] = useState("");
  const [messageSearch, setMessageSearch] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyTouched, setReplyTouched] = useState(false);
  const [messageStatus, setMessageStatus] = useState("");
  const [attachedFileName, setAttachedFileName] = useState("");
  const replyAttachmentInputRef = useRef<HTMLInputElement>(null);
  const visibleMessages = useMemo(() => {
    const normalizedSearch = messageSearch.trim().toLowerCase();
    if (!normalizedSearch) return messages;
    return messages.filter((message) =>
      [message.title, message.sender, message.body, message.applicationId]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedSearch))
    );
  }, [messageSearch, messages]);
  const selectedMessage = messages.find((message) => message.id === selectedMessageId) ?? visibleMessages[0] ?? messages[0];
  const isHelpCompose = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("compose") === "help";
  const helpDraftText = clientApplication ? `Hello BOCHK team, I need help with application ${clientApplication.id}. Please advise the next step.` : "";
  const visibleReplyText = !replyTouched && isHelpCompose && helpDraftText ? helpDraftText : replyText;
  const visibleMessageStatus = messageStatus || (isHelpCompose && !replyTouched ? "Help message draft opened. You can edit it before sending." : "");

  if ((applicationsLoading || messagesLoading) && (!clientApplication || !selectedMessage)) {
    return <LoadingPanel title="Messages from BOCHK" />;
  }

  if (!clientApplication || !selectedMessage) {
    return <LoadingPanel title="Messages from BOCHK" />;
  }

  const sendReply = async () => {
    const trimmedReply = visibleReplyText.trim();
    if (!trimmedReply) {
      setMessageStatus("Please type a reply before sending.");
      return;
    }

    await fetch("/api/client/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        applicationId: clientApplication.id,
        body: trimmedReply,
        sender: clientApplication.company,
        recipient: relationshipManager.name
      })
    }).catch(() => undefined);
    updateDemoState((state) => ({
      ...state,
      clientReplies: [...state.clientReplies, makeClientReply(clientApplication.id, trimmedReply)],
      clientTimeline: [
        clientTimelineEntry("Client reply sent", "A secure message reply was sent to the BOCHK Relationship Manager."),
        ...state.clientTimeline
      ]
    }));
    setReplyText("");
    setReplyTouched(true);
    setAttachedFileName("");
    setMessageStatus("Reply sent to BOCHK Relationship Manager.");
  };

  const handleReplyAttachmentSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setAttachedFileName(file.name);
    setMessageStatus(`${file.name} attached to this reply.`);
    event.target.value = "";
  };

  return (
    <PageShell title="Messages from BOCHK" subtitle="Secure communication with your BOCHK team">
      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(320px,420px)_minmax(0,1fr)]">
        <div className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative flex-1">
              <span className="sr-only">Search messages</span>
              <input
                className="min-h-11 w-full rounded-md border border-bank-line pl-10 pr-3 text-sm outline-none focus:border-bank-red"
                placeholder="Search messages"
                value={messageSearch}
                onChange={(event) => setMessageSearch(event.target.value)}
              />
              <MessageSquare className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-bank-muted" />
            </label>
            <button className="min-h-11 rounded-md border border-bank-line bg-white px-4 text-sm font-bold text-bank-navy sm:w-auto">All Types</button>
          </div>
          <Panel>
            <ul className="divide-y divide-bank-line">
              {visibleMessages.map((message) => (
                <li key={message.id}>
                  <button
                    type="button"
                    className={`flex w-full min-w-0 flex-col gap-3 p-4 text-left transition sm:flex-row sm:gap-4 ${
                      selectedMessage.id === message.id ? "rounded-lg border border-red-100 bg-red-50 shadow-sm" : "hover:bg-bank-bg"
                    }`}
                    onClick={() => setSelectedMessageId(message.id)}
                  >
                    <span className={`mt-2 h-3 w-3 shrink-0 rounded-full ${message.tone === "red" ? "bg-bank-red" : message.tone === "green" ? "bg-emerald-600" : message.tone === "purple" ? "bg-purple-600" : "bg-blue-700"}`} />
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold text-bank-navy">{message.title}</span>
                      <span className="mt-1 block text-sm text-bank-muted">Application ID: {message.applicationId}</span>
                      <span className="mt-1 block text-sm text-bank-muted">From: {message.sender}</span>
                    </span>
                    <span className="text-left text-sm text-bank-muted sm:text-right">
                      <span className="block">{message.date}</span>
                      <span className="mt-1 block">{message.time}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel>
            <div className="flex gap-4">
              <Headphones className="mt-1 text-bank-red" />
              <div>
                <h3 className="font-bold text-bank-navy">Need help?</h3>
                <p className="mt-2 text-sm leading-6 text-bank-muted">Please contact your Relationship Manager or our Trade Finance support team.</p>
              </div>
            </div>
          </Panel>
        </div>

        <div className="space-y-5">
          <Panel>
            <div className="border-b border-bank-line pb-5">
              <p className="text-sm font-bold text-bank-muted">Back to Messages</p>
              <div className="mt-5 flex flex-col gap-4 sm:flex-row">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-red-50 text-bank-red">
                  <FileText size={30} />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-bold text-bank-navy">{selectedMessage.title}</h2>
                  <p className="mt-1 text-sm text-bank-muted">From: {selectedMessage.sender}</p>
                  <p className="mt-1 text-sm text-bank-muted">To: {selectedMessage.recipient}</p>
                </div>
                <p className="text-sm text-bank-muted sm:text-right">{selectedMessage.date} {selectedMessage.time}</p>
              </div>
            </div>
            <div className="space-y-4 pt-5 text-sm leading-7 text-bank-navy">
              <p>Dear {clientApplication.company},</p>
              <p>{selectedMessage.body}</p>
              {selectedMessage.requestedAction ? (
                <section className="rounded-lg border border-red-100 bg-red-50 p-4">
                  <h3 className="font-bold text-bank-red">Requested Action</h3>
                  <p className="mt-2">{selectedMessage.requestedAction}</p>
                  <p className="mt-2">If you have any questions, please feel free to contact me.</p>
                </section>
              ) : null}
              <p>Thank you,<br />Best regards,<br />{selectedMessage.sender}<br />BOCHK Commercial Banking</p>
            </div>
            <section className="mt-5 rounded-lg border border-bank-line bg-bank-bg p-4">
              <h3 className="font-bold text-bank-navy">Related Application</h3>
              <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                <div><p className="text-bank-muted">Application ID</p><p className="mt-1 font-bold">{clientApplication.id}</p></div>
                <div><p className="text-bank-muted">Financing Type</p><p className="mt-1 font-bold">{clientApplication.financingType}</p></div>
                <div><p className="text-bank-muted">Requested Amount</p><p className="mt-1 font-bold">{clientApplication.requestedAmount}</p></div>
                <div><p className="text-bank-muted">Current Status</p><p className="mt-1"><StatusPill status={clientApplication.status} /></p></div>
              </div>
            </section>
          </Panel>
          <Panel>
            <label className="block">
              <span className="text-sm font-bold text-bank-navy">Type your message to BOCHK</span>
              <textarea
                className="mt-2 min-h-28 w-full rounded-md border border-bank-line p-3 text-sm outline-none focus:border-bank-red"
                placeholder="Type your message here..."
                value={visibleReplyText}
                onChange={(event) => {
                  setReplyTouched(true);
                  setReplyText(event.target.value);
                }}
              />
            </label>
            <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <SecondaryButton onClick={() => replyAttachmentInputRef.current?.click()}><Paperclip size={17} />Attach Document</SecondaryButton>
              <input
                ref={replyAttachmentInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.xlsx,application/pdf,image/jpeg,image/png,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={handleReplyAttachmentSelection}
              />
              <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-bank-red px-5 text-sm font-bold text-white" onClick={sendReply}>
                Send Reply
                <Send size={17} />
              </button>
            </div>
            {attachedFileName ? <p className="mt-3 text-sm font-semibold text-bank-navy">Attached file: {attachedFileName}</p> : null}
            {visibleMessageStatus ? <p className="mt-3 text-sm font-bold text-bank-red">{visibleMessageStatus}</p> : null}
          </Panel>
        </div>
      </section>
    </PageShell>
  );
}
