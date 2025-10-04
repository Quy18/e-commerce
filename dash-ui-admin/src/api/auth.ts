// src/api/auth.ts
import { useState } from "react";
import { ApiError } from "../types";
import {
  LoginRequest,
  RegisterRequest,
  User,
  AuthContextType,
} from "../types";
import {
  saveAdminToLocalStorage,
  removeAdminFromLocalStorage,
  saveTokenToLocalStorage,
  removeTokenFromLocalStorage
} from "../hepler/localStorageHelper";
import { request} from "../hepler/apiHelper";

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
      saveTokenToLocalStorage(res.token);
      saveAdminToLocalStorage(res.user);
    } catch (err) {
      throw err;
    }
  };

  // Đăng ký
  // const registerUser = async (data: RegisterRequest) => {
  //   const res = await request<{ token: string; user: User }>(
  //     `${import.meta.env.VITE_API_URL}/auth/register`,
  //     {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //     }
  //   );
  //   setUser(res.user);
  //   setToken(res.token);
  //   localStorage.setItem("token", res.token);
  // };

  // Đăng xuất
  const logoutUser = async () => {
    try {
      await request(
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
      removeTokenFromLocalStorage();
      removeAdminFromLocalStorage();
    }catch(err){
      throw err;
    }
  };

  return { 
    user, 
    token, 
    loginUser, 
    // registerUser, 
    logoutUser };
};

export default useAuth;
