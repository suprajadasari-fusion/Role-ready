import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '../config/api';

export interface TrainingCourse {
  id?: string;
  title: string;
  duration: string;
  enrolled: string;
  status: string;
  category?: string;
  modulesCount?: number;
}

export interface TrainingBatch {
  id: string;
  name: string;
  course: string;
  trainer: string;
  timing: string;
  startDate: string;
  enrolled: number;
  capacity: number;
  status: 'Active' | 'Upcoming' | 'Completed';
}

export interface TrainingLearner {
  id: string;
  name: string;
  email: string;
  course: string;
  batch: string;
  attendance: number;
  score: number;
  certStatus: 'Issued' | 'Pending' | 'In Progress';
}

export interface TrainingTrainer {
  id: string;
  name: string;
  email: string;
  specialization: string;
  batches: string;
  rating: number;
  status: string;
}

export interface TrainingEnrollment {
  id: string;
  learnerName: string;
  email: string;
  course: string;
  batch: string;
  date: string;
  paymentStatus: 'Paid' | 'Partial' | 'Pending';
  status: 'Approved' | 'Pending Review' | 'Waitlisted';
}

export interface TrainingCert {
  id: string;
  name: string;
  recipient: string;
  body: string;
  validity: string;
  issueDate: string;
  status: string;
  activeCandidates?: string;
}

export const defaultTrainingBatches: TrainingBatch[] = [
  { id: 'BAT-101', name: 'Full-Stack Web Dev Q1', course: 'Full-Stack Web Development', trainer: 'Dr. Ramesh Sundaram', timing: 'Mon-Fri 09:00 - 12:00', startDate: '2026-02-01', enrolled: 42, capacity: 50, status: 'Active' },
  { id: 'BAT-102', name: 'Cloud & DevOps Weekend Fast-Track', course: 'Cloud & DevOps Engineering', trainer: 'Priya Mukherjee', timing: 'Sat-Sun 10:00 - 15:00', startDate: '2026-02-15', enrolled: 35, capacity: 40, status: 'Active' },
  { id: 'BAT-103', name: 'AI & Data Science Evening Cohort', course: 'AI & Data Science Immersion', trainer: 'Vikram Mehta', timing: 'Mon-Thu 18:00 - 21:00', startDate: '2026-03-01', enrolled: 28, capacity: 35, status: 'Upcoming' },
  { id: 'BAT-104', name: 'Cybersecurity Analyst Cohort 4', course: 'Cybersecurity Operations & Defense', trainer: 'Ananya Roy', timing: 'Tue-Fri 14:00 - 17:00', startDate: '2025-11-01', enrolled: 30, capacity: 30, status: 'Completed' }
];

export const defaultTrainingLearners: TrainingLearner[] = [
  { id: 'LRN-001', name: 'Aditya Sharma', email: 'aditya.s@example.com', course: 'Full-Stack Web Development', batch: 'Full-Stack Web Dev Q1', attendance: 96, score: 92, certStatus: 'In Progress' },
  { id: 'LRN-002', name: 'Sneha Patel', email: 'sneha.p@example.com', course: 'Cloud & DevOps Engineering', batch: 'Cloud & DevOps Weekend Fast-Track', attendance: 92, score: 88, certStatus: 'In Progress' },
  { id: 'LRN-003', name: 'Rahul Verma', email: 'rahul.v@example.com', course: 'AI & Data Science Immersion', batch: 'AI & Data Science Evening Cohort', attendance: 100, score: 95, certStatus: 'Pending' },
  { id: 'LRN-004', name: 'Tanvi Joshi', email: 'tanvi.j@example.com', course: 'Cybersecurity Operations', batch: 'Cybersecurity Analyst Cohort 4', attendance: 98, score: 94, certStatus: 'Issued' },
  { id: 'LRN-005', name: 'Kunal Deshmukh', email: 'kunal.d@example.com', course: 'Full-Stack Web Development', batch: 'Full-Stack Web Dev Q1', attendance: 88, score: 81, certStatus: 'In Progress' }
];

