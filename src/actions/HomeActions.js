import axios from 'axios';

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
} from './types';
import { baseURL } from '../services/constants';

export const fetchProducts = (idCategory) => {
	return (dispatch) => {
		dispatch({ type: START_FETCH_PRODUCTS });
		axios.request({
			url: `${baseURL}products`,
			method: 'get',
			params: {
				id_category: idCategory
			}
		})
			.then((response) => {
				dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response });
				console.log(response);
			})
			.catch((error) => {
				dispatch({ type: FETCH_PRODUCTS_FAIL });
				console.log(error);
			});
	};
};

export const fetchHome = () => {
	return (dispatch) => {
		dispatch({ type: START_FETCH_HOME });
		axios.get(`${baseURL}home`)
			.then((response) => {
				console.log(response);
				dispatch({ type: FETCH_HOME_SUCCESS, payload: response });
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const fetchProductSuggestions = (text) => {
	return (dispatch) => {
		dispatch({ type: START_FETCH_PRODUCT_SUGGESTIONS });
		axios.request({
			url: `${baseURL}search`,
			method: 'get',
			params: {
				keyword: text,
				limit: 8
			}
		})
		.then((response) => {
			dispatch({ type: FETCH_PRODUCT_SUGGESTIONS_SUCCESS, payload: response });
		})
		.catch((error) => {
			console.log(error);
			dispatch({ type: FETCH_PRODUCT_SUGGESTIONS_FAIL });
		});
	};
};

export const clearProductSuggestions = () => {
	return {
		type: CLEAR_SEARCH_SUGGESTIONS
	};
};

export const fetchSearchResults = (query, sort) => {
	return (dispatch) => {
		dispatch({ type: START_FETCH_SEARCH_RESULTS });
		axios.request({
			url: `${baseURL}search`,
			method: 'get',
			params: {
				keyword: query,
				limit: 50,
				sort: sort
			}
		})
			.then((response) => {
				console.log(response);
				dispatch({ type: FETCH_SEARCH_RESULTS_SUCCESS, payload: response });
			})
			.catch((error) => {
				dispatch({ type: FETCH_SEARCH_RESULTS_FAIL });
				console.log(error);
			});
	};
};

export const fetchProductByCategoriesSorted = (idCategory, sort) => {
	return (dispatch) => {
		dispatch({ type: START_FETCH_PRODUCTS });
		axios.request({
			url: `${baseURL}products`,
			method: 'get',
			params: {
				id_category: idCategory,
				sort: sort
			}
		})
			.then((response) => {
				dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response });
				console.log(response);
			})
			.catch((error) => {
				dispatch({ type: FETCH_PRODUCTS_FAIL });
				console.log(error);
			});
	};
};

export const submitFeedback = (name, email, message) => {
	return (dispatch) => {
		dispatch({ type: START_SUBMIT_FEEDBACK });
		axios.request({
			url: `${baseURL}send_feedback`,
			method: 'post',
			params: {
				name: name,
				email: email,
				message: message
			}
		})
			.then((response) => {
				dispatch({ type: SUBMIT_FEEDBACK_SUCCESS });
				console.log(response);
			})
			.catch((error) => {
				dispatch({ type: SUBMIT_FEEDBACK_FAIL });
				console.log(error);
			});
	};
};
