export interface CollectionDetailInt {
  toggleLikeDislike: (body: any) => void;
  beforeTogleLikeDislike: () => void;
  getMyLikedNfts: (qs: any) => void;
  myLikedNftsStatus: boolean;
  myLikedNfts: Array<any>;
  nftsAuth: boolean;
  nfts: Array<object>;
  pagination: object;
  togleLikeRes: boolean;
  beforeNFT: () => void;
  getNFTs: (qs: any) => void;
}
