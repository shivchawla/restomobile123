import {
	START_FETCH_VENDOR,
	FETCH_VENDOR_SUCCESS,
	START_FETCH_ALL_VENDORS,
	FETCH_ALL_VENDORS_SUCCESS,
	FETCH_ALL_VENDORS_FAIL
} from '../actions/types';

const INITIAL_STATE = {
	vendor: {},
	products: [],
	loading: false,
	vendors: []
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case START_FETCH_VENDOR:
			return { ...state, loading: true };
		case FETCH_VENDOR_SUCCESS:
			return { 
				...state, 
				vendor: action.payload.data.data.vendor,
				products: action.payload.data.data.products, 
				loading: false 
			};
		case START_FETCH_ALL_VENDORS:
			return { ...state, loading: true };
		case FETCH_ALL_VENDORS_SUCCESS:
			return { ...state, loading: false, vendors: action.payload.data.data };
		case FETCH_ALL_VENDORS_FAIL:
			return { ...state, loading: false };
		default:
			return state;
	}
};
