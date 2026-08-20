import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoleType } from '~/lib/types';

export interface UserAuth {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  institution?: string;
  avatarUrl?: string;
  token?: string;
}

interface AuthState {
  user: UserAuth | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialUser: UserAuth = {
  id: 'usr-student-01',
  name: 'Alex Rivera',
  email: 'alex.rivera@student.role-ready.ai',
  role: 'student',
  institution: 'IIT Delhi / Class of 2026',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  token: 'mock-jwt-token-role-ready-2026'
};

const initialState: AuthState = {
  user: initialUser,
  isAuthenticated: true,
  isLoading: false,
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<UserAuth>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.setItem('role_ready_auth_user', JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('role_ready_auth_user');
      }
    },
    setWorkspaceRole: (state, action: PayloadAction<RoleType>) => {
      if (state.user) {
        state.user.role = action.payload;
      }
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

export const { setLoading, loginSuccess, logout, setWorkspaceRole, setError } = authSlice.actions;
export default authSlice.reducer;
