import { combineReducers } from "redux";
import homeReducer from "./../components/home/home.reducer";
import auctionReducer from "./../components/auctions/auctions.reducer";
import nftReducer from "./../components/nfts/nfts.reducer";
import userReducer from "./../components/user/user.reducer";
import walletReducer from "./../components/wallet/wallet.reducer";
import categoryReducer from "./../components/categories/categories.reducer";
import collectionReducer from "./../components/collections/collections.reducer";
import errorReducer from "./shared/error/error.reducer";
import offersReducer from "../components/offers/offers.reducer";
import bidsReducer from "../components/bids/bids.reducer";
import exploreAllReducer from "../components/explore/explore.reducer";


export default combineReducers({
  home: homeReducer,
  auction: auctionReducer,
  nft: nftReducer,
  user: userReducer,
  wallet: walletReducer,
  category: categoryReducer,
  collection: collectionReducer,
  error: errorReducer,
  offer: offersReducer,
  bid: bidsReducer,
  explore: exploreAllReducer,
});
