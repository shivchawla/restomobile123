import React, { Component } from 'react';
import { Modal, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, H1 } from 'native-base';
import { LOCATION_SUCCESS } from '../images/';
import { hideThankYouModal } from '../actions/';

class ThankYouPurchaseModal extends Component {
	render() {
		const { 
			containerStyle, 
			imageStyle,
			textStyle, 
			cardStyle,
			buttonContainerStyle,
			buttonStyle, 
			buttonTextStyle 
		} = styles;

		return (
			<Modal
				visible={this.props.modalVisible}
				transparent
				animationType='fade'
				onRequestClose={() => {}}
			>
				<View style={containerStyle}>
					<Card style={cardStyle}>
						<Image style={imageStyle} source={LOCATION_SUCCESS} />
						<H1 style={textStyle}>Thank you!</H1>
						<Text style={{ textAlign: 'center' }}>
							Your order is now being processed. 
							Click the button below to view, 
							manage or track your orders
						</Text>
						<View style={buttonContainerStyle}>
							<Button 
								style={buttonStyle} 
								onPress={() => this.props.hideThankYouModal()}
							>
								<Text style={buttonTextStyle}>Continue</Text>
							</Button>
						</View>
					</Card>
				</View>
			</Modal>
		);
	}
}

const styles = {
	cardStyle: {
		backgroundColor: 'white',
		flex: 0.4,
	},
	imageStyle: {
		width: 75,
		height: 75,
		alignSelf: 'center',
		marginTop: 25
	},
	textStyle: {
		textAlign: 'center',
		paddingTop: 20,
		lineHeight: 40
	},
	containerStyle: {
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
		position: 'relative',
		flex: 1,
		justifyContent: 'center'
	},
	buttonContainerStyle: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-around'
	},
	buttonStyle: {
		alignSelf: 'center',
		marginBottom: 10,
		paddingRight: 15,
		paddingLeft: 15
	},
	buttonTextStyle: {
		color: 'white'
	}
};

export default connect(null, { hideThankYouModal })(ThankYouPurchaseModal);
