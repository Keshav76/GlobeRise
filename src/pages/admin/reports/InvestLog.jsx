import Card from '../../../components/common/Card';
import Table from '../../../components/common/Table';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import { useState, useEffect } from 'react';
import { delay } from '../../../utils/helpers';
import Loading from '../../../components/common/Loading';
import ExportButtons from '../../../components/common/ExportButtons';

const InvestLog = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvestments();
  }, []);

  const loadInvestments = async () => {
    await delay(500);
    setInvestments([]);
    setLoading(false);
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'User ID', accessor: 'userId' },
    { header: 'Amount', accessor: 'amount', render: (value) => formatCurrency(value) },
    { header: 'Plan', accessor: 'plan' },
    { header: 'Date', accessor: 'createdAt', render: (value) => formatDate(value) },
  ];

  // Export columns
  const exportColumns = [
    { header: 'ID', accessor: 'id' },
    { header: 'User ID', accessor: 'userId' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Plan', accessor: 'plan' },
    { header: 'Date', accessor: 'createdAt' },
  ];

  if (loading) return <Loading size="lg" />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Invest Log</h1>
        <ExportButtons
          data={investments}
          columns={exportColumns}
          filename="invest_log"
          title="Invest Log"
        />
      </div>
      <Card>
        <Table columns={columns} data={investments} />
      </Card>
    </div>
  );
};

export default InvestLog;

