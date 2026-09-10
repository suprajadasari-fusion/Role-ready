import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '../config/api';

export const studentService = {
  /**
   * Get Student Profile
   * GET /api/v1/profile/
   */
  async getStudentProfile() {
    const res = await apiClient<{ success: boolean; data: any }>(API_ENDPOINTS.PROFILE.GET);
    return res.data;
  },

  /**
   * Psychometric RIASEC Analytics
   * GET /api/v1/psychometric/analytics/{studentProfileId}
   */
  async getPsychometricAnalytics(studentProfileId: string) {
    try {
      const res = await apiClient<any>(`/api/v1/psychometric/analytics/${studentProfileId}`);
      return res.data || res;
    } catch {
      return null;
    }
  },

  /**
   * Interest Assessment Analytics
   * GET /api/v1/interest-assessments/analytics/{studentProfileId}
   */
  async getInterestAnalytics(studentProfileId: string) {
    try {
      const res = await apiClient<any>(`/api/v1/interest-assessments/analytics/${studentProfileId}`);
      return res.data || res;
    } catch {
      return null;
    }
  },

  /**
   * Aptitude Analytics Summary
   * GET /api/v1/aptitude/analytics/summary
   */
  async getAptitudeSummary() {
    try {
      const res = await apiClient<any>('/api/v1/aptitude/analytics/summary');
      return res.data || res;
    } catch {
      return null;
    }
  },

  /**
   * Skill Mapping Analytics
   * GET /api/v1/skill-mapping/profile/analytics
   */
  async getSkillAnalytics() {
    try {
      const res = await apiClient<any>('/api/v1/skill-mapping/profile/analytics');
      return res.data || res;
    } catch {
      return null;
    }
  },

  /**
   * Career Roadmap for Student Profile
   * GET /api/v1/roadmaps/profile/{studentProfileId}
   */
  async getCareerRoadmap(studentProfileId: string) {
    try {
      const res = await apiClient<any>(`/api/v1/roadmaps/profile/${studentProfileId}`);
      return res.data || res;
    } catch {
      return null;
    }
  },

  /**
   * Adapt Roadmap Tasks
   * POST /api/v1/roadmaps/adapt
   */
  async adaptRoadmap(data: any) {
    try {
      const res = await apiClient<any>('/api/v1/roadmaps/adapt', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return res.data || res;
    } catch {
      return null;
    }
  },

  /**
   * Learning Courses & Curriculum
   * GET /api/v1/learning/courses
   */
  async getLearningCourses() {
    try {
      const res = await apiClient<{ success: boolean; data: any[] }>('/api/v1/learning/courses');
      return Array.isArray(res.data) ? res.data : [];
    } catch {
      return [];
    }
  },

  /**
   * Scholarship Recommendations
   * GET /api/v1/university/scholarships/recommendations/{studentProfileId}
   */
  async getScholarships(studentProfileId: string) {
    try {
      const res = await apiClient<{ success: boolean; data: any[] }>(
        `/api/v1/university/scholarships/recommendations/${studentProfileId}`
      );
      return Array.isArray(res.data) ? res.data : [];
    } catch {
      return [];
    }
  },

  /**
   * College and University Recommendations
   * POST /api/v1/university/recommendations
   */
  async getUniversityRecommendations(params: { studentId: string; correlationId?: string }) {
    try {
      const res = await apiClient<{ success: boolean; data: any[] }>('/api/v1/university/recommendations', {
        method: 'POST',
        body: JSON.stringify({
          studentId: params.studentId,
          correlationId: params.correlationId || `req-${Date.now()}`
        })
      });
      return Array.isArray(res.data) ? res.data : [];
    } catch {
      return [];
    }
  }
};
