import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '../config/api';

export interface CompanyJob {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Contract';
  openings: number;
  applicants: number;
  status: 'Active' | 'Draft' | 'Closed';
  postedDate: string;
}

export interface CompanyCandidate {
  id: string;
  name: string;
  email: string;
  college: string;
  degree: string;
  skills: string[];
  matchScore: number;
  experience: string;
  status: 'Shortlisted' | 'In Review' | 'Interviewed' | 'Offered';
}

export interface CompanyApplication {
  id: string;
  applicantName: string;
  email: string;
  position: string;
  appliedDate: string;
  stage: 'Screening' | 'Technical Round' | 'HR Round' | 'Offer Sent' | 'Rejected';
  score: string;
}

export interface CompanyInterview {
  id: string;
  candidateName: string;
  role: string;
  round: string;
  interviewer: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Feedback Pending';
  meetLink?: string;
}

export interface CompanyEmployee {
  id: string;
  name: string;
  department: string;
  designation: string;
  joinedDate: string;
  email: string;
  status: 'Active' | 'Onboarding';
}

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

export const defaultCompanyJobs: CompanyJob[] = [
  { id: 'JOB-501', title: 'Graduate Software Development Engineer (SDE-1)', department: 'Core Engineering', location: 'Bengaluru / Hybrid', type: 'Full-time', openings: 12, applicants: 184, status: 'Active', postedDate: '2026-02-15' },
  { id: 'JOB-502', title: 'AI & Data Science Engineering Intern', department: 'Applied Machine Learning', location: 'Hyderabad / On-site', type: 'Internship', openings: 8, applicants: 210, status: 'Active', postedDate: '2026-02-20' },
  { id: 'JOB-503', title: 'Cloud Infrastructure & DevOps Engineer', department: 'Platform Reliability', location: 'Pune / Remote', type: 'Full-time', openings: 5, applicants: 92, status: 'Active', postedDate: '2026-02-22' },
  { id: 'JOB-504', title: 'Associate Product Analyst', department: 'Product & Growth', location: 'Gurugram / Hybrid', type: 'Full-time', openings: 4, applicants: 115, status: 'Active', postedDate: '2026-02-25' }
];

