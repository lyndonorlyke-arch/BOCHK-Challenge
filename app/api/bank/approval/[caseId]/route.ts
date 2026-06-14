import { NextResponse } from "next/server";
import { submitApprovalDecision } from "@/lib/mock-api-store";

type RouteContext = {
  params: Promise<{ caseId: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { caseId } = await context.params;
  const payload = await request.json().catch(() => ({}));
  return NextResponse.json(submitApprovalDecision(caseId, payload));
}
