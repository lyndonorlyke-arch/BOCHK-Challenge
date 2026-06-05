import { Logo, PrimaryButton } from "@/components/ui";

const navItems = [
  ["Problem", "#problem"],
  ["Solution", "#solution"],
  ["Demo", "#demo"],
  ["Impact", "#impact"],
  ["Governance", "#governance"],
  ["Roadmap", "#roadmap"]
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-bank-line bg-white/95 backdrop-blur">
      <nav className="section-shell flex min-h-16 items-center justify-between gap-4">
        <Logo />
        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map(([label, href]) => (
            <a key={label} href={href} className="text-sm font-semibold text-bank-muted hover:text-bank-navy">
              {label}
            </a>
          ))}
        </div>
        <PrimaryButton href="/backoffice">Try Demo</PrimaryButton>
      </nav>
    </header>
  );
}
