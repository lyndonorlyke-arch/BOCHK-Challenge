import { NextResponse } from "next/server";
import { getPortfolioResponse } from "@/lib/mock-api-store";

export async function GET() {
  return NextResponse.json(getPortfolioResponse());
}
