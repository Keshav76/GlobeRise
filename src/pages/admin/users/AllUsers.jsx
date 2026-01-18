import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFileAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { userService } from '../../../services/userService';
import { formatCurrency, formatDateWithRelative } from '../../../utils/formatters';
import Loading from '../../../components/common/Loading';
import Button from '../../../components/common/Button';
import UserFilters from '../../../components/admin/UserFilters';
import ExportButtons from '../../../components/common/ExportButtons';

const AllUsers = ({ loadUsersFn, title = 'All Users' }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    rank: null,
    leaderId: null,
    status: 'all',
    emailVerified: 'all',
    phoneVerified: 'all',
    hasPendingWithdrawal: null,
    hasPendingInvestment: null,
    lastWithdrawalDateFrom: null,
    lastWithdrawalDateTo: null,
    lastInvestmentDateFrom: null,
    lastInvestmentDateTo: null,
    country: null,
    dateFrom: null,
    dateTo: null
  });

  useEffect(() => {
    loadUsers();
  }, [filters, loadUsersFn]);

  useEffect(() => {
    filterUsers();
  }, [users, searchQuery]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      // If loadUsersFn is provided, try to pass filters to it
      // Otherwise, use getAllUsers with filters
      let data;
      if (loadUsersFn) {
        // Check if the function accepts filters parameter
        if (loadUsersFn.length > 0) {
          data = await loadUsersFn(filters);
        } else {
          data = await loadUsersFn();
          // Apply client-side filtering for mock data functions
          data = applyClientSideFilters(data);
        }
      } else {
        data = await userService.getAllUsers(filters);
      }
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Apply client-side filters for mock data functions
  const applyClientSideFilters = (userList) => {
    let filtered = [...userList];

    if (filters.rank) {
      filtered = filtered.filter(u => u.rank === filters.rank);
    }
    if (filters.leaderId) {
      filtered = filtered.filter(u => u.leaderId === filters.leaderId);
    }
    if (filters.status && filters.status !== 'all') {
      if (filters.status === 'active') {
        filtered = filtered.filter(u => u.status === 'active');
      } else if (filters.status === 'inactive') {
        filtered = filtered.filter(u => u.status !== 'active');
      }
    }
    if (filters.emailVerified && filters.emailVerified !== 'all') {
      if (filters.emailVerified === 'verified') {
        filtered = filtered.filter(u => u.emailVerified);
      } else {
        filtered = filtered.filter(u => !u.emailVerified);
      }
    }
    if (filters.phoneVerified && filters.phoneVerified !== 'all') {
      if (filters.phoneVerified === 'verified') {
        filtered = filtered.filter(u => u.mobileVerified);
      } else {
        filtered = filtered.filter(u => !u.mobileVerified);
      }
    }
    if (filters.country) {
      filtered = filtered.filter(u => u.country === filters.country || u.countryCode === filters.country);
    }
    if (filters.hasPendingWithdrawal === true) {
      filtered = filtered.filter(u => u.hasPendingWithdrawal === true);
    }
    if (filters.hasPendingInvestment === true) {
      filtered = filtered.filter(u => u.hasActiveInvestment === true);
    }

    return filtered;
  };

  const filterUsers = () => {
    if (!searchQuery.trim()) {
      setFilteredUsers(users);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = users.filter(user => {
      return (
        user.username?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.name?.toLowerCase().includes(query) ||
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(query)
      );
    });
    setFilteredUsers(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      rank: null,
      leaderId: null,
      status: 'all',
      emailVerified: 'all',
      phoneVerified: 'all',
      hasPendingWithdrawal: null,
      hasPendingInvestment: null,
      lastWithdrawalDateFrom: null,
      lastWithdrawalDateTo: null,
      lastInvestmentDateFrom: null,
      lastInvestmentDateTo: null,
      country: null,
      dateFrom: null,
      dateTo: null
    });
  };

  const handleDetailsClick = (userId) => {
    navigate(`/admin/users/details/${userId}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    filterUsers();
  };

  // Define columns for export
  const exportColumns = [
    { header: 'Username', accessor: 'username' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Mobile', accessor: 'mobile' },
    { header: 'Rank', accessor: 'rank' },
    { header: 'Country', accessor: 'country' },
    { header: 'Balance', accessor: 'balance' },
    { header: 'Email Verified', accessor: 'emailVerified' },
    { header: 'Mobile Verified', accessor: 'mobileVerified' },
    { header: 'Joined At', accessor: 'createdAt' },
  ];

  if (loading) return <Loading size="lg" />;

  return (
    <div>
      {/* Filters Component - Always show filters */}
      <UserFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <div className="bg-[var(--card-bg)] rounded-lg shadow-md border border-[var(--border-color)] p-6">
        {/* Header with Search */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">{title}</h1>
          <div className="flex items-center space-x-3">
            <ExportButtons
              data={filteredUsers}
              columns={exportColumns}
              filename={title.toLowerCase().replace(/\s+/g, '_')}
              title={title}
            />
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Username / Email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-[var(--border-color)] bg-[var(--input-bg)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] text-[var(--text-primary)] placeholder-[var(--text-tertiary)]"
              />
              <Button
                type="submit"
                variant="primary"
                className="px-4 py-2 flex items-center space-x-2"
              >
                <FaSearch />
              </Button>
            </form>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#00ADB5]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Leader
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Email-Mobile
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Verification
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Joined At
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Balance
                </th>
                <th className="px-6 py-3 text-right pr-9 text-xs font-bold text-white uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-[var(--card-bg)] divide-y divide-[var(--border-color)]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-4 text-center text-[var(--text-tertiary)]">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => {
                  const dateInfo = formatDateWithRelative(user.createdAt);
                  return (
                    <tr key={user.id} className={`hover:bg-[var(--bg-hover)] ${index % 2 === 0 ? 'bg-[var(--card-bg)]' : 'bg-[var(--bg-secondary)]'}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[var(--text-primary)]">
                          <div className="font-medium">{user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email}</div>
                          <div className="text-[var(--text-tertiary)]">@{user.username || 'N/A'}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">
                            {user.rank || 'NONE'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[var(--text-primary)]">
                          {user.leader ? (
                            <div>
                              <div className="font-medium">{user.leader.name || user.leader.email}</div>
                              <div className="text-[var(--text-tertiary)] text-xs">{user.leader.email}</div>
                            </div>
                          ) : (
                            <span className="text-[var(--text-tertiary)]">N/A</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[var(--text-primary)]">
                          <div>{user.email || 'N/A'}</div>
                          <div className="text-[var(--text-tertiary)]">{user.mobile || 'N/A'}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3 text-sm">
                          <div className="flex items-center space-x-1" title={user.emailVerified ? 'Email Verified' : 'Email Not Verified'}>
                            {user.emailVerified ? (
                              <FaCheckCircle className="text-green-500" />
                            ) : (
                              <FaTimesCircle className="text-red-500" />
                            )}
                            <span className="text-[var(--text-tertiary)] text-xs">Email</span>
                          </div>
                          <div className="flex items-center space-x-1" title={user.mobileVerified ? 'Mobile Verified' : 'Mobile Not Verified'}>
                            {user.mobileVerified ? (
                              <FaCheckCircle className="text-green-500" />
                            ) : (
                              <FaTimesCircle className="text-red-500" />
                            )}
                            <span className="text-[var(--text-tertiary)] text-xs">Mobile</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[var(--text-primary)]">{user.country || user.countryCode || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[var(--text-primary)]">
                          <div>{dateInfo.dateTime || (user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A')}</div>
                          <div className="text-[var(--text-tertiary)] text-xs">{dateInfo.relative || ''}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[var(--text-primary)]">{formatCurrency(user.balance || 0)}</div>
                      </td>
                      <td className="px-6 py-4 float-right whitespace-nowrap">
                        <button
                          onClick={() => handleDetailsClick(user.id)}
                          className="bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-500/30 px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-colors"
                        >
                          <FaFileAlt className="text-blue-700 dark:text-blue-400" />
                          <span>Details</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;

