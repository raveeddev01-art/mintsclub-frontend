import {useQuery} from "react-query";
import { handleRequest } from "../utils/functions";

export const useGetTopSellers=(onSuccess:any,qs?:any)=>{
    return useQuery(["TopSellers",qs],()=>handleRequest("get","users/top-sellers",null,qs),{onSuccess})
}