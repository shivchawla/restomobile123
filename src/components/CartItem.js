import React, { Component } from 'react';
import { View } from 'react-native';
import { 
	Text, 
	Button,
	Card, 
	CardItem, 
	Left, 
	CheckBox, 
	Icon
} from 'native-base';
import { withNavigation } from 'react-navigation';
import CartItemProductList from './CartItemProductList';
import CartLineItem from './CartLineItem';

class CartItem extends Component {
	renderNoShippingMethodAlert() {
		const { deliveryAlertTextStyle } = styles;
		return (
			<View style={{ flex: 1, backgroundColor: 'red' }}>
				<Text style={deliveryAlertTextStyle}>Please choose a delivery method!</Text>
			</View>
		);
	}

	renderAddressCheckmark() {
		const { checkout } = this.props;
		if (checkout.id_resto_shipping_address !== 0) {
			return (
				<Icon name='ios-checkmark' style={{ fontSize: 28 }} />
			);
		}
	}

	renderShippingMethodCheckmark() {
		const { checkout } = this.props;
		if (checkout.shipping_name !== null) {
			return (
				<Icon name='ios-checkmark' style={{ fontSize: 28 }} />
			);
		}
	}

	renderButtonTextOrShippingMethod() {
		if (this.props.checkout.shipping_name === null) {
			return <Text>Choose Shipping Method</Text>;
		}
		return <Text>{this.props.checkout.shipping_name}</Text>;
	}

	renderButtonTextOrShippingAddress() {
		if (this.props.checkout.id_resto_shipping_address === 0) {
			return <Text>Choose Shipping Address</Text>;
		}
		return <Text>{this.props.checkout.shippingAddress.name}</Text>;
	}

	renderShippingMethodChooseButton() {
		const { checkout } = this.props;
		const { shippingAddressAlertTextStyle } = styles;

		if (checkout.id_resto_shipping_address !== 0) {
			return (
				<Button
					success={checkout.shipping_name !== null ? true : false}
					bordered
					full
					onPress={() => this.props.navigation.navigate(
						'ChooseShippingScreen', 
						{ 
							idCheckout: checkout.id_checkout, 
							idVendor: checkout.id_vendor
						}
					)}
				>
					{this.renderShippingMethodCheckmark()}
					{this.renderButtonTextOrShippingMethod()}
				</Button>
			);
		}
		return (
			<View style={{ backgroundColor: 'yellow' }}>
				<Text style={shippingAddressAlertTextStyle}>Please choose a shipping adddress</Text>
			</View>
			);
	}

	renderShippingAddressChooseButton() {
		const { checkout } = this.props;
		return (
			<Button
				success={checkout.id_resto_shipping_address !== 0 ? true : false}
				bordered
				full
				onPress={() => this.props.navigation.navigate(
					'ChooseShippingAddressScreen', 
					{ 
						idCheckout: checkout.id_checkout, 
						shippingAddresses: this.props.shippingAddresses 
					}
				)}
				style={{ marginBottom: 10 }}
			>
				{this.renderAddressCheckmark()}
				{this.renderButtonTextOrShippingAddress()}
			</Button>
		);
	}

	render() {
		const { onUpdateQuantityItem } = this.props;
		const { checkout } = this.props;
		
		return (
			<Card style={checkout.id_resto_shipping_address !== 0 && checkout.shipping_name !== null ? { borderColor: 'green' } : {}}>
				<CardItem header bordered style={{ backgroundColor: '#F3F9FF' }}>
					<Left>
						<CheckBox
							checked={this.props.checked.includes(checkout.id_checkout)}
							onPress={() => {
								this.props.addOrRemoveFromChecked(checkout.id_checkout);
							}}
						/>
					</Left>
					<Text>
						{checkout.vendor.company_name}
					</Text>
				</CardItem>
				<CartItemProductList 
					checkout={checkout} 
					onUpdateQuantityItem={onUpdateQuantityItem} 
				/>
				<CartLineItem 
					name='Shipping Price' 
					amount={checkout.shipping_cost} 
				/>
				<CartLineItem 
					name='Discount' 
					amount={checkout.discount_amount} 
					style={{ color: 'green' }} 
				/>
				<CartLineItem 
					name='Total Price' 
					amount={checkout.total_price} 
				/>
				{this.renderShippingAddressChooseButton()}
				{this.renderShippingMethodChooseButton()}
			</Card>
		);
	}
}

const styles = {
	shippingAddressAlertTextStyle: {
		textAlign: 'center', 
		fontSize: 12, 
		paddingVertical: 5
	},
	deliveryAlertTextStyle: {
		color: 'white',
		fontSize: 14,
		textAlign: 'center',
		paddingVertical: 10
	}
};

export default withNavigation(CartItem);
