// src/api/auth.ts
import { useState } from "react";
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
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

// ---- Hook useAuth ----
const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Đăng nhập
  const loginUser = async (data: LoginRequest) => {
    const res = await request<{ token: string; user: User }>(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    setUser(res.user);
    setToken(res.token);
    localStorage.setItem("token", res.token);
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
  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return { user, token, loginUser, registerUser, logoutUser };
};

export default useAuth;
