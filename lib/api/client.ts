import { ApiError } from "./errors";

export interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

export async function fetchApi<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers, ...restOptions } = options;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  let url = `${baseUrl}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...headers,
  };

  try {
    const response = await fetch(url, {
      headers: defaultHeaders,
      ...restOptions,
    });

    if (!response.ok) {
      let errorData = {};
      try {
        errorData = await response.json();
      } catch {
        // Ignore parsing errors for empty or non-JSON payloads
      }
      throw new ApiError(response.status, errorData, response.statusText);
    }

    if (response.status === 204) {
      return {} as T;
    }

    const text = await response.text();
    if (!text) {
      return {} as T;
    }

    return JSON.parse(text) as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Convert native fetch network errors safely
    throw new ApiError(0, { message: (error as Error).message }, "Network Error");
  }
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    fetchApi<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    fetchApi<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    fetchApi<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    fetchApi<T>(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T>(endpoint: string, options?: RequestOptions) =>
    fetchApi<T>(endpoint, { ...options, method: 'DELETE' }),
};
