import { combineReducers } from "redux";
import homeReducer from "../pages/home/home.reducer";
import auctionReducer from "../pages/auctions/auctions.reducer";
import nftReducer from "../Components/Nfts/nfts.reducer";
import userReducer from "../Components/User/user.reducer";
import walletReducer from "../pages/wallet/wallet.reducer";
import categoryReducer from "../Components/Categories/categories.reducer";
import collectionReducer from "../pages/collections/collections.reducer";
import errorReducer from "./shared/error/error.reducer";
import offersReducer from "../Components/Offers/offers.reducer";
import bidsReducer from "../Components/Bids/bids.reducer";
import exploreAllReducer from "../pages/all-nfts/explore.reducer";
import footerReducer from "../Components/Footer/footer.reducer";

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
  footer: footerReducer,
});
