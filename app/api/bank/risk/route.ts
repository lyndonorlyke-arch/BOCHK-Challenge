import { NextResponse } from "next/server";
import { getCaseById } from "@/lib/mock-backend";

export async function GET() {
  const activeCase = getCaseById("TF-2026-0001");
  return NextResponse.json({
    case: {
      id: activeCase.id,
      companyName: activeCase.companyName,
      financingType: activeCase.financingType,
      requestedAmount: `${activeCase.currency} ${activeCase.amount.toLocaleString("en-US")}`
    },
    risk: activeCase.risk,
    verification: activeCase.verification
  });
}
