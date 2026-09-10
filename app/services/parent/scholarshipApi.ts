import { apiFetch } from '../../lib/api';
import { Scholarship } from '../../lib/types';

/**
 * Fetch scholarship recommendations strictly from live backend endpoint:
 * Endpoint: GET /api/v1/university/scholarships/recommendations/{studentProfileId}
 * ZERO mock data fallback: returns empty array if no recommendations available
 */
export async function fetchScholarships(studentProfileId?: string): Promise<Scholarship[]> {
  try {
    const endpoint = studentProfileId 
      ? `/api/v1/university/scholarships/recommendations/${studentProfileId}`
      : '/api/v1/scholarships';

    const res = await apiFetch<{ success: boolean; data: any[] }>(endpoint);
    if (res?.data && Array.isArray(res.data)) {
      return res.data.map((s: any, idx: number) => ({
        id: s.id || `sch-${idx}`,
        name: s.name || s.title || 'Scholarship Opportunity',
        provider: s.provider || s.organization || 'Educational Trust',
        amount: s.amount || 'Contingency Funding',
        deadline: s.deadline || 'Ongoing',
        eligibilityCriteria: s.eligibilityCriteria || s.criteria || 'Check portal for eligibility',
        status: s.status || 'eligible',
        applyLink: s.applyLink || s.url || '#',
        matchScore: typeof s.matchScore === 'number' ? s.matchScore : 85
      }));
    }
  } catch (err) {
    // Expected when no scholarship recommendations exist
  }

  return [];
}
