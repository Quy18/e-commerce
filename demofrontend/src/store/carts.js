import { useReducer } from "react";

const initialState = {
  carts: {},
  items: [],
  cartQuantity: 0,
};

const actions = Object.freeze({
  GET_CARTS: "GET_CARTS",
});

const reducer = (state, action) => {
  if (action.type == actions.GET_CARTS) {
    return { ...state, carts: action.carts, };
  }

  return state;
};

const useCarts = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCarts = async (user_id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/cart`,
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
    dispatch({ type: actions.GET_CARTS, carts: result.data });
    return data.orders;
  };

  const setOrderToBeCanceled = (order_id) => {
    dispatch({ type: actions.GET_ORDER_TO_BE_CANCELED, order_id });
  };

  const cancelOrder = async (order_id) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/cancel-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({ order_id }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return data.error;
    }

    dispatch({ type: actions.GET_ORDER_TO_BE_CANCELED, order_id: null });
    getOrders(data.user_id);

    return data;
  };

  return { state, getCarts, setOrderToBeCanceled, cancelOrder };
};

export default useCarts;
