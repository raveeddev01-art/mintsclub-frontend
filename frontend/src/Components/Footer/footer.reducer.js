import {
  SUBSCRIBE,
  BEFORE_FOOTER,
  SUBSCRIBE_RESPONSE,
} from '../../redux/types';

const initialState = {
  subscribeAuth: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case BEFORE_FOOTER:
      return {
        ...state,
        subscribeAuth: false,
      };
    case SUBSCRIBE:
      return {
        ...state,
        subscribeAuth: false,
      };
    case SUBSCRIBE_RESPONSE:
      return {
        ...state,
        subscribeAuth: true,
      };
    default:
      return {
        ...state,
      };
  }
}
