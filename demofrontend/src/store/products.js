import { useReducer } from "react";
import localforage from "localforage";
import { toast } from "react-toastify";

const initialState = {
  products: [],
};

const actions = Object.freeze({
  GET_PRODUCTS: "GET_PRODUCTS",
});

const reducer = (state, action) => {
  // GET PRODUCTS
  if (action.type == actions.GET_PRODUCTS) {
    return { ...state, products: action.products };
  }
};

const useProduct = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.error) {
        toast.error(result.error);
      } else {
        dispatch({ type: actions.GET_PRODUCTS, products: result.data });
      }
    } catch (error) {
      toast.error("Get product was problem.");
    }
  };

  return {
    state,
    getProducts,
  };
};

export default useProduct;
