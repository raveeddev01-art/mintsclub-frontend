import { useContext } from 'react';
import { useQuery } from 'react-query';
import { handleRequest } from '../utils/functions';
import { ENV } from '../config/config';
import errorHandler from '../context/errorHandler/ErrorHandlerContext';

export const useGetLiveAuctions = (categoryId: any, onSuccess: any) => {
  const { setError } = useContext(errorHandler);
  const qs = ENV.objectToQueryString({
    myFilter: categoryId,
  });
  return useQuery(
    [`auctions${categoryId}`, categoryId],
    () => handleRequest('get', 'auctions/live', null, qs),
    {
      onSuccess,
      onError: (error: any) => {
        setError(error);
      },
    }
  );
};
