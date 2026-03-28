import { apiClient } from "./client";
import type { AuthToken, User, LoginCredentials, RegisterData, ApiResponse } from "../types";

class AuthService {
  async login(
    credentials: LoginCredentials,
  ): Promise<ApiResponse<{ user: User; token: AuthToken }>> {
    const response = await apiClient.post<{ user: User; token: AuthToken }>(
      "/auth/login",
      credentials,
    );

    if (response.success && response.data?.token) {
      apiClient.setAccessToken(response.data.token.accessToken);
      this.saveAuthData(response.data);
    }

    return response;
  }

  async register(
    data: RegisterData,
  ): Promise<ApiResponse<{ user: User; token: AuthToken }>> {
    const response = await apiClient.post<{ user: User; token: AuthToken }>(
      "/auth/register",
      data,
    );

    if (response.success && response.data?.token) {
      apiClient.setAccessToken(response.data.token.accessToken);
      this.saveAuthData(response.data);
    }

    return response;
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } catch {
      // Ignore logout errors
    } finally {
      this.clearAuthData();
    }
  }

  async refreshToken(refreshToken: string): Promise<ApiResponse<AuthToken>> {
    const response = await apiClient.post<AuthToken>("/auth/refresh", {
      refreshToken,
    });

    if (response.success && response.data?.accessToken) {
      apiClient.setAccessToken(response.data.accessToken);
    }

    return response;
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiClient.get<User>("/auth/me");
  }

  async requestPasswordReset(
    email: string,
  ): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>("/auth/forgot-password", {
      email,
    });
  }

  async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>("/auth/reset-password", {
      token,
      newPassword,
    });
  }

  getAuthData(): { user: User; token: AuthToken } | null {
    try {
      const data = localStorage.getItem("authData");
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  private saveAuthData(data: { user: User; token: AuthToken }): void {
    try {
      localStorage.setItem("authData", JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save auth data:", error);
    }
  }

  private clearAuthData(): void {
    try {
      localStorage.removeItem("authData");
      localStorage.removeItem("accessToken");
      apiClient.clearAccessToken();
    } catch (error) {
      console.error("Failed to clear auth data:", error);
    }
  }

  isAuthenticated(): boolean {
    const authData = this.getAuthData();
    return !!authData?.token?.accessToken;
  }

  getAccessToken(): string | null {
    const authData = this.getAuthData();
    return authData?.token?.accessToken || null;
  }

  getUser(): User | null {
    const authData = this.getAuthData();
    return authData?.user || null;
  }
}

export const authService = new AuthService();
