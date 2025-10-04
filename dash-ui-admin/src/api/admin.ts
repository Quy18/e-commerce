import { useState } from "react";
import { UserApiType, User } from "types";
import { request } from "hepler/apiHelper";


const useAdmin = (): UserApiType => {
    const [ user, setUser] = useState<User | null>(null);

    const updateUser = async() => {
        try{
            // viết call api update admin
            const res = await request<{ user : User}>(
                `${import.meta.env.VITE_API_URL}/v2/admin/update`,
                {
                    method: "POST",
                    body: JSON.stringify(""),
                }
            );
        }catch(err){

        }
    }
    return {
        user,
        updateUser
    };
}

export default useAdmin;