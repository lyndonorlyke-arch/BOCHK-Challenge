import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    applicationId: "TS-24018",
    companyName: "Golden Harbour Trading Limited",
    status: "Bank review",
    progress: 72,
    pendingClientActions: [
      "Upload latest commercial invoice",
      "Authorize company registry data refresh"
    ],
    documents: {
      uploaded: 5,
      required: 7,
      accepted: 4
    },
    messages: {
      unread: 3,
      latest: "Relationship manager requested updated shipment document."
    }
  });
}
