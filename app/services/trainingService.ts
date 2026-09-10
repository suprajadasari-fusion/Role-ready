import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '../config/api';

export interface TrainingCourse {
  title: string;
  duration: string;
  enrolled: string;
  status: string;
}

export interface TrainingCert {
  name: string;
  body: string;
  validity: string;
  activeCandidates: string;
}

export const trainingService = {
  /**
   * Fetch live training institute courses, bootcamps, and certifications
   * Uses live GET /api/v1/learning/courses + backend profile roleData
   */
  async getTrainingData(): Promise<{
    courses: TrainingCourse[];
    certifications: TrainingCert[];
  }> {
    try {
      // 1. Fetch live courses from API
      let liveCourses: TrainingCourse[] = [];
      try {
        const cRes = await apiClient<{ success: boolean; data: any[] }>('/api/v1/learning/courses');
        if (cRes?.data && Array.isArray(cRes.data) && cRes.data.length > 0) {
          liveCourses = cRes.data.map((c: any) => ({
            title: c.title || c.name || "Curriculum Course",
            duration: c.duration || "12 Weeks",
            enrolled: `${c.completedLessons || 50} Trainees Enrolled`,
            status: "Active Cohort"
          }));
        }
      } catch {
        // Fall through to profile
      }

      // 2. Fetch institute profile roleData
      const res = await apiClient<{ success: boolean; data: any }>(API_ENDPOINTS.PROFILE.GET);
      const roleData = res.data?.profile?.roleData || {};

      const savedBootcamps: TrainingCourse[] = Array.isArray(roleData.bootcamps) ? roleData.bootcamps : [];
      const certifications: TrainingCert[] = Array.isArray(roleData.certifications) ? roleData.certifications : [];

      const combinedCourses = liveCourses.length > 0 ? liveCourses : savedBootcamps;

      return { courses: combinedCourses, certifications };
    } catch {
      return { courses: [], certifications: [] };
    }
  },

  /**
   * Add a new bootcamp track and persist in backend profile roleData
   * PUT /api/v1/profile/complete
   */
  async addBootcampTrack(newCourse: TrainingCourse) {
    const current = await apiClient<{ success: boolean; data: any }>(API_ENDPOINTS.PROFILE.GET).catch(() => null);
    const existingRoleData = current?.data?.profile?.roleData || {};
    const existingP = current?.data?.profile || {};

    const currentBootcamps: TrainingCourse[] = Array.isArray(existingRoleData.bootcamps) ? existingRoleData.bootcamps : [];
    const updatedBootcamps = [newCourse, ...currentBootcamps];

    return await apiClient(API_ENDPOINTS.PROFILE.COMPLETE, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: existingP.firstName || 'Training',
        lastName: existingP.lastName || 'Institute',
        phoneNumber: existingP.phoneNumber || '9876543210',
        bio: existingP.bio || 'Skill Academy & Professional Training Institute',
        onboardingCompleted: true,
        roleData: { ...existingRoleData, bootcamps: updatedBootcamps }
      })
    });
  }
};
