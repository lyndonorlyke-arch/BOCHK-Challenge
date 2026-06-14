import { ClientLayout } from "@/components/layouts/client-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}
