import { handleRequest } from "../utils/functions";
import  { useQuery } from "react-query";

export const useGetCollections=(onSuccess:any)=>{
    return useQuery(["AllCollections"], () => handleRequest("get", "collection/list"),{
        onSuccess,
        refetchOnWindowFocus: false,
    })
}