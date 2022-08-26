import {useQuery} from "react-query";
import { handleRequest } from "../utils/functions";

export const useGetTopSellers=(onSuccess:any,qs?:any)=>{
    return useQuery(["TopSellers"],()=>handleRequest("get","users/top-sellers"),{onSuccess})
}