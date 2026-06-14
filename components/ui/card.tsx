export function Card({
  title,
  description,
  children,
  className = ""
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-lg border border-bank-line bg-white p-5 shadow-sm ${className}`}>
      {title || description ? (
        <header className="mb-4">
          {title ? <h2 className="text-base font-bold text-bank-navy">{title}</h2> : null}
          {description ? <p className="mt-1 text-sm leading-6 text-bank-muted">{description}</p> : null}
        </header>
      ) : null}
      {children}
    </section>
  );
}
