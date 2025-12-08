const Table = ({
  columns,
  data,
  className = '',
  onRowClick,
}) => {
  return (
    <div className="table-responsive">
      <table className={`min-w-full divide-y divide-[#4b5563] ${className}`}>
        <thead className="bg-[#393E46]">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[#393E46] divide-y divide-[#4b5563]">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-400">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={onRowClick ? 'cursor-pointer hover:bg-[#393E46] transition-colors' : ''}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-300">
                    {column.render ? column.render(row[column.accessor], row) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

