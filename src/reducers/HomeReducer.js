import {
	START_FETCH_HOME,
	FETCH_HOME_SUCCESS,
	START_FETCH_PRODUCT_SUGGESTIONS,
	FETCH_PRODUCT_SUGGESTIONS_SUCCESS,
	FETCH_PRODUCT_SUGGESTIONS_FAIL,
	CLEAR_SEARCH_SUGGESTIONS,
	START_FETCH_SEARCH_RESULTS,
	FETCH_SEARCH_RESULTS_SUCCESS,
	FETCH_SEARCH_RESULTS_FAIL,
	START_SUBMIT_FEEDBACK,
	SUBMIT_FEEDBACK_SUCCESS,
	SUBMIT_FEEDBACK_FAIL,
	START_FETCH_PRODUCTS,
	FETCH_PRODUCTS_SUCCESS,
	FETCH_PRODUCTS_FAIL
} from '../actions/types';

const INITIAL_STATE = {
	featured_vendors: [],
	best_sellers: [],
	best_deals: [],
	rd_approved: [],
	products: [],
	category_products: [],
	product_suggestions: [],
	product_suggestions_loading: false,
	loading: false,
	search_results: []
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case START_FETCH_HOME:
			return { ...state, loading: true };
		case FETCH_HOME_SUCCESS:
			return { 
				...state, 
				loading: false, 
				featured_vendors: action.payload.data.data.feature_vendor,
				best_sellers: action.payload.data.data.best_seller, 
				best_deals: action.payload.data.data.best_deals,
				rd_approved: action.payload.data.data.approved_product,
				products: action.payload.data.data.products
			};
		case START_FETCH_PRODUCT_SUGGESTIONS:
			return { ...state, product_suggestions_loading: true };
		case FETCH_PRODUCT_SUGGESTIONS_SUCCESS:
			return { 
				...state, 
				product_suggestions_loading: false, 
				product_suggestions: action.payload.data.data 
			};
		case FETCH_PRODUCT_SUGGESTIONS_FAIL:
			return { ...state, product_suggestions_loading: false };
		case CLEAR_SEARCH_SUGGESTIONS:
			return { ...state, product_suggestions: [] };
		case START_FETCH_SEARCH_RESULTS:
			return { ...state, loading: true };
		case FETCH_SEARCH_RESULTS_SUCCESS:
			return { ...state, loading: false, search_results: action.payload.data.data };
		case FETCH_SEARCH_RESULTS_FAIL:
			return { ...state, loading: false };
		case START_SUBMIT_FEEDBACK:
			return { ...state, loading: true };
		case SUBMIT_FEEDBACK_SUCCESS:
			return { ...state, loading: false };
		case SUBMIT_FEEDBACK_FAIL:
			return { ...state, loading: false }; 
		case START_FETCH_PRODUCTS:
			return { ...state, loading: true };
		case FETCH_PRODUCTS_SUCCESS: 
			return { ...state, loading: false, category_products: action.payload.data.data };
		case FETCH_PRODUCTS_FAIL:
			return { ...state, loading: false };
		default:
			return state;
	}
};
