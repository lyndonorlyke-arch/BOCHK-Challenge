import { NextResponse } from "next/server";
import { createStoredClientDocument } from "@/lib/mock-api-store";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  const document = createStoredClientDocument(payload);
  return NextResponse.json(
    {
      document,
      message: "Mock document uploaded and queued for AI pre-check"
    },
    { status: 201 }
  );
}
