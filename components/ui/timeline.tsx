export function Timeline({
  items
}: {
  items: { title: string; description: string; time: string }[];
}) {
  return (
    <ol className="space-y-4">
      {items.map((item) => (
        <li key={item.title} className="relative pl-7">
          <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-bank-red ring-4 ring-red-50" />
          <p className="text-sm font-bold text-bank-navy">{item.title}</p>
          <p className="mt-1 text-sm leading-6 text-bank-muted">{item.description}</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-wide text-bank-muted">{item.time}</p>
        </li>
      ))}
    </ol>
  );
}
