import { createContext, useContext } from "react";
import useProduct from "../../store/products";
import useAuth from "../../store/auth";
import useModal from "../../store/modal";
import useCarts from "../../store/carts";

const globalContext = createContext();

export const useGlobalContext = () => useContext(globalContext);

const GlobalContext = ({ children }) => {
  const store = useProduct();
  const auth = useAuth();
  const modal = useModal();
  const carts = useCarts();
  return (
    <globalContext.Provider value={{ store, auth, modal, carts }}>
      {children}
    </globalContext.Provider>
  );
};
export default GlobalContext;
