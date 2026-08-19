import { EcosystemEntity, AuditLog, AIWeights } from './types';

// Optional Backend API Base URL (Configured via VITE_API_BASE_URL env or runtime config)
const API_BASE_URL = typeof window !== 'undefined' 
  ? (window as any).__ENV__?.VITE_API_BASE_URL || (import.meta as any).env?.VITE_API_BASE_URL || ''
  : '';

// Helper to make API requests with automatic fallback to localStorage
async function apiFetch<T>(endpoint: string, options?: RequestInit, fallbackFn?: () => Promise<T>): Promise<T> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: { 'Content-Type': 'application/json', ...options?.headers },
        ...options
      });
      if (res.ok) {
        return await res.json();89
      }
    } catch (err) {
      console.warn(`[API Connection Warning] Failed to reach ${API_BASE_URL}${endpoint}, falling back to LocalStorage persistence.`, err);
    }
  }
  if (fallbackFn) {
    return await fallbackFn();
  }
  throw new Error(`API Endpoint ${endpoint} failed and no fallback was provided.`);
}

// Seed Ecosystem Entities with Full Approval Workflow Pipeline
const initialEntities: EcosystemEntity[] = [
  {
    id: "ent-101",
    name: "Delhi Public School, R.K. Puram",
    role: "school",
    contactEmail: "admin@dpsrkp.edu.in",
    domain: "dpsrkp.edu.in",
    seats: 4500,
    usedSeats: 3820,
    features: ["AI Discover Engine", "Scholarship Portal", "Institutional Analytics"],
    status: "active",
    onboardedDate: "2026-01-15",
    approvalStage: "Live Portal",
    docsStatus: "CBSE Affiliation #10301 Verified",
    bgCheckStatus: "Passed - Clear Security Clearance",
    subscriptionPlan: "Institutional Enterprise Tier"
  },
  {
    id: "ent-102",
    name: "Indian Institute of Technology (IIT) Bombay",
    role: "college",
    contactEmail: "placements@iitb.ac.in",
    domain: "iitb.ac.in",
    seats: 12000,
    usedSeats: 11450,
    features: ["AI Discover Engine", "Job & Internship Board", "AI Resume & Interview AI", "Institutional Analytics"],
    status: "active",
    onboardedDate: "2026-01-10",
    approvalStage: "Live Portal",
    docsStatus: "UGC & NIRF Rank #1 Verified",
    bgCheckStatus: "Passed - Clear University Clearance",
    subscriptionPlan: "University Enterprise Pro"
  },
  {
    id: "ent-103",
    name: "Dr. Rajesh Sharma (Senior Career Specialist)",
    role: "mentor",
    contactEmail: "r.sharma@careerguider.org",
    domain: "careerguider.org",
    seats: 250,
    usedSeats: 210,
    features: ["AI Discover Engine", "Mentorship Marketplace", "Institutional Analytics"],
    status: "active",
    onboardedDate: "2026-02-01",
    approvalStage: "Live Portal",
    docsStatus: "Ph.D. IIT Bombay Degree Verified",
    bgCheckStatus: "Passed - Verified Master Counselor",
    subscriptionPlan: "Master Counselor Pro"
  },
  {
    id: "ent-104",
    name: "Apex Skill Development Academy",
    role: "training",
    contactEmail: "head@apexskill.org",
    domain: "apexskill.org",
    seats: 3500,
    usedSeats: 2900,
    features: ["AI Discover Engine", "Job & Internship Board", "AI Resume & Interview AI"],
    status: "active",
    onboardedDate: "2026-02-12",
    approvalStage: "Live Portal",
    docsStatus: "NSDC Skill Provider Registration Verified",
    bgCheckStatus: "Passed - Verified Academy",
    subscriptionPlan: "Academy Pro Tier"
  },
  {
    id: "ent-105",
    name: "Priya Verma (Infosys Talent Acquisition)",
    role: "recruiter",
    contactEmail: "priya_v@infosys.com",
    domain: "infosys.com",
    seats: 1500,
    usedSeats: 890,
    features: ["Job & Internship Board", "AI Resume & Interview AI", "Institutional Analytics"],
    status: "active",
    onboardedDate: "2026-02-20",
    approvalStage: "Live Portal",
    docsStatus: "CIN U72200MH2020PTC Tax Verified",
    bgCheckStatus: "Passed - Verified Corporate Employer",
    subscriptionPlan: "Enterprise Hiring Pro"
  },
  {
    id: "ent-106",
    name: "Tata Consultancy Services (TCS) Enterprise",
    role: "company",
    contactEmail: "careers@tcs.com",
    domain: "tcs.com",
    seats: 8000,
    usedSeats: 6200,
    features: ["Job & Internship Board", "AI Resume & Interview AI", "Institutional Analytics"],
    status: "active",
    onboardedDate: "2026-01-05",
    approvalStage: "Live Portal",
    docsStatus: "Corporate Identity & Tax ID Verified",
    bgCheckStatus: "Passed - Enterprise Clearance",
    subscriptionPlan: "Enterprise Unlimited"
  },
  {
    id: "ent-107",
    name: "National Skill Development Mission (NSDC)",
    role: "college",
    contactEmail: "portal@nsdc.gov.in",
    domain: "nsdc.gov.in",
    seats: 50000,
    usedSeats: 41200,
    features: ["AI Discover Engine", "Scholarship Portal", "Job & Internship Board", "Institutional Analytics"],
    status: "active",
    onboardedDate: "2025-12-01",
    approvalStage: "Live Portal",
    docsStatus: "Govt Ministry Authorization Verified",
    bgCheckStatus: "Passed - Government Portal Clear",
    subscriptionPlan: "National Sector Plan"
  },
  {
    id: "ent-108",
    name: "St. Xavier's International School",
    role: "school",
    contactEmail: "principal@stxaviers.edu",
    domain: "stxaviers.edu",
    seats: 2200,
    usedSeats: 1850,
    features: ["AI Discover Engine", "Scholarship Portal"],
    status: "pending",
    onboardedDate: "2026-03-01",
    approvalStage: "Document Verification",
    docsStatus: "CBSE Affiliation Certificate Uploaded (Pending Review)",
    bgCheckStatus: "In Progress - Security Audit",
    subscriptionPlan: "School Starter Plan"
  },
  {
    id: "ent-109",
    name: "CodeCraft Technology Institute",
    role: "training",
    contactEmail: "admissions@codecraft.io",
    domain: "codecraft.io",
    seats: 1000,
    usedSeats: 420,
    features: ["Job & Internship Board", "AI Resume & Interview AI"],
    status: "active",
    onboardedDate: "2026-02-28",
    approvalStage: "Admin Approval",
    docsStatus: "Tech Academy Accreditation Verified",
    bgCheckStatus: "Passed - Background Audit",
    subscriptionPlan: "Institute Pro Plan"
  },
  {
    id: "ent-110",
    name: "Vanguard Wealth Management",
    role: "company",
    contactEmail: "recruiting@vanguard.com",
    domain: "vanguard.com",
    seats: 500,
    usedSeats: 120,
    features: ["Job & Internship Board"],
    status: "pending",
    onboardedDate: "2026-03-02",
    approvalStage: "Background Check",
    docsStatus: "FINRA & Tax Registration Verified",
    bgCheckStatus: "Pending Financial Compliance Check",
    subscriptionPlan: "Enterprise Starter Plan"
  }
];

