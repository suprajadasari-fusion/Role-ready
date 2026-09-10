import { apiFetch } from '../../lib/api';
import { AcademicProgressData, SubjectMark } from '../../lib/types';

/**
 * Fetch child subject marks strictly from live API
 * ZERO mock data fallback: returns clean empty array if no exams/marks recorded yet
 */
export async function fetchChildMarks(studentId: string): Promise<SubjectMark[]> {
  if (!studentId) return [];

  try {
    const res = await apiFetch<{ success: boolean; data: SubjectMark[] }>(`/api/v1/academic/marks/${studentId}`);
    if (res?.data && Array.isArray(res.data)) {
      return res.data;
    }
  } catch (err) {
    // Expected when no marks have been submitted yet
  }

  return [];
}

/**
 * Fetch comprehensive academic progress metrics, GPA, percentile, and term trends
 * ZERO mock data fallback
 */
export async function fetchChildAcademicProgress(studentId: string): Promise<AcademicProgressData> {
  if (!studentId) {
    return {
      studentId: '',
      overallGpa: 0,
      maxGpa: 10,
      classRank: '-',
      percentile: 0,
      gradingSystem: '10-Point CGPA',
      subjects: [],
      termTrends: [],
      teacherFeedback: 'No academic marks or exam evaluations published yet for this student.'
    };
  }

  try {
    const res = await apiFetch<{ success: boolean; data: AcademicProgressData }>(`/api/v1/academic/${studentId}`);
    if (res?.data && typeof res.data.overallGpa === 'number') {
      return res.data;
    }
  } catch (err) {
    // Expected when no marks have been submitted yet
  }

  return {
    studentId,
    overallGpa: 0,
    maxGpa: 10,
    classRank: '-',
    percentile: 0,
    gradingSystem: '10-Point CGPA',
    subjects: [],
    termTrends: [],
    teacherFeedback: 'No academic marks or exam evaluations published yet for this student.'
  };
}
