import { ApiResponse } from "@/types";

/**
 * Base API URL
 */
const API_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/**
 * Generic fetch wrapper
 */
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}/api${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.error || "An error occurred",
      };
    }

    return { data };
  } catch (error) {
    console.error("API Error:", error);
    return {
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * GET request
 */
export async function get<T>(endpoint: string): Promise<ApiResponse<T>> {
  return fetchApi<T>(endpoint, { method: "GET" });
}

/**
 * POST request
 */
export async function post<T>(
  endpoint: string,
  data: unknown
): Promise<ApiResponse<T>> {
  return fetchApi<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * PUT request
 */
export async function put<T>(
  endpoint: string,
  data: unknown
): Promise<ApiResponse<T>> {
  return fetchApi<T>(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * DELETE request
 */
export async function del<T>(endpoint: string): Promise<ApiResponse<T>> {
  return fetchApi<T>(endpoint, { method: "DELETE" });
}

/**
 * Upload file
 */
export async function uploadFile(
  endpoint: string,
  file: File
): Promise<ApiResponse<{ url: string; path: string }>> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/api${endpoint}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.error || "Upload failed",
      };
    }

    return { data };
  } catch (error) {
    console.error("Upload Error:", error);
    return {
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}
