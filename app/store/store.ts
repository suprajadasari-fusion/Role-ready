import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import notificationsReducer from './slices/notificationsSlice';
import jobsReducer from './slices/jobsSlice';
import scholarshipsReducer from './slices/scholarshipsSlice';
import learningReducer from './slices/learningSlice';
import interviewReducer from './slices/interviewSlice';
import resumeReducer from './slices/resumeSlice';
import offlineReducer from './slices/offlineSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    notifications: notificationsReducer,
    jobs: jobsReducer,
    scholarships: scholarshipsReducer,
    learning: learningReducer,
    interview: interviewReducer,
    resume: resumeReducer,
    offline: offlineReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
