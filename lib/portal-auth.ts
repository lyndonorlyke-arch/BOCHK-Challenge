export type PortalRole = "client" | "bank";

export const PORTAL_ROLE_STORAGE_KEY = "bochk-tradesafe-role";

export const roleHome: Record<PortalRole, string> = {
  client: "/client/dashboard",
  bank: "/bank/overview"
};

export function isPortalRole(value: string | null): value is PortalRole {
  return value === "client" || value === "bank";
}

export function expectedRoleForPath(pathname: string): PortalRole | null {
  if (pathname.startsWith("/client/")) {
    return "client";
  }

  if (pathname.startsWith("/bank/")) {
    return "bank";
  }

  return null;
}

export function routeForRole(role: PortalRole) {
  return roleHome[role];
}
