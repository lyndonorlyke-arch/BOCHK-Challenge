import { NextResponse } from "next/server";
import { recordMonitoringAction } from "@/lib/mock-api-store";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  const action = recordMonitoringAction(payload);

  return NextResponse.json(action, { status: 201 });
}
