import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '../config/api';

export interface CollegeProgram {
  code: string;
  title: string;
  degree: string;
  seats: number;
  enrolled: number;
  avgCtc: string;
}

export interface CollegeDrive {
  company: string;
  role: string;
  ctc: string;
  applicants: string;
  status: string;
}

export interface CollegePartner {
  company: string;
  track: string;
  mou: string;
  status: string;
}

export interface CollegeApplication {
  id: string;
  name: string;
  program: string;
  score: string;
  status: string;
  docs: string;
}

export const collegeService = {
  /**
   * Register a new College / University Institution
   * POST /api/v1/institutions/register
   */
  async registerCollege(data: {
    name: string;
    slug: string;
    type?: 'degree_college' | 'junior_college';
    address: { street: string; city: string; state: string; postalCode: string };
    contact: { name: string; email: string; phone: string; role: string };
    documentUrl: string;
  }) {
    return await apiClient(API_ENDPOINTS.ADMIN.INSTITUTIONS_REGISTER, {
      method: 'POST',
      body: JSON.stringify({ ...data, type: data.type || 'degree_college' })
    });
  },

  /**
   * Fetch live college data and programs
   * GET /api/v1/profile/
   */
  async getCollegeData(): Promise<{
    programs: CollegeProgram[];
    drives: CollegeDrive[];
    partners: CollegePartner[];
    applications: CollegeApplication[];
  }> {
    try {
      const res = await apiClient<{ success: boolean; data: any }>(API_ENDPOINTS.PROFILE.GET);
      const roleData = res.data?.profile?.roleData || {};

      const programs: CollegeProgram[] = Array.isArray(roleData.programs) ? roleData.programs : [];
      const drives: CollegeDrive[] = Array.isArray(roleData.drives) ? roleData.drives : [];
      const partners: CollegePartner[] = Array.isArray(roleData.partners) ? roleData.partners : [];
      const applications: CollegeApplication[] = Array.isArray(roleData.applications) ? roleData.applications : [];

      return { programs, drives, partners, applications };
    } catch {
      return { programs: [], drives: [], partners: [], applications: [] };
    }
  },

  /**
   * Update college programs, placement drives, partners, or applications in backend profile roleData
   * PUT /api/v1/profile/complete
   */
  async updateCollegeData(updates: {
    programs?: CollegeProgram[];
    drives?: CollegeDrive[];
    partners?: CollegePartner[];
    applications?: CollegeApplication[];
  }) {
    const current = await apiClient<{ success: boolean; data: any }>(API_ENDPOINTS.PROFILE.GET).catch(() => null);
    const existingRoleData = current?.data?.profile?.roleData || {};
    const existingP = current?.data?.profile || {};

    const updatedRoleData = {
      ...existingRoleData,
      ...(updates.programs ? { programs: updates.programs } : {}),
      ...(updates.drives ? { drives: updates.drives } : {}),
      ...(updates.partners ? { partners: updates.partners } : {}),
      ...(updates.applications ? { applications: updates.applications } : {})
    };

    return await apiClient(API_ENDPOINTS.PROFILE.COMPLETE, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: existingP.firstName || 'College',
        lastName: existingP.lastName || 'Dean',
        phoneNumber: existingP.phoneNumber || '9876543210',
        bio: existingP.bio || 'College Admissions & Placement Cell',
        onboardingCompleted: true,
        roleData: updatedRoleData
      })
    });
  },

  /**
   * Schedule a placement drive on the backend
   * POST /api/v1/college/drives
   */
  async savePlacementDrive(driveData: any) {
    try {
      await apiClient('/api/v1/college/drives', {
        method: 'POST',
        body: JSON.stringify(driveData)
      });
    } catch (err) {
      console.warn("Drive API sync:", err);
    }
  }
};
