import { API_ENDPOINTS } from '../config/api';
import { apiClient } from './apiClient';
import { CurrentUser, CurrentUserResponse, AdminHealthData, AdminHealthResponse } from '../types/user.types';

export const userService = {
  /**
   * Get Current Authenticated User
   * GET /api/v1/users/me
   */
  async getCurrentUser(): Promise<CurrentUser> {
    const res = await apiClient<CurrentUserResponse>(API_ENDPOINTS.USERS.ME);
    return res.data;
  },

  /**
   * Get Admin Health Status
   * GET /api/v1/users/admin/health
   */
  async getAdminHealth(): Promise<AdminHealthData> {
    const res = await apiClient<AdminHealthResponse>(API_ENDPOINTS.USERS.ADMIN_HEALTH);
    return res.data;
  }
};
