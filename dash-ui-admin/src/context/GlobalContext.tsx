// src/context/GlobalContext.tsx
import { createContext, useContext, ReactNode } from "react";
import useAuth from "../api/auth";
import { AuthContextType } from "../types";

// Tạo Context
const GlobalContext = createContext<AuthContextType | null>(null);

// Hook để sử dụng context
export const useGlobalContext = (): AuthContextType => {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error("useGlobalContext must be used inside GlobalContextProvider");
  return ctx;
};

// Provider
const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth(); // hook trả về { user, token, loginUser, registerUser, logoutUser }

  return (
    <GlobalContext.Provider value={auth}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
