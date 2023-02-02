import { SET_NFT_PAGINATION, SET_NFT_LIMIT } from '../types/types';

const initialState = {
	numOfPages: 1,
	numOfLimit: 9,
};

const allNFTPagination = (state = initialState, action) => {
	switch (action.type) {
		case SET_NFT_PAGINATION:
			return {
				...state,
				numOfPages: state.numOfPages + 1,
			};
		case SET_NFT_LIMIT:
			return {
				...state,
				numOfLimit: state.numOfLimit + 9,
			};
		default:
			return state;
	}
};

export default allNFTPagination;
