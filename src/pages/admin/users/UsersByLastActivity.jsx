import AllUsers from './AllUsers';
import { userService } from '../../../services/userService';

// Wrapper that reuses AllUsers with a custom loader to show users by last withdrawal/investment activity
const UsersByLastActivity = () => {
  const loadUsersByLastActivity = async (filters = {}) => {
    // Set default date range to last 30 days if not specified
    const defaultFilters = {
      ...filters,
    };
    
    // If no date filters are set, default to last 30 days
    if (!filters.lastWithdrawalDateFrom && !filters.lastWithdrawalDateTo && 
        !filters.lastInvestmentDateFrom && !filters.lastInvestmentDateTo) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      defaultFilters.lastWithdrawalDateFrom = thirtyDaysAgo.toISOString().split('T')[0];
      defaultFilters.lastInvestmentDateFrom = thirtyDaysAgo.toISOString().split('T')[0];
    }
    
    return await userService.getAllUsers(defaultFilters);
  };

  return <AllUsers loadUsersFn={loadUsersByLastActivity} title="Users By Last Withdrawal/Investment" />;
};

export default UsersByLastActivity;
