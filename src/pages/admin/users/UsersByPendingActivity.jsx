import AllUsers from './AllUsers';
import { userService } from '../../../services/userService';

// Wrapper that reuses AllUsers with a custom loader to show users with pending withdrawals or investments
const UsersByPendingActivity = () => {
  const loadUsersByPendingActivity = async (filters = {}) => {
    // Fetch users with pending withdrawals
    const pendingWithdrawalFilters = { 
      ...filters, 
      hasPendingWithdrawal: true 
    };
    const usersWithPendingWithdrawal = await userService.getAllUsers(pendingWithdrawalFilters);
    
    // Fetch users with pending/active investments
    const pendingInvestmentFilters = { 
      ...filters, 
      hasPendingInvestment: true 
    };
    const usersWithPendingInvestment = await userService.getAllUsers(pendingInvestmentFilters);
    
    // Combine and deduplicate by user ID
    const combined = [...usersWithPendingWithdrawal, ...usersWithPendingInvestment];
    const uniqueUsers = Array.from(
      new Map(combined.map(u => [u.id, u])).values()
    );
    
    return uniqueUsers;
  };

  return <AllUsers loadUsersFn={loadUsersByPendingActivity} title="Users By Pending Withdrawal/Investment" />;
};

export default UsersByPendingActivity;
