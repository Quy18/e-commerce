// src/context/GlobalContext.tsx
import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import useAuth from "../api/auth";
import { GlobalContextType, StatType } from "../types";
import useStat from "api/stat";
import echo from "utils/echo";

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
    // fetch lần đầu
    const fetchStat = async () => {
      try{
        const res = await getStats();
        setStat(res);
      }catch(err){
        console.error("Failed to load stats:", err);
      }
    };
    fetchStat();

    // Lắng nghe realtime
    echo.channel("stats").listen(".StatsUpdated", (e: any) => {
      // e.stats được viết giống trong StatsUpdated bên backend
      setStat(e.stats);
    });

    return () => {
      echo.leave("stats");
    };
  },[]);
  
  return (
    <GlobalContext.Provider value={{auth, stat}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
