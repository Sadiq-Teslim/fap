import { apiClient } from "./client";
import type { AuthToken, User, LoginCredentials, ApiResponse } from "../types";

const AUTH_API_BASE = "/api/auth";

class AuthService {
  async login(
    credentials: LoginCredentials & { twoFACode?: string },
  ): Promise<ApiResponse<{ user: User; token: AuthToken }>> {
    try {
      const res = await fetch(`${AUTH_API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          error: data.error || {
            code: `HTTP_${res.status}`,
            message: "Login failed.",
          },
        };
      }

      if (data.success && data.data?.token) {
        apiClient.setAccessToken(data.data.token.accessToken);
        this.saveAuthData(data.data);
      }

      return data;
    } catch {
      return {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message: "Unable to connect. Please check your network.",
        },
      };
    }
  }

  async logout(): Promise<void> {
    this.clearAuthData();
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    const token = this.getAccessToken();
    if (!token) {
      return {
        success: false,
        error: { code: "NO_TOKEN", message: "Not authenticated." },
      };
    }

    try {
      const res = await fetch(`${AUTH_API_BASE}/verify`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        // Token invalid/expired — clear auth data
        this.clearAuthData();
        return {
          success: false,
          error: data.error || {
            code: `HTTP_${res.status}`,
            message: "Session expired.",
          },
        };
      }

      return data;
    } catch {
      return {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message: "Unable to verify session.",
        },
      };
    }
  }

  getAuthData(): { user: User; token: AuthToken } | null {
    try {
      const data = localStorage.getItem("authData");
      if (!data) return null;

      const parsed = JSON.parse(data);

      // Check if token has expired by decoding JWT payload
      if (parsed?.token?.accessToken) {
        const payload = this.decodeJwtPayload(parsed.token.accessToken);
        if (payload?.exp && (payload.exp as number) * 1000 < Date.now()) {
          // Token expired — clear it
          this.clearAuthData();
          return null;
        }
      }

      return parsed;
    } catch {
      return null;
    }
  }

  private decodeJwtPayload(token: string): Record<string, unknown> | null {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(base64));
    } catch {
      return null;
    }
  }

  private saveAuthData(data: { user: User; token: AuthToken }): void {
    try {
      localStorage.setItem("authData", JSON.stringify(data));
    } catch {
      // localStorage unavailable
    }
  }

  private clearAuthData(): void {
    try {
      localStorage.removeItem("authData");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("partnerToken"); // Clean up legacy key
      apiClient.clearAccessToken();
    } catch {
      // localStorage unavailable
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
