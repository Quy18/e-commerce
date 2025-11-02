import { OrdersManageApiType, OrdersManageType } from "types";
import { request } from "hepler/apiHelper";

const useOrdersManage = ():OrdersManageApiType => {
    const getAllOrder = async():Promise<OrdersManageType> => {
        const res = await request<OrdersManageType>(
            `${import.meta.env.VITE_API_URL}/v2/admin/orders`,
                {
                    method: "GET",
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`
                    }
                }
        );
        return res;
    }
    return {
        getAllOrder,
    }
}

export default useOrdersManage;