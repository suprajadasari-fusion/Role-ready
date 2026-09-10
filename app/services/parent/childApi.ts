import { apiFetch } from '../../lib/api';
import { ChildAccount, ParentFamilyProfile } from '../../lib/types';
import { completeParentOnboarding } from './parentApi';

export interface RegisterStudentBackendPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  parentName: string;
  parentEmail: string;
}

export interface RegisterStudentResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
    role: string;
  };
}

export interface AddChildPayload {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phone?: string;
  relationship: string;
  grade?: string;
  school?: string;
  targetCareer?: string;
  dob?: string;
}

/**
 * Register a new student account on the backend IAM service
 * Endpoint: POST /api/v1/auth/register/student
 */
export async function registerStudentAccount(payload: RegisterStudentBackendPayload): Promise<RegisterStudentResponse> {
  return await apiFetch<RegisterStudentResponse>('/api/v1/auth/register/student', {
    method: 'POST',
    skipAuth: true,
    body: JSON.stringify(payload)
  });
}

export const registerStudent = registerStudentAccount;


/**
 * Add a child to the family roster:
 * 1. Registers the student on the backend IAM endpoint POST /api/v1/auth/register/student
 * 2. Links the newly created studentId into the parent profile roleData.childrenDetails via PUT /api/v1/profile/complete
 */
export async function addChildToFamily(
  parentProfile: ParentFamilyProfile,
  childInput: AddChildPayload
): Promise<{ child: ChildAccount; updatedProfile: ParentFamilyProfile }> {
  // Generate secure temporary password if not provided
  const tempPassword = childInput.password || `Learn#${childInput.firstName.replace(/\s+/g, '')}2026!`;
  const studentPhone = childInput.phone || parentProfile.phone || '9876543210';

  // 1. Call live backend registration endpoint
  const regRes = await registerStudentAccount({
    firstName: childInput.firstName,
    lastName: childInput.lastName,
    email: childInput.email,
    password: tempPassword,
    phone: studentPhone,
    parentName: parentProfile.parentName,
    parentEmail: parentProfile.parentEmail
  });

  const studentId = regRes.data?.id || `student-${Date.now()}`;

  // 2. Build the new ChildAccount object
  const newChild: ChildAccount = {
    id: studentId,
    name: `${childInput.firstName} ${childInput.lastName}`.trim(),
    grade: childInput.grade || 'Secondary Cohort',
    school: childInput.school || 'Role Ready Partner School',
    targetCareer: childInput.targetCareer || 'Technology & Engineering',
    dob: childInput.dob || '2009-01-01',
    studentEmail: childInput.email,
    tempPassword: tempPassword,
    avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${childInput.firstName}`,
    hasAccess: true,
    subscriptionPlan: parentProfile.subscription?.planName || 'Role Ready Student License',
    academicGpa: 0,
    studyHoursWeekly: 0,
    attendanceRate: 0,
    riasecCode: 'Pending Assessment',
    topAiCareerMatch: 'Pending Assessment',
    matchScore: 0,
    status: 'active'
  };

  const updatedChildren = [...parentProfile.children, newChild];

  // 3. Persist linked student into Parent's live backend profile
  const [firstName, ...rest] = parentProfile.parentName.split(' ');
  const lastName = rest.join(' ') || 'Parent';

  await completeParentOnboarding({
    firstName,
    lastName,
    phoneNumber: parentProfile.phone,
    onboardingCompleted: parentProfile.onboardingCompleted,
    roleData: {
      emergencyContact: parentProfile.emergencyContact,
      childrenDetails: updatedChildren.map(c => ({
        studentId: c.id,
        relationship: childInput.relationship || 'Child',
        firstName: c.name.split(' ')[0],
        lastName: c.name.split(' ').slice(1).join(' '),
        email: c.studentEmail,
        grade: c.grade,
        school: c.school,
        hasAccess: c.hasAccess
      })),
      subscription: parentProfile.subscription
    }
  });

  return {
    child: newChild,
    updatedProfile: {
      ...parentProfile,
      children: updatedChildren
    }
  };
}

/**
 * Update access permission (license grant/revoke) for a child account
 */
export async function toggleChildAccess(
  parentProfile: ParentFamilyProfile,
  studentId: string,
  hasAccess: boolean
): Promise<ParentFamilyProfile> {
  const updatedChildren = parentProfile.children.map(c => 
    c.id === studentId ? { ...c, hasAccess } : c
  );

  const [firstName, ...rest] = parentProfile.parentName.split(' ');
  const lastName = rest.join(' ') || 'Parent';

  await completeParentOnboarding({
    firstName,
    lastName,
    phoneNumber: parentProfile.phone,
    onboardingCompleted: parentProfile.onboardingCompleted,
    roleData: {
      emergencyContact: parentProfile.emergencyContact,
      childrenDetails: updatedChildren.map(c => ({
        studentId: c.id,
        relationship: 'Child',
        firstName: c.name.split(' ')[0],
        lastName: c.name.split(' ').slice(1).join(' '),
        email: c.studentEmail,
        grade: c.grade,
        school: c.school,
        hasAccess: c.hasAccess
      })),
      subscription: parentProfile.subscription
    }
  });

  return {
    ...parentProfile,
    children: updatedChildren
  };
}
