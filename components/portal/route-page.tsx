import { notFound } from "next/navigation";
import { findPage } from "@/data/portal-pages";
import { PlaceholderPage } from "@/components/portal/placeholder-page";

export function RoutePage({
  href,
  portal
}: {
  href: string;
  portal: "client" | "bank";
}) {
  const page = findPage(href);

  if (!page) {
    notFound();
  }

  return <PlaceholderPage page={page} portal={portal} />;
}