const initialLogs: AuditLog[] = [
  { id: "log-1", time: "2026-03-04 10:14:20", admin: "Root Admin", action: "Provisioned Access", target: "St. Xavier's International School", role: "school", ip: "192.168.1.10", status: "Success" },
  { id: "log-2", time: "2026-03-04 09:45:00", admin: "Root Admin", action: "Granted Government Quota", target: "National Skill Development Mission", role: "government", ip: "192.168.1.10", status: "Success" },
  { id: "log-3", time: "2026-03-03 16:22:15", admin: "Root Admin", action: "Activated Recruiter Credentials", target: "Infosys Talent Acquisition", role: "recruiter", ip: "192.168.1.10", status: "Success" }
];

// LocalStorage helpers
function getStoredEntities(): EcosystemEntity[] {
  if (typeof window === 'undefined') return initialEntities;
  const item = localStorage.getItem("rr_entities");
  return item ? JSON.parse(item) : initialEntities;
}

function getStoredLogs(): AuditLog[] {
  if (typeof window === 'undefined') return initialLogs;
  const item = localStorage.getItem("rr_audit_logs");
  return item ? JSON.parse(item) : initialLogs;
}

// ----------------------------------------------------------------------------
// ENTITY & SECURITY AUDIT FUNCTIONS (Supports API + LocalStorage Fallback)
// ----------------------------------------------------------------------------

export async function fetchEntities(): Promise<EcosystemEntity[]> {
  return apiFetch('/api/entities', { method: 'GET' }, async () => {
    await new Promise(r => setTimeout(r, 100));
    return getStoredEntities();
  });
}

export async function fetchAuditLogs(): Promise<AuditLog[]> {
  return apiFetch('/api/audit-logs', { method: 'GET' }, async () => {
    await new Promise(r => setTimeout(r, 80));
    return getStoredLogs();
  });
}

