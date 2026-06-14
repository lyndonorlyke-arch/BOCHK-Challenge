"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, CheckCircle2, ShieldCheck, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PORTAL_ROLE_STORAGE_KEY, routeForRole, type PortalRole } from "@/lib/portal-auth";

const roles: {
  id: PortalRole;
  title: string;
  description: string;
  icon: typeof UserRound;
}[] = [
  {
    id: "client",
    title: "SME Client Portal",
    description: "Submit applications, upload documents, authorize data, and track client-visible status.",
    icon: UserRound
  },
  {
    id: "bank",
    title: "BOCHK Bank Console",
    description: "Review cases, verify documents, assess risk, draft memos, and manage approvals.",
    icon: Building2
  }
];

export function LoginForm() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<PortalRole>("client");

  return (
    <form
      className="rounded-lg border border-bank-line bg-white p-5 shadow-subtle sm:p-6"
      onSubmit={(event) => {
        event.preventDefault();
        window.localStorage.setItem(PORTAL_ROLE_STORAGE_KEY, selectedRole);
        router.push(routeForRole(selectedRole));
      }}
    >
      <div className="mb-5 border-b border-bank-line pb-5">
        <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-bank-red">
          <ShieldCheck size={14} />
          Secure role-based access
        </div>
        <h1 className="text-2xl font-bold tracking-normal text-bank-navy sm:text-[28px]">BOCHK TradeSafe Credit Co-pilot</h1>
        <p className="mt-3 text-sm leading-6 text-bank-muted sm:text-base">
          AI-powered cross-border SME trade finance risk and credit platform
        </p>
      </div>

      <fieldset className="space-y-3">
        <legend className="mb-3 text-sm font-bold text-bank-navy">Select your portal</legend>
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;

          return (
            <label
              key={role.id}
              className={`flex cursor-pointer gap-4 rounded-md border p-4 transition ${
                isSelected ? "border-bank-red bg-red-50/70 shadow-sm ring-2 ring-bank-red/10" : "border-bank-line bg-white hover:border-bank-blue"
              }`}
            >
              <input
                type="radio"
                name="role"
                value={role.id}
                checked={isSelected}
                onChange={() => setSelectedRole(role.id)}
                className="sr-only"
              />
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${isSelected ? "bg-bank-red text-white" : "bg-bank-bg text-bank-navy"}`}>
                <Icon size={21} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-3">
                  <span className="text-sm font-bold text-bank-navy sm:text-base">{role.title}</span>
                  {isSelected ? <CheckCircle2 className="h-5 w-5 shrink-0 text-bank-red" /> : null}
                </span>
                <span className="mt-1 block text-sm leading-5 text-bank-muted">{role.description}</span>
              </span>
            </label>
          );
        })}
      </fieldset>

      <div className="mt-6 grid gap-4">
        <label className="block">
          <span className="text-sm font-bold text-bank-navy">Email</span>
          <input
            type="email"
            defaultValue="demo@bochk.com"
            className="mt-2 min-h-11 w-full rounded-md border border-bank-line bg-white px-3 text-sm text-bank-navy outline-none ring-bank-red/20 placeholder:text-bank-muted focus:border-bank-red focus:ring-4"
          />
        </label>
        <label className="block">
          <span className="text-sm font-bold text-bank-navy">Password</span>
          <input
            type="password"
            defaultValue="password"
            className="mt-2 min-h-11 w-full rounded-md border border-bank-line bg-white px-3 text-sm text-bank-navy outline-none ring-bank-red/20 focus:border-bank-red focus:ring-4"
          />
        </label>
      </div>

      <Button type="submit" className="mt-6 w-full min-h-12 text-base">
        Continue
      </Button>
    </form>
  );
}
