import { 
	FIRST_NAME_CHANGED,
	LAST_NAME_CHANGED,
	EMAIL_CHANGED, 
	PASSWORD_CHANGED,
	FORGET_EMAIL_CHANGED,
	LOGIN_USER, 
	LOGIN_USER_SUCCESS, 
	LOGIN_USER_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_USER,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	LOAD_JWT,
	REMOVE_JWT,
	RESET_PASSWORD_EMAIL_SENT,
	LOAD_USER_ID, 
	REMOVE_USER_ID,
	RESTO_NAME_CHANGED,
	COMPANY_NAME_CHANGED,
	COMPANY_ADDRESS_CHANGED,
	PROVINCE_CHANGED,
	CITY_CHANGED,
	ZIP_CODE_CHANGED,
	POSITION_CHANGED,
	MOBILE_NUMBER_CHANGED,
	PHONE_NUMBER_CHANGED,
	NPWP_CHANGED,
	REMOVE_NPWP,
	REMOVE_USER_TYPE,
	LOAD_USER_TYPE
} from '../actions/types';

const INITIAL_STATE = {
	rest_name: '',
	company_name: '',
	company_address: '',
	province: '',
	city: '',
	zipcode: '',
	position: '',
	mobile_number: '',
	phone_number: '',
	npwp: {},
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	forget_email: '',
	user: {},
	user_id: '',
	jwt: null,
	error: '',
	loading: false,
	user_type: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case RESTO_NAME_CHANGED:
			return { ...state, rest_name: action.payload };
		case COMPANY_NAME_CHANGED:
			return { ...state, company_name: action.payload };
		case COMPANY_ADDRESS_CHANGED:
			return { ...state, company_address: action.payload };
		case PROVINCE_CHANGED:
			return { ...state, province: action.payload };
		case CITY_CHANGED:
			return { ...state, city: action.payload };
		case ZIP_CODE_CHANGED:
			return { ...state, zipcode: action.payload };
		case POSITION_CHANGED:
			return { ...state, position: action.payload };
		case MOBILE_NUMBER_CHANGED:
			return { ...state, mobile_number: action.payload };
		case PHONE_NUMBER_CHANGED:
			return { ...state, phone_number: action.payload };
		case NPWP_CHANGED:
			return { ...state, npwp: action.payload };
		case FIRST_NAME_CHANGED:
			return { ...state, firstName: action.payload };
		case LAST_NAME_CHANGED:
			return { ...state, lastName: action.payload };
		case EMAIL_CHANGED:
			return { ...state, email: action.payload };
		case PASSWORD_CHANGED:
			return { ...state, password: action.payload };
		case REMOVE_NPWP:
			return { ...state, npwp: {} };
		case FORGET_EMAIL_CHANGED:
			return { ...state, forget_email: action.payload };
		case LOGIN_USER:
			return { ...state, loading: true };
		case LOGIN_USER_SUCCESS:
			return { 
				...INITIAL_STATE, 
				user: action.payload.data.user, 
				user_type: action.payload.data.user.user_type,
				jwt: action.payload.data.token, 
				loading: false 
			};
		case LOGIN_USER_FAIL:
			return { ...state, password: '', loading: false };
		case LOGOUT_SUCCESS:
			return { ...INITIAL_STATE };
		case REGISTER_USER:
			return { ...state, loading: true };
		case REGISTER_USER_SUCCESS:
			return { ...INITIAL_STATE };
		case REGISTER_USER_FAIL:
			return { ...state, loading: false };
		case LOAD_JWT:
			return { ...state, jwt: action.payload };
		case REMOVE_JWT:
			return { ...state, jwt: null };
		case LOAD_USER_TYPE:
			return { ...state, user_type: action.payload };
		case REMOVE_USER_TYPE:
			return { ...state, user_type: '' };
		case RESET_PASSWORD_EMAIL_SENT:
			return { ...INITIAL_STATE };
		case LOAD_USER_ID:
			return { ...state, user_id: action.payload };
		case REMOVE_USER_ID:
			return { ...state, user_id: '' };
		default:
			return state;
	}
};
