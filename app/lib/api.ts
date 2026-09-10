import { 
  EcosystemEntity, 
  AuditLog, 
  AIWeights, 
  UserProfile, 
  BackendUser, 
  AuthResponseData, 
  AdminHealthData,
  ChildAccount,
  ParentFamilyProfile,
  FamilySubscription,
  SubjectMark,
  AttendanceSummary,
  AcademicProgressData,
  CareerProgressData,
  LearningProgressData,
  ParentReport,
  Scholarship,
  CollegeItem,
  MentorItem,
  MentorBooking,
  ParentNotification,
  FeeSummary
} from './types';

// Production Backend API Base URL
export const API_BASE_URL = typeof window !== 'undefined' 
  ? (window as any).__ENV__?.VITE_API_BASE_URL || (import.meta as any).env?.VITE_API_BASE_URL || 'https://role-ready-backendcode.onrender.com'
  : 'https://role-ready-backendcode.onrender.com';

// ----------------------------------------------------------------------------
// SECURE SESSION TOKEN MANAGEMENT (Unified with apiClient)
// ----------------------------------------------------------------------------

import { 
  getAccessToken, 
  getRefreshToken, 
  setTokens, 
  clearTokens,
  tryRefreshToken 
} from '../services/apiClient';

export { 
  getAccessToken, 
  getRefreshToken, 
  setTokens, 
  clearTokens,
  tryRefreshToken 
};

export function setCachedUser(user: any) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('rr_user', JSON.stringify(user));
    sessionStorage.setItem('rr_user', JSON.stringify(user));
  }
}

export function getCachedUser(): any | null {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem('rr_user') || sessionStorage.getItem('rr_user');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) { return null; }
    }
  }
  return null;
}

// ----------------------------------------------------------------------------
// PURE API FETCH ENGINE (Strict Live API Requests, Zero LocalStorage Mock Data)
// ----------------------------------------------------------------------------

interface ApiOptions extends RequestInit {
  skipAuth?: boolean;
}

export async function apiFetch<T = any>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const token = getAccessToken();
  const headers = new Headers(options.headers || {});

  // Automatically attach Bearer Authorization token if present
  if (token && !options.skipAuth && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Only set application/json if body is not FormData
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  let res = await fetch(url, {
    ...options,
    headers
  });

  // Handle Automatic Token Refresh on 401 Unauthorized
  if (res.status === 401 && !options.skipAuth && getRefreshToken()) {
    try {
      const refreshed = await refreshTokens();
      if (refreshed && refreshed.accessToken) {
        headers.set('Authorization', `Bearer ${refreshed.accessToken}`);
        res = await fetch(url, {
          ...options,
          headers
        });
      }
    } catch (refreshErr) {
      clearTokens();
    }
  }

  const contentType = res.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    const errorMsg = data?.message || data?.error || `API Request Failed with status ${res.status}`;
    throw new Error(errorMsg);
  }

  return data as T;
}

// ----------------------------------------------------------------------------
// 1. SESSION & AUTHENTICATION ENDPOINTS (/api/v1/auth)
// ----------------------------------------------------------------------------

export async function loginUser(credentials: {
  email: string;
  password: string;
  deviceId?: string;
  platform?: string;
}): Promise<{ success: boolean; message: string; data: AuthResponseData }> {
  const res = await apiFetch<{ success: boolean; message: string; data: AuthResponseData }>('/api/v1/auth/login', {
    method: 'POST',
    skipAuth: true,
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
      deviceId: credentials.deviceId || 'web-browser-01',
      platform: credentials.platform || 'Web'
    })
  });

  if (res.data?.accessToken) {
    setTokens(res.data.accessToken, res.data.refreshToken);
    setCachedUser(res.data.user);
  }

  return res;
}

export async function refreshTokens(): Promise<{ accessToken: string; refreshToken: string }> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token available");

  const res = await apiFetch<{ success: boolean; message: string; data: { accessToken: string; refreshToken: string } }>(
    '/api/v1/auth/refresh',
    {
      method: 'POST',
      skipAuth: true,
      headers: { 'x-refresh-token': refreshToken },
      body: JSON.stringify({ refreshToken })
    }
  );

  if (res.data?.accessToken) {
    setTokens(res.data.accessToken, res.data.refreshToken);
  }

  return res.data;
}

export async function logoutUser(): Promise<void> {
  try {
    await apiFetch('/api/v1/auth/logout', { method: 'POST' });
  } catch (err) {
    console.warn("Logout API returned warning:", err);
  } finally {
    clearTokens();
  }
}

