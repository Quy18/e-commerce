import { useReducer } from "react";

const initialState = {
  carts: {},
  items: [],
  cartQuantity: 0,
};

const actions = Object.freeze({
  GET_CARTS: "GET_CARTS",
  RESET_CART: "RESET_CART",
});

const reducer = (state, action) => {
  if (action.type == actions.GET_CARTS) {
    return { ...state, carts: action.carts, items: action.items, cartQuantity: action.cartQuantity };
  }
  if ( action.type == actions.RESET_CART) {
    return { ...state, carts: action.carts, items: action.items, cartQuantity: action.cartQuantity };
  }
  return state;
};

const useCarts = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCarts = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/cart`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const result = await response.json();
    if (result.error) {
      return result.error;
    }
    dispatch({ type: actions.GET_CARTS, carts: result.data, items: result.items, cartQuantity: result.items.length });
  };

  const getProductById = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/products/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.error) {
        return toast.error(result.error);
      } else {
        return result.data;
      }
    } catch (error) {
      toast.error("Get product_by_id was problem.")
    }
  }

  const resetCart = () => {
    dispatch({ type: actions.RESET_CART, carts: {}, items: [], cartQuantity: 0 });
  }
  return { state, getCarts, getProductById, resetCart };
};

export default useCarts;
