import { useContext } from 'react';
import { handleRequest } from '../utils/functions';
import { useQuery, useMutation } from 'react-query';
import errorHandler from '../context/errorHandler/ErrorHandlerContext';
import { ENV } from '../config/config';

export const useGetCollections = (onSuccess: any, enabled?: any, qs?: any) => {
  const { setError } = useContext(errorHandler);

  return useQuery(
    ['AllCollections', qs && qs],
    () => handleRequest('get', 'collection/list', null, qs),
    {
      onSuccess,
      enabled,
      onError: (error: any) => {
        setError(error);
      },
      refetchOnWindowFocus: false,
    }
  );
};

export const useGetNFTs = (filter: any, onSuccess: any, defaultLimit: any) => {
  const nftQS: any = {};
  if (filter) {
    const {
      page,
      limit,
      categoryId,
      collectionId,
      oldest,
      lowToHigh,
      highToLow,
      newest,
      buy,
      auction,
      latest,
      gtePrice,
      ltePrice,
      keyword,
    } = filter;
    if (collectionId) nftQS.collectionId = collectionId;
    if (gtePrice) nftQS.gtePrice = gtePrice;
    if (ltePrice) nftQS.ltePrice = ltePrice;
    if (categoryId) nftQS.categoryId = categoryId;
    if (oldest) nftQS.oldest = oldest;
    if (lowToHigh) nftQS.lowToHigh = lowToHigh;
    if (highToLow) nftQS.highToLow = highToLow;
    if (newest) nftQS.newest = newest;
    if (keyword) nftQS.keyword = keyword;
    if (buy) nftQS.buy = buy;
    if (auction) nftQS.auction = auction;
    if (latest) nftQS.latest = latest;
    if (page) {
      nftQS.page = page;
    } else {
      nftQS.page = 1;
    }
    if (limit) {
      nftQS.limit = limit;
    } else {
      nftQS.limit = defaultLimit;
    }
  }
  const qs = ENV.objectToQueryString(nftQS);
  return useQuery(
    ['nfts', nftQS],
    () => handleRequest('get', 'nfts/list', null, qs),
    { onSuccess }
  );
};

export const useGetNFTbyId = (nftId: any, onSuccess: any) => {
  return useQuery(
    ['getNFTById'],
    () => handleRequest('get', `nfts/get/${nftId}`),
    { onSuccess }
  );
};
