import { useContext } from "react";
import { useQuery } from "react-query";
import { handleRequest } from "../utils/functions";
import { ENV } from "../config/config";
import errorHandler from "../context/errorHandler/ErrorHandlerContext";

export const GetLiveAuctions = (onSuccess: any,onError?: any) => {
  const { setError } = useContext(errorHandler);
  const qs = ENV.objectToQueryString({
    myFilter: "all",
  });
  return useQuery(
    ['liveAuctions'],
    () => handleRequest("get", "auctions/live", null, qs),
    {
      onSuccess,
      onError: (error: any) => {
        setError(error);
      },
    }
  );
};
