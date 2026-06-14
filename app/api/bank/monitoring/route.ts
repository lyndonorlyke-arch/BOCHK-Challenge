import { NextResponse } from "next/server";
import { getMonitoringResponse } from "@/lib/mock-api-store";

export async function GET() {
  return NextResponse.json(getMonitoringResponse());
}
