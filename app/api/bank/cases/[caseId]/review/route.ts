import { NextResponse } from "next/server";
import { reviewBankCase } from "@/lib/mock-api-store";

type RouteContext = {
  params: Promise<{ caseId: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { caseId } = await context.params;
  const payload = await request.json().catch(() => ({}));
  const action = reviewBankCase(caseId, payload);

  return NextResponse.json(action, { status: 201 });
}
