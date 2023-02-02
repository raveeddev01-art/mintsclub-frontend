import {
	SET_COLLECTION_PAGINATION,
	SET_COLLECTION_LIMIT,
} from '../types/types';

const initialState = {
	numOfPages: 1,
	numOfLimit: 12,
};

const allCollectionsPagination = (state = initialState, action) => {
	switch (action.type) {
		case SET_COLLECTION_PAGINATION:
			return {
				...state,
				numOfPages: state.numOfPages + 1,
			};
		case SET_COLLECTION_LIMIT:
			return {
				...state,
				numOfLimit: state.numOfLimit + 12,
			};
		default:
			return state;
	}
};

export default allCollectionsPagination;
