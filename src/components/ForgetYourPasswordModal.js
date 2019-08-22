import React from 'react';
import { Modal, Text, View } from 'react-native';
import { Button, Card, Form, Item, Label, Input } from 'native-base';

function ForgetYourPasswordModal({ modalVisible, onAccept, onDecline, onForgetEmailChanged }) {
	const { 
		containerStyle, 
		textStyle, 
		cardStyle,
		buttonContainerStyle,
		buttonStyle, 
		buttonTextStyle,
		cancelButtonTextStyle 
	} = styles;

	return (
		<Modal
			visible={modalVisible}
			transparent
			animationType='fade'
			onRequestClose={() => {}}
		>
			<View style={containerStyle}>
				<Card style={cardStyle}>
					<View style={{ paddingTop: 25, paddingHorizontal: 5 }}>
						<Text style={textStyle}>Oops! Did you forget your password?</Text>
						<Text style={{ textAlign: 'center' }}>Please enter your email and we'll send an email with instructions on how to reset your password</Text>
					</View>
					<Form style={{ paddingVertical: 20 }}>
						<Item stackedLabel>
							<Label>Email</Label>
							<Input 
								autoCapitalize='none' 
								onChangeText={(text) => onForgetEmailChanged(text)}
							/>
						</Item>
					</Form>
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
							onPress={onAccept}
						>
							<Text style={buttonTextStyle}>Confirm</Text>
						</Button>
					</View>
				</Card>
			</View>
		</Modal>
	);
}

const styles = {
	cardStyle: {
		backgroundColor: 'white',
		flex: 0.6
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
	buttonContainerStyle: {
		flexDirection: 'row',
		flex: 0.5,
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

export default ForgetYourPasswordModal;
