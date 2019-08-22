import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { 
	Text,
	CardItem,
	Form, 
	Picker, 
	Icon, 
	StyleProvider, 
	Spinner,
	getTheme 
} from 'native-base';

class ShippingAddressPicker extends Component {
	constructor(props) {
		super(props);
		this.state = { id_resto_shipping_address: this.props.checkout.id_resto_shipping_address };
	}

	renderLoadingOrPicker() {
		const { pickerTextStyle } = styles;
		const { checkout } = this.props;
		const { id_resto_shipping_address } = this.state;
		const renderShippingAddresses = this.props.shippingAddresses.map((shippingAddress) => {
			return (
				<Picker.Item 
					label={shippingAddress.name} 
					value={shippingAddress.id} 
					key={shippingAddress.id} 
				/>
			);
		});

		if (this.props.loading) {
			return <Spinner size='small' />;
		}
		return (
			<Picker
				mode="dropdown"
				note
				selectedValue={id_resto_shipping_address}
				textStyle={pickerTextStyle}
				onValueChange={(itemValue) => {
					this.props.onUpdateCheckoutWithRestoShippingAddress(itemValue, checkout.id_checkout);
				}}
			>
				<Picker.Item label='None' value={0} />
				{renderShippingAddresses}
			</Picker>
		);
	}

	render() {
		const { containerStyle, shippingMethodsTextContainerStyle } = styles;
		return (
			<CardItem bordered>
				<View style={containerStyle}>
					<View style={shippingMethodsTextContainerStyle}>
						<StyleProvider style={getTheme({ iconFamily: 'MaterialCommunityIcons' })}>
							<Icon 
								name='store'
								style={{ fontSize: 16 }}
							/>
						</StyleProvider>
						<Text style={{ fontSize: 14 }}>Delivery Address</Text>
					</View>

					<View style={{ flex: 1 }}>
						<Form>
							{this.renderLoadingOrPicker()}
						</Form>
					</View>
				</View>
			</CardItem>
		);
	}
}

const styles = {
	containerStyle: {
		flexDirection: 'row'
	},
	shippingMethodsTextContainerStyle: {
		flexDirection: 'row', 
		justifyContent: 'center', 
		alignItems: 'center' 
	},
	pickerTextStyle: {
		fontSize: 14, 
		flexShrink: 1, 
		textAlign: 'right'
	}
};

const mapStateToProps = state => {
	return {
		shippingAddresses: state.cart.shipping_addresses,
		loading: state.cart.loading
	};
};

export default connect(mapStateToProps, null)(ShippingAddressPicker);
