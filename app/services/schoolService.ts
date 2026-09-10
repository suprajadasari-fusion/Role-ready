import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '../config/api';

export interface SchoolProfile {
  name: string;
  affiliation: string;
  principal: string;
  email: string;
  year: string;
}

export interface SchoolStudent {
  id: string;
  name: string;
  grade: string;
  rollNo: string;
  attendance: string;
  gpa: string;
  careerDna: string;
  readinessScore: number;
  status: string;
  parentEmail?: string;
}

export interface SchoolTeacher {
  id: string;
  name: string;
  qualification: string;
  dept: string;
  subject: string;
  classes: string;
  studentsCount: string;
  experience: string;
  email: string;
  rating: string;
  projects?: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  speaker: string;
  type: string;
  status: string;
}

export const schoolService = {
  /**
   * Register a new School Institution
   * POST /api/v1/institutions/register
   */
  async registerSchool(data: {
    name: string;
    slug: string;
    address: { street: string; city: string; state: string; postalCode: string };
    contact: { name: string; email: string; phone: string; role: string };
    documentUrl: string;
  }) {
    return await apiClient(API_ENDPOINTS.ADMIN.INSTITUTIONS_REGISTER, {
      method: 'POST',
      body: JSON.stringify({ ...data, type: 'school' })
    });
  },

  /**
   * Fetch live school profile and role data
   * GET /api/v1/profile/
   */
  async getSchoolProfile(): Promise<{
    profile: SchoolProfile;
    students: SchoolStudent[];
    teachers: SchoolTeacher[];
    events: SchoolEvent[];
  }> {
    try {
      const res = await apiClient<{ success: boolean; data: any }>(API_ENDPOINTS.PROFILE.GET);
      const roleData = res.data?.profile?.roleData || {};

      const profile: SchoolProfile = roleData.schoolProfile || {
        name: res.data?.profile?.firstName ? `${res.data.profile.firstName} School` : "Role Ready Partner School",
        affiliation: "CBSE / State Board Verified",
        principal: res.data?.profile?.firstName ? `${res.data.profile.firstName} ${res.data.profile.lastName || ''}`.trim() : "School Principal",
        email: res.data?.email || "principal@school.edu",
        year: "2026-2027"
      };

      const students: SchoolStudent[] = Array.isArray(roleData.students) ? roleData.students : [];
      const teachers: SchoolTeacher[] = Array.isArray(roleData.teachers) ? roleData.teachers : [];
      const events: SchoolEvent[] = Array.isArray(roleData.events) ? roleData.events : [];

      return { profile, students, teachers, events };
    } catch {
      return {
        profile: {
          name: "Role Ready Partner School",
          affiliation: "Board Affiliation Verified",
          principal: "Principal",
          email: "principal@school.edu",
          year: "2026-2027"
        },
        students: [],
        teachers: [],
        events: []
      };
    }
  },

  /**
   * Update school profile and data in backend profile roleData
   * PUT /api/v1/profile/complete
   */
  async updateSchoolData(updates: {
    schoolProfile?: SchoolProfile;
    students?: SchoolStudent[];
    teachers?: SchoolTeacher[];
    events?: SchoolEvent[];
  }) {
    // Read current profile to preserve attributes
    const current = await apiClient<{ success: boolean; data: any }>(API_ENDPOINTS.PROFILE.GET).catch(() => null);
    const existingRoleData = current?.data?.profile?.roleData || {};
    const existingP = current?.data?.profile || {};

    const updatedRoleData = {
      ...existingRoleData,
      ...(updates.schoolProfile ? { schoolProfile: updates.schoolProfile } : {}),
      ...(updates.students ? { students: updates.students } : {}),
      ...(updates.teachers ? { teachers: updates.teachers } : {}),
      ...(updates.events ? { events: updates.events } : {})
    };

    return await apiClient(API_ENDPOINTS.PROFILE.COMPLETE, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: existingP.firstName || updates.schoolProfile?.name || 'School',
        lastName: existingP.lastName || 'Admin',
        phoneNumber: existingP.phoneNumber || '9876543210',
        bio: existingP.bio || 'School Administrator',
        onboardingCompleted: true,
        roleData: updatedRoleData
      })
    });
  },

  /**
   * Fetch Live Cohort Aptitude Analytics from backend
   * GET /api/v1/aptitude/admin/analytics/cohort
   */
  async getCohortAptitudeAnalytics() {
    try {
      const res = await apiClient<any>(API_ENDPOINTS.ADMIN.APTITUDE_COHORT);
      return res.data || res;
    } catch {
      return null;
    }
  },

  /**
   * Fetch Live Cohort Skill Analytics from backend
   * GET /api/v1/skill-mapping/analytics/cohort
   */
  async getCohortSkillAnalytics() {
    try {
      const res = await apiClient<any>(API_ENDPOINTS.ADMIN.SKILL_COHORT);
      return res.data || res;
    } catch {
      return null;
    }
  }
};
