import { useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { handleRequest } from "../utils/functions";
import errorHandler from "../context/errorHandler/ErrorHandlerContext";

export const useInsertData = (url: any, onSuccess: any, onError?: any) => {
  const { setError } = useContext(errorHandler);
  // console.log("inserting data")
  return useMutation(
    (paylaod: any) => handleRequest("post", url, paylaod ? paylaod : null),
    {
      onSuccess,
      onError: (error: any) => {
        setError(error);
      },
    }
  );
};

export const useEditData = (url: any, onSuccess?: any, onError?: any) => {
  const { setError } = useContext(errorHandler);
  return useMutation((paylaod: any) => handleRequest("put", url, paylaod), {
    onSuccess,
    onError: (error: any) => {
      setError(error);
    },
  });
};

export const useGetData = (
  key: any,
  url: any,
  qs: any,
  onSuccess: any,
  onError?: any
) => {
  const { setError } = useContext(errorHandler);
  //   console.log(qs,"qs")
  return useQuery([key,qs&&qs], () => handleRequest("get", url,null,qs), {
    onSuccess,
    onError: (error: any) => {
      setError(error);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
