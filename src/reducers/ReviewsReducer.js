import { 
	ADD_REVIEW_FORM_UPDATE, 
	RESET_REVIEW_FORM, 
	START_FETCH_PRODUCT_REVIEWS, 
	FETCH_PRODUCT_REVIEWS_SUCCESS,
	FETCH_PRODUCT_REVIEWS_FAIL,
	START_CREATE_PRODUCT_REVIEW,
	CREATE_PRODUCT_REVIEW_SUCCESS,
	CREATE_PRODUCT_REVIEW_FAIL,
	START_DELETE_PRODUCT_REVIEW,
	DELETE_PRODUCT_REVIEW_SUCCESS,
	DELETE_PRODUCT_REVIEW_FAIL 
} from '../actions/types';

const INITIAL_STATE = {
	rating: 2.5,
	review: '',
	loading: false,
	product_reviews: [],
	resto_user: 0
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_REVIEW_FORM_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value };
		case RESET_REVIEW_FORM:
			return { ...state, rating: 2.5, review: '', loading: false };
		case START_FETCH_PRODUCT_REVIEWS:
			return { ...state, loading: true };
		case FETCH_PRODUCT_REVIEWS_SUCCESS:
			return { 
				...state, 
				loading: false, 
				product_reviews: action.payload.data.data.product_reviews,
				resto_user: action.payload.data.data.id_resto_user 
			};
		case FETCH_PRODUCT_REVIEWS_FAIL:
			return { ...state, loading: false };
		case START_CREATE_PRODUCT_REVIEW:
			return { ...state, loading: true };
		case CREATE_PRODUCT_REVIEW_SUCCESS:
			return { ...state, loading: false };
		case CREATE_PRODUCT_REVIEW_FAIL:
			return { ...state, loading: false };
		case START_DELETE_PRODUCT_REVIEW:
			return { ...state, loading: true };
		case DELETE_PRODUCT_REVIEW_SUCCESS:
			return { ...state, loading: false };
		case DELETE_PRODUCT_REVIEW_FAIL:
			return { ...state, loading: false };
		default:
			return state;
	}
};
