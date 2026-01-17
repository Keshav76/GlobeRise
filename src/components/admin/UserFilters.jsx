import { useState, useEffect } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';
import { rankingService } from '../../services/rankingService';
import { COUNTRIES } from '../../utils/countryCodes';

const UserFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const [ranks, setRanks] = useState([]);
  const [loadingRanks, setLoadingRanks] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    loadRanks();
  }, []);

  const loadRanks = async () => {
    try {
      // Use the same service as User Ranking page
      const data = await rankingService.getAllRankings();
      // Sort by order or level to ensure proper display order
      const sortedData = [...(data || [])].sort((a, b) => {
        const orderA = a.order || a.level || 0;
        const orderB = b.order || b.level || 0;
        return orderA - orderB;
      });
      // Filter only enabled rankings
      const enabledRanks = sortedData.filter(r => r.status !== 'disabled');
      setRanks(enabledRanks || []);
    } catch (error) {
      console.error('Error loading ranks:', error);
    } finally {
      setLoadingRanks(false);
    }
  };

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleDateChange = (key, value) => {
    handleFilterChange(key, value || null);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.rank) count++;
    if (filters.leaderId) count++;
    if (filters.status && filters.status !== 'all') count++;
    if (filters.emailVerified && filters.emailVerified !== 'all') count++;
    if (filters.phoneVerified && filters.phoneVerified !== 'all') count++;
    if (filters.hasPendingWithdrawal) count++;
    if (filters.hasPendingInvestment) count++;
    if (filters.lastWithdrawalDateFrom || filters.lastWithdrawalDateTo) count++;
    if (filters.lastInvestmentDateFrom || filters.lastInvestmentDateTo) count++;
    if (filters.country) count++;
    if (filters.dateFrom || filters.dateTo) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FaFilter className="text-[#00ADB5]" />
          <h3 className="text-[var(--text-primary)] font-semibold">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="px-2 py-1 bg-[#00ADB5] text-white text-xs rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="px-3 py-1 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[#00ADB5] rounded transition-colors"
          >
            {showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
          </button>
          {activeFilterCount > 0 && (
            <button
              onClick={onClearFilters}
              className="px-3 py-1 text-sm text-red-500 hover:text-red-600 border border-red-500/30 hover:border-red-500 rounded transition-colors flex items-center space-x-1"
            >
              <FaTimes />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Rank Filter */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-tertiary)] mb-2">
            Rank/Level
          </label>
          <select
            value={filters.rank || ''}
            onChange={(e) => handleFilterChange('rank', e.target.value || null)}
            className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
            disabled={loadingRanks}
          >
            <option value="">All Ranks</option>
            {ranks.map((rank) => (
              <option key={rank.name || rank.id} value={rank.name}>
                {rank.name} {rank.level ? `(Level ${rank.level})` : rank.order ? `(Order ${rank.order})` : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-tertiary)] mb-2">
            Status
          </label>
          <select
            value={filters.status || 'all'}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
          >
            <option value="all">All Users</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Email Verification */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-tertiary)] mb-2">
            Email Verification
          </label>
          <select
            value={filters.emailVerified || 'all'}
            onChange={(e) => handleFilterChange('emailVerified', e.target.value)}
            className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
          >
            <option value="all">All</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Phone Verification */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-tertiary)] mb-2">
            Mobile Verification
          </label>
          <select
            value={filters.phoneVerified || 'all'}
            onChange={(e) => handleFilterChange('phoneVerified', e.target.value)}
            className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
          >
            <option value="all">All</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Leader/Referrer Filter */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-tertiary)] mb-2">
                Leader/Referrer ID
              </label>
              <input
                type="text"
                value={filters.leaderId || ''}
                onChange={(e) => handleFilterChange('leaderId', e.target.value || null)}
                placeholder="Enter leader user ID"
                className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              />
            </div>

            {/* Country Filter */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-tertiary)] mb-2">
                Country
              </label>
              <select
                value={filters.country || ''}
                onChange={(e) => handleFilterChange('country', e.target.value || null)}
                className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              >
                <option value="">All Countries</option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Pending Withdrawal */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-tertiary)] mb-2">
                Pending Withdrawal
              </label>
              <select
                value={filters.hasPendingWithdrawal ? 'true' : filters.hasPendingWithdrawal === false ? 'false' : ''}
                onChange={(e) => {
                  const value = e.target.value;
                  handleFilterChange('hasPendingWithdrawal', value === '' ? null : value === 'true');
                }}
                className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              >
                <option value="">All</option>
                <option value="true">Has Pending</option>
                <option value="false">No Pending</option>
              </select>
            </div>

            {/* Pending Investment */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-tertiary)] mb-2">
                Active Investment
              </label>
              <select
                value={filters.hasPendingInvestment ? 'true' : filters.hasPendingInvestment === false ? 'false' : ''}
                onChange={(e) => {
                  const value = e.target.value;
                  handleFilterChange('hasPendingInvestment', value === '' ? null : value === 'true');
                }}
                className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              >
                <option value="">All</option>
                <option value="true">Has Active</option>
                <option value="false">No Active</option>
              </select>
            </div>

            {/* Last Withdrawal Date From */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-tertiary)] mb-2">
                Last Withdrawal From
              </label>
              <input
                type="date"
                value={filters.lastWithdrawalDateFrom || ''}
                onChange={(e) => handleDateChange('lastWithdrawalDateFrom', e.target.value)}
                className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              />
            </div>

            {/* Last Withdrawal Date To */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-tertiary)] mb-2">
                Last Withdrawal To
              </label>
              <input
                type="date"
                value={filters.lastWithdrawalDateTo || ''}
                onChange={(e) => handleDateChange('lastWithdrawalDateTo', e.target.value)}
                className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              />
            </div>

            {/* Last Investment Date From */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-tertiary)] mb-2">
                Last Investment From
              </label>
              <input
                type="date"
                value={filters.lastInvestmentDateFrom || ''}
                onChange={(e) => handleDateChange('lastInvestmentDateFrom', e.target.value)}
                className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              />
            </div>

            {/* Last Investment Date To */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-tertiary)] mb-2">
                Last Investment To
              </label>
              <input
                type="date"
                value={filters.lastInvestmentDateTo || ''}
                onChange={(e) => handleDateChange('lastInvestmentDateTo', e.target.value)}
                className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              />
            </div>

            {/* General Date From */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-tertiary)] mb-2">
                Joined Date From
              </label>
              <input
                type="date"
                value={filters.dateFrom || ''}
                onChange={(e) => handleDateChange('dateFrom', e.target.value)}
                className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              />
            </div>

            {/* General Date To */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-tertiary)] mb-2">
                Joined Date To
              </label>
              <input
                type="date"
                value={filters.dateTo || ''}
                onChange={(e) => handleDateChange('dateTo', e.target.value)}
                className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Active Filter Badges */}
      {activeFilterCount > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.rank && (
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm flex items-center space-x-1">
              <span>Rank: {filters.rank}</span>
              <button
                onClick={() => handleFilterChange('rank', null)}
                className="hover:text-blue-300"
              >
                <FaTimes className="text-xs" />
              </button>
            </span>
          )}
          {filters.leaderId && (
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm flex items-center space-x-1">
              <span>Leader: {filters.leaderId}</span>
              <button
                onClick={() => handleFilterChange('leaderId', null)}
                className="hover:text-purple-300"
              >
                <FaTimes className="text-xs" />
              </button>
            </span>
          )}
          {filters.status && filters.status !== 'all' && (
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm flex items-center space-x-1">
              <span>Status: {filters.status}</span>
              <button
                onClick={() => handleFilterChange('status', 'all')}
                className="hover:text-green-300"
              >
                <FaTimes className="text-xs" />
              </button>
            </span>
          )}
          {filters.emailVerified && filters.emailVerified !== 'all' && (
            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm flex items-center space-x-1">
              <span>Email: {filters.emailVerified}</span>
              <button
                onClick={() => handleFilterChange('emailVerified', 'all')}
                className="hover:text-yellow-300"
              >
                <FaTimes className="text-xs" />
              </button>
            </span>
          )}
          {filters.phoneVerified && filters.phoneVerified !== 'all' && (
            <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm flex items-center space-x-1">
              <span>Mobile: {filters.phoneVerified}</span>
              <button
                onClick={() => handleFilterChange('phoneVerified', 'all')}
                className="hover:text-orange-300"
              >
                <FaTimes className="text-xs" />
              </button>
            </span>
          )}
          {filters.country && (
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm flex items-center space-x-1">
              <span>Country: {filters.country}</span>
              <button
                onClick={() => handleFilterChange('country', null)}
                className="hover:text-indigo-300"
              >
                <FaTimes className="text-xs" />
              </button>
            </span>
          )}
          {(filters.lastWithdrawalDateFrom || filters.lastWithdrawalDateTo) && (
            <span className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm flex items-center space-x-1">
              <span>Withdrawal: {filters.lastWithdrawalDateFrom || '...'} to {filters.lastWithdrawalDateTo || '...'}</span>
              <button
                onClick={() => {
                  handleFilterChange('lastWithdrawalDateFrom', null);
                  handleFilterChange('lastWithdrawalDateTo', null);
                }}
                className="hover:text-pink-300"
              >
                <FaTimes className="text-xs" />
              </button>
            </span>
          )}
          {(filters.lastInvestmentDateFrom || filters.lastInvestmentDateTo) && (
            <span className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm flex items-center space-x-1">
              <span>Investment: {filters.lastInvestmentDateFrom || '...'} to {filters.lastInvestmentDateTo || '...'}</span>
              <button
                onClick={() => {
                  handleFilterChange('lastInvestmentDateFrom', null);
                  handleFilterChange('lastInvestmentDateTo', null);
                }}
                className="hover:text-teal-300"
              >
                <FaTimes className="text-xs" />
              </button>
            </span>
          )}
          {(filters.dateFrom || filters.dateTo) && (
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm flex items-center space-x-1">
              <span>Joined: {filters.dateFrom || '...'} to {filters.dateTo || '...'}</span>
              <button
                onClick={() => {
                  handleFilterChange('dateFrom', null);
                  handleFilterChange('dateTo', null);
                }}
                className="hover:text-cyan-300"
              >
                <FaTimes className="text-xs" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default UserFilters;
