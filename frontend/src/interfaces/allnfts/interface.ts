import {Location} from "./types"

export interface ALLNFTINT {
    getCreators:()=>void,
    getCollections:()=>void,
    location:Location,
    beforeNFT:()=>void,
    getNFTs:(searchQs:any)=>void,
    getMyLikedNfts:(qs:any)=>void,
    myLikedNftsStatus:boolean,
    myLikedNfts:any[],
    nft:any,
    getAuth:boolean,
    collections:any[],
    beforeCollection:()=>void,
    togleLikeRes:boolean,
    beforeTogleLikeDislike:()=>void
    connectedAddress:string,
    toggleLikeDislike:(body:object)=>void,
}

