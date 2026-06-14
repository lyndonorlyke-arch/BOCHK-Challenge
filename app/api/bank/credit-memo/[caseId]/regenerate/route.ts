import { NextResponse } from "next/server";
import { regenerateCreditMemoSection } from "@/lib/mock-api-store";

type RouteContext = {
  params: Promise<{ caseId: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { caseId } = await context.params;
  const payload = await request.json().catch(() => ({}));
  const memo = regenerateCreditMemoSection(caseId, payload);

  return NextResponse.json({
    memo,
    message: "Mock credit memo section regenerated"
  });
}
