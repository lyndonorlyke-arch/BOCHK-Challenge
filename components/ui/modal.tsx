import { Button } from "@/components/ui/button";

export function Modal({
  title,
  children,
  open = false
}: {
  title: string;
  children: React.ReactNode;
  open?: boolean;
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-bank-navy/45 p-4">
      <section className="w-full max-w-lg rounded-lg border border-bank-line bg-white p-5 shadow-panel">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-bank-navy">{title}</h2>
          <Button variant="ghost" className="min-h-8 px-3 py-1 text-xs">
            Close
          </Button>
        </div>
        <div className="text-sm leading-6 text-bank-muted">{children}</div>
      </section>
    </div>
  );
}
