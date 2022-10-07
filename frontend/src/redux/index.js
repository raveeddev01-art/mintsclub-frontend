import { combineReducers } from "redux";
import auctionReducer from "../pages/auctions/auctions.reducer";
import nftReducer from "../Components/Nfts/nfts.reducer";
import userReducer from "../Components/User/user.reducer";
import walletReducer from "../pages/wallet/wallet.reducer";
import offersReducer from "../Components/Offers/offers.reducer";
import bidsReducer from "../Components/Bids/bids.reducer";
import exploreAllReducer from "../pages/all-nfts/explore.reducer";

export default combineReducers({
  auction: auctionReducer,
  nft: nftReducer,
  user: userReducer,
  wallet: walletReducer,
  offer: offersReducer,
  bid: bidsReducer,
  explore: exploreAllReducer,
});
