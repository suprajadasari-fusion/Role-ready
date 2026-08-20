import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CourseItem } from '~/lib/apiService';

interface LearningState {
  courses: CourseItem[];
  streakDays: number;
  lastStudiedDate: string;
  selectedCourseId: string | null;
}

const initialState: LearningState = {
  courses: [
    {
      id: 'crs-1',
      title: 'Mastering Fullstack React 19 & Redux Toolkit',
      instructor: 'Dr. Anita Rao',
      category: 'Web Architecture',
      progress: 85,
      totalModules: 12,
      completedModules: 10,
      certBadge: 'React Architect Certified',
      duration: '18 Hours',
      rating: 4.9
    },
    {
      id: 'crs-2',
      title: 'Neural Networks, PyTorch & LLM Fine-Tuning',
      instructor: 'Prof. Vikram Malhotra',
      category: 'AI & Data Science',
      progress: 92,
      totalModules: 15,
      completedModules: 14,
      certBadge: 'AI Deep Learning Spec',
      duration: '24 Hours',
      rating: 4.95
    },
    {
      id: 'crs-3',
      title: 'Data Structures, Algorithms & System Design',
      instructor: 'Karan Sharma',
      category: 'Computer Science Core',
      progress: 60,
      totalModules: 20,
      completedModules: 12,
      certBadge: 'AlgoExpert Specialist',
      duration: '30 Hours',
      rating: 4.85
    }
  ],
  streakDays: 14,
  lastStudiedDate: '2026-08-20',
  selectedCourseId: 'crs-1'
};

export const learningSlice = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<CourseItem[]>) => {
      state.courses = action.payload;
    },
    updateCourseProgress: (state, action: PayloadAction<{ courseId: string; progress: number; completedModules: number }>) => {
      const course = state.courses.find(c => c.id === action.payload.courseId);
      if (course) {
        course.progress = action.payload.progress;
        course.completedModules = action.payload.completedModules;
      }
    },
    incrementStreak: (state) => {
      state.streakDays += 1;
    },
    setSelectedCourse: (state, action: PayloadAction<string | null>) => {
      state.selectedCourseId = action.payload;
    }
  }
});

export const { setCourses, updateCourseProgress, incrementStreak, setSelectedCourse } = learningSlice.actions;
export default learningSlice.reducer;
