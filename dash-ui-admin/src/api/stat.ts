import { request } from "hepler/apiHelper";
import { StatApiType, StatType } from "types";

const useStat = ():StatApiType => {

    const getStats = async(): Promise<StatType> => {
        const res = request<StatType>(
            `${import.meta.env.VITE_API_URL}/v2/admin/stats`,
            {
                method : "GET",
                headers : {
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            }
        );
        return res;
    }
    return {
        getStats,
    }
}

export default useStat;