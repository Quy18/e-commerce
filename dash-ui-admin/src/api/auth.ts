// src/api/auth.ts
import { useState } from "react";
import { ApiError } from "../types";
import {
  LoginRequest,
  RegisterRequest,
  User,
  AuthContextType,
} from "../types";

// Hàm tiện ích để gọi API
const request = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
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

// ---- Hook useAuth ----
const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Đăng nhập
  const loginUser = async (data: LoginRequest) => {
    try {
      const res = await request<{ token: string; user: User }>(
        `${import.meta.env.VITE_API_URL}/v2/admin/login`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem("token", res.token);
    } catch (err) {
      throw err;
    }
  };

  // Đăng ký
  const registerUser = async (data: RegisterRequest) => {
    const res = await request<{ token: string; user: User }>(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    setUser(res.user);
    setToken(res.token);
    localStorage.setItem("token", res.token);
  };

  // Đăng xuất
  const logoutUser = async () => {
    try {
      await request<{ token: string; user: User }>(
        `${import.meta.env.VITE_API_URL}/v2/admin/logout`,
        {
          method: "POST",
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    }catch(err){
      throw err;
    }
  };

  return { user, token, loginUser, registerUser, logoutUser };
};

export default useAuth;
