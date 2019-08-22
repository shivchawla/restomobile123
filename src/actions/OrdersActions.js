import axios from 'axios';
import {
	SHOW_THANK_YOU_MODAL, 
	HIDE_THANK_YOU_MODAL,
	START_FETCH_ORDERS,
	FETCH_ORDERS_SUCCESS,
	FETCH_ORDERS_FAIL
} from './types';
import { baseURL } from '../services/constants';

export const showThankYouModal = () => {
	return {
		type: SHOW_THANK_YOU_MODAL
	};
};

export const hideThankYouModal = () => {
	return {
		type: HIDE_THANK_YOU_MODAL
	};
};

export const fetchOrders = () => {
	return (dispatch) => {
		dispatch({ type: START_FETCH_ORDERS });
		axios.request({
			url: `${baseURL}orders`
		})
		.then((response) => {
			dispatch({ type: FETCH_ORDERS_SUCCESS, payload: response });
		})
		.catch((error) => {
			console.log(error);
			dispatch({ type: FETCH_ORDERS_FAIL });
		});
	};
};
