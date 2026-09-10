export interface CurrentUser {
  id: string;
  email: string;
  role: string;
  phone?: string;
  isVerified?: boolean;
  isActive?: boolean;
  avatarUrl?: string | null;
  profile?: {
    profileId?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    bio?: string;
    avatarUrl?: string | null;
    onboardingCompleted?: boolean;
    roleData?: any;
  };
}

export interface CurrentUserResponse {
  success: boolean;
  message: string;
  data: CurrentUser;
  errors?: any;
}

export interface AdminHealthData {
  dbConnected: boolean;
  status: string;
}

export interface AdminHealthResponse {
  success: boolean;
  message?: string;
  data: AdminHealthData;
  errors?: any;
}
