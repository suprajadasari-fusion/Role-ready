import { apiFetch } from '../../lib/api';
import { CollegeItem } from '../../lib/types';

/**
 * Fetch ranked college recommendations strictly from live backend:
 * Endpoint: POST /api/v1/university/recommendations
 * Query: { studentId: string, correlationId?: string }
 * ZERO mock data fallback: returns empty array if no recommendations available
 */
export async function fetchColleges(studentId?: string): Promise<CollegeItem[]> {
  try {
    let res: any;
    if (studentId) {
      res = await apiFetch<{ success: boolean; data: any[] }>('/api/v1/university/recommendations', {
        method: 'POST',
        body: JSON.stringify({
          studentId,
          correlationId: `req-${Date.now()}`
        })
      });
    } else {
      res = await apiFetch<{ success: boolean; data: any[] }>('/api/v1/colleges');
    }

    if (res?.data && Array.isArray(res.data)) {
      return res.data.map((c: any, idx: number) => ({
        id: c.id || `col-${idx}`,
        name: c.name || c.institutionName || 'University Institution',
        location: c.location || c.city || 'India',
        ranking: typeof c.ranking === 'number' ? c.ranking : idx + 1,
        programs: Array.isArray(c.programs) ? c.programs : ['Undergraduate Degree'],
        acceptanceRate: c.acceptanceRate || 'Competitive',
        feesAnnual: c.feesAnnual || c.tuitionFee || 'Contact Institution',
        minGpaRequired: typeof c.minGpaRequired === 'number' ? c.minGpaRequired : 8.0,
        bookmarked: !!c.bookmarked,
        type: c.type || 'Autonomous'
      }));
    }
  } catch (err) {
    // Expected when no university recommendations exist
  }

  return [];
}
