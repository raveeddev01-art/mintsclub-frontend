import { useContext } from "react";
import { handleRequest } from "../utils/functions";
import { useQuery } from "react-query";
import { ENV } from "../config/config";
import axios from "axios";
import errorHandler from "../context/errorHandler/ErrorHandlerContext";

export const useGetCategories = (onError: any, onSuccess: any) => {
  const { setError } = useContext(errorHandler);

  return useQuery(
    ["getCategories"],
    () => handleRequest("get", "category/list"),
    {
      onSuccess,
      onError: (error: any) => {
        setError(error);
      },
      refetchOnWindowFocus: false,
    }
  );
};
export const useGetPopularCollections = (
  onError: any,
  onSuccess: any,
  categoryId: string,
  limit?: number
) => {
  const { setError } = useContext(errorHandler);

  const getPopularCollections = async () => {
    const qs = ENV.objectToQueryString({
      myFilter: categoryId,
      ...(limit && { limit }),
    });
    const result = await axios.get(`${ENV.url}collection/popular?${qs}`);
    return result;
  };

  return useQuery(
    ["popularCollections", categoryId],
    () => getPopularCollections(),
    {
      staleTime: 5000000,
      onSuccess,
      onError: (error: any) => {
        setError(error);
      },
    }
  );
};
