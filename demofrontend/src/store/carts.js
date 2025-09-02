import { useReducer } from "react";
import { toast } from "react-toastify";

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
  if (action.type == actions.RESET_CART) {
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

    // Lưu giỏ hàng vào localStorage
    localStorage.setItem("cart", JSON.stringify({
      carts: result.data,
      items: result.items,
      cartQuantity: result.items.length,
    }));
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

      await getCarts();

      toast.success(request.message);
    } catch (error) {
      toast.error("Have a problem when you added item in cart.");
    }
  }

  const removeItemFromCart = async (id) => {
    console.log(id);
    try {
      const payload = {
        product_id: id,
      }
      const responne = await fetch(`${import.meta.env.VITE_API_URL}/v1/cart/remove`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });
      
      const request = await responne.json();
      if (request.error) {
        toast.error("Remove product have a problem.");
      } else {
        toast.success(request.message);
        await getCarts();
      }
    }catch (error){
      toast.error(error || "Have a problem with remove item from cart.");
    }
  }

  const resetCart = () => {
    dispatch({ type: actions.RESET_CART, carts: {}, items: [], cartQuantity: 0 });
  }

  const increaseQuantity = async (pro_id, quantity) => {
    const payload = {
      product_id: pro_id,
      quantity: quantity,
    }

    try{
      const respone = await fetch(`${import.meta.env.VITE_API_URL}/v1/cart/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const request = await respone.json();
      if(request.error){
        toast.error("Have a problem.");
      }else{
        getCarts();
        toast.success(request.message);
      }
    }catch(error){
      toast.error("Have a problem when you update item in cart.");
    }
  }

  const decreaseQuantity = async () => {

  }
  return { 
    state, 
    getCarts, 
    getProductById, 
    resetCart, 
    addProductToCart, 
    removeItemFromCart,
    increaseQuantity,
    decreaseQuantity,
   };
};

export default useCarts;
