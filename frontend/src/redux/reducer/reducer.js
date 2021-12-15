import {
  // HOME_TEST,
  CURRENT_STEP,
  CURRENT_STEP_DECREMENT,
  CLEAR_CURRENT_STEP,
  SET_CONTRACT_INFO,
  CONNECT_WELLET,
  CONTRACT_ERROR_MESSAGE,
  CONTRACT_REPONSE,
  TOKEN_ID,
  MINTING_RESPONSE,
  LOADER,
  CONTRACT_ADDRESS
} from "../types/types";

const initialState = {
  home: [],
  currentStep: 1,
  contractInfo: [],
  contractErrorMessage: "",
  contractError: false,
  connectedAddress: "",
  connectedAddressFlag: false,
  contractReponse: false,
  tokenId:'',
  mintingResponse:false,
  loader:false,
  contractAddress:"",
  tokenMinted:[],
  formsInfo:{
    name:'',
    symbol:'',
    externalUrl:'',
    supply:1,
    
  }

};

export default function (state = initialState, action) {
  switch (action.type) {
    case CURRENT_STEP:
      // alert("reducer")
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    case CURRENT_STEP_DECREMENT:
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    case CLEAR_CURRENT_STEP:
      return {
        ...state,
        currentStep: 1,
      };
    case SET_CONTRACT_INFO:
   
      return {
        ...state,
        contractInfo: action.payload.data,
      };
    case CONNECT_WELLET:
      // console.log(action.payload, "action.payload.address");
      return {
        ...state,
        connectedAddress: action.payload,
        connectedAddressFlag: !state.connectedAddressFlag,
      };
    case CONTRACT_ERROR_MESSAGE:
      // alert("error");
      return {
        ...state,
        contractError: true,
        contractErrorMessage: action.payload.data,
      };
    case CONTRACT_REPONSE:
      return {
        ...state,
        contractReponse: !state.contractReponse,
      };

      case TOKEN_ID:
  
        if(action.payload.events.Transfer?.returnValues?.tokenId)
        {
         
          return  {
            ...state,
            tokenId:action.payload.events.Transfer.returnValues.tokenId
          }
        }
        else {
        
          return  {
            ...state,
            tokenMinted:action.payload.events.TokenMinted
          }
        }
        case MINTING_RESPONSE:
          return {
            ...state,
            mintingResponse:!state.mintingResponse
          }
          case LOADER:
            // console.log(action.payload,"action.payload")
            return {
              ...state,
              loader:action.payload
            }
            case   CONTRACT_ADDRESS:
              return {
                ...state,
                contractAddress:action.payload
              }
            

    default:
      // need this for default case
      return state;
  }
}
