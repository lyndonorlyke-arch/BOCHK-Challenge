import { NextResponse } from "next/server";
import { createStoredClientMessage, getClientMessagesResponse } from "@/lib/mock-api-store";

export async function GET() {
  return NextResponse.json(getClientMessagesResponse());
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  const message = createStoredClientMessage(payload);
  return NextResponse.json(
    {
      message,
      status: "Mock reply stored"
    },
    { status: 201 }
  );
}
