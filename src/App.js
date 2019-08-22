import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { 
	createBottomTabNavigator, 
	createStackNavigator, 
	createSwitchNavigator,
	createAppContainer
} from 'react-navigation';
import { Root, Icon, StyleProvider, getTheme } from 'native-base';
import axios from 'axios';
import { Platform, StatusBar } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import OrdersScreen from './screens/OrdersScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RegisterBusinessScreen from './screens/RegisterBusinessScreen';
import SettingsScreen from './screens/SettingsScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import EditShippingAddressScreen from './screens/EditShippingAddressScreen';
import AddShippingAddressScreen from './screens/AddShippingAddressScreen';
import CartScreen from './screens/CartScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import QVScreen from './screens/QVScreen';
import AllProductsScreen from './screens/AllProductsScreen';
import SortByScreen from './screens/SortByScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import VendorScreen from './screens/VendorScreen';
import ReviewsScreen from './screens/ReviewsScreen';
import PinLocationMapScreen from './screens/PinLocationMapScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';
import AllVendorsScreen from './screens/AllVendorsScreen';
import ContactUsScreen from './screens/ContactUsScreen';
import PaymentWebViewScreen from './screens/PaymentWebViewScreen';
import ChooseShippingAddressScreen from './screens/ChooseShippingAddressScreen';
import ChooseShippingScreen from './screens/ChooseShippingScreen';
import PaymentThankYouScreen from './screens/PaymentThankYouScreen';
import PaymentPendingScreen from './screens/PaymentPendingScreen';
import PaymentFailedScreen from './screens/PaymentFailedScreen';
import NavigationService from './services/NavigationService';
import deviceStorage from './services/deviceStorage';
import store from './store';
import { signOut } from './actions/';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Root>
					<AppContainer 
						ref={navigatorRef => {
							NavigationService.setTopLevelNavigator(navigatorRef);
					}}
					/>
				</Root>
			</Provider>
		);
	}
}

const AuthStack = createStackNavigator({ LoginScreen, RegisterScreen, RegisterBusinessScreen });

const VendorStack = createStackNavigator(
{ 
	AllVendorsScreen,
	VendorScreen, 
	ProductDetailScreen,
	ReviewsScreen
}
);

const CategoriesStack = createStackNavigator(
	{ CategoriesScreen, SortByScreen, ProductDetailScreen },
	{ 
		headerMode: 'none' 
	}
);

const QVStack = createStackNavigator(
	{ QVScreen, SortByScreen, ProductDetailScreen },
	{ 
		headerMode: 'none' 
	}
);

const AllProductsStack = createStackNavigator(
	{ AllProductsScreen, ProductDetailScreen },
	{ 
		headerMode: 'none' 
	}
);

const SearchStack = createStackNavigator(
	{ SearchResultsScreen, SortByScreen, ProductDetailScreen },
	{ 
		headerMode: 'none' 
	}
);

const HomeStack = createStackNavigator(
{ 
	HomeScreen,
	SearchStack, 
	CategoriesStack, 
	QVStack, 
	VendorStack, 
	AllProductsStack,
	ProductDetailScreen,
	ReviewsScreen
}, 
{
	cardStyle: {
		...Platform.select({
			android: { paddingTop: StatusBar.currentHeight }
		})
	},
	headerMode: 'none' 
}
);

const OrdersStack = createStackNavigator(
{ 
	OrdersScreen,
	OrderDetailsScreen
},
{
	cardStyle: {
		...Platform.select({
			android: { paddingTop: StatusBar.currentHeight }
		})
	},
},
);

const SettingsStack = createStackNavigator(
{ 
	SettingsScreen,
	ContactUsScreen, 
	ShippingAddressScreen,
	EditShippingAddressScreen, 
	AddShippingAddressScreen,
	PinLocationMapScreen, 
},
{
	cardStyle: {
		...Platform.select({
			android: { paddingTop: StatusBar.currentHeight }
		})
	},
},
);

const CartStack = createStackNavigator(
{ 
	CartScreen,
	ChooseShippingAddressScreen,
	ChooseShippingScreen,
	PaymentWebViewScreen,
	PaymentPendingScreen,
	PaymentThankYouScreen,
	PaymentFailedScreen,
},
{
	cardStyle: {
		...Platform.select({
			android: { paddingTop: StatusBar.currentHeight }
		})
	},
},
);

const MainTabNavigator = createBottomTabNavigator({
	Home: HomeStack,
	Orders: OrdersStack,
	Cart: {
		screen: CartStack,
		navigationOptions: {
			tabBarOnPress: ({ navigation, defaultHandler }) => {
				navigation.navigate('CartScreen');
				defaultHandler();
			}
		}
	},
	Settings: SettingsStack,
},
{
	defaultNavigationOptions: ({ navigation }) => ({
		tabBarOptions: {
			activeTintColor: 'tomato',
			inactiveTintColor: 'gray'
		},
		tabBarIcon: ({ focused }) => {
			const { routeName } = navigation.state;
			let iconName;
			if (routeName === 'Home') {
				iconName = `home${focused ? '' : '-outline'}`;
			} else if (routeName === 'Orders') {
				iconName = `file${focused ? '' : '-outline'}`;
			} else if (routeName === 'Settings') {
				iconName = `settings${focused ? '' : '-outline'}`;
			} else if (routeName === 'Cart') {
				iconName = `cart${focused ? '' : '-outline'}`;
			}
			return (
				<StyleProvider style={getTheme({ iconFamily: 'MaterialCommunityIcons' })}>
					<Icon 
						name={iconName}
						style={{ fontSize: 20 }}
					/>
				</StyleProvider>
			);
		},
	}),
}
);

const AppSwitchNavigator = createSwitchNavigator(
{
	AuthLoadingScreen: { screen: AuthLoadingScreen },
	AuthStack: { screen: AuthStack },
	Main: { screen: MainTabNavigator }
},
{
	initialRouteName: 'AuthLoadingScreen'
}
);

const AppContainer = createAppContainer(AppSwitchNavigator);

// Axios Interceptors

axios.interceptors.request.use((config) => {
	const newConfig = config;
	const token = store.getState().auth.jwt;
	if (token != null) {
		newConfig.headers.Authorization = `Bearer ${token}`;
	}
	return newConfig;
}, (error) => {
	console.log(error);
	return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
	return response;
}, (error) => {
	if (error.response.status === 401) {
		deviceStorage.removeJWT();
		store.dispatch(signOut());
	} else {
		return Promise.reject(error);
	}
});

export default App;
