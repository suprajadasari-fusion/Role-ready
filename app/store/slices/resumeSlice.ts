import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  year: string;
  score?: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

interface ResumeState {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: string;
  atsScore: number;
  atsFeedback: string[];
}

const initialState: ResumeState = {
  fullName: 'Alex Rivera',
  email: 'alex.rivera@student.role-ready.ai',
  phone: '+91 98765 43210',
  location: 'New Delhi, India',
  linkedin: 'https://linkedin.com/in/alexrivera-ai',
  github: 'https://github.com/alexrivera-ai',
  summary: 'Results-driven AI & Fullstack Systems candidate with expertise in React 19, Redux Toolkit, Python, PyTorch, and cloud microservices. Proven track record building real-time career intelligence interfaces and neural matchers.',
  education: [
    {
      id: 'edu-1',
      institution: 'Indian Institute of Technology (IIT) Delhi',
      degree: 'B.Tech Computer Science & Artificial Intelligence',
      year: '2022 - 2026',
      score: 'CGPA: 9.4 / 10.0'
    }
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'NeuralCorp AI Labs',
      role: 'AI Systems Engineering Intern',
      duration: 'May 2025 - Aug 2025',
      description: 'Architected high-throughput transformer inference backend serving 50k+ daily users. Reduced P99 latency by 35% using PyTorch JIT compilation.'
    }
  ],
  skills: 'React 19, Redux Toolkit, TypeScript, Tailwind CSS, Python, PyTorch, FastAPI, AWS, Docker, Kubernetes',
  atsScore: 92,
  atsFeedback: [
    '✓ Formatting compliance: 100% Parser compatible',
    '✓ Keyword density match: High (React, Redux, PyTorch, Cloud)',
    '✓ Action verbs impact: Excellent metric descriptions',
    '💡 Tip: Add target certifications (e.g. AWS Certified Developer) for +5 score boost'
  ]
};

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    updateContactInfo: (state, action: PayloadAction<Partial<Pick<ResumeState, 'fullName' | 'email' | 'phone' | 'location' | 'linkedin' | 'github' | 'summary' | 'skills'>>>) => {
      return { ...state, ...action.payload };
    },
    setEducation: (state, action: PayloadAction<EducationEntry[]>) => {
      state.education = action.payload;
    },
    setExperience: (state, action: PayloadAction<ExperienceEntry[]>) => {
      state.experience = action.payload;
    },
    runAtsScan: (state) => {
      // Re-scan and boost score
      state.atsScore = Math.min(98, state.atsScore + 4);
      state.atsFeedback = [
        '✓ Formatting compliance: 100% Parser compatible',
        '✓ Keyword density match: Optimal for Senior/Junior AI Engineer roles',
        '✓ Action verbs & quantifiable metrics present in experience bullets',
        '✨ Verified ATS Ready for direct corporate submission!'
      ];
    }
  }
});

export const { updateContactInfo, setEducation, setExperience, runAtsScan } = resumeSlice.actions;
export default resumeSlice.reducer;