export const defaultTrainingTrainers: TrainingTrainer[] = [
  { id: 'TRN-01', name: 'Dr. Ramesh Sundaram', email: 'ramesh.s@institute.edu', specialization: 'React, Node.js & Microservices', batches: 'Full-Stack Web Dev Q1', rating: 4.9, status: 'Active' },
  { id: 'TRN-02', name: 'Priya Mukherjee', email: 'priya.m@institute.edu', specialization: 'AWS, Kubernetes & CI/CD', batches: 'Cloud & DevOps Weekend', rating: 4.8, status: 'Active' },
  { id: 'TRN-03', name: 'Vikram Mehta', email: 'vikram.m@institute.edu', specialization: 'Deep Learning & NLP', batches: 'AI & Data Science Cohort', rating: 4.95, status: 'Active' },
  { id: 'TRN-04', name: 'Ananya Roy', email: 'ananya.r@institute.edu', specialization: 'Penetration Testing & SOC', batches: 'Cybersecurity Cohort 4', rating: 4.7, status: 'Active' }
];

export const defaultTrainingEnrollments: TrainingEnrollment[] = [
  { id: 'ENR-801', learnerName: 'Rohan Gupta', email: 'rohan.g@example.com', course: 'Full-Stack Web Development', batch: 'Full-Stack Web Dev Q1', date: '2026-02-18', paymentStatus: 'Paid', status: 'Approved' },
  { id: 'ENR-802', learnerName: 'Meera Nambiar', email: 'meera.n@example.com', course: 'AI & Data Science Immersion', batch: 'AI & Data Science Evening Cohort', date: '2026-02-20', paymentStatus: 'Pending', status: 'Pending Review' },
  { id: 'ENR-803', learnerName: 'Karthik Rao', email: 'karthik.r@example.com', course: 'Cloud & DevOps Engineering', batch: 'Cloud & DevOps Weekend Fast-Track', date: '2026-02-21', paymentStatus: 'Partial', status: 'Approved' },
  { id: 'ENR-804', learnerName: 'Deepa Kulkarni', email: 'deepa.k@example.com', course: 'Cybersecurity Operations', batch: 'Cybersecurity Analyst Cohort 4', date: '2026-02-22', paymentStatus: 'Paid', status: 'Waitlisted' }
];

export const defaultTrainingCerts: TrainingCert[] = [
  { id: 'CRT-901', name: 'Certified Full-Stack Software Engineer', recipient: 'Tanvi Joshi', body: 'National Skill Qualification Framework', validity: 'Lifetime', issueDate: '2026-01-15', status: 'Verified', activeCandidates: '142 Certified' },
  { id: 'CRT-902', name: 'Cloud Solutions Practitioner & DevOps Associate', recipient: 'Arjun Das', body: 'Role Ready Industry Council', validity: '3 Years', issueDate: '2026-01-28', status: 'Verified', activeCandidates: '98 Certified' },
  { id: 'CRT-903', name: 'AI & Machine Learning Data Scientist', recipient: 'Shruti Sen', body: 'AI Excellence Board', validity: 'Lifetime', issueDate: '2026-02-05', status: 'Verified', activeCandidates: '115 Certified' }
];

