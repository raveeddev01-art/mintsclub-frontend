import { toast } from 'react-toastify';
import {
	GET_ERRORS,
	BEFORE_NFT,
	GET_NFTS,
	GET_NFT,
	UPSERT_NFT,
	NFTALL,
	GET_NFTS_BY_COLLECTION,
	GET_MYLIKED_NFTS,
	GET_PROFILE_NFTS,
	GET_ACTIVITIES,
	GET_ITEM_LISTING,
	BEFORE_NFTS_BY_COLLECTION,
	CREATE_NFT_AUTH,
} from '../../redux/types';
import { ENV } from '../../config/config';
// import { emptyError } from "../../redux/shared/error/error.action";
import { axiosPostFormData, handleRequest } from '../../utils/functions';
import axios from 'axios';

export const beforeNFT = () => {
	return {
		type: BEFORE_NFT,
	};
};

export const upsertNFT =
	(type = 'create', body, method = 'POST') =>
	async (dispatch) => {
		//// dispatch(emptyError());
		try {
			let result = await handleRequest(method, `/nfts/${type}`, body);
			console.log(result, 'result');
			const { data, success, message } = result.data;
			if (success) {
				toast.success(message);
				dispatch({
					type: UPSERT_NFT,
					payload: data,
				});
			} else {
				dispatch({
					type: GET_ERRORS,
					payload: result.data,
				});
			}
		} catch (error) {
			dispatch({
				type: GET_ERRORS,
				payload: error,
			});
		}
	};

export const getNFTs =
	(qs = '') =>
	async (dispatch) => {
		//// dispatch(emptyError());
		try {
			let result = await handleRequest('get', 'nfts/list', null, qs);
			const { data, success } = result.data;
			if (success) {
				console.log('this is data in nft.js', data)

				dispatch({
					type: GET_NFTS,
					payload: data,
				});
				dispatch({
					type: NFTALL,
					payload: data,
				});
			} else {
				dispatch({
					type: GET_ERRORS,
					payload: result.data,
				});
			}
		} catch (error) {
			dispatch({
				type: GET_ERRORS,
				payload: error,
			});
		}
	};

export const getNFT = (nftId) => async (dispatch) => {
	//// dispatch(emptyError());
	try {
		let result = await handleRequest('get', `nfts/get/${nftId}`);
		const { data, success } = result.data;
		if (success) {
			dispatch({
				type: NFTALL,
				payload: data,
			});
			dispatch({
				type: GET_NFT,
				payload: data,
			});
		} else {
			dispatch({
				type: GET_ERRORS,
				payload: result.data,
			});
		}
	} catch (error) {
		dispatch({
			type: GET_ERRORS,
			payload: error,
		});
	}
};

export const createActivity = (body) => async (dispatch) => {
	//// dispatch(emptyError());
	try {
		let res = await handleRequest('post', 'activity/create', body);
		const { success, data } = res.data;
		if (!success) {
			dispatch({
				type: GET_ERRORS,
				payload: res.data,
			});
		}
	} catch (error) {
		dispatch({
			type: GET_ERRORS,
			payload: error,
		});
	}
};

export const getActivities =
	(qs = null) =>
	async (dispatch) => {
		//// dispatch(emptyError());
		try {
			let result = await handleRequest('get', 'activity/get', null, qs);
			const { data, success } = result.data;
			if (success) {
				dispatch({
					type: GET_ACTIVITIES,
					payload: data,
				});
			} else {
				dispatch({
					type: GET_ERRORS,
					payload: result.data,
				});
			}
		} catch (error) {
			dispatch({
				type: GET_ERRORS,
				payload: error,
			});
		}
	};
export const getItemsListing =
	(qs = null) =>
	(dispatch) => {
		//// dispatch(emptyError());
		let url = `${ENV.url}itemsListing/list`;
		if (qs) {
			url += `?${qs}`;
		}
		axios
			.get(url)
			.then(function (response) {
				dispatch({
					type: GET_ITEM_LISTING,
					payload: response.data.data,
				});
			})
			.catch(function (error) {
				dispatch({
					type: GET_ERRORS,
					payload: error,
				});
			});
	};
export const beforeNFTByCollection = () => (dispatch) => {
	dispatch({
		type: BEFORE_NFTS_BY_COLLECTION,
	});
};

export const getNFTsByCollection = (id) => async (dispatch) => {
	//// dispatch(emptyError());
	try {
		let payload = {
			collectionId: id,
		};
		let result = await handleRequest(
			'post',
			'nfts/getNFTsByCollection',
			payload
		);
		const { data, success } = result.data;
		if (success) {
			dispatch({
				type: GET_NFTS_BY_COLLECTION,
				payload: data,
			});
		} else {
			dispatch({
				type: GET_ERRORS,
				payload: result.data,
			});
		}
	} catch (error) {
		dispatch({
			type: GET_ERRORS,
			payload: error,
		});
	}
};

export const getMyLikedNfts =
	(qs = '') =>
	async (dispatch) => {
		//// dispatch(emptyError());
		try {
			const res = await handleRequest('get', 'nftLikes/userNftLikes', null, qs);
			const { success, data } = res.data;
			if (success) {
				dispatch({
					type: GET_MYLIKED_NFTS,
					payload: data,
				});
			} else {
				dispatch({
					type: GET_ERRORS,
					payload: res.data,
				});
			}
		} catch (error) {
			dispatch({
				type: GET_ERRORS,
				payload: error,
			});
		}
	};

export const createNFT = async (formData) => async (dispatch) => {
	try {
		const res = await axiosPostFormData('nfts/create', formData, true);
	} catch (error) {
		dispatch({
			type: GET_ERRORS,
			payload: error,
		});
	}
};

export const addNFTRecord = (formData) => async (dispatch) => {
	try {
		const res = await handleRequest('post', 'nfts/storeNFTData', formData);
		const { success } = res.data;
		if (success) {
			toast.success('NFT created successfully');
			dispatch({
				type: CREATE_NFT_AUTH,
			});
		} else {
			dispatch({
				type: GET_ERRORS,
				payload: res.data,
			});
		}
	} catch (error) {
		dispatch({
			type: GET_ERRORS,
			payload: error,
		});
	}
};

export const getProfileNfts =
	(qs = '') =>
	async (dispatch) => {
		//// dispatch(emptyError());

		try {
			const res = await handleRequest('get', 'nfts/list', null, qs);
			const { data, success } = res.data;
			console.log("🚀 ~ file: nfts.action.js:287 ~ data", data)
			
			if (success) {
				dispatch({
					type: GET_PROFILE_NFTS,
					payload: data,
				});
			} else {
				dispatch({
					type: GET_ERRORS,
					payload: res.data,
				});
			}
		} catch (error) {
			dispatch({
				type: GET_ERRORS,
				payload: error,
			});
		}
	};
