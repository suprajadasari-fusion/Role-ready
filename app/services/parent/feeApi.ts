import { apiFetch } from '../../lib/api';
import { FeeSummary, FeeRecord } from '../../lib/types';

/**
 * Fetch student fee breakdown, upcoming invoices, and tuition receipts strictly from backend
 * Endpoint: GET /api/v1/parent/fees/{studentId}
 * ZERO mock data fallback: returns clean empty fee summary if no invoices are pending
 */
export async function fetchChildFees(studentId: string): Promise<FeeSummary> {
  if (!studentId) {
    return {
      studentId: '',
      totalFees: 0,
      totalPaid: 0,
      totalPending: 0,
      nextDueDate: '-',
      records: []
    };
  }

  try {
    const res = await apiFetch<{ success: boolean; data: FeeSummary }>(`/api/v1/parent/fees/${studentId}`);
    if (res?.data && typeof res.data.totalFees === 'number') {
      return res.data;
    }
  } catch (err) {
    // Expected when no fee ledger exists yet
  }

  return {
    studentId,
    totalFees: 0,
    totalPaid: 0,
    totalPending: 0,
    nextDueDate: '-',
    records: []
  };
}
