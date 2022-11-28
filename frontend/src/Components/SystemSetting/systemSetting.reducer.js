import { GET_SYSTEM_SETTINGS } from '../../redux/types';

const initialState = {
	systemSettings: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_SYSTEM_SETTINGS:
			return {
				...state,
				systemSettings: action.payload.systemSettings,
			};

		default:
			return {
				...state,
			};
	}
}
