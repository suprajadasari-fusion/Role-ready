export type RoleType = 
  | 'super-admin'
  | 'school'
  | 'college'
  | 'mentor'
  | 'training'
  | 'recruiter'
  | 'company'
  | 'parent';

export type StatusType = 'active' | 'pending' | 'suspended';

export type ApprovalStage = 
  | 'Pending Review'
  | 'Document Verification'
  | 'Background Check'
  | 'Admin Approval'
  | 'Subscription'
  | 'Live Portal';

export interface EcosystemEntity {
  id: string;
  name: string;
  role: RoleType;
  contactEmail: string;
  domain: string;
  seats: number;
  usedSeats: number;
  features: string[];
  status: StatusType;
  onboardedDate: string;
  approvalStage?: ApprovalStage;
  docsStatus?: string;
  bgCheckStatus?: string;
  subscriptionPlan?: string;
}

export interface AuditLog {
  id: string;
  time: string;
  admin: string;
  action: string;
  target: string;
  role: string;
  ip: string;
  status: string;
}

export interface RBACModule {
  name: string;
  key: string;
}

export interface AIWeights {
  aptitude: number;
  interest: number;
  market: number;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  dob: string;
  gender: string;
  location: string;
  education: string;
  qualification: string;
  skills: string[];
  bio: string;
  avatarUrl: string;
  role: RoleType;
  updatedAt?: string;
  // Live backend extended attributes
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  onboardingCompleted?: boolean;
  roleData?: any;
}

export interface BackendUser {
  id: string;
  email: string;
  phone?: string;
  role: string;
  isVerified?: boolean;
  isActive?: boolean;
  avatarUrl?: string | null;
  firstName?: string;
  lastName?: string;
  profile?: {
    profileId?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    bio?: string;
    onboardingCompleted?: boolean;
    roleData?: any;
  };
}

export interface AuthResponseData {
  requires2Fa: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    role: string;
    firstName?: string;
    lastName?: string;
  };
  route?: any;
}

export interface AdminHealthData {
  dbConnected: boolean;
  status: string;
}


export interface ChildAccount {
  id: string;
  name: string;
  grade: string;
  school: string;
  targetCareer: string;
  dob: string;
  studentEmail: string;
  tempPassword?: string;
  avatarUrl?: string;
  hasAccess: boolean;
  subscriptionPlan: string;
  academicGpa: number;
  studyHoursWeekly: number;
  attendanceRate: number;
  riasecCode: string;
  topAiCareerMatch: string;
  matchScore: number;
  status: 'active' | 'pending-activation' | 'needs-attention';
}

export interface FamilySubscription {
  active: boolean;
  planId: 'starter' | 'growth' | 'elite';
  planName: string;
  priceMonthly: number;
  maxChildren: number;
  usedSeats: number;
  renewalDate: string;
  lastPaymentStatus: 'success' | 'failed' | 'none';
}

export interface ParentFamilyProfile {
  id: string;
  parentName: string;
  parentEmail: string;
  phone: string;
  emergencyContact: string;
  onboardingCompleted: boolean;
  children: ChildAccount[];
  subscription: FamilySubscription;
}

// ----------------------------------------------------------------------------
// PARENT DASHBOARD SUB-DOMAINS & STUDENT PROGRESS TYPES (STRICT LIVE API CONTRACTS)
// ----------------------------------------------------------------------------

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  subject?: string;
  remarks?: string;
}

export interface SubjectAttendanceSummary {
  subject: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
}

export interface AttendanceSummary {
  studentId: string;
  overallPercentage: number;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  subjectBreakdown: SubjectAttendanceSummary[];
  recentLogs: AttendanceRecord[];
}

export interface SubjectMark {
  id: string;
  subject: string;
  score: number;
  maxScore: number;
  grade: string;
  term: string;
  classAverage: number;
  remarks: string;
  color?: string;
}

export interface AcademicProgressData {
  studentId: string;
  overallGpa: number;
  maxGpa: number;
  classRank: string;
  percentile: number;
  gradingSystem: string;
  subjects: SubjectMark[];
  termTrends: Array<{ term: string; gpa: number }>;
  teacherFeedback: string;
}

export interface HollandScore {
  trait: 'Realistic' | 'Investigative' | 'Artistic' | 'Social' | 'Enterprising' | 'Conventional';
  score: number;
  color: string;
  description: string;
}

export interface CareerPathway {
  id: string;
  title: string;
  matchScore: number;
  salaryRange: string;
  growthOutlook: string;
  matchRationale: string;
  requiredQualifications: string[];
}

export interface CareerMilestone {
  id: string;
  stage: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  targetDate: string;
  isCompleted: boolean;
}

export interface CareerProgressData {
  studentId: string;
  assessmentStatus: 'completed' | 'pending';
  riasecCode: string;
  dnaSummary: string;
  hollandScores: HollandScore[];
  pathways: CareerPathway[];
  milestones: CareerMilestone[];
  counselorNotes: string;
}

export interface LearningCourse {
  id: string;
  title: string;
  provider: string;
  category: string;
  progressPercent: number;
  completedLessons: number;
  totalLessons: number;
  status: 'in-progress' | 'completed' | 'not-started';
  badgeEarned?: string;
}

export interface LearningActivity {
  id: string;
  date: string;
  moduleName: string;
  quizScore?: number;
  hoursSpent: number;
}

export interface LearningProgressData {
  studentId: string;
  weeklyStudyHours: number;
  totalCoursesEnrolled: number;
  completedCoursesCount: number;
  activeCourses: LearningCourse[];
  acquiredSkills: string[];
  recentActivities: LearningActivity[];
}

export interface ParentReport {
  id: string;
  title: string;
  type: 'academic' | 'career' | 'learning' | 'comprehensive';
  generatedDate: string;
  summary: string;
  topStrengths: string[];
  growthFocus: string[];
  counselorRecommendation: string;
  downloadUrl?: string;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  eligibilityCriteria: string;
  status: 'eligible' | 'applied' | 'shortlisted' | 'awarded';
  applyLink: string;
  matchScore: number;
}

export interface CollegeItem {
  id: string;
  name: string;
  location: string;
  ranking: number;
  programs: string[];
  acceptanceRate: string;
  feesAnnual: string;
  minGpaRequired: number;
  bookmarked: boolean;
  type: 'Private' | 'Public' | 'Autonomous';
}

export interface MentorItem {
  id: string;
  name: string;
  title: string;
  organization: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  specialization: string[];
  hourlyRate: string;
  avatarUrl: string;
  bio: string;
  availableSlots: string[];
}

export interface MentorBooking {
  id: string;
  mentorId: string;
  mentorName: string;
  studentId: string;
  studentName: string;
  date: string;
  timeSlot: string;
  topic: string;
  status: 'confirmed' | 'completed' | 'rescheduled' | 'cancelled';
  meetingLink?: string;
}

export interface ParentNotification {
  id: string;
  title: string;
  message: string;
  category: 'academic' | 'career' | 'scholarship' | 'mentorship' | 'fees' | 'system';
  timestamp: string;
  isRead: boolean;
  linkTab?: string;
}

export interface FeeRecord {
  id: string;
  title: string;
  category: 'subscription' | 'school-tuition' | 'exam' | 'counseling';
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  invoiceNo?: string;
  paidDate?: string;
}

export interface FeeSummary {
  studentId: string;
  totalFees: number;
  totalPaid: number;
  totalPending: number;
  nextDueDate: string;
  records: FeeRecord[];
}

