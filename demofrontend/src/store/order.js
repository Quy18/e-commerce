import { useReducer } from "react";
import { toast } from "react-toastify";


const initialState = {
    orders: [],
};

const actions = Object.freeze({
    GET_ORDERS: "GET_ORDERS",
});

const reducer = (state, action) => {
    if (action.type == actions.GET_ORDERS) {
        return { ...state, orders: action.orders };
    }
    return state;
};

const useOrder = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getOrders = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/orders`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            })
            const request = await response.json();
            if (request.error) {
                toast.error("Have a problem when you call api.");
            } else {
                dispatch({ type: actions.GET_ORDERS, orders: request.data });
            }
        } catch (error) {
            toast.error("Have a problem");
        }
    };

    const createOrder = async (cartId, deliveryType, totalPayment) => {
        const payload = {
            cart_id: cartId,
            shipping_method: deliveryType.toLowerCase(),
            total_payment: totalPayment,
        }
        
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/orders/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(payload),
            })
            const request = await response.json();
            if (request.error) {
                toast.error("Have a problem when you call api");
                return { success: false, ...request };
            } else {
                toast.success(request.message);
                return { success: true, ...request };
            }
        } catch (error) {
            toast.error("Have a problem");
            return { success: false, error };
        }
    }

    const getItemFromOrder = async (orders_id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/orders/${orders_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const request = await response.json();
            if(request.error){
                toast.error("Call api have problem.");
                return null;
            }
            return request.data.items;
        } catch (error) {
            toast.error("Have a problem.");
            return null;
        }
    }
    return {
        state,
        createOrder,
        getOrders,
        getItemFromOrder,
    };
};

export default useOrder;