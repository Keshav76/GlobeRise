import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import { formatDate } from '../../utils/formatters';
import { useState, useEffect } from 'react';
import { delay } from '../../utils/helpers';
import Loading from '../../components/common/Loading';
import ExportButtons from '../../components/common/ExportButtons';

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async () => {
    await delay(500);
    setSubscribers([]);
    setLoading(false);
  };

  const columns = [
    { header: 'Email', accessor: 'email' },
    { header: 'Subscribed At', accessor: 'createdAt', render: (value) => formatDate(value) },
    { header: 'Status', accessor: 'status', render: (value) => (
      <span className={`px-2 py-1 rounded-full text-xs ${value === 'active' ? 'bg-[#10b981]/20 text-[#10b981]' : 'bg-gray-500/20 text-gray-400'}`}>
        {value}
      </span>
    )},
  ];

  // Export columns
  const exportColumns = [
    { header: 'Email', accessor: 'email' },
    { header: 'Subscribed At', accessor: 'createdAt' },
    { header: 'Status', accessor: 'status' },
  ];

  if (loading) return <Loading size="lg" />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Subscribers</h1>
        <ExportButtons
          data={subscribers}
          columns={exportColumns}
          filename="subscribers"
          title="Subscribers"
        />
      </div>
      <Card>
        <Table columns={columns} data={subscribers} />
      </Card>
    </div>
  );
};

export default Subscribers;

