import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    ok: true,
    users: [
      { role: "sme-client", redirectTo: "/client/dashboard" },
      { role: "bank-officer", redirectTo: "/bank/overview" }
    ]
  });
}
