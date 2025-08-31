import { useReducer } from "react";
import localforage from "localforage";
import { toast } from "react-toastify";

const initialState = {
  products: [],
  quantity: 1,
};

const actions = Object.freeze({
  GET_PRODUCTS: "GET_PRODUCTS",
  INCREASE_QUANTITY: "INCREASE_QUANTITY",
  DECREASE_QUANTITY: "DECREASE_QUANTITY",
});

const reducer = (state, action) => {
  // GET PRODUCTS
  if (action.type == actions.GET_PRODUCTS) {
    return { ...state, products: action.products };
  }

  if (action.type == actions.INCREASE_QUANTITY) {
    return { ...state, quantity: state.quantity + 1 };
  }

  if (action.type == actions.DECREASE_QUANTITY) {
    return { ...state, quantity: state.quantity - 1 };
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

  const increaseQuantity = (product) => {
    if (state.quantity >= product.stock) {
      toast.error("Quantity must be less than stock");
      return;
    }
    dispatch({ type: actions.INCREASE_QUANTITY });
    return;
  };

  const decreaseQuantity = () => {
    if (state.quantity <= 1) {
      toast.error("Quantity must be greater than 0.");
      return;
    }
    dispatch({ type: actions.DECREASE_QUANTITY });
  }

  const addProductToCart = async (id, quantityProduct) => {
    const payload = {
      product_id: id,
      quantity: quantityProduct,
    };
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/cart/add`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const request = await response.json();

      localStorage.setItem("cart", JSON.stringify({
        carts: request.cart,
        items: request.items,
        cartQuantity: request.items.length,
      }));
      toast.success(request.message);
    } catch (error) {
      toast.error("Have a problem when you added item in cart.");
    }

  }

  return {
    state,
    getProducts,
    increaseQuantity,
    decreaseQuantity,
    addProductToCart,
  };
};

export default useProduct;
