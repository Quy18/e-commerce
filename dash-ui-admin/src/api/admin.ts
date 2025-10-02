import { useState } from "react";
import { UserApiType, User } from "types"


const useAdmin = (): UserApiType => {
    const [ user, setUser] = useState<User | null>(null);

    const updateUser = async() => {
        try{
            
        }catch(err){

        }
    }
    return {
        user,
        updateUser
    };
}

export default useAdmin;