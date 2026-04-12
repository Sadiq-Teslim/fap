import { API_BASE_URL, API_TIMEOUT } from "../constants";
import type { ApiResponse } from "../types";

export interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

class ApiClient {
  private baseUrl: string;
  private defaultTimeout: number;
  private accessToken: string | null = null;

  constructor(baseUrl: string = API_BASE_URL, timeout: number = API_TIMEOUT) {
    this.baseUrl = baseUrl;
    this.defaultTimeout = timeout;
    this.loadToken();
  }

  private loadToken(): void {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        this.accessToken = token;
      }
    } catch {
      // Silently fail if localStorage is not available
    }
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
    try {
      localStorage.setItem("accessToken", token);
    } catch {
      // Silently fail if localStorage is not available
    }
  }

  clearAccessToken(): void {
    this.accessToken = null;
    try {
      localStorage.removeItem("accessToken");
    } catch {
      // Silently fail if localStorage is not available
    }
  }

  private getHeaders(options?: FetchOptions): HeadersInit {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...((options?.headers as Record<string, string>) || {}),
    };

    if (this.accessToken && !headers.Authorization) {
      headers.Authorization = `Bearer ${this.accessToken}`;
    }

    return headers;
  }

  private async fetchWithTimeout(
    url: string,
    options: FetchOptions = {},
  ): Promise<Response> {
    const timeout = options.timeout || this.defaultTimeout;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      return await fetch(url, {
        ...options,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    try {
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: `HTTP_${response.status}`,
            message: data.message || `HTTP ${response.status}`,
          },
        };
      }

      return {
        success: true,
        data,
        metadata: {
          timestamp: new Date(),
          version: "1.0",
        },
      };
    } catch {
      return {
        success: false,
        error: {
          code: "PARSE_ERROR",
          message: "Failed to parse response",
        },
      };
    }
  }

  async get<T = any>(
    url: string,
    options?: FetchOptions,
  ): Promise<ApiResponse<T>> {
    const fullUrl = `${this.baseUrl}${url}`;
    const response = await this.fetchWithTimeout(fullUrl, {
      ...options,
      method: "GET",
      headers: this.getHeaders(options),
    });
    return this.handleResponse<T>(response);
  }

  async post<T = any>(
    url: string,
    data?: any,
    options?: FetchOptions,
  ): Promise<ApiResponse<T>> {
    const fullUrl = `${this.baseUrl}${url}`;
    const response = await this.fetchWithTimeout(fullUrl, {
      ...options,
      method: "POST",
      headers: this.getHeaders(options),
      body: data ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  async put<T = any>(
    url: string,
    data?: any,
    options?: FetchOptions,
  ): Promise<ApiResponse<T>> {
    const fullUrl = `${this.baseUrl}${url}`;
    const response = await this.fetchWithTimeout(fullUrl, {
      ...options,
      method: "PUT",
      headers: this.getHeaders(options),
      body: data ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  async patch<T = any>(
    url: string,
    data?: any,
    options?: FetchOptions,
  ): Promise<ApiResponse<T>> {
    const fullUrl = `${this.baseUrl}${url}`;
    const response = await this.fetchWithTimeout(fullUrl, {
      ...options,
      method: "PATCH",
      headers: this.getHeaders(options),
      body: data ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  async delete<T = any>(
    url: string,
    options?: FetchOptions,
  ): Promise<ApiResponse<T>> {
    const fullUrl = `${this.baseUrl}${url}`;
    const response = await this.fetchWithTimeout(fullUrl, {
      ...options,
      method: "DELETE",
      headers: this.getHeaders(options),
    });
    return this.handleResponse<T>(response);
  }
}

export const apiClient = new ApiClient();
