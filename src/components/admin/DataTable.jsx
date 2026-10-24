/**
 * Simple responsive table.
 * columns: [{ key, label, render?: (row) => node, className? }]
 */
function DataTable({ columns, rows, emptyText = "Nothing to show yet.", rowKey = "id" }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-gray-50 text-xs text-gray-500">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={`px-5 py-3 font-medium ${column.className || ""}`}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-5 py-12 text-center text-gray-400">
                {emptyText}
              </td>
            </tr>
          )}
          {rows.map((row) => (
            <tr key={row[rowKey]} className="animate-fade-in transition hover:bg-gray-50/60">
              {columns.map((column) => (
                <td key={column.key} className={`px-5 py-4 align-middle ${column.className || ""}`}>
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
