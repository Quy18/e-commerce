import { createContext, useContext } from "react";
import useProduct from "../../store/products";
import useAuth from "../../store/auth";
import useModal from "../../store/modal";
import useCarts from "../../store/carts";
import useOrder from "../../store/order";

const globalContext = createContext();

export const useGlobalContext = () => useContext(globalContext);

const GlobalContext = ({ children }) => {
  const store = useProduct();
  const auth = useAuth();
  const modal = useModal();
  const cart = useCarts();
  const order = useOrder();
  return (
    <globalContext.Provider value={{ store, auth, modal, cart, order }}>
      {children}
    </globalContext.Provider>
  );
};
export default GlobalContext;
