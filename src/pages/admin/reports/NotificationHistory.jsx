import Card from '../../../components/common/Card';
import Table from '../../../components/common/Table';
import { formatDate } from '../../../utils/formatters';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { delay } from '../../../utils/helpers';
import Loading from '../../../components/common/Loading';
import ExportButtons from '../../../components/common/ExportButtons';

const NotificationHistory = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('searchQuery') || '';
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = notifications.filter(item => 
        item.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.userId?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredNotifications(filtered);
    } else {
      setFilteredNotifications(notifications);
    }
  }, [notifications, searchQuery]);

  const loadNotifications = async () => {
    await delay(500);
    // Mock data - in real app, this would come from API
    const mockNotifications = [
      { id: '1', userId: 'okokok222', username: 'okokok222', message: 'Welcome to GlobeRise', type: 'info', createdAt: new Date().toISOString() },
      { id: '2', userId: 'okokok222', username: 'okokok222', message: 'Your deposit has been approved', type: 'success', createdAt: new Date().toISOString() },
    ];
    setNotifications(mockNotifications);
    setFilteredNotifications(mockNotifications);
    setLoading(false);
  };

  const columns = [
    { header: 'Username', accessor: 'username' },
    { header: 'User ID', accessor: 'userId' },
    { header: 'Message', accessor: 'message' },
    { header: 'Type', accessor: 'type' },
    { header: 'Date', accessor: 'createdAt', render: (value) => formatDate(value) },
  ];

  // Export columns
  const exportColumns = [
    { header: 'Username', accessor: 'username' },
    { header: 'User ID', accessor: 'userId' },
    { header: 'Message', accessor: 'message' },
    { header: 'Type', accessor: 'type' },
    { header: 'Date', accessor: 'createdAt' },
  ];

  if (loading) return <Loading size="lg" />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notification History</h1>
        <div className="flex items-center gap-4">
          {searchQuery && (
            <div className="text-sm text-gray-600">
              Filtered by: <span className="font-semibold">{searchQuery}</span>
            </div>
          )}
          <ExportButtons
            data={filteredNotifications}
            columns={exportColumns}
            filename="notification_history"
            title="Notification History"
          />
        </div>
      </div>
      <Card>
        <Table columns={columns} data={filteredNotifications} />
      </Card>
    </div>
  );
};

export default NotificationHistory;

