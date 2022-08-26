
import { handleRequest } from "../utils/functions";
// import { useQuery } from "@tanstack/react-query";
import  { useQuery } from "react-query";

import { ENV } from "../config/config";
import axios from 'axios';

export const useGetCategories=(onError:any,onSuccess:any)=>{
  return   useQuery(["getCategories"], () => handleRequest("get", "category/list"), {
        onSuccess,
        refetchOnWindowFocus: false,
      });
}
export const useGetPopularCollections=(onError:any,onSuccess:any,categoryId:string,limit?:number)=>{
    const getPopularCollections = async () => {
        const qs = ENV.objectToQueryString({
          myFilter: categoryId,
          ...limit&&{limit}
          // limit: limit ? limit : false,
        });
        const result = await axios.get(`${ENV.url}collection/popular?${qs}`);
        return result;
      };
    
  return   useQuery(["popularCollections",categoryId], () => getPopularCollections(), {
        staleTime: 5000000,
        onSuccess,
        onError,
      });
}
