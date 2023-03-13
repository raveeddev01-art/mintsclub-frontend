import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import countReducer from "./reducers/countReducer";
import collectionReducer from "./reducers/collectionReducer";
import nftReducer from "./reducers/nftReducer";
import PricingReducer from "./reducers/pricingReducer";
import userReducer from "./reducers/userReducer";
import blogReducer from "./reducers/blogReducer";
import AuctionReducer from "./reducers/auctionsReducer";
import FractionsReducer from "./reducers/fractionReducer";
import revenueReducer from "./reducers/swappingRevenueReducer";
import alert from "./reducers/alertSlice";
import paymentReducer from "./reducers/paymentReducer";
import faq from "./reducers/faq.Reducer";
import news from "./reducers/newReducer";

const rootReducer = combineReducers({
  authReducer,
  countReducer,
  nftReducer,
  collectionReducer,
  PricingReducer,
  AuctionReducer,
  FractionsReducer,
  // nftReducer,
  userReducer,
  blogReducer,
  alert,
  paymentReducer,
  revenueReducer,
  faq,
  news,
});
export default rootReducer;
