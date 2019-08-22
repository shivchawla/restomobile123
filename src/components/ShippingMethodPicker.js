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
	getTheme 
} from 'native-base';
import CustomPickerItem from './CustomPickerItem';
import { numberWithCommas } from '../services/utils';

class ShippingMethodPicker extends Component {
	constructor(props) {
		super(props);
		this.state = { shipping_name: this.props.checkout.shipping_name };
	}

	renderPicker() {
		const { 
			pickerTextStyle, 
			containerStyle, 
			shippingMethodsTextContainerStyle, 
			deliveryAlertTextStyle 
		} = styles;

		const renderShippingMethods = this.props.shippingData.map((shippingMethod) => {
			//how to get shippingMethod.cost?
			return (
				<CustomPickerItem 
					label={`${shippingMethod.shippingName} - IDR ${numberWithCommas(shippingMethod.cost)}`} 
					value={shippingMethod.shippingName} 
					key={shippingMethod.shippingName}
				/>
			);
		});

		if (this.props.checkout.id_resto_shipping_address !== 0) {
			return (
				<View style={containerStyle}>
					<View style={shippingMethodsTextContainerStyle}>
						<StyleProvider style={getTheme({ iconFamily: 'MaterialCommunityIcons' })}>
							<Icon 
								name='truck'
								style={{ fontSize: 16 }}
							/>
						</StyleProvider>
						<Text style={{ fontSize: 14 }}>Shipping Method</Text>
					</View>

					<View style={{ flex: 1 }}>
						<Form>
							<Picker
								mode="dropdown"
								note
								selectedValue={this.state.shipping_name}
								textStyle={pickerTextStyle}
								onValueChange={(itemValue) => {
									this.props.onUpdateCheckoutWithShippingMethod(itemValue, 100000, this.props.checkout.id_checkout);
								}}
							>
								<CustomPickerItem label="None" value={null} />
								{renderShippingMethods}
							</Picker>
						</Form>
					</View>
				</View>
			);
		}
		return (
			<View style={{ flex: 1 }}>
				<Text style={deliveryAlertTextStyle}>Please choose a delivery address!</Text>
			</View>
		);
	}

	render() {
		return (
			<CardItem bordered>
				{this.renderPicker()}
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
	},
	deliveryAlertTextStyle: {
		color: 'red',
		fontSize: 14,
		textAlign: 'center',
		paddingVertical: 10
	}
};

const mapStateToProps = state => {
	return {
		shippingMethods: state.cart.shipping_methods,
		loading: state.cart.loading
	};
};

export default connect(mapStateToProps, null)(ShippingMethodPicker);
