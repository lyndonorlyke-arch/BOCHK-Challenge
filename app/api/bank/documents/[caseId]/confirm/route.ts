import { NextResponse } from "next/server";
import { confirmBankDocuments } from "@/lib/mock-api-store";

type RouteContext = {
  params: Promise<{ caseId: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { caseId } = await context.params;
  const payload = await request.json().catch(() => ({}));
  const correctionLogEntry = confirmBankDocuments(caseId, payload);

  return NextResponse.json(
    {
      correctionLogEntry,
      message: "Mock extracted data confirmation stored"
    },
    { status: 201 }
  );
}
