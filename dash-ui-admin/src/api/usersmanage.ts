import { request } from "hepler/apiHelper";
import { UserItemType, UsersManageApiType, UserManageType } from "types";

const useUsersManage = ():UsersManageApiType => {
    const getAllUser = async():Promise<UserManageType> => {
        try{
            const res = request<UserManageType>(
                `${import.meta.env.VITE_API_URL}/v2/admin/users`,
                {
                    method: "GET",
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            return res;
        }catch(err){
            throw err;
        }
    }
    return {
        getAllUser
    }
}

export default useUsersManage;