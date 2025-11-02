import { request } from "hepler/apiHelper";
import { ProductsManageApiType, ProductsManageType } from "types";

const useProductsManage = ():ProductsManageApiType => {
    const getAllProduct = async():Promise<ProductsManageType> => {
        try{
            const res = request<ProductsManageType>(
                `${import.meta.env.VITE_API_URL}/v2/admin/products`,
                {
                    method: "GET",
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            return res;
        }catch( err){
            throw(err);
        }
    }
    return {
        getAllProduct,
    }
}

export default useProductsManage;