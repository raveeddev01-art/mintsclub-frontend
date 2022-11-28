import { toast } from 'react-toastify';
import { GET_ERRORS, GET_SYSTEM_SETTINGS } from '../../redux/types';
// import { emptyError } from '../../redux/shared/error/error.action';
import { ENV } from '../../config/config';

export const getSystemSettings =
	(qs = '') =>
	(dispatch) => {
		// dispatch(emptyError());
		let url = `${ENV.url}systemSetting/getAllSystemSetting`;
		if (qs) url += `?${qs}`;

		fetch(url, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				Authorization: ENV.Authorization,
				'x-auth-token': ENV.x_auth_token,
				'Access-Control-Allow-Origin': '*',
				'x-access-token':
					ENV.getUserKeys('accessToken') &&
					ENV.getUserKeys('accessToken').accessToken
						? ENV.getUserKeys('accessToken').accessToken
						: '',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(
					'🚀 ~ file: systemSetting.action.js ~ line 29 ~ .then ~ data',
					data
				);
				if (data.success) {
					dispatch({
						type: GET_SYSTEM_SETTINGS,
						payload: data.data,
					});
				} else {
					if (!qs) toast.error(data.message);
					dispatch({
						type: GET_ERRORS,
						payload: data,
					});
				}
			})
			.catch((error) => {
				if (error.response && error.response.data) {
					const { data } = error.response;
					if (data.message) toast.error(data.message);
				}
				dispatch({
					type: GET_ERRORS,
					payload: error,
				});
			});
	};
