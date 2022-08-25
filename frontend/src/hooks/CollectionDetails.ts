import { handleRequest } from "../utils/functions";
import { useQuery } from "@tanstack/react-query";
import { ENV } from "../config/config";
import { useLocation } from "react-router-dom";


export const useGetMyLikedNFTs=(qs:any,onSuccess:any)=>{

    return useQuery(['myLikedNFTs'],()=>handleRequest("get", "nftLikes/userNftLikes",null,qs),{onSuccess})
}

export const useGetNFTs=(filter:any,onSuccess:any)=>{
    const location: any = useLocation();

        let nftQS: any = {};
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
      nftQS.collectionId = location.state._id;
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
        nftQS.limit = 10;
      }
    }
    const qs = ENV.objectToQueryString(nftQS);
    return useQuery(["NFTs"],()=>handleRequest("get", "nftLikes/userNftLikes",null,qs),{onSuccess})
}