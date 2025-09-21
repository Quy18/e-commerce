// src/context/GlobalContext.tsx
import { createContext, useContext, ReactNode } from "react";
import useAuth from "../api/auth";
import { AuthContextType } from "../types";

// Tạo Context
const globalContext = createContext<AuthContextType | null>(null);

// Hook để sử dụng context
export const useGlobalContext = (): AuthContextType => {
  const ctx = useContext(globalContext);
  if (!ctx) throw new Error("useGlobalContext must be used inside GlobalContextProvider");
  return ctx;
};

// Provider
const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth(); // hook trả về { user, token, loginUser, registerUser, logoutUser }

  return (
    <globalContext.Provider value={auth}>
      {children}
    </globalContext.Provider>
  );
};

export default GlobalContextProvider;
