import {
  BEFORE_NFT,
  GET_NFTS,
  GET_NFT,
  UPSERT_NFT,
  NFTALL,
  GET_NFTS_BY_COLLECTION,
  GET_MYLIKED_NFTS,
  GET_PROFILE_NFTS,
  GET_ACTIVITIES
} from "../../redux/types";

const initialState = {
  nftsData: {},
  nftAll: {},
  nftsAuth: false,
  upsertAuth: false,
  createNFTResult: [],
  createNFTerror: false,
  nftsByCollection: [],
  nftsByCollectionStatus: false,
  myLikedNfts: [],
  myLikedNftsStatus: false,
  profileNFTs: [],
  profileNFTsStatus: false,
  itemActivities:[],
  activitiesAuth:false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPSERT_NFT:
      return {
        ...state,
        nftsData: action.payload,
        upsertAuth: true,
      };
    case GET_NFT:
      return {
        ...state,
        nftsData: action.payload,
        nftsAuth: true,
      };
    case NFTALL:
      return {
        ...state,
        nftAll: action.payload,
      };

    case GET_NFTS:
      return {
        ...state,
        nftsData: action.payload,
        nftsAuth: true,
      };
    case BEFORE_NFT:
      return {
        ...state,
        nftsData: {},
        nftsAuth: false,
        upsertAuth: false,

        myLikedNfts: [],
        myLikedNftsStatus: false,
        profileNFTs: [],
        profileNFTsStatus: false,
        activitiesAuth:false,
      };

    case GET_NFTS_BY_COLLECTION:
      return {
        ...state,
        nftsByCollection: action.payload,
        nftsByCollectionStatus: true,
      };
    case GET_MYLIKED_NFTS:
      return {
        ...state,
        myLikedNfts: action.payload,
        myLikedNftsStatus: true,
      };
    case GET_PROFILE_NFTS:
      return {
        ...state,
        profileNFTs: action.payload,
        profileNFTsStatus: true,
      };
      case GET_ACTIVITIES:
        return {
          ...state,
          itemActivities:action.payload,
          activitiesAuth:true
        }

    default:
      return {
        ...state,
      };
  }
}
