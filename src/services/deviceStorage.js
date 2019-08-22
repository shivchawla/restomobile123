import AsyncStorage from '@react-native-community/async-storage';
import { 
	LOAD_JWT, 
	REMOVE_JWT, 
	LOAD_USER_ID, 
	REMOVE_USER_ID, 
	REMOVE_USER_TYPE, 
	LOAD_USER_TYPE 
} from '../actions/types';
import store from '../store';

const deviceStorage = {
	async saveItem(key, value) {
		try {
			await AsyncStorage.setItem(key, value);
		} catch (error) {
			console.log(`AsyncStorage Error: ${error.message}`);
		}
	},

	async getItem(key) {
		try {
			const item = await AsyncStorage.getItem(key);
			return item;
		} catch (error) {
			console.log(error);
		}
	},

	async loadUserId() {
		try {
			const value = await AsyncStorage.getItem('id_user');
			if (value !== null) {
				store.dispatch({ type: LOAD_USER_ID, payload: value });
			} else {
				console.log('No id_user');
				store.dispatch({ type: REMOVE_USER_ID });
			}
		} catch (error) {
			console.log(`AsyncStorage Error: ${error.message}`);
		}
	},

	async removeUserId() {
		try {
			await AsyncStorage.removeItem('id_user').then(() => store.dispatch({ type: REMOVE_USER_ID }));
		} catch (error) {
			console.log(`AsyncStorage Error: ${error.message}`);
		}
	},

	async loadJWT() {
		try {
			const value = await AsyncStorage.getItem('id_token');
			if (value !== null) {
				store.dispatch({ type: LOAD_JWT, payload: value });
			} else {
				console.log('No JWT in this device');
				store.dispatch({ type: REMOVE_JWT });
			}
		} catch (error) {
			console.log(`AsyncStorage Error: ${error.message}`);
		}
	},

	async loadUserType() {
		try {
			const value = await AsyncStorage.getItem('user_type');
			if (value !== null) {
				store.dispatch({ type: LOAD_USER_TYPE, payload: value });
			} else {
				console.log('No user_type loaded in this device');
				store.dispatch({ type: REMOVE_USER_TYPE });
			}
		} catch (error) {
			console.log(`AsyncStorage Error: ${error.message}`);
		}
	},

	async removeJWT() {
		try {
			await AsyncStorage.removeItem('id_token').then(() => store.dispatch({ type: REMOVE_JWT }));
		} catch (error) {
			console.log(`AsyncStorage Error: ${error.message}`);
		}
	},

	async removeUserType() {
		try {
			await AsyncStorage.removeItem('user_type').then(() => store.dispatch({ type: REMOVE_USER_TYPE }));
		} catch (error) {
			console.log(`AsyncStorage Error: ${error.message}`);
		}
	}
};

export default deviceStorage;
