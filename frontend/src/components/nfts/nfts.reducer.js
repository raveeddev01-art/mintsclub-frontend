import {
  BEFORE_NFT,
  GET_NFTS,
  GET_NFT,
  UPSERT_NFT,
  NFTALL,
  GET_NFTS_BY_COLLECTION,
  GET_MYLIKED_NFTS,
  GET_PROFILE_NFTS,
  GET_ACTIVITIES,
  GET_ITEM_LISTING,
  BEFORE_NFTS_BY_COLLECTION,
  CREATE_NFT_AUTH
} from "../../redux/types";

const initialState = {
  nftsData: {},
  nftAll: {},
  nftsAuth: false,
  createNFTauth:false,
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
  itemsListing:[],
  itemsListingAuth:false,
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
      case  CREATE_NFT_AUTH:
        return {
          ...state,
          createNFTauth:true,
        }
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
        itemsListingAuth:false,
        createNFTauth:false
      };

    case GET_NFTS_BY_COLLECTION:
      return {
        ...state,
        nftsByCollection: action.payload,
        nftsByCollectionStatus: true,
      };
      case BEFORE_NFTS_BY_COLLECTION:
        return {
          ...state,
          nftsByCollectionStatus: false,
        }
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
        case GET_ITEM_LISTING:
          return {
            ...state,
            itemsListing:action.payload,
            itemsListingAuth:true,
          }

    default:
      return {
        ...state,
      };
  }
}
