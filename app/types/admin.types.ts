export interface CreateTenantRequest {
  name: string;
  slug: string;
}

export interface InstitutionRegisterRequest {
  name: string;
  slug: string;
  type: 'school' | 'junior_college' | 'degree_college';
  address: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  };
  contact: {
    name: string;
    email: string;
    phone: string;
    role: string;
  };
  documentUrl: string;
}

export interface ApproveInstitutionRequest {
  tenantId: string;
}

export interface CreateSubscriptionRequest {
  tenantId: string;
  planId: string;
  isTrial?: boolean;
}

export interface CohortAnalyticsParams {
  dimension?: string;
  class?: string;
  departmentId?: string;
}

export interface ItemAnalysisParams {
  limit?: number;
  offset?: number;
}