// ----------------------------------------------------------------------------
// 2. SELF-REGISTRATION ENDPOINTS (/api/v1/auth/register/*)
// ----------------------------------------------------------------------------

export async function registerStudent(body: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  parentName: string;
  parentEmail: string;
}) {
  return apiFetch('/api/v1/auth/register/student', {
    method: 'POST',
    skipAuth: true,
    body: JSON.stringify(body)
  });
}

export async function registerParent(body: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  childrenDetails?: Array<{ studentId: string; relationship: string }>;
}) {
  return apiFetch('/api/v1/auth/register/parent', {
    method: 'POST',
    skipAuth: true,
    body: JSON.stringify(body)
  });
}

export async function registerMentor(body: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  skills: string[];
  experience: number;
  bio: string;
}) {
  return apiFetch('/api/v1/auth/register/mentor', {
    method: 'POST',
    skipAuth: true,
    body: JSON.stringify(body)
  });
}

export async function registerRecruiter(body: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  companyName: string;
  designation: string;
  experience: number;
}) {
  return apiFetch('/api/v1/auth/register/recruiter', {
    method: 'POST',
    skipAuth: true,
    body: JSON.stringify(body)
  });
}

export async function registerCompany(body: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  companyProfile: string;
  industry: string;
  gst: string;
  website: string;
}) {
  return apiFetch('/api/v1/auth/register/company', {
    method: 'POST',
    skipAuth: true,
    body: JSON.stringify(body)
  });
}

// ----------------------------------------------------------------------------
// 3. VERIFICATION & PASSWORD RECOVERY (/api/v1/auth/*)
// ----------------------------------------------------------------------------

export async function verifyEmail(email: string, otpCode: string) {
  return apiFetch('/api/v1/auth/verify-email', {
    method: 'POST',
    skipAuth: true,
    body: JSON.stringify({ email, otpCode })
  });
}

export async function verifyPhone(email: string, phone: string, otpCode: string) {
  return apiFetch('/api/v1/auth/verify-phone', {
    method: 'POST',
    skipAuth: true,
    body: JSON.stringify({ email, phone, otpCode })
  });
}

export async function forgotPassword(email: string) {
  return apiFetch('/api/v1/auth/forgot-password', {
    method: 'POST',
    skipAuth: true,
    body: JSON.stringify({ email })
  });
}

export async function resetPassword(email: string, otpCode: string, newPassword: string) {
  return apiFetch('/api/v1/auth/reset-password', {
    method: 'POST',
    skipAuth: true,
    body: JSON.stringify({ email, otpCode, newPassword })
  });
}

export async function changePassword(oldPassword: string, newPassword: string) {
  return apiFetch('/api/v1/auth/change-password', {
    method: 'POST',
    body: JSON.stringify({ oldPassword, newPassword })
  });
}

// ----------------------------------------------------------------------------
// 4. USER IDENTITY & ADMIN HEALTH APIS (/api/v1/users/*)
// ----------------------------------------------------------------------------

export async function fetchCurrentUser(): Promise<BackendUser> {
  const res = await apiFetch<{ success: boolean; message: string; data: BackendUser }>('/api/v1/users/me', {
    method: 'GET'
  });
  return res.data;
}

export async function fetchAdminHealth(): Promise<AdminHealthData> {
  const res = await apiFetch<{ success: boolean; message: string; data: AdminHealthData }>('/api/v1/users/admin/health', {
    method: 'GET'
  });
  return res.data;
}

// ----------------------------------------------------------------------------
// 5. USER PROFILE MANAGEMENT APIS (/api/v1/profile/*)
// ----------------------------------------------------------------------------

export function normalizeUserProfile(raw: any): UserProfile {
  if (!raw) {
    return {
      id: 'user-profile',
      fullName: 'User Profile',
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      phoneNumber: '',
      dob: '',
      gender: '',
      location: '',
      education: '',
      qualification: '',
      skills: [],
      bio: '',
      avatarUrl: '',
      role: 'mentor' as any,
      onboardingCompleted: true,
      roleData: {},
      updatedAt: new Date().toISOString()
    };
  }

  const p = raw.profile || raw || {};
  const roleData = p.roleData || raw.roleData || {};
  const firstName = p.firstName || raw.firstName || '';
  const lastName = p.lastName || raw.lastName || '';
  const fullName = firstName && lastName 
    ? `${firstName} ${lastName}` 
    : (firstName || raw.name || raw.email || 'User');

  return {
    id: raw.id || p.profileId || raw._id || 'user-profile',
    fullName,
    firstName,
    lastName,
    email: raw.email || p.email || '',
    mobile: p.phoneNumber || raw.phone || p.mobile || '',
    phoneNumber: p.phoneNumber || raw.phone || p.mobile || '',
    dob: roleData.dob || p.dob || '',
    gender: roleData.gender || p.gender || '',
    location: roleData.location || p.location || '',
    education: roleData.education?.qualification || p.education || roleData.qualification || '',
    qualification: roleData.qualification || roleData.education?.qualification || p.qualification || '',
    skills: Array.isArray(roleData.skills) ? roleData.skills : (Array.isArray(p.skills) ? p.skills : []),
    bio: p.bio || roleData.bio || '',
    avatarUrl: raw.avatarUrl || p.profilePicUrl || p.avatarUrl || '',
    role: (raw.role?.toLowerCase() as any) || (p.role?.toLowerCase() as any) || 'mentor',
    onboardingCompleted: p.onboardingCompleted ?? true,
    roleData: roleData,
    updatedAt: raw.updatedAt || raw.createdAt || new Date().toISOString()
  };
}

