import { handleRequest } from "../utils/functions";
import { ENV } from "../config/config";
import  { useQuery } from "react-query";


export const useGetCollections=(onSuccess:any,qs:any)=>{
    return useQuery(["exploreCCollections"])
}