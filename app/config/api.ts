/**
 * Centralized API Configuration
 * Base URL for all production backend endpoints: https://role-ready-backendcode.onrender.com
 */
export const API_BASE_URL = typeof window !== 'undefined' 
  ? (window as any).__ENV__?.VITE_API_BASE_URL || (import.meta as any).env?.VITE_API_BASE_URL || 'https://role-ready-backendcode.onrender.com'
  : 'https://role-ready-backendcode.onrender.com';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER_STUDENT: '/api/v1/auth/register/student',
    REGISTER_PARENT: '/api/v1/auth/register/parent',
    REGISTER_MENTOR: '/api/v1/auth/register/mentor',
    REGISTER_RECRUITER: '/api/v1/auth/register/recruiter',
    REGISTER_COMPANY: '/api/v1/auth/register/company',
    REFRESH: '/api/v1/auth/refresh',
    LOGOUT: '/api/v1/auth/logout',
    VERIFY_EMAIL: '/api/v1/auth/verify-email',
    VERIFY_PHONE: '/api/v1/auth/verify-phone',
    FORGOT_PASSWORD: '/api/v1/auth/forgot-password',
    RESET_PASSWORD: '/api/v1/auth/reset-password',
    CHANGE_PASSWORD: '/api/v1/auth/change-password'
  },
  USERS: {
    ME: '/api/v1/users/me',
    ADMIN_HEALTH: '/api/v1/users/admin/health'
  },
  PROFILE: {
    GET: '/api/v1/profile/',
    COMPLETE: '/api/v1/profile/complete',
    AVATAR: '/api/v1/profile/avatar',
    UPLOAD: '/api/v1/profile/upload'
  },
  ADMIN: {
    HEALTH: '/api/v1/users/admin/health',
    TENANTS: '/api/v1/tenants',
    INSTITUTIONS_REGISTER: '/api/v1/institutions/register',
    INSTITUTIONS_APPROVE: '/api/v1/institutions/approve',
    SUBSCRIPTIONS: '/api/v1/subscriptions',
    APTITUDE_COHORT: '/api/v1/aptitude/admin/analytics/cohort',
    APTITUDE_ITEMS: '/api/v1/aptitude/admin/analytics/items',
    SKILL_COHORT: '/api/v1/skill-mapping/analytics/cohort'
  }
} as const;
