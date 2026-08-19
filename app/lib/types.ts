export type RoleType = 
  | 'super-admin'
  | 'school'
  | 'college'
  | 'mentor'
  | 'training'
  | 'recruiter'
  | 'company';

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
