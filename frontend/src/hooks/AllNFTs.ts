import {useContext } from "react";
import { handleRequest } from "../utils/functions";
import  { useQuery } from "react-query";
import errorHandler from "../context/errorHandler/ErrorHandlerContext";

export const useGetCollections=(onSuccess:any)=>{
  const {setError } = useContext(errorHandler);

    return useQuery(["AllCollections"], () => handleRequest("get", "collection/list"),{
        onSuccess,
        onError:(error:any)=>{
            setError(error)
        },
        refetchOnWindowFocus: false,
    })
}