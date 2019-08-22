import { Toast } from 'native-base';

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
} from './types';

import NavigationService from '../services/NavigationService';
import { baseURL } from '../services/constants';

const axios = require('axios');

function renderMessage(message) {
	return Toast.show({
		text: message,
		duration: 3000,
		buttonText: 'Got it!'
	});
}

export const shippingAddressFormUpdate = ({ prop, value }) => {
	return {
		type: SHIPPING_ADDRESS_FORM_UPDATE,
		payload: { prop, value }
	};
};

export const updateLongitudeAndLatitude = ({ longitude, latitude }) => {
	return {
		type: UPDATE_LONGITUDE_LATITUDE,
		payload: { longitude, latitude }
	};
};

export const resetLocation = () => {
	return {
		type: RESET_LOCATION
	};
};

export const resetForm = () => {
	return {
		type: RESET_FORM
	};
};

export const updateAddressQuery = (text) => {
	return {
		type: UPDATE_ADDRESS_QUERY,
		payload: text
	};
};

// need to pass the id resto into fetch
export const shippingAddressesFetch = (idResto) => {
	return function (dispatch) {
		dispatch({ type: FETCH_SHIPPING_ADDRESSES });
		axios.request({
			url: `${baseURL}shipping_addresses`,
			method: 'get',
			params: {
				id_resto: idResto
			}
		})
		.then((response) => {
			dispatch({ type: FETCH_SHIPPING_ADDRESSES_SUCCESS, payload: response });
		})
		.catch((error) => {
			console.log(error);
			dispatch({ type: FETCH_SHIPPING_ADDRESS_FAIL });
		});
	};
};

export const loadShippingAddressForm = (shippingAddress) => {
	return {
		type: LOAD_SHIPPING_ADDRESS_FORM,
		payload: shippingAddress
	};
};

export const createShippingAddress = ({ id_resto, title, address, province, city, postal_code, pic, pic_phone, lat, lng }) => {
	return function (dispatch) {
		dispatch({ type: ADD_SHIPPING_ADDRESS });
		axios.request({
			url: `${baseURL}shipping_address/create`,
			method: 'post',
			params: {
				id_resto: id_resto,
				title: title,
				address: address,
				province: province,
				city: city,
				zipcode: postal_code,
				pic_name: pic,
				pic_phone: pic_phone,
				lat: lat,
				lng: lng
			}
		})
		.then((response) => {
			dispatch({ type: ADD_SHIPPING_ADDRESS_SUCCESS });
			console.log(response);
			renderMessage('Address saved!');
			NavigationService.navigate('ShippingAddressScreen');
		})
		.catch((error) => {
			console.log(error.response);
			renderMessage('Sorry! An error occured, please try again');
			dispatch({ type: ADD_SHIPPING_ADDRESS_FAIL });
		});
	};
};

export const deleteShippingAddress = (id) => {
	return function (dispatch) {
		dispatch({ type: DELETE_SHIPPING_ADDRESS });
		axios.request({
			url: `${baseURL}shipping_address/delete`,
			method: 'post',
			params: {
				id: id
			}
		})
			.then((response) => {
				dispatch({ type: DELETE_SHIPPING_ADDRESS_SUCCESS });
				renderMessage(response.data.message);
				NavigationService.navigate('ShippingAddressScreen');
			})
			.catch((error) => {
				console.log(error);
				renderMessage('Sorry! An error occured, please try again');
				dispatch({ type: DELETE_SHIPPING_ADDRESS_FAIL });
			});
	};
};

export const updateShippingAddress = ({ id, title, address, province, city, postal_code, pic_name, pic_phone, lat, lng }) => {
	return function (dispatch) {
		dispatch({ type: UPDATE_SHIPPING_ADDRESS });
		axios.request({
			url: `${baseURL}shipping_address/edit`,
			method: 'post',
			params: {
				id: id,
				title: title,
				address: address,
				province: province,
				city: city,
				zipcode: postal_code,
				pic_name: pic_name,
				pic_phone: pic_phone,
				lat: lat,
				lng: lng
			}
		})
		.then((response) => {
			dispatch({ type: UPDATE_SHIPPING_ADDRESS_SUCCESS });
			console.log(response);
			renderMessage('Address updated!');
			NavigationService.navigate('ShippingAddressScreen');
		})
		.catch((error) => {
			console.log(error.response);
			renderMessage('Sorry! An error occured, please try again');
			dispatch({ type: UPDATE_SHIPPING_ADDRESS_FAIL });
		});
	};
};

