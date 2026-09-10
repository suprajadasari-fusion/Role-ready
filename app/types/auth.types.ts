export interface RegisterStudentRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  parentName: string;
  parentEmail: string;
}

export interface RegisterParentRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  childrenDetails?: Array<{
    studentId: string;
    relationship: string;
  }>;
}

export interface RegisterMentorRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  skills: string[];
  experience: number;
  bio: string;
}

export interface RegisterRecruiterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  companyName: string;
  designation: string;
  experience: number;
}

export interface RegisterCompanyRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  companyProfile: string;
  industry: string;
  gst: string;
  website: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  deviceId?: string;
  platform?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    requires2Fa: boolean;
    accessToken: string;
    refreshToken: string;
    user: AuthUser;
    route: any;
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface VerifyEmailRequest {
  email: string;
  otpCode: string;
}

export interface VerifyPhoneRequest {
  email: string;
  phone: string;
  otpCode: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otpCode: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  errors?: any;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: any;
}
