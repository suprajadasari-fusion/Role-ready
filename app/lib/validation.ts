import { z } from 'zod';

// 1. Auth Schemas
export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['student', 'school', 'college', 'mentor', 'recruiter', 'super-admin'])
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Confirm password is required'),
  role: z.enum(['student', 'school', 'college', 'mentor', 'recruiter', 'super-admin']),
  institution: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// 2. Profile Schema
export const profileSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Valid phone number required (10+ digits)').max(15),
  bio: z.string().max(300, 'Bio must be under 300 characters'),
  gradeOrDegree: z.string().min(1, 'Grade or Degree program is required'),
  institution: z.string().min(2, 'School or University name is required'),
  targetCareer: z.string().min(2, 'Target career path is required'),
  skills: z.array(z.string()).min(1, 'At least one skill tag is required')
});

// 3. Resume Builder Schema
export const resumeSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Phone number is required'),
  location: z.string().min(2, 'City/State is required'),
  linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  github: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
  summary: z.string().min(30, 'Professional summary should be at least 30 characters'),
  education: z.array(z.object({
    institution: z.string().min(1, 'Institution is required'),
    degree: z.string().min(1, 'Degree/Grade is required'),
    year: z.string().min(1, 'Graduation year is required'),
    score: z.string().optional()
  })).min(1, 'Add at least one education entry'),
  experience: z.array(z.object({
    company: z.string().min(1, 'Company/Organization is required'),
    role: z.string().min(1, 'Role title is required'),
    duration: z.string().min(1, 'Duration is required'),
    description: z.string().min(10, 'Bullet points are required')
  })),
  skills: z.string().min(2, 'Key skills separated by commas')
});

// 4. Job Application Schema
export const jobApplicationSchema = z.object({
  jobId: z.string().min(1),
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email address is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  experienceLevel: z.string().min(1, 'Experience level is required'),
  coverLetter: z.string().min(20, 'Cover letter must be at least 20 characters'),
  availableFrom: z.string().min(1, 'Notice period / availability date is required')
});

// 5. Scholarship Application Schema
export const scholarshipApplicationSchema = z.object({
  scholarshipId: z.string().min(1),
  studentName: z.string().min(2, 'Student name is required'),
  gpaOrPercentage: z.string().min(1, 'Current GPA or Percentage is required'),
  annualFamilyIncome: z.string().min(1, 'Annual family income bracket is required'),
  statementOfPurpose: z.string().min(50, 'Statement of Purpose should be at least 50 characters'),
  documentUrl: z.string().optional()
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type ResumeFormData = z.infer<typeof resumeSchema>;
export type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;
export type ScholarshipApplicationFormData = z.infer<typeof scholarshipApplicationSchema>;
