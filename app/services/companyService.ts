import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '../config/api';

export interface CompanyInternship {
  cohort: string;
  duration: string;
  stipend: string;
  interns: string;
  ppo: string;
}

export interface CompanyPartnership {
  college: string;
  type: string;
  mouYear: string;
  studentsHired: string;
  status: string;
}

export const companyService = {
  /**
   * Fetch live company internships and campus partnerships
   * GET /api/v1/profile/
   */
  async getCompanyData(): Promise<{
    internships: CompanyInternship[];
    partnerships: CompanyPartnership[];
  }> {
    try {
      const res = await apiClient<{ success: boolean; data: any }>(API_ENDPOINTS.PROFILE.GET);
      const roleData = res.data?.profile?.roleData || {};

      const internships: CompanyInternship[] = Array.isArray(roleData.internships) ? roleData.internships : [];
      const partnerships: CompanyPartnership[] = Array.isArray(roleData.partnerships) ? roleData.partnerships : [];

      return { internships, partnerships };
    } catch {
      return { internships: [], partnerships: [] };
    }
  },

  /**
   * Launch a new internship cohort and persist in backend profile roleData
   * PUT /api/v1/profile/complete
   */
  async launchInternshipCohort(newCohort: CompanyInternship) {
    const current = await apiClient<{ success: boolean; data: any }>(API_ENDPOINTS.PROFILE.GET).catch(() => null);
    const existingRoleData = current?.data?.profile?.roleData || {};
    const existingP = current?.data?.profile || {};

    const currentInternships: CompanyInternship[] = Array.isArray(existingRoleData.internships) ? existingRoleData.internships : [];
    const updatedInternships = [newCohort, ...currentInternships];

    return await apiClient(API_ENDPOINTS.PROFILE.COMPLETE, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: existingP.firstName || 'Enterprise',
        lastName: existingP.lastName || 'Partner',
        phoneNumber: existingP.phoneNumber || '9876543210',
        bio: existingP.bio || 'Enterprise Corporate Partner',
        onboardingCompleted: true,
        roleData: { ...existingRoleData, internships: updatedInternships }
      })
    });
  }
};
