import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  bio: string;
  gradeOrDegree: string;
  institution: string;
  targetCareer: string;
  gpa: string;
  skills: string[];
  resumeUploaded: boolean;
  resumeFileName: string | null;
  preferredWorkLocation: string;
}

const initialState: UserProfile = {
  name: 'Alex Rivera',
  email: 'alex.rivera@student.role-ready.ai',
  phone: '+91 98765 43210',
  bio: 'Passionate AI Systems student & Fullstack engineer focused on neural recommendation models, React, and Python MLOps.',
  gradeOrDegree: 'B.Tech Computer Science & AI (Final Year)',
  institution: 'Indian Institute of Technology (IIT) Delhi',
  targetCareer: 'AI & Machine Learning Architect',
  gpa: '9.4 / 10.0',
  skills: ['Python', 'PyTorch', 'React 19', 'TypeScript', 'Redux Toolkit', 'FastAPI', 'AWS Cloud'],
  resumeUploaded: true,
  resumeFileName: 'Alex_Rivera_AI_Architect_Resume_2026.pdf',
  preferredWorkLocation: 'Bengaluru / Hyderabad / Remote'
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      return { ...state, ...action.payload };
    },
    addSkill: (state, action: PayloadAction<string>) => {
      if (!state.skills.includes(action.payload)) {
        state.skills.push(action.payload);
      }
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter(s => s !== action.payload);
    },
    setResumeFile: (state, action: PayloadAction<{ uploaded: boolean; fileName: string | null }>) => {
      state.resumeUploaded = action.payload.uploaded;
      state.resumeFileName = action.payload.fileName;
    }
  }
});

export const { updateProfile, addSkill, removeSkill, setResumeFile } = profileSlice.actions;
export default profileSlice.reducer;
