import { NextResponse } from "next/server";
import { getClientStatusResponse } from "@/lib/mock-api-store";

type RouteContext = {
  params: Promise<{ applicationId: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { applicationId } = await context.params;
  return NextResponse.json(getClientStatusResponse(applicationId));
}
