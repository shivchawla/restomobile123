import { 
	START_FETCH_CHECKOUT, 
	FETCH_CHECKOUT_SUCCESS, 
	FETCH_CHECKOUT_FAIL,
	START_UPDATE_CHECKOUT_RESTO_SHIPPING_ADDRESS,
	UPDATE_CHECKOUT_RESTO_SHIPPING_ADDRESS_SUCCESS,
	UPDATE_CHECKOUT_RESTO_SHIPPING_ADDRESS_FAIL,
	START_UPDATE_QUANTITY_ITEM,
	UPDATE_QUANTITY_ITEM_SUCCESS,
	UPDATE_QUANTITY_ITEM_FAILED,
	START_ADD_TO_CART,
	ADD_TO_CART_SUCCESS,
	ADD_TO_CART_FAIL,
	START_REMOVE_CHECKOUT,
	REMOVE_CHECKOUT_SUCCESS,
	REMOVE_CHECKOUT_FAIL,
	START_UPDATE_SHIPPING_NAME,
	UPDATE_CHECKOUT_SHIPPING_NAME_SUCCESS,
	UPDATE_CHECKOUT_SHIPPING_NAME_FAIL,
	START_MIDTRANS_PAY,
	MIDTRANS_PAY_SUCCESS,
	MIDTRANS_PAY_FAIL,
	START_FETCH_SHIPPING_METHODS,
	FETCH_SHIPPING_METHODS_SUCCESS,
	FETCH_SHIPPING_METHODS_FAIL,
	START_PAYLATER,
	PAYLATER_SUCCESS,
	PAYLATER_FAIL
} from '../actions/types';

const INITIAL_STATE = {
	loading: false,
	checkout_list: [],
	shipping_addresses: [],
	shipping_methods: [],
	total_price: 0,
	redirect_url: {}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case START_FETCH_CHECKOUT:
			return { ...state, loading: true };
		case FETCH_CHECKOUT_SUCCESS:
			return { 
				...state, 
				loading: false, 
				checkout_list: action.payload.data.data.checkouts,
				shipping_addresses: action.payload.data.data.shipping_addresses,
				total_price: action.payload.data.data.total_price
			};
		case FETCH_CHECKOUT_FAIL:
			return { ...state, loading: false };
		case START_UPDATE_CHECKOUT_RESTO_SHIPPING_ADDRESS:
			return { ...state, loading: true };
		case UPDATE_CHECKOUT_RESTO_SHIPPING_ADDRESS_SUCCESS:
			return { ...state, loading: false };
		case UPDATE_CHECKOUT_RESTO_SHIPPING_ADDRESS_FAIL:
			return { ...state, loading: false };
		case START_UPDATE_SHIPPING_NAME:
			return { ...state, loading: true };
		case UPDATE_CHECKOUT_SHIPPING_NAME_SUCCESS:
			return { ...state, loading: false };
		case UPDATE_CHECKOUT_SHIPPING_NAME_FAIL:
			return { ...state, loading: false };
		case START_UPDATE_QUANTITY_ITEM:
			return { ...state, loading: true };
		case UPDATE_QUANTITY_ITEM_SUCCESS:
			return { ...state, loading: false };
		case UPDATE_QUANTITY_ITEM_FAILED:
			return { ...state, loading: false };
		case START_ADD_TO_CART:
			return { ...state, loading: true };
		case ADD_TO_CART_SUCCESS:
			return { ...state, loading: false };
		case ADD_TO_CART_FAIL:
			return { ...state, loading: false };
		case START_REMOVE_CHECKOUT:
			return { ...state, loading: true };
		case REMOVE_CHECKOUT_SUCCESS:
			return { ...state, loading: false };
		case REMOVE_CHECKOUT_FAIL:
			return { ...state, loading: false };
		case START_MIDTRANS_PAY:
			return { ...state, loading: true };
		case MIDTRANS_PAY_SUCCESS:
			return { ...state, loading: false, redirect_url: action.payload };
		case MIDTRANS_PAY_FAIL:
			return { ...state, loading: false };
		case START_PAYLATER:
			return { ...state, loading: true };
		case PAYLATER_SUCCESS:
			return { ...state, loading: false };
		case PAYLATER_FAIL:
			return { ...state, loading: false };
		case START_FETCH_SHIPPING_METHODS:
			return { ...state, loading: true };
		case FETCH_SHIPPING_METHODS_SUCCESS:
			return { ...state, loading: false, shipping_methods: action.payload.data.data.dataPrice };
		case FETCH_SHIPPING_METHODS_FAIL:
			return { ...state, loading: false };
		default:
			return state;
	}
};
