export interface BackendProfile {
  profileId?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  bio?: string;
  avatarUrl?: string | null;
  onboardingCompleted?: boolean;
  roleData?: any;
}

export interface UserProfileResponse {
  id: string;
  email: string;
  phone?: string;
  role: string;
  isVerified?: boolean;
  isActive?: boolean;
  avatarUrl?: string | null;
  profile?: BackendProfile;
}

export interface CompleteProfileRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  bio: string;
  onboardingCompleted: boolean;
  roleData?: any;
}

export interface AvatarUpdateRequest {
  avatarUrl: string;
  avatarPublicId: string;
}

export interface UploadResponseData {
  url: string;
  publicId: string;
  format: string;
  bytes: number;
}

export interface UploadResponse {
  success: boolean;
  message?: string;
  data?: UploadResponseData;
  errors?: any;
}
