import { Badge } from "@/components/ui/badge";

export function RiskBadge({ level }: { level: "Low" | "Medium" | "High" }) {
  const tone = level === "Low" ? "success" : level === "Medium" ? "warning" : "danger";
  return <Badge tone={tone}>{level} risk</Badge>;
}
