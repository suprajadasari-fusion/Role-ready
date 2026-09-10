import { API_BASE_URL, API_ENDPOINTS } from '../config/api';
import { RefreshTokenResponse } from '../types/auth.types';

// In-memory token cache for performance
let inMemoryAccessToken: string | null = null;
let inMemoryRefreshToken: string | null = null;
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

export function getAccessToken(): string | null {
  if (inMemoryAccessToken) return inMemoryAccessToken;
  if (typeof window !== 'undefined') {
    return localStorage.getItem('rr_access_token') || sessionStorage.getItem('rr_access_token');
  }
  return null;
}

export function getRefreshToken(): string | null {
  if (inMemoryRefreshToken) return inMemoryRefreshToken;
  if (typeof window !== 'undefined') {
    return localStorage.getItem('rr_refresh_token') || sessionStorage.getItem('rr_refresh_token');
  }
  return null;
}

export function setTokens(accessToken: string, refreshToken?: string) {
  inMemoryAccessToken = accessToken;
  if (refreshToken) inMemoryRefreshToken = refreshToken;

  if (typeof window !== 'undefined') {
    localStorage.setItem('rr_access_token', accessToken);
    sessionStorage.setItem('rr_access_token', accessToken);
    if (refreshToken) {
      localStorage.setItem('rr_refresh_token', refreshToken);
      sessionStorage.setItem('rr_refresh_token', refreshToken);
    }
  }
}

export function clearTokens() {
  inMemoryAccessToken = null;
  inMemoryRefreshToken = null;
  refreshSubscribers = [];

  if (typeof window !== 'undefined') {
    localStorage.removeItem('rr_access_token');
    localStorage.removeItem('rr_refresh_token');
    sessionStorage.removeItem('rr_access_token');
    sessionStorage.removeItem('rr_refresh_token');
    localStorage.removeItem('rr_user');
    sessionStorage.removeItem('rr_user');
  }
}

export interface ApiClientOptions extends RequestInit {
  skipAuth?: boolean;
}

/**
 * Perform token refresh using POST /api/v1/auth/refresh
 */
async function refreshAccessToken(): Promise<string> {
  const currentRefreshToken = getRefreshToken();
  if (!currentRefreshToken) {
    throw new Error('No refresh token available');
  }

  const url = `${API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-refresh-token': currentRefreshToken
    },
    body: JSON.stringify({ refreshToken: currentRefreshToken })
  });

  const data: RefreshTokenResponse = await response.json();

  if (!response.ok || !data.success || !data.data?.accessToken) {
    clearTokens();
    if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
    throw new Error(data.message || 'Token refresh failed');
  }

  setTokens(data.data.accessToken, data.data.refreshToken);
  return data.data.accessToken;
}

export async function tryRefreshToken(): Promise<string | null> {
  const currentRefreshToken = getRefreshToken();
  if (!currentRefreshToken) return null;
  try {
    return await refreshAccessToken();
  } catch {
    return null;
  }
}

/**
 * Centralized API Client
 * - Handles Authorization header injection
 * - Handles multipart/form-data boundary preservation
 * - Intercepts 401s, rotates tokens via refresh, retries request
 * - Prevents infinite refresh loops
 */
export async function apiClient<T = any>(
  endpoint: string,
  options: ApiClientOptions = {}
): Promise<T> {
  const token = getAccessToken();
  const headers = new Headers(options.headers || {});

  // Attach Bearer token if not explicitly skipped
  if (token && !options.skipAuth && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Set application/json only if body is NOT FormData and not already set
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  let res = await fetch(url, {
    ...options,
    headers
  });

  // Intercept 401 Unauthorized for token refresh and retry
  if (res.status === 401 && !options.skipAuth && getRefreshToken()) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const newAccessToken = await refreshAccessToken();
        isRefreshing = false;
        onRefreshed(newAccessToken);

        // Retry original request with new token
        headers.set('Authorization', `Bearer ${newAccessToken}`);
        res = await fetch(url, {
          ...options,
          headers
        });
      } catch (refreshErr) {
        isRefreshing = false;
        clearTokens();
        if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        throw refreshErr;
      }
    } else {
      // If refresh is already in progress, wait for completion then retry
      const retryPromise = new Promise<Response>((resolve, reject) => {
        subscribeTokenRefresh(async (newToken: string) => {
          try {
            headers.set('Authorization', `Bearer ${newToken}`);
            const retryRes = await fetch(url, {
              ...options,
              headers
            });
            resolve(retryRes);
          } catch (err) {
            reject(err);
          }
        });
      });
      res = await retryPromise;
    }
  }

  const contentType = res.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    const errorMsg = data?.message || data?.error || `API Request failed with status ${res.status}`;
    const error: any = new Error(errorMsg);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data as T;
}