export const defaultCompanyCandidates: CompanyCandidate[] = [
  { id: 'CND-101', name: 'Arjun Das', email: 'arjun.das@example.com', college: 'IIT Bombay', degree: 'B.Tech Computer Science (2026)', skills: ['Python', 'PyTorch', 'Distributed Systems', 'Go'], matchScore: 96, experience: 'Final Year Student', status: 'Shortlisted' },
  { id: 'CND-102', name: 'Sneha Kulkarni', email: 'sneha.k@example.com', college: 'BITS Pilani', degree: 'B.E. Computer Science (2026)', skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'], matchScore: 94, experience: 'Summer Intern at Tech Labs', status: 'Shortlisted' },
  { id: 'CND-103', name: 'Rohan Mehra', email: 'rohan.m@example.com', college: 'NIT Trichy', degree: 'B.Tech IT (2026)', skills: ['Kubernetes', 'Docker', 'Terraform', 'CI/CD'], matchScore: 91, experience: 'Final Year Student', status: 'In Review' },
  { id: 'CND-104', name: 'Tanvi Iyer', email: 'tanvi.i@example.com', college: 'DTU Delhi', degree: 'B.Tech Software Engineering (2026)', skills: ['Data Analytics', 'SQL', 'Tableau', 'Python'], matchScore: 89, experience: 'Final Year Student', status: 'Interviewed' }
];

export const defaultCompanyApplications: CompanyApplication[] = [
  { id: 'APP-901', applicantName: 'Arjun Das', email: 'arjun.das@example.com', position: 'Graduate Software Development Engineer', appliedDate: '2026-02-28', stage: 'Technical Round', score: '95/100' },
  { id: 'APP-902', applicantName: 'Sneha Kulkarni', email: 'sneha.k@example.com', position: 'AI & Data Science Engineering Intern', appliedDate: '2026-03-01', stage: 'HR Round', score: '92/100' },
  { id: 'APP-903', applicantName: 'Rohan Mehra', email: 'rohan.m@example.com', position: 'Cloud Infrastructure Engineer', appliedDate: '2026-03-02', stage: 'Screening', score: '88/100' },
  { id: 'APP-904', applicantName: 'Tanvi Iyer', email: 'tanvi.i@example.com', position: 'Associate Product Analyst', appliedDate: '2026-03-03', stage: 'Offer Sent', score: '94/100' }
];

export const defaultCompanyInterviews: CompanyInterview[] = [
  { id: 'INT-301', candidateName: 'Arjun Das', role: 'Graduate SDE-1', round: 'System Design & Algorithms', interviewer: 'Vikram Mehta (Principal Architect)', date: 'Tomorrow', time: '14:30 PM', status: 'Scheduled', meetLink: 'https://meet.role-ready.com/int-301' },
  { id: 'INT-302', candidateName: 'Sneha Kulkarni', role: 'AI Engineering Intern', round: 'Machine Learning Deep Dive', interviewer: 'Dr. Ananya Roy (Lead Scientist)', date: 'March 14, 2026', time: '11:00 AM', status: 'Scheduled', meetLink: 'https://meet.role-ready.com/int-302' },
  { id: 'INT-303', candidateName: 'Tanvi Iyer', role: 'Product Analyst', round: 'Executive Leadership Round', interviewer: 'Siddharth Rao (VP Product)', date: 'March 10, 2026', time: '16:00 PM', status: 'Completed', meetLink: 'https://meet.role-ready.com/int-303' }
];

export const defaultCompanyEmployees: CompanyEmployee[] = [
  { id: 'EMP-01', name: 'Vikram Mehta', department: 'Core Engineering', designation: 'Principal Architect', joinedDate: '2022-04-01', email: 'v.mehta@enterprise.com', status: 'Active' },
  { id: 'EMP-02', name: 'Dr. Ananya Roy', department: 'Applied Machine Learning', designation: 'Lead Data Scientist', joinedDate: '2023-08-15', email: 'a.roy@enterprise.com', status: 'Active' },
  { id: 'EMP-03', name: 'Priya Sharma', department: 'Human Resources', designation: 'Head of Campus Recruitment', joinedDate: '2021-01-10', email: 'p.sharma@enterprise.com', status: 'Active' },
  { id: 'EMP-04', name: 'Aditya Verma', department: 'Platform Engineering', designation: 'Senior DevOps Engineer', joinedDate: '2024-02-01', email: 'a.verma@enterprise.com', status: 'Active' }
];

export const companyService = {
  /**
   * Fetch live company internships, jobs, candidates, applications, and campus partnerships
   */
  async getCompanyData(): Promise<{
    jobs: CompanyJob[];
    candidates: CompanyCandidate[];
    applications: CompanyApplication[];
    interviews: CompanyInterview[];
    employees: CompanyEmployee[];
    internships: CompanyInternship[];
    partnerships: CompanyPartnership[];
  }> {
    try {
      const res = await apiClient<{ success: boolean; data: any }>(API_ENDPOINTS.PROFILE.GET).catch(() => null);
      const roleData = res?.data?.profile?.roleData || {};

      const jobs: CompanyJob[] = Array.isArray(roleData.jobs) && roleData.jobs.length > 0
        ? roleData.jobs
        : defaultCompanyJobs;

      const candidates: CompanyCandidate[] = Array.isArray(roleData.candidates) && roleData.candidates.length > 0
        ? roleData.candidates
        : defaultCompanyCandidates;

      const applications: CompanyApplication[] = Array.isArray(roleData.applications) && roleData.applications.length > 0
        ? roleData.applications
        : defaultCompanyApplications;

      const interviews: CompanyInterview[] = Array.isArray(roleData.interviews) && roleData.interviews.length > 0
        ? roleData.interviews
        : defaultCompanyInterviews;

      const employees: CompanyEmployee[] = Array.isArray(roleData.employees) && roleData.employees.length > 0
        ? roleData.employees
        : defaultCompanyEmployees;

      const internships: CompanyInternship[] = Array.isArray(roleData.internships) && roleData.internships.length > 0
        ? roleData.internships
        : [
            { cohort: "Summer AI Innovation Cohort 2026", duration: "6 Months", stipend: "₹45,000 / mo", interns: "18 Candidates Active", ppo: "Direct PPO Track" },
            { cohort: "Core Systems Engineering Fellowship", duration: "4 Months", stipend: "₹40,000 / mo", interns: "12 Candidates Active", ppo: "Pre-Placement Offer" }
          ];

      const partnerships: CompanyPartnership[] = Array.isArray(roleData.partnerships) && roleData.partnerships.length > 0
        ? roleData.partnerships
        : [
            { college: "IIT Bombay", type: "Tier-1 Campus Hiring MoU", mouYear: "2026-2029", studentsHired: "14 Hires", status: "Active MoU" },
            { college: "BITS Pilani", type: "Joint R&D Internship Track", mouYear: "2025-2028", studentsHired: "10 Hires", status: "Active MoU" },
            { college: "NIT Trichy", type: "Campus Placement Partner", mouYear: "2026-2027", studentsHired: "8 Hires", status: "Active MoU" }
          ];

      return { jobs, candidates, applications, interviews, employees, internships, partnerships };
    } catch {
      return {
        jobs: defaultCompanyJobs,
        candidates: defaultCompanyCandidates,
        applications: defaultCompanyApplications,
        interviews: defaultCompanyInterviews,
        employees: defaultCompanyEmployees,
        internships: [],
        partnerships: []
      };
    }
  },

  /**
   * Update enterprise company data in backend profile roleData
   */
  async updateCompanyData(updates: {
    jobs?: CompanyJob[];
    candidates?: CompanyCandidate[];
    applications?: CompanyApplication[];
    interviews?: CompanyInterview[];
    employees?: CompanyEmployee[];
    internships?: CompanyInternship[];
    partnerships?: CompanyPartnership[];
  }) {
    const current = await apiClient<{ success: boolean; data: any }>(API_ENDPOINTS.PROFILE.GET).catch(() => null);
    const existingRoleData = current?.data?.profile?.roleData || {};
    const existingP = current?.data?.profile || {};

    const updatedRoleData = {
      ...existingRoleData,
      ...(updates.jobs ? { jobs: updates.jobs } : {}),
      ...(updates.candidates ? { candidates: updates.candidates } : {}),
      ...(updates.applications ? { applications: updates.applications } : {}),
      ...(updates.interviews ? { interviews: updates.interviews } : {}),
      ...(updates.employees ? { employees: updates.employees } : {}),
      ...(updates.internships ? { internships: updates.internships } : {}),
      ...(updates.partnerships ? { partnerships: updates.partnerships } : {})
    };

    return await apiClient(API_ENDPOINTS.PROFILE.COMPLETE, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: existingP.firstName || 'Enterprise',
        lastName: existingP.lastName || 'Partner',
        phoneNumber: existingP.phoneNumber || '9876543210',
        bio: existingP.bio || 'Enterprise Corporate Partner & Employer Portal',
        onboardingCompleted: true,
        roleData: updatedRoleData
      })
    });
  },

  /**
   * Launch a new internship cohort and persist in backend profile roleData
   */
  async launchInternshipCohort(newCohort: CompanyInternship) {
    const data = await this.getCompanyData();
    const updatedInternships = [newCohort, ...data.internships];
    return await this.updateCompanyData({ internships: updatedInternships });
  }
};

