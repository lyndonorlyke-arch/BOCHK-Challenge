"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  Download,
  FileCheck2,
  FileText,
  HelpCircle,
  Menu,
  MessageSquare,
  Search,
  Upload,
  UserRound,
  X
} from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";
import { PortalGuard } from "@/components/auth/portal-guard";

const clientNavigation = [
  { label: "Dashboard", href: "/client/dashboard" },
  { label: "New Application", href: "/client/new-application" },
  { label: "Documents", href: "/client/documents" },
  { label: "Status", href: "/client/status" },
  { label: "Messages", href: "/client/messages", badge: "3" }
];

const helpTopics = [
  { label: "Required Documents", icon: FileText, href: "/client/documents" },
  { label: "Application Process", icon: FileCheck2, href: "/client/new-application" },
  { label: "Upload Issues", icon: Upload, href: "/client/documents" },
  { label: "Data Authorization", icon: HelpCircle, href: "/client/data-authorization" },
  { label: "Contact Relationship Manager", icon: UserRound, href: "/client/messages" }
];

const faqItems = [
  "What documents are required for trade finance application?",
  "How do I know if my application is under review?",
  "What should I do if BOCHK requests additional documents?",
  "Why do I need to authorize trade and payment data access?"
];

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <PortalGuard requiredRole="client">
      <div className="min-h-screen bg-bank-bg text-bank-ink">
        <header className="sticky top-0 z-30 bg-bank-navy text-white shadow-sm">
          <div className="flex min-h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-md border border-white/15 text-white lg:hidden"
                aria-label="Open client navigation"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen((current) => !current)}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <Link href="/client/dashboard" className="flex min-w-0 items-center gap-3" aria-label="TradeSafe Client Portal">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-bank-red text-bank-red">
                  <span className="h-4 w-4 rounded-sm border-2 border-bank-red" />
                </span>
                <span className="min-w-0">
                  <span className="hidden text-xs font-bold uppercase tracking-wide text-white/60 sm:block">Bank of China (Hong Kong)</span>
                  <span className="block truncate text-base font-bold leading-5">TradeSafe Client Portal</span>
                </span>
              </Link>
            </div>

            <nav className="hidden h-16 items-center gap-0 lg:flex" aria-label="Client navigation">
              {clientNavigation.map((item) => (
                <ClientNavLink key={item.href} href={item.href} label={item.label} active={pathname === item.href} badge={item.badge} />
              ))}
              <button
                type="button"
                  className={`relative inline-flex h-16 items-center px-3 text-sm font-bold xl:px-4 ${
                  isHelpOpen ? "text-white after:absolute after:bottom-0 after:left-3 after:right-3 after:h-1 after:bg-bank-red" : "text-white/82 hover:text-white"
                }`}
                onClick={() => setIsHelpOpen(true)}
              >
                Help
              </button>
            </nav>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/5 py-1 pl-1 pr-3 lg:flex">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-bank-navy">
                  <UserRound size={20} />
                </span>
                <span className="leading-5">
                  <span className="block text-sm font-bold">Bright Summit Ltd.</span>
                  <span className="block text-xs text-white/65">Mr. David Chan</span>
                </span>
                <ChevronDown size={16} className="text-white/65" />
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-full bg-white text-bank-navy lg:hidden">
                <UserRound size={20} />
              </div>
              <LogoutButton className="border-white/15 bg-white/5 text-white hover:border-white/40" />
            </div>
          </div>

          {isMenuOpen ? (
            <div className="border-t border-white/10 bg-bank-navy px-4 py-3 lg:hidden">
              <nav className="space-y-1" aria-label="Mobile client navigation">
                {clientNavigation.map((item) => (
                  <MobileClientLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    active={pathname === item.href}
                    badge={item.badge}
                    onClick={() => setIsMenuOpen(false)}
                  />
                ))}
                <button
                  type="button"
                  className="flex min-h-11 w-full items-center justify-between rounded-md px-3 text-left text-sm font-bold text-white/85 hover:bg-white/10"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsHelpOpen(true);
                  }}
                >
                  Help
                  <HelpCircle size={18} />
                </button>
              </nav>
              <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3">
                <p className="text-sm font-bold">Bright Summit Ltd.</p>
                <p className="mt-1 text-xs text-white/65">Mr. David Chan</p>
              </div>
            </div>
          ) : null}
        </header>

        {isHelpOpen ? (
          <div className="fixed inset-0 z-40">
            <button
              type="button"
              className="hidden h-full w-full bg-bank-navy/55 text-left md:block"
              aria-label="Close help panel"
              onClick={() => setIsHelpOpen(false)}
            />
            <div className="absolute inset-0 max-w-full bg-white md:left-auto md:w-[520px] md:border-l md:border-bank-line md:shadow-panel">
              <HelpPanel onClose={() => setIsHelpOpen(false)} />
            </div>
          </div>
        ) : null}

        <main className="mx-auto w-full max-w-7xl min-w-0 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </PortalGuard>
  );
}

