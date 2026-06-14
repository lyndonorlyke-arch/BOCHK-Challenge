export function DataTable({
  columns,
  rows,
  emptyMessage = "No records to display."
}: {
  columns: string[];
  rows: React.ReactNode[][];
  emptyMessage?: string;
}) {
  return (
    <div className="max-w-full overflow-hidden rounded-lg border border-bank-line">
      <div className="w-full max-w-full overflow-x-auto">
        <table className="min-w-[640px] divide-y divide-bank-line text-left text-sm">
          <thead className="bg-bank-bg text-xs font-bold uppercase tracking-wide text-bank-muted">
            <tr>
              {columns.map((column) => (
                <th key={column} scope="col" className="px-4 py-3">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-bank-line bg-white text-bank-ink">
            {rows.length > 0 ? (
              rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-bank-bg">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-3">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-bank-muted">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
