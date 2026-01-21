const DataTable = ({
  columns,
  rows,
  keyField = "id",
  actionsHeader = "Actions",
  renderActions,
  emptyText = "No data",
}) => {
  return (
    <div className="bg-background-white rounded-2xl shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#ECEEF1] text-text-secondary">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`text-left font-semibold px-5 py-3 whitespace-nowrap ${
                    col.headerClassName || ""
                  }`}
                >
                  {col.header}
                </th>
              ))}
              {renderActions && (
                <th className="text-left font-semibold px-5 py-3 whitespace-nowrap">
                  {actionsHeader}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows?.length ? (
              rows.map((row, idx) => (
                <tr
                  key={row?.[keyField] ?? idx}
                  className="border-t border-border-light hover:bg-background-primary/40"
                >
                  {columns.map((col) => (
                    <td key={col.key} className={`px-5 py-3 ${col.cellClassName || ""}`}>
                      {col.render ? col.render(row) : row?.[col.key] ?? "—"}
                    </td>
                  ))}
                  {renderActions && (
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        {renderActions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-5 py-8 text-center text-text-secondary"
                  colSpan={columns.length + (renderActions ? 1 : 0)}
                >
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;

