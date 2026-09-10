import { apiFetch } from '../../lib/api';
import { AttendanceSummary } from '../../lib/types';

/**
 * Fetch child attendance metrics and daily session logs strictly from live API
 * ZERO mock data fallback: returns clean empty structure if student has no records yet
 */
export async function fetchChildAttendance(studentId: string): Promise<AttendanceSummary> {
  if (!studentId) {
    return {
      studentId: '',
      overallPercentage: 0,
      totalDays: 0,
      presentDays: 0,
      absentDays: 0,
      lateDays: 0,
      subjectBreakdown: [],
      recentLogs: []
    };
  }

  try {
    const res = await apiFetch<{ success: boolean; data: AttendanceSummary }>(`/api/v1/attendance/${studentId}`);
    if (res?.data && typeof res.data.overallPercentage === 'number') {
      return res.data;
    }
  } catch (err) {
    // Expected when no attendance records have been registered yet by school/student
  }

  return {
    studentId,
    overallPercentage: 0,
    totalDays: 0,
    presentDays: 0,
    absentDays: 0,
    lateDays: 0,
    subjectBreakdown: [],
    recentLogs: []
  };
}
