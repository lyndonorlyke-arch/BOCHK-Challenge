import { Badge } from "@/components/ui/badge";

export function StatusBadge({
  status
}: {
  status: "Not started" | "In progress" | "Submitted" | "Review" | "Approved" | "Action required";
}) {
  const tone = status === "Approved" ? "success" : status === "Action required" ? "danger" : status === "Review" ? "warning" : status === "Submitted" ? "info" : "neutral";
  return <Badge tone={tone}>{status}</Badge>;
}
