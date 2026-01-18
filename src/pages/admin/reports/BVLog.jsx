import Card from '../../../components/common/Card';
import Table from '../../../components/common/Table';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import { useState, useEffect } from 'react';
import { delay } from '../../../utils/helpers';
import Loading from '../../../components/common/Loading';
import ExportButtons from '../../../components/common/ExportButtons';

const BVLog = () => {
  const [bvLogs, setBvLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBVLogs();
  }, []);

  const loadBVLogs = async () => {
    await delay(500);
    setBvLogs([]);
    setLoading(false);
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'User ID', accessor: 'userId' },
    { header: 'BV Amount', accessor: 'amount', render: (value) => formatCurrency(value) },
    { header: 'Type', accessor: 'type' },
    { header: 'Date', accessor: 'createdAt', render: (value) => formatDate(value) },
  ];

  // Export columns
  const exportColumns = [
    { header: 'ID', accessor: 'id' },
    { header: 'User ID', accessor: 'userId' },
    { header: 'BV Amount', accessor: 'amount' },
    { header: 'Type', accessor: 'type' },
    { header: 'Date', accessor: 'createdAt' },
  ];

  if (loading) return <Loading size="lg" />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">BV Log</h1>
        <ExportButtons
          data={bvLogs}
          columns={exportColumns}
          filename="bv_log"
          title="BV Log"
        />
      </div>
      <Card>
        <Table columns={columns} data={bvLogs} />
      </Card>
    </div>
  );
};

export default BVLog;

