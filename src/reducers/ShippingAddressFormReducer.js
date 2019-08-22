import { 
	SHIPPING_ADDRESS_FORM_UPDATE, 
	RESET_LOCATION, 
	RESET_FORM, 
	UPDATE_LONGITUDE_LATITUDE,
	UPDATE_ADDRESS_QUERY,
	FETCH_SHIPPING_ADDRESSES,
	FETCH_SHIPPING_ADDRESSES_SUCCESS,
	FETCH_SHIPPING_ADDRESS_FAIL,
	LOAD_SHIPPING_ADDRESS_FORM,
	ADD_SHIPPING_ADDRESS,
	ADD_SHIPPING_ADDRESS_SUCCESS,
	ADD_SHIPPING_ADDRESS_FAIL,
	DELETE_SHIPPING_ADDRESS,
	DELETE_SHIPPING_ADDRESS_SUCCESS,
	DELETE_SHIPPING_ADDRESS_FAIL,
	UPDATE_SHIPPING_ADDRESS,
	UPDATE_SHIPPING_ADDRESS_SUCCESS,
	UPDATE_SHIPPING_ADDRESS_FAIL
} from '../actions/types';

const INITIAL_STATE = {
	title: '',
	address: '',
	province: '',
	city: '',
	postal_code: '',
	pic: '',
	pic_phone_number: '',
	error: '',
	latitude: null,
	longitude: null,
	address_query: '',
	shipping_addresses: [],
	loading: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_SHIPPING_ADDRESSES:
			return { ...state, loading: true };
		case FETCH_SHIPPING_ADDRESSES_SUCCESS:
			return { ...state, shipping_addresses: action.payload.data.data, loading: false };
		case FETCH_SHIPPING_ADDRESS_FAIL:
			return { ...state, loading: false };
		case SHIPPING_ADDRESS_FORM_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value };
		case UPDATE_LONGITUDE_LATITUDE:
			return { ...state, latitude: action.payload.latitude, longitude: action.payload.longitude };
		case RESET_LOCATION:
			return { ...state, latitude: null, longitude: null };
		case RESET_FORM:
			return { 
				...state,
				title: '', 
				address: '', 
				province: '', 
				city: '', 
				postal_code: '',
				pic: '', 
				pic_phone_number: '', 
				latitude: null, 
				longitude: null,
				address_query: ''
			};
		case UPDATE_ADDRESS_QUERY:
			return { ...state, address_query: action.payload };
		case LOAD_SHIPPING_ADDRESS_FORM:
			return { 
				...state,
				title: action.payload.name, 
				address: action.payload.address, 
				province: action.payload.province, 
				city: action.payload.city, 
				postal_code: action.payload.zipcode,
				pic: action.payload.pic_name, 
				pic_phone_number: action.payload.pic_phone, 
				latitude: action.payload.lat, 
				longitude: action.payload.lng,
			};
		case ADD_SHIPPING_ADDRESS:
			return { ...state, loading: true };
		case ADD_SHIPPING_ADDRESS_SUCCESS:
			return { 
				...state,
				title: '', 
				address: '', 
				province: '', 
				city: '', 
				postal_code: '',
				pic: '', 
				pic_phone_number: '', 
				latitude: null, 
				longitude: null,
				address_query: '',
				loading: false
			};
		case ADD_SHIPPING_ADDRESS_FAIL:
			return { ...state, loading: false };
		case DELETE_SHIPPING_ADDRESS:
			return { ...state, loading: true };
		case DELETE_SHIPPING_ADDRESS_SUCCESS:
			return { 
				...state,
				title: '', 
				address: '', 
				province: '', 
				city: '', 
				postal_code: '',
				pic: '', 
				pic_phone_number: '', 
				latitude: null, 
				longitude: null,
				address_query: '',
				loading: false
			};
		case DELETE_SHIPPING_ADDRESS_FAIL:
			return { ...state, loading: false };
		case UPDATE_SHIPPING_ADDRESS:
			return { ...state, loading: true };
		case UPDATE_SHIPPING_ADDRESS_SUCCESS:
			return {
				...state,
				title: '', 
				address: '', 
				province: '', 
				city: '', 
				postal_code: '',
				pic: '', 
				pic_phone_number: '', 
				latitude: null, 
				longitude: null,
				address_query: '',
				loading: false
			};
		case UPDATE_SHIPPING_ADDRESS_FAIL:
			return { ...state, loading: false };
		default:
			return state;
	}
};
