import { NextResponse } from "next/server";
import { createStoredClientApplication, getClientApplicationsResponse } from "@/lib/mock-api-store";

export async function GET() {
  return NextResponse.json(getClientApplicationsResponse());
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  const application = createStoredClientApplication(payload);
  return NextResponse.json(
    {
      application,
      message: "Mock application created"
    },
    { status: 201 }
  );
}
