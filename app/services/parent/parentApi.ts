import { apiFetch, setTokens, setCachedUser, getCachedUser } from '../../lib/api';
import { ParentFamilyProfile, ChildAccount, FamilySubscription, UserProfile, BackendUser } from '../../lib/types';

export interface ParentRegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  childrenDetails?: Array<{
    studentId: string;
    relationship: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  }>;
}

export interface ParentRegisterResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
    role: string;
  };
}

export interface ParentLoginRequest {
  email: string;
  password: string;
  deviceId?: string;
  platform?: string;
}

export interface ParentLoginResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      email: string;
      role: string;
      firstName?: string;
      lastName?: string;
    };
    route?: {
      onboardingPending?: boolean;
      forcePasswordChange?: boolean;
    };
  };
}

/**
 * Register a new parent user
 * Endpoint: POST /api/v1/auth/register/parent
 */
export async function registerParent(payload: ParentRegisterRequest): Promise<ParentRegisterResponse> {
  return await apiFetch<ParentRegisterResponse>('/api/v1/auth/register/parent', {
    method: 'POST',
    skipAuth: true,
    body: JSON.stringify(payload)
  });
}

/**
 * Log in a parent user
 * Endpoint: POST /api/v1/auth/login
 */
export async function loginParent(credentials: ParentLoginRequest): Promise<ParentLoginResponse> {
  const res = await apiFetch<ParentLoginResponse>('/api/v1/auth/login', {
    method: 'POST',
    skipAuth: true,
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
      deviceId: credentials.deviceId || 'web-browser',
      platform: credentials.platform || 'web'
    })
  });

  if (res.data?.accessToken) {
    setTokens(res.data.accessToken, res.data.refreshToken);
    setCachedUser(res.data.user);
  }

  return res;
}

/**
 * Fetch the authenticated parent's full profile and associated family details
 * Endpoint: GET /api/v1/profile/
 * Strictly maps live backend profile fields & roleData
 */
export async function fetchParentProfile(): Promise<ParentFamilyProfile> {
  const res = await apiFetch<{ success: boolean; data: BackendUser }>('/api/v1/profile/');
  const user = res.data;
  const p = user?.profile;
  const roleData = p?.roleData || {};

  // Extract children from roleData.childrenDetails or roleData.children
  const rawChildren = Array.isArray(roleData.childrenDetails) 
    ? roleData.childrenDetails 
    : (Array.isArray(roleData.children) ? roleData.children : []);

  const children: ChildAccount[] = rawChildren.map((c: any, idx: number) => ({
    id: c.studentId || c.id || `child-${idx + 1}`,
    name: c.name || (c.firstName ? `${c.firstName} ${c.lastName || ''}`.trim() : `Student ${idx + 1}`),
    grade: c.grade || c.gradeLevel || 'Secondary Cohort',
    school: c.school || c.schoolName || 'Role Ready Partner School',
    targetCareer: c.targetCareer || c.careerGoal || 'Technology & Engineering',
    dob: c.dob || c.birthDate || '',
    studentEmail: c.studentEmail || c.email || '',
    tempPassword: c.tempPassword || undefined,
    avatarUrl: c.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${c.firstName || 'Student'}`,
    hasAccess: c.hasAccess !== undefined ? !!c.hasAccess : true,
    subscriptionPlan: c.subscriptionPlan || roleData.subscription?.planName || 'Active Student License',
    academicGpa: typeof c.academicGpa === 'number' ? c.academicGpa : (c.gpa || 0),
    studyHoursWeekly: typeof c.studyHoursWeekly === 'number' ? c.studyHoursWeekly : 0,
    attendanceRate: typeof c.attendanceRate === 'number' ? c.attendanceRate : 0,
    riasecCode: c.riasecCode || 'Pending Assessment',
    topAiCareerMatch: c.topAiCareerMatch || 'Pending Assessment',
    matchScore: typeof c.matchScore === 'number' ? c.matchScore : 0,
    status: c.status || 'active'
  }));

  // Map family subscription strictly from roleData.subscription
  const sub = roleData.subscription || {};
  const subscription: FamilySubscription = {
    active: !!sub.active,
    planId: sub.planId || 'starter',
    planName: sub.planName || 'Role Ready Family Plan',
    priceMonthly: typeof sub.priceMonthly === 'number' ? sub.priceMonthly : 999,
    maxChildren: typeof sub.maxChildren === 'number' ? sub.maxChildren : 1,
    usedSeats: children.length,
    renewalDate: sub.renewalDate || '',
    lastPaymentStatus: sub.lastPaymentStatus || 'none'
  };

  const parentName = p?.firstName 
    ? `${p.firstName} ${p.lastName || ''}`.trim() 
    : (user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : (user?.email?.split('@')[0] || 'Parent'));

  return {
    id: user?.id || p?.profileId || '',
    parentName,
    parentEmail: user?.email || '',
    phone: p?.phoneNumber || user?.phone || '',
    emergencyContact: roleData.emergencyContact || p?.phoneNumber || user?.phone || '',
    onboardingCompleted: !!p?.onboardingCompleted,
    children,
    subscription
  };
}

/**
 * Update basic parent profile fields
 * Endpoint: PUT /api/v1/profile/
 */
export async function updateParentProfile(profileData: {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  bio?: string;
  avatarUrl?: string;
}): Promise<any> {
  return await apiFetch('/api/v1/profile/', {
    method: 'PUT',
    body: JSON.stringify(profileData)
  });
}

/**
 * Complete parent onboarding wizard and save family roster and subscription
 * Endpoint: PUT /api/v1/profile/complete
 */
export async function completeParentOnboarding(payload: {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  bio?: string;
  onboardingCompleted: boolean;
  roleData: {
    emergencyContact?: string;
    childrenDetails: Array<{
      studentId: string;
      relationship: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      grade?: string;
      school?: string;
      hasAccess?: boolean;
    }>;
    subscription?: FamilySubscription;
  };
}): Promise<any> {
  return await apiFetch('/api/v1/profile/complete', {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
}

export const fetchParentFamilyProfile = fetchParentProfile;

export async function saveParentFamilyProfile(familyData: Partial<ParentFamilyProfile>): Promise<ParentFamilyProfile> {
  const [firstName, ...rest] = (familyData.parentName || 'Parent').split(' ');
  const lastName = rest.join(' ') || 'User';

  await completeParentOnboarding({
    firstName,
    lastName,
    phoneNumber: familyData.phone || '',
    bio: `Parent of ${familyData.children?.length || 0} enrolled students on Role Ready`,
    onboardingCompleted: familyData.onboardingCompleted ?? true,
    roleData: {
      emergencyContact: familyData.emergencyContact,
      childrenDetails: (familyData.children || []).map(c => ({
        studentId: c.id,
        relationship: 'Child',
        firstName: c.name.split(' ')[0],
        lastName: c.name.split(' ').slice(1).join(' '),
        email: c.studentEmail,
        grade: c.grade,
        school: c.school,
        hasAccess: c.hasAccess
      })),
      subscription: familyData.subscription
    }
  });

  return fetchParentProfile();
}

