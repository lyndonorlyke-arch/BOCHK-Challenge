import { NextResponse } from "next/server";
import { getRiskResponse } from "@/lib/mock-api-store";

type RouteContext = {
  params: Promise<{ caseId: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { caseId } = await context.params;
  return NextResponse.json(getRiskResponse(caseId));
}
