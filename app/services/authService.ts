import { API_ENDPOINTS } from '../config/api';
import { apiClient, setTokens, clearTokens } from './apiClient';
import {
  LoginRequest,
  LoginResponse,
  RegisterStudentRequest,
  RegisterParentRequest,
  RegisterMentorRequest,
  RegisterRecruiterRequest,
  RegisterCompanyRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  VerifyEmailRequest,
  VerifyPhoneRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  ApiResponse
} from '../types/auth.types';

export const authService = {
  /**
   * User Login
   * POST /api/v1/auth/login
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const res = await apiClient<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        deviceId: credentials.deviceId || 'web-client',
        platform: credentials.platform || 'web'
      })
    });

    if (res.success && res.data?.accessToken) {
      setTokens(res.data.accessToken, res.data.refreshToken);
      if (typeof window !== 'undefined') {
        localStorage.setItem('rr_user', JSON.stringify(res.data.user));
        sessionStorage.setItem('rr_user', JSON.stringify(res.data.user));
      }
    }

    return res;
  },

  /**
   * Register Student
   * POST /api/v1/auth/register/student
   */
  async registerStudent(data: RegisterStudentRequest): Promise<ApiResponse> {
    return await apiClient<ApiResponse>(API_ENDPOINTS.AUTH.REGISTER_STUDENT, {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify(data)
    });
  },

  /**
   * Register Parent
   * POST /api/v1/auth/register/parent
   */
  async registerParent(data: RegisterParentRequest): Promise<ApiResponse> {
    return await apiClient<ApiResponse>(API_ENDPOINTS.AUTH.REGISTER_PARENT, {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify(data)
    });
  },

  /**
   * Register Mentor
   * POST /api/v1/auth/register/mentor
   */
  async registerMentor(data: RegisterMentorRequest): Promise<ApiResponse> {
    return await apiClient<ApiResponse>(API_ENDPOINTS.AUTH.REGISTER_MENTOR, {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify(data)
    });
  },

  /**
   * Register Recruiter
   * POST /api/v1/auth/register/recruiter
   */
  async registerRecruiter(data: RegisterRecruiterRequest): Promise<ApiResponse> {
    return await apiClient<ApiResponse>(API_ENDPOINTS.AUTH.REGISTER_RECRUITER, {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify(data)
    });
  },

  /**
   * Register Company Admin
   * POST /api/v1/auth/register/company
   */
  async registerCompany(data: RegisterCompanyRequest): Promise<ApiResponse> {
    return await apiClient<ApiResponse>(API_ENDPOINTS.AUTH.REGISTER_COMPANY, {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify(data)
    });
  },

  /**
   * Refresh Token
   * POST /api/v1/auth/refresh
   */
  async refreshToken(data: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const res = await apiClient<RefreshTokenResponse>(API_ENDPOINTS.AUTH.REFRESH, {
      method: 'POST',
      skipAuth: true,
      headers: {
        'x-refresh-token': data.refreshToken
      },
      body: JSON.stringify(data)
    });

    if (res.success && res.data?.accessToken) {
      setTokens(res.data.accessToken, res.data.refreshToken);
    }

    return res;
  },

  /**
   * Logout
   * POST /api/v1/auth/logout
   */
  async logout(): Promise<void> {
    try {
      await apiClient(API_ENDPOINTS.AUTH.LOGOUT, {
        method: 'POST'
      });
    } catch (err) {
      // Gracefully continue with client-side cleanup even if backend returned error
    } finally {
      clearTokens();
    }
  },

  /**
   * Email Verification
   * POST /api/v1/auth/verify-email
   */
  async verifyEmail(data: VerifyEmailRequest): Promise<ApiResponse> {
    return await apiClient<ApiResponse>(API_ENDPOINTS.AUTH.VERIFY_EMAIL, {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify(data)
    });
  },

  /**
   * Phone Verification
   * POST /api/v1/auth/verify-phone
   */
  async verifyPhone(data: VerifyPhoneRequest): Promise<ApiResponse> {
    return await apiClient<ApiResponse>(API_ENDPOINTS.AUTH.VERIFY_PHONE, {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify(data)
    });
  },

  /**
   * Forgot Password
   * POST /api/v1/auth/forgot-password
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse> {
    return await apiClient<ApiResponse>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify(data)
    });
  },

  /**
   * Reset Password
   * POST /api/v1/auth/reset-password
   */
  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse> {
    return await apiClient<ApiResponse>(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify(data)
    });
  },

  /**
   * Change Password
   * POST /api/v1/auth/change-password
   */
  async changePassword(data: ChangePasswordRequest): Promise<ApiResponse> {
    return await apiClient<ApiResponse>(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  /**
   * Register Institution (School / College / Training Institute)
   * POST /api/v1/institutions/register
   */
  async registerInstitution(data: {
    name: string;
    type: 'school' | 'degree_college' | 'training' | 'university';
    slug: string;
    address: { street: string; city: string; state: string; postalCode: string };
    contact: { name: string; email: string; phone: string; role: string };
    documentUrl?: string;
  }): Promise<ApiResponse> {
    return await apiClient<ApiResponse>(API_ENDPOINTS.ADMIN.INSTITUTIONS_REGISTER, {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify(data)
    });
  }
};
