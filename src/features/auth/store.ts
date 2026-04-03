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
  // Restore auth from localStorage on store creation
  const authData = authService.getAuthData();

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
      // Skip verification if no token stored
      const token = authService.getAccessToken();
      if (!token) {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
        return;
      }

      set({ isLoading: true });
      try {
        const response = await authService.getCurrentUser();
        if (response.success && response.data) {
          set({ user: response.data, isAuthenticated: true });
        } else {
          // Token invalid/expired
          set({ user: null, token: null, isAuthenticated: false });
        }
      } catch {
        set({ user: null, token: null, isAuthenticated: false });
      } finally {
        set({ isLoading: false });
      }
    },
  };
});
