import axios from 'axios';
import { Toast } from 'native-base';
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
} from './types';
import NavigationService from '../services/NavigationService';
import { baseURL } from '../services/constants';

function renderMessage(message) {
	return Toast.show({
		text: message,
		duration: 3000,
		buttonText: 'Got it!'
	});
}

export const addReviewFormUpdate = ({ prop, value }) => {
	return {
		type: ADD_REVIEW_FORM_UPDATE,
		payload: { prop, value }
	};
};

export const resetReviewForm = () => {
	return {
		type: RESET_REVIEW_FORM
	};
};

export const fetchProductReviews = (id_product) => {
	return (dispatch) => {
		dispatch({ type: START_FETCH_PRODUCT_REVIEWS });
		axios.request({
			url: `${baseURL}product_reviews`,
			params: {
				id_product: id_product
			}
		})
		.then((response) => {
			console.log(response);
			dispatch({ type: FETCH_PRODUCT_REVIEWS_SUCCESS, payload: response });
		})
		.catch((error) => {
			dispatch({ type: FETCH_PRODUCT_REVIEWS_FAIL });
			console.log(error);
		});
	}; 
};

export const createProductReview = ({ id_product, comments, rating }) => {
	return (dispatch) => {
		dispatch({ type: START_CREATE_PRODUCT_REVIEW });
		axios.request({
			url: `${baseURL}product_review/create`,
			method: 'post',
			params: {
				id_product: id_product,
				comments: comments,
				rating: rating
			}
		})
		.then((response) => {
			dispatch({ type: CREATE_PRODUCT_REVIEW_SUCCESS, payload: response });
			NavigationService.navigate('HomeScreen');
			renderMessage(response.data.message);
		})
		.catch((error) => {
			console.log(error.response);
			renderMessage('Sorry! An error occured, please try again');
			dispatch({ type: CREATE_PRODUCT_REVIEW_FAIL });
		});
	};
};

export const deleteProductReview = (idProductReview) => {
	return (dispatch) => {
		dispatch({ type: START_DELETE_PRODUCT_REVIEW });
		axios.request({
			url: `${baseURL}product_review/delete`,
			method: 'post',
			params: {
				id_product_review: idProductReview
			}
		})
		.then((response) => {
			console.log(response);
			renderMessage('Your review has been deleted!');
			dispatch({ type: DELETE_PRODUCT_REVIEW_SUCCESS });
		})
		.catch((error) => {
			console.log(error);
			renderMessage('Sorry! An error occured, please try again');
			dispatch({ type: DELETE_PRODUCT_REVIEW_FAIL });
		})
		.then(() => NavigationService.navigate('ProductDetailScreen'));
	};
};
