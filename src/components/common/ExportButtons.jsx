import { FaPrint, FaFileExcel } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { downloadExcel, printData, getExportColumns } from '../../utils/exportUtils';

/**
 * ExportButtons component - Provides Print and Download Excel buttons for data tables
 * 
 * @param {Object} props
 * @param {Array} props.data - Array of data objects to export
 * @param {Array} props.columns - Column definitions with header and accessor properties
 * @param {string} props.filename - Base filename for downloads (without extension)
 * @param {string} props.title - Title to display when printing
 * @param {string} props.className - Additional CSS classes for the container
 * @param {boolean} props.showPrint - Whether to show the print button (default: true)
 * @param {boolean} props.showExcel - Whether to show the Excel download button (default: true)
 * @param {string} props.size - Button size: 'sm', 'md', 'lg' (default: 'md')
 */
const ExportButtons = ({
  data = [],
  columns = [],
  filename = 'export',
  title = 'Data Export',
  className = '',
  showPrint = true,
  showExcel = true,
  size = 'md'
}) => {
  // Get exportable columns (filter out action columns)
  const exportColumns = getExportColumns(columns);

  const handlePrint = () => {
    if (data.length === 0) {
      alert('No data available to print');
      return;
    }
    printData(data, exportColumns, title);
  };

  const handleDownloadExcel = () => {
    if (data.length === 0) {
      alert('No data available to download');
      return;
    }
    downloadExcel(data, exportColumns, filename);
  };

  // Size-based styles
  const sizeStyles = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-2 text-sm gap-2',
    lg: 'px-4 py-2.5 text-base gap-2'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const buttonBaseStyles = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showPrint && (
        <button
          onClick={handlePrint}
          disabled={data.length === 0}
          className={`
            ${buttonBaseStyles}
            ${sizeStyles[size]}
            bg-gray-600 hover:bg-gray-700 text-white
            focus:ring-gray-500
          `}
          title="Print data"
        >
          <FaPrint className={iconSizes[size]} />
          <span>Print</span>
        </button>
      )}
      
      {showExcel && (
        <button
          onClick={handleDownloadExcel}
          disabled={data.length === 0}
          className={`
            ${buttonBaseStyles}
            ${sizeStyles[size]}
            bg-green-600 hover:bg-green-700 text-white
            focus:ring-green-500
          `}
          title="Download as Excel (CSV)"
        >
          <FaFileExcel className={iconSizes[size]} />
          <span>Excel</span>
        </button>
      )}
    </div>
  );
};

ExportButtons.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.arrayOf(PropTypes.shape({
    header: PropTypes.string.isRequired,
    accessor: PropTypes.string.isRequired,
  })),
  filename: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  showPrint: PropTypes.bool,
  showExcel: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default ExportButtons;
