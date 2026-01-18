import Card from '../../../components/common/Card';
import Table from '../../../components/common/Table';
import { formatDate } from '../../../utils/formatters';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { delay } from '../../../utils/helpers';
import Loading from '../../../components/common/Loading';
import ExportButtons from '../../../components/common/ExportButtons';

const LoginHistory = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('searchQuery') || '';
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = history.filter(item => 
        item.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.userId?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredHistory(filtered);
    } else {
      setFilteredHistory(history);
    }
  }, [history, searchQuery]);

  const loadHistory = async () => {
    await delay(500);
    // Mock data - in real app, this would come from API
    const mockHistory = [
      { id: '1', userId: 'okokok222', username: 'okokok222', ipAddress: '192.168.1.1', device: 'Chrome on Windows', createdAt: new Date().toISOString() },
      { id: '2', userId: 'okokok222', username: 'okokok222', ipAddress: '192.168.1.2', device: 'Firefox on Mac', createdAt: new Date().toISOString() },
    ];
    setHistory(mockHistory);
    setFilteredHistory(mockHistory);
    setLoading(false);
  };

  const columns = [
    { header: 'Username', accessor: 'username' },
    { header: 'User ID', accessor: 'userId' },
    { header: 'IP Address', accessor: 'ipAddress' },
    { header: 'Device', accessor: 'device' },
    { header: 'Date', accessor: 'createdAt', render: (value) => formatDate(value) },
  ];

  // Export columns
  const exportColumns = [
    { header: 'Username', accessor: 'username' },
    { header: 'User ID', accessor: 'userId' },
    { header: 'IP Address', accessor: 'ipAddress' },
    { header: 'Device', accessor: 'device' },
    { header: 'Date', accessor: 'createdAt' },
  ];

  if (loading) return <Loading size="lg" />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Login History</h1>
        <div className="flex items-center gap-4">
          {searchQuery && (
            <div className="text-sm text-gray-600">
              Filtered by: <span className="font-semibold">{searchQuery}</span>
            </div>
          )}
          <ExportButtons
            data={filteredHistory}
            columns={exportColumns}
            filename="login_history"
            title="Login History"
          />
        </div>
      </div>
      <Card>
        <Table columns={columns} data={filteredHistory} />
      </Card>
    </div>
  );
};

export default LoginHistory;

