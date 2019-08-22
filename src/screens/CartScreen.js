import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, StackActions, NavigationEvents } from 'react-navigation';
import { 
	Container, 
	Content, 
	Card, 
	CardItem, 
	Left, 
	Button, 
	Spinner, 
	Text, 
	Toast 
} from 'native-base';
import CartFooter from '../components/CartFooter';
import ConfirmPaymentModal from '../components/ConfirmPaymentModal';
import CartItemList from '../components/CartItemList';
import { 
	fetchCheckout,
	updateQuantityCheckoutItem,
	removeCheckout,
	updateCheckoutShippingMethod,
	payMidtransSingle,
	payMidtrans,
	payLater
} from '../actions/';
import { CART_EMPTY_STATE_IMAGE } from '../images/';

class CartScreen extends Component {
	static navigationOptions = {
		title: 'Cart',
		headerTitleStyle: {
			color: '#2077be',
		},
	};

	constructor(props) {
		super(props);
		this.state = { modalVisible: false, checked: [] };
	}

	componentDidMount() {
		this.props.fetchCheckout();
	}

	onUpdateCheckoutWithRestoShippingAddress(itemValue, idCheckout) {
		this.props.updateCheckoutRestoShippingAddress(itemValue, idCheckout).then(() => {
			const resetAction = StackActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({ routeName: 'CartScreen' })]
			});
			this.props.navigation.dispatch(resetAction);
		});
	}

	onUpdateCheckoutWithShippingMethod(itemValue, cost, idCheckout) {
		this.props.updateCheckoutShippingMethod(itemValue, cost, idCheckout).then(() => {
			const resetAction = StackActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({ routeName: 'CartScreen' })]
			});
			this.props.navigation.dispatch(resetAction);
		});
	}

	onUpdateQuantityItem(idCheckoutItem, quantity) {
		this.props.updateQuantityCheckoutItem(idCheckoutItem, quantity).then(() => {
			const resetAction = StackActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({ routeName: 'CartScreen' })]
			});
			this.props.navigation.dispatch(resetAction);
		});
	}

	onRemoveCheckoutFromCart() {
		const mappedArray = this.state.checked.map(checkout => this.props.removeCheckout(checkout).then(() => {
			const resetAction = StackActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({ routeName: 'CartScreen' })]
			});
			this.props.navigation.dispatch(resetAction);
		}));
	}

	onSelectAllButtonPress() {
		const mappedArray = this.props.checkout_list.map((checkout) => checkout.id_checkout);
		this.setState({ checked: mappedArray });
	}

	onBuyButtonPress() {
		if (this.isValid() === true) {
			this.showModal();
		} else {
			return Toast.show({
				text: 'Please complete your shipping information!',
				duration: 3000,
				buttonText: 'Got it!'
			});
		}
	}

	isValid() {
		for (const checkout of this.props.checkout_list) {
			if (checkout.id_resto_shipping_address === 0 || checkout.shipping_name === null) {
				return false;
			}
		}
		return true;
	}

	checkoutMidtrans() {
		const idCheckouts = this.state.checked;
		this.props.payMidtrans(idCheckouts);
		this.setState({ checked: [] });
	}

	checkoutPayLater() {
		const idCheckouts = this.state.checked;
		this.props.payLater(idCheckouts);
		this.setState({ checked: [] });
	}

	addOrRemoveFromChecked(idCheckout) {
		const newCheckedArray = this.state.checked;
		if (newCheckedArray.includes(idCheckout)) {
			const finalArray = newCheckedArray.filter((item) => item !== idCheckout);
			this.setState({ checked: finalArray });
		} else {
			newCheckedArray.push(idCheckout);
			this.setState({ checked: newCheckedArray });
		}
	}

	showModal() {
		this.setState({ modalVisible: true });
	}

	closeModal() {
		this.setState({ modalVisible: false });
	}

	renderLoadingOrContent() {
		const { emptyStateContainerStyle, imageStyle } = styles;
		const { checkout_list, loading } = this.props;

		if (loading) {
			return <Spinner size='small' />;
		} else if (checkout_list === undefined || checkout_list.length === 0) {
			return (
				<View style={emptyStateContainerStyle}>
					<View style={{ marginBottom: 10 }}>
						<Image style={imageStyle} source={CART_EMPTY_STATE_IMAGE} />
					</View>
					<Text style={{ fontSize: 14, color: '#444444' }}>This cart is empty</Text>
					<Text style={{ fontSize: 14, fontWeight: '600' }}>Fill it with GOOD things!</Text>
				</View>
			);
		}
		return (
			<View>
				<Card transparent>
					<CardItem>
						<Left>
						<Button 
							small 
							bordered 
							onPress={() => this.onSelectAllButtonPress()}
						>
							<Text style={{ fontSize: 14 }}>Select All</Text>
						</Button>
						</Left>
						<Button 
							small 
							danger
							onPress={() => this.onRemoveCheckoutFromCart()}
						>
							<Text>Remove</Text>
						</Button>
					</CardItem>
				</Card>
				<CartItemList 
					checkoutList={checkout_list} 
					checked={this.state.checked}
					shippingAddresses={this.props.shipping_addresses}
					addOrRemoveFromChecked={this.addOrRemoveFromChecked.bind(this)}
					onUpdateQuantityItem={this.onUpdateQuantityItem.bind(this)}
					onUpdateCheckoutWithShippingMethod={this.onUpdateCheckoutWithShippingMethod.bind(this)}
				/>
				<ConfirmPaymentModal 
					modalVisible={this.state.modalVisible} 
					onDecline={this.closeModal.bind(this)}
					checkoutMidtrans={this.checkoutMidtrans.bind(this)}
					checkoutPayLater={this.checkoutPayLater.bind(this)}
					user_type={this.props.user_type}
				/>
			</View>
		);
	}

	render() {
		const { total_price, checkout_list } = this.props;
		return (
			<Container>
				<NavigationEvents onDidFocus={() => this.props.fetchCheckout()} />
				<Content padder style={{ flex: 1 }}>
					{this.renderLoadingOrContent()}
				</Content>
				<View style={{ paddingTop: '20%' }}>
					<CartFooter
						checkoutList={checkout_list}
						checked={this.state.checked}
						showModal={this.showModal.bind(this)}
						totalPrice={total_price}
						onBuyButtonPress={this.onBuyButtonPress.bind(this)}
					/>
				</View>
			</Container>
		);
	}
}

const styles = {
	emptyStateContainerStyle: {
		flex: 1, 
		alignItems: 'center', 
		justifyContent: 'center',
		paddingTop: '50%'
	},
	imageStyle: {
		height: 100,
		width: 100
	}
};

const mapStateToProps = state => {
	return {
		loading: state.cart.loading,
		checkout_list: state.cart.checkout_list,
		total_price: state.cart.total_price,
		redirect_url: state.cart.redirect_url,
		shipping_addresses: state.cart.shipping_addresses,
		user_type: state.auth.user_type
	};
};

export default connect(mapStateToProps, { 
	fetchCheckout, 
	updateQuantityCheckoutItem,
	removeCheckout,
	updateCheckoutShippingMethod,
	payMidtransSingle,
	payMidtrans,
	payLater
})(CartScreen);