export async function addEntity(newEntity: Omit<EcosystemEntity, 'id' | 'usedSeats' | 'onboardedDate'>): Promise<EcosystemEntity> {
  return apiFetch('/api/entities', {
    method: 'POST',
    body: JSON.stringify(newEntity)
  }, async () => {
    const current = getStoredEntities();
    const entity: EcosystemEntity = {
      ...newEntity,
      id: `ent-${Date.now().toString().slice(-4)}`,
      usedSeats: 0,
      onboardedDate: new Date().toISOString().split('T')[0]
    };
    const updated = [entity, ...current];
    if (typeof window !== 'undefined') localStorage.setItem("rr_entities", JSON.stringify(updated));

    await addAuditLog({
      action: "Provisioned Partner Access",
      target: entity.name,
      role: entity.role
    });

    return entity;
  });
}

export async function updateEntity(id: string, updates: Partial<EcosystemEntity>): Promise<EcosystemEntity> {
  return apiFetch(`/api/entities/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates)
  }, async () => {
    const current = getStoredEntities();
    let updatedEntity: EcosystemEntity | undefined;
    const updated = current.map(e => {
      if (e.id === id) {
        updatedEntity = { ...e, ...updates };
        return updatedEntity;
      }
      return e;
    });

    if (typeof window !== 'undefined') localStorage.setItem("rr_entities", JSON.stringify(updated));

    if (updatedEntity) {
      await addAuditLog({
        action: `Updated Access Config (${updatedEntity.status})`,
        target: updatedEntity.name,
        role: updatedEntity.role
      });
    }

    return updatedEntity!;
  });
}

export async function deleteEntity(id: string): Promise<string> {
  return apiFetch(`/api/entities/${id}`, {
    method: 'DELETE'
  }, async () => {
    const current = getStoredEntities();
    const target = current.find(e => e.id === id);
    const updated = current.filter(e => e.id !== id);
    if (typeof window !== 'undefined') localStorage.setItem("rr_entities", JSON.stringify(updated));

    if (target) {
      await addAuditLog({
        action: "Revoked Access & Deleted Entity",
        target: target.name,
        role: target.role
      });
    }

    return id;
  });
}

export async function addAuditLog(log: { action: string; target: string; role: string }): Promise<AuditLog> {
  return apiFetch('/api/audit-logs', {
    method: 'POST',
    body: JSON.stringify(log)
  }, async () => {
    const current = getStoredLogs();
    const newLog: AuditLog = {
      id: `log-${Date.now().toString().slice(-4)}`,
      time: new Date().toISOString().replace("T", " ").substring(0, 19),
      admin: "Root Admin",
      action: log.action,
      target: log.target,
      role: log.role,
      ip: "192.168.1.10",
      status: "Success"
    };
    const updated = [newLog, ...current];
    if (typeof window !== 'undefined') localStorage.setItem("rr_audit_logs", JSON.stringify(updated));
    return newLog;
  });
}

// ----------------------------------------------------------------------------
// UNIVERSAL WORKSPACE ACTIONS (LocalStorage + Ready to attach APIs)
// ----------------------------------------------------------------------------

export async function saveRBACWeights(matrixData: any): Promise<any> {
  return apiFetch('/api/rbac/matrix', {
    method: 'POST',
    body: JSON.stringify(matrixData)
  }, async () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('rr_rbac_matrix', JSON.stringify(matrixData));
    }
    return matrixData;
  });
}

export async function saveAIWeights(weights: AIWeights): Promise<AIWeights> {
  return apiFetch('/api/ai/weights', {
    method: 'POST',
    body: JSON.stringify(weights)
  }, async () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('rr_ai_weights', JSON.stringify(weights));
    }
    return weights;
  });
}

export async function savePlacementDrive(driveData: any): Promise<any> {
  return apiFetch('/api/college/drives', {
    method: 'POST',
    body: JSON.stringify(driveData)
  }, async () => {
    if (typeof window !== 'undefined') {
      const current = JSON.parse(localStorage.getItem('rr_placement_drives') || '[]');
      const updated = [driveData, ...current];
      localStorage.setItem('rr_placement_drives', JSON.stringify(updated));
    }
    return driveData;
  });
}

export async function saveJobPosting(jobData: any): Promise<any> {
  return apiFetch('/api/recruiter/jobs', {
    method: 'POST',
    body: JSON.stringify(jobData)
  }, async () => {
    if (typeof window !== 'undefined') {
      const current = JSON.parse(localStorage.getItem('rr_job_postings') || '[]');
      const updated = [jobData, ...current];
      localStorage.setItem('rr_job_postings', JSON.stringify(updated));
    }
    return jobData;
  });
}

export async function saveCounselingNote(studentId: string, notes: string): Promise<any> {
  return apiFetch(`/api/mentor/notes/${studentId}`, {
    method: 'POST',
    body: JSON.stringify({ notes })
  }, async () => {
    if (typeof window !== 'undefined') {
      const current = JSON.parse(localStorage.getItem('rr_counseling_notes') || '{}');
      current[studentId] = notes;
      localStorage.setItem('rr_counseling_notes', JSON.stringify(current));
    }
    return { studentId, notes };
  });
}
