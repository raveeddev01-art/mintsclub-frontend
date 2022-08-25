import  { useQuery } from "react-query";
import { handleRequest } from "../utils/functions";
import { ENV } from "../config/config";
export const useGetLiveAuctions=(categoryId:any,onSuccess:any)=>{
    const qs = ENV.objectToQueryString({
        myFilter: categoryId,
      });
return useQuery([`auctions${categoryId}`,categoryId],()=>handleRequest("get","auctions/live",null,qs),{onSuccess})
}