function ClientNavLink({ href, label, active, badge }: { href: string; label: string; active: boolean; badge?: string }) {
  return (
    <Link
      href={href}
      className={`relative inline-flex h-16 items-center px-3 text-sm font-bold xl:px-4 ${
        active ? "text-white after:absolute after:bottom-0 after:left-3 after:right-3 after:h-1 after:bg-bank-red" : "text-white/82 hover:text-white"
      }`}
    >
      {label}
      {badge ? <span className="ml-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-bank-red px-1 text-[10px] font-bold text-white">{badge}</span> : null}
    </Link>
  );
}

function MobileClientLink({
  href,
  label,
  active,
  badge,
  onClick
}: {
  href: string;
  label: string;
  active: boolean;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      className={`flex min-h-11 items-center rounded-md px-3 text-sm font-bold ${active ? "bg-bank-red text-white" : "text-white/85 hover:bg-white/10"}`}
      onClick={onClick}
    >
      <span>{label}</span>
      {badge ? <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-bank-red px-1 text-[10px] font-bold text-white">{badge}</span> : null}
    </Link>
  );
}

function HelpPanel({ onClose }: { onClose: () => void }) {
  return (
    <aside className="flex h-[100dvh] max-w-full flex-col bg-white text-bank-ink">
      <header className="flex min-h-16 items-center justify-between border-b border-bank-line px-5">
        <h2 className="text-xl font-bold text-bank-navy">Help &amp; Support</h2>
        <button type="button" className="grid h-10 w-10 place-items-center rounded-md text-bank-muted hover:bg-bank-bg" aria-label="Close help" onClick={onClose}>
          <X size={22} />
        </button>
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
        <label className="relative block">
          <span className="sr-only">Search help topics</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-bank-muted" />
          <input
            type="search"
            placeholder="Search help topics"
            className="min-h-11 w-full rounded-md border border-bank-line bg-white py-2 pl-10 pr-3 text-sm outline-none ring-bank-red/20 focus:border-bank-red focus:ring-4"
          />
        </label>

        <section>
          <h3 className="mb-3 text-sm font-bold text-bank-navy">Quick Help</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {helpTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <Link
                  key={topic.label}
                  href={topic.href}
                  className="flex min-h-12 min-w-0 items-center justify-between gap-3 rounded-md border border-bank-line bg-white px-3 text-left text-sm font-bold text-bank-navy hover:border-bank-red hover:bg-red-50"
                  onClick={onClose}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Icon size={17} className="text-bank-red" />
                    <span className="min-w-0 break-words">{topic.label}</span>
                  </span>
                  <ChevronDown size={15} className="-rotate-90 text-bank-muted" />
                </Link>
              );
            })}
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-sm font-bold text-bank-navy">FAQ</h3>
          <div className="space-y-2">
            {faqItems.map((item, index) => (
              <details key={item} className="rounded-md border border-bank-line bg-white px-4 py-3">
                <summary className="cursor-pointer text-sm font-bold text-bank-navy">{item}</summary>
                <p className="mt-3 text-sm leading-6 text-bank-muted">
                  {index === 0
                    ? "Prepare commercial invoice, purchase order, sales contract, shipping document, payment record, and recent bank statement."
                    : "Your relationship manager will contact you through secure messages if additional information is required."}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-bank-line bg-bank-bg p-4">
          <h3 className="text-sm font-bold text-bank-navy">Guides &amp; Downloads</h3>
          <div className="mt-3 space-y-2">
            <button type="button" className="flex min-h-11 w-full items-center justify-between rounded-md border border-bank-line bg-white px-3 text-sm font-bold text-bank-navy">
              <span className="flex items-center gap-3">
                <Download size={17} className="text-bank-red" />
                Download Document Checklist
              </span>
              <Download size={16} className="text-bank-muted" />
            </button>
            <button type="button" className="flex min-h-11 w-full items-center justify-between rounded-md border border-bank-line bg-white px-3 text-sm font-bold text-bank-navy">
              <span className="flex items-center gap-3">
                <BookOpen size={17} className="text-bank-red" />
                View Submission Guide
              </span>
              <Download size={16} className="text-bank-muted" />
            </button>
          </div>
        </section>

        <section className="rounded-lg border border-red-100 bg-red-50 p-4">
          <h3 className="text-sm font-bold text-bank-navy">Need more help?</h3>
          <p className="mt-2 text-sm leading-6 text-bank-muted">Contact your Relationship Manager or send a secure message from the portal.</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Link href="/client/messages" className="inline-flex min-h-10 items-center justify-center rounded-md bg-bank-red px-3 text-sm font-bold text-white" onClick={onClose}>
              Contact Relationship Manager
            </Link>
            <Link href="/client/messages?compose=help" className="inline-flex min-h-10 items-center justify-center rounded-md border border-bank-line bg-white px-3 text-sm font-bold text-bank-navy" onClick={onClose}>
              <MessageSquare size={16} className="mr-2" />
              Send Message
            </Link>
          </div>
        </section>
      </div>
    </aside>
  );
}
