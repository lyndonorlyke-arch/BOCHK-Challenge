import { NextResponse } from "next/server";
import { getBankCaseDetailResponse } from "@/lib/mock-api-store";

type RouteContext = {
  params: Promise<{ caseId: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { caseId } = await context.params;
  return NextResponse.json(getBankCaseDetailResponse(caseId));
}
