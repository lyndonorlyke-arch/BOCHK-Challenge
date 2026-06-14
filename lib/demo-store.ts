"use client";

import { useEffect, useState } from "react";
import type { AuditLog, ClientApplication, ClientMessage, DocumentType } from "@/lib/mock-backend";

const demoStoreKey = "bochk-tradesafe-demo-state";
const demoStoreEvent = "bochk-tradesafe-demo-store-updated";

export type ClientTimelineEntry = {
  id: string;
  date: string;
  time: string;
  title: string;
  description: string;
  state: "complete" | "current" | "pending";
};

export type DemoState = {
  clientApplications: ClientApplication[];
  clientDocumentStatuses: Record<string, "Uploaded" | "Missing" | "Needs Review" | "Verified">;
  clientTimeline: ClientTimelineEntry[];
  clientReplies: ClientMessage[];
  bankCaseStatuses: Record<string, string>;
  bankAuditEntries: AuditLog[];
  bankDocumentConfirmations: AuditLog[];
  memo: {
    status?: "Draft" | "Generated" | "Submitted";
    sections?: Record<string, string>;
    editing?: boolean;
  };
  actionStatuses: Record<string, string>;
};

export const initialDemoState: DemoState = {
  clientApplications: [],
  clientDocumentStatuses: {},
  clientTimeline: [],
  clientReplies: [],
  bankCaseStatuses: {},
  bankAuditEntries: [],
  bankDocumentConfirmations: [],
  memo: {},
  actionStatuses: {}
};

export function getDemoState(): DemoState {
  if (typeof window === "undefined") {
    return initialDemoState;
  }

  try {
    const stored = window.localStorage.getItem(demoStoreKey);
    if (!stored) {
      return initialDemoState;
    }

    return {
      ...initialDemoState,
      ...JSON.parse(stored)
    };
  } catch {
    return initialDemoState;
  }
}

export function setDemoState(nextState: DemoState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(demoStoreKey, JSON.stringify(nextState));
  window.dispatchEvent(new CustomEvent(demoStoreEvent, { detail: nextState }));
}

export function updateDemoState(updater: (state: DemoState) => DemoState) {
  const nextState = updater(getDemoState());
  setDemoState(nextState);
  return nextState;
}

export function useDemoState() {
  const [state, setState] = useState<DemoState>(() => getDemoState());

  useEffect(() => {
    const handleUpdate = (event: Event) => {
      setState((event as CustomEvent<DemoState>).detail ?? getDemoState());
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === demoStoreKey) {
        setState(getDemoState());
      }
    };

    window.addEventListener(demoStoreEvent, handleUpdate);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(demoStoreEvent, handleUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return state;
}

export function nowParts() {
  const date = new Date();
  return {
    iso: date.toISOString(),
    date: date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    time: date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
  };
}

export function makeClientApplication(input: {
  id: string;
  company: string;
  user: string;
  financingType: string;
  requestedAmount: string;
  documents: ClientApplication["documents"];
}): ClientApplication {
  return {
    id: input.id,
    company: input.company,
    user: input.user,
    type: input.financingType as ClientApplication["type"],
    financingType: input.financingType as ClientApplication["financingType"],
    amount: input.requestedAmount,
    requestedAmount: input.requestedAmount,
    submittedDate: nowParts().date,
    status: "New Submission",
    action: "View Status",
    requiredAction: "Application submitted. BOCHK will review documents and contact you if more information is required",
    actionDue: "2026-06-18",
    documents: input.documents
  };
}

export function makeClientReply(applicationId: string, body: string): ClientMessage {
  const now = nowParts();
  return {
    id: `MSG-REPLY-${Date.now()}`,
    applicationId,
    title: "Client reply sent",
    sender: "Bright Summit Ltd.",
    recipient: "BOCHK Relationship Manager",
    date: "Just now",
    time: now.time,
    tone: "green",
    body
  };
}

export function clientTimelineEntry(title: string, description: string): ClientTimelineEntry {
  const now = nowParts();
  return {
    id: `TL-${Date.now()}`,
    date: now.date,
    time: now.time,
    title,
    description,
    state: "current"
  };
}

export function documentStatusKey(applicationId: string, documentName: DocumentType | string) {
  return `${applicationId}:${documentName}`;
}
