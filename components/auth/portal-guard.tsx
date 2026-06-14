"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { expectedRoleForPath, isPortalRole, PORTAL_ROLE_STORAGE_KEY, routeForRole, type PortalRole } from "@/lib/portal-auth";

export function PortalGuard({
  requiredRole,
  children
}: {
  requiredRole: PortalRole;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const storedRole = window.localStorage.getItem(PORTAL_ROLE_STORAGE_KEY);

    if (!isPortalRole(storedRole)) {
      router.replace("/login");
      return;
    }

    const pathRole = expectedRoleForPath(pathname);

    if (storedRole !== requiredRole || pathRole !== requiredRole) {
      router.replace(routeForRole(storedRole));
      return;
    }

    const frame = window.requestAnimationFrame(() => setIsAllowed(true));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, requiredRole, router]);

  if (!isAllowed) {
    return (
      <div className="grid min-h-screen place-items-center bg-bank-bg px-4">
        <div className="rounded-lg border border-bank-line bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-bold text-bank-navy">Checking secure portal access...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
