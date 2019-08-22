import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Container, Content, Button, Text, H3 } from 'native-base';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import { updateCheckoutRestoShippingAddress } from '../actions';
import { LOCATION_MAP } from '../images/';

class ChooseShippingAddressScreen extends Component {
	static navigationOptions = {
		title: 'Shipping Addresses',
		headerTitleStyle: {
			color: '#2077be',
		},
	};

	onUpdateCheckoutWithRestoShippingAddress(id_resto_shipping_address, idCheckout) {
		this.props.updateCheckoutRestoShippingAddress(id_resto_shipping_address, idCheckout).then(() => {
			const resetAction = StackActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({ routeName: 'CartScreen' })]
			});
			this.props.navigation.dispatch(resetAction);
		});
	}

	render() {
		const { 
			buttonStyle, 
			screenContainerStyle,
			boxContainerStyle,
			boxImageStyle,
			addShippingAddressButtonContainer,
			titleContainerStyle 
		} = styles;
		const shippingAddresses = this.props.navigation.getParam('shippingAddresses');
		const idCheckout = this.props.navigation.getParam('idCheckout');
		const renderShippingAddresses = shippingAddresses.map((shippingAddress) => {	
			return (
				<Button 
					key={shippingAddress.id}
					style={buttonStyle}
					onPress={() => this.onUpdateCheckoutWithRestoShippingAddress(shippingAddress.id, idCheckout)}
				>
					<Text>
						{shippingAddress.name}
					</Text>
				</Button>
			);
		});


		return (
			<Container>
				<Content>
					<View style={screenContainerStyle}>
						<View style={{ paddingTop: 50 }}>
							<View style={boxContainerStyle}>
								<Image source={LOCATION_MAP} style={boxImageStyle} />
							</View>

							<View style={titleContainerStyle}>
								<H3 style={{ textAlign: 'center' }}>Where would you like us to send your order?</H3>
							</View>

							<View>
								{renderShippingAddresses}
							</View>

							<View style={addShippingAddressButtonContainer}>
								<Button 
									bordered
									onPress={() => this.props.navigation.navigate('AddShippingAddressScreen')}
									style={buttonStyle}
								>
									<Text>Add Shipping Address</Text>
								</Button>
							</View>
						</View>
					</View>
				</Content>
			</Container>
		);
	}
}

const styles = {
	screenContainerStyle: {
		flex: 1,
	},
	boxContainerStyle: {
		justifyContent: 'center',
		alignSelf: 'center'
	},
	boxImageStyle: {
		width: 100,
		height: 100
	},
	buttonStyle: {
		marginBottom: 10,
		alignSelf: 'center',
	},
	addShippingAddressButtonContainer: {
		marginTop: 50
	},
	titleContainerStyle: {
		paddingVertical: 20, 
		paddingHorizontal: 10
	}
};

export default connect(null, { 
	updateCheckoutRestoShippingAddress 
})(ChooseShippingAddressScreen);
