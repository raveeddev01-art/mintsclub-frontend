import { useContext } from 'react';
import { useQuery } from 'react-query';
import { handleRequest } from '../utils/functions';
import errorHandler from '../context/errorHandler/ErrorHandlerContext';

export const useGetTopSellers = (onSuccess: any, qs?: any) => {
  const { setError } = useContext(errorHandler);
  return useQuery(
    ['TopSellers', qs],
    () => handleRequest('get', 'users/top-sellers', null, qs),
    {
      onSuccess,
      onError: (error: any) => {
        setError(error);
      },
    }
  );
};
