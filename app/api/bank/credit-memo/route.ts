import { NextResponse } from "next/server";
import { getCaseById } from "@/lib/mock-backend";

export async function GET() {
  const activeCase = getCaseById("TF-2026-0001");
  return NextResponse.json({
    case: {
      id: activeCase.id,
      companyName: activeCase.companyName,
      financingType: activeCase.financingType
    },
    memo: activeCase.creditMemo
  });
}
