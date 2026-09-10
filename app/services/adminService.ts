import { API_ENDPOINTS } from '../config/api';
import { apiClient } from './apiClient';
import {
  CreateTenantRequest,
  InstitutionRegisterRequest,
  ApproveInstitutionRequest,
  CreateSubscriptionRequest,
  CohortAnalyticsParams,
  ItemAnalysisParams
} from '../types/admin.types';
import { AdminHealthData, AdminHealthResponse } from '../types/user.types';
import { ApiResponse } from '../types/auth.types';

export const adminService = {
  /**
   * Admin Health & Telemetry
   * GET /api/v1/users/admin/health
   */
  async getHealth(): Promise<AdminHealthData> {
    const res = await apiClient<AdminHealthResponse>(API_ENDPOINTS.ADMIN.HEALTH);
    return res.data;
  },

  /**
   * Create Tenant (Super Admin Only)
   * POST /api/v1/tenants
   */
  async createTenant(data: CreateTenantRequest): Promise<ApiResponse> {
    return await apiClient<ApiResponse>(API_ENDPOINTS.ADMIN.TENANTS, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  /**
   * Request Registration for an Institution
   * POST /api/v1/institutions/register
   */
  async registerInstitution(data: InstitutionRegisterRequest): Promise<ApiResponse> {
    return await apiClient<ApiResponse>(API_ENDPOINTS.ADMIN.INSTITUTIONS_REGISTER, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  /**
   * Approve Pending Institution (Super Admin Only)
   * POST /api/v1/institutions/approve
   */
  async approveInstitution(data: ApproveInstitutionRequest): Promise<ApiResponse> {
    return await apiClient<ApiResponse>(API_ENDPOINTS.ADMIN.INSTITUTIONS_APPROVE, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  /**
   * Create Subscription for a Tenant
   * POST /api/v1/subscriptions
   */
  async createSubscription(data: CreateSubscriptionRequest): Promise<ApiResponse> {
    return await apiClient<ApiResponse>(API_ENDPOINTS.ADMIN.SUBSCRIPTIONS, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  /**
   * Cohort Aptitude Analytics (Admin only)
   * GET /api/v1/aptitude/admin/analytics/cohort
   */
  async getCohortAptitudeAnalytics(params?: CohortAnalyticsParams): Promise<any> {
    const query = new URLSearchParams();
    if (params?.dimension) query.set('dimension', params.dimension);
    if (params?.class) query.set('class', params.class);
    if (params?.departmentId) query.set('departmentId', params.departmentId);
    const qs = query.toString() ? `?${query.toString()}` : '';

    const res = await apiClient<any>(`${API_ENDPOINTS.ADMIN.APTITUDE_COHORT}${qs}`);
    return res.data || res;
  },

  /**
   * Item Analysis Details for Aptitude Questions (Admin only)
   * GET /api/v1/aptitude/admin/analytics/items
   */
  async getAptitudeItemsAnalysis(params?: ItemAnalysisParams): Promise<any> {
    const query = new URLSearchParams();
    if (params?.limit) query.set('limit', String(params.limit));
    if (params?.offset) query.set('offset', String(params.offset));
    const qs = query.toString() ? `?${query.toString()}` : '';

    const res = await apiClient<any>(`${API_ENDPOINTS.ADMIN.APTITUDE_ITEMS}${qs}`);
    return res.data || res;
  },

  /**
   * Tenant-wide Cohort Skill Analytics (Admin only)
   * GET /api/v1/skill-mapping/analytics/cohort
   */
  async getCohortSkillAnalytics(): Promise<any> {
    const res = await apiClient<any>(API_ENDPOINTS.ADMIN.SKILL_COHORT);
    return res.data || res;
  }
};
