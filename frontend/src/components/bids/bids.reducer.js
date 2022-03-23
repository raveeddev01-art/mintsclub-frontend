import { BEFORE_BID, GET_BIDS, CREATE_BID, DELETE_BID, ACCEPT_BID,GETBIDS_BY_NFT } from '../../redux/types';

const initialState = {
    bid: null,
    bids: null,
    pagination: null,
    highestBidAmt: null,
    deleteAuth: false,
    createAuth: false,
    getAuth: false,
    acceptAuth: false,
    bidsByNft:null,
    bidsBYNftAuth:false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BIDS:
            console.log(action.payload.Bids,"action.payload.Bids")
            return {
                ...state,
                bids: action.payload.Bids,
                // pagination: action.payload.pagination,
                // highestBidAmt: action.payload.highestBidAmt,
                getAuth: true
            }
        case CREATE_BID:
            return {
                ...state,
                bid: action.payload,
                createAuth: true
            }
        case ACCEPT_BID:
            return {
                ...state,
                bid: action.payload,
                acceptAuth: true
            }
        case DELETE_BID:
            return {
                ...state,
                bid: action.payload,
                deleteAuth: true
            }
        case BEFORE_BID:
            return {
                ...state,
                bid: null,
                bids: null,
                pagination: null,
                highestBidAmt: null,
                deleteAuth: false,
                createAuth: false,
                getAuth: false,
                acceptAuth: false,
                bidsBYNftAuth:false,
                
            }
            case GETBIDS_BY_NFT:
                return {
                    ...state,
                    bidsByNft:action.payload,
                    bidsBYNftAuth:true
                }
        default:
            return {
                ...state
            }
    }
}