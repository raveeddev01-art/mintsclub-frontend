import { GET_SYSTEM_FEE } from "../types";
const initialState = {
	platformFee:null,
    royalityFee:null
};
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SYSTEM_FEE:
            return {
                ...state,
                platformFee: action.payload.platformFee,
                royalityFee: action.payload.royalityFee
            };
        default:
            return state;
    }
}