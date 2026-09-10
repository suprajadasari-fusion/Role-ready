import { API_ENDPOINTS } from '../config/api';
import { apiClient } from './apiClient';
import {
  UserProfileResponse,
  CompleteProfileRequest,
  AvatarUpdateRequest,
  UploadResponse
} from '../types/profile.types';
import { ApiResponse } from '../types/auth.types';

export const profileService = {
  /**
   * Get Profile
   * GET /api/v1/profile/
   */
  async getProfile(): Promise<UserProfileResponse> {
    const res = await apiClient<{ success: boolean; data: UserProfileResponse }>(API_ENDPOINTS.PROFILE.GET);
    return res.data;
  },

  /**
   * Complete Profile
   * PUT /api/v1/profile/complete
   */
  async completeProfile(data: CompleteProfileRequest): Promise<ApiResponse> {
    return await apiClient<ApiResponse>(API_ENDPOINTS.PROFILE.COMPLETE, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  /**
   * Update Avatar URL & Public ID
   * PUT /api/v1/profile/avatar
   */
  async updateAvatar(data: AvatarUpdateRequest): Promise<ApiResponse> {
    return await apiClient<ApiResponse>(API_ENDPOINTS.PROFILE.AVATAR, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  /**
   * Profile File Upload
   * POST /api/v1/profile/upload
   * Sends multipart/form-data with file
   */
  async uploadProfileFile(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return await apiClient<UploadResponse>(API_ENDPOINTS.PROFILE.UPLOAD, {
      method: 'POST',
      body: formData
    });
  }
};
