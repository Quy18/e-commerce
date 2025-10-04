import { useState } from "react";
import { UserApiType, User, UserResponeUpdate } from "types";
import { saveAdminToLocalStorage } from "hepler/localStorageHelper";

const useAdmin = (): UserApiType => {
    const [ user, setUser] = useState<User | null>(null);

    const updateUser = async(data: FormData) => {
        try{
            // viết call api update admin
            const res = await fetch(`${import.meta.env.VITE_API_URL}/v2/admin/update`, {
                method: "POST",
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                },
                body: data,
            });
            const resuft:UserResponeUpdate = await res.json();
            setUser(resuft.user);
            saveAdminToLocalStorage(resuft.user);
        }catch(err){
            throw err;
        }
    }
    return {
        user,
        updateUser
    };
}

export default useAdmin;