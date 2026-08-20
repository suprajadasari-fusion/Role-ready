import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JobItem } from '~/lib/apiService';

interface JobsState {
  jobsList: JobItem[];
  savedJobIds: string[];
  appliedJobIds: string[];
  searchQuery: string;
  selectedCategory: string;
}

const initialState: JobsState = {
  jobsList: [
    {
      id: 'job-101',
      title: 'Junior AI & Deep Learning Engineer',
      company: 'NeuralCorp AI Labs',
      location: 'Bengaluru / Remote',
      salary: '₹14.0 - ₹24.0 LPA',
      experience: '0 - 2 Yrs',
      type: 'Full-time',
      matchScore: 96,
      tags: ['Python', 'PyTorch', 'Transformers', 'LLMs'],
      description: 'Design and deploy neural recommendation pipelines and multi-modal transformers for enterprise clients.',
      postedDate: '2 days ago'
    },
    {
      id: 'job-102',
      title: 'Fullstack React & Node.js Developer',
      company: 'Apex Cloud Solutions',
      location: 'Hyderabad, AP',
      salary: '₹12.0 - ₹18.0 LPA',
      experience: '0 - 1 Yrs',
      type: 'Full-time',
      matchScore: 92,
      tags: ['React', 'TypeScript', 'Redux', 'Tailwind'],
      description: 'Build high-performance micro-frontend applications with real-time state management and accessible UI components.',
      postedDate: '1 day ago'
    },
    {
      id: 'job-103',
      title: 'Quantitative Data Science Intern',
      company: 'Quantum Wealth Analytics',
      location: 'Mumbai, MH',
      salary: '₹45,000 / mo',
      experience: 'Internship',
      type: 'Internship',
      matchScore: 89,
      tags: ['Python', 'Pandas', 'Stochastics', 'Algorithmic Trading'],
      description: 'Collaborate with quantitative researchers to develop statistical arbitrage models and risk engines.',
      postedDate: '3 days ago'
    }
  ],
  savedJobIds: ['job-101'],
  appliedJobIds: [],
  searchQuery: '',
  selectedCategory: 'All'
};

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<JobItem[]>) => {
      state.jobsList = action.payload;
    },
    addJobPosting: (state, action: PayloadAction<JobItem>) => {
      state.jobsList.unshift(action.payload);
    },
    toggleSaveJob: (state, action: PayloadAction<string>) => {
      const jobId = action.payload;
      if (state.savedJobIds.includes(jobId)) {
        state.savedJobIds = state.savedJobIds.filter(id => id !== jobId);
      } else {
        state.savedJobIds.push(jobId);
      }
    },
    applyToJob: (state, action: PayloadAction<string>) => {
      if (!state.appliedJobIds.includes(action.payload)) {
        state.appliedJobIds.push(action.payload);
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    }
  }
});

export const { setJobs, addJobPosting, toggleSaveJob, applyToJob, setSearchQuery, setSelectedCategory } = jobsSlice.actions;
export default jobsSlice.reducer;
