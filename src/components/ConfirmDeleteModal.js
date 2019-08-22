import React from 'react';
import { Modal, Text, View } from 'react-native';
import { Button, Card } from 'native-base';

function ConfirmDeleteModal({ modalVisible, onAccept, onDecline }) {
	const { 
		containerStyle, 
		textStyle, 
		subTextStyle,
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
					<Text style={textStyle}>Are you sure you want to delete?</Text>
					<Text style={subTextStyle}>This process cannot be undone</Text>
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
		flex: 0.3,
	},
	textStyle: {
		fontSize: 18,
		textAlign: 'center',
		paddingTop: 20,
		lineHeight: 40
	},
	subTextStyle: {
		color: '#444444', 
		textAlign: 'center'
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

export default ConfirmDeleteModal;
