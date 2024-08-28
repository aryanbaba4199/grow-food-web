
import { getUserApi } from "@/Api";
import axios from "axios";

export const getUserDetails = (id)=>{
    try{
        const res = axios.get(`${getUserApi}/${id}`);
        if(res.status===200){
            
            return {status : true, data : res.data};
        }else{
            return {status : false, data : res.data};
        }
    }catch(err){
        return {status : false, data : err.data};
    }
}