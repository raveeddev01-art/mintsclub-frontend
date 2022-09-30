import { useContext } from "react";
import { handleRequest } from "../utils/functions";
import { useQuery } from "react-query";
import errorHandler from "../context/errorHandler/ErrorHandlerContext";

export const useGetUserDataById = (userId: any, onSuccess: any) => {
  const { setError } = useContext(errorHandler);
  return useQuery(
    ["userProfile", userId],
    () => handleRequest("get", `users/${userId}`),
    {
      onSuccess,
      refetchOnWindowFocus:false,
      // retryOnMount:false,
      // refetchOnMount:false,
      staleTime:0,
      cacheTime:0,
      onError: (error: any) => {
        setError(error);
      },
    }
  );
};
