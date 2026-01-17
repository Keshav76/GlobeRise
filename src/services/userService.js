import { delay } from '../utils/helpers';
import { STORAGE_KEYS } from '../utils/constants';
import { mockUsers } from '../data/mockUsers';
import api from './api';

// Initialize users in localStorage if not exists
if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers));
}

const getUsers = () => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

// Helper function to build query string from filters
const buildQueryParams = (filters = {}, page = 1, limit = 100) => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  if (filters.rank) params.append('rank', filters.rank);
  if (filters.leaderId) params.append('leaderId', filters.leaderId);
  if (filters.status && filters.status !== 'all') params.append('status', filters.status);
  if (filters.emailVerified && filters.emailVerified !== 'all') params.append('emailVerified', filters.emailVerified);
  if (filters.phoneVerified && filters.phoneVerified !== 'all') params.append('phoneVerified', filters.phoneVerified);
  if (filters.hasPendingWithdrawal !== null && filters.hasPendingWithdrawal !== undefined) {
    params.append('hasPendingWithdrawal', filters.hasPendingWithdrawal.toString());
  }
  if (filters.hasPendingInvestment !== null && filters.hasPendingInvestment !== undefined) {
    params.append('hasPendingInvestment', filters.hasPendingInvestment.toString());
  }
  if (filters.lastWithdrawalDateFrom) params.append('lastWithdrawalDateFrom', filters.lastWithdrawalDateFrom);
  if (filters.lastWithdrawalDateTo) params.append('lastWithdrawalDateTo', filters.lastWithdrawalDateTo);
  if (filters.lastInvestmentDateFrom) params.append('lastInvestmentDateFrom', filters.lastInvestmentDateFrom);
  if (filters.lastInvestmentDateTo) params.append('lastInvestmentDateTo', filters.lastInvestmentDateTo);
  if (filters.country) params.append('country', filters.country);
  if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
  if (filters.dateTo) params.append('dateTo', filters.dateTo);

  return params.toString();
};

// Transform API user data to match frontend format
const transformUser = (user) => {
  return {
    id: user.id,
    email: user.email,
    username: user.profile?.username || '',
    name: user.profile?.firstName && user.profile?.lastName 
      ? `${user.profile.firstName} ${user.profile.lastName}` 
      : user.profile?.firstName || user.profile?.lastName || '',
    firstName: user.profile?.firstName || '',
    lastName: user.profile?.lastName || '',
    mobile: user.profile?.phone || '',
    mobileCountryCode: user.profile?.phoneCountryCode || '',
    countryCode: user.profile?.country || '',
    country: user.profile?.country || '',
    emailVerified: user.is_verified || false,
    mobileVerified: !!user.profile?.phone,
    rank: user.rank || 'NONE',
    leaderId: user.referredById || null,
    leader: user.referrer ? {
      id: user.referrer.id,
      email: user.referrer.email,
      name: user.referrer.profile?.firstName && user.referrer.profile?.lastName
        ? `${user.referrer.profile.firstName} ${user.referrer.profile.lastName}`
        : user.referrer.profile?.username || user.referrer.email
    } : null,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
    balance: 0, // Will need to be fetched separately or included in API
    lastInvestment: user.investments?.[0] || null,
    lastWithdrawal: user.transactions?.[0] || null,
    role: user.role,
    twoFactorEnabled: user.two_factor_enabled || false
  };
};

