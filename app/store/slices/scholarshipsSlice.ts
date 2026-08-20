import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScholarshipItem } from '~/lib/apiService';

interface ScholarshipsState {
  items: ScholarshipItem[];
  appliedIds: string[];
  selectedCategory: string;
}

const initialState: ScholarshipsState = {
  items: [
    {
      id: 'sch-01',
      name: 'National STEM Excellence Fellowship 2026',
      provider: 'Ministry of Science & Technology',
      amount: '₹2,50,000 / year',
      deadline: 'April 30, 2026',
      eligibility: 'GPA >= 8.5, Science/Tech Stream',
      fitScore: 96,
      category: 'Merit',
      description: 'Full tuition funding and annual research grant for high-achieving STEM students across India.'
    },
    {
      id: 'sch-02',
      name: 'Women in AI & Future Tech Leaders Grant',
      provider: 'Global Tech Foundation',
      amount: '₹1,80,000 / year',
      deadline: 'May 15, 2026',
      eligibility: 'Female STEM undergraduates',
      fitScore: 92,
      category: 'STEM',
      description: 'Dedicated merit-cum-need fellowship program supporting female developers and research engineers.'
    },
    {
      id: 'sch-03',
      name: 'Central Equity & Merit Education Grant',
      provider: 'Central Board of Education Desk',
      amount: '₹1,00,000 / year',
      deadline: 'May 01, 2026',
      eligibility: 'Income < ₹6.0 LPA',
      fitScore: 90,
      category: 'Equity',
      description: 'Financial assistance for meritorious students pursuing professional engineering and degree tracks.'
    }
  ],
  appliedIds: ['sch-01'],
  selectedCategory: 'All'
};

export const scholarshipsSlice = createSlice({
  name: 'scholarships',
  initialState,
  reducers: {
    setScholarships: (state, action: PayloadAction<ScholarshipItem[]>) => {
      state.items = action.payload;
    },
    applyScholarship: (state, action: PayloadAction<string>) => {
      if (!state.appliedIds.includes(action.payload)) {
        state.appliedIds.push(action.payload);
      }
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    }
  }
});

export const { setScholarships, applyScholarship, setSelectedCategory } = scholarshipsSlice.actions;
export default scholarshipsSlice.reducer;
