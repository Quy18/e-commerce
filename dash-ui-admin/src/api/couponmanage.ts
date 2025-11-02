import { request } from "hepler/apiHelper"
import { CouponsManageApiType, CouponsManageType } from "types"


const useCouponManage = ():CouponsManageApiType => {
    const getAllCoupon = async():Promise<CouponsManageType> => {
        const res = request<CouponsManageType>(
            `${import.meta.env.VITE_API_URL}/v2/admin/coupons`,
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
        getAllCoupon,
    }
}

export default useCouponManage;