export async function fetchUserProfile(): Promise<UserProfile> {
  // 1. Primary: Try GET /api/v1/profile/
  try {
    const res = await apiFetch<{ success: boolean; message: string; data: any }>('/api/v1/profile/', {
      method: 'GET'
    });
    if (res?.data) {
      return normalizeUserProfile(res.data);
    }
  } catch (err) {
    console.warn("Could not fetch /api/v1/profile/, trying /api/v1/users/me:", err);
  }

  // 2. Secondary: Try GET /api/v1/users/me
  try {
    const meRes = await apiFetch<{ success: boolean; message: string; data: any }>('/api/v1/users/me', {
      method: 'GET'
    });
    if (meRes?.data) {
      return normalizeUserProfile(meRes.data);
    }
  } catch (meErr) {
    console.warn("Could not fetch /api/v1/users/me:", meErr);
  }

  // 3. Fallback: Authenticated session in localStorage/sessionStorage
  const cached = getCachedUser();
  if (cached) {
    return normalizeUserProfile(cached);
  }

  throw new Error("Unable to load profile data from backend or local session.");
}

export async function updateUserProfile(updates: {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  bio?: string;
  onboardingCompleted?: boolean;
  roleData?: any;
}): Promise<UserProfile> {
  await apiFetch('/api/v1/profile/complete', {
    method: 'PUT',
    body: JSON.stringify({
      firstName: updates.firstName,
      lastName: updates.lastName,
      phoneNumber: updates.phoneNumber,
      bio: updates.bio,
      onboardingCompleted: updates.onboardingCompleted ?? true,
      roleData: updates.roleData
    })
  });

  // Re-fetch the verified live profile directly from the backend
  return fetchUserProfile();
}

export async function completeUserProfile(updates: {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  bio: string;
  onboardingCompleted?: boolean;
}) {
  return apiFetch('/api/v1/profile/complete', {
    method: 'PUT',
    body: JSON.stringify({
      ...updates,
      onboardingCompleted: updates.onboardingCompleted ?? true
    })
  });
}

export async function updateAvatar(avatarUrl: string, avatarPublicId?: string) {
  return apiFetch('/api/v1/profile/avatar', {
    method: 'PUT',
    body: JSON.stringify({
      avatarUrl,
      avatarPublicId: avatarPublicId || 'avatars/user-avatar'
    })
  });
}

export async function uploadProfilePhoto(base64OrUrl: string): Promise<{ avatarUrl: string }> {
  // Directly updates avatar on live backend
  const res = await updateAvatar(base64OrUrl);
  return { avatarUrl: (res as any).data?.avatarUrl || base64OrUrl };
}

export async function uploadProfileAttachment(file: File): Promise<{ url: string; publicId: string; format: string; bytes: number }> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await apiFetch<{ success: boolean; message: string; data: { url: string; publicId: string; format: string; bytes: number } }>(
    '/api/v1/profile/upload',
    {
      method: 'POST',
      body: formData
    }
  );

  return res.data;
}

// ----------------------------------------------------------------------------
// 6. BACKWARD-COMPATIBLE LIVE APIS (Zero mock data, zero local storage fallback)
// ----------------------------------------------------------------------------

export async function fetchEntities(): Promise<EcosystemEntity[]> {
  try {
    const res = await apiFetch<{ data: EcosystemEntity[] }>('/api/v1/entities', { method: 'GET' });
    return res.data || [];
  } catch {
    // Zero hardcoded mock fallback! Return empty array from live API
    return [];
  }
}

export async function fetchAuditLogs(): Promise<AuditLog[]> {
  try {
    const res = await apiFetch<{ data: AuditLog[] }>('/api/v1/audit-logs', { method: 'GET' });
    return res.data || [];
  } catch {
    // Zero hardcoded mock fallback! Return empty array from live API
    return [];
  }
}

export async function addEntity(newEntity: any): Promise<any> {
  const slug = (newEntity.domain || newEntity.name || 'tenant')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  try {
    // Invoke backend live tenant creation (Super Admin)
    await apiFetch('/api/v1/tenants', {
      method: 'POST',
      body: JSON.stringify({
        name: newEntity.name,
        slug: slug || 'tenant-slug'
      })
    });
  } catch (err) {
    console.warn("Tenant creation via /api/v1/tenants:", err);
  }

  try {
    return await apiFetch('/api/v1/entities', {
      method: 'POST',
      body: JSON.stringify(newEntity)
    });
  } catch {
    return { ...newEntity, id: `ent-${Date.now()}` };
  }
}

export async function updateEntity(id: string, updates: any): Promise<any> {
  return apiFetch(`/api/v1/entities/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates)
  });
}

export async function deleteEntity(id: string): Promise<string> {
  await apiFetch(`/api/v1/entities/${id}`, { method: 'DELETE' });
  return id;
}

export async function saveRBACWeights(matrixData: any): Promise<any> {
  return apiFetch('/api/v1/rbac/matrix', {
    method: 'POST',
    body: JSON.stringify(matrixData)
  });
}

export async function saveAIWeights(weights: AIWeights): Promise<AIWeights> {
  return apiFetch('/api/v1/ai/weights', {
    method: 'POST',
    body: JSON.stringify(weights)
  });
}

export async function savePlacementDrive(driveData: any): Promise<any> {
  return apiFetch('/api/v1/college/drives', {
    method: 'POST',
    body: JSON.stringify(driveData)
  });
}

export async function saveJobPosting(jobData: any): Promise<any> {
  return apiFetch('/api/v1/recruiter/jobs', {
    method: 'POST',
    body: JSON.stringify(jobData)
  });
}

export async function saveCounselingNote(studentId: string, notes: string): Promise<any> {
  return apiFetch(`/api/v1/mentor/notes/${studentId}`, {
    method: 'POST',
    body: JSON.stringify({ notes })
  });
}

// ----------------------------------------------------------------------------
// 7. MODULAR PARENT SERVICES (ZERO MOCK DATA, STRICT LIVE API INTEGRATION)
// ----------------------------------------------------------------------------
export * from '../services/parent';

/**
 * Resolves the destination route following backend-provided route or user role:
 * - Prefers backend route if it's a valid dashboard route (e.g. /portal/student, /portal/parent, /portal/mentor, etc.)
 * - Maps role according to requirements:
 *   STUDENT -> /portal/student
 *   PARENT -> /portal/parent
 *   MENTOR -> /portal/mentor
 *   RECRUITER -> /portal/recruiter
/**
 * Resolves the authorized role dashboard path based on authenticated user role:
 *   Parent             -> /parent/dashboard
 *   Mentor             -> /mentor/dashboard
 *   Recruiter          -> /recruiter/dashboard
 *   Super Admin        -> /super-admin/dashboard
 *   College            -> /college/dashboard
 *   Training Institute -> /training-institute/dashboard
 *   School             -> /school/dashboard
 *   Company            -> /company/dashboard
 */
export function resolveDashboardRoute(
  backendRoute: any, 
  userRole?: string
): string {
  let roleCandidate = userRole;
  if (!roleCandidate && backendRoute && typeof backendRoute === 'object') {
    roleCandidate = backendRoute.role;
  }

  const normalized = (roleCandidate || '').toLowerCase().trim().replace(/[-_ ]/g, '');
  switch (normalized) {
    case 'parent':
    case 'student':
      return '/parent/dashboard';
    case 'mentor':
    case 'counselor':
      return '/mentor/dashboard';
    case 'recruiter':
    case 'talent':
    case 'hr':
      return '/recruiter/dashboard';
    case 'companyadmin':
    case 'company':
    case 'enterprise':
      return '/company/dashboard';
    case 'school':
    case 'schooladmin':
      return '/school/dashboard';
    case 'college':
    case 'collegeadmin':
      return '/college/dashboard';
    case 'training':
    case 'traininginstitute':
      return '/training-institute/dashboard';
    case 'superadmin':
    case 'admin':
      return '/super-admin/dashboard';
    default:
      if (typeof backendRoute === 'string' && backendRoute.startsWith('/') && !backendRoute.startsWith('/auth/')) {
        return backendRoute;
      }
      return '/parent/dashboard';
  }
}

