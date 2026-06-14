import Link from "next/link";
import { LockKeyhole, Shield, UserRound } from "lucide-react";

export function LoginLayout({ children }: { children: React.ReactNode }) {
  const entryPoints = [
    { label: "Login page is the only entry point", Icon: UserRound },
    { label: "Client portal hides internal bank analysis", Icon: Shield },
    { label: "Bank console exposes controlled officer workflows", Icon: LockKeyhole }
  ];

  return (
    <main className="grid min-h-screen bg-bank-navy lg:grid-cols-[minmax(0,1fr)_500px]">
      <section className="hidden border-r border-white/10 bg-bank-navy px-10 py-9 text-white lg:flex lg:flex-col">
        <Link href="/login" className="flex items-center gap-5" aria-label="BOCHK TradeSafe login">
          <span className="relative grid h-20 w-20 shrink-0 place-items-center rounded-full border-[8px] border-bank-red">
            <span className="absolute left-1/2 top-0 h-full w-2 -translate-x-1/2 bg-bank-red" />
            <span className="absolute top-1/2 h-8 w-8 -translate-y-1/2 rounded-sm border-[7px] border-bank-red bg-bank-navy" />
          </span>
          <span>
            <span className="block text-xl font-bold uppercase tracking-[0.26em] text-bank-red">BOCHK</span>
            <span className="mt-2 block text-3xl font-bold leading-none tracking-normal text-white">TradeSafe Credit Co-pilot</span>
            <span className="mt-3 block text-xl font-semibold leading-none text-white/70">Intelligent insights, safer decisions</span>
          </span>
        </Link>

        <div className="mt-14 max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-bank-red">Secure entry point</p>
          <h2 className="mt-5 max-w-3xl text-5xl font-bold leading-tight tracking-normal">Role-based access for trade finance workflows.</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">SME client users and BOCHK bank officers enter separated portals with clear data boundaries.</p>
          <div className="mt-8 grid max-w-4xl gap-3 text-base font-semibold">
            {entryPoints.map(({ label, Icon }) => (
              <div key={label} className="flex min-h-16 items-center rounded-lg border border-white/15 bg-white/8 px-6 text-blue-50 shadow-lg shadow-black/10 backdrop-blur">
                <Icon className="mr-6 h-8 w-8 shrink-0 text-bank-red" />
                <span className="mr-6 h-9 w-px shrink-0 bg-white/30" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center bg-[#f5f7fb] px-4 py-8 sm:px-6">
        <div className="w-full max-w-md">{children}</div>
      </section>
    </main>
  );
}
