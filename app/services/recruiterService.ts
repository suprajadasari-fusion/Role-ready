import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '../config/api';

export interface RecruiterJob {
  id: string;
  title: string;
  ctc: string;
  location: string;
  applicants: number;
  status: string;
}

export interface RecruiterCampusDrive {
  university: string;
  driveDate: string;
  roles: string;
  students: string;
  status: string;
}

export interface RecruiterInterview {
  id: string;
  candidate: string;
  role: string;
  round: string;
  time: string;
  panel: string;
  status: string;
}

export interface RecruiterOffer {
  id: string;
  candidate: string;
  role: string;
  ctc: string;
  status: string;
}

export const recruiterService = {
  /**
   * Fetch live recruiter jobs, campus drives, interviews, and offers
   * GET /api/v1/profile/
   */
  async getRecruiterData(): Promise<{
    jobs: RecruiterJob[];
    campusDrives: RecruiterCampusDrive[];
    interviews: RecruiterInterview[];
    offers: RecruiterOffer[];
  }> {
    try {
      const res = await apiClient<{ success: boolean; data: any }>(API_ENDPOINTS.PROFILE.GET);
      const roleData = res.data?.profile?.roleData || {};

      const jobs: RecruiterJob[] = Array.isArray(roleData.jobs) ? roleData.jobs : [];
      const campusDrives: RecruiterCampusDrive[] = Array.isArray(roleData.campusDrives) ? roleData.campusDrives : [];
      const interviews: RecruiterInterview[] = Array.isArray(roleData.interviews) ? roleData.interviews : [];
      const offers: RecruiterOffer[] = Array.isArray(roleData.offers) ? roleData.offers : [];

      return { jobs, campusDrives, interviews, offers };
    } catch {
      return { jobs: [], campusDrives: [], interviews: [], offers: [] };
    }
  },

  /**
   * Update recruiter jobs, campus drives, interviews, or offers in backend profile roleData
   * PUT /api/v1/profile/complete
   */
  async updateRecruiterData(updates: {
    jobs?: RecruiterJob[];
    campusDrives?: RecruiterCampusDrive[];
    interviews?: RecruiterInterview[];
    offers?: RecruiterOffer[];
  }) {
    const current = await apiClient<{ success: boolean; data: any }>(API_ENDPOINTS.PROFILE.GET).catch(() => null);
    const existingRoleData = current?.data?.profile?.roleData || {};
    const existingP = current?.data?.profile || {};

    const updatedRoleData = {
      ...existingRoleData,
      ...(updates.jobs ? { jobs: updates.jobs } : {}),
      ...(updates.campusDrives ? { campusDrives: updates.campusDrives } : {}),
      ...(updates.interviews ? { interviews: updates.interviews } : {}),
      ...(updates.offers ? { offers: updates.offers } : {})
    };

    return await apiClient(API_ENDPOINTS.PROFILE.COMPLETE, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: existingP.firstName || 'Talent',
        lastName: existingP.lastName || 'Recruiter',
        phoneNumber: existingP.phoneNumber || '9876543210',
        bio: existingP.bio || 'Corporate Talent Acquisition Lead',
        onboardingCompleted: true,
        roleData: updatedRoleData
      })
    });
  },

  /**
   * Post a new Job Requisition to backend
   * POST /api/v1/recruiter/jobs
   */
  async saveJobPosting(jobData: any) {
    try {
      await apiClient('/api/v1/recruiter/jobs', {
        method: 'POST',
        body: JSON.stringify(jobData)
      });
    } catch (err) {
      console.warn("Job posting API sync:", err);
    }
  }
};
