import { ApiError } from "types";

export const request = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    throw {
      message: `API Error: ${res.status} ${res.statusText}`,
      status: res.status,
      statusText: res.statusText
    } as ApiError;
  }

  return res.json();
};