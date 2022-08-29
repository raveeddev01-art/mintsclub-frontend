import { handleRequest } from "../utils/functions";
import  { useQuery } from "react-query";

export const useGetUserDataById=(userId:any,onSuccess:any)=>{
    return useQuery(["userProfile"],()=>handleRequest("get", `users/${userId}`),{onSuccess})
}

