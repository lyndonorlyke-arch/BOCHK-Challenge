import { Button } from "@/components/ui/button";

export function Drawer({
  title,
  children,
  open = true
}: {
  title: string;
  children: React.ReactNode;
  open?: boolean;
}) {
  if (!open) {
    return null;
  }

  return (
    <aside className="rounded-lg border border-bank-line bg-white p-5 shadow-sm lg:max-w-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-bank-navy">{title}</h2>
        <Button variant="ghost" className="min-h-8 px-3 py-1 text-xs">
          Close
        </Button>
      </div>
      <div className="text-sm leading-6 text-bank-muted">{children}</div>
    </aside>
  );
}
