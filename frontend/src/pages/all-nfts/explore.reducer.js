import {
	GET_COLLECTION,
	TOGGLE_LIKE_RES,
	BEFORE_TOGGLE_LIKE,
} from '../../redux/types';

const initialState = {
	collection: [],
	getAuth: true,
	togleLikeRes: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_COLLECTION:
			return {
				...state,
				collection: action.payload.collection,
				getAuth: true,
			};
		case BEFORE_TOGGLE_LIKE:
			return {
				...state,
				togleLikeRes: false,
			};
		case TOGGLE_LIKE_RES:
			return {
				...state,
				togleLikeRes: true,
			};

		default:
			return {
				...state,
			};
	}
}
