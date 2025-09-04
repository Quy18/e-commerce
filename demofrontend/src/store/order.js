import { useReducer } from "react";
import { toast } from "react-toastify";


const initialState = {
    
};

const actions = Object.freeze({

});

const reducer = (state, action) => {

};

const useOrder = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const createOrder = async (cartId) => {
        const payload = {
            cart_id: cartId,
        }
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/orders/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(payload),
            })
            const request = await response.json();
            if(request.error){
                toast.error("Have a problem when you call api");
                return { success: false, ...request };
            }else{
                toast.success(request.message);
                return { success: true, ...request }; 
            }
        }catch(error){
            toast.error("Have a problem");
            return { success: false, error }; 
        }
    }

    return {
        state,
        createOrder,
    };
};

export default useOrder;