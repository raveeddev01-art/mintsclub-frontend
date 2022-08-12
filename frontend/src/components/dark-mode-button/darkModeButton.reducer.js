import { DARK_MODE } from "../../redux/types";

const initialState = {
  darkMode: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DARK_MODE:
      return {
        ...state,
        darkMode: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
