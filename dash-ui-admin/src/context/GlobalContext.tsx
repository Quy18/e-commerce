// src/context/GlobalContext.tsx
import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import useAuth from "../api/auth";
import { GlobalContextType, StatType } from "../types";
import useUsersManage from "api/usersmanage";
import useStat from "api/stat";

// Tạo Context
const GlobalContext = createContext<GlobalContextType | null>(null);

// Hook để sử dụng context
export const useGlobalContext = (): GlobalContextType => {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error("useGlobalContext must be used inside GlobalContextProvider");
  return ctx;
};

// Provider
const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth(); // hook trả về { user, token, loginUser, registerUser, logoutUser }
  const {getStats} = useStat();
  const [stat, setStat] = useState<StatType | null>(null);

  useEffect(() => {
    const fetchStat = async () => {
      try{
        const res = await getStats();
        setStat(res);
      }catch(err){
        console.error("Failed to load stats:", err);
      }
    }
    fetchStat();
  },[]);
  
  return (
    <GlobalContext.Provider value={{auth, stat}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
