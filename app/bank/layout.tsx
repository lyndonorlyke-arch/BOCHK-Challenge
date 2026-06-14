import { BankLayout } from "@/components/layouts/bank-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <BankLayout>{children}</BankLayout>;
}
