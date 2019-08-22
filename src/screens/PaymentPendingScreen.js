import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text, H3, Button } from 'native-base'; 
import { StackActions, NavigationActions } from 'react-navigation';
import { PENDING_CLOCK } from '../images/';

class PaymentPendingScreen extends Component {
	static navigationOptions =({ navigation }) => {
		return {
			header: null,
		};
	}

	render() {
		const { imageStyle, imageSectionStyle, imageContainerStyle, textStyle, textContainerStyle } = styles;
		return (
			<View style={{ flex: 1 }}>
				<View style={imageSectionStyle}>
					<View style={imageContainerStyle}>
						<Image 
							source={PENDING_CLOCK} 
							style={imageStyle}
						/>
					</View>

					<View style={{ marginTop: 20 }}>
						<H3 style={{ color: 'white' }}>
							Your payment is pending!
						</H3>
					</View>

					<View style={textContainerStyle}>
						<Text style={textStyle}>
							Please check your email for more information on how to complete your payment
						</Text>
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
		backgroundColor: 'tomato',
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageContainerStyle: {

	},
	imageStyle: {
		width: 75,
		height: 75
	},
	textContainerStyle: {
		marginTop: 10, 
		paddingHorizontal: 20
	},
	textStyle: {
		fontSize: 14, 
		color: 'white', 
		textAlign: 'center'
	} 
};

export default PaymentPendingScreen;
