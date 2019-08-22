import { Toast } from 'native-base';
import axios from 'axios';
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
	RESET_PASSWORD_EMAIL_SENT,
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
	REMOVE_NPWP
} from './types';
import NavigationService from '../services/NavigationService';
import deviceStorage from '../services/deviceStorage';
import { baseURL } from '../services/constants';

function renderMessage(message) {
	return Toast.show({
		text: message,
		duration: 3000,
		buttonText: 'Got it!'
	});
}

export const restoNameChanged = (text) => {
	return {
		type: RESTO_NAME_CHANGED,
		payload: text
	};
};

export const companyNameChanged = (text) => {
	return {
		type: COMPANY_NAME_CHANGED,
		payload: text
	};
};

export const companyAddressChanged = (text) => {
	return {
		type: COMPANY_ADDRESS_CHANGED,
		payload: text
	};
};

export const provinceChanged = (text) => {
	return {
		type: PROVINCE_CHANGED,
		payload: text
	};
};

export const cityChanged = (text) => {
	return {
		type: CITY_CHANGED,
		payload: text
	};
};

export const zipCodeChanged = (text) => {
	return {
		type: ZIP_CODE_CHANGED,
		payload: text
	};
};

export const positionChanged = (text) => {
	return {
		type: POSITION_CHANGED,
		payload: text
	};
};

export const mobileNumberChanged = (text) => {
	return {
		type: MOBILE_NUMBER_CHANGED,
		payload: text
	};
};

export const phoneNumberChanged = (text) => {
	return {
		type: PHONE_NUMBER_CHANGED,
		payload: text
	};
};

export const npwpChanged = (text) => {
	return {
		type: NPWP_CHANGED,
		payload: text
	};
};

export const firstNameChanged = (text) => {
	return {
		type: FIRST_NAME_CHANGED,
		payload: text
	};
};

export const lastNameChanged = (text) => {
	return {
		type: LAST_NAME_CHANGED,
		payload: text
	};
};

export const emailChanged = (text) => {
	return {
		type: EMAIL_CHANGED,
		payload: text
	};
};

export const passwordChanged = (text) => {
	return {
		type: PASSWORD_CHANGED,
		payload: text
	};
};

export const removeNPWP = () => {
	return {
		type: REMOVE_NPWP
	};
};

export const forgetEmailChanged = (text) => {
	return {
		type: FORGET_EMAIL_CHANGED,
		payload: text
	};
};

export const loginUser = ({ email, password }) => {
	return (dispatch) => {
		dispatch({ type: LOGIN_USER });
		axios.post(`${baseURL}auth/signin`, { username: email, password: password })
			.then((response) => {
				console.log(response);
				deviceStorage.saveItem('id_token', response.data.token);
				deviceStorage.saveItem('id_user', response.data.user.id.toString());
				deviceStorage.saveItem('user_type', response.data.user.user_type.toString());
				dispatch({ type: LOGIN_USER_SUCCESS, payload: response });
				NavigationService.navigate('Home');
			})
			.catch((error) => {
				renderMessage(error.response.data.error);
				dispatch({ type: LOGIN_USER_FAIL });
			});
	};
};

export const registerUser = ({ firstName, lastName, email, password }) => {
	return (dispatch) => {
		dispatch({ type: REGISTER_USER });
		axios.post(`${baseURL}auth/register?firstname=${firstName}&lastname=${lastName}&email=${email}&password=${password}`)
		.then((user) => {
			console.log(user);
			dispatch({ type: REGISTER_USER_SUCCESS });
			NavigationService.navigate('LoginScreen');
			renderMessage('Please check your email for an account verification link!');
		})
		.catch((error) => {
			renderMessage(error.response.data.error);
			dispatch({ type: REGISTER_USER_FAIL });
		});
	};
};

// does this work yet?
export const registerBusinessUser = ({ rest_name, company_name, company_address, province, city, zipcode, position, firstname, lastname, email, password, mobile_number, phone_number, npwp }) => {	
	return (dispatch) => {
		console.log(npwp);
		
		const npwp_photo = {
			uri: npwp.uri,
			type: npwp.type,
			name: npwp.fileName
		};

		const formData = new FormData();
		formData.append('rest_name', rest_name);
		formData.append('company_name', company_name);
		formData.append('company_address', company_address);
		formData.append('province', province);
		formData.append('city', city);
		formData.append('zipcode', zipcode);
		formData.append('position', position);
		formData.append('mobile_number', mobile_number);
		formData.append('phone_number', phone_number);
		formData.append('firstname', firstname);
		formData.append('lastname', lastname);
		formData.append('email', email);
		formData.append('password', password);
		formData.append('npwp', npwp_photo);
		
		dispatch({ type: REGISTER_USER });
		
		axios.post(
				`${baseURL}auth/register-business`, 
				formData, 
				{
					headers: { 'Content-Type': 'multipart/form-data' }
				}
			)
			.then((response) => {
				console.log(response);
				dispatch({ type: REGISTER_USER_SUCCESS });
				NavigationService.navigate('LoginScreen');
				renderMessage('Your account is currently under review!');
			})
			.catch((error) => {
				console.log(error.response);
				renderMessage('Oops! Something went wrong...');
				dispatch({ type: REGISTER_USER_FAIL });
			});
	};
};

export const resetPasswordEmailSend = (email) => {
	return (dispatch) => {
		axios.request({
			url: `${baseURL}auth/password-reset-send`,
			method: 'post',
			params: {
				email: email
			}
		})
			.then((response) => {
				dispatch({ type: RESET_PASSWORD_EMAIL_SENT });
				console.log(response);
				renderMessage(response.data.message);
				// "Check your email for instructions on how to reset your password"
			})
			.catch((error) => {
				renderMessage('Oops! Something went wrong...');
			});
	};
};

export const signOut = () => {
	return (dispatch) => {
		dispatch({ type: LOGOUT_SUCCESS });
		deviceStorage.removeJWT();
		deviceStorage.removeUserId();
		deviceStorage.removeUserType();
		NavigationService.navigate('AuthStack');
	};
};
