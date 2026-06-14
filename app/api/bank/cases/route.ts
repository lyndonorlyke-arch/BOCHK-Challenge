import { NextResponse } from "next/server";
import { getBankCasesResponse } from "@/lib/mock-api-store";

export async function GET() {
  return NextResponse.json(getBankCasesResponse());
}
