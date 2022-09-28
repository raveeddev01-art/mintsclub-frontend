import { SET_NFT_TOKEN } from '../../redux/types';

const initialState = {
  createNFTResult: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_NFT_TOKEN:
      return {
        ...state,
        createNFTResult: true,
      };

    default:
      return {
        ...state,
      };
  }
}
