"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PORTAL_ROLE_STORAGE_KEY } from "@/lib/portal-auth";

export function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className={className}
      onClick={() => {
        window.localStorage.removeItem(PORTAL_ROLE_STORAGE_KEY);
        router.replace("/login");
      }}
    >
      <LogOut size={16} />
      <span className="ml-2 hidden sm:inline">Logout</span>
    </Button>
  );
}
