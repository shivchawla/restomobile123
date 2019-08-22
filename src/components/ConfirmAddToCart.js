import React, { Component } from 'react';
import { Modal, Text, View } from 'react-native';
import { Button, Card } from 'native-base';
import NumericInput from 'react-native-numeric-input';

class ConfirmAddToCart extends Component {
	constructor(props) {
		super(props);
		this.state = { quantity: props.product.min_buy_qty };
	}

	render() {
		const { 
			containerStyle, 
			textStyle, 
			cardStyle,
			buttonContainerStyle,
			numericInputContainerStyle, 
			buttonStyle, 
			buttonTextStyle,
			cancelButtonTextStyle 
		} = styles;

		const { product, onAccept, onDecline } = this.props;
		const { quantity } = this.state;

		return (
			<Modal
				visible={this.props.modalVisible}
				transparent
				animationType='fade'
				onRequestClose={() => {}}
			>
				<View style={containerStyle}>
					<Card style={cardStyle}>
						<Text style={textStyle}>How many do you need?</Text>
						<View style={numericInputContainerStyle}>
							<NumericInput
								onChange={(value) => this.setState({ quantity: value })} 
								initValue={quantity}
								minValue={this.state.quantity}
							/>
						</View>
						<View style={buttonContainerStyle}>
							<Button 
								bordered 
								danger 
								style={buttonStyle} 
								onPress={onDecline}
							>
								<Text style={cancelButtonTextStyle}>Cancel</Text>
							</Button>
							<Button
								success 
								style={buttonStyle} 
								onPress={() => onAccept(product.id, quantity)}
							>
								<Text style={buttonTextStyle}>Confirm</Text>
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
		flex: 0.3,
	},
	textStyle: {
		fontSize: 18,
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
	numericInputContainerStyle: {
		alignItems: 'center', 
		paddingTop: 20
	},
	buttonContainerStyle: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-around'
	},
	buttonStyle: {
		alignSelf: 'center',
		paddingRight: 15,
		paddingLeft: 15
	},
	buttonTextStyle: {
		color: 'white'
	},
	cancelButtonTextStyle: {
		color: 'red'
	}
};

export default ConfirmAddToCart;
