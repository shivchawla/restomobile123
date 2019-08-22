import { 
	SHOW_THANK_YOU_MODAL, 
	HIDE_THANK_YOU_MODAL,
	START_FETCH_ORDERS,
	FETCH_ORDERS_SUCCESS,
	FETCH_ORDERS_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
	modalVisible: false,
	loading: false,
	completed_orders: [],
	pending_orders: []
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SHOW_THANK_YOU_MODAL:
			return { ...state, modalVisible: true };
		case HIDE_THANK_YOU_MODAL:
			return { ...state, modalVisible: false };
		case START_FETCH_ORDERS:
			return { ...state, loading: true };
		case FETCH_ORDERS_SUCCESS:
			return { 
				...state, 
				loading: false, 
				completed_orders: action.payload.data.data.completed_orders,
				pending_orders: action.payload.data.data.pending_orders 
			};
		case FETCH_ORDERS_FAIL:
			return { ...state, loading: false };
		default:
			return state;
	}
};
