import type { Metadata } from "next";
import { LoginLayout } from "@/components/layouts/login-layout";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "BOCHK TradeSafe Credit Co-pilot",
  description: "AI-powered cross-border SME trade finance risk and credit platform"
};

export default function LoginPage() {
  return (
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  );
}