export const trainingService = {
  /**
   * Fetch live training institute courses, bootcamps, and certifications
   */
  async getTrainingData(): Promise<{
    courses: TrainingCourse[];
    batches: TrainingBatch[];
    learners: TrainingLearner[];
    trainers: TrainingTrainer[];
    enrollments: TrainingEnrollment[];
    certifications: TrainingCert[];
  }> {
    try {
      // 1. Fetch live courses from API if available
      let liveCourses: TrainingCourse[] = [];
      try {
        const cRes = await apiClient<{ success: boolean; data: any[] }>('/api/v1/learning/courses');
        if (cRes?.data && Array.isArray(cRes.data) && cRes.data.length > 0) {
          liveCourses = cRes.data.map((c: any, index: number) => ({
            id: c.id || `CRS-${index + 1}`,
            title: c.title || c.name || "Curriculum Course",
            duration: c.duration || "12 Weeks",
            enrolled: `${c.completedLessons || 45} Trainees Enrolled`,
            status: "Active Cohort",
            category: c.category || "Technology",
            modulesCount: c.modulesCount || 12
          }));
        }
      } catch {
        // Fall through
      }

      // 2. Fetch institute profile roleData
      const res = await apiClient<{ success: boolean; data: any }>(API_ENDPOINTS.PROFILE.GET).catch(() => null);
      const roleData = res?.data?.profile?.roleData || {};

      const savedBootcamps: TrainingCourse[] = Array.isArray(roleData.bootcamps) && roleData.bootcamps.length > 0
        ? roleData.bootcamps
        : [
            { id: 'CRS-01', title: "Full-Stack Web Development", duration: "16 Weeks", enrolled: "84 Trainees Enrolled", status: "Active Cohort", category: "Software Development", modulesCount: 16 },
            { id: 'CRS-02', title: "Cloud & DevOps Engineering", duration: "12 Weeks", enrolled: "60 Trainees Enrolled", status: "Active Cohort", category: "Cloud Computing", modulesCount: 12 },
            { id: 'CRS-03', title: "AI & Data Science Immersion", duration: "20 Weeks", enrolled: "55 Trainees Enrolled", status: "Active Cohort", category: "Artificial Intelligence", modulesCount: 20 },
            { id: 'CRS-04', title: "Cybersecurity Operations & Defense", duration: "14 Weeks", enrolled: "40 Trainees Enrolled", status: "Active Cohort", category: "Information Security", modulesCount: 14 }
          ];

      const batches: TrainingBatch[] = Array.isArray(roleData.batches) && roleData.batches.length > 0
        ? roleData.batches
        : defaultTrainingBatches;

      const learners: TrainingLearner[] = Array.isArray(roleData.learners) && roleData.learners.length > 0
        ? roleData.learners
        : defaultTrainingLearners;

      const trainers: TrainingTrainer[] = Array.isArray(roleData.trainers) && roleData.trainers.length > 0
        ? roleData.trainers
        : defaultTrainingTrainers;

      const enrollments: TrainingEnrollment[] = Array.isArray(roleData.enrollments) && roleData.enrollments.length > 0
        ? roleData.enrollments
        : defaultTrainingEnrollments;

      const certifications: TrainingCert[] = Array.isArray(roleData.certifications) && roleData.certifications.length > 0
        ? roleData.certifications
        : defaultTrainingCerts;

      const combinedCourses = liveCourses.length > 0 ? liveCourses : savedBootcamps;

      return { courses: combinedCourses, batches, learners, trainers, enrollments, certifications };
    } catch {
      return {
        courses: [],
        batches: defaultTrainingBatches,
        learners: defaultTrainingLearners,
        trainers: defaultTrainingTrainers,
        enrollments: defaultTrainingEnrollments,
        certifications: defaultTrainingCerts
      };
    }
  },

  /**
   * Update training institute data in profile roleData
   */
  async updateTrainingData(updates: {
    courses?: TrainingCourse[];
    batches?: TrainingBatch[];
    learners?: TrainingLearner[];
    trainers?: TrainingTrainer[];
    enrollments?: TrainingEnrollment[];
    certifications?: TrainingCert[];
  }) {
    const current = await apiClient<{ success: boolean; data: any }>(API_ENDPOINTS.PROFILE.GET).catch(() => null);
    const existingRoleData = current?.data?.profile?.roleData || {};
    const existingP = current?.data?.profile || {};

    const updatedRoleData = {
      ...existingRoleData,
      ...(updates.courses ? { bootcamps: updates.courses } : {}),
      ...(updates.batches ? { batches: updates.batches } : {}),
      ...(updates.learners ? { learners: updates.learners } : {}),
      ...(updates.trainers ? { trainers: updates.trainers } : {}),
      ...(updates.enrollments ? { enrollments: updates.enrollments } : {}),
      ...(updates.certifications ? { certifications: updates.certifications } : {})
    };

    return await apiClient(API_ENDPOINTS.PROFILE.COMPLETE, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: existingP.firstName || 'Training',
        lastName: existingP.lastName || 'Institute',
        phoneNumber: existingP.phoneNumber || '9876543210',
        bio: existingP.bio || 'Skill Academy & Professional Training Institute',
        onboardingCompleted: true,
        roleData: updatedRoleData
      })
    });
  },

  /**
   * Add a new bootcamp track and persist in backend profile roleData
   */
  async addBootcampTrack(newCourse: TrainingCourse) {
    const data = await this.getTrainingData();
    const updatedCourses = [newCourse, ...data.courses];
    return await this.updateTrainingData({ courses: updatedCourses });
  }
};
