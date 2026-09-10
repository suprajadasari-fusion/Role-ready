import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '../config/api';

export interface MentorSkillItem {
  name: string;
  level: string;
  mentees: string;
}

export interface MentorSlotItem {
  id: number | string;
  day: string;
  time: string;
  mentee: string;
  topic: string;
  status: string;
  bg?: string;
  border?: string;
}

export interface MentorWalletData {
  balance: number;
  hourlyRate: number;
  payouts: Array<{ id: string; date: string; amount: string; status: string }>;
}

export const mentorService = {
  /**
   * Fetch live mentor profile, skills, availability slots, and wallet
   * GET /api/v1/profile/
   */
  async getMentorData(): Promise<{
    skills: MentorSkillItem[];
    slots: MentorSlotItem[];
    wallet: MentorWalletData;
  }> {
    try {
      const res = await apiClient<{ success: boolean; data: any }>(API_ENDPOINTS.PROFILE.GET);
      const roleData = res.data?.profile?.roleData || {};

      // Skills: map from roleData.skills or roleData.mentorSkills
      const rawSkills = Array.isArray(roleData.skills) 
        ? roleData.skills.map((s: any) => typeof s === 'string' ? { name: s, level: 'Expert', mentees: 'Active Mentorship' } : s)
        : (Array.isArray(roleData.mentorSkills) ? roleData.mentorSkills : []);

      const slots: MentorSlotItem[] = Array.isArray(roleData.slots) ? roleData.slots : [];
      const wallet: MentorWalletData = roleData.wallet || {
        balance: 48500,
        hourlyRate: 1500,
        payouts: []
      };

      return { skills: rawSkills, slots, wallet };
    } catch {
      return {
        skills: [],
        slots: [],
        wallet: { balance: 0, hourlyRate: 1000, payouts: [] }
      };
    }
  },

  /**
   * Update mentor skills, slots, or wallet in backend profile roleData
   * PUT /api/v1/profile/complete
   */
  async updateMentorData(updates: {
    skills?: MentorSkillItem[];
    slots?: MentorSlotItem[];
    wallet?: MentorWalletData;
  }) {
    const current = await apiClient<{ success: boolean; data: any }>(API_ENDPOINTS.PROFILE.GET).catch(() => null);
    const existingRoleData = current?.data?.profile?.roleData || {};
    const existingP = current?.data?.profile || {};

    const updatedRoleData = {
      ...existingRoleData,
      ...(updates.skills ? { 
        skills: updates.skills.map(s => s.name),
        mentorSkills: updates.skills 
      } : {}),
      ...(updates.slots ? { slots: updates.slots } : {}),
      ...(updates.wallet ? { wallet: updates.wallet } : {})
    };

    return await apiClient(API_ENDPOINTS.PROFILE.COMPLETE, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: existingP.firstName || 'Mentor',
        lastName: existingP.lastName || 'Advisor',
        phoneNumber: existingP.phoneNumber || '9876543210',
        bio: existingP.bio || 'Certified Career & Academic Mentor',
        onboardingCompleted: true,
        roleData: updatedRoleData
      })
    });
  },

  /**
   * Fetch bookings and student requests
   * GET /api/v1/mentor/bookings
   */
  async getMentorBookings() {
    try {
      const res = await apiClient<{ success: boolean; data: any[] }>('/api/v1/mentor/bookings');
      return Array.isArray(res.data) ? res.data : [];
    } catch {
      return [];
    }
  },

  /**
   * Save a counseling/guidance note for a student
   * POST /api/v1/mentor/notes/{studentId}
   */
  async saveCounselingNote(studentId: string, notes: string) {
    try {
      await apiClient(`/api/v1/mentor/notes/${studentId}`, {
        method: 'POST',
        body: JSON.stringify({ notes })
      });
    } catch (err) {
      console.warn("Counseling note API sync:", err);
    }
  }
};
