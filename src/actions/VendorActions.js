import axios from 'axios';

import {
	START_FETCH_VENDOR,
	FETCH_VENDOR_SUCCESS,
	START_FETCH_ALL_VENDORS,
	FETCH_ALL_VENDORS_SUCCESS,
	FETCH_ALL_VENDORS_FAIL
} from './types';
import { baseURL } from '../services/constants';

export const fetchVendor = (vendorId) => {
	return (dispatch) => {
		dispatch({ type: START_FETCH_VENDOR });
		axios.request({
			url: `${baseURL}vendor`,
			type: 'get',
			params: {
				id_vendor: vendorId
			}
		})
			.then((response) => {
				dispatch({ type: FETCH_VENDOR_SUCCESS, payload: response });
			})
			.catch((error) => {
				// dispatch fetch vendor failed
				console.log(error);
			});
	};
};

export const fetchAllVendors = () => {
	return (dispatch) => {
		dispatch({ type: START_FETCH_ALL_VENDORS });
		axios.request({
			url: `${baseURL}vendors`,
			type: 'get',
		})
			.then((response) => {
				console.log(response);
				dispatch({ type: FETCH_ALL_VENDORS_SUCCESS, payload: response });
			})
			.catch((error) => {
				console.log(error);
				dispatch({ type: FETCH_ALL_VENDORS_FAIL });
			});
	};
};
