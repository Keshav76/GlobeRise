/**
 * Export utilities for Excel download and Print functionality
 */

/**
 * Converts data array to CSV format
 * @param {Array} data - Array of objects to convert
 * @param {Array} columns - Column definitions with header and accessor
 * @returns {string} CSV formatted string
 */
export const convertToCSV = (data, columns) => {
  if (!data || data.length === 0) return '';

  // Create header row
  const headers = columns.map(col => `"${col.header}"`).join(',');

  // Create data rows
  const rows = data.map(row => {
    return columns.map(col => {
      let value = row[col.accessor];
      
      // Handle nested accessors (e.g., 'user.name')
      if (col.accessor.includes('.')) {
        const keys = col.accessor.split('.');
        value = keys.reduce((obj, key) => obj?.[key], row);
      }

      // Format value for CSV
      if (value === null || value === undefined) {
        return '""';
      }
      
      // Handle dates
      if (value instanceof Date) {
        value = value.toLocaleString();
      }
      
      // Convert to string and escape quotes
      const stringValue = String(value).replace(/"/g, '""');
      return `"${stringValue}"`;
    }).join(',');
  });

  return [headers, ...rows].join('\n');
};

/**
 * Downloads data as Excel (CSV) file
 * @param {Array} data - Array of objects to export
 * @param {Array} columns - Column definitions with header and accessor
 * @param {string} filename - Name of the file (without extension)
 */
export const downloadExcel = (data, columns, filename = 'export') => {
  const csv = convertToCSV(data, columns);
  
  // Add BOM for proper Excel UTF-8 encoding
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${formatDateForFilename()}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

/**
 * Formats current date for filename
 * @returns {string} Formatted date string (YYYY-MM-DD_HH-mm)
 */
const formatDateForFilename = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}_${hours}-${minutes}`;
};

/**
 * Generates printable HTML content from data
 * @param {Array} data - Array of objects to print
 * @param {Array} columns - Column definitions with header and accessor
 * @param {string} title - Title to display in print header
 * @returns {string} HTML string for printing
 */
export const generatePrintHTML = (data, columns, title = 'Data Export') => {
  const tableRows = data.map(row => {
    const cells = columns.map(col => {
      let value = row[col.accessor];
      
      // Handle nested accessors
      if (col.accessor.includes('.')) {
        const keys = col.accessor.split('.');
        value = keys.reduce((obj, key) => obj?.[key], row);
      }

      // Handle dates
      if (value instanceof Date) {
        value = value.toLocaleString();
      }

      return `<td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${value ?? '-'}</td>`;
    }).join('');
    return `<tr>${cells}</tr>`;
  }).join('');

  const headerCells = columns.map(col => 
    `<th style="border: 1px solid #ddd; padding: 12px; text-align: left; background-color: #00ADB5; color: white; font-weight: bold;">${col.header}</th>`
  ).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          color: #333;
        }
        h1 {
          color: #00ADB5;
          border-bottom: 2px solid #00ADB5;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }
        .print-info {
          color: #666;
          font-size: 12px;
          margin-bottom: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        tr:hover {
          background-color: #f5f5f5;
        }
        @media print {
          body { padding: 0; }
          h1 { font-size: 18px; }
          table { font-size: 12px; }
          th, td { padding: 6px; }
        }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <div class="print-info">
        <p>Generated on: ${new Date().toLocaleString()}</p>
        <p>Total Records: ${data.length}</p>
      </div>
      <table>
        <thead>
          <tr>${headerCells}</tr>
        </thead>
        <tbody>
          ${tableRows || '<tr><td colspan="' + columns.length + '" style="text-align: center; padding: 20px;">No data available</td></tr>'}
        </tbody>
      </table>
    </body>
    </html>
  `;
};

/**
 * Opens print dialog with formatted data
 * @param {Array} data - Array of objects to print
 * @param {Array} columns - Column definitions with header and accessor
 * @param {string} title - Title to display in print header
 */
export const printData = (data, columns, title = 'Data Export') => {
  const printHTML = generatePrintHTML(data, columns, title);
  
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(printHTML);
    printWindow.document.close();
    
    // Wait for content to load before printing
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  }
};

/**
 * Creates export columns from table columns (filters out action columns)
 * @param {Array} columns - Table column definitions
 * @returns {Array} Filtered columns suitable for export
 */
export const getExportColumns = (columns) => {
  return columns.filter(col => 
    col.accessor && 
    !['action', 'actions', 'id'].includes(col.accessor.toLowerCase()) &&
    col.header.toLowerCase() !== 'action' &&
    col.header.toLowerCase() !== 'actions'
  );
};