export const userService = {
  async getAllUsers(filters = {}, page = 1, limit = 100) {
    try {
      const queryString = buildQueryParams(filters, page, limit);
      const response = await api.get(`/admin/users?${queryString}`);
      
      if (response.data.success && response.data.data.users) {
        // Transform API response to match frontend format
        return response.data.data.users.map(transformUser);
      }
      return [];
    } catch (error) {
      console.error('Error fetching users from API:', error);
      // Fallback to mock data if API fails
      await delay(500);
      return getUsers();
    }
  },

  async getUserById(id) {
    try {
      const response = await api.get(`/admin/users/${id}`);
      if (response.data.success && response.data.data.user) {
        return transformUser(response.data.data.user);
      }
      return null;
    } catch (error) {
      console.error('Error fetching user from API:', error);
      // Fallback to mock data
      await delay(300);
      const users = getUsers();
      return users.find(u => u.id === id);
    }
  },

  async getActiveUsers(filters = {}) {
    try {
      // Use API with status filter
      const apiFilters = { ...filters, status: 'active' };
      return await this.getAllUsers(apiFilters);
    } catch (error) {
      // Fallback to mock data
      await delay(500);
      const users = getUsers();
      let filtered = users.filter(u => u.status === 'active');
      // Apply additional filters if provided
      if (filters.rank) filtered = filtered.filter(u => u.rank === filters.rank);
      if (filters.emailVerified && filters.emailVerified !== 'all') {
        filtered = filtered.filter(u => filters.emailVerified === 'verified' ? u.emailVerified : !u.emailVerified);
      }
      return filtered;
    }
  },

  async getBannedUsers(filters = {}) {
    try {
      // Use API - Note: backend may need status field for banned users
      const apiFilters = { ...filters, status: 'banned' };
      return await this.getAllUsers(apiFilters);
    } catch (error) {
      // Fallback to mock data
      await delay(500);
      const users = getUsers();
      let filtered = users.filter(u => u.status === 'banned');
      if (filters.rank) filtered = filtered.filter(u => u.rank === filters.rank);
      return filtered;
    }
  },

  async getEmailUnverifiedUsers(filters = {}) {
    try {
      const apiFilters = { ...filters, emailVerified: 'pending' };
      return await this.getAllUsers(apiFilters);
    } catch (error) {
      // Fallback to mock data
      await delay(500);
      const users = getUsers();
      let filtered = users.filter(u => !u.emailVerified);
      if (filters.rank) filtered = filtered.filter(u => u.rank === filters.rank);
      return filtered;
    }
  },

  async getMobileUnverifiedUsers(filters = {}) {
    try {
      const apiFilters = { ...filters, phoneVerified: 'pending' };
      return await this.getAllUsers(apiFilters);
    } catch (error) {
      // Fallback to mock data
      await delay(500);
      const users = getUsers();
      let filtered = users.filter(u => !u.mobileVerified);
      if (filters.rank) filtered = filtered.filter(u => u.rank === filters.rank);
      return filtered;
    }
  },

  async getKYCUnverifiedUsers(filters = {}) {
    try {
      // Use API with filters
      return await this.getAllUsers(filters);
    } catch (error) {
      // Fallback to mock data
      await delay(500);
      const users = getUsers();
      let filtered = users.filter(u => u.kycStatus === 'unverified');
      if (filters.rank) filtered = filtered.filter(u => u.rank === filters.rank);
      return filtered;
    }
  },

  async getKYCPendingUsers(filters = {}) {
    try {
      // Use API with filters
      return await this.getAllUsers(filters);
    } catch (error) {
      // Fallback to mock data
      await delay(500);
      const users = getUsers();
      let filtered = users.filter(u => u.kycStatus === 'pending');
      if (filters.rank) filtered = filtered.filter(u => u.rank === filters.rank);
      return filtered;
    }
  },

  async getPaidUsers(filters = {}) {
    try {
      // Use API with filters
      return await this.getAllUsers(filters);
    } catch (error) {
      // Fallback to mock data
      await delay(500);
      const users = getUsers();
      let filtered = users.filter(u => u.totalDeposited > 0);
      if (filters.rank) filtered = filtered.filter(u => u.rank === filters.rank);
      return filtered;
    }
  },

  async updateUser(id, updates) {
    await delay(800);
    const users = getUsers();
    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) {
      throw new Error('User not found');
    }
    
    users[index] = { ...users[index], ...updates };
    saveUsers(users);
    
    return users[index];
  },

  async banUser(id) {
    return this.updateUser(id, { status: 'banned' });
  },

  async unbanUser(id) {
    return this.updateUser(id, { status: 'active' });
  },

  async sendNotification(userIds, message) {
    await delay(1000);
    // In real app, this would send notifications
    return { message: `Notification sent to ${userIds.length} users` };
  },
};

