import { combineReducers } from 'redux'
import homeReducer from './../components/home/home.reducer'
import mintsReducer from '../redux/reducer/reducer'
import auctionReducer from './../components/auctions/auctions.reducer'
import nftReducer from './../components/nfts/nfts.reducer'
import userReducer from './../components/user/user.reducer'
import walletReducer from './../components/wallet/wallet.reducer'
import categoryReducer from './../components/categories/categories.reducer'
import collectionReducer from './../components/collections/collections.reducer'
import errorReducer from './shared/error/error.reducer'
import settingsReducer from '../components/footer/footer.reducer'
import faqReducer from '../components/faq/faq.reducer'
import offersReducer from '../components/offers/offers.reducer'
import bidsReducer from '../components/bids/bids.reducer'
import contactReducer from '../components/contact/contact.reducer'
import exploreAllReducer from '../components/explore/explore.reducer'
import createNftReducer from '../components/create-nft/create-nft-reducer'

export default combineReducers({
    home: homeReducer,
    dashboard:mintsReducer,
    auction: auctionReducer,
    nft: nftReducer,
    user: userReducer,
    wallet: walletReducer,
    category: categoryReducer,
    collection: collectionReducer,
    error: errorReducer,
    settings: settingsReducer,
    faqs: faqReducer,
    offer: offersReducer,
    bid: bidsReducer,
    contact: contactReducer,
    explore:exploreAllReducer,
    
    
})