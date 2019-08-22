import axios from 'axios';
import { Toast } from 'native-base';
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

export const fetchCheckout = () => {
	return (dispatch) => {
		dispatch({ type: START_FETCH_CHECKOUT });
		axios.request({ 
			url: `${baseURL}cart/list`,
			method: 'get'
		})
			.then((response) => {
				dispatch({ type: FETCH_CHECKOUT_SUCCESS, payload: response });
			})
			.catch((error) => {
				dispatch({ type: FETCH_CHECKOUT_FAIL });
				console.log(error);
			});
	};
};

export const updateCheckoutRestoShippingAddress = (id_resto_shipping_address, id_checkout) => {
	return (dispatch) => {
		return new Promise((resolve) => {
			dispatch({ type: START_UPDATE_CHECKOUT_RESTO_SHIPPING_ADDRESS });
			axios.request({
				url: `${baseURL}cart/update-shipping-address`,
				method: 'post',
				params: {
					id_resto_shipping_address: id_resto_shipping_address,
					id_checkout: id_checkout
				}
			})
				.then((response) => {
					dispatch({ type: UPDATE_CHECKOUT_RESTO_SHIPPING_ADDRESS_SUCCESS });
					console.log(`Update checkout resto shipping address success! --> ${response}`);
					resolve();
				})
				.catch((error) => {
					dispatch({ type: UPDATE_CHECKOUT_RESTO_SHIPPING_ADDRESS_FAIL });
					console.log(`Error updating resto shipping address --> ${error}`);
				});
			});
	};
};

export const updateCheckoutShippingMethod = (shipping_name, cost, id_checkout) => {
	return (dispatch) => {
		return new Promise((resolve) => {
			dispatch({ type: START_UPDATE_SHIPPING_NAME });
			axios.request({
				url: `${baseURL}cart/update-shipping-name`,
				method: 'post',
				params: {
					shipping_name: shipping_name,
					cost: cost,
					id_checkout: id_checkout
				}
			})
				.then((response) => {
					dispatch({ type: UPDATE_CHECKOUT_SHIPPING_NAME_SUCCESS });
					console.log(`Update checkout resto shipping address success! --> ${response}`);
					resolve();
				})
				.catch((error) => {
					dispatch({ type: UPDATE_CHECKOUT_SHIPPING_NAME_FAIL });
					console.log(`Error updating resto shipping address --> ${error}`);
				});
			});
	};
};

export const updateQuantityCheckoutItem = (idCheckoutItem, quantity) => {
	return (dispatch) => {
		return new Promise((resolve) => {
			dispatch({ type: START_UPDATE_QUANTITY_ITEM });
			axios.request({
				url: `${baseURL}cart/update-qty/${idCheckoutItem}/${quantity}`,
				method: 'get'
			})
				.then((response) => {
					dispatch({ type: UPDATE_QUANTITY_ITEM_SUCCESS });
					console.log(`Update quantity success! --> ${response}`);
					resolve();
				})
				.catch((error) => {
					dispatch({ type: UPDATE_QUANTITY_ITEM_FAILED });
					console.log(error);
				});
			});
	};
};

export const addCheckout = (idProduct, quantity) => {
	return (dispatch) => {
		return new Promise((resolve) => {
			dispatch({ type: START_ADD_TO_CART });
			axios.request({
				url: `${baseURL}cart/add-checkout`,
				method: 'post',
				params: {
					productId: idProduct,
					qty: quantity
				}
			})
				.then((response) => {
					dispatch({ type: ADD_TO_CART_SUCCESS });
					resolve();
				})
				.catch((error) => {
					dispatch({ type: ADD_TO_CART_FAIL });
					console.log(error);
				});
			});
	};
};

export const removeCheckout = (checkout) => {
	return (dispatch) => {
		return new Promise((resolve) => {
			dispatch({ type: START_REMOVE_CHECKOUT });
			axios.request({ 
				url: `${baseURL}cart/del-checkout-${checkout}`,
				method: 'get'
			})
				.then((response) => {
					dispatch({ type: REMOVE_CHECKOUT_SUCCESS });
					console.log(`Checkout removed! --> ${response}`);
					resolve();
				})
				.catch((error) => {
					dispatch({ type: REMOVE_CHECKOUT_FAIL });
					console.log(error);
				});
			});
	};
};

export const payMidtransSingle = (checkout) => {
	return (dispatch) => {
		dispatch({ type: START_MIDTRANS_PAY });
		axios.request({
			url: `${baseURL}mid-resinglepay-${checkout}`,
			method: 'get'
		}).then((response) => {
			dispatch({ type: MIDTRANS_PAY_SUCCESS });
			console.log(response);
			NavigationService.navigate('PaymentWebViewScreen', { url: response.data.data });
		}).catch((response) => {
			dispatch({ type: MIDTRANS_PAY_FAIL });
			console.log(response);
		});
	};
};

export const payMidtrans = (idCheckouts) => {
	return (dispatch) => {
		dispatch({ type: START_MIDTRANS_PAY });
		axios.request({
			url: `${baseURL}pay/midtrans-list`,
			method: 'post',
			data: idCheckouts
		}).then((response) => {
			dispatch({ type: MIDTRANS_PAY_SUCCESS });
			NavigationService.navigate('PaymentWebViewScreen', { url: response.data.data.redirectUrl });
		}).catch((response) => {
			dispatch({ type: MIDTRANS_PAY_FAIL });
			console.log(response);
		});
	};
};

export const payLater = (idCheckouts) => {
	return (dispatch) => {
		dispatch({ type: START_PAYLATER });
		axios.request({
			url: `${baseURL}paylater/payall`,
			method: 'post',
			data: idCheckouts
		}).then((response) => {
			console.log(response);
			dispatch({ type: PAYLATER_SUCCESS });
			NavigationService.navigate('PaymentThankYouScreen');
		}).catch((error) => {
			dispatch({ type: PAYLATER_FAIL });
			renderMessage('Oops! Something went wrong...');
			console.log(error);
		});
	};
};

export const fetchShippingMethods = (idCheckout, idVendor) => {
	return (dispatch) => {
		dispatch({ type: START_FETCH_SHIPPING_METHODS });
		axios.request({
			url: `${baseURL}cart/shipping/checkprice`,
			method: 'get',
			params: {
				idCheckout: idCheckout,
				idVendor: idVendor
			}
		})
		.then((res) => {
			console.log(res);
			dispatch({ type: FETCH_SHIPPING_METHODS_SUCCESS, payload: res });
		})
		.catch((error) => {
			console.log(error);
			dispatch({ type: FETCH_SHIPPING_METHODS_FAIL });
		});
	};
};
