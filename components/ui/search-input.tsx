import { Search } from "lucide-react";

export function SearchInput({
  placeholder = "Search"
}: {
  placeholder?: string;
}) {
  return (
    <label className="relative block w-full">
      <span className="sr-only">{placeholder}</span>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-bank-muted" />
      <input
        type="search"
        placeholder={placeholder}
        className="min-h-10 w-full rounded-md border border-bank-line bg-white py-2 pl-10 pr-3 text-sm text-bank-navy outline-none ring-bank-red/20 placeholder:text-bank-muted focus:border-bank-red focus:ring-4"
      />
    </label>
  );
}
