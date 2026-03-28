import { create } from "zustand";
import type { User, AuthToken } from "../../shared/types";
import { authService } from "../../shared/api";

interface AuthState {
  user: User | null;
  token: AuthToken | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;

  setUser: (user: User | null) => void;
  setToken: (token: AuthToken | null) => void;
  setError: (error: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => {
  // Check auth on store creation
  const authData = authService.getAuthData();
  if (authData) {
    set({
      user: authData.user,
      token: authData.token,
      isAuthenticated: true,
    });
  }

  return {
    user: authData?.user || null,
    token: authData?.token || null,
    isLoading: false,
    isAuthenticated: !!authData?.token,
    error: null,

    setUser: (user) => set({ user }),
    setToken: (token) => set({ token, isAuthenticated: !!token }),
    setError: (error) => set({ error }),
    setIsLoading: (isLoading) => set({ isLoading }),

    logout: () => {
      authService.logout();
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
      });
    },

    checkAuth: async () => {
      set({ isLoading: true });
      try {
        const response = await authService.getCurrentUser();
        if (response.success && response.data) {
          set({ user: response.data, isAuthenticated: true });
        } else {
          set({ user: null, isAuthenticated: false });
        }
      } catch (error) {
        set({ user: null, isAuthenticated: false });
      } finally {
        set({ isLoading: false });
      }
    },
  };
});
