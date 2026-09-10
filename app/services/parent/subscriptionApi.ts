import { apiFetch } from '../../lib/api';
import { FamilySubscription, ParentFamilyProfile } from '../../lib/types';
import { completeParentOnboarding } from './parentApi';

export interface SubscriptionPlanConfig {
  id: 'starter' | 'growth' | 'elite';
  backendPlanId: string;
  name: string;
  priceMonthly: number;
  maxChildren: number;
  popular?: boolean;
  features: string[];
}

export const FAMILY_PLANS: SubscriptionPlanConfig[] = [
  {
    id: 'starter',
    backendPlanId: '98d5c412-1f3a-4a21-9e77-a1288c9f0001',
    name: 'Family Starter',
    priceMonthly: 999,
    maxChildren: 1,
    features: [
      '1 Student Account License',
      'AI Psychometric Career Assessments',
      'Academic Performance & GPA Tracking',
      'Attendance & Term Logs'
    ]
  },
  {
    id: 'growth',
    backendPlanId: '98d5c412-1f3a-4a21-9e77-a1288c9f0002',
    name: 'Family Growth',
    priceMonthly: 2499,
    maxChildren: 3,
    popular: true,
    features: [
      'Up to 3 Student Account Licenses',
      'AI Career Pathways & DNA Mapping',
      'Scholarship Eligibility Matcher',
      'College Explorer & Program Ranking',
      'Verified 1-on-1 Mentor Booking'
    ]
  },
  {
    id: 'elite',
    backendPlanId: '98d5c412-1f3a-4a21-9e77-a1288c9f0003',
    name: 'Family Complete Elite',
    priceMonthly: 3999,
    maxChildren: 5,
    features: [
      'Up to 5 Student Account Licenses',
      'Everything in Growth',
      'Priority Mentor Consultations',
      'Comprehensive Downloadable PDF Reports',
      'Dedicated Academic & Career Counselor Support'
    ]
  }
];

/**
 * Activate tenant/family subscription on live backend
 * Endpoint: POST /api/v1/subscriptions
 */
export async function activateBackendSubscription(payload: {
  tenantId: string;
  planId: string;
  isTrial?: boolean;
}): Promise<any> {
  return await apiFetch('/api/v1/subscriptions', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

/**
 * Update the family subscription in the parent's profile roleData
 */
export async function updateParentSubscription(
  parentProfile: ParentFamilyProfile,
  planConfig: SubscriptionPlanConfig
): Promise<ParentFamilyProfile> {
  const newSub: FamilySubscription = {
    active: true,
    planId: planConfig.id,
    planName: planConfig.name,
    priceMonthly: planConfig.priceMonthly,
    maxChildren: planConfig.maxChildren,
    usedSeats: parentProfile.children.filter(c => c.hasAccess).length,
    renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    lastPaymentStatus: 'success'
  };

  const [firstName, ...rest] = parentProfile.parentName.split(' ');
  const lastName = rest.join(' ') || 'Parent';

  await completeParentOnboarding({
    firstName,
    lastName,
    phoneNumber: parentProfile.phone,
    onboardingCompleted: parentProfile.onboardingCompleted,
    roleData: {
      emergencyContact: parentProfile.emergencyContact,
      childrenDetails: parentProfile.children.map(c => ({
        studentId: c.id,
        relationship: 'Child',
        firstName: c.name.split(' ')[0],
        lastName: c.name.split(' ').slice(1).join(' '),
        email: c.studentEmail,
        grade: c.grade,
        school: c.school,
        hasAccess: c.hasAccess
      })),
      subscription: newSub
    }
  });

  return {
    ...parentProfile,
    subscription: newSub
  };
}
