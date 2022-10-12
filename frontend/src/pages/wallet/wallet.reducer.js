import {
  BEFORE_WALLET,
  SET_WALLET,
  GET_WALLET,
  SET_BLOCKCHAIN_TYPE,
  GET_BLOCKCHAIN_TYPE,
} from "../../redux/types";

const initialState = {
  connectedAddress: "",
  blockchainType: "",
  walletAuth: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_BLOCKCHAIN_TYPE:
      console.log("Payload...", action.payload);
      return {
        ...state,
        blockchainType: action.payload,
      };
    case SET_WALLET:
      return {
        ...state,
        connectedAddress: action.payload,
        walletAuth: true,
      };
    case GET_WALLET:
      return {
        ...state,
      };
    case BEFORE_WALLET:
      return {
        ...state,
        connectedAddress: "",
        walletAuth: false,
        userAuth: false,
      };
    default:
      return {
        ...state,
      };
  }
}
