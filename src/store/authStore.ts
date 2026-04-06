import { create } from 'zustand';
import { AuthState } from '../types/auth';

interface AuthStore extends AuthState {
  setUser: (user: AuthState['user']) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  login: (user: AuthState['user'], token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: false,

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token, isAuthenticated: !!token }),
  setLoading: (isLoading) => set({ isLoading }),

  login: (user, token) => set({
    user,
    token,
    isAuthenticated: !!token,
    isLoading: false,
  }),

  logout: () => set({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
  }),
}));