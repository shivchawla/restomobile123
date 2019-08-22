import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text, H3, Button } from 'native-base'; 
import { StackActions, NavigationActions } from 'react-navigation';
import { SUCCESS_CHECK_MARK } from '../images/';

class PaymentThankYouScreen extends Component {
	static navigationOptions =({ navigation }) => {
		return {
			header: null,
		};
	}

	render() {
		const { imageStyle, imageSectionStyle, imageContainerStyle } = styles;
		return (
			<View style={{ flex: 1 }}>
				<View style={imageSectionStyle}>
					<View style={imageContainerStyle}>
						<Image 
							source={SUCCESS_CHECK_MARK} 
							style={imageStyle}
						/>
					</View>

					<View style={{ marginTop: 20 }}>
						<H3 style={{ color: 'white' }}>
							Your payment was successful!
						</H3>
					</View>

					<View style={{ marginTop: 40 }}>
						<Button
							onPress={() => this.props.navigation.navigate('OrdersScreen')}
						>
							<Text>Manage Orders</Text>
						</Button>
					</View>
				</View>
			</View>
		);
	}
}

const styles = {
	imageSectionStyle: {
		flex: 1,
		backgroundColor: '#1ec71e',
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageContainerStyle: {

	},
	imageStyle: {
		width: 75,
		height: 75
	}
};

export default PaymentThankYouScreen